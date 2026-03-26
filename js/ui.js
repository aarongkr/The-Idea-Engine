// js/ui.js

/**
 * Handles all DOM interactions and UI updates for the game.
 *
 * UPDATE PHILOSOPHY
 * -----------------
 * Every piece of the UI has exactly one update function. Each function tracks
 * the last value it rendered and returns immediately (touching zero DOM) if
 * nothing has changed. The game tick calls UI.tick() which dispatches only to
 * the functions whose inputs have actually changed since last render.
 *
 * As a result:
 *   - The thought counter updates every tick (it changes every tick).
 *   - Card grids only rebuild when a purchase is made or affordability flips.
 *   - The Transcend button only updates when paradigm ownership changes.
 *   - Nothing touches the DOM "just in case".
 *
 * External callers (buyGenerator, gainIdea, etc.) call the specific narrow
 * update they need rather than the catch-all updateAllUI(). updateAllUI()
 * still exists but should only be used after wholesale state changes such as
 * load/reset/transcend where everything genuinely needs to re-render.
 */
const UI = {
    elements: {
        thoughtCount:                 document.getElementById('thought-count'),
        thoughtsPerSecCount:           document.getElementById('thoughts-per-sec-count'),
        wsCount:                 document.getElementById('ws-count'),
        sparkButton:             document.getElementById('spark-button'),
        multiplierButton:        document.getElementById('multiplier-button'),
        generatorsList:          document.getElementById('generators-list'),
        forgeSlot1:              document.getElementById('forge-slot-1'),
        forgeSlot2:              document.getElementById('forge-slot-2'),
        combineButton:           document.getElementById('combine-button'),
        combinationResult:       document.getElementById('combination-result'),
        discoveredRecipesList:   document.getElementById('discovered-recipes-list'),
        navButtons:              document.querySelectorAll('.nav-button'),
        panels:                  document.querySelectorAll('.panel'),
        selectedIdeaName:        document.getElementById('selected-idea-name'),
        selectedIdeaDescription: document.getElementById('selected-idea-description'),
        selectedIdeaAttributes:  document.getElementById('selected-idea-attributes'),
        activeConceptsSummary:   document.getElementById('active-concepts-summary'),
        conceptsList:            document.getElementById('concepts-list'),
        insightsList:            document.getElementById('insights-list'),
        insightCraftersList:     document.getElementById('insight-crafters-list'),
        theoriesList:            document.getElementById('theories-list'),
        theoryCraftersList:      document.getElementById('theory-crafters-list'),
        paradigmsList:           document.getElementById('paradigms-list'),
        paradigmCraftersList:    document.getElementById('paradigm-crafters-list'),
        transcendButton:         document.getElementById('transcend-button'),
        wsShopBalance:           document.getElementById('ws-shop-balance'),
        qolUpgrades:             document.getElementById('qol-upgrades'),
        tapUpgrades:             document.getElementById('tap-upgrades'),
        globalUpgrades:          document.getElementById('global-upgrades'),
        offlineUpgrades:         document.getElementById('offline-upgrades'),
    },

    // =========================================================================
    // Per-element last-rendered value cache.
    // Primitive values (strings, booleans) are stored directly.
    // Section cache keys are strings — if null the section will always re-render.
    // =========================================================================
    _last: {
        thoughtText:             null,
        thoughtsPerSecText:       null,
        wsText:             null,
        multiplierVisible:  null,
        multiplierText:     null,
        tierSummaryKey:     null,
        transcendDisabled:  null,
        transcendText:      null,
        generators:         null,
        insightCrafters:    null,
        theoryCrafters:     null,
        paradigmCrafters:   null,
        concepts:           null,
        insights:           null,
        theories:           null,
        paradigms:          null,
        wisdomShop:         null,
        recipes:            null,
    },

    // =========================================================================
    // Initialisation
    // =========================================================================
    init() {
        this.elements.navButtons.forEach(btn =>
            btn.addEventListener('click', () => this.switchPanel(btn.dataset.panel, btn)));
        this.elements.multiplierButton.addEventListener('click', () => this.cycleMultiplier());
        this.elements.generatorsList.addEventListener('click', this.handleBuyGeneratorClick);
        this.elements.insightCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.theoryCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.paradigmCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.discoveredRecipesList.addEventListener('click', this.handleRecipeClick);
        if (this.elements.qolUpgrades)     this.elements.qolUpgrades.addEventListener('click', this.handleWisdomShopPurchase);
        if (this.elements.tapUpgrades)     this.elements.tapUpgrades.addEventListener('click', this.handleWisdomShopPurchase);
        if (this.elements.globalUpgrades)  this.elements.globalUpgrades.addEventListener('click', this.handleWisdomShopPurchase);
        if (this.elements.offlineUpgrades) this.elements.offlineUpgrades.addEventListener('click', this.handleWisdomShopPurchase);
    },

    // =========================================================================
    // tick() — called by the game loop every 200 ms.
    //
    // Checks each logical group independently. Only calls the renderer for a
    // group when its data has changed since the last tick. No direct DOM writes
    // happen here — that is delegated to the renderer functions below.
    // =========================================================================
    tick() {
        this._tickCounters();
        this._tickTierSummary();
        this._tickTranscendButton();
        this._tickGenerators();
        this._tickCrafters();
        this._tickIdeaLists();
        this._tickWisdomShop();
        this._tickRecipes();
        // Forge selectors and multiplier button are updated imperatively from
        // the events that change them — not polled here.
    },

    // =========================================================================
    // Tick sub-routines
    // Each one: compute a lightweight key → compare → call renderer only if changed
    // =========================================================================

    _tickCounters() {
        const thoughtText = Utils.formatNumber(gameState.resources.thought);
        if (thoughtText !== this._last.thoughtText) {
            this.elements.thoughtCount.textContent = thoughtText;
            this._last.thoughtText = thoughtText;
        }

        const wsText = Utils.formatNumber(gameState.resources.wisdom_shards);
        if (wsText !== this._last.wsText) {
            this.elements.wsCount.textContent = wsText;
            this._last.wsText = wsText;
        }

        const thoughtsPerSecText = Utils.formatNumber(GameLogic.calculateCurrentThoughtsPerSec()) + '/sec';
        if (thoughtsPerSecText !== this._last.thoughtsPerSecText) {
            this.elements.thoughtsPerSecCount.textContent = thoughtsPerSecText;
            this._last.thoughtsPerSecText = thoughtsPerSecText;
        }
    },

    _tickTierSummary() {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
        const totals = { 1: 0, 2: 0, 3: 0, 4: 0 };
        Object.values(IDEAS_DATA).forEach(d => {
            const t = d.tier;
            if (t >= 1 && t <= 4) {
                totals[t]++;
                if (gameState.discoveredIdeas.has(d.id) && (gameState.ideas[d.id] || 0) > 0) counts[t]++;
            }
        });
        const key = `${counts[1]},${counts[2]},${counts[3]},${counts[4]}`;
        if (key === this._last.tierSummaryKey) return;
        this._last.tierSummaryKey = key;

        this.elements.activeConceptsSummary.innerHTML =
            `<h3>Idea Tiers</h3><ul class="compact-list">` +
            `<li>Concepts: ${counts[1]} / ${totals[1]}</li>` +
            `<li>Insights: ${counts[2]} / ${totals[2]}</li>` +
            `<li>Theories: ${counts[3]} / ${totals[3]}</li>` +
            `<li>Paradigms: ${counts[4]} / ${totals[4]}</li>` +
            `</ul>`;
    },

    _tickTranscendButton() {
        const anyParadigm = Array.from(gameState.discoveredIdeas)
            .some(id => IDEAS_DATA[id]?.tier === 4 && (gameState.ideas[id] || 0) > 0);

        let disabled = true;
        let text = 'A Paradigm is Required';
        if (anyParadigm && typeof GameLogic !== 'undefined' && GameLogic.calculateWisdomShardsOnTranscend) {
            const ws = GameLogic.calculateWisdomShardsOnTranscend();
            if (GameLogic._isValidNumber(ws)) { disabled = false; text = `Transcend (${ws} WS)`; }
        }

        if (disabled !== this._last.transcendDisabled) {
            this.elements.transcendButton.disabled = disabled;
            this._last.transcendDisabled = disabled;
        }
        if (text !== this._last.transcendText) {
            this.elements.transcendButton.textContent = text;
            this._last.transcendText = text;
        }
    },

    _tickGenerators() {
        const key = this._generatorsCacheKey();
        if (key === this._last.generators) return;
        this._last.generators = key;
        this.renderGenerators();
    },

    _tickCrafters() {
        const iKey = this._craftersCacheKey('insight');
        if (iKey !== this._last.insightCrafters) {
            this._last.insightCrafters = iKey;
            this.renderAutoCrafters('insight', this.elements.insightCraftersList);
        }
        const tKey = this._craftersCacheKey('theory');
        if (tKey !== this._last.theoryCrafters) {
            this._last.theoryCrafters = tKey;
            this.renderAutoCrafters('theory', this.elements.theoryCraftersList);
        }
        const pKey = this._craftersCacheKey('paradigm');
        if (pKey !== this._last.paradigmCrafters) {
            this._last.paradigmCrafters = pKey;
            this.renderAutoCrafters('paradigm', this.elements.paradigmCraftersList);
        }
    },

    _tickIdeaLists() {
        const c = this._ideaListCacheKey(1);
        if (c !== this._last.concepts)  { this._last.concepts  = c; this.renderTieredIdeaList(1, this.elements.conceptsList); }
        const i = this._ideaListCacheKey(2);
        if (i !== this._last.insights)  { this._last.insights  = i; this.renderTieredIdeaList(2, this.elements.insightsList); }
        const t = this._ideaListCacheKey(3);
        if (t !== this._last.theories)  { this._last.theories  = t; this.renderTieredIdeaList(3, this.elements.theoriesList); }
        const p = this._ideaListCacheKey(4);
        if (p !== this._last.paradigms) { this._last.paradigms = p; this.renderTieredIdeaList(4, this.elements.paradigmsList); }
    },

    _tickWisdomShop() {
        const key = this._wisdomShopCacheKey();
        if (key === this._last.wisdomShop) return;
        this._last.wisdomShop = key;
        this._renderWisdomShopNow();
    },

    _tickRecipes() {
        const key = this._recipesCacheKey();
        if (key === this._last.recipes) return;
        this._last.recipes = key;
        this._renderRecipesNow();
    },

    // =========================================================================
    // Cache key helpers — lightweight strings representing each section's inputs
    // =========================================================================

    _generatorsCacheKey() {
        return Object.values(GENERATORS_DATA).map(gen => {
            const level = gameState.generators[gen.id]?.level || 0;

            const pd = GameLogic.calculateMultiBuy(
                gen.baseCost,
                gen.costScale,
                level,
                gameState.purchaseMultiplier,
                gen.maxLevel
            );

            const canAfford = pd.affordableLevels > 0;

            return `${level}:${canAfford}`;
        }).join('|') + `|m:${gameState.purchaseMultiplier}`;
    },

    _craftersCacheKey(prefix) {
        const levels       = Object.keys(CRAFTERS_DATA).filter(id => id.startsWith(prefix + '_'))
                                .map(id => gameState.crafters[id]?.level || 0).join(',');
        const thoughtBucket = Math.floor(gameState.resources.thought || 0);
        const ideaBucket   = Object.entries(gameState.ideas).map(([, v]) => Math.floor(v || 0)).join(',');
        const bulk         = gameState.wisdomShop.paradigm_bulk_manager?.level || 0;
        return `${levels}|${thoughtBucket}|${ideaBucket}|${gameState.purchaseMultiplier}|b:${bulk}`;
    },

    _ideaListCacheKey(tier) {
        return Array.from(gameState.discoveredIdeas)
            .filter(id => IDEAS_DATA[id]?.tier === tier)
            .sort()
            .map(id => `${id}:${gameState.ideas[id] || 0}`)
            .join(',');
    },

    _wisdomShopCacheKey() {
        const levels = Object.keys(WISDOM_SHOP_DATA).map(id => gameState.wisdomShop[id]?.level || 0).join(',');
        return `${levels}|${Math.floor(gameState.resources.wisdom_shards)}|tc:${gameState.transcendenceCount}`;
    },

    _recipesCacheKey() {
        return (gameState.unlockedRecipes || []).join(',');
    },

    // =========================================================================
    // Imperatively triggered updates
    // Called directly by game logic when a specific thing changes, rather than
    // relying on the 200 ms polling loop to catch up.
    // =========================================================================

    /**
     * Update the Buy multiplier button's visibility and label.
     * Call after any wisdom shop purchase or multiplier cycle.
     */
    updateMultiplierButton() {
        const visible = (gameState.wisdomShop.multi_buy_unlock?.level || 0) >= 1;
        if (visible !== this._last.multiplierVisible) {
            this.elements.multiplierButton.style.display = visible ? 'block' : 'none';
            this._last.multiplierVisible = visible;
        }
        const text = `Buy x${gameState.purchaseMultiplier}`;
        if (text !== this._last.multiplierText) {
            this.elements.multiplierButton.textContent = text;
            this._last.multiplierText = text;
        }
    },

    cycleMultiplier() {
        const opts = [1, 10, 100, 'Max'];
        gameState.purchaseMultiplier = opts[(opts.indexOf(gameState.purchaseMultiplier) + 1) % opts.length];
        this.updateMultiplierButton();
        // Multiplier change affects card button text — invalidate card caches
        this._last.generators      = null;
        this._last.insightCrafters = null;
        this._last.theoryCrafters  = null;
        this._last.paradigmCrafters = null;
    },

    switchPanel(panelId, clickedButton) {
        this.elements.panels.forEach(p => p.classList.remove('active'));
        this.elements.navButtons.forEach(b => b.classList.remove('active'));
        const target = document.getElementById(panelId);
        if (target) target.classList.add('active');
        if (clickedButton) clickedButton.classList.add('active');
        if (panelId === 'noosphere-panel' && typeof Noosphere !== 'undefined' && Noosphere.network) {
            setTimeout(() => { Noosphere.network.redraw(); Noosphere.network.fit(); }, 50);
        }
    },

    // =========================================================================
    // DOM Renderers
    // These do the actual DOM work. They are called after a dirty-check confirms
    // something has changed. Never call these directly from the game loop.
    // =========================================================================

    renderUpgradeCard(container, itemData, currentLevel, buttonClass, buttonDataAttribute) {
        const isMax = currentLevel >= (itemData.maxLevel || Infinity);
        const pd    = GameLogic.calculateMultiBuy(itemData.baseCost, itemData.costScale, currentLevel, gameState.purchaseMultiplier, itemData.maxLevel);

        let canAfford = false, costToDisplay = {};
        if (!isMax) {
            if (gameState.purchaseMultiplier === 'Max') {
                canAfford = pd.affordableLevels > 0;
                const pd2 = GameLogic.calculateMultiBuy(itemData.baseCost, itemData.costScale, currentLevel, pd.affordableLevels, itemData.maxLevel);
                costToDisplay = pd2.totalCost;
            } else {
                canAfford = pd.affordableLevels >= pd.levelsToBuy;
                costToDisplay = pd.totalCost;
            }
        }

        const costStr = isMax ? 'N/A' : Object.entries(costToDisplay)
            .map(([res, val]) => `${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || Utils.capitalizeFirst(res.replace(/_/g, ' '))}`)
            .join(', ');

        let btnText;
        if (isMax) {
            btnText = 'Max Level';
        } else {
            const amt = gameState.purchaseMultiplier === 'Max' ? Math.max(1, pd.affordableLevels) : gameState.purchaseMultiplier;
            btnText = currentLevel === 0 ? `Build +${amt}` : `Upgrade +${amt}`;
        }

        let outputStr = 'Effect: ';
        if (itemData.effect?.thought_per_click) {
            const dl  = Math.max(1, currentLevel);
            const sc  = itemData.outputScale || 1;
            const tot = (itemData.effect.thought_per_click * dl) * Math.pow(sc, Math.max(0, dl - 1));
            outputStr = `Effect: +${Utils.formatNumber(tot)} Thoughts per click${currentLevel === 0 ? ' (Lvl 1)' : ''}`;
        } else if (itemData.effect?.global_thought_multiplier_bonus) {
            outputStr = `Effect: +${(currentLevel * itemData.effect.global_thought_multiplier_bonus * 100).toFixed(0)}% to all thought generation`;
        } else if (itemData.output) {
            Object.entries(itemData.output).forEach(([res, val]) => {
                const dl  = Math.max(1, currentLevel);
                const sc  = itemData.outputScale || 1;
                const lb  = Math.pow(sc, Math.max(0, dl - 1));
                const sfx = currentLevel === 0 ? ' (Lvl 1)' : '';
                if (res === 'thought') {
                    outputStr += `${Utils.formatNumber(val * lb * dl)} Thought/sec${sfx}<br>`;
                } else if (GameLogic._isValidNumber(val)) {
                    const ips = val * lb * dl;
                    outputStr += ips < 1
                        ? `1 ${IDEAS_DATA[res]?.name || res} / ${Utils.formatNumber(1/ips)}s${sfx}<br>`
                        : `${Utils.formatNumber(ips)} ${IDEAS_DATA[res]?.name || res}/sec${sfx}<br>`;
                }
            });
        } else if (itemData.targetIdeaId) {
            const tgt = IDEAS_DATA[itemData.targetIdeaId];
            const dl  = Math.max(1, currentLevel);
            const sc  = itemData.outputScale || 1;
            const cps = (itemData.outputAmount || 0) * Math.pow(sc, Math.max(0, dl - 1)) * dl;
            const sfx = currentLevel === 0 ? ' (Lvl 1)' : '';
            outputStr = cps > 0 && cps < 1
                ? `Crafts: 1 ${tgt.name} / ${Utils.formatNumber(1/cps)}s${sfx}`
                : `Crafts: ${Utils.formatNumber(cps)} ${tgt.name}/sec${sfx}`;
        }
        outputStr = outputStr.replace(/<br>$/, '').trim();

        const card = document.createElement('div');
        card.className = 'upgrade-card';
        card.innerHTML =
            `<h3>${itemData.icon || ''} ${itemData.name} (Lvl ${currentLevel}${isMax ? ' - MAX' : ''})</h3>` +
            `<p>${itemData.description || ''}</p>` +
            `<p class="cost">Cost: ${costStr}</p>` +
            `<p class="output">${outputStr || 'Effect: N/A'}</p>` +
            `<button class="action-button ${buttonClass}" ${buttonDataAttribute}="${itemData.id}" ${(!canAfford || isMax) ? 'disabled' : ''}>${btnText}</button>`;
        container.appendChild(card);
    },

    renderGenerators() {
        this.elements.generatorsList.innerHTML = '';
        Object.values(GENERATORS_DATA).forEach(genData => {
            let unlocked = true;
            if (genData.unlocksWith) {
                unlocked = genData.unlocksWith.every(cond => {
                    const parts = cond.split('_');
                    const lvl   = parseInt(parts[parts.length - 1], 10);
                    if (!isNaN(lvl)) {
                        const genId = parts.slice(0, -1).join('_');
                        const cur   = gameState.generators[genId]?.level;
                        return GameLogic._isValidNumber(cur) && cur >= lvl;
                    }
                    return gameState.discoveredIdeas.has(cond);
                });
            }
            if (unlocked) {
                this.renderUpgradeCard(this.elements.generatorsList, genData,
                    gameState.generators[genData.id]?.level || 0, 'buy-generator', 'data-generator-id');
            }
        });
    },

    renderAutoCrafters(prefix, listElement) {
        listElement.innerHTML = '';
        let found = false;

        if (prefix === 'paradigm' && (gameState.wisdomShop.paradigm_bulk_manager?.level || 0) >= 1) {
            const bulkDiv = document.createElement('div');
            bulkDiv.className = 'bulk-upgrade-section';
            bulkDiv.innerHTML = `<button class="action-button bulk-paradigm-upgrade" style="margin-bottom:20px;">🏭 Upgrade All Paradigm Crafters (x${gameState.purchaseMultiplier})</button>`;
            bulkDiv.addEventListener('click', this.handleBulkParadigmUpgrade);
            listElement.appendChild(bulkDiv);
        }

        Object.values(CRAFTERS_DATA).forEach(cd => {
            if (!cd.id.startsWith(prefix + '_')) return;
            const unlocked = !cd.unlocksWith || cd.unlocksWith.every(c => gameState.discoveredIdeas.has(c));
            if (unlocked) {
                found = true;
                this.renderUpgradeCard(listElement, cd, gameState.crafters[cd.id]?.level || 0, 'buy-autocrafter', 'data-crafter-id');
            }
        });

        if (!found) listElement.innerHTML += `<p class="text-muted">Discover an idea of this tier to unlock its auto-crafter.</p>`;
    },

    renderTieredIdeaList(tier, listElement) {
        listElement.innerHTML = '';
        let found = false;
        Array.from(gameState.discoveredIdeas)
            .map(id => IDEAS_DATA[id])
            .filter(d => d && d.tier === tier)
            .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
            .forEach(d => {
                found = true;
                const owned = gameState.ideas[d.id] || 0;
                let ftHTML = '';
                if (d.attributes?.thought_bonus_per_sec && GameLogic._isValidNumber(owned) && owned > 0) {
                    ftHTML = `<span class="idea-description">Grants ${Utils.formatNumber(d.attributes.thought_bonus_per_sec * owned)} thoughts/sec total</span>`;
                }
                const li = document.createElement('li');
                li.innerHTML = `<span class="idea-name">${d.name}</span> <span class="idea-owned">Owned: ${Utils.formatNumber(owned)}</span> <span class="idea-description">${d.description || ''}</span>${ftHTML}`;
                li.dataset.ideaId = d.id;
                listElement.appendChild(li);
            });
        if (!found) listElement.innerHTML = `<p class="text-muted">No ideas of this tier discovered yet.</p>`;
    },

    _renderRecipesNow() {
        this.elements.discoveredRecipesList.innerHTML = '';
        (gameState.unlockedRecipes || []).forEach(outId => {
            const out = IDEAS_DATA[outId];
            if (!out?.recipe) return;
            const li = document.createElement('li');
            li.textContent = `${out.recipe.map(id => IDEAS_DATA[id]?.name || '(Unknown)').join(' + ')} = ${out.name || '(Unknown)'}`;
            li.dataset.input1 = out.recipe[0];
            li.dataset.input2 = out.recipe[1];
            this.elements.discoveredRecipesList.appendChild(li);
        });
    },

    _renderWisdomShopNow() {
        if (this.elements.wsShopBalance) {
            this.elements.wsShopBalance.textContent = Utils.formatNumber(gameState.resources.wisdom_shards);
        }
        this._renderWisdomShopCategory(this.elements.qolUpgrades,    'quality_of_life');
        this._renderWisdomShopCategory(this.elements.tapUpgrades,    'tap_bonuses');
        this._renderWisdomShopCategory(this.elements.globalUpgrades, 'global_multipliers');
        this._renderWisdomShopCategory(this.elements.offlineUpgrades, 'offline');
    },

    _renderWisdomShopCategory(container, category) {
        if (!container) return;
        container.innerHTML = '';
        Object.values(WISDOM_SHOP_DATA)
            .filter(u => u.category === category && WisdomShop.isUnlocked(u.id))
            .forEach(upgrade => {
                const level     = gameState.wisdomShop[upgrade.id]?.level || 0;
                const maxLevel  = upgrade.maxLevel || 1;
                const cost      = WisdomShop.getCost(upgrade.id);
                const canAfford = WisdomShop.canAfford(upgrade.id);
                const isMax     = level >= maxLevel;
                const isBought  = level > 0;

                let effectText = '';
                if (upgrade.getEffectValue) {
                    const next = upgrade.getEffectValue(level + 1);
                    const cur  = level > 0 ? upgrade.getEffectValue(level) : 0;
                    if (upgrade.id.includes('multiplier'))          effectText = `+${(next * 100).toFixed(0)}% to all thought generation`;
                    else if (upgrade.id === 'tap_thought_bonus')         effectText = `+${next.toFixed(0)}% of thought/sec per spark`;
                    else if (upgrade.id === 'offline_effectiveness') effectText = `Offline earns ${next.toFixed(0)}% of online rate`;
                    else if (upgrade.id === 'offline_time_cap')      effectText = `Offline cap: ${next}h`;
                    if (level > 0 && !isMax) {
                        if (upgrade.id.includes('multiplier'))          effectText = `Currently: +${(cur*100).toFixed(0)}% → +${(next*100).toFixed(0)}%`;
                        else if (upgrade.id === 'tap_thought_bonus')         effectText = `Currently: +${cur.toFixed(0)}% → +${next.toFixed(0)}%`;
                        else if (upgrade.id === 'offline_effectiveness') effectText = `Currently: ${cur.toFixed(0)}% → ${next.toFixed(0)}%`;
                        else if (upgrade.id === 'offline_time_cap')      effectText = `Currently: ${cur}h → ${next}h`;
                    }
                }

                const btnClass = 'shop-upgrade-button' +
                    (isMax ? ' max-level' : isBought ? ' purchased' : '') +
                    (!canAfford && !isMax ? ' disabled' : '');
                const btnText = isMax ? 'Maxed' : isBought ? 'Upgrade' : 'Purchase';

                const card = document.createElement('div');
                card.className = `shop-upgrade-card${isBought ? ' purchased' : ''}${isMax ? ' max-level' : ''}`;
                card.innerHTML =
                    `<div class="shop-upgrade-header">` +
                    `<span class="shop-upgrade-icon">${upgrade.icon || '⚡'}</span>` +
                    `<span class="shop-upgrade-title">${upgrade.name}</span>` +
                    `<span class="shop-upgrade-level">${level}/${maxLevel}</span>` +
                    `</div>` +
                    `<div class="shop-upgrade-description">${upgrade.description}</div>` +
                    (effectText ? `<div class="shop-upgrade-effect">${effectText}</div>` : '') +
                    `<div class="shop-upgrade-footer">` +
                    `<span class="shop-upgrade-cost">${isMax ? 'Complete' : `${Utils.formatNumber(cost)} WS`}</span>` +
                    `<button class="${btnClass}" data-upgrade-id="${upgrade.id}" ${(!canAfford || isMax) ? 'disabled' : ''}>${btnText}</button>` +
                    `</div>`;
                container.appendChild(card);
            });
    },

    /**
     * Rebuilds both forge <select> elements.
     * Must NOT be called from tick() — rebuilding closes any open dropdown.
     * Call only from gainIdea() and attemptCombination().
     */
    populateForgeSelectors() {
        const s1  = this.elements.forgeSlot1.value;
        const s2  = this.elements.forgeSlot2.value;
        const opts = ['<option value="">Select...</option>'];
        Array.from(gameState.discoveredIdeas)
            .map(id => IDEAS_DATA[id])
            .filter(d => d && d.tier >= 1 && d.tier <= 3 && GameLogic._isValidNumber(gameState.ideas[d.id]) && gameState.ideas[d.id] > 0)
            .sort((a, b) => a.tier !== b.tier ? a.tier - b.tier : (a.name||'').localeCompare(b.name||''))
            .forEach(d => opts.push(`<option value="${d.id}">${d.name} (${Utils.formatNumber(gameState.ideas[d.id])})</option>`));
        this.elements.forgeSlot1.innerHTML = opts.join('');
        this.elements.forgeSlot2.innerHTML = opts.join('');
        if (this.elements.forgeSlot1.querySelector(`option[value="${s1}"]`)) this.elements.forgeSlot1.value = s1;
        if (this.elements.forgeSlot2.querySelector(`option[value="${s2}"]`)) this.elements.forgeSlot2.value = s2;
    },

    // =========================================================================
    // Event handlers
    // =========================================================================

    handleBuyGeneratorClick(e) {
        const btn = e.target.closest('.buy-generator');
        if (btn && typeof GameLogic !== 'undefined') GameLogic.buyGenerator(btn.dataset.generatorId);
    },

    handleBuyAutoCrafterClick(e) {
        const btn = e.target.closest('.buy-autocrafter');
        if (btn && typeof GameLogic !== 'undefined') GameLogic.buyAutoCrafter(btn.dataset.crafterId);
    },

    handleRecipeClick(e) {
        const li = e.target.closest('li');
        if (li?.dataset.input1 && li.dataset.input2) {
            UI.elements.forgeSlot1.value = li.dataset.input1;
            UI.elements.forgeSlot2.value = li.dataset.input2;
            UI.elements.combinationResult.textContent = 'Recipe loaded into forge.';
            UI.elements.combinationResult.className   = 'info';
        }
    },

    handleWisdomShopPurchase(e) {
        const btn = e.target.closest('.shop-upgrade-button');
        if (!btn || btn.disabled) return;
        const id = btn.dataset.upgradeId;
        if (WisdomShop.purchase(id)) {
            UI._last.wisdomShop = null;   // force re-render on next tick
            UI.updateMultiplierButton();  // multi_buy_unlock may have just changed
            UI.showNotification(`Purchased ${WISDOM_SHOP_DATA[id].name}!`, 'success');
        } else {
            UI.showNotification('Cannot purchase this upgrade.', 'error');
        }
    },

    handleBulkParadigmUpgrade() {
        if (!(gameState.wisdomShop.paradigm_bulk_manager?.level >= 1)) {
            UI.showNotification('Paradigm Automation upgrade required!', 'error'); return;
        }
        let performed = 0;
        const totalCost = {};
        Object.keys(CRAFTERS_DATA).filter(id => id.startsWith('paradigm_')).forEach(crafterId => {
            const cd  = CRAFTERS_DATA[crafterId];
            const cur = gameState.crafters[crafterId]?.level || 0;
            if (cur >= (cd.maxLevel || Infinity)) return;
            const pd = GameLogic.calculateMultiBuy(cd.baseCost, cd.costScale, cur, gameState.purchaseMultiplier, cd.maxLevel);
            const n  = gameState.purchaseMultiplier === 'Max' ? pd.affordableLevels : Math.min(gameState.purchaseMultiplier, pd.affordableLevels);
            if (n <= 0) return;
            const fp = GameLogic.calculateMultiBuy(cd.baseCost, cd.costScale, cur, n, cd.maxLevel);
            Object.entries(fp.totalCost).forEach(([r, c]) => { totalCost[r] = (totalCost[r] || 0) + c; });
            performed += n;
        });
        const canAfford = Object.entries(totalCost).every(([r, c]) => (gameState.resources[r] || gameState.ideas[r] || 0) >= c);
        if (!canAfford || performed === 0) { UI.showNotification('Cannot afford bulk paradigm upgrade.', 'error'); return; }
        Object.keys(CRAFTERS_DATA).filter(id => id.startsWith('paradigm_')).forEach(id => GameLogic.buyAutoCrafter(id));
        UI.showNotification(`Bulk upgraded ${performed} paradigm crafter levels!`, 'success');
    },

    // =========================================================================
    // Details panel — driven by node selection events, not the tick loop
    // =========================================================================

    updateDetailsView(ideaData) {
        if (!ideaData || ideaData.id === 'thought') {
            this.elements.selectedIdeaName.textContent        = 'Nothing Selected';
            this.elements.selectedIdeaDescription.textContent = 'Click an idea node in the Noosphere.';
            this.elements.selectedIdeaAttributes.innerHTML    = '';
            return;
        }
        this.elements.selectedIdeaName.textContent        = ideaData.name || 'Unnamed Idea';
        this.elements.selectedIdeaDescription.textContent = ideaData.description || 'No description available.';
        let html = '';
        if (ideaData.tier) html += `<p><strong>Tier:</strong> ${ideaData.tier}</p>`;
        const count = gameState.ideas[ideaData.id];
        if (GameLogic._isValidNumber(count)) html += `<p><strong>Owned:</strong> ${Utils.formatNumber(count)}</p>`;
        if (ideaData.attributes) Object.entries(ideaData.attributes).forEach(([k, v]) => {
            html += `<p><strong>${Utils.capitalizeFirst(k.replace(/_/g, ' '))}:</strong> ${v}</p>`;
        });
        if (ideaData.recipe?.length) {
            html += `<p><strong>Derived From:</strong> ${ideaData.recipe.map(id => IDEAS_DATA[id]?.name || '(Unknown)').join(', ')}</p>`;
        }
        this.elements.selectedIdeaAttributes.innerHTML = html;
    },

    // =========================================================================
    // Notifications
    // =========================================================================

    showNotification(message, type = 'info') {
        const el = document.createElement('div');
        el.className   = `game-notification ${type}`;
        el.textContent = message;
        document.body.appendChild(el);
        setTimeout(() => {
            el.classList.add('exiting');
            el.addEventListener('transitionend', () => el.remove(), { once: true });
            setTimeout(() => el.remove(), 600);
        }, 3000);
    },

    // =========================================================================
    // Full refresh — only for wholesale state changes (load / reset / transcend)
    // =========================================================================

    /**
     * Resets all cached last-values so the next tick() re-renders everything.
     * Does NOT itself touch the DOM.
     */
    invalidateAllCaches() {
        Object.keys(this._last).forEach(k => { this._last[k] = null; });
    },

    /**
     * Immediately renders everything from scratch.
     * Use only after load, reset, or transcend.
     */
    updateAllUI() {
        this.invalidateAllCaches();
        this.tick();
        this.updateMultiplierButton();
        this.populateForgeSelectors();
    },
};