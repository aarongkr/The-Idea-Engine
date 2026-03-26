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
        if (!GameLogic._isValidNumber(GameLogic.lastTick) || GameLogic.lastTick <= 0 || GameLogic.lastTick > now) {
            GameLogic.lastTick = now - 100;
        }
        const delta = Math.max(0, (now - GameLogic.lastTick) / 1000);
        GameLogic.lastTick = now;

        if (typeof Tutorial !== 'undefined' && Tutorial.isActive) {
            Tutorial.checkCompletion();
        }

        if (!GameLogic._isValidNumber(gameState.resources.thought)) {
            gameState.resources.thought = 0;
        }

        // Apply passive thoughts gain
        const thoughtsPerSec = GameLogic.calculateCurrentThoughtsPerSec();
        gameState.resources.thought += thoughtsPerSec * delta;

        // --- Concept generation from generators ---
        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const genData = GENERATORS_DATA[genId];
            if (!genData || genState.level <= 0 || !genData.output) return;
            Object.entries(genData.output).forEach(([outputId, baseChance]) => {
                if (outputId === 'thought' || !GameLogic._isValidNumber(baseChance)) return;
                const level     = genState.level;
                const levelBonus = Math.pow(genData.outputScale || 1, Math.max(0, level - 1));
                const chance    = baseChance * level * levelBonus;
                if (delta > 0 && Math.random() < chance * delta) {
                    GameLogic.gainIdea(outputId, 1);
                }
            });
        });

        // --- Auto-crafter logic ---
        Object.entries(gameState.crafters).forEach(([crafterId, crafterState]) => {
            const cd    = CRAFTERS_DATA[crafterId];
            const level = crafterState?.level;
            if (!cd || !GameLogic._isValidNumber(level) || level <= 0) return;
            const targetData = IDEAS_DATA[cd.targetIdeaId];
            if (!targetData?.recipe) return;
            const levelBonus     = Math.pow(cd.outputScale || 1, Math.max(0, level - 1));
            const craftsPerSec   = (cd.outputAmount || 0) * level * levelBonus;
            const potentialCrafts = craftsPerSec * delta;
            let attempts = Math.floor(potentialCrafts) + (Math.random() < (potentialCrafts % 1) ? 1 : 0);
            for (let i = 0; i < attempts; i++) {
                if (!targetData.recipe.every(ingId => (gameState.ideas[ingId] || 0) >= 1)) break;
                targetData.recipe.forEach(ingId => gameState.ideas[ingId]--);
                GameLogic.gainIdea(cd.targetIdeaId, 1, true);
            }
        });

        // --- Hand off to the UI tick (throttled to 200 ms) ---
        if (now - (gameState.lastUIRefresh || 0) > 200) {
            if (typeof UI !== 'undefined' && UI.tick) {
                UI.tick();
            }
            gameState.lastUIRefresh = now;
        }
    },

    calculateOfflineProgress(timeOfflineMs) {
        const gains = { thoughtsGained: 0, ideasGained: {} };
        if (!GameLogic._isValidNumber(timeOfflineMs) || timeOfflineMs <= 1000) return gains;
        const secondsOffline = timeOfflineMs / 1000;

        // Offline effectiveness from wisdom shop
        let effectiveness = 1.0;
        const effLevel = gameState.wisdomShop.offline_effectiveness?.level || 0;
        if (effLevel > 0) effectiveness = WISDOM_SHOP_DATA.offline_effectiveness.getEffectValue(effLevel) / 100;

        // Time cap from wisdom shop
        let maxHours = 24;
        const capLevel = gameState.wisdomShop.offline_time_cap?.level || 0;
        if (capLevel > 0) maxHours = WISDOM_SHOP_DATA.offline_time_cap.getEffectValue(capLevel);

        const cappedSeconds    = Math.min(secondsOffline, maxHours * 3600);
        const effectiveSeconds = cappedSeconds * effectiveness;

        // thought gains
        const baseThoughtsPerSec = GameLogic.calculateCurrentThoughtsPerSec() / GameLogic.calculateGlobalThoughtsMultiplier();
        gains.thoughtsGained = baseThoughtsPerSec * GameLogic.calculateGlobalThoughtsMultiplier() * effectiveSeconds;
        if (!GameLogic._isValidNumber(gains.thoughtsGained)) gains.thoughtsGained = 0;

        // Concept gains from generators
        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const gd = GENERATORS_DATA[genId];
            if (!gd || genState.level <= 0 || !gd.output) return;
            Object.entries(gd.output).forEach(([outId, baseChance]) => {
                if (outId === 'thought' || !GameLogic._isValidNumber(baseChance)) return;
                const lb       = Math.pow(gd.outputScale || 1, Math.max(0, genState.level - 1));
                const expected = baseChance * genState.level * lb * secondsOffline;
                const n        = Math.floor(expected) + (Math.random() < (expected % 1) ? 1 : 0);
                if (n > 0) gains.ideasGained[outId] = (gains.ideasGained[outId] || 0) + n;
            });
        });

        // Idea gains from crafters
        Object.entries(gameState.crafters).forEach(([crafterId, crafterState]) => {
            const cd = CRAFTERS_DATA[crafterId];
            if (!cd || crafterState.level <= 0) return;
            const lb  = Math.pow(cd.outputScale || 1, Math.max(0, crafterState.level - 1));
            const cps = (cd.outputAmount || 0) * crafterState.level * lb;
            const n   = Math.floor(cps * secondsOffline);
            if (n > 0) gains.ideasGained[cd.targetIdeaId] = (gains.ideasGained[cd.targetIdeaId] || 0) + n;
        });

        return gains;
    },

    sparkThought() {
        if (!GameLogic._isValidNumber(gameState.resources.thought)) gameState.resources.thought = 0;

        // Base 1 Thought + bonus from wisdom shards (minor passive synergy)
        const wsBonus = GameLogic._isValidNumber(gameState.resources.wisdom_shards)
            ? gameState.resources.wisdom_shards * 0.1 : 0;

        // Bonus from Focused Intent generator
        let clickBonus = 0;
        const fiLevel = gameState.generators.focused_intent?.level || 0;
        if (fiLevel > 0) {
            const fi = GENERATORS_DATA.focused_intent;
            clickBonus = fi.effect.thought_per_click * fiLevel * Math.pow(fi.outputScale || 1, Math.max(0, fiLevel - 1));
        }

        // Bonus from Wisdom Shop: Deep Contemplation tap bonus
        let tapBonus = 0;
        const tapLevel = gameState.wisdomShop.tap_thoughts_bonus?.level || 0;
        if (tapLevel > 0) {
            tapBonus = GameLogic.calculateCurrentThoughtsPerSec() * (WISDOM_SHOP_DATA.tap_thoughts_bonus.getEffectValue(tapLevel) / 100);
        }

        gameState.resources.thought += 1 + wsBonus + clickBonus + tapBonus;

        // Only the counters need to update — no card rebuilds required
        if (typeof UI !== 'undefined') UI._tickCounters();
    },

    calculateCurrentThoughtsPerSec() {
        let total = 0;

        // From base generators
        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const gd = GENERATORS_DATA[genId];
            if (!gd || genState.level <= 0 || !gd.output?.thought) return;
            const lb = Math.pow(gd.outputScale || 1, Math.max(0, genState.level - 1));
            total += gd.output.thought * genState.level * lb;
        });

        // From owned ideas
        Object.entries(gameState.ideas).forEach(([ideaId, count]) => {
            const d = IDEAS_DATA[ideaId];
            if (d?.attributes?.thoughts_bonus_per_sec && GameLogic._isValidNumber(count) && count > 0) {
                total += d.attributes.thoughts_bonus_per_sec * count;
            }
        });

        return total * GameLogic.calculateGlobalThoughtsMultiplier();
    },

    calculateGlobalThoughtsMultiplier() {
        let multiplier = 1;

        // Methodical Approach generator bonus
        const maLevel = gameState.generators.methodical_approach?.level || 0;
        if (maLevel > 0) {
            multiplier += maLevel * GENERATORS_DATA.methodical_approach.effect.global_thought_multiplier_bonus;
        }

        // Wisdom shop global multipliers
        ['global_thoughts_multiplier_25', 'global_thoughts_multiplier_50', 'global_thoughts_multiplier_75',
         'global_thoughts_multiplier_100', 'global_thoughts_multiplier_150'].forEach(id => {
            if ((gameState.wisdomShop[id]?.level || 0) > 0) {
                multiplier += WISDOM_SHOP_DATA[id].getEffectValue();
            }
        });

        return multiplier;
    },

    calculateMultiBuy(baseCost, costScale, currentLevel, multiplier, maxLevel) {
        const result = { levelsToBuy: 0, totalCost: {}, affordableLevels: 0 };
        for (const res in baseCost) result.totalCost[res] = 0;

        const maxPossible = maxLevel - currentLevel;
        if (maxPossible <= 0) return result;

        result.levelsToBuy = multiplier === 'Max'
            ? Math.max(1, maxPossible)
            : Math.max(1, Math.min(multiplier, maxPossible));

        // Simulate spending to find how many levels are actually affordable
        const owned = {};
        Object.keys(gameState.resources).forEach(k => owned[k] = gameState.resources[k]);
        Object.keys(gameState.ideas).forEach(k => owned[k] = gameState.ideas[k]);

        for (let i = 0; i < result.levelsToBuy; i++) {
            const lvl = currentLevel + i;
            const levelCost = {};
            let affordable = true;
            for (const res in baseCost) {
                const c = Math.floor(baseCost[res] * Math.pow(costScale, lvl));
                levelCost[res] = c;
                result.totalCost[res] += c;
                if ((owned[res] || 0) < c) affordable = false;
            }
            if (affordable) {
                for (const res in levelCost) owned[res] -= levelCost[res];
                result.affordableLevels++;
            }
        }

        // If Max mode and nothing is affordable, show cost for next single level
        if (multiplier === 'Max' && result.affordableLevels === 0) {
            result.levelsToBuy = 1;
            for (const res in baseCost) result.totalCost[res] = 0;
            for (const res in baseCost) {
                result.totalCost[res] = Math.floor(baseCost[res] * Math.pow(costScale, currentLevel));
            }
        }

        return result;
    },

    buyGenerator(generatorId) {
        const gd = GENERATORS_DATA[generatorId];
        if (!gd) return;
        const level = gameState.generators[generatorId]?.level || 0;
        if (level >= (gd.maxLevel || Infinity)) { UI?.showNotification('Already at max level!', 'info'); return; }

        const pd       = GameLogic.calculateMultiBuy(gd.baseCost, gd.costScale, level, gameState.purchaseMultiplier, gd.maxLevel);
        const toBuy    = gameState.purchaseMultiplier === 'Max' ? pd.affordableLevels : pd.levelsToBuy;
        if (pd.affordableLevels < toBuy) { UI?.showNotification(`Not enough resources to buy x${gameState.purchaseMultiplier}!`, 'error'); return; }
        if (toBuy <= 0) { UI?.showNotification('Not enough resources!', 'error'); return; }

        const final = GameLogic.calculateMultiBuy(gd.baseCost, gd.costScale, level, toBuy, gd.maxLevel);
        for (const res in final.totalCost) {
            if (gameState.resources[res] !== undefined)  gameState.resources[res] -= final.totalCost[res];
            else if (gameState.ideas[res] !== undefined) gameState.ideas[res]     -= final.totalCost[res];
        }
        gameState.generators[generatorId].level += toBuy;

        if (typeof UI !== 'undefined') {
            // Invalidate only the generator cache — nothing else changed
            UI._last.generators = null;
            UI.showNotification(`${gd.name} upgraded by +${toBuy} to Lvl ${gameState.generators[generatorId].level}!`, 'success');
        }
    },

    buyAutoCrafter(crafterId) {
        const cd = CRAFTERS_DATA[crafterId];
        if (!cd) return;
        const level = gameState.crafters[crafterId]?.level || 0;
        if (level >= (cd.maxLevel || Infinity)) { UI?.showNotification('Crafter already at max level!', 'info'); return; }

        const pd    = GameLogic.calculateMultiBuy(cd.baseCost, cd.costScale, level, gameState.purchaseMultiplier, cd.maxLevel);
        const toBuy = gameState.purchaseMultiplier === 'Max' ? pd.affordableLevels : pd.levelsToBuy;
        if (pd.affordableLevels < toBuy) { UI?.showNotification('Not enough resources for this crafter!', 'error'); return; }
        if (toBuy <= 0) { UI?.showNotification('Not enough resources for this crafter!', 'error'); return; }

        const final = GameLogic.calculateMultiBuy(cd.baseCost, cd.costScale, level, toBuy, cd.maxLevel);
        for (const res in final.totalCost) {
            if (gameState.resources[res] !== undefined)  gameState.resources[res] -= final.totalCost[res];
            else if (gameState.ideas[res] !== undefined) gameState.ideas[res]     -= final.totalCost[res];
        }
        if (!gameState.crafters[crafterId]) gameState.crafters[crafterId] = { level: 0 };
        gameState.crafters[crafterId].level += toBuy;

        if (typeof UI !== 'undefined') {
            // Invalidate only the relevant crafter tier cache
            const prefix = crafterId.startsWith('paradigm_') ? 'paradigmCrafters'
                         : crafterId.startsWith('theory_')   ? 'theoryCrafters'
                         : 'insightCrafters';
            UI._last[prefix] = null;
            UI.showNotification(`${cd.name} upgraded by +${toBuy} to Lvl ${gameState.crafters[crafterId].level}!`, 'success');
        }
    },

    attemptCombination() {
        if (!UI?.elements) return;
        const id1 = UI.elements.forgeSlot1.value;
        const id2 = UI.elements.forgeSlot2.value;
        if (!id1 || !id2) { UI.elements.combinationResult.textContent = 'Please select two ideas to combine.'; UI.elements.combinationResult.className = 'error'; return; }

        const d1 = IDEAS_DATA[id1], d2 = IDEAS_DATA[id2];
        if (!d1 || !d2) { UI.elements.combinationResult.textContent = 'Invalid idea selection.'; UI.elements.combinationResult.className = 'error'; return; }

        const c1 = gameState.ideas[id1], c2 = gameState.ideas[id2];
        if (!GameLogic._isValidNumber(c1) || (id1 !== id2 && !GameLogic._isValidNumber(c2))) { UI.elements.combinationResult.textContent = 'Error reading idea counts.'; UI.elements.combinationResult.className = 'error'; return; }
        if (id1 === id2 && c1 < 2) { UI.elements.combinationResult.textContent = `Need 2x ${d1.name} to combine with itself.`; UI.elements.combinationResult.className = 'error'; return; }
        if (c1 < 1 || (id1 !== id2 && c2 < 1)) { UI.elements.combinationResult.textContent = 'Not enough of the selected ideas.'; UI.elements.combinationResult.className = 'error'; return; }

        let found = null;
        for (const outId in IDEAS_DATA) {
            const out = IDEAS_DATA[outId];
            if (out.recipe?.length === 2 &&
                ((out.recipe[0] === id1 && out.recipe[1] === id2) ||
                 (out.recipe[0] === id2 && out.recipe[1] === id1))) {
                found = out; break;
            }
        }

        if (found) {
            gameState.ideas[id1]--;
            if (id1 !== id2) gameState.ideas[id2]--;
            GameLogic.gainIdea(found.id, 1);
            UI.elements.combinationResult.textContent = `Success! Synthesised: ${found.name}!`;
            UI.elements.combinationResult.className   = 'success';

            if (!gameState.unlockedRecipes.includes(found.id)) {
                gameState.unlockedRecipes.push(found.id);
                // Invalidate recipe cache — a new recipe was added
                UI._last.recipes = null;
            }

            if (found.recipe) {
                found.recipe.forEach(ingId => { if (typeof Noosphere !== 'undefined') Noosphere.addEdge(ingId, found.id); });
            }
            // Repopulate forge selectors since counts changed
            UI.populateForgeSelectors();
        } else {
            UI.elements.combinationResult.textContent = "These ideas don't seem to form a new synthesis... yet.";
            UI.elements.combinationResult.className   = 'info';
        }
    },

    gainIdea(ideaId, amount = 1, fromBatch = false) {
        if (!IDEAS_DATA[ideaId] || ideaId === 'thought' || !GameLogic._isValidNumber(amount) || amount <= 0) return;
        const wasNew = !gameState.discoveredIdeas.has(ideaId);
        gameState.ideas[ideaId] = (GameLogic._isValidNumber(gameState.ideas[ideaId]) ? gameState.ideas[ideaId] : 0) + amount;
        gameState.discoveredIdeas.add(ideaId);

        if (wasNew) {
            UI?.showNotification(`New Discovery: ${IDEAS_DATA[ideaId].name}!`, 'special');
            if (!fromBatch && typeof Noosphere !== 'undefined') {
                Noosphere.addNode(ideaId);
                const d = IDEAS_DATA[ideaId];
                if (d.recipe) d.recipe.forEach(ingId => { if (gameState.discoveredIdeas.has(ingId)) Noosphere.addEdge(ingId, ideaId); });
                Object.values(IDEAS_DATA).forEach(pd => {
                    if (pd.id === 'thought' || pd.id === ideaId) return;
                    if (pd.recipe?.includes(ideaId) && gameState.discoveredIdeas.has(pd.id) && pd.recipe.every(ing => gameState.discoveredIdeas.has(ing))) {
                        pd.recipe.forEach(ing => Noosphere.addEdge(ing, pd.id));
                    }
                });
                Noosphere.focusOnNode(ideaId);
            }
        }

        if (!fromBatch && typeof UI !== 'undefined') {
            // Forge selectors need to know about the new idea / updated count
            UI.populateForgeSelectors();
            // Counter update (Thoughts/sec may have changed from idea's thoughts_bonus_per_sec)
            UI._tickCounters();
        }
    },

    calculateWisdomShardsOnTranscend() {
        let mass = 0;
        Object.entries(gameState.ideas).forEach(([id, count]) => {
            const d = IDEAS_DATA[id];
            if (d?.tier > 0 && GameLogic._isValidNumber(count) && count > 0) {
                const worth = d.tier * 10;
                if (GameLogic._isValidNumber(worth)) mass += worth * count;
            }
        });
        return Math.floor(Math.sqrt(Math.max(0, mass) / 1000)) + (Number(gameState.transcendenceCount) || 0);
    },

    transcend() {
        const hasParadigm = Array.from(gameState.discoveredIdeas).some(id => IDEAS_DATA[id]?.tier === 4 && (gameState.ideas[id] || 0) > 0);
        if (!hasParadigm) { UI?.showNotification('A Paradigm is required to Transcend.', 'error'); return; }

        const ws = GameLogic.calculateWisdomShardsOnTranscend();
        if (!GameLogic._isValidNumber(ws)) { UI?.showNotification('Error calculating Wisdom Shards.', 'error'); return; }
        if (ws <= 0 && gameState.transcendenceCount > 0) UI?.showNotification('No new Wisdom to be gained this Transcendence.', 'info');
        if (!confirm(`Transcend and gain ${ws} Wisdom Shards? This will reset your current progress (except WS and Transcendence count).`)) return;

        const newState = {
            lastUpdate: Date.now(),
            resources: { thought: 0, wisdom_shards: (Number(gameState.resources.wisdom_shards) || 0) + ws },
            ideas: {}, generators: {}, crafters: {}, unlockedRecipes: [],
            noosphereState: { nodes: [], edges: [] },
            discoveredIdeas: new Set(['thought']),
            transcendenceCount: (Number(gameState.transcendenceCount) || 0) + 1,
            tutorialCompleted: true,
            purchaseMultiplier: gameState.purchaseMultiplier,
            gameVersion: gameState.gameVersion
        };
        Object.keys(gameState).forEach(k => delete gameState[k]);
        Object.assign(gameState, newState);
        initializeGameState(false);
        saveGame();

        if (typeof UI !== 'undefined') {
            // Full reset — everything must re-render
            UI.invalidateAllCaches();
            UI.showNotification(`Successfully Transcended! Gained ${ws} Wisdom Shards.`, 'special');
            if (typeof Noosphere !== 'undefined') Noosphere.renderFromGameState();
            UI.updateAllUI();
            UI.switchPanel('noosphere-panel', document.querySelector('.nav-button[data-panel="noosphere-panel"]'));
        }
        GameLogic.lastTick = Date.now();
        gameState.lastUIRefresh = 0;
    }
};