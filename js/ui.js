// js/ui.js
const UI = {
    elements: {
        ftCount: document.getElementById('ft-count'),
        ftPerSecCount: document.getElementById('ft-per-sec-count'),
        wsCount: document.getElementById('ws-count'),
        sparkButton: document.getElementById('spark-button'),
        baseUpgradesList: document.getElementById('base-upgrades-list'),
        ftGeneratorsList: document.getElementById('ft-generators-list'),
        conceptGeneratorsList: document.getElementById('concept-generators-list'),
        forgeSlot1: document.getElementById('forge-slot-1'),
        forgeSlot2: document.getElementById('forge-slot-2'),
        combineButton: document.getElementById('combine-button'),
        combinationResult: document.getElementById('combination-result'),
        discoveredRecipesList: document.getElementById('discovered-recipes-list'),
        navButtons: document.querySelectorAll('.nav-button'),
        panels: document.querySelectorAll('.panel'),
        selectedIdeaName: document.getElementById('selected-idea-name'),
        selectedIdeaDescription: document.getElementById('selected-idea-description'),
        selectedIdeaAttributes: document.getElementById('selected-idea-attributes'),
        activeConceptsSummary: document.getElementById('active-concepts-summary'),
        conceptsList: document.getElementById('concepts-list'),
        insightsList: document.getElementById('insights-list'),
        insightCraftersList: document.getElementById('insight-crafters-list'),
        theoriesList: document.getElementById('theories-list'),
        theoryCraftersList: document.getElementById('theory-crafters-list'),
        paradigmsList: document.getElementById('paradigms-list'),
        paradigmCraftersList: document.getElementById('paradigm-crafters-list'),
        transcendButton: document.getElementById('transcend-button')
    },

    init() {
        this.elements.navButtons.forEach(button => {
            button.addEventListener('click', () => this.switchPanel(button.dataset.panel, button));
        });
        this.elements.discoveredRecipesList.addEventListener('click', this.handleRecipeClick);
    },

    switchPanel(panelId, clickedButton) {
        this.elements.panels.forEach(panel => panel.classList.remove('active'));
        this.elements.navButtons.forEach(btn => btn.classList.remove('active'));
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) targetPanel.classList.add('active');
        if (clickedButton) clickedButton.classList.add('active');
        if (panelId === 'noosphere-panel' && typeof Noosphere !== 'undefined' && Noosphere.network) {
             setTimeout(() => { if(Noosphere.network) { Noosphere.network.redraw(); Noosphere.network.fit();}}, 50);
        }
    },

    updateResourceDisplay() {
        this.elements.ftCount.textContent = Utils.formatNumber(gameState.resources.fleeting_thought);
        this.elements.wsCount.textContent = Utils.formatNumber(gameState.resources.wisdom_shards);

        let totalFtPerSec = 0;
        Object.entries(gameState.generators).forEach(([id, genState]) => {
            const genData = GENERATORS_DATA[id];
            if (genData?.type === 'ft_generator' && genState.level > 0 && GameLogic._isValidNumber(genData.output?.fleeting_thought)) {
                const outputScale = genData.outputScale || 1;
                if(GameLogic._isValidNumber(outputScale)) {
                    totalFtPerSec += (genData.output.fleeting_thought * (outputScale**Math.max(0,genState.level-1)) * genState.level);
                }
            }
        });
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => {
            const ideaData = IDEAS_DATA[ideaId];
            if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) {
                if (GameLogic._isValidNumber(ideaData.attributes.ft_bonus_per_sec)) {
                     totalFtPerSec += ideaData.attributes.ft_bonus_per_sec * count;
                }
            }
        });
        const cogFlowEnhancer = gameState.generators['cognitive_flow_enhancer'];
        if (cogFlowEnhancer?.level > 0) {
            const multiplierData = GENERATORS_DATA['cognitive_flow_enhancer'];
            if (multiplierData?.output?.global_ft_per_sec_multiplier_bonus) {
                 if (GameLogic._isValidNumber(multiplierData.output.global_ft_per_sec_multiplier_bonus)) {
                    totalFtPerSec *= (1 + (multiplierData.output.global_ft_per_sec_multiplier_bonus * cogFlowEnhancer.level));
                 }
            }
        }
        this.elements.ftPerSecCount.textContent = Utils.formatNumber(totalFtPerSec) + "/sec";

        let tierSummaryHTML = '<h3>Idea Tiers</h3><ul class="compact-list">';
        const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
        const totalPerTier = { 1: 0, 2: 0, 3: 0, 4: 0 };
        Object.values(IDEAS_DATA).forEach(ideaData => {
            if (ideaData.tier >= 1 && ideaData.tier <= 4) {
                totalPerTier[ideaData.tier]++;
                if (gameState.discoveredIdeas.has(ideaData.id) && GameLogic._isValidNumber(gameState.ideas[ideaData.id]) && gameState.ideas[ideaData.id] > 0) {
                    tierCounts[ideaData.tier]++;
                }
            }
        });
        tierSummaryHTML += `<li>Concepts (T1): ${tierCounts[1]} / ${totalPerTier[1]}</li>`;
        tierSummaryHTML += `<li>Insights (T2): ${tierCounts[2]} / ${totalPerTier[2]}</li>`;
        tierSummaryHTML += `<li>Theories (T3): ${tierCounts[3]} / ${totalPerTier[3]}</li>`;
        tierSummaryHTML += `<li>Paradigms (T4): ${tierCounts[4]} / ${totalPerTier[4]}</li>`;
        tierSummaryHTML += '</ul>';
        this.elements.activeConceptsSummary.innerHTML = tierSummaryHTML;
    },

    renderUpgradables(dataObject, listElement, filterType = null, idPrefixFilter = null) {
        // listElement.innerHTML = ''; // Clearing is handled by updateAllUI before these calls if needed
        let itemsRenderedInThisCall = 0;

        Object.values(dataObject).forEach(itemData => {
            let typeMatch = false;
            if (dataObject === GENERATORS_DATA && filterType && itemData.type === filterType) {
                typeMatch = true;
            } else if (dataObject === CRAFTERS_DATA && idPrefixFilter && itemData.type === idPrefixFilter) {
                // For crafters, we're using itemData.type as the "prefix" like 'insight', 'theory'
                typeMatch = true;
            } else if (!filterType && !idPrefixFilter) { // No filter, render all (used for combined lists if needed)
                typeMatch = true;
            }

            if (!typeMatch) return;

            let unlocked = true;
            if (itemData.unlocksWith) {
                unlocked = itemData.unlocksWith.every(cond => {
                    let conditionMet = false; const parts = cond.split('_'); const lastPart = parts[parts.length - 1]; const potentialLevel = parseInt(lastPart?.trim(), 10);
                    if (parts.length > 1 && !isNaN(potentialLevel) && GENERATORS_DATA[parts.slice(0, -1).join('_')]) {
                        const genId_cond = parts.slice(0, -1).join('_'); const requiredLevel = potentialLevel;
                        const currentGenState = gameState.generators[genId_cond];
                        const currentLevel = currentGenState?.level;
                        conditionMet = currentGenState && GameLogic._isValidNumber(currentLevel) && currentLevel >= requiredLevel;
                    } else { const ideaId_cond = cond; conditionMet = gameState.discoveredIdeas.has(ideaId_cond); }
                    return conditionMet;
                });
            }
            if (!unlocked) return;

            itemsRenderedInThisCall++;
            const stateObject = (dataObject === GENERATORS_DATA) ? gameState.generators : gameState.crafters;
            const currentLevel = stateObject[itemData.id]?.level || 0;

            let cost = {}; let canAfford = true;
            for (const res in itemData.baseCost) {
                const base = itemData.baseCost[res]; const scale = itemData.costScale || 1;
                if(!GameLogic._isValidNumber(base) || !GameLogic._isValidNumber(scale)) {canAfford = false; break;}
                cost[res] = Math.floor(base * Math.pow(scale, currentLevel));
                const currentResource = gameState.resources[res] ?? gameState.ideas[res] ?? 0;
                if (!GameLogic._isValidNumber(currentResource) || !GameLogic._isValidNumber(cost[res]) || currentResource < cost[res]) {canAfford = false; break;}
            }

            const isMaxLevel = currentLevel >= (itemData.maxLevel || Infinity);
            const card = document.createElement('div'); card.className = 'upgrade-card';
            let costString = Object.entries(cost).map(([res, val]) =>`${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || Utils.capitalizeFirst(res.replace(/_/g, ' '))}`).join(', '); if (isMaxLevel) costString = 'N/A';

            let outputString = "Effect: ";
            const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1); const outputScale = itemData.outputScale || 1; const prefix = currentLevel === 0 ? " (at Lvl 1)" : "";

            if (itemData.output && typeof itemData.output === 'object') { // For GENERATORS_DATA items
                if (GameLogic._isValidNumber(itemData.output.ft_per_click_bonus)) {
                    outputString += `+${Utils.formatNumber(itemData.output.ft_per_click_bonus * displayLevel)} FT/click${prefix}`;
                } else if (GameLogic._isValidNumber(itemData.output.global_ft_per_sec_multiplier_bonus)) {
                    outputString += `+${(itemData.output.global_ft_per_sec_multiplier_bonus * displayLevel * 100).toFixed(0)}% Global FT/sec${prefix}`;
                } else if (GameLogic._isValidNumber(itemData.output.fleeting_thought) && GameLogic._isValidNumber(outputScale)) {
                    const ftOutputValue = (itemData.output.fleeting_thought * (outputScale**scalePower) * displayLevel);
                    outputString += `${ftOutputValue.toFixed(2)} FT/sec${prefix}`;
                } else {
                    let conceptOutputs = [];
                    Object.entries(itemData.output).forEach(([outRes, outVal]) => {
                        if (GameLogic._isValidNumber(outVal) && GameLogic._isValidNumber(outputScale)) {
                           const ratePerLevel = outVal * (outputScale**scalePower) * displayLevel * 100;
                           conceptOutputs.push(`${ratePerLevel.toFixed(2)}% chance/sec for ${IDEAS_DATA[outRes]?.name || outRes}${prefix}`);
                        }
                    });
                    if (conceptOutputs.length > 0) outputString += conceptOutputs.join('<br>');
                    else if (outputString === "Effect: ") outputString = "Effect: (Special)"; // If nothing else matched
                }
            } else if (itemData.targetIdeaId && GameLogic._isValidNumber(itemData.outputAmount)) { // For CRAFTERS_DATA items
                const targetIdea = IDEAS_DATA[itemData.targetIdeaId];
                let outputVal = 0; if(GameLogic._isValidNumber(itemData.outputAmount) && GameLogic._isValidNumber(outputScale)){ outputVal = itemData.outputAmount * (outputScale ** scalePower) * displayLevel;}
                const decimals = outputVal < 0.001 ? 4 : (outputVal < 0.01 ? 3 : 2);
                outputString = `Crafts: ${outputVal.toFixed(decimals)} ${targetIdea?.name || 'Item'}/sec${prefix}`;
            } else {
                outputString = "Effect: (None defined)";
            }
            outputString = outputString.replace(/<br>$/, '').trim();
            if (outputString === "Effect:") outputString = "Effect: (Not applicable or data error)";


            card.innerHTML = `<h3>${itemData.icon || ''} ${itemData.name} (Lvl ${currentLevel}${isMaxLevel ? ' - MAX' : ''})</h3> <p>${itemData.description || ''}</p> <p class="cost">Cost: ${costString}</p> <p class="output">${outputString}</p> <button class="action-button buy-upgradable" data-item-id="${itemData.id}" ${!canAfford || isMaxLevel ? 'disabled' : ''}>${isMaxLevel ? 'Max Level' : (currentLevel === 0 ? 'Build' : 'Upgrade')}</button>`;
            listElement.appendChild(card);
        });

        if (itemsRenderedInThisCall === 0 && listElement.innerHTML.trim() === '') { // Check if list is empty after attempts
            listElement.innerHTML = `<p class="text-muted">No items of this type available yet.</p>`;
        }
        document.querySelectorAll('.buy-upgradable').forEach(button => { button.removeEventListener('click', this._handleUpgradableClick); button.addEventListener('click', this._handleUpgradableClick); });
    },

    _handleUpgradableClick: (e) => {
        const itemId = e.target.dataset.itemId;
        if (GENERATORS_DATA[itemId] && typeof GameLogic !== 'undefined' && GameLogic.buyGenerator) {
            GameLogic.buyGenerator(itemId);
        } else if (CRAFTERS_DATA[itemId] && typeof GameLogic !== 'undefined' && GameLogic.buyAutoCrafter) {
            GameLogic.buyAutoCrafter(itemId);
        } else {
            console.error("Unknown item type for purchase:", itemId);
        }
    },

    renderTieredIdeaList(tier, listElement) {
        listElement.innerHTML = ''; let foundAny = false;
        Array.from(gameState.discoveredIdeas).map(id => IDEAS_DATA[id]).filter(ideaData => ideaData?.tier === tier).sort((a, b) => (a.name || '').localeCompare(b.name || '')).forEach(ideaData => {
            foundAny = true; const li = document.createElement('li'); const ownedCount = gameState.ideas[ideaData.id] || 0; let ftBonusHTML = '';
            if (ideaData.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(ownedCount) && ownedCount > 0) { const totalBonus = ideaData.attributes.ft_bonus_per_sec * ownedCount; ftBonusHTML = `<span class="idea-description">Grants ${Utils.formatNumber(totalBonus)} FT/sec total</span>`;}
            li.innerHTML = `<span class="idea-name">${ideaData.name}</span> <span class="idea-owned">Owned: ${Utils.formatNumber(ownedCount)}</span> <span class="idea-description">${ideaData.description || ''}</span> ${ftBonusHTML}`;
            li.dataset.ideaId = ideaData.id; listElement.appendChild(li);
        });
        if (!foundAny) listElement.innerHTML = `<p class="text-muted">No ideas of this tier discovered yet.</p>`;
    },

    populateForgeSelectors() {
        const currentSelection1 = this.elements.forgeSlot1.value; const currentSelection2 = this.elements.forgeSlot2.value;
        const optionsHTML = ['<option value="">Select...</option>'];
        const sortedForgeableIdeas = Array.from(gameState.discoveredIdeas).map(id => IDEAS_DATA[id])
            .filter(ideaData => ideaData && (ideaData.tier >= 1 && ideaData.tier <= 3) && GameLogic._isValidNumber(gameState.ideas[ideaData.id]) && gameState.ideas[ideaData.id] > 0)
            .sort((a,b) => { if (a.tier !== b.tier) return (a.tier||0)-(b.tier||0); return (a.name||'').localeCompare(b.name||''); });
        sortedForgeableIdeas.forEach(ideaData => { optionsHTML.push(`<option value="${ideaData.id}">${ideaData.name} (${Utils.formatNumber(gameState.ideas[ideaData.id])})</option>`); });
        this.elements.forgeSlot1.innerHTML = optionsHTML.join(''); this.elements.forgeSlot2.innerHTML = optionsHTML.join('');
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection1)) this.elements.forgeSlot1.value = currentSelection1;
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection2)) this.elements.forgeSlot2.value = currentSelection2;
    },

    updateDiscoveredRecipes() {
        this.elements.discoveredRecipesList.innerHTML = ''; if (!Array.isArray(gameState.unlockedRecipes)) return;
        gameState.unlockedRecipes.forEach(recipeOutputId => { const outputData = IDEAS_DATA[recipeOutputId]; if(outputData?.recipe) { const inputNames = outputData.recipe.map(inputId => IDEAS_DATA[inputId]?.name || `(Unknown: ${inputId})`).join(' + '); const li = document.createElement('li'); li.textContent = `${inputNames} = ${outputData.name || '(Unknown Product)'}`; li.dataset.input1 = outputData.recipe[0]; li.dataset.input2 = outputData.recipe[1]; this.elements.discoveredRecipesList.appendChild(li);}});
    },

    handleRecipeClick: (e) => {
        const listItem = e.target.closest('li');
        if (listItem?.dataset.input1 && listItem.dataset.input2) {
            const input1Id = listItem.dataset.input1; const input2Id = listItem.dataset.input2;
            if (IDEAS_DATA[input1Id] && IDEAS_DATA[input2Id]) {
                UI.elements.forgeSlot1.value = input1Id; UI.elements.forgeSlot2.value = input2Id;
                UI.elements.combinationResult.textContent = "Recipe loaded into forge."; UI.elements.combinationResult.className = 'info';
            } else { UI.elements.combinationResult.textContent = "Could not load recipe ingredients."; UI.elements.combinationResult.className = 'error';}
        }
    },

    updateDetailsView(ideaData) {
         if (!ideaData || ideaData.id === 'fleeting_thought') { this.elements.selectedIdeaName.textContent = 'Nothing Selected'; this.elements.selectedIdeaDescription.textContent = 'Click an idea node.'; this.elements.selectedIdeaAttributes.innerHTML = ''; return; }
        this.elements.selectedIdeaName.textContent = ideaData.name || 'Unnamed Idea'; this.elements.selectedIdeaDescription.textContent = ideaData.description || 'No description.';
        let attributesHTML = ''; if (ideaData.tier) attributesHTML += `<p><strong>Tier:</strong> ${ideaData.tier}</p>`; const currentCount = gameState.ideas[ideaData.id]; if (GameLogic._isValidNumber(currentCount)) attributesHTML += `<p><strong>Owned:</strong> ${Utils.formatNumber(currentCount)}</p>`;
        if (ideaData.attributes && typeof ideaData.attributes === 'object') { Object.entries(ideaData.attributes).forEach(([key, value]) => { if (key !== 'value' && key !== 'complexity' && key !== 'profundity') attributesHTML += `<p><strong>${Utils.capitalizeFirst(key.replace(/_/g, ' '))}:</strong> ${value}</p>`; }); }
        if(ideaData.recipe?.length) { const inputNames = ideaData.recipe.map(inputId => IDEAS_DATA[inputId]?.name || `(?)`).join(', '); attributesHTML += `<p><strong>Derived From:</strong> ${inputNames}</p>`;}
        this.elements.selectedIdeaAttributes.innerHTML = attributesHTML;
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div'); notification.className = `game-notification ${type}`; notification.textContent = message; document.body.appendChild(notification);
        setTimeout(() => { notification.classList.add('exiting'); notification.addEventListener('transitionend', () => notification.remove(), { once: true }); setTimeout(() => notification.remove(), 600); }, 3000);
    },

    updateAllUI() {
        this.updateResourceDisplay();

        // Clear relevant lists before re-rendering specific types into them
        this.elements.baseUpgradesList.innerHTML = '';
        this.elements.ftGeneratorsList.innerHTML = '';
        this.elements.conceptGeneratorsList.innerHTML = '';

        this.renderUpgradables(GENERATORS_DATA, this.elements.baseUpgradesList, 'click_upgrade');
        this.renderUpgradables(GENERATORS_DATA, this.elements.baseUpgradesList, 'passive_ft_upgrade'); // Appends to baseUpgradesList
        this.renderUpgradables(GENERATORS_DATA, this.elements.ftGeneratorsList, 'ft_generator');
        this.renderUpgradables(GENERATORS_DATA, this.elements.conceptGeneratorsList, 'concept_generator');

        this.renderTieredIdeaList(1, this.elements.conceptsList);
        this.renderTieredIdeaList(2, this.elements.insightsList);
        this.renderTieredIdeaList(3, this.elements.theoriesList);
        this.renderTieredIdeaList(4, this.elements.paradigmsList);

        this.renderUpgradables(CRAFTERS_DATA, this.elements.insightCraftersList, null, 'insight');
        this.renderUpgradables(CRAFTERS_DATA, this.elements.theoryCraftersList, null, 'theory');
        this.renderUpgradables(CRAFTERS_DATA, this.elements.paradigmCraftersList, null, 'paradigm');

        this.populateForgeSelectors();
        this.updateDiscoveredRecipes();
        this.updateTranscendButton();
    },

    updateTranscendButton() {
         let canTranscend = false; let wsToGain = 0;
         const paradigmGoalId = 'paradigm_structural_design';
         const paradigmCount = gameState.ideas[paradigmGoalId];
         if (GameLogic._isValidNumber(paradigmCount) && paradigmCount > 0) {
             if (typeof GameLogic !== 'undefined' && GameLogic.calculateWisdomShardsOnTranscend) {
                  canTranscend = true; wsToGain = GameLogic.calculateWisdomShardsOnTranscend();
                  if (!GameLogic._isValidNumber(wsToGain)) { canTranscend = false; wsToGain = 0;}
             }
         }
         this.elements.transcendButton.disabled = !canTranscend;
         this.elements.transcendButton.textContent = canTranscend ? `Transcend (${wsToGain} WS)` : 'Not Yet Wise Enough';
     }
};