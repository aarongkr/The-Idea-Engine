// js/gameLogic.js
const GameLogic = {
    lastTick: Date.now(),

    _isValidNumber(value) { /* ... same ... */ return typeof value === 'number' && !isNaN(value); },

    // NEW: Tutorial definition
    tutorialSteps: [
        { goal: "Spark your first Fleeting Thought.", check: () => gameState.stats.totalClicks > 0 },
        { goal: "Build a Mind Palace Construction to begin passive generation.", check: () => gameState.generators.mind_palace?.level > 0 },
        { goal: "Upgrade your Mind Palace to Level 5 to unlock a new tool.", check: () => gameState.generators.mind_palace?.level >= 5 },
        { goal: "Wait for your Logical Filter to produce a Concept: Duality and a Concept: Pattern.", check: () => (gameState.ideas.concept_duality > 0 && gameState.ideas.concept_pattern > 0) },
        { goal: "Go to the Synthesis Forge, combine Duality and Pattern to create your first Insight.", check: () => gameState.ideas.insight_structure > 0 },
        { goal: "Tutorial Complete! The Noosphere is yours to explore. Your goal is to create Paradigms and eventually Transcend.", check: () => false } // Final message
    ],

    tick() {
        const now = Date.now();
        const delta = Math.max(0, (now - (this.lastTick || now)) / 1000);
        if (gameState.stats) gameState.stats.playTimeSeconds = (Number(gameState.stats.playTimeSeconds) || 0) + delta;
        this.lastTick = now;

        if (!GameLogic._isValidNumber(gameState.resources.fleeting_thought)) gameState.resources.fleeting_thought = 0;

        let ftPerSecondFromDirectSources = 0;
        // ... (FT from generators and ideas - same as your version) ...
        Object.entries(gameState.generators).forEach(([id, genState]) => { const genData = GENERATORS_DATA[id]; if (genData?.type === 'ft_generator' && genState.level > 0 && GameLogic._isValidNumber(genData.output?.fleeting_thought)) { const cl = genState.level; const bo = genData.output.fleeting_thought; const sc = genData.outputScale || 1; const lb = Math.pow(sc, Math.max(0, cl - 1)); ftPerSecondFromDirectSources += (bo * cl) * lb; }});
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => { const ideaData = IDEAS_DATA[ideaId]; if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) { if (GameLogic._isValidNumber(ideaData.attributes.ft_bonus_per_sec)) ftPerSecondFromDirectSources += ideaData.attributes.ft_bonus_per_sec * count; }});

        let globalFtMultiplier = 1.0;
        const enhancerState = gameState.generators['cognitive_flow_enhancer'];
        if (enhancerState?.level > 0) { const enhancerData = GENERATORS_DATA['cognitive_flow_enhancer']; if (enhancerData?.type === 'passive_ft_upgrade' && GameLogic._isValidNumber(enhancerData.output?.global_ft_per_sec_multiplier_bonus)) globalFtMultiplier += (enhancerData.output.global_ft_per_sec_multiplier_bonus * enhancerState.level); }
        const passiveFtGeneratedThisTick = ftPerSecondFromDirectSources * globalFtMultiplier * delta;

        if (GameLogic._isValidNumber(passiveFtGeneratedThisTick)) {
            gameState.resources.fleeting_thought += passiveFtGeneratedThisTick;
            if (gameState.stats) {
                gameState.stats.ftGeneratedPassive = (Number(gameState.stats.ftGeneratedPassive) || 0) + passiveFtGeneratedThisTick;
                gameState.stats.lifetimeFT = (Number(gameState.stats.lifetimeFT) || 0) + passiveFtGeneratedThisTick;
            }
        }

        // ... (Concept generation - same as your version) ...
        Object.entries(gameState.generators).forEach(([id, genState]) => { const genData = GENERATORS_DATA[id]; if (genData?.type === 'concept_generator' && genState.level > 0 && genData.output) { const cl = genState.level; Object.entries(genData.output).forEach(([oID, bC]) => { if (GameLogic._isValidNumber(bC)) { const sc = genData.outputScale || 1; const lb = Math.pow(sc, Math.max(0, cl - 1)); const cPS = (bC * cl) * lb; if (GameLogic._isValidNumber(cPS) && delta > 0 && Math.random() < cPS * delta) GameLogic.gainIdea(oID, 1); } }); }});


        // ... (Auto-crafter logic - same as your version) ...
        Object.entries(gameState.crafters).forEach(([crId, crSt]) => { const crD = CRAFTERS_DATA[crId]; const cl = crSt?.level; if (crD && GameLogic._isValidNumber(cl) && cl > 0) { const tID = IDEAS_DATA[crD.targetIdeaId]; if (!tID?.recipe?.length) return; const oS = crD.outputScale || 1; const bOA = crD.outputAmount || 0; if (!GameLogic._isValidNumber(bOA) || !GameLogic._isValidNumber(oS)) return; const lb = Math.pow(oS, Math.max(0, cl - 1)); const crPS = (bOA * cl) * lb; const pCTT = crPS * delta; let cA = Math.floor(pCTT) + (Math.random() < (pCTT % 1) ? 1 : 0); for (let i = 0; i < cA; i++) { const cAI = tID.recipe.every(ingId => (gameState.ideas[ingId] || 0) >= 1); if (cAI) { tID.recipe.forEach(ingId => { gameState.ideas[ingId]--; }); GameLogic.gainIdea(crD.targetIdeaId, 1, true); if(gameState.stats) gameState.stats.autoCraftProductions = (Number(gameState.stats.autoCraftProductions) || 0) + 1; } else { break; } } } });


        // NEW: Check for tutorial advancement
        if (gameState.tutorial.isActive) {
            GameLogic.checkTutorialProgress();
        }

        if (now - (gameState.lastUIRefresh || 0) > 200) {
            if (typeof UI !== 'undefined') UI.updateAllUI();
            gameState.lastUIRefresh = now;
        }
    },

    checkTutorialProgress() {
        if (!gameState.tutorial.isActive) return;
        const currentStep = this.tutorialSteps[gameState.tutorial.step];
        if (currentStep && currentStep.check()) {
            this.advanceTutorial();
        }
    },

    advanceTutorial() {
        gameState.tutorial.step++;
        if (gameState.tutorial.step >= this.tutorialSteps.length - 1) { // -1 because last step is just a message
            gameState.tutorial.isActive = false;
            if (typeof UI !== 'undefined') UI.showNotification("Tutorial Complete!", "special");
        }
        // Force an immediate UI update to show the new tutorial step or clear the panel
        if (typeof UI !== 'undefined') UI.updateAllUI();
    },

    skipTutorial() {
        if (gameState.tutorial.isActive) {
            gameState.tutorial.isActive = false;
            gameState.tutorial.step = this.tutorialSteps.length; // Mark as done
            if (typeof UI !== 'undefined') {
                UI.showNotification("Tutorial Skipped.", "info");
                UI.updateAllUI(); // Refresh UI to remove tutorial view
            }
        }
    },

    calculateOfflineProgress(timeOfflineMs) { /* ... same as your version ... */
        const offlineGains = { ftGained: 0, ideasGained: {} }; if (!GameLogic._isValidNumber(timeOfflineMs) || timeOfflineMs <= 1000) return offlineGains;
        const secondsOffline = timeOfflineMs / 1000; let ftPerSecBaseOffline = 0;
        Object.entries(gameState.generators).forEach(([id, genState]) => { const genData = GENERATORS_DATA[id]; if (genData?.type === 'ft_generator' && genState.level > 0 && GameLogic._isValidNumber(genData.output?.fleeting_thought)) { const cl = genState.level; const bo = genData.output.fleeting_thought; const sc = genData.outputScale || 1; const lb = Math.pow(sc, Math.max(0, cl - 1)); ftPerSecBaseOffline += (bo * cl) * lb; }});
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => { const ideaData = IDEAS_DATA[ideaId]; if (ideaData?.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) { if (GameLogic._isValidNumber(ideaData.attributes.ft_bonus_per_sec)) ftPerSecBaseOffline += ideaData.attributes.ft_bonus_per_sec * count; }});
        let globalFtMultiplierOffline = 1.0; const enhState = gameState.generators['cognitive_flow_enhancer']; if (enhState?.level > 0) { const enhData = GENERATORS_DATA['cognitive_flow_enhancer']; if (enhData?.type === 'passive_ft_upgrade' && GameLogic._isValidNumber(enhData.output?.global_ft_per_sec_multiplier_bonus)) globalFtMultiplierOffline += (enhData.output.global_ft_per_sec_multiplier_bonus * enhState.level); }
        const totalOfflineFtGenerated = ftPerSecBaseOffline * globalFtMultiplierOffline * secondsOffline;
        if (GameLogic._isValidNumber(totalOfflineFtGenerated)) { offlineGains.ftGained = totalOfflineFtGenerated; if (gameState.stats) { gameState.stats.ftGeneratedPassive = (Number(gameState.stats.ftGeneratedPassive) || 0) + totalOfflineFtGenerated; gameState.stats.lifetimeFT = (Number(gameState.stats.lifetimeFT) || 0) + totalOfflineFtGenerated; }}
        Object.entries(gameState.generators).forEach(([id, genState]) => { const genData = GENERATORS_DATA[id]; if (genData?.type === 'concept_generator' && genState.level > 0 && genData.output) { const cl = genState.level; Object.entries(genData.output).forEach(([oID, bC]) => { if (GameLogic._isValidNumber(bC)) { const sc = genData.outputScale || 1; const lb = Math.pow(sc, Math.max(0, cl - 1)); const ec = (bC * cl) * lb * secondsOffline; const ng = Math.floor(ec) + (Math.random() < (ec % 1) ? 1 : 0); if (GameLogic._isValidNumber(ng) && ng > 0) offlineGains.ideasGained[oID] = (offlineGains.ideasGained[oID] || 0) + ng; } }); }});
        Object.entries(gameState.crafters).forEach(([crId, crSt]) => { const crD = CRAFTERS_DATA[crId]; const cl = crSt?.level; if (crD && GameLogic._isValidNumber(cl) && cl > 0) { const tID = IDEAS_DATA[crD.targetIdeaId]; if (!tID) return; const oS = crD.outputScale || 1; const bOA = crD.outputAmount || 0; if (!GameLogic._isValidNumber(bOA) || !GameLogic._isValidNumber(oS)) return; const lb = Math.pow(oS, Math.max(0, cl - 1)); const crPS = (bOA * cl) * lb; const nCO = Math.floor(crPS * secondsOffline); if (GameLogic._isValidNumber(nCO) && nCO > 0) { offlineGains.ideasGained[crD.targetIdeaId] = (offlineGains.ideasGained[crD.targetIdeaId] || 0) + nCO; if (gameState.stats) gameState.stats.autoCraftProductions = (Number(gameState.stats.autoCraftProductions) || 0) + nCO;}}});
        if (!GameLogic._isValidNumber(offlineGains.ftGained)) offlineGains.ftGained = 0; return offlineGains;
    },

    sparkFleetingThought() {
        if (!GameLogic._isValidNumber(gameState.resources.fleeting_thought)) gameState.resources.fleeting_thought = 0;
        let baseFtPerClick = 1; let wisdomShardsBonus = 0; let clickBonus = 0;
        if (GameLogic._isValidNumber(gameState.resources.wisdom_shards)) wisdomShardsBonus = gameState.resources.wisdom_shards * 0.1;
        const intensifierState = gameState.generators['thought_intensifier'];
        if (intensifierState?.level > 0) { const intensifierData = GENERATORS_DATA['thought_intensifier']; if (intensifierData?.type === 'click_upgrade' && GameLogic._isValidNumber(intensifierData.output?.ft_per_click_bonus)) clickBonus = intensifierData.output.ft_per_click_bonus * intensifierState.level; }
        const ftGained = baseFtPerClick + wisdomShardsBonus + clickBonus;
        gameState.resources.fleeting_thought += ftGained;
        if (gameState.stats) {
            gameState.stats.totalClicks = (Number(gameState.stats.totalClicks) || 0) + 1;
            gameState.stats.ftSparkedManual = (Number(gameState.stats.ftSparkedManual) || 0) + ftGained;
            gameState.stats.lifetimeFT = (Number(gameState.stats.lifetimeFT) || 0) + ftGained;
        }
        // After incrementing stats, check tutorial progress
        GameLogic.checkTutorialProgress();
        if (typeof UI !== 'undefined') UI.updateResourceDisplay(); // Lightweight update for responsiveness
    },

    calculateMaxAffordable(itemData, stateObject) {
        if (!itemData?.baseCost) return 0;
        const currentLevel = stateObject[itemData.id]?.level || 0;
        let affordableLevels = 0;

        // Find the single limiting resource. This is a simplification for performance.
        // A more complex model would recalculate costs for each level.
        let limitingResourceRatio = Infinity;
        for (const res in itemData.baseCost) {
            const owned = gameState.resources[res] ?? gameState.ideas[res] ?? 0;
            const cost = itemData.baseCost[res];
            if (cost > 0) {
                 limitingResourceRatio = Math.min(limitingResourceRatio, owned / cost);
            }
        }
        if (limitingResourceRatio === Infinity || limitingResourceRatio < 1) return 0;

        // For exponential costs, we can't just divide. We need to iterate or use logarithms.
        // Iteration is safer and easier to implement correctly.
        let tempResources = { ...gameState.resources, ...gameState.ideas }; // Create a temporary copy
        let tempLevel = currentLevel;
        const costScale = itemData.costScale || 1;

        // Loop up to a reasonable max (e.g., 2000 levels) to prevent infinite loops
        for(let i = 0; i < 2000; i++) {
            let canAffordThisLevel = true;
            for (const res in itemData.baseCost) {
                const cost = Math.floor(itemData.baseCost[res] * Math.pow(costScale, tempLevel));
                if (tempResources[res] < cost) {
                    canAffordThisLevel = false;
                    break;
                }
            }
            if(canAffordThisLevel) {
                 for (const res in itemData.baseCost) {
                    const cost = Math.floor(itemData.baseCost[res] * Math.pow(costScale, tempLevel));
                    tempResources[res] -= cost;
                 }
                 tempLevel++;
                 affordableLevels++;
            } else {
                break; // Stop when we can't afford the next level
            }
        }
        return affordableLevels;
    },

    buyGenerator(itemId) {
        // This function now just calls the generic one
        GameLogic.buyUpgradable(itemId, GENERATORS_DATA, gameState.generators);
    },

    buyAutoCrafter(crafterId) {
        // This function now just calls the generic one
        GameLogic.buyUpgradable(crafterId, CRAFTERS_DATA, gameState.crafters);
    },

    buyUpgradable(itemId, dataObject, stateObject) {
        const itemData = dataObject[itemId]; if (!itemData) return;
        const buyAmount = gameState.buyMode === -1 ? GameLogic.calculateMaxAffordable(itemData, stateObject) : gameState.buyMode;
        if (buyAmount < 1) return;

        let totalCost = {};
        let finalLevel = (stateObject[itemId]?.level || 0);

        for (let i = 0; i < buyAmount; i++) {
            const levelForCost = finalLevel + i;
            if (levelForCost >= (itemData.maxLevel || Infinity)) { // Stop if we hit max level
                // buyAmount = i; // Adjust actual buy amount
                break;
            }
            for (const res in itemData.baseCost) {
                totalCost[res] = (totalCost[res] || 0) + Math.floor(itemData.baseCost[res] * Math.pow(itemData.costScale || 1, levelForCost));
            }
        }

        let canAffordAll = true;
        for (const res in totalCost) {
            const owned = gameState.resources[res] ?? gameState.ideas[res] ?? 0;
            if (owned < totalCost[res]) { canAffordAll = false; break; }
        }

        if (canAffordAll) {
            for (const res in totalCost) { if (gameState.resources[res] !== undefined) gameState.resources[res] -= totalCost[res]; else if (gameState.ideas[res] !== undefined) gameState.ideas[res] -= totalCost[res]; }
            if (!stateObject[itemId]) stateObject[itemId] = { level: 0 };
            const actualLevelsBought = Math.min(buyAmount, (itemData.maxLevel || Infinity) - stateObject[itemId].level);
            stateObject[itemId].level += actualLevelsBought;
            if (typeof UI !== 'undefined') { UI.updateAllUI(); UI.showNotification(`${itemData.name} +${actualLevelsBought} Lvl! (Now Lvl ${stateObject[itemId].level})`, 'success'); }
            GameLogic.checkTutorialProgress(); // Check tutorial after any purchase
        } else {
            if (typeof UI !== 'undefined') UI.showNotification(`Not enough resources for ${buyAmount > 1 ? `x${buyAmount}`: ''} ${itemData.name}.`, "error");
        }
    },


    attemptCombination() {
        if (!UI?.elements) return;
        const inputId1 = UI.elements.forgeSlot1.value; const inputId2 = UI.elements.forgeSlot2.value;
        if (!inputId1 || !inputId2) { UI.elements.combinationResult.textContent = "Please select two ideas."; UI.elements.combinationResult.className = 'error'; return; }

        let foundRecipeOutput = null;
        for (const outputId in IDEAS_DATA) { const outputData = IDEAS_DATA[outputId]; if (outputData.recipe?.length === 2) { const recipeMatches = ((outputData.recipe[0] === inputId1 && outputData.recipe[1] === inputId2) || (outputData.recipe[0] === inputId2 && outputData.recipe[1] === inputId1)); if (recipeMatches) { foundRecipeOutput = outputData; break; } } }

        if (!foundRecipeOutput) {
            UI.elements.combinationResult.textContent = "These ideas don't form a new synthesis."; UI.elements.combinationResult.className = 'info';
            return;
        }

        const recipe = foundRecipeOutput.recipe;
        let maxCraftable = Infinity;
        if (recipe[0] === recipe[1]) {
            maxCraftable = Math.floor((gameState.ideas[recipe[0]] || 0) / 2);
        } else {
            maxCraftable = Math.min(gameState.ideas[recipe[0]] || 0, gameState.ideas[recipe[1]] || 0);
        }

        const craftAmount = gameState.buyMode === -1 ? maxCraftable : Math.min(maxCraftable, gameState.buyMode);
        if (craftAmount < 1) { UI.elements.combinationResult.textContent = "Not enough ingredients."; UI.elements.combinationResult.className = 'error'; return; }

        recipe.forEach(ingId => { gameState.ideas[ingId] -= craftAmount; });
        GameLogic.gainIdea(foundRecipeOutput.id, craftAmount);
        if (gameState.stats) gameState.stats.ideasSynthesized = (Number(gameState.stats.ideasSynthesized) || 0) + craftAmount;

        UI.elements.combinationResult.textContent = `Success! Synthesized x${craftAmount} ${foundRecipeOutput.name}!`; UI.elements.combinationResult.className = 'success';
        if (!gameState.unlockedRecipes.includes(foundRecipeOutput.id)) { gameState.unlockedRecipes.push(foundRecipeOutput.id); if (typeof UI !== 'undefined') UI.updateDiscoveredRecipes(); }
        if (foundRecipeOutput.recipe) foundRecipeOutput.recipe.forEach(ingId => { if (typeof Noosphere !== 'undefined') Noosphere.addEdge(ingId, foundRecipeOutput.id); });

        if (typeof UI !== 'undefined') { UI.populateForgeSelectors(); UI.updateResourceDisplay(); }
        GameLogic.checkTutorialProgress(); // Check tutorial after first synthesis
    },

    gainIdea(ideaId, amount = 1, fromOfflineOrCrafter = false) { /* ... same as before, ensures stats are updated ... */
        if(!IDEAS_DATA[ideaId]||ideaId==='fleeting_thought'||!GameLogic._isValidNumber(amount)||amount<=0)return;
        const wasFirst= !gameState.discoveredIdeas.has(ideaId); let currentCount=gameState.ideas[ideaId]||0; if(!GameLogic._isValidNumber(currentCount))currentCount=0; gameState.ideas[ideaId]=currentCount+amount; gameState.discoveredIdeas.add(ideaId);
        if(wasFirst){if(typeof UI!=='undefined')UI.showNotification(`Discovery: ${IDEAS_DATA[ideaId].name}!`,'special'); if(!fromOfflineOrCrafter&&typeof Noosphere!=='undefined'){Noosphere.addNode(ideaId);const iD=IDEAS_DATA[ideaId];if(iD.recipe)iD.recipe.forEach(ingId=>{if(gameState.discoveredIdeas.has(ingId))Noosphere.addEdge(ingId,ideaId);}); Object.values(IDEAS_DATA).forEach(pID=>{if(pID.id==='fleeting_thought'||pID.id===ideaId)return;if(pID.recipe?.includes(ideaId)&&gameState.discoveredIdeas.has(pID.id)){if(pID.recipe.every(ing=>gameState.discoveredIdeas.has(ing))){pID.recipe.forEach(ing_id=>Noosphere.addEdge(ing_id,pID.id));}}}); Noosphere.focusOnNode(ideaId);}}
        if(!fromOfflineOrCrafter&&typeof UI!=='undefined'){UI.populateForgeSelectors();UI.updateResourceDisplay();}
    },

    calculateWisdomShardsOnTranscend() { /* ... same ... */
        let totalMass=0;Object.entries(gameState.ideas).forEach(([id,count])=>{const iD=IDEAS_DATA[id];const cC=count;if(iD?.tier>0&&GameLogic._isValidNumber(cC)&&cC>0){constiW=(iD.tier*10);if(GameLogic._isValidNumber(iW))totalMass+=iW*cC;}});
        let curTC=Number(gameState.transcendenceCount)||0; return Math.floor(Math.sqrt(Math.max(0,totalMass)/1000))+curTC;
    },

    transcend() { /* ... updated to check paradigm and save stats ... */
        const pGoalId='paradigm_structural_design'; const pCount=gameState.ideas[pGoalId]; const can=GameLogic._isValidNumber(pCount)&&pCount>0;
        if(!can){if(typeof UI!=='undefined')UI.showNotification("A Paradigm must be realized.","error");return;}
        const wsG=GameLogic.calculateWisdomShardsOnTranscend();if(!GameLogic._isValidNumber(wsG)){if(typeof UI!=='undefined')UI.showNotification("Error in WS calc.","error");return;}
        if(wsG<=0&&gameState.transcendenceCount>0){if(typeof UI!=='undefined')UI.showNotification("No new Wisdom this time.","info");}
        if(!confirm(`Transcend for ${wsG} WS? Resets progress (not WS/stats).`))return;

        const cWS=Number(gameState.resources.wisdom_shards)||0; const cTC=Number(gameState.transcendenceCount)||0;
        const preservedStats = { ...gameState.stats }; // Preserve all stats
        preservedStats.transcendences = (Number(preservedStats.transcendences) || 0) + 1; // Increment transcend count

        const nS={lastUpdate:Date.now(),resources:{fleeting_thought:0,wisdom_shards:cWS+wsG},ideas:{},generators:{},crafters:{},unlockedRecipes:[],noosphereState:{nodes:[],edges:[]},discoveredIdeas:new Set(['fleeting_thought']),transcendenceCount:cTC+1,gameVersion:gameState.gameVersion,buyMode:1,tutorial:{isActive:false,step:999},stats:preservedStats}; // Reset buy mode, disable tutorial
        Object.keys(gameState).forEach(k=>delete gameState[k]); Object.assign(gameState,nS);
        initializeGameState(false); saveGame();
        if(typeof UI!=='undefined'){UI.showNotification(`Transcended! +${wsG} WS.`,'special');if(typeof Noosphere!=='undefined')Noosphere.renderFromGameState();UI.updateAllUI();UI.switchPanel('noosphere-panel',document.querySelector('.nav-button[data-panel="noosphere-panel"]'));}
        GameLogic.lastTick=Date.now(); gameState.lastUIRefresh=0;
    }
};
