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
        transcendButton: document.getElementById('transcend-button')
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
    },

    cycleMultiplier() {
        const multipliers = [1, 10, 100, 'Max'];
        const currentIndex = multipliers.indexOf(gameState.purchaseMultiplier);
        const nextIndex = (currentIndex + 1) % multipliers.length;
        gameState.purchaseMultiplier = multipliers[nextIndex];
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
        let totalFtPerSec = 0;
        Object.entries(gameState.generators).forEach(([genId, genState]) => {
            const genData = GENERATORS_DATA[genId];
            if (genData && genState.level > 0 && genData.output?.fleeting_thought) {
                const currentLevel = genState.level; const baseOutput = genData.output.fleeting_thought; const scale = genData.outputScale || 1;
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
        let globalMultiplier = 1;
        const methodicalApproachLevel = gameState.generators.methodical_approach?.level || 0;
        if (methodicalApproachLevel > 0) {
            globalMultiplier += methodicalApproachLevel * GENERATORS_DATA.methodical_approach.effect.global_ft_multiplier_bonus;
        }
        this.elements.ftPerSecCount.textContent = Utils.formatNumber(totalFtPerSec * globalMultiplier) + "/sec";
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
                // Show either affordable levels or 1 (minimum display)
                displayAmount = Math.max(1, purchaseDetails.affordableLevels);
            } else {
                displayAmount = gameState.purchaseMultiplier;
            }
            buttonText = currentLevel === 0 ? `Build +${displayAmount}` : `Upgrade +${displayAmount}`;
        }

        const card = document.createElement('div');
        card.className = 'upgrade-card';

        // --- MODIFIED: Output String Generation Logic ---
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
        } else if (itemData.output) { // For base generators with chance-based output
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
        } else if (itemData.targetIdeaId) { // For Auto-Crafters
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
        // --- END MODIFICATION ---

        card.innerHTML = `<h3>${itemData.icon || ''} ${itemData.name} (Lvl ${currentLevel}${isMaxLevel ? ' - MAX' : ''})</h3> <p>${itemData.description || ''}</p> <p class="cost">Cost: ${costString}</p> <p class="output">${outputString || 'Effect: N/A'}</p> <button class="action-button ${buttonClass}" ${buttonDataAttribute}="${itemData.id}" ${!canAfford || isMaxLevel ? 'disabled' : ''}>${buttonText}</button>`;
        container.appendChild(card);
    },

    renderGenerators() {
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
        listElement.innerHTML = ''; let foundAnyCrafters = false;
        Object.values(CRAFTERS_DATA).forEach(crafterData => {
            if (!crafterData.id.startsWith(crafterTypePrefix + '_')) return;
            let unlocked = true; if (crafterData.unlocksWith) unlocked = crafterData.unlocksWith.every(cond => gameState.discoveredIdeas.has(cond));
            if (unlocked) {
                foundAnyCrafters = true;
                const currentLevel = gameState.crafters[crafterData.id]?.level || 0;
                this.renderUpgradeCard(listElement, crafterData, currentLevel, 'buy-autocrafter', 'data-crafter-id');
            }
        });
        if (!foundAnyCrafters) listElement.innerHTML = `<p class="text-muted">Discover an idea of this tier to unlock its auto-crafter.</p>`;
    },

    renderTieredIdeaList(tier, listElement) {
        listElement.innerHTML = ''; let foundAny = false;
        Array.from(gameState.discoveredIdeas).map(id => IDEAS_DATA[id]).filter(ideaData => ideaData && ideaData.tier === tier).sort((a, b) => (a.name || '').localeCompare(b.name || '')).forEach(ideaData => {
                foundAny = true; const li = document.createElement('li'); const ownedCount = gameState.ideas[ideaData.id] || 0; let ftBonusHTML = '';
                if (ideaData.attributes?.ft_bonus_per_sec && GameLogic._isValidNumber(ownedCount) && ownedCount > 0) { const totalBonus = ideaData.attributes.ft_bonus_per_sec * ownedCount; ftBonusHTML = `<span class="idea-description">Grants ${Utils.formatNumber(totalBonus)} FT/sec total</span>`; }
                li.innerHTML = `<span class="idea-name">${ideaData.name}</span> <span class="idea-owned">Owned: ${Utils.formatNumber(ownedCount)}</span> <span class="idea-description">${ideaData.description || ''}</span> ${ftBonusHTML}`;
                li.dataset.ideaId = ideaData.id; listElement.appendChild(li);
        });
        if (!foundAny) listElement.innerHTML = `<p class="text-muted">No ideas of this tier discovered yet.</p>`;
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

    populateForgeSelectors() {
        const currentSelection1 = this.elements.forgeSlot1.value; const currentSelection2 = this.elements.forgeSlot2.value;
        const optionsHTML = ['<option value="">Select...</option>'];
        const sortedForgeableIdeas = Array.from(gameState.discoveredIdeas).map(id => IDEAS_DATA[id]).filter(ideaData => ideaData && (ideaData.tier >= 1 && ideaData.tier <= 3) && GameLogic._isValidNumber(gameState.ideas[ideaData.id]) && gameState.ideas[ideaData.id] > 0).sort((a,b) => { if (a.tier !== b.tier) return (a.tier||0)-(b.tier||0); return (a.name||'').localeCompare(b.name||''); });
        sortedForgeableIdeas.forEach(ideaData => { optionsHTML.push(`<option value="${ideaData.id}">${ideaData.name} (${Utils.formatNumber(gameState.ideas[ideaData.id])})</option>`); });
        this.elements.forgeSlot1.innerHTML = optionsHTML.join(''); this.elements.forgeSlot2.innerHTML = optionsHTML.join('');
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection1)) this.elements.forgeSlot1.value = currentSelection1;
        if (sortedForgeableIdeas.find(i=>i.id===currentSelection2)) this.elements.forgeSlot2.value = currentSelection2;
    },

    updateDiscoveredRecipes() {
        this.elements.discoveredRecipesList.innerHTML = ''; if (!Array.isArray(gameState.unlockedRecipes)) return;
        gameState.unlockedRecipes.forEach(recipeOutputId => { const outputData = IDEAS_DATA[recipeOutputId]; if(outputData?.recipe) { const inputNames = outputData.recipe.map(inputId => IDEAS_DATA[inputId]?.name || `(Unknown)`).join(' + '); const li = document.createElement('li'); li.textContent = `${inputNames} = ${outputData.name || '(Unknown)'}`; li.dataset.input1 = outputData.recipe[0]; li.dataset.input2 = outputData.recipe[1]; this.elements.discoveredRecipesList.appendChild(li); } });
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
        this.updateMultiplierButtonText();
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

