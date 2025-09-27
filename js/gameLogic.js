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

        // --- FT Generation ---
        let ftPerSecondThisTick = 0;
        // From Base Generators
        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const genData = GENERATORS_DATA[genId];
            if (genData && genState.level > 0 && genData.output?.fleeting_thought) {
                const currentLevel = genState.level; const baseOutput = genData.output.fleeting_thought; const scale = genData.outputScale || 1;
                const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                ftPerSecondThisTick += (baseOutput * currentLevel) * levelBonus;
            }
        });
        // From owned Ideas
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => {
            const ideaData = IDEAS_DATA[ideaId];
            if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) {
                ftPerSecondThisTick += ideaData.attributes.ft_bonus_per_sec * count;
            }
        });
        
        // ** NEW: Apply Global FT Multiplier **
        let globalMultiplier = 1;
        const methodicalApproachLevel = gameState.generators.methodical_approach?.level || 0;
        if (methodicalApproachLevel > 0) {
            const methodicalApproachData = GENERATORS_DATA.methodical_approach;
            globalMultiplier += methodicalApproachLevel * methodicalApproachData.effect.global_ft_multiplier_bonus;
        }

        // Apply total FT gain for this tick
        gameState.resources.fleeting_thought += (ftPerSecondThisTick * globalMultiplier) * delta;


        // --- Concept Generation ---
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

        // --- Auto-Crafter Logic ---
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

        // --- UI Update Throttle ---
        if (now - (gameState.lastUIRefresh || 0) > 200 && (typeof Tutorial === 'undefined' || !Tutorial.isActive)) {
            if (typeof UI !== 'undefined' && UI.updateAllUI) {
                 UI.updateAllUI();
            }
            gameState.lastUIRefresh = now;
        }
    },

    calculateOfflineProgress(timeOfflineMs) {
        const offlineGains = { ftGained: 0, ideasGained: {} };
        if (!GameLogic._isValidNumber(timeOfflineMs) || timeOfflineMs <= 1000) return offlineGains;
        const secondsOffline = timeOfflineMs / 1000;
        
        // Calculate base ft/sec before applying multiplier
        let baseFtPerSec = 0;
        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const genData = GENERATORS_DATA[genId];
            if (genData && genState.level > 0 && genData.output?.fleeting_thought) {
                const currentLevel = genState.level; const baseOutput = genData.output.fleeting_thought; const scale = genData.outputScale || 1;
                const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                baseFtPerSec += (baseOutput * currentLevel) * levelBonus;
            }
        });
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => {
            const ideaData = IDEAS_DATA[ideaId];
            if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) {
                baseFtPerSec += ideaData.attributes.ft_bonus_per_sec * count;
            }
        });

        // ** NEW: Apply Global FT Multiplier to offline gains **
        let globalMultiplier = 1;
        const methodicalApproachLevel = gameState.generators.methodical_approach?.level || 0;
        if (methodicalApproachLevel > 0) {
            const methodicalApproachData = GENERATORS_DATA.methodical_approach;
            globalMultiplier += methodicalApproachLevel * methodicalApproachData.effect.global_ft_multiplier_bonus;
        }
        offlineGains.ftGained = baseFtPerSec * globalMultiplier * secondsOffline;
        
        // Concept and Crafter generation (remains the same)
        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const genData = GENERATORS_DATA[genId];
            if (genData && genState.level > 0 && genData.output) {
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

    /**
     * Handles the manual click action, now with a bonus from the 'Focused Intent' upgrade.
     */
    sparkFleetingThought() {
        if (!GameLogic._isValidNumber(gameState.resources.fleeting_thought)) gameState.resources.fleeting_thought = 0;
        
        let wisdomShardsBonus = 0;
        if (GameLogic._isValidNumber(gameState.resources.wisdom_shards)) wisdomShardsBonus = gameState.resources.wisdom_shards * 0.1;
        
        // ** NEW: Add bonus from 'Focused Intent' generator **
        let clickBonus = 0;
        const focusedIntentLevel = gameState.generators.focused_intent?.level || 0;
        if (focusedIntentLevel > 0) {
            const focusedIntentData = GENERATORS_DATA.focused_intent;
            const baseBonus = focusedIntentData.effect.ft_per_click;
            const scale = focusedIntentData.outputScale || 1;
            const levelBonus = Math.pow(scale, Math.max(0, focusedIntentLevel - 1));
            // The bonus is additive per level and also scales
            clickBonus = (baseBonus * focusedIntentLevel) * levelBonus;
        }

        const ftGained = 1 + wisdomShardsBonus + clickBonus;
        gameState.resources.fleeting_thought += ftGained;
        
        if (typeof UI !== 'undefined') UI.updateResourceDisplay();
    },

    calculateMultiBuy(baseCost, costScale, currentLevel, multiplier, maxLevel) {
        const result = { levelsToBuy: 0, totalCost: {}, affordableLevels: 0 };
        for (const res in baseCost) { result.totalCost[res] = 0; }
        const maxPossibleBuy = maxLevel - currentLevel;
        if (maxPossibleBuy <= 0) return result;
        result.levelsToBuy = (multiplier === 'Max') ? Math.max(1, maxPossibleBuy) : Math.max(1, Math.min(multiplier, maxPossibleBuy));
        let tempOwnedResources = {};
        Object.keys(gameState.resources).forEach(key => tempOwnedResources[key] = gameState.resources[key]);
        Object.keys(gameState.ideas).forEach(key => tempOwnedResources[key] = gameState.ideas[key]);
        for (let i = 0; i < result.levelsToBuy; i++) {
            const levelToBuy = currentLevel + i;
            let levelCost = {};
            let canAffordThisLevel = true;
            for (const res in baseCost) {
                const calculatedCost = Math.floor(baseCost[res] * Math.pow(costScale, levelToBuy));
                levelCost[res] = calculatedCost;
                result.totalCost[res] += calculatedCost;
                if ((tempOwnedResources[res] || 0) < levelCost[res]) {
                    canAffordThisLevel = false;
                }
            }
            if (canAffordThisLevel) {
                for (const res in levelCost) {
                    tempOwnedResources[res] -= levelCost[res];
                }
                result.affordableLevels++;
            }
        }
        
        if (multiplier === 'Max' && result.affordableLevels === 0) {
        result.levelsToBuy = 1;
        // Recalculate totalCost for just 1 level
        for (const res in baseCost) {
            result.totalCost[res] = 0;
        }
        const levelCost = {};
        for (const res in baseCost) {
            const calculatedCost = Math.floor(baseCost[res] * Math.pow(costScale, currentLevel));
            levelCost[res] = calculatedCost;
            result.totalCost[res] = calculatedCost;
        }
    }
        return result;
    },

    buyGenerator(generatorId) {
        const genData = GENERATORS_DATA[generatorId]; if (!genData) return;
        const currentLevel = gameState.generators[generatorId]?.level || 0;
        if (currentLevel >= (genData.maxLevel || Infinity)) { if (typeof UI !== 'undefined') UI.showNotification("Already at max level!", "info"); return; }
        const purchaseDetails = GameLogic.calculateMultiBuy(genData.baseCost, genData.costScale, currentLevel, gameState.purchaseMultiplier, genData.maxLevel);
        const levelsToBuy = (gameState.purchaseMultiplier === 'Max') ? purchaseDetails.affordableLevels : purchaseDetails.levelsToBuy;
        if (purchaseDetails.affordableLevels < levelsToBuy) { if (typeof UI !== 'undefined') UI.showNotification(`Not enough resources to buy x${gameState.purchaseMultiplier}!`, "error"); return; }
        if (levelsToBuy > 0) {
            const finalPurchase = GameLogic.calculateMultiBuy(genData.baseCost, genData.costScale, currentLevel, levelsToBuy, genData.maxLevel);
            for (const res in finalPurchase.totalCost) { if (gameState.resources[res] !== undefined) gameState.resources[res] -= finalPurchase.totalCost[res]; else if (gameState.ideas[res] !== undefined) gameState.ideas[res] -= finalPurchase.totalCost[res];}
            gameState.generators[generatorId].level += levelsToBuy;
            if (typeof UI !== 'undefined') { UI.updateAllUI(); UI.showNotification(`${genData.name} upgraded by +${levelsToBuy} to Lvl ${gameState.generators[generatorId].level}!`, 'success');}
        } else { if (typeof UI !== 'undefined') UI.showNotification("Not enough resources!", "error");}
    },

    buyAutoCrafter(crafterId) {
        const crafterData = CRAFTERS_DATA[crafterId]; if (!crafterData) return;
        const currentLevel = gameState.crafters[crafterId]?.level || 0;
        if (currentLevel >= (crafterData.maxLevel || Infinity)) { if (typeof UI !== 'undefined') UI.showNotification("Crafter already at max level!", "info"); return; }
        const purchaseDetails = GameLogic.calculateMultiBuy(crafterData.baseCost, crafterData.costScale, currentLevel, gameState.purchaseMultiplier, crafterData.maxLevel);
        const levelsToBuy = (gameState.purchaseMultiplier === 'Max') ? purchaseDetails.affordableLevels : purchaseDetails.levelsToBuy;
        if (purchaseDetails.affordableLevels < levelsToBuy) { if (typeof UI !== 'undefined') UI.showNotification(`Not enough resources for this crafter!`, "error"); return; }
        if (levelsToBuy > 0) {
            const finalPurchase = GameLogic.calculateMultiBuy(crafterData.baseCost, crafterData.costScale, currentLevel, levelsToBuy, crafterData.maxLevel);
            for (const res in finalPurchase.totalCost) { if (gameState.resources[res] !== undefined) gameState.resources[res] -= finalPurchase.totalCost[res]; else if (gameState.ideas[res] !== undefined) gameState.ideas[res] -= finalPurchase.totalCost[res];}
            if (!gameState.crafters[crafterId]) gameState.crafters[crafterId] = { level: 0 };
            gameState.crafters[crafterId].level += levelsToBuy;
            if (typeof UI !== 'undefined') { UI.updateAllUI(); UI.showNotification(`${crafterData.name} upgraded by +${levelsToBuy} to Lvl ${gameState.crafters[crafterId].level}!`, 'success');}
        } else { if (typeof UI !== 'undefined') UI.showNotification("Not enough resources for this crafter!", "error");}
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
            purchaseMultiplier: gameState.purchaseMultiplier,
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
