// js/gameLogic.js

/**
 * Contains the core game loop (tick) and logic for all game actions.
 */
const GameLogic = {
    lastTick: Date.now(),

    _isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    },

    tick() {
        // ... (This function remains identical to the previous version you provided) ...
        const now = Date.now();
        if (!GameLogic._isValidNumber(this.lastTick) || this.lastTick <= 0 || this.lastTick > now) {
             this.lastTick = now - 100;
        }
        const delta = Math.max(0, (now - this.lastTick) / 1000);
        this.lastTick = now;

        if (typeof Tutorial !== 'undefined' && Tutorial.isActive) {
            Tutorial.checkCompletion();
        }

        if (!GameLogic._isValidNumber(gameState.resources.fleeting_thought)) {
             gameState.resources.fleeting_thought = 0;
        }

        let ftPerSecondThisTick = 0;
        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const genData = GENERATORS_DATA[genId];
            if (genData && genState.level > 0 && genData.output?.fleeting_thought) {
                const currentLevel = genState.level; const baseOutput = genData.output.fleeting_thought; const scale = genData.outputScale || 1;
                const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                ftPerSecondThisTick += (baseOutput * currentLevel) * levelBonus;
            }
        });
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => {
            const ideaData = IDEAS_DATA[ideaId];
            if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) {
                ftPerSecondThisTick += ideaData.attributes.ft_bonus_per_sec * count;
            }
        });
        gameState.resources.fleeting_thought += ftPerSecondThisTick * delta;

        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const genData = GENERATORS_DATA[genId];
            if (genData && genState.level > 0 && genData.output) {
                Object.entries(genData.output).forEach(([outputIdeaId, baseChance]) => {
                    if (outputIdeaId !== 'fleeting_thought' && GameLogic._isValidNumber(baseChance)) {
                        const currentLevel = genState.level; const scale = genData.outputScale || 1;
                        const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                        const chancePerSecond = (baseChance * currentLevel) * levelBonus;
                        if (GameLogic._isValidNumber(chancePerSecond) && delta > 0 && Math.random() < chancePerSecond * delta) {
                            GameLogic.gainIdea(outputIdeaId, 1);
                        }
                    }
                });
            }
        });

        Object.entries(gameState.crafters).forEach(([crafterId, crafterState]) => {
            const crafterData = CRAFTERS_DATA[crafterId];
            const currentLevel = crafterState?.level;
            if (crafterData && GameLogic._isValidNumber(currentLevel) && currentLevel > 0) {
                const targetIdeaData = IDEAS_DATA[crafterData.targetIdeaId];
                if (!targetIdeaData?.recipe) return;
                const outputScale = crafterData.outputScale || 1;
                const baseOutputAmount = crafterData.outputAmount || 0;
                if (!GameLogic._isValidNumber(baseOutputAmount)) return;
                const levelBonus = Math.pow(outputScale, Math.max(0, currentLevel - 1));
                const craftsPerSecond = (baseOutputAmount * currentLevel) * levelBonus;
                const potentialCraftsThisTick = craftsPerSecond * delta;
                let craftsAttempted = Math.floor(potentialCraftsThisTick) + (Math.random() < (potentialCraftsThisTick % 1) ? 1 : 0);
                for (let i = 0; i < craftsAttempted; i++) {
                    let canAffordIngredients = targetIdeaData.recipe.every(ingId => (gameState.ideas[ingId] || 0) >= 1);
                    if (canAffordIngredients) {
                        targetIdeaData.recipe.forEach(ingId => gameState.ideas[ingId]--);
                        GameLogic.gainIdea(crafterData.targetIdeaId, 1, true);
                    } else {
                        break;
                    }
                }
            }
        });

        if (now - (gameState.lastUIRefresh || 0) > 200 && (typeof Tutorial === 'undefined' || !Tutorial.isActive)) {
            if (typeof UI !== 'undefined' && UI.updateAllUI) {
                 UI.updateAllUI();
            }
            gameState.lastUIRefresh = now;
        }
    },

    calculateOfflineProgress(timeOfflineMs) { /* ... same as before ... */
        const offlineGains = { ftGained: 0, ideasGained: {} };
        if (!GameLogic._isValidNumber(timeOfflineMs) || timeOfflineMs <= 1000) return offlineGains;
        const secondsOffline = timeOfflineMs / 1000;
        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const genData = GENERATORS_DATA[genId];
            if (genData && genState.level > 0 && genData.output) {
                if (genData.output.fleeting_thought) {
                    const currentLevel = genState.level; const baseOutput = genData.output.fleeting_thought; const scale = genData.outputScale || 1;
                    const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                    offlineGains.ftGained += (baseOutput * currentLevel) * levelBonus * secondsOffline;
                }
                 Object.entries(genData.output).forEach(([outputIdeaId, baseChance]) => {
                    if (outputIdeaId !== 'fleeting_thought' && GameLogic._isValidNumber(baseChance)) {
                        const currentLevel = genState.level; const scale = genData.outputScale || 1;
                        const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                        const expectedCount = (baseChance * currentLevel) * levelBonus * secondsOffline;
                        const numGenerated = Math.floor(expectedCount) + (Math.random() < (expectedCount % 1) ? 1 : 0);
                        if (numGenerated > 0) offlineGains.ideasGained[outputIdeaId] = (offlineGains.ideasGained[outputIdeaId] || 0) + numGenerated;
                    }
                });
            }
        });
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => {
            const ideaData = IDEAS_DATA[ideaId];
            if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) {
                offlineGains.ftGained += ideaData.attributes.ft_bonus_per_sec * count * secondsOffline;
            }
        });
        Object.entries(gameState.crafters).forEach(([crafterId, crafterState]) => {
            const crafterData = CRAFTERS_DATA[crafterId];
            if (crafterData && crafterState.level > 0) {
                const currentLevel = crafterState.level; const baseOutputAmount = crafterData.outputAmount || 0; const outputScale = crafterData.outputScale || 1;
                const levelBonus = Math.pow(outputScale, Math.max(0, currentLevel - 1));
                const craftsPerSecond = (baseOutputAmount * currentLevel) * levelBonus;
                const numCraftedOffline = Math.floor(craftsPerSecond * secondsOffline);
                if (numCraftedOffline > 0) {
                    offlineGains.ideasGained[crafterData.targetIdeaId] = (offlineGains.ideasGained[crafterData.targetIdeaId] || 0) + numCraftedOffline;
                }
            }
        });
        if (!GameLogic._isValidNumber(offlineGains.ftGained)) offlineGains.ftGained = 0;
        return offlineGains;
    },

    sparkFleetingThought() { /* ... same as before ... */
        if (!GameLogic._isValidNumber(gameState.resources.fleeting_thought)) gameState.resources.fleeting_thought = 0;
        let wisdomShardsBonus = 0;
        if (GameLogic._isValidNumber(gameState.resources.wisdom_shards)) wisdomShardsBonus = gameState.resources.wisdom_shards * 0.1;
        gameState.resources.fleeting_thought += (1 + wisdomShardsBonus);
        if (typeof UI !== 'undefined') UI.updateResourceDisplay();
    },

    /**
     * NEW, ACCURATE multi-buy calculation function.
     * Calculates the cumulative cost to buy a certain number of levels and how many can be afforded.
     * @returns {{
     *   levelsToBuy: number,       // How many levels the player can actually afford
     *   totalCost: object,         // The cumulative cost for the affordable levels
     *   nextLevelCost: object,     // The cost for just the next single level
     *   requestedLevelsCost: object // The cumulative cost for the full requested multiplier (e.g., cost for all 10 levels)
     * }}
     */
    calculateMultiBuy(baseCost, costScale, currentLevel, multiplier, maxLevel) {
        const result = {
            levelsToBuy: 0,
            totalCost: {},
            nextLevelCost: {},
            requestedLevelsCost: {}
        };
        for (const res in baseCost) {
            result.totalCost[res] = 0;
            result.requestedLevelsCost[res] = 0;
        }

        let tempOwnedResources = {};
        Object.keys(gameState.resources).forEach(key => tempOwnedResources[key] = gameState.resources[key]);
        Object.keys(gameState.ideas).forEach(key => tempOwnedResources[key] = gameState.ideas[key]);

        const maxPossibleToBuy = maxLevel - currentLevel;
        if (maxPossibleToBuy <= 0) return result;

        const limit = (multiplier === 'Max') ? maxPossibleToBuy : Math.min(multiplier, maxPossibleToBuy);

        for (let i = 0; i < limit; i++) {
            const levelToBuy = currentLevel + i;
            let levelCost = {};
            let canAffordThisLevel = true;

            for (const res in baseCost) {
                const calculatedCost = Math.floor(baseCost[res] * Math.pow(costScale, levelToBuy));
                levelCost[res] = calculatedCost;
                result.requestedLevelsCost[res] += calculatedCost; // Add to total requested cost
                if (i === 0) result.nextLevelCost[res] = calculatedCost; // Store cost of first level in loop

                if ((tempOwnedResources[res] || 0) < calculatedCost) {
                    canAffordThisLevel = false;
                }
            }

            if (canAffordThisLevel) {
                for (const res in levelCost) {
                    tempOwnedResources[res] -= levelCost[res];
                    result.totalCost[res] += levelCost[res];
                }
                result.levelsToBuy++;
            }
        }
        return result;
    },

    /**
     * Generic item purchase function.
     * @param {string} itemId - The ID of the generator or crafter.
     * @param {object} itemData - The data object from GENERATORS_DATA or CRAFTERS_DATA.
     * @param {object} stateObject - The gameState object to modify (e.g., gameState.generators).
     */
    buyItem(itemId, itemData, stateObject) {
        if (!itemData) {
            console.error(`Data for item ${itemId} not found.`);
            return;
        }
        const currentLevel = stateObject[itemId]?.level || 0;
        if (currentLevel >= (itemData.maxLevel || Infinity)) {
            if (typeof UI !== 'undefined') UI.showNotification("Already at max level!", "info");
            return;
        }

        // Use the 'Max' setting from calculateMultiBuy to determine how many can actually be bought
        const purchaseMultiplier = (gameState.purchaseMultiplier === 'Max') ? 'Max' : parseInt(gameState.purchaseMultiplier, 10);
        const purchaseDetails = GameLogic.calculateMultiBuy(itemData.baseCost, itemData.costScale, currentLevel, purchaseMultiplier, itemData.maxLevel);

        if (purchaseDetails.levelsToBuy > 0) {
            // Spend resources
            for (const res in purchaseDetails.totalCost) {
                if (gameState.resources[res] !== undefined) gameState.resources[res] -= purchaseDetails.totalCost[res];
                else if (gameState.ideas[res] !== undefined) gameState.ideas[res] -= purchaseDetails.totalCost[res];
            }
            // Increase level
            if (!stateObject[itemId]) stateObject[itemId] = { level: 0 };
            stateObject[itemId].level += purchaseDetails.levelsToBuy;

            // UI Feedback
            if (typeof UI !== 'undefined') {
                UI.updateAllUI();
                UI.showNotification(`${itemData.name} upgraded by +${purchaseDetails.levelsToBuy} to Lvl ${stateObject[itemId].level}!`, 'success');
            }
        } else {
            if (typeof UI !== 'undefined') UI.showNotification("Not enough resources!", "error");
        }
    },

    // Old functions are now wrappers for the generic buyItem
    buyGenerator(generatorId) {
        GameLogic.buyItem(generatorId, GENERATORS_DATA[generatorId], gameState.generators);
    },
    buyAutoCrafter(crafterId) {
        GameLogic.buyItem(crafterId, CRAFTERS_DATA[crafterId], gameState.crafters);
    },

    attemptCombination() { /* ... same as before ... */
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

    gainIdea(ideaId, amount = 1, fromBatch = false) { /* ... same as before ... */
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

     calculateWisdomShardsOnTranscend() { /* ... same as before ... */
        let totalConceptualMass = 0; Object.entries(gameState.ideas).forEach(([id, count]) => { const ideaData = IDEAS_DATA[id]; if (ideaData?.tier > 0 && GameLogic._isValidNumber(count) && count > 0) { const ideaWorth = (ideaData.tier * 10); if(GameLogic._isValidNumber(ideaWorth)){ totalConceptualMass += ideaWorth * count;}}});
        return Math.floor(Math.sqrt(Math.max(0, totalConceptualMass) / 1000)) + (Number(gameState.transcendenceCount) || 0);
    },

     transcend() { /* ... same as before, ensure crafters are reset ... */
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
            discoveredIdeas: new Set(['fleeting_thought']), transcendenceCount: currentTranscendCount + 1, tutorialCompleted: true, purchaseMultiplier: gameState.purchaseMultiplier, // Preserve multiplier
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
