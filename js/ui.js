// js/ui.js

/**
 * Handles all Document Object Model (DOM) interactions and UI updates for the game.
 */
const UI = {
    elements: {
        ftCount: document.getElementById('ft-count'),
        ftPerSecCount: document.getElementById('ft-per-sec-count'),
        wsCount: document.getElementById('ws-count'),
        sparkButton: document.getElementById('spark-button'),
        generatorsList: document.getElementById('generators-list'),
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

    /**
     * Initializes UI event listeners using event delegation for dynamically created elements.
     */
    init() {
        this.elements.navButtons.forEach(button => {
            button.addEventListener('click', () => this.switchPanel(button.dataset.panel, button));
        });

        this.elements.generatorsList.addEventListener('click', this.handleBuyGeneratorClick);
        this.elements.insightCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.theoryCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.paradigmCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.discoveredRecipesList.addEventListener('click', this.handleRecipeClick);
    },

    /**
     * Switches the currently active center panel.
     * @param {string} panelId - The ID of the panel to activate.
     * @param {HTMLElement} clickedButton - The navigation button that was clicked.
     */
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

    /**
     * Updates the main resource displays and the tier summary list.
     */
    updateResourceDisplay() {
        this.elements.ftCount.textContent = Utils.formatNumber(gameState.resources.fleeting_thought);
        this.elements.wsCount.textContent = Utils.formatNumber(gameState.resources.wisdom_shards);

        let totalFtPerSec = 0;
        Object.values(gameState.generators).forEach(gen => {
            const genData = GENERATORS_DATA[Object.keys(GENERATORS_DATA).find(key => GENERATORS_DATA[key].id === gen.id)];
            if (genData && gen.level > 0 && genData.output?.fleeting_thought) {
                const currentLevel = gen.level;
                const baseOutput = genData.output.fleeting_thought;
                const scale = genData.outputScale || 1;
                const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                totalFtPerSec += (baseOutput * currentLevel) * levelBonus;
            }
        });
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => {
            const ideaData = IDEAS_DATA[ideaId];
            if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) {
                totalFtPerSec += ideaData.attributes.ft_bonus_per_sec * count;
            }
        });
        this.elements.ftPerSecCount.textContent = Utils.formatNumber(totalFtPerSec) + "/sec";

        let tierSummaryHTML = '<h3>Idea Tiers</h3><ul class="compact-list">';
        const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
        const totalPerTier = { 1: 0, 2: 0, 3: 0, 4: 0 };
        Object.values(IDEAS_DATA).forEach(ideaData => {
            const tier = ideaData.tier;
            if (tier >= 1 && tier <= 4) {
                totalPerTier[tier]++;
                if (gameState.discoveredIdeas.has(ideaData.id) && (gameState.ideas[ideaData.id] || 0) > 0) {
                    tierCounts[tier]++;
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

    /**
     * Renders the list of available base generators in the Refinement panel.
     */
    renderGenerators() {
        this.elements.generatorsList.innerHTML = '';
        Object.values(GENERATORS_DATA).forEach(genData => {
            let unlocked = true;
            if (genData.unlocksWith) {
                unlocked = genData.unlocksWith.every(cond => {
                    let conditionMet = false; const parts = cond.split('_'); const lastPart = parts[parts.length - 1]; const potentialLevel = parseInt(lastPart?.trim(), 10);
                    if (parts.length > 1 && !isNaN(potentialLevel)) {
                        const genId_cond = parts.slice(0, -1).join('_'); const requiredLevel = potentialLevel; const currentGenState = gameState.generators[genId_cond]; const currentLevel = currentGenState?.level;
                        conditionMet = currentGenState && GameLogic._isValidNumber(currentLevel) && currentLevel >= requiredLevel;
                    } else { const ideaId_cond = cond; conditionMet = gameState.discoveredIdeas.has(ideaId_cond); }
                    return conditionMet;
                });
            }
            if (!unlocked) return;
            
            const currentLevel = gameState.generators[genData.id]?.level || 0; let cost = {}; let canAfford = true;
            for (const res in genData.baseCost) { const base = genData.baseCost[res]; const scale = genData.costScale || 1; if(!GameLogic._isValidNumber(base) || !GameLogic._isValidNumber(scale)) continue; cost[res] = Math.floor(base * Math.pow(scale, currentLevel)); const currentResource = gameState.resources[res] ?? gameState.ideas[res] ?? 0; if (!GameLogic._isValidNumber(currentResource) || !GameLogic._isValidNumber(cost[res]) || currentResource < cost[res]) canAfford = false; }
            const isMaxLevel = currentLevel >= (genData.maxLevel || Infinity); const card = document.createElement('div'); card.className = 'upgrade-card';
            let costString = Object.entries(cost).map(([res, val]) =>`${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || Utils.capitalizeFirst(res.replace(/_/g, ' '))}`).join(', '); if (isMaxLevel) costString = 'N/A';
            let outputString = "Effect: "; if (genData.output && typeof genData.output === 'object') { const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1); const outputScale = genData.outputScale || 1; const prefix = currentLevel === 0 ? " (Lvl 1)" : ""; if (GameLogic._isValidNumber(genData.output.fleeting_thought) && GameLogic._isValidNumber(outputScale)) { const ftOutputValue = (genData.output.fleeting_thought * (outputScale**scalePower) * displayLevel); outputString += `${ftOutputValue.toFixed(2)} FT/sec${prefix}<br>`; } Object.entries(genData.output).forEach(([outRes, outVal]) => { if (outRes !== 'fleeting_thought' && GameLogic._isValidNumber(outVal) && GameLogic._isValidNumber(outputScale)) { const ratePerLevel = outVal * (outputScale**scalePower) * displayLevel * 100; outputString += `${ratePerLevel.toFixed(2)}% chance/sec for ${IDEAS_DATA[outRes]?.name || outRes}${prefix}<br>`; } }); } else { outputString = "Effect: (None defined)"; } outputString = outputString.replace(/<br>$/, '');
            card.innerHTML = `<button class="action-button buy-generator" data-generator-id="${genData.id}" ${!canAfford || isMaxLevel ? 'disabled' : ''}>${isMaxLevel ? 'Max Level' : (currentLevel === 0 ? 'Build' : 'Upgrade')}</button>`;
            this.elements.generatorsList.appendChild(card);
        });
    },

    /**
     * Generic function to render lists of discovered ideas in their respective panels.
     */
    renderTieredIdeaList(tier, listElement) {
        listElement.innerHTML = ''; let foundAny = false;
        Array.from(gameState.discoveredIdeas)
            .map(id => IDEAS_DATA[id])
            .filter(ideaData => ideaData && ideaData.tier === tier)
            .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
            .forEach(ideaData => {
                foundAny = true; const li = document.createElement('li'); const ownedCount = gameState.ideas[ideaData.id] || 0;
                let ftBonusHTML = '';
                if (ideaData.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(ownedCount) && ownedCount > 0) {
                    const totalBonus = ideaData.attributes.ft_bonus_per_sec * ownedCount;
                    ftBonusHTML = `<span class="idea-description">Grants ${Utils.formatNumber(totalBonus)} FT/sec total</span>`;
                }
                li.innerHTML = `<span class="idea-name">${ideaData.name}</span> <span class="idea-owned">Owned: ${Utils.formatNumber(ownedCount)}</span> <span class="idea-description">${ideaData.description || ''}</span> ${ftBonusHTML}`;
                li.dataset.ideaId = ideaData.id; listElement.appendChild(li);
            });
        if (!foundAny) listElement.innerHTML = `<p class="text-muted">No ideas of this tier discovered yet.</p>`;
    },

    /**
     * Generic function to render Auto-Crafters.
     */
    renderAutoCrafters(crafterTypePrefix, listElement) {
        listElement.innerHTML = ''; let foundAnyCrafters = false;
        Object.values(CRAFTERS_DATA).forEach(crafterData => {
            if (!crafterData.id.startsWith(crafterTypePrefix + '_')) return;
            let unlocked = true; if (crafterData.unlocksWith) unlocked = crafterData.unlocksWith.every(cond => gameState.discoveredIdeas.has(cond)); if (!unlocked) return;
            foundAnyCrafters = true; const targetIdea = IDEAS_DATA[crafterData.targetIdeaId]; if (!targetIdea) return;
            const currentLevel = gameState.crafters[crafterData.id]?.level || 0; let cost = {}; let canAfford = true;
            for (const res in crafterData.baseCost) { const base = crafterData.baseCost[res]; const scale = crafterData.costScale || 1; if(!GameLogic._isValidNumber(base) || !GameLogic._isValidNumber(scale)) continue; cost[res] = Math.floor(base * Math.pow(scale, currentLevel)); const currentResource = gameState.resources[res] ?? gameState.ideas[res] ?? 0; if (!GameLogic._isValidNumber(currentResource) || !GameLogic._isValidNumber(cost[res]) || currentResource < cost[res]) canAfford = false; }
            const isMaxLevel = currentLevel >= (crafterData.maxLevel || Infinity); const card = document.createElement('div'); card.className = 'upgrade-card';
            let costString = Object.entries(cost).map(([res, val]) => `${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || Utils.capitalizeFirst(res.replace(/_/g, ' '))}`).join(', '); if (isMaxLevel) costString = 'N/A';
            const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1); const outputScale = crafterData.outputScale || 1; const prefix = currentLevel === 0 ? " (Lvl 1)" : ""; let outputVal = 0; if(GameLogic._isValidNumber(crafterData.outputAmount) && GameLogic._isValidNumber(outputScale)){ outputVal = crafterData.outputAmount * (outputScale ** scalePower) * displayLevel;} const outputString = `Crafts: ${outputVal.toFixed(4)} ${targetIdea.name}/sec${prefix}`;
            card.innerHTML = `<button class="action-button buy-autocrafter" data-crafter-id="${crafterData.id}" ${!canAfford || isMaxLevel ? 'disabled' : ''}> ${isMaxLevel ? 'Max Level' : (currentLevel === 0 ? 'Build' : 'Upgrade')} </button>`;
            listElement.appendChild(card);
        });
        if (!foundAnyCrafters) listElement.innerHTML = `<p class="text-muted">Discover an idea of this tier to unlock its auto-crafter.</p>`;
    },

    /**
     * Event handlers for delegated button clicks.
     */
    handleBuyGeneratorClick(e) {
        const button = e.target.closest('.buy-generator');
        if (button && typeof GameLogic !== 'undefined' && GameLogic.buyGenerator) {
            GameLogic.buyGenerator(button.dataset.generatorId);
        }
    },
    handleBuyAutoCrafterClick(e) {
        const button = e.target.closest('.buy-autocrafter');
        if (button && typeof GameLogic !== 'undefined' && GameLogic.buyAutoCrafter) {
            GameLogic.buyAutoCrafter(button.dataset.crafterId);
        }
    },

    /**
     * Populates the dropdown selectors in the Synthesis Forge, including theories.
     */
    populateForgeSelectors() {
        const currentSelection1 = this.elements.forgeSlot1.value;
        const currentSelection2 = this.elements.forgeSlot2.value;
        const optionsHTML = ['<option value="">Select...</option>'];
        const sortedForgeableIdeas = Array.from(gameState.discoveredIdeas)
            .map(id => IDEAS_DATA[id])
            .filter(ideaData => ideaData && (ideaData.tier >= 1 && ideaData.tier <= 3) && GameLogic._isValidNumber(gameState.ideas[ideaData.id]) && gameState.ideas[ideaData.id] > 0)
            .sort((a,b) => { if (a.tier !== b.tier) return (a.tier||0)-(b.tier||0); return (a.name||'').localeCompare(b.name||''); });
        sortedForgeableIdeas.forEach(ideaData => { optionsHTML.push(`<option value="${ideaData.id}">${ideaData.name} (${Utils.formatNumber(gameState.ideas[ideaData.id])})</option>`); });
        this.elements.forgeSlot1.innerHTML = optionsHTML.join('');
        this.elements.forgeSlot2.innerHTML = optionsHTML.join('');
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection1)) this.elements.forgeSlot1.value = currentSelection1;
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection2)) this.elements.forgeSlot2.value = currentSelection2;
    },

    /**
     * Updates the list of discovered combination recipes.
     */
    updateDiscoveredRecipes() {
        this.elements.discoveredRecipesList.innerHTML = '';
        if (!Array.isArray(gameState.unlockedRecipes)) return;
        gameState.unlockedRecipes.forEach(recipeOutputId => {
            const outputData = IDEAS_DATA[recipeOutputId];
            if(outputData?.recipe) {
                const inputNames = outputData.recipe.map(inputId => IDEAS_DATA[inputId]?.name || `(Unknown)`).join(' + ');
                const li = document.createElement('li');
                li.textContent = `${inputNames} = ${outputData.name || '(Unknown)'}`;
                li.dataset.input1 = outputData.recipe[0];
                li.dataset.input2 = outputData.recipe[1];
                this.elements.discoveredRecipesList.appendChild(li);
            }
        });
    },

    /**
     * Handles clicking on a discovered recipe to populate the forge.
     */
    handleRecipeClick(e) {
        const listItem = e.target.closest('li');
        if (listItem?.dataset.input1 && listItem.dataset.input2) {
            UI.elements.forgeSlot1.value = listItem.dataset.input1;
            UI.elements.forgeSlot2.value = listItem.dataset.input2;
            UI.elements.combinationResult.textContent = "Recipe loaded into forge.";
            UI.elements.combinationResult.className = 'info';
        }
    },

    /**
     * Updates the right-hand panel with details of the selected idea.
     */
    updateDetailsView(ideaData) {
         if (!ideaData || ideaData.id === 'fleeting_thought') { this.elements.selectedIdeaName.textContent = 'Nothing Selected'; this.elements.selectedIdeaDescription.textContent = 'Click an idea node in the Noosphere.'; this.elements.selectedIdeaAttributes.innerHTML = ''; return; }
        this.elements.selectedIdeaName.textContent = ideaData.name || 'Unnamed Idea';
        this.elements.selectedIdeaDescription.textContent = ideaData.description || 'No description available.';
        let attributesHTML = '';
        if (ideaData.tier) attributesHTML += `<p><strong>Tier:</strong> ${ideaData.tier}</p>`;
        const currentCount = gameState.ideas[ideaData.id];
        if (GameLogic._isValidNumber(currentCount)) attributesHTML += `<p><strong>Owned:</strong> ${Utils.formatNumber(currentCount)}</p>`;
        if (ideaData.attributes && typeof ideaData.attributes === 'object') {
             Object.entries(ideaData.attributes).forEach(([key, value]) => {
                attributesHTML += `<p><strong>${Utils.capitalizeFirst(key.replace(/_/g, ' '))}:</strong> ${value}</p>`;
             });
        }
        if(ideaData.recipe?.length > 0) {
            const inputNames = ideaData.recipe.map(id => IDEAS_DATA[id]?.name || `(Unknown)`).join(', ');
            attributesHTML += `<p><strong>Derived From:</strong> ${inputNames}</p>`;
        }
        this.elements.selectedIdeaAttributes.innerHTML = attributesHTML;
    },

    /**
     * Shows a short-lived notification message on the screen.
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `game-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('exiting');
            notification.addEventListener('transitionend', () => notification.remove(), { once: true });
            setTimeout(() => notification.remove(), 600);
        }, 3000);
    },

    /**
     * Updates all major UI components based on the current gameState.
     */
    updateAllUI() {
        this.updateResourceDisplay();
        this.renderGenerators();
        this.renderTieredIdeaList(1, this.elements.conceptsList);
        this.renderTieredIdeaList(2, this.elements.insightsList);
        this.renderTieredIdeaList(3, this.elements.theoriesList);
        this.renderTieredIdeaList(4, this.elements.paradigmsList);
        this.renderAutoCrafters('insight', this.elements.insightCraftersList);
        this.renderAutoCrafters('theory', this.elements.theoryCraftersList);
        this.renderAutoCrafters('paradigm', this.elements.paradigmCraftersList);
        this.populateForgeSelectors();
        this.updateDiscoveredRecipes();
        this.updateTranscendButton();
    },

    /**
     * Updates the state and text of the Transcend button, now requiring a paradigm.
     */
     updateTranscendButton() {
         let canTranscend = false;
         let wsToGain = 0;
         
         const anyParadigmOwned = Array.from(gameState.discoveredIdeas).some(id => IDEAS_DATA[id]?.tier === 4 && (gameState.ideas[id] || 0) > 0);

         if (anyParadigmOwned) {
             if (typeof GameLogic !== 'undefined' && GameLogic.calculateWisdomShardsOnTranscend) {
                  canTranscend = true;
                  wsToGain = GameLogic.calculateWisdomShardsOnTranscend();
                  if (!GameLogic._isValidNumber(wsToGain)) {
                      canTranscend = false;
                      wsToGain = 0;
                  }
             }
         }
         this.elements.transcendButton.disabled = !canTranscend;
         this.elements.transcendButton.textContent = canTranscend ? `Transcend (${wsToGain} WS)` : 'A Paradigm is Required';
     }
};
