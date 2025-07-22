// js/ui.js
const UI = {
    elements: {
        ftCount: document.getElementById('ft-count'), ftPerSecCount: document.getElementById('ft-per-sec-count'), wsCount: document.getElementById('ws-count'), sparkButton: document.getElementById('spark-button'),
        buyModeButton: document.getElementById('buy-mode-button'), // NEW
        baseUpgradesList: document.getElementById('base-upgrades-list'), ftGeneratorsList: document.getElementById('ft-generators-list'), conceptGeneratorsList: document.getElementById('concept-generators-list'),
        forgeSlot1: document.getElementById('forge-slot-1'), forgeSlot2: document.getElementById('forge-slot-2'), combineButton: document.getElementById('combine-button'), combinationResult: document.getElementById('combination-result'), discoveredRecipesList: document.getElementById('discovered-recipes-list'),
        navButtons: document.querySelectorAll('.nav-button'), panels: document.querySelectorAll('.panel'),
        selectedIdeaName: document.getElementById('selected-idea-name'), selectedIdeaDescription: document.getElementById('selected-idea-description'), selectedIdeaAttributes: document.getElementById('selected-idea-attributes'),
        detailsView: document.getElementById('details-view'), // NEW: Reference to the whole right panel
        activeConceptsSummary: document.getElementById('active-concepts-summary'),
        conceptsList: document.getElementById('concepts-list'),
        insightsList: document.getElementById('insights-list'), insightCraftersList: document.getElementById('insight-crafters-list'),
        theoriesList: document.getElementById('theories-list'), theoryCraftersList: document.getElementById('theory-crafters-list'),
        paradigmsList: document.getElementById('paradigms-list'), paradigmCraftersList: document.getElementById('paradigm-crafters-list'),
        transcendButton: document.getElementById('transcend-button'),
        // NEW: Stats elements
        statPlayTime: document.getElementById('stat-play-time'), statTotalClicks: document.getElementById('stat-total-clicks'),
        statFtSparked: document.getElementById('stat-ft-sparked'), statFtPassive: document.getElementById('stat-ft-passive'),
        statLifetimeFt: document.getElementById('stat-lifetime-ft'), statIdeasSynthesized: document.getElementById('stat-ideas-synthesized'),
        statAutocrafts: document.getElementById('stat-autocrafts'), statTranscendences: document.getElementById('stat-transcendences'), statGameSaves: document.getElementById('stat-game-saves')
    },

    init() {
        this.elements.navButtons.forEach(button => { button.addEventListener('click', () => this.switchPanel(button.dataset.panel, button)); });
        if (this.elements.discoveredRecipesList) this.elements.discoveredRecipesList.addEventListener('click', this.handleRecipeClick);
        if (this.elements.buyModeButton) this.elements.buyModeButton.addEventListener('click', this.cycleBuyMode);
    },

    cycleBuyMode() {
        switch (gameState.buyMode) {
            case 1:    gameState.buyMode = 10; break;
            case 10:   gameState.buyMode = 100; break;
            case 100:  gameState.buyMode = -1; break; // -1 represents MAX
            case -1:   gameState.buyMode = 1; break;
            default:   gameState.buyMode = 1;
        }
        UI.updateAllUI(); // Update UI to reflect new mode costs and labels
    },

    updateBuyModeButton() {
        if (!this.elements.buyModeButton) return;
        let modeText = `x${gameState.buyMode}`;
        if (gameState.buyMode === -1) modeText = "MAX";
        this.elements.buyModeButton.textContent = `Buy/Synth Mode: ${modeText}`;
    },

    renderTutorial() {
        if (!gameState.tutorial.isActive || !this.elements.detailsView) return;
        const step = GameLogic.tutorialSteps[gameState.tutorial.step];
        if (!step) { GameLogic.skipTutorial(); return; }

        this.elements.detailsView.innerHTML = `
            <h2>Tutorial: Step ${gameState.tutorial.step + 1}</h2>
            <p class="tutorial-goal">${step.goal}</p>
            <button id="skip-tutorial-button" class="action-button settings-button">Skip Tutorial</button>
        `;
        const skipButton = document.getElementById('skip-tutorial-button');
        if (skipButton) {
             // Remove old listener to prevent duplicates, then add new one
             skipButton.removeEventListener('click', GameLogic.skipTutorial);
             skipButton.addEventListener('click', GameLogic.skipTutorial);
        }
    },

    switchPanel(panelId, clickedButton) { /* ... same ... */
        this.elements.panels.forEach(panel => panel.classList.remove('active')); this.elements.navButtons.forEach(btn => btn.classList.remove('active')); const targetPanel = document.getElementById(panelId); if (targetPanel) targetPanel.classList.add('active'); if (clickedButton) clickedButton.classList.add('active'); if (panelId === 'noosphere-panel' && typeof Noosphere !== 'undefined' && Noosphere.network) { setTimeout(() => { if(Noosphere.network) { Noosphere.network.redraw(); Noosphere.network.fit();}}, 50); }
    },

    renderStatistics() {
        if (!gameState.stats || !this.elements.statPlayTime) return;
        this.elements.statPlayTime.textContent = Utils.formatTime(gameState.stats.playTimeSeconds);
        this.elements.statTotalClicks.textContent = Utils.formatNumber(gameState.stats.totalClicks);
        this.elements.statFtSparked.textContent = Utils.formatNumber(gameState.stats.ftSparkedManual);
        this.elements.statFtPassive.textContent = Utils.formatNumber(gameState.stats.ftGeneratedPassive);
        this.elements.statLifetimeFt.textContent = Utils.formatNumber(gameState.stats.lifetimeFT);
        this.elements.statIdeasSynthesized.textContent = Utils.formatNumber(gameState.stats.ideasSynthesized);
        this.elements.statAutocrafts.textContent = Utils.formatNumber(gameState.stats.autoCraftProductions);
        this.elements.statTranscendences.textContent = Utils.formatNumber(gameState.transcendenceCount); // Sourced from top level for now
        this.elements.statGameSaves.textContent = Utils.formatNumber(gameState.stats.gameSaves);
    },

    updateResourceDisplay() {
        // ... (This function is now merged with the tier summary part, it remains mostly the same as your version)
        if (!this.elements.ftCount || !this.elements.wsCount || !this.elements.ftPerSecCount || !this.elements.activeConceptsSummary) return;
        this.elements.ftCount.textContent = Utils.formatNumber(gameState.resources.fleeting_thought); this.elements.wsCount.textContent = Utils.formatNumber(gameState.resources.wisdom_shards);
        let totalFtPerSec = 0;
        Object.entries(gameState.generators).forEach(([id, genState]) => { /* FT calc */ const genData = GENERATORS_DATA[id]; if (genData?.type === 'ft_generator' && genState.level > 0 && GameLogic._isValidNumber(genData.output?.fleeting_thought)) { const outputScale = genData.outputScale || 1; if(GameLogic._isValidNumber(outputScale)) { totalFtPerSec += (genData.output.fleeting_thought * (outputScale**Math.max(0,genState.level-1)) * genState.level); } } });
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => { const ideaData = IDEAS_DATA[ideaId]; if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) { if (GameLogic._isValidNumber(ideaData.attributes.ft_bonus_per_sec)) { totalFtPerSec += ideaData.attributes.ft_bonus_per_sec * count; } } });
        const cogFlowEnhancer = gameState.generators['cognitive_flow_enhancer']; if (cogFlowEnhancer?.level > 0) { const multiplierData = GENERATORS_DATA['cognitive_flow_enhancer']; if (multiplierData?.output?.global_ft_per_sec_multiplier_bonus) { if (GameLogic._isValidNumber(multiplierData.output.global_ft_per_sec_multiplier_bonus)) { totalFtPerSec *= (1 + (multiplierData.output.global_ft_per_sec_multiplier_bonus * cogFlowEnhancer.level)); } } }
        this.elements.ftPerSecCount.textContent = Utils.formatNumber(totalFtPerSec) + "/sec";
        let tierSummaryHTML = '<h3>Idea Tiers</h3><ul class="compact-list">'; const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0 }; const totalPerTier = { 1: 0, 2: 0, 3: 0, 4: 0 };
        Object.values(IDEAS_DATA).forEach(ideaData => { if (ideaData.tier >= 1 && ideaData.tier <= 4) { totalPerTier[ideaData.tier]++; if (gameState.discoveredIdeas.has(ideaData.id) && GameLogic._isValidNumber(gameState.ideas[ideaData.id]) && gameState.ideas[ideaData.id] > 0) { tierCounts[ideaData.tier]++; } } });
        tierSummaryHTML += `<li>Concepts: ${tierCounts[1]} / ${totalPerTier[1]}</li>`; tierSummaryHTML += `<li>Insights: ${tierCounts[2]} / ${totalPerTier[2]}</li>`; tierSummaryHTML += `<li>Theories: ${tierCounts[3]} / ${totalPerTier[3]}</li>`; tierSummaryHTML += `<li>Paradigms: ${tierCounts[4]} / ${totalPerTier[4]}</li>`; tierSummaryHTML += '</ul>';
        this.elements.activeConceptsSummary.innerHTML = tierSummaryHTML;
    },

    // A single, powerful rendering function for all upgradable items
    renderUpgradables(dataObject, listElement, typeFilter = null, crafterTypeFilter = null) {
        if (!listElement) return;
        let itemsRenderedInThisCall = 0;
        Object.values(dataObject).forEach(itemData => {
            let typeMatch = false;
            if (dataObject === GENERATORS_DATA && typeFilter && itemData.type === typeFilter) typeMatch = true;
            else if (dataObject === CRAFTERS_DATA && crafterTypeFilter && itemData.type === crafterTypeFilter) typeMatch = true;
            if (!typeMatch) return;

            let unlocked = true; // Unlock logic... same as your version
            if (itemData.unlocksWith) { unlocked = itemData.unlocksWith.every(cond => { let conditionMet = false; const parts = cond.split('_'); const lastPart = parts[parts.length - 1]; const potentialLevel = parseInt(lastPart?.trim(), 10); if (parts.length > 1 && !isNaN(potentialLevel) && GENERATORS_DATA[parts.slice(0, -1).join('_')]) { const genId_cond = parts.slice(0, -1).join('_'); const requiredLevel = potentialLevel; const currentGenState = gameState.generators[genId_cond]; const currentLevel = currentGenState?.level; conditionMet = currentGenState && GameLogic._isValidNumber(currentLevel) && currentLevel >= requiredLevel; } else { const ideaId_cond = cond; conditionMet = gameState.discoveredIdeas.has(ideaId_cond); } return conditionMet; }); }
            if (!unlocked) return;

            itemsRenderedInThisCall++;
            const stateObject = (dataObject === GENERATORS_DATA) ? gameState.generators : gameState.crafters;
            const currentLevel = stateObject[itemData.id]?.level || 0;
            const buyAmount = gameState.buyMode === -1 ? GameLogic.calculateMaxAffordable(itemData, stateObject) : gameState.buyMode;

            let totalCost = {}; let canAfford = true;
            // Calculate cost for the determined buy amount
            for(let i = 0; i < buyAmount; i++) {
                const levelForCost = currentLevel + i;
                if (levelForCost >= (itemData.maxLevel || Infinity)) break; // Stop calculating if max level is reached
                 for (const res in itemData.baseCost) {
                    totalCost[res] = (totalCost[res] || 0) + Math.floor(itemData.baseCost[res] * Math.pow(itemData.costScale || 1, levelForCost));
                 }
            }
            if(buyAmount < 1) canAfford = false; // Can't afford if max affordable is 0
            for (const res in totalCost) { const owned = gameState.resources[res] ?? gameState.ideas[res] ?? 0; if (owned < totalCost[res]) { canAfford = false; break; } }

            const isMaxLevel = currentLevel >= (itemData.maxLevel || Infinity);
            const card = document.createElement('div'); card.className = 'upgrade-card';
            let costString = Object.entries(totalCost).map(([res, val]) =>`${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || '???'}`).join(', ');
            if (isMaxLevel) costString = 'N/A';
            else if (buyAmount === 0) costString = "Cannot afford next level.";
            else if (Object.keys(totalCost).length === 0) { // Handle case for single purchase of a free item
                 const singleCost = Object.entries(itemData.baseCost).map(([res, val]) =>`${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || '???'}`).join(', ');
                 costString = singleCost;
            }


            // Output string... same logic as your version...
            let outputString = "Effect: "; const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1); const outputScale = itemData.outputScale || 1; const prefix = currentLevel === 0 ? " (at Lvl 1)" : "";
            if (itemData.output && typeof itemData.output === 'object') { /* ... */ } else if (itemData.targetIdeaId && GameLogic._isValidNumber(itemData.outputAmount)) { /* ... */ } else outputString = "Effect: (None defined)";
            if(itemData.output?.ft_per_click_bonus) outputString = `Effect: +${Utils.formatNumber(itemData.output.ft_per_click_bonus * displayLevel)} FT/click${prefix}`;
            if(itemData.output?.global_ft_per_sec_multiplier_bonus) outputString = `Effect: +${(itemData.output.global_ft_per_sec_multiplier_bonus * displayLevel * 100).toFixed(0)}% Global FT/sec${prefix}`;
            if(itemData.output?.fleeting_thought) outputString = `Effect: ${(itemData.output.fleeting_thought * (outputScale**scalePower) * displayLevel).toFixed(2)} FT/sec${prefix}`;
            if(itemData.type === 'concept_generator') { let cO = []; Object.entries(itemData.output).forEach(([oR,oV])=>{cO.push(`${(oV*(outputScale**scalePower)*displayLevel*100).toFixed(2)}% chance/sec for ${IDEAS_DATA[oR]?.name||oR}${prefix}`);}); outputString = `Effect: ${cO.join('<br>')}`; }
            if(itemData.targetIdeaId) { let oV = 0; if(GameLogic._isValidNumber(itemData.outputAmount)) oV = itemData.outputAmount*(outputScale**scalePower)*displayLevel; const dec=oV<0.001?4:3; outputString = `Crafts: ${oV.toFixed(dec)} ${IDEAS_DATA[itemData.targetIdeaId]?.name||'Item'}/sec${prefix}`; }

            const buttonText = isMaxLevel ? 'Max Level' : (currentLevel === 0 ? 'Build' : 'Upgrade') + (buyAmount > 1 ? ` x${buyAmount}` : '');
            card.innerHTML = `<h3>${itemData.icon||''} ${itemData.name} (Lvl ${currentLevel}${isMaxLevel?' - MAX':''})</h3> <p>${itemData.description||''}</p> <p class="cost">Cost: ${costString}</p> <p class="output">${outputString}</p> <button class.action-button buy-upgradable" data-item-id="${itemData.id}" ${!canAfford||isMaxLevel?'disabled':''}>${buttonText}</button>`;
            listElement.appendChild(card);
        });

        if (itemsRenderedInThisCall === 0 && listElement.innerHTML.trim() === '') listElement.innerHTML = `<p class="text-muted">No items of this type available yet.</p>`;
        document.querySelectorAll('.buy-upgradable').forEach(button => { button.removeEventListener('click', this._handleUpgradableClick); button.addEventListener('click', this._handleUpgradableClick); });
    },

    _handleUpgradableClick: (e) => { /* ... same as your version ... */
        const itemId = e.target.dataset.itemId; if (GENERATORS_DATA[itemId]) GameLogic.buyGenerator(itemId); else if (CRAFTERS_DATA[itemId]) GameLogic.buyAutoCrafter(itemId); else console.error("Unknown item:", itemId);
    },

    renderTieredIdeaList(tier, listElement) { /* ... same as your version ... */
        if (!listElement) return; listElement.innerHTML = ''; let foundAny = false;
        Array.from(gameState.discoveredIdeas).map(id => IDEAS_DATA[id]).filter(ideaData => ideaData?.tier === tier).sort((a, b) => (a.name || '').localeCompare(b.name || '')).forEach(ideaData => {
            foundAny = true; const li = document.createElement('li'); const ownedCount = gameState.ideas[ideaData.id] || 0; let ftBonusHTML = '';
            if (ideaData.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(ownedCount) && ownedCount > 0) { const totalBonus = ideaData.attributes.ft_bonus_per_sec * ownedCount; ftBonusHTML = `<span class="idea-description">Grants ${Utils.formatNumber(totalBonus)} FT/sec total</span>`;}
            li.innerHTML = `<span class="idea-name">${ideaData.name}</span> <span class="idea-owned">Owned: ${Utils.formatNumber(ownedCount)}</span> <span class="idea-description">${ideaData.description || ''}</span> ${ftBonusHTML}`;
            li.dataset.ideaId = ideaData.id; listElement.appendChild(li);
        });
        if (!foundAny) listElement.innerHTML = `<p class="text-muted">No ideas of this tier discovered yet.</p>`;
    },

    populateForgeSelectors() { /* ... same as previous version, allowing Tiers 1-3 ... */
        if (!this.elements.forgeSlot1 || !this.elements.forgeSlot2) return; const sel1=this.elements.forgeSlot1.value; const sel2=this.elements.forgeSlot2.value; const opts=['<option value="">Select...</option>'];
        const sorted=Array.from(gameState.discoveredIdeas).map(id=>IDEAS_DATA[id]).filter(iD=>iD&&(iD.tier>=1&&iD.tier<=3)&&GameLogic._isValidNumber(gameState.ideas[iD.id])&&gameState.ideas[iD.id]>0).sort((a,b)=>{if(a.tier!==b.tier)return(a.tier||0)-(b.tier||0);return(a.name||'').localeCompare(b.name||'');});
        sorted.forEach(iD=>{opts.push(`<option value="${iD.id}">${iD.name} (${Utils.formatNumber(gameState.ideas[iD.id])})</option>`);});
        this.elements.forgeSlot1.innerHTML=opts.join(''); this.elements.forgeSlot2.innerHTML=opts.join('');
        if(sorted.find(i=>i.id===sel1))this.elements.forgeSlot1.value=sel1; if(sorted.find(i=>i.id===sel2))this.elements.forgeSlot2.value=sel2;
    },

    updateDiscoveredRecipes() { /* ... same ... */
         if (!this.elements.discoveredRecipesList) return; this.elements.discoveredRecipesList.innerHTML = ''; if (!Array.isArray(gameState.unlockedRecipes)) { if (this.elements.discoveredRecipesList.children.length === 0) this.elements.discoveredRecipesList.innerHTML = '<li><p class="text-muted">No recipes discovered yet.</p></li>'; return; }
        gameState.unlockedRecipes.forEach(recipeOutputId => { const outputData = IDEAS_DATA[recipeOutputId]; if(outputData?.recipe && outputData.recipe.length === 2) { const inputNames = outputData.recipe.map(inputId => IDEAS_DATA[inputId]?.name || `?`).join(' + '); const li = document.createElement('li'); li.textContent = `${inputNames} = ${outputData.name || '?'}`; li.dataset.input1 = outputData.recipe[0]; li.dataset.input2 = outputData.recipe[1]; this.elements.discoveredRecipesList.appendChild(li); } });
        if (this.elements.discoveredRecipesList.children.length === 0) this.elements.discoveredRecipesList.innerHTML = '<li><p class="text-muted">No recipes discovered yet.</p></li>';
    },

    handleRecipeClick: (e) => { /* ... same ... */
        const li=e.target.closest('li'); if(li?.dataset.input1&&li.dataset.input2){const i1=li.dataset.input1;const i2=li.dataset.input2;if(IDEAS_DATA[i1]&&IDEAS_DATA[i2]){UI.elements.forgeSlot1.value=i1;UI.elements.forgeSlot2.value=i2;UI.elements.combinationResult.textContent="Recipe loaded.";UI.elements.combinationResult.className='info';}else{UI.elements.combinationResult.textContent="Ingredients missing.";UI.elements.combinationResult.className='error';}}
    },

    updateDetailsView(ideaData) {
        if (gameState.tutorial.isActive) {
            this.renderTutorial();
            return;
        }
        if(!this.elements.detailsView) return;
        // Restore normal view if tutorial was just skipped/completed
        this.elements.detailsView.innerHTML = `
            <h2>Selected Idea</h2>
            <div id="selected-idea-name" role="heading" aria-level="3">Nothing Selected</div>
            <div id="selected-idea-description">Click a node in the Noosphere.</div>
            <div id="selected-idea-attributes"></div>
        `;
        // Re-cache elements after restoring innerHTML
        this.elements.selectedIdeaName = document.getElementById('selected-idea-name');
        this.elements.selectedIdeaDescription = document.getElementById('selected-idea-description');
        this.elements.selectedIdeaAttributes = document.getElementById('selected-idea-attributes');

        if(!ideaData||ideaData.id==='fleeting_thought'){return;} // Just return after restoring default view
        // Now update with idea data
        this.elements.selectedIdeaName.textContent=ideaData.name||'Unnamed Idea';this.elements.selectedIdeaDescription.textContent=ideaData.description||'No description.';let attHTML='';if(ideaData.tier)attHTML+=`<p><strong>Tier:</strong> ${ideaData.tier}</p>`;const cC=gameState.ideas[ideaData.id];if(GameLogic._isValidNumber(cC))attHTML+=`<p><strong>Owned:</strong> ${Utils.formatNumber(cC)}</p>`;
        if(ideaData.attributes&&typeof ideaData.attributes==='object'){Object.entries(ideaData.attributes).forEach(([k,v])=>{if(k!=='value'&&k!=='complexity'&&k!=='profundity')attHTML+=`<p><strong>${Utils.capitalizeFirst(k.replace(/_/g,' '))}:</strong> ${v}</p>`;});}
        if(ideaData.recipe?.length){const iNs=ideaData.recipe.map(iId=>IDEAS_DATA[iId]?.name||`?`).join(', ');attHTML+=`<p><strong>Derived From:</strong> ${iNs}</p>`;} this.elements.selectedIdeaAttributes.innerHTML=attHTML;
    },

    showNotification(message, type = 'info') { /* ... same ... */
        const n=document.createElement('div');n.className=`game-notification ${type}`;n.textContent=message;document.body.appendChild(n);
        setTimeout(()=>{n.classList.add('exiting');n.addEventListener('transitionend',()=>n.remove(),{once:true});setTimeout(()=>n.remove(),600);},3000);
    },

    updateAllUI() {
        this.updateResourceDisplay(); // Includes tier summary
        this.updateBuyModeButton(); // Update buy mode button text

        // Clear all upgradable lists before re-rendering
        if(this.elements.baseUpgradesList) this.elements.baseUpgradesList.innerHTML = '';
        if(this.elements.ftGeneratorsList) this.elements.ftGeneratorsList.innerHTML = '';
        if(this.elements.conceptGeneratorsList) this.elements.conceptGeneratorsList.innerHTML = '';
        if(this.elements.insightCraftersList) this.elements.insightCraftersList.innerHTML = '';
        if(this.elements.theoryCraftersList) this.elements.theoryCraftersList.innerHTML = '';
        if(this.elements.paradigmCraftersList) this.elements.paradigmCraftersList.innerHTML = '';

        // Render all upgradables
        this.renderUpgradables(GENERATORS_DATA, this.elements.baseUpgradesList, 'click_upgrade');
        this.renderUpgradables(GENERATORS_DATA, this.elements.baseUpgradesList, 'passive_ft_upgrade');
        this.renderUpgradables(GENERATORS_DATA, this.elements.ftGeneratorsList, 'ft_generator');
        this.renderUpgradables(GENERATORS_DATA, this.elements.conceptGeneratorsList, 'concept_generator');
        this.renderUpgradables(CRAFTERS_DATA, this.elements.insightCraftersList, null, 'insight');
        this.renderUpgradables(CRAFTERS_DATA, this.elements.theoryCraftersList, null, 'theory');
        this.renderUpgradables(CRAFTERS_DATA, this.elements.paradigmCraftersList, null, 'paradigm');

        // Render tiered idea lists
        this.renderTieredIdeaList(1, this.elements.conceptsList);
        this.renderTieredIdeaList(2, this.elements.insightsList);
        this.renderTieredIdeaList(3, this.elements.theoriesList);
        this.renderTieredIdeaList(4, this.elements.paradigmsList);

        this.populateForgeSelectors();
        this.updateDiscoveredRecipes();
        this.updateTranscendButton();
        this.renderStatistics();

        // Handle tutorial display override
        if (gameState.tutorial.isActive) {
            this.renderTutorial();
        } else if (document.getElementById('selected-idea-name')?.textContent === "Tutorial") {
            // This is a fallback to restore the default view if the tutorial was just skipped
            this.updateDetailsView(null);
        }
    },

    updateTranscendButton() { /* ... updated to require paradigm ... */
        if(!this.elements.transcendButton) return;
        let canTranscend = false; let wsToGain = 0;
        // Check if ANY paradigm is owned
        const anyParadigmOwned = Array.from(gameState.discoveredIdeas).some(id => IDEAS_DATA[id]?.tier === 4 && gameState.ideas[id] > 0);
        if(anyParadigmOwned){if(typeof GameLogic!=='undefined'&&GameLogic.calculateWisdomShardsOnTranscend){canTranscend=true;wsToGain=GameLogic.calculateWisdomShardsOnTranscend();if(!GameLogic._isValidNumber(wsToGain)){canTranscend=false;wsToGain=0;}}}
        this.elements.transcendButton.disabled=!canTranscend;this.elements.transcendButton.textContent=canTranscend?`Transcend (${wsToGain} WS)`:'Discover a Paradigm';
    }
};
