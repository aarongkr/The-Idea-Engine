// js/gameLogic.js

/**
 * Contains the core game loop (tick) and logic for all game actions.
 */
const GameLogic = {
    // ... (lastTick, _isValidNumber, tick, calculateOfflineProgress, sparkFleetingThought remain unchanged)
    lastTick: Date.now(),
    _isValidNumber(value) { return typeof value === 'number' && !isNaN(value); },
    tick() { /* ... */ },
    calculateOfflineProgress(timeOfflineMs) { /* ... */ },
    sparkFleetingThought() { /* ... */ },

    /**
     * Calculates the cost and number of levels for a multi-level purchase.
     * @param {object} baseCost - The base cost object (e.g., { fleeting_thought: 10 }).
     * @param {number} costScale - The cost scaling factor.
     * @param {number} currentLevel - The current level of the item.
     * @param {number|string} multiplier - The number of levels to buy (1, 10, 100, or 'Max').
     * @param {number} maxLevel - The maximum level for the item.
     * @returns {{levelsToBuy: number, totalCost: object}} - The result of the calculation.
     */
    calculateMultiBuy(baseCost, costScale, currentLevel, multiplier, maxLevel) {
        const affordableLevels = {
            levelsToBuy: 0,
            totalCost: {}
        };
        // Initialize totalCost object with all resource types from baseCost
        for (const res in baseCost) {
            affordableLevels.totalCost[res] = 0;
        }

        const limit = (multiplier === 'Max') ? (maxLevel - currentLevel) : Math.min(multiplier, maxLevel - currentLevel);
        if (limit <= 0) return affordableLevels; // Can't buy any if at or over max level

        let tempOwnedResources = { ...gameState.resources, ...gameState.ideas };

        for (let i = 0; i < limit; i++) {
            const levelToBuy = currentLevel + i;
            let levelCost = {};
            let canAffordThisLevel = true;

            // Calculate cost for this specific level
            for (const res in baseCost) {
                const calculatedCost = Math.floor(baseCost[res] * Math.pow(costScale, levelToBuy));
                levelCost[res] = calculatedCost;
                if ((tempOwnedResources[res] || 0) < calculatedCost) {
                    canAffordThisLevel = false;
                    break;
                }
            }

            if (canAffordThisLevel) {
                // "Spend" resources for the next iteration and add to total
                for (const res in levelCost) {
                    tempOwnedResources[res] -= levelCost[res];
                    affordableLevels.totalCost[res] += levelCost[res];
                }
                affordableLevels.levelsToBuy++;
            } else {
                // If we can't afford this level, stop
                break;
            }
        }

        return affordableLevels;
    },

    /**
     * Handles purchasing or upgrading a base generator, now with multi-buy.
     */
    buyGenerator(generatorId) {
        const genData = GENERATORS_DATA[generatorId]; if (!genData) return;
        const currentLevel = gameState.generators[generatorId]?.level || 0;
        if (currentLevel >= (genData.maxLevel || Infinity)) { if (typeof UI !== 'undefined') UI.showNotification("Already at max level!", "info"); return; }
        
        // Recalculate the purchase on click to ensure state is current
        const purchaseDetails = GameLogic.calculateMultiBuy(
            genData.baseCost,
            genData.costScale,
            currentLevel,
            gameState.purchaseMultiplier,
            genData.maxLevel
        );

        if (purchaseDetails.levelsToBuy > 0) {
            // Spend resources
            for (const res in purchaseDetails.totalCost) {
                if (gameState.resources[res] !== undefined) gameState.resources[res] -= purchaseDetails.totalCost[res];
                else if (gameState.ideas[res] !== undefined) gameState.ideas[res] -= purchaseDetails.totalCost[res];
            }
            // Add levels
            gameState.generators[generatorId].level += purchaseDetails.levelsToBuy;
            
            if (typeof UI !== 'undefined') {
                UI.updateAllUI(); // Refresh UI to show new state and costs
                UI.showNotification(`${genData.name} upgraded by +${purchaseDetails.levelsToBuy} to Lvl ${gameState.generators[generatorId].level}!`, 'success');
            }
        } else {
            if (typeof UI !== 'undefined') UI.showNotification("Not enough resources!", "error");
        }
    },

    /**
     * Handles purchasing or upgrading an Auto-Crafter, now with multi-buy.
     */
    buyAutoCrafter(crafterId) {
        const crafterData = CRAFTERS_DATA[crafterId]; if (!crafterData) return;
        const currentLevel = gameState.crafters[crafterId]?.level || 0;
        if (currentLevel >= (crafterData.maxLevel || Infinity)) { if (typeof UI !== 'undefined') UI.showNotification("Crafter already at max level!", "info"); return; }

        const purchaseDetails = GameLogic.calculateMultiBuy(
            crafterData.baseCost,
            crafterData.costScale,
            currentLevel,
            gameState.purchaseMultiplier,
            crafterData.maxLevel
        );

        if (purchaseDetails.levelsToBuy > 0) {
            for (const res in purchaseDetails.totalCost) {
                if (gameState.resources[res] !== undefined) gameState.resources[res] -= purchaseDetails.totalCost[res];
                else if (gameState.ideas[res] !== undefined) gameState.ideas[res] -= purchaseDetails.totalCost[res];
            }
            if (!gameState.crafters[crafterId]) gameState.crafters[crafterId] = { level: 0 };
            gameState.crafters[crafterId].level += purchaseDetails.levelsToBuy;

            if (typeof UI !== 'undefined') {
                UI.updateAllUI();
                UI.showNotification(`${crafterData.name} upgraded by +${purchaseDetails.levelsToBuy} to Lvl ${gameState.crafters[crafterId].level}!`, 'success');
            }
        } else {
            if (typeof UI !== 'undefined') UI.showNotification("Not enough resources for this crafter!", "error");
        }
    },
    attemptCombination() {
        if (!UI?.elements) return; const inputId1 = UI.elements.forgeSlot1.value; const inputId2 = UI.elements.forgeSlot2.value;
        if (!inputId1 || !inputId2) { UI.elements.combinationResult.textContent = "Please select two ideas to combine."; UI.elements.combinationResult.className = 'error'; return;}
        const idea1Data = IDEAS_DATA[inputId1]; const idea2Data = IDEAS_DATA[inputId2];
        if (!idea1Data || !idea2Data) { UI.elements.combinationResult.textContent = "Invalid idea selection."; UI.elements.combinationResult.className = 'error'; return;}
        const count1 = gameState.ideas[inputId1]; const count2 = gameState.ideas[inputId2];
        if (!GameLogic._isValidNumber(count1) || (inputId1 !== inputId2 && !GameLogic._isValidNumber(count2))) { UI.elements.combinationResult.textContent = "Error reading idea counts."; UI.elements.combinationResult.className = 'error'; return;}
        if (inputId1 === inputId2 && count1 < 2) { UI.elements.combinationResult.textContent = `Need 2x ${idea1Data.name} to combine with itself.`; UI.elements.combinationResult.className = 'error'; return;}
        if (count1 < 1 || (inputId1 !== inputId2 && count2 < 1) ) { UI.elements.combinationResult.textContent = "Not enough of the selected ideas."; UI.elements.combinationResult.className = 'error'; return;}
        let foundRecipeOutput = null;
        for (const outputId in IDEAS_DATA) { const outputData = IDEAS_DATA[outputId]; if (outputData.recipe?.length === 2) { if ((outputData.recipe[0] === inputId1 && outputData.recipe[1] === inputId2) || (outputData.recipe[0] === inputId2 && outputData.recipe[1] === inputId1)) { foundRecipeOutput = outputData; break;}}}
        if (foundRecipeOutput) {
            gameState.ideas[inputId1]--; if (inputId1 !== inputId2) gameState.ideas[inputId2]--;
            GameLogic.gainIdea(foundRecipeOutput.id, 1);
            UI.elements.combinationResult.textContent = `Success! Synthesized: ${foundRecipeOutput.name}!`; UI.elements.combinationResult.className = 'success';
            if (!gameState.unlockedRecipes.includes(foundRecipeOutput.id)) { gameState.unlockedRecipes.push(foundRecipeOutput.id); if (typeof UI !== 'undefined') UI.updateDiscoveredRecipes();}
            if (foundRecipeOutput.recipe) { foundRecipeOutput.recipe.forEach(ingId => { if (typeof Noosphere !== 'undefined') Noosphere.addEdge(ingId, foundRecipeOutput.id);});}
            if (typeof UI !== 'undefined') { UI.populateForgeSelectors(); UI.updateResourceDisplay(); }
        } else { UI.elements.combinationResult.textContent = "These ideas don't seem to form a new synthesis... yet."; UI.elements.combinationResult.className = 'info';}
    },
    gainIdea(ideaId, amount = 1, fromBatch = false) {
        if (!IDEAS_DATA[ideaId] || ideaId === 'fleeting_thought' || !GameLogic._isValidNumber(amount) || amount <= 0) return;
        const wasFirstDiscovery = !gameState.discoveredIdeas.has(ideaId);
        let currentCount = gameState.ideas[ideaId] || 0;
        if (!GameLogic._isValidNumber(currentCount)) currentCount = 0;
        gameState.ideas[ideaId] = currentCount + amount;
        gameState.discoveredIdeas.add(ideaId);
        if (wasFirstDiscovery) {
             if (typeof UI !== 'undefined') UI.showNotification(`New Discovery: ${IDEAS_DATA[ideaId].name}!`, 'special');
             if (!fromBatch && typeof Noosphere !== 'undefined') {
                Noosphere.addNode(ideaId); const ideaData = IDEAS_DATA[ideaId];
                 if (ideaData.recipe) { ideaData.recipe.forEach(ingId => { if (gameState.discoveredIdeas.has(ingId)) Noosphere.addEdge(ingId, ideaId);});}
                 Object.values(IDEAS_DATA).forEach(pIdea => { if (pIdea.id === 'fleeting_thought' || pIdea.id === ideaId) return; if (pIdea.recipe?.includes(ideaId) && gameState.discoveredIdeas.has(pIdea.id)) { if (pIdea.recipe.every(ing => gameState.discoveredIdeas.has(ing))) {pIdea.recipe.forEach(ing_id => Noosphere.addEdge(ing_id, pIdea.id));}}});
                Noosphere.focusOnNode(ideaId);
             }
        }
        if (!fromBatch && typeof UI !== 'undefined') {
            UI.populateForgeSelectors();
            UI.updateResourceDisplay();
        }
    },
     calculateWisdomShardsOnTranscend() {
        let totalConceptualMass = 0; Object.entries(gameState.ideas).forEach(([id, count]) => { const ideaData = IDEAS_DATA[id]; if (ideaData?.tier > 0 && GameLogic._isValidNumber(count) && count > 0) { const ideaWorth = (ideaData.tier * 10); if(GameLogic._isValidNumber(ideaWorth)){ totalConceptualMass += ideaWorth * count;}}});
        return Math.floor(Math.sqrt(Math.max(0, totalConceptualMass) / 1000)) + (Number(gameState.transcendenceCount) || 0);
    },
     transcend() {
        const anyParadigmOwned = Array.from(gameState.discoveredIdeas).some(id => IDEAS_DATA[id]?.tier === 4 && (gameState.ideas[id] || 0) > 0);
        if (!anyParadigmOwned) { if (typeof UI !== 'undefined') UI.showNotification("A Paradigm is required to Transcend.", "error"); return;}
        const wsGained = GameLogic.calculateWisdomShardsOnTranscend(); if (!GameLogic._isValidNumber(wsGained)) { if (typeof UI !== 'undefined') UI.showNotification("Error calculating Wisdom Shards.", "error"); return;}
        if (wsGained <= 0 && gameState.transcendenceCount > 0) { if (typeof UI !== 'undefined') UI.showNotification("No new Wisdom to be gained this Transcendence.", "info");}
        if (!confirm(`Transcend and gain ${wsGained} Wisdom Shards? This will reset your current progress (except WS and Transcendence count).`)) return;
        
        const currentWS = Number(gameState.resources.wisdom_shards) || 0;
        const currentTranscendCount = Number(gameState.transcendenceCount) || 0;
        const newBaseGameState = {
            lastUpdate: Date.now(), resources: { fleeting_thought: 0, wisdom_shards: currentWS + wsGained }, ideas: {},
            generators: {}, crafters: {}, unlockedRecipes: [], noosphereState: { nodes: [], edges: [] },
            discoveredIdeas: new Set(['fleeting_thought']), transcendenceCount: currentTranscendCount + 1, tutorialCompleted: true,
            gameVersion: gameState.gameVersion
        };
        Object.keys(gameState).forEach(key => delete gameState[key]);
        Object.assign(gameState, newBaseGameState);
        initializeGameState(false); saveGame();
        
         if (typeof UI !== 'undefined') {
            UI.showNotification(`Successfully Transcended! Gained ${wsGained} Wisdom Shards.`, 'special');
            if (typeof Noosphere !== 'undefined') Noosphere.renderFromGameState();
            UI.updateAllUI();
            UI.switchPanel('noosphere-panel', document.querySelector('.nav-button[data-panel="noosphere-panel"]'));
         }
         GameLogic.lastTick = Date.now();
         gameState.lastUIRefresh = 0;
    }
};
