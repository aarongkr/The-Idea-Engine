// js/gameLogic.js
const GameLogic = {
    lastTick: Date.now(),

    /**
     * Helper to check if a value is a valid, non-NaN number.
     */
     _isValidNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    },

    /**
     * The main game loop tick. Processes resource generation and auto-crafting.
     */
    tick() {
        const now = Date.now();
        if (!GameLogic._isValidNumber(this.lastTick) || this.lastTick <= 0 || this.lastTick > now) {
             this.lastTick = now - 100; // Estimate a 100ms tick if lastTick is invalid
        }
        const delta = Math.max(0, (now - this.lastTick) / 1000); // Time since last tick in seconds, non-negative
        this.lastTick = now;

        // Ensure Fleeting Thoughts is a valid number before operations
        if (!GameLogic._isValidNumber(gameState.resources.fleeting_thought)) {
             console.error("Correcting invalid FT in tick start:", gameState.resources.fleeting_thought);
             gameState.resources.fleeting_thought = 0;
        }

        // --- I. Fleeting Thought (FT) Generation ---
        let ftPerSecondFromDirectSources = 0;

        // 1. FT from 'ft_generator' type items (e.g., Mind Palace)
        Object.entries(gameState.generators).forEach(([id, genState]) => {
            const genData = GENERATORS_DATA[id];
            if (genData?.type === 'ft_generator' && genState.level > 0 && GameLogic._isValidNumber(genData.output?.fleeting_thought)) {
                const currentLevel = genState.level;
                const baseOutput = genData.output.fleeting_thought;
                const scale = genData.outputScale || 1;
                const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                ftPerSecondFromDirectSources += (baseOutput * currentLevel) * levelBonus;
            }
        });

        // 2. FT from owned Ideas (Concepts, Insights, Theories, Paradigms)
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => {
            const ideaData = IDEAS_DATA[ideaId];
            if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) {
                if (GameLogic._isValidNumber(ideaData.attributes.ft_bonus_per_sec)) {
                     ftPerSecondFromDirectSources += ideaData.attributes.ft_bonus_per_sec * count;
                }
            }
        });

        // 3. Apply Global FT/sec Multiplier (e.g., from Cognitive Flow Enhancer)
        let globalFtMultiplier = 1.0;
        const enhancerState = gameState.generators['cognitive_flow_enhancer'];
        if (enhancerState?.level > 0) {
            const enhancerData = GENERATORS_DATA['cognitive_flow_enhancer'];
            if (enhancerData?.type === 'passive_ft_upgrade' && GameLogic._isValidNumber(enhancerData.output?.global_ft_per_sec_multiplier_bonus)) {
                globalFtMultiplier += (enhancerData.output.global_ft_per_sec_multiplier_bonus * enhancerState.level);
            }
        }
        const totalFtGeneratedThisTick = ftPerSecondFromDirectSources * globalFtMultiplier * delta;

        if (GameLogic._isValidNumber(totalFtGeneratedThisTick)) {
            gameState.resources.fleeting_thought += totalFtGeneratedThisTick;
        }

        // --- II. Concept Generation (from 'concept_generator' types) ---
        Object.entries(gameState.generators).forEach(([id, genState]) => {
            const genData = GENERATORS_DATA[id];
            if (genData?.type === 'concept_generator' && genState.level > 0 && genData.output) {
                const currentLevel = genState.level;
                Object.entries(genData.output).forEach(([outputIdeaId, baseChance]) => {
                    if (GameLogic._isValidNumber(baseChance)) {
                        const scale = genData.outputScale || 1;
                        const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                        const chancePerSecond = (baseChance * currentLevel) * levelBonus;
                        if (GameLogic._isValidNumber(chancePerSecond) && delta > 0 && Math.random() < chancePerSecond * delta) {
                           GameLogic.gainIdea(outputIdeaId, 1);
                        }
                    }
                });
            }
        });

        // --- III. Auto-Crafter Logic (Insights, Theories, Paradigms) ---
        Object.entries(gameState.crafters).forEach(([crafterId, crafterState]) => {
            const crafterData = CRAFTERS_DATA[crafterId];
            const currentLevel = crafterState?.level;
            if (crafterData && GameLogic._isValidNumber(currentLevel) && currentLevel > 0) {
                const targetIdeaData = IDEAS_DATA[crafterData.targetIdeaId];
                if (!targetIdeaData?.recipe?.length) return;

                const outputScale = crafterData.outputScale || 1;
                const baseOutputAmount = crafterData.outputAmount || 0;
                if (!GameLogic._isValidNumber(baseOutputAmount) || !GameLogic._isValidNumber(outputScale)) return;

                const levelBonus = Math.pow(outputScale, Math.max(0, currentLevel - 1));
                const craftsPerSecond = (baseOutputAmount * currentLevel) * levelBonus;
                const potentialCraftsThisTick = craftsPerSecond * delta;
                let craftsAttempted = Math.floor(potentialCraftsThisTick) + (Math.random() < (potentialCraftsThisTick % 1) ? 1 : 0);

                for (let i = 0; i < craftsAttempted; i++) {
                    const canAffordIngredients = targetIdeaData.recipe.every(ingredientId => {
                        const owned = gameState.ideas[ingredientId] || 0;
                        return GameLogic._isValidNumber(owned) && owned >= 1;
                    });
                    if (canAffordIngredients) {
                        targetIdeaData.recipe.forEach(ingredientId => { gameState.ideas[ingredientId]--; });
                        GameLogic.gainIdea(crafterData.targetIdeaId, 1, true); // true: fromOfflineOrCrafter
                    } else {
                        break; // Stop if ingredients run out for this crafter this tick
                    }
                }
            }
        });

        // --- UI Update Throttle ---
        if (now - (gameState.lastUIRefresh || 0) > 200) {
            if (typeof UI !== 'undefined' && UI.updateAllUI) UI.updateAllUI();
            gameState.lastUIRefresh = now;
        }
    },

    /**
     * Calculates gains accumulated while the game was closed.
     */
    calculateOfflineProgress(timeOfflineMs) {
        const offlineGains = { ftGained: 0, ideasGained: {} };
        if (!GameLogic._isValidNumber(timeOfflineMs) || timeOfflineMs <= 1000) return offlineGains;
        const secondsOffline = timeOfflineMs / 1000;

        let ftPerSecBaseOffline = 0;
        Object.entries(gameState.generators).forEach(([id, genState]) => {
            const genData = GENERATORS_DATA[id];
            if (genData?.type === 'ft_generator' && genState.level > 0 && GameLogic._isValidNumber(genData.output?.fleeting_thought)) {
                const currentLevel = genState.level; const baseOutput = genData.output.fleeting_thought; const scale = genData.outputScale || 1;
                const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                ftPerSecBaseOffline += (baseOutput * currentLevel) * levelBonus;
            }
        });
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => {
            const ideaData = IDEAS_DATA[ideaId];
            if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) {
                if (GameLogic._isValidNumber(ideaData.attributes.ft_bonus_per_sec)) {
                    ftPerSecBaseOffline += ideaData.attributes.ft_bonus_per_sec * count;
                }
            }
        });
        let globalFtMultiplierOffline = 1.0;
        const enhancerStateOffline = gameState.generators['cognitive_flow_enhancer'];
        if (enhancerStateOffline?.level > 0) {
            const enhancerDataOffline = GENERATORS_DATA['cognitive_flow_enhancer'];
            if (enhancerDataOffline?.type === 'passive_ft_upgrade' && GameLogic._isValidNumber(enhancerDataOffline.output?.global_ft_per_sec_multiplier_bonus)) {
                globalFtMultiplierOffline += (enhancerDataOffline.output.global_ft_per_sec_multiplier_bonus * enhancerStateOffline.level);
            }
        }
        offlineGains.ftGained = ftPerSecBaseOffline * globalFtMultiplierOffline * secondsOffline;

        Object.entries(gameState.generators).forEach(([id, genState]) => {
             const genData = GENERATORS_DATA[id];
             if (genData?.type === 'concept_generator' && genState.level > 0 && genData.output) {
                 const currentLevel = genState.level;
                 Object.entries(genData.output).forEach(([outputIdeaId, baseChance]) => {
                     if (GameLogic._isValidNumber(baseChance)) {
                         const scale = genData.outputScale || 1;
                         const levelBonus = Math.pow(scale, Math.max(0, currentLevel - 1));
                         const expectedCount = (baseChance * currentLevel) * levelBonus * secondsOffline;
                         const numGenerated = Math.floor(expectedCount) + (Math.random() < (expectedCount % 1) ? 1 : 0);
                         if (GameLogic._isValidNumber(numGenerated) && numGenerated > 0) {
                             offlineGains.ideasGained[outputIdeaId] = (offlineGains.ideasGained[outputIdeaId] || 0) + numGenerated;
                         }
                     }
                 });
             }
        });

        Object.entries(gameState.crafters).forEach(([crafterId, crafterState]) => {
            const crafterData = CRAFTERS_DATA[crafterId]; const currentLevel = crafterState?.level;
            if (crafterData && GameLogic._isValidNumber(currentLevel) && currentLevel > 0) {
                const targetIdeaData = IDEAS_DATA[crafterData.targetIdeaId]; if (!targetIdeaData) return;
                const outputScale = crafterData.outputScale || 1; const baseOutputAmount = crafterData.outputAmount || 0;
                if (!GameLogic._isValidNumber(baseOutputAmount) || !GameLogic._isValidNumber(outputScale)) return;
                const levelBonus = Math.pow(outputScale, Math.max(0, currentLevel - 1));
                const craftsPerSecond = (baseOutputAmount * currentLevel) * levelBonus;
                const numCraftedOffline = Math.floor(craftsPerSecond * secondsOffline);
                if (GameLogic._isValidNumber(numCraftedOffline) && numCraftedOffline > 0) {
                    offlineGains.ideasGained[crafterData.targetIdeaId] = (offlineGains.ideasGained[crafterData.targetIdeaId] || 0) + numCraftedOffline;
                }
            }
        });
        if (!GameLogic._isValidNumber(offlineGains.ftGained)) offlineGains.ftGained = 0;
        return offlineGains;
    },

    /**
     * Handles manual FT generation.
     */
    sparkFleetingThought() {
        if (!GameLogic._isValidNumber(gameState.resources.fleeting_thought)) gameState.resources.fleeting_thought = 0;
        let baseFtPerClick = 1;
        let wisdomShardsBonus = 0;
        if (GameLogic._isValidNumber(gameState.resources.wisdom_shards)) wisdomShardsBonus = gameState.resources.wisdom_shards * 0.1;

        let clickBonus = 0;
        const intensifierState = gameState.generators['thought_intensifier'];
        if (intensifierState?.level > 0) {
            const intensifierData = GENERATORS_DATA['thought_intensifier'];
            if (intensifierData?.type === 'click_upgrade' && GameLogic._isValidNumber(intensifierData.output?.ft_per_click_bonus)) {
                clickBonus = intensifierData.output.ft_per_click_bonus * intensifierState.level;
            }
        }
        const ftGained = baseFtPerClick + wisdomShardsBonus + clickBonus;
        gameState.resources.fleeting_thought += ftGained;
        if (typeof UI !== 'undefined' && UI.updateResourceDisplay) UI.updateResourceDisplay();
    },

    /**
     * Handles buying/upgrading items from GENERATORS_DATA (FT upgrades, FT gens, Concept gens).
     */
    buyGenerator(itemId) {
        const itemData = GENERATORS_DATA[itemId];
        if (!itemData) { console.error(`Attempted to buy unknown item: ${itemId}`); return; }

        const currentLevel = gameState.generators[itemId]?.level || 0;
        if (currentLevel >= (itemData.maxLevel || Infinity)) { if (typeof UI !== 'undefined') UI.showNotification("Already at max level!", "info"); return; }

        let cost = {}; let canAffordAll = true;
        for (const res in itemData.baseCost) {
            const base = itemData.baseCost[res]; const scale = itemData.costScale || 1;
            if(!GameLogic._isValidNumber(base) || !GameLogic._isValidNumber(scale)) { canAffordAll=false; break;}
            cost[res] = Math.floor(base * Math.pow(scale, currentLevel));
            const currentResource = gameState.resources[res] ?? gameState.ideas[res] ?? 0;
            if (!GameLogic._isValidNumber(currentResource) || !GameLogic._isValidNumber(cost[res]) || currentResource < cost[res]) { canAffordAll = false; break;}
        }

        if (canAffordAll) {
            for (const res in cost) {
                if (gameState.resources[res] !== undefined) gameState.resources[res] -= cost[res];
                else if (gameState.ideas[res] !== undefined) gameState.ideas[res] -= cost[res];
            }
            if (!gameState.generators[itemId]) gameState.generators[itemId] = { level: 0 };
            gameState.generators[itemId].level++;
            if (typeof UI !== 'undefined') { UI.updateAllUI(); UI.showNotification(`${itemData.name} ${currentLevel === 0 ? 'built' : 'upgraded'} to Lvl ${gameState.generators[itemId].level}!`, 'success');}
        } else {
            if (typeof UI !== 'undefined') UI.showNotification("Not enough resources!", "error");
        }
    },

    /**
     * Handles buying/upgrading items from CRAFTERS_DATA (Insight, Theory, Paradigm crafters).
     */
    buyAutoCrafter(crafterId) {
        const crafterData = CRAFTERS_DATA[crafterId]; if (!crafterData) { console.error(`Attempted to buy unknown crafter: ${crafterId}`); return; }
        const currentLevel = gameState.crafters[crafterId]?.level || 0;
        if (currentLevel >= (crafterData.maxLevel || Infinity)) { if (typeof UI !== 'undefined') UI.showNotification("Crafter already at max level!", "info"); return;}
        let cost = {}; let canAffordAll = true;
        for (const res in crafterData.baseCost) { const base = crafterData.baseCost[res]; const scale = crafterData.costScale || 1; if(!GameLogic._isValidNumber(base) || !GameLogic._isValidNumber(scale)) {canAffordAll=false; break;} cost[res] = Math.floor(base * Math.pow(scale, currentLevel)); const currentResource = gameState.resources[res] ?? gameState.ideas[res] ?? 0; if (!GameLogic._isValidNumber(currentResource) || !GameLogic._isValidNumber(cost[res]) || currentResource < cost[res]) { canAffordAll = false; break;}}
        if (canAffordAll) { for (const res in cost) { if (gameState.resources[res] !== undefined) gameState.resources[res] -= cost[res]; else if (gameState.ideas[res] !== undefined) gameState.ideas[res] -= cost[res];} if (!gameState.crafters[crafterId]) gameState.crafters[crafterId] = { level: 0 }; gameState.crafters[crafterId].level++; if (typeof UI !== 'undefined') { UI.updateAllUI(); UI.showNotification(`${crafterData.name} ${currentLevel === 0 ? 'built' : 'upgraded'} to Lvl ${gameState.crafters[crafterId].level}!`, 'success');}}
        else { if (typeof UI !== 'undefined') UI.showNotification("Not enough resources to build/upgrade crafter!", "error");}
    },

    /**
     * Attempts to combine two selected ideas in the Synthesis Forge.
     */
    attemptCombination() {
        if (!UI?.elements) return; const inputId1 = UI.elements.forgeSlot1.value; const inputId2 = UI.elements.forgeSlot2.value;
        if (!inputId1 || !inputId2) { UI.elements.combinationResult.textContent = "Please select two ideas to combine."; UI.elements.combinationResult.className = 'error'; return; }
        const idea1Data = IDEAS_DATA[inputId1]; const idea2Data = IDEAS_DATA[inputId2];
        if (!idea1Data || !idea2Data) { UI.elements.combinationResult.textContent = "Invalid idea selection."; UI.elements.combinationResult.className = 'error'; return; }
        const count1 = gameState.ideas[inputId1]; const count2 = gameState.ideas[inputId2];
        if (!GameLogic._isValidNumber(count1) || (inputId1 !== inputId2 && !GameLogic._isValidNumber(count2))) { UI.elements.combinationResult.textContent = "Error reading idea counts."; UI.elements.combinationResult.className = 'error'; return; }
        if (inputId1 === inputId2 && count1 < 2) { UI.elements.combinationResult.textContent = `Need 2x ${idea1Data.name} to combine.`; UI.elements.combinationResult.className = 'error'; return; }
        if (count1 < 1 || (inputId1 !== inputId2 && count2 < 1) ) { UI.elements.combinationResult.textContent = "Not enough ingredients."; UI.elements.combinationResult.className = 'error'; return; }

        let foundRecipeOutput = null;
        for (const outputId in IDEAS_DATA) {
            const outputData = IDEAS_DATA[outputId];
            if (outputData.recipe?.length === 2 && (outputData.tier >= 2 && outputData.tier <=4)) { // Check Tiers 2,3,4
                const recipeMatches = ((outputData.recipe[0] === inputId1 && outputData.recipe[1] === inputId2) || (outputData.recipe[0] === inputId2 && outputData.recipe[1] === inputId1));
                if (recipeMatches) { foundRecipeOutput = outputData; break; }
            }
        }
        if (foundRecipeOutput) {
            gameState.ideas[inputId1]--; if (inputId1 !== inputId2) gameState.ideas[inputId2]--;
            GameLogic.gainIdea(foundRecipeOutput.id, 1);
            UI.elements.combinationResult.textContent = `Success! Synthesized: ${foundRecipeOutput.name}!`; UI.elements.combinationResult.className = 'success';
            if (!gameState.unlockedRecipes.includes(foundRecipeOutput.id)) { gameState.unlockedRecipes.push(foundRecipeOutput.id); if (typeof UI !== 'undefined') UI.updateDiscoveredRecipes(); }
            if (foundRecipeOutput.recipe) { foundRecipeOutput.recipe.forEach(ingredientId => { if (typeof Noosphere !== 'undefined') Noosphere.addEdge(ingredientId, foundRecipeOutput.id); });}
            if (typeof UI !== 'undefined') { UI.populateForgeSelectors(); UI.updateResourceDisplay(); }
        } else { UI.elements.combinationResult.textContent = "These ideas don't form a new synthesis."; UI.elements.combinationResult.className = 'info'; }
    },

    /**
     * Adds an idea to inventory, handles first discovery, and Noosphere updates.
     */
    gainIdea(ideaId, amount = 1, fromOfflineOrCrafter = false) {
        if (!IDEAS_DATA[ideaId] || ideaId === 'fleeting_thought' || !GameLogic._isValidNumber(amount) || amount <= 0) return;
        const wasFirstDiscovery = !gameState.discoveredIdeas.has(ideaId);
        let currentCount = gameState.ideas[ideaId] || 0; if (!GameLogic._isValidNumber(currentCount)) currentCount = 0;
        gameState.ideas[ideaId] = currentCount + amount; gameState.discoveredIdeas.add(ideaId);

        if (wasFirstDiscovery) {
             if (typeof UI !== 'undefined') UI.showNotification(`New Discovery: ${IDEAS_DATA[ideaId].name}!`, 'special');
             if (!fromOfflineOrCrafter && typeof Noosphere !== 'undefined') {
                Noosphere.addNode(ideaId); const ideaData = IDEAS_DATA[ideaId];
                 if (ideaData.recipe) { ideaData.recipe.forEach(ingredientId => { if (gameState.discoveredIdeas.has(ingredientId)) Noosphere.addEdge(ingredientId, ideaId);});}
                 Object.values(IDEAS_DATA).forEach(productIdea => { if (productIdea.id === 'fleeting_thought' || productIdea.id === ideaId) return; if (productIdea.recipe?.includes(ideaId) && gameState.discoveredIdeas.has(productIdea.id)) { if (productIdea.recipe.every(ing => gameState.discoveredIdeas.has(ing))) {productIdea.recipe.forEach(ing_id => Noosphere.addEdge(ing_id, productIdea.id));}}});
                Noosphere.focusOnNode(ideaId);
             }
        }
        // Selective UI updates for direct gains, broader updates handled by tick's UI.updateAllUI
        if (!fromOfflineOrCrafter && typeof UI !== 'undefined') { UI.populateForgeSelectors(); UI.updateResourceDisplay(); }
    },

    /**
     * Calculates Wisdom Shards for Transcendence.
     */
    calculateWisdomShardsOnTranscend() {
        let totalConceptualMass = 0;
        Object.entries(gameState.ideas).forEach(([id, count]) => {
            const ideaData = IDEAS_DATA[id]; const currentCount = count;
            if (ideaData?.tier > 0 && GameLogic._isValidNumber(currentCount) && currentCount > 0) {
                const ideaWorth = (ideaData.tier * 10); // Simplified worth based on tier
                if(GameLogic._isValidNumber(ideaWorth)){ totalConceptualMass += ideaWorth * currentCount;}
            }
        });
        let currentTranscendCount = Number(gameState.transcendenceCount) || 0;
        return Math.floor(Math.sqrt(Math.max(0, totalConceptualMass) / 1000)) + currentTranscendCount;
    },

    /**
     * Handles the Transcendence (prestige) mechanic.
     */
    transcend() {
        const paradigmGoalId = 'paradigm_structural_design'; // Example condition: own this specific paradigm
        const paradigmCount = gameState.ideas[paradigmGoalId];
        const canActuallyTranscend = GameLogic._isValidNumber(paradigmCount) && paradigmCount > 0;

        if (!canActuallyTranscend) { if (typeof UI !== 'undefined') UI.showNotification("A grand Paradigm must first be realized to Transcend.", "error"); return;}
        const wsGained = GameLogic.calculateWisdomShardsOnTranscend();
        if (!GameLogic._isValidNumber(wsGained)) { if (typeof UI !== 'undefined') UI.showNotification("Error calculating Wisdom Shards.", "error"); return;}
        if (wsGained <= 0 && gameState.transcendenceCount > 0) { if (typeof UI !== 'undefined') UI.showNotification("No new Wisdom to be gained this Transcendence.", "info");}
        if (!confirm(`Transcend and gain ${wsGained} Wisdom Shards? This will reset your current progress (except WS and Transcendence count).`)) return;

        const currentWS = Number(gameState.resources.wisdom_shards) || 0;
        const currentTranscendCount = Number(gameState.transcendenceCount) || 0;
        const preservedGameVersion = gameState.gameVersion; // Preserve version

        // Create a completely new gameState object based on the default structure
        const newBaseGameState = {
            lastUpdate: Date.now(),
            resources: { fleeting_thought: 0, wisdom_shards: currentWS + wsGained },
            ideas: {}, generators: {}, crafters: {}, // These will be populated by initializeGameState
            unlockedRecipes: [],
            noosphereState: { nodes: [], edges: [] },
            discoveredIdeas: new Set(['fleeting_thought']), // Start fresh
            transcendenceCount: currentTranscendCount + 1,
            gameVersion: preservedGameVersion
        };
        // Overwrite the global gameState
        Object.keys(gameState).forEach(key => delete gameState[key]); // Clear old properties
        Object.assign(gameState, newBaseGameState); // Assign new structure

        initializeGameState(false); // Sanitize the new post-transcendence state (not a "new game" from scratch)
        saveGame();

        if (typeof UI !== 'undefined') {
            UI.showNotification(`Successfully Transcended! Gained ${wsGained} Wisdom Shards.`, 'special');
            if (typeof Noosphere !== 'undefined') Noosphere.renderFromGameState();
            UI.updateAllUI();
            UI.switchPanel('noosphere-panel', document.querySelector('.nav-button[data-panel="noosphere-panel"]'));
        }
        GameLogic.lastTick = Date.now(); // Reset tick timer
        gameState.lastUIRefresh = 0;    // Force UI update
    }
};