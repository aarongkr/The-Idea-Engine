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
        multiplierButton: document.getElementById('multiplier-button'), // New
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

        // Event listener for the new multiplier button
        this.elements.multiplierButton.addEventListener('click', () => this.cycleMultiplier());

        // Use Event Delegation for dynamic buttons
        this.elements.generatorsList.addEventListener('click', this.handleBuyGeneratorClick);
        this.elements.insightCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.theoryCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.paradigmCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.discoveredRecipesList.addEventListener('click', this.handleRecipeClick);
    },

    /**
     * Cycles the purchase multiplier (1 -> 10 -> 100 -> Max -> 1).
     */
    cycleMultiplier() {
        const multipliers = [1, 10, 100, 'Max'];
        const currentIndex = multipliers.indexOf(gameState.purchaseMultiplier);
        const nextIndex = (currentIndex + 1) % multipliers.length;
        gameState.purchaseMultiplier = multipliers[nextIndex];
        this.updateMultiplierButtonText();
        // Immediately re-render generators and crafters to show new costs
        this.renderGenerators();
        this.renderAutoCrafters('insight', this.elements.insightCraftersList);
        this.renderAutoCrafters('theory', this.elements.theoryCraftersList);
        this.renderAutoCrafters('paradigm', this.elements.paradigmCraftersList);
    },

    /**
     * Updates the text of the multiplier button to reflect the current state.
     */
    updateMultiplierButtonText() {
        const currentMultiplier = gameState.purchaseMultiplier;
        this.elements.multiplierButton.textContent = `Buy x${currentMultiplier}`;
    },

    /**
     * Renders the list of available base generators, calculating multi-buy costs.
     */
    renderGenerators() {
        this.elements.generatorsList.innerHTML = '';
        Object.values(GENERATORS_DATA).forEach(genData => {
            let unlocked = true;
            if (genData.unlocksWith) { unlocked = genData.unlocksWith.every(cond => { let conditionMet = false; const parts = cond.split('_'); const lastPart = parts[parts.length - 1]; const potentialLevel = parseInt(lastPart?.trim(), 10); if (parts.length > 1 && !isNaN(potentialLevel)) { const genId_cond = parts.slice(0, -1).join('_'); const requiredLevel = potentialLevel; const currentGenState = gameState.generators[genId_cond]; const currentLevel = currentGenState?.level; conditionMet = currentGenState && GameLogic._isValidNumber(currentLevel) && currentLevel >= requiredLevel; } else { const ideaId_cond = cond; conditionMet = gameState.discoveredIdeas.has(ideaId_cond); } return conditionMet; }); }
            if (!unlocked) return;

            const currentLevel = gameState.generators[genData.id]?.level || 0;
            const isMaxLevel = currentLevel >= (genData.maxLevel || Infinity);
            
            // Calculate multi-buy details
            const purchaseDetails = GameLogic.calculateMultiBuy(
                genData.baseCost,
                genData.costScale,
                currentLevel,
                gameState.purchaseMultiplier,
                genData.maxLevel
            );

            let costString = "N/A";
            let canAfford = false;
            if (purchaseDetails.levelsToBuy > 0) {
                costString = Object.entries(purchaseDetails.totalCost).map(([res, val]) =>`${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || Utils.capitalizeFirst(res.replace(/_/g, ' '))}`).join(', ');
                canAfford = true; // calculateMultiBuy ensures this
            } else if (!isMaxLevel) {
                 // Show cost for a single level if we can't afford the multi-buy
                const singlePurchase = GameLogic.calculateMultiBuy(genData.baseCost, genData.costScale, currentLevel, 1, genData.maxLevel);
                costString = Object.entries(singlePurchase.totalCost).map(([res, val]) =>`${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || Utils.capitalizeFirst(res.replace(/_/g, ' '))}`).join(', ');
            }
            
            let buttonText = isMaxLevel ? "Max Level" : (currentLevel === 0 ? `Build +${purchaseDetails.levelsToBuy}` : `Upgrade +${purchaseDetails.levelsToBuy}`);
            if (purchaseDetails.levelsToBuy === 0 && !isMaxLevel) {
                buttonText = currentLevel === 0 ? "Build +1" : "Upgrade +1";
            }
            
            const card = document.createElement('div');
            card.className = 'upgrade-card';
            let outputString = "Effect: "; if (genData.output && typeof genData.output === 'object') { const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1); const outputScale = genData.outputScale || 1; const prefix = currentLevel === 0 ? " (Lvl 1)" : ""; if (GameLogic._isValidNumber(genData.output.fleeting_thought) && GameLogic._isValidNumber(outputScale)) { const ftOutputValue = (genData.output.fleeting_thought * (outputScale**scalePower) * displayLevel); outputString += `${ftOutputValue.toFixed(2)} FT/sec${prefix}<br>`; } Object.entries(genData.output).forEach(([outRes, outVal]) => { if (outRes !== 'fleeting_thought' && GameLogic._isValidNumber(outVal) && GameLogic._isValidNumber(outputScale)) { const ratePerLevel = outVal * (outputScale**scalePower) * displayLevel * 100; outputString += `${ratePerLevel.toFixed(2)}% chance/sec for ${IDEAS_DATA[outRes]?.name || outRes}${prefix}<br>`; } }); } else { outputString = "Effect: (None defined)"; } outputString = outputString.replace(/<br>$/, '');
            
            card.innerHTML = `<h3>${genData.icon || ''} ${genData.name} (Lvl ${currentLevel}${isMaxLevel ? ' - MAX' : ''})</h3> <p>${genData.description || ''}</p> <p class="cost">Cost: ${costString}</p> <p class="output">${outputString || 'Effect: N/A'}</p> <button class="action-button buy-generator" data-generator-id="${genData.id}" ${!canAfford || isMaxLevel ? 'disabled' : ''}>${buttonText}</button>`;
            this.elements.generatorsList.appendChild(card);
        });
    },

    /**
     * Generic function to render Auto-Crafters, calculating multi-buy costs.
     */
    renderAutoCrafters(crafterTypePrefix, listElement) {
        listElement.innerHTML = ''; let foundAnyCrafters = false;
        Object.values(CRAFTERS_DATA).forEach(crafterData => {
            if (!crafterData.id.startsWith(crafterTypePrefix + '_')) return;
            let unlocked = true; if (crafterData.unlocksWith) unlocked = crafterData.unlocksWith.every(cond => gameState.discoveredIdeas.has(cond)); if (!unlocked) return;
            
            foundAnyCrafters = true; const targetIdea = IDEAS_DATA[crafterData.targetIdeaId]; if (!targetIdea) return;
            const currentLevel = gameState.crafters[crafterData.id]?.level || 0;
            const isMaxLevel = currentLevel >= (crafterData.maxLevel || Infinity);

            const purchaseDetails = GameLogic.calculateMultiBuy(
                crafterData.baseCost,
                crafterData.costScale,
                currentLevel,
                gameState.purchaseMultiplier,
                crafterData.maxLevel
            );

            let costString = "N/A";
            let canAfford = false;
            if (purchaseDetails.levelsToBuy > 0) {
                costString = Object.entries(purchaseDetails.totalCost).map(([res, val]) => `${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || Utils.capitalizeFirst(res.replace(/_/g, ' '))}`).join(', ');
                canAfford = true;
            } else if (!isMaxLevel) {
                const singlePurchase = GameLogic.calculateMultiBuy(crafterData.baseCost, crafterData.costScale, currentLevel, 1, crafterData.maxLevel);
                costString = Object.entries(singlePurchase.totalCost).map(([res, val]) => `${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || Utils.capitalizeFirst(res.replace(/_/g, ' '))}`).join(', ');
            }

            let buttonText = isMaxLevel ? "Max Level" : (currentLevel === 0 ? `Build +${purchaseDetails.levelsToBuy}` : `Upgrade +${purchaseDetails.levelsToBuy}`);
            if (purchaseDetails.levelsToBuy === 0 && !isMaxLevel) {
                 buttonText = currentLevel === 0 ? "Build +1" : "Upgrade +1";
            }

            const card = document.createElement('div'); card.className = 'upgrade-card';
            const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1); const outputScale = crafterData.outputScale || 1; const prefix = currentLevel === 0 ? " (Lvl 1)" : ""; let outputVal = 0; if(GameLogic._isValidNumber(crafterData.outputAmount) && GameLogic._isValidNumber(outputScale)){ outputVal = crafterData.outputAmount * (outputScale ** scalePower) * displayLevel;} const outputString = `Crafts: ${outputVal.toFixed(4)} ${targetIdea.name}/sec${prefix}`;
            
            card.innerHTML = `<h3>${crafterData.name} (Lvl ${currentLevel}${isMaxLevel ? ' - MAX' : ''})</h3> <p>${crafterData.description || `Automates crafting of ${targetIdea.name}.`}</p> <p class="cost">Cost: ${costString}</p> <p class="output">${outputString}</p> <button class="action-button buy-autocrafter" data-crafter-id="${crafterData.id}" ${!canAfford || isMaxLevel ? 'disabled' : ''}>${buttonText}</button>`;
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
     * Populates the dropdown selectors in the Synthesis Forge.
     */
    populateForgeSelectors() {
        const currentSelection1 = this.elements.forgeSlot1.value; const currentSelection2 = this.elements.forgeSlot2.value;
        const optionsHTML = ['<option value="">Select...</option>'];
        const sortedForgeableIdeas = Array.from(gameState.discoveredIdeas)
            .map(id => IDEAS_DATA[id])
            .filter(ideaData => ideaData && (ideaData.tier >= 1 && ideaData.tier <= 3) && GameLogic._isValidNumber(gameState.ideas[ideaData.id]) && gameState.ideas[ideaData.id] > 0)
            .sort((a,b) => { if (a.tier !== b.tier) return (a.tier||0)-(b.tier||0); return (a.name||'').localeCompare(b.name||''); });
        sortedForgeableIdeas.forEach(ideaData => { optionsHTML.push(`<option value="${ideaData.id}">${ideaData.name} (${Utils.formatNumber(gameState.ideas[ideaData.id])})</option>`); });
        this.elements.forgeSlot1.innerHTML = optionsHTML.join(''); this.elements.forgeSlot2.innerHTML = optionsHTML.join('');
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection1)) this.elements.forgeSlot1.value = currentSelection1;
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection2)) this.elements.forgeSlot2.value = currentSelection2;
    },

    /**
     * Updates the list of discovered combination recipes.
     */
    updateDiscoveredRecipes() {
        this.elements.discoveredRecipesList.innerHTML = ''; if (!Array.isArray(gameState.unlockedRecipes)) return;
        gameState.unlockedRecipes.forEach(recipeOutputId => {
            const outputData = IDEAS_DATA[recipeOutputId];
            if(outputData?.recipe) {
                const inputNames = outputData.recipe.map(inputId => IDEAS_DATA[inputId]?.name || `(Unknown)`).join(' + ');
                const li = document.createElement('li'); li.textContent = `${inputNames} = ${outputData.name || '(Unknown)'}`;
                li.dataset.input1 = outputData.recipe[0]; li.dataset.input2 = outputData.recipe[1];
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
     * Updates the state and text of the Transcend button.
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
