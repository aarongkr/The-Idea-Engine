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
        multiplierButton: document.getElementById('multiplier-button'),
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
        transcendButton: document.getElementById('transcend-button'),
        wsShopBalance: document.getElementById('ws-shop-balance'),
        qolUpgrades: document.getElementById('qol-upgrades'),
        tapUpgrades: document.getElementById('tap-upgrades'),
        globalUpgrades: document.getElementById('global-upgrades'),
        offlineUpgrades: document.getElementById('offline-upgrades'),
    },

    // --- Dirty-check cache keys ---
    // These store fingerprints of the last rendered state for each section.
    // If the fingerprint hasn't changed, we skip the expensive innerHTML wipe+rebuild.
    _renderCache: {
        generators: null,
        insightCrafters: null,
        theoryCrafters: null,
        paradigmCrafters: null,
        concepts: null,
        insights: null,
        theories: null,
        paradigms: null,
        wisdomShop: null,
        recipes: null,
    },

    init() {
        this.elements.navButtons.forEach(button => {
            button.addEventListener('click', () => this.switchPanel(button.dataset.panel, button));
        });
        this.elements.multiplierButton.addEventListener('click', () => this.cycleMultiplier());
        this.elements.generatorsList.addEventListener('click', this.handleBuyGeneratorClick);
        this.elements.insightCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.theoryCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.paradigmCraftersList.addEventListener('click', this.handleBuyAutoCrafterClick);
        this.elements.discoveredRecipesList.addEventListener('click', this.handleRecipeClick);
        if (this.elements.qolUpgrades) {
            this.elements.qolUpgrades.addEventListener('click', this.handleWisdomShopPurchase);
        }
        if (this.elements.tapUpgrades) {
            this.elements.tapUpgrades.addEventListener('click', this.handleWisdomShopPurchase);
        }
        if (this.elements.globalUpgrades) {
            this.elements.globalUpgrades.addEventListener('click', this.handleWisdomShopPurchase);
        }
        if (this.elements.offlineUpgrades) {
            this.elements.offlineUpgrades.addEventListener('click', this.handleWisdomShopPurchase);
        }
    },

    cycleMultiplier() {
        const multipliers = [1, 10, 100, 'Max'];
        const currentIndex = multipliers.indexOf(gameState.purchaseMultiplier);
        const nextIndex = (currentIndex + 1) % multipliers.length;
        gameState.purchaseMultiplier = multipliers[nextIndex];
        // Purchasing multiplier affects card button text and affordability — invalidate all card caches
        this._renderCache.generators = null;
        this._renderCache.insightCrafters = null;
        this._renderCache.theoryCrafters = null;
        this._renderCache.paradigmCrafters = null;
        this.updateAllUI();
    },

    updateMultiplierButtonText() {
        const currentMultiplier = gameState.purchaseMultiplier;
        this.elements.multiplierButton.textContent = `Buy x${currentMultiplier}`;
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
        const ftPerSecRate = GameLogic.calculateCurrentFtPerSec();
        this.elements.ftPerSecCount.textContent = Utils.formatNumber(ftPerSecRate) + "/sec";
        
        const multiBuyUnlocked = gameState.wisdomShop.multi_buy_unlock?.level >= 1;
        if (this.elements.multiplierButton) {
            this.elements.multiplierButton.style.display = multiBuyUnlocked ? 'block' : 'none';
        }

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

    handleBulkParadigmUpgrade() {
        const bulkUnlocked = gameState.wisdomShop.paradigm_bulk_manager?.level >= 1;
        if (!bulkUnlocked) {
            UI.showNotification('Paradigm Automation upgrade required!', 'error');
            return;
        }

        let upgradesPerformed = 0;
        let totalCost = { fleeting_thought: 0 };

        // Calculate total cost for all paradigm crafters
        Object.keys(CRAFTERS_DATA).forEach(crafterId => {
            if (crafterId.startsWith('paradigm_')) {
                const crafterData = CRAFTERS_DATA[crafterId];
                const currentLevel = gameState.crafters[crafterId]?.level || 0;
                
                if (currentLevel < (crafterData.maxLevel || Infinity)) {
                    const purchaseDetails = GameLogic.calculateMultiBuy(
                        crafterData.baseCost, 
                        crafterData.costScale, 
                        currentLevel, 
                        gameState.purchaseMultiplier, 
                        crafterData.maxLevel
                    );
                    
                    if (purchaseDetails.affordableLevels > 0) {
                        const levelsToBuy = (gameState.purchaseMultiplier === 'Max') ? 
                            purchaseDetails.affordableLevels : 
                            Math.min(gameState.purchaseMultiplier, purchaseDetails.affordableLevels);
                            
                        if (levelsToBuy > 0) {
                            const finalPurchase = GameLogic.calculateMultiBuy(
                                crafterData.baseCost, 
                                crafterData.costScale, 
                                currentLevel, 
                                levelsToBuy, 
                                crafterData.maxLevel
                            );
                            
                            // Add to total cost
                            Object.entries(finalPurchase.totalCost).forEach(([res, cost]) => {
                                totalCost[res] = (totalCost[res] || 0) + cost;
                            });
                            upgradesPerformed += levelsToBuy;
                        }
                    }
                }
            }
        });

        // Check if we can afford the total cost
        let canAffordAll = true;
        Object.entries(totalCost).forEach(([res, cost]) => {
            const available = gameState.resources[res] || gameState.ideas[res] || 0;
            if (available < cost) canAffordAll = false;
        });

        if (!canAffordAll || upgradesPerformed === 0) {
            UI.showNotification('Cannot afford bulk paradigm upgrade.', 'error');
            return;
        }

        // Perform the bulk purchase
        Object.keys(CRAFTERS_DATA).forEach(crafterId => {
            if (crafterId.startsWith('paradigm_')) {
                GameLogic.buyAutoCrafter(crafterId);
            }
        });

        UI.showNotification(`Bulk upgraded ${upgradesPerformed} paradigm crafter levels!`, 'success');
        UI.updateAllUI();
    },

    /**
     * Renders a generic upgrade card with intelligent formatting for output and costs.
     */
    renderUpgradeCard(container, itemData, currentLevel, buttonClass, buttonDataAttribute) {
        const isMaxLevel = currentLevel >= (itemData.maxLevel || Infinity);
        const purchaseDetails = GameLogic.calculateMultiBuy(itemData.baseCost, itemData.costScale, currentLevel, gameState.purchaseMultiplier, itemData.maxLevel);
        let canAfford = false;
        let costToDisplay = {};
        let levelsToBuyText = "0";
        if (isMaxLevel) {
            // No action if maxed
        } else if (gameState.purchaseMultiplier === 'Max') {
            canAfford = purchaseDetails.affordableLevels > 0;
            levelsToBuyText = purchaseDetails.affordableLevels.toString();
            const costOfAffordable = GameLogic.calculateMultiBuy(itemData.baseCost, itemData.costScale, currentLevel, purchaseDetails.affordableLevels, itemData.maxLevel);
            costToDisplay = costOfAffordable.totalCost;
        } else {
            canAfford = purchaseDetails.affordableLevels >= purchaseDetails.levelsToBuy;
            costToDisplay = purchaseDetails.totalCost;
            levelsToBuyText = purchaseDetails.levelsToBuy.toString();
        }
        let costString = isMaxLevel ? "N/A" : Object.entries(costToDisplay).map(([res, val]) => `${Utils.formatNumber(val)} ${IDEAS_DATA[res]?.name || Utils.capitalizeFirst(res.replace(/_/g, ' '))}`).join(', ');
        let buttonText;
        if (isMaxLevel) {
            buttonText = "Max Level";
        } else {
            let displayAmount;
            if (gameState.purchaseMultiplier === 'Max') {
                displayAmount = Math.max(1, purchaseDetails.affordableLevels);
            } else {
                displayAmount = gameState.purchaseMultiplier;
            }
            buttonText = currentLevel === 0 ? `Build +${displayAmount}` : `Upgrade +${displayAmount}`;
        }

        const card = document.createElement('div');
        card.className = 'upgrade-card';

        let outputString = "Effect: ";
        if (itemData.effect?.ft_per_click) {
            const effectData = itemData.effect; const scale = itemData.outputScale || 1;
            const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1);
            const totalBonus = (effectData.ft_per_click * displayLevel) * (scale ** scalePower);
            const prefix = currentLevel === 0 ? " (Lvl 1)" : "";
            outputString = `Effect: +${Utils.formatNumber(totalBonus)} FT per click${prefix}`;
        } else if (itemData.effect?.global_ft_multiplier_bonus) {
            const totalBonus = currentLevel * itemData.effect.global_ft_multiplier_bonus * 100;
            outputString = `Effect: +${totalBonus.toFixed(0)}% to all FT generation`;
        } else if (itemData.output) {
            Object.entries(itemData.output).forEach(([outRes, outVal]) => {
                if (outRes === 'fleeting_thought') {
                    const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1); const outputScale = itemData.outputScale || 1; const prefix = currentLevel === 0 ? " (Lvl 1)" : "";
                    const ftOutputValue = (outVal * (outputScale ** scalePower) * displayLevel);
                    outputString += `${Utils.formatNumber(ftOutputValue)} FT/sec${prefix}<br>`;
                } else if (GameLogic._isValidNumber(outVal)) {
                    const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1); const outputScale = itemData.outputScale || 1; const prefix = currentLevel === 0 ? " (Lvl 1)" : "";
                    const itemsPerSecond = outVal * (outputScale ** scalePower) * displayLevel;
                    if (itemsPerSecond < 1) {
                        const secondsPerItem = 1 / itemsPerSecond;
                        outputString += `1 ${IDEAS_DATA[outRes]?.name || outRes} / ${Utils.formatNumber(secondsPerItem)}s${prefix}<br>`;
                    } else {
                        outputString += `${Utils.formatNumber(itemsPerSecond)} ${IDEAS_DATA[outRes]?.name || outRes}/sec${prefix}<br>`;
                    }
                }
            });
        } else if (itemData.targetIdeaId) {
            const targetIdea = IDEAS_DATA[itemData.targetIdeaId];
            const displayLevel = Math.max(1, currentLevel); const scalePower = Math.max(0, displayLevel - 1); const outputScale = itemData.outputScale || 1; const prefix = currentLevel === 0 ? " (Lvl 1)" : "";
            const craftsPerSecond = (itemData.outputAmount || 0) * (outputScale ** scalePower) * displayLevel;
            if (craftsPerSecond > 0 && craftsPerSecond < 1) {
                const secondsPerCraft = 1 / craftsPerSecond;
                outputString = `Crafts: 1 ${targetIdea.name} / ${Utils.formatNumber(secondsPerCraft)}s${prefix}`;
            } else {
                outputString = `Crafts: ${Utils.formatNumber(craftsPerSecond)} ${targetIdea.name}/sec${prefix}`;
            }
        }
        outputString = outputString.replace(/<br>$/, '').trim();

        card.innerHTML = `<h3>${itemData.icon || ''} ${itemData.name} (Lvl ${currentLevel}${isMaxLevel ? ' - MAX' : ''})</h3> <p>${itemData.description || ''}</p> <p class="cost">Cost: ${costString}</p> <p class="output">${outputString || 'Effect: N/A'}</p> <button class="action-button ${buttonClass}" ${buttonDataAttribute}="${itemData.id}" ${!canAfford || isMaxLevel ? 'disabled' : ''}>${buttonText}</button>`;
        container.appendChild(card);
    },

    /**
     * Builds a fingerprint string representing the state that affects generator card rendering.
     * If this string is the same as last render, we can safely skip the DOM rebuild.
     */
    _generatorsCacheKey() {
        const genLevels = Object.keys(GENERATORS_DATA).map(id => `${id}:${gameState.generators[id]?.level || 0}`).join(',');
        // Round FT to nearest 10 to avoid re-rendering on every single FT gain,
        // while still updating affordability indicators reasonably promptly.
        const ftBucket = Math.floor((gameState.resources.fleeting_thought || 0) / 10);
        const ideaBucket = Object.entries(gameState.ideas).map(([id, v]) => `${id}:${Math.floor((v||0)/5)}`).join(',');
        return `${genLevels}|${ftBucket}|${ideaBucket}|${gameState.purchaseMultiplier}`;
    },

    _craftersCacheKey(prefix) {
        const crafterLevels = Object.keys(CRAFTERS_DATA)
            .filter(id => id.startsWith(prefix + '_'))
            .map(id => `${id}:${gameState.crafters[id]?.level || 0}`)
            .join(',');
        const ftBucket = Math.floor((gameState.resources.fleeting_thought || 0) / 10);
        const ideaBucket = Object.entries(gameState.ideas).map(([id, v]) => `${id}:${Math.floor((v||0)/5)}`).join(',');
        const bulkUnlocked = gameState.wisdomShop.paradigm_bulk_manager?.level || 0;
        return `${crafterLevels}|${ftBucket}|${ideaBucket}|${gameState.purchaseMultiplier}|bulk:${bulkUnlocked}`;
    },

    _ideaListCacheKey(tier) {
        return Array.from(gameState.discoveredIdeas)
            .filter(id => IDEAS_DATA[id]?.tier === tier)
            .map(id => `${id}:${gameState.ideas[id] || 0}`)
            .sort()
            .join(',');
    },

    _wisdomShopCacheKey() {
        const levels = Object.keys(WISDOM_SHOP_DATA).map(id => `${id}:${gameState.wisdomShop[id]?.level || 0}`).join(',');
        const wsBucket = Math.floor((gameState.resources.wisdom_shards || 0));
        return `${levels}|ws:${wsBucket}|tc:${gameState.transcendenceCount}`;
    },

    _recipesCacheKey() {
        return (gameState.unlockedRecipes || []).join(',');
    },

    renderGenerators() {
        const key = this._generatorsCacheKey();
        if (this._renderCache.generators === key) return;
        this._renderCache.generators = key;

        this.elements.generatorsList.innerHTML = '';
        Object.values(GENERATORS_DATA).forEach(genData => {
            let unlocked = true;
            if (genData.unlocksWith) {
                unlocked = genData.unlocksWith.every(cond => {
                    let conditionMet = false; const parts = cond.split('_'); const lastPart = parts[parts.length - 1]; const potentialLevel = parseInt(lastPart?.trim(), 10);
                    if (parts.length > 1 && !isNaN(potentialLevel)) { const genId_cond = parts.slice(0, -1).join('_'); const requiredLevel = potentialLevel; const currentGenState = gameState.generators[genId_cond]; const currentLevel = currentGenState?.level; conditionMet = currentGenState && GameLogic._isValidNumber(currentLevel) && currentLevel >= requiredLevel; }
                    else { const ideaId_cond = cond; conditionMet = gameState.discoveredIdeas.has(ideaId_cond); }
                    return conditionMet;
                });
            }
            if (unlocked) {
                const currentLevel = gameState.generators[genData.id]?.level || 0;
                this.renderUpgradeCard(this.elements.generatorsList, genData, currentLevel, 'buy-generator', 'data-generator-id');
            }
        });
    },

    renderAutoCrafters(crafterTypePrefix, listElement) {
        const cacheKey = `${crafterTypePrefix}Crafters`;
        const key = this._craftersCacheKey(crafterTypePrefix);
        if (this._renderCache[cacheKey] === key) return;
        this._renderCache[cacheKey] = key;

        listElement.innerHTML = '';
        let foundAnyCrafters = false;
        if (crafterTypePrefix === 'paradigm') {
            const bulkUnlocked = gameState.wisdomShop.paradigm_bulk_manager?.level >= 1;
            if (bulkUnlocked) {
                const bulkButton = document.createElement('div');
                bulkButton.className = 'bulk-upgrade-section';
                bulkButton.innerHTML = `
                    <button class="action-button bulk-paradigm-upgrade" style="margin-bottom: 20px;">
                        🏭 Upgrade All Paradigm Crafters (x${gameState.purchaseMultiplier})
                    </button>
                `;
                bulkButton.addEventListener('click', this.handleBulkParadigmUpgrade);
                listElement.appendChild(bulkButton);
            }
        }
        Object.values(CRAFTERS_DATA).forEach(crafterData => {
            if (!crafterData.id.startsWith(crafterTypePrefix + '_')) return;
            let unlocked = true;
            if (crafterData.unlocksWith) unlocked = crafterData.unlocksWith.every(cond => gameState.discoveredIdeas.has(cond));
            if (unlocked) {
                foundAnyCrafters = true;
                const currentLevel = gameState.crafters[crafterData.id]?.level || 0;
                this.renderUpgradeCard(listElement, crafterData, currentLevel, 'buy-autocrafter', 'data-crafter-id');
            }
        });
        if (!foundAnyCrafters) listElement.innerHTML += `<p class="text-muted">Discover an idea of this tier to unlock its auto-crafter.</p>`;
    },

    renderTieredIdeaList(tier, listElement) {
        const cacheKeyMap = { 1: 'concepts', 2: 'insights', 3: 'theories', 4: 'paradigms' };
        const cacheKey = cacheKeyMap[tier];
        const key = this._ideaListCacheKey(tier);
        if (cacheKey && this._renderCache[cacheKey] === key) return;
        if (cacheKey) this._renderCache[cacheKey] = key;

        listElement.innerHTML = ''; let foundAny = false;
        Array.from(gameState.discoveredIdeas).map(id => IDEAS_DATA[id]).filter(ideaData => ideaData && ideaData.tier === tier).sort((a, b) => (a.name || '').localeCompare(b.name || '')).forEach(ideaData => {
                foundAny = true; const li = document.createElement('li'); const ownedCount = gameState.ideas[ideaData.id] || 0; let ftBonusHTML = '';
                if (ideaData.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(ownedCount) && ownedCount > 0) { const totalBonus = ideaData.attributes.ft_bonus_per_sec * ownedCount; ftBonusHTML = `<span class="idea-description">Grants ${Utils.formatNumber(totalBonus)} FT/sec total</span>`; }
                li.innerHTML = `<span class="idea-name">${ideaData.name}</span> <span class="idea-owned">Owned: ${Utils.formatNumber(ownedCount)}</span> <span class="idea-description">${ideaData.description || ''}</span> ${ftBonusHTML}`;
                li.dataset.ideaId = ideaData.id; listElement.appendChild(li);
        });
        if (!foundAny) listElement.innerHTML = `<p class="text-muted">No ideas of this tier discovered yet.</p>`;
    },

    renderWisdomShopCategory(container, category) {
        if (!container) return;
        
        container.innerHTML = '';
        
        const upgrades = Object.values(WISDOM_SHOP_DATA).filter(upgrade => upgrade.category === category);
        
        upgrades.forEach(upgrade => {
            if (!WisdomShop.isUnlocked(upgrade.id)) return;
            
            const currentLevel = gameState.wisdomShop[upgrade.id]?.level || 0;
            const maxLevel = upgrade.maxLevel || 1;
            const cost = WisdomShop.getCost(upgrade.id);
            const canAfford = WisdomShop.canAfford(upgrade.id);
            const isMaxLevel = currentLevel >= maxLevel;
            const isPurchased = currentLevel > 0;
            
            let effectText = '';
            if (upgrade.getEffectValue) {
                const nextLevelValue = upgrade.getEffectValue(currentLevel + 1);
                const currentValue = currentLevel > 0 ? upgrade.getEffectValue(currentLevel) : 0;
                
                if (upgrade.id.includes('multiplier')) {
                    effectText = `+${(nextLevelValue * 100).toFixed(0)}% to all FT generation`;
                } else if (upgrade.id === 'tap_ft_bonus') {
                    effectText = `+${nextLevelValue.toFixed(0)}% of FT/sec per manual spark`;
                } else if (upgrade.id === 'offline_effectiveness') {
                    effectText = `Offline earns ${nextLevelValue.toFixed(0)}% of online rate`;
                } else if (upgrade.id === 'offline_time_cap') {
                    effectText = `Offline cap: ${nextLevelValue}hours`;
                }
                
                if (currentLevel > 0 && !isMaxLevel) {
                    if (upgrade.id.includes('multiplier')) {
                        effectText = `Currently: +${(currentValue * 100).toFixed(0)}% → +${(nextLevelValue * 100).toFixed(0)}%`;
                    } else if (upgrade.id === 'tap_ft_bonus') {
                        effectText = `Currently: +${currentValue.toFixed(0)}% → +${nextLevelValue.toFixed(0)}%`;
                    } else if (upgrade.id === 'offline_effectiveness') {
                        effectText = `Currently: ${currentValue.toFixed(0)}% → ${nextLevelValue.toFixed(0)}%`;
                    } else if (upgrade.id === 'offline_time_cap') {
                        effectText = `Currently: ${currentValue}h → ${nextLevelValue}h`;
                    }
                }
            }
            
            let buttonText = 'Purchase';
            let buttonClass = 'shop-upgrade-button';
            
            if (isMaxLevel) {
                buttonText = 'Maxed';
                buttonClass += ' max-level';
            } else if (isPurchased) {
                buttonText = 'Upgrade';
                buttonClass += ' purchased';
            }
            
            if (!canAfford && !isMaxLevel) {
                buttonClass += ' disabled';
            }
            
            const card = document.createElement('div');
            card.className = `shop-upgrade-card ${isPurchased ? 'purchased' : ''} ${isMaxLevel ? 'max-level' : ''}`;
            
            card.innerHTML = `
                <div class="shop-upgrade-header">
                    <span class="shop-upgrade-icon">${upgrade.icon || '⚡'}</span>
                    <span class="shop-upgrade-title">${upgrade.name}</span>
                    <span class="shop-upgrade-level">${currentLevel}/${maxLevel}</span>
                </div>
                <div class="shop-upgrade-description">${upgrade.description}</div>
                ${effectText ? `<div class="shop-upgrade-effect">${effectText}</div>` : ''}
                <div class="shop-upgrade-footer">
                    <span class="shop-upgrade-cost">${isMaxLevel ? 'Complete' : `${Utils.formatNumber(cost)} WS`}</span>
                    <button class="${buttonClass}" data-upgrade-id="${upgrade.id}" ${(!canAfford || isMaxLevel) ? 'disabled' : ''}>
                        ${buttonText}
                    </button>
                </div>
            `;
            
            container.appendChild(card);
        });
    },

    handleWisdomShopPurchase(e) {
        const button = e.target.closest('.shop-upgrade-button');
        if (button && !button.disabled) {
            const upgradeId = button.dataset.upgradeId;
            if (WisdomShop.purchase(upgradeId)) {
                // Invalidate wisdom shop cache so it re-renders with new level
                UI._renderCache.wisdomShop = null;
                UI.updateWisdomShop();
                UI.updateResourceDisplay();
                UI.showNotification(`Purchased ${WISDOM_SHOP_DATA[upgradeId].name}!`, 'success');
            } else {
                UI.showNotification('Cannot purchase this upgrade.', 'error');
            }
        }
    },

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
     * Rebuilds the forge <select> dropdowns.
     * 
     * IMPORTANT: This must NOT be called from the tick-driven updateAllUI() path.
     * Rebuilding the <select> elements every 200ms closes any open dropdown the player
     * is actively interacting with, making it impossible to select an option.
     * 
     * This should only be called when the set of available forge options actually changes,
     * i.e. from gainIdea() and attemptCombination() — both of which already do so.
     */
    populateForgeSelectors() {
        const currentSelection1 = this.elements.forgeSlot1.value;
        const currentSelection2 = this.elements.forgeSlot2.value;
        const optionsHTML = ['<option value="">Select...</option>'];
        const sortedForgeableIdeas = Array.from(gameState.discoveredIdeas)
            .map(id => IDEAS_DATA[id])
            .filter(ideaData => ideaData && (ideaData.tier >= 1 && ideaData.tier <= 3) && GameLogic._isValidNumber(gameState.ideas[ideaData.id]) && gameState.ideas[ideaData.id] > 0)
            .sort((a,b) => {
                if (a.tier !== b.tier) return (a.tier||0)-(b.tier||0);
                return (a.name||'').localeCompare(b.name||'');
            });
        sortedForgeableIdeas.forEach(ideaData => {
            optionsHTML.push(`<option value="${ideaData.id}">${ideaData.name} (${Utils.formatNumber(gameState.ideas[ideaData.id])})</option>`);
        });
        this.elements.forgeSlot1.innerHTML = optionsHTML.join('');
        this.elements.forgeSlot2.innerHTML = optionsHTML.join('');
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection1)) this.elements.forgeSlot1.value = currentSelection1;
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection2)) this.elements.forgeSlot2.value = currentSelection2;
    },

    updateDiscoveredRecipes() {
        const key = this._recipesCacheKey();
        if (this._renderCache.recipes === key) return;
        this._renderCache.recipes = key;

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

    handleRecipeClick(e) {
        const listItem = e.target.closest('li');
        if (listItem?.dataset.input1 && listItem.dataset.input2) {
            UI.elements.forgeSlot1.value = listItem.dataset.input1;
            UI.elements.forgeSlot2.value = listItem.dataset.input2;
            UI.elements.combinationResult.textContent = "Recipe loaded into forge.";
            UI.elements.combinationResult.className = 'info';
        }
    },

    updateWisdomShop() {
        const key = this._wisdomShopCacheKey();
        if (this._renderCache.wisdomShop === key) return;
        this._renderCache.wisdomShop = key;

        if (this.elements.wsShopBalance) {
            this.elements.wsShopBalance.textContent = Utils.formatNumber(gameState.resources.wisdom_shards);
        }
        
        this.renderWisdomShopCategory(this.elements.qolUpgrades, 'quality_of_life');
        this.renderWisdomShopCategory(this.elements.tapUpgrades, 'tap_bonuses');
        this.renderWisdomShopCategory(this.elements.globalUpgrades, 'global_multipliers');
        this.renderWisdomShopCategory(this.elements.offlineUpgrades, 'offline');
    },

    updateDetailsView(ideaData) {
         if (!ideaData || ideaData.id === 'fleeting_thought') {
             this.elements.selectedIdeaName.textContent = 'Nothing Selected';
             this.elements.selectedIdeaDescription.textContent = 'Click an idea node in the Noosphere.';
             this.elements.selectedIdeaAttributes.innerHTML = '';
             return;
         }
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
     * Full UI refresh. Each sub-render has its own dirty-check and will no-op if
     * nothing relevant to it has changed — avoiding unnecessary DOM thrashing.
     * 
     * NOTE: populateForgeSelectors() is intentionally excluded here.
     * The forge dropdowns are only rebuilt when the idea inventory actually changes
     * (handled directly in GameLogic.gainIdea and GameLogic.attemptCombination).
     * Rebuilding them here would close open dropdowns every 200ms.
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
        // populateForgeSelectors() deliberately omitted — see JSDoc above
        this.updateDiscoveredRecipes();
        this.updateTranscendButton();
        this.updateMultiplierButtonText();
        this.updateWisdomShop();
    },

    /**
     * Clears all render caches, forcing a full rebuild on the next updateAllUI() call.
     * Use this after a transcendence, game reset, or load — events where the entire
     * game state changes at once.
     */
    invalidateAllCaches() {
        Object.keys(this._renderCache).forEach(k => { this._renderCache[k] = null; });
    },

     updateTranscendButton() {
         let canTranscend = false; let wsToGain = 0;
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