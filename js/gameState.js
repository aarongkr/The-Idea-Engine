// js/gameState.js

let gameState = {
    lastUpdate: 0,
    resources: {
        fleeting_thought: 0,
        wisdom_shards: 0
    },
    ideas: {},
    generators: {},
    crafters: {},
    unlockedRecipes: [],
    noosphereState: { nodes: [], edges: [] },
    discoveredIdeas: new Set(),
    transcendenceCount: 0,
    tutorialCompleted: false,
    purchaseMultiplier: 1,
    gameVersion: "0.1.4", // wisdom shop update
    wisdomShop: {}
};

/**
 * Initializes or sanitizes the global gameState object.
 */
function initializeGameState(isNewGame = false) {
    if (isNewGame) {
        gameState.lastUpdate = Date.now();
        gameState.resources = { fleeting_thought: 0, wisdom_shards: 0 };
        gameState.ideas = {};
        gameState.generators = {};
        gameState.crafters = {};
        gameState.unlockedRecipes = [];
        gameState.discoveredIdeas = new Set(['fleeting_thought']);
        gameState.transcendenceCount = 0;
        gameState.tutorialCompleted = false;
        gameState.purchaseMultiplier = 1;
        gameState.gameVersion = "0.1.3";
        gameState.noosphereState = { nodes: [], edges: [] };
        gameState.wisdomShop = {};
    }

    // Sanitize Core Properties
    if (typeof gameState.resources !== 'object' || gameState.resources === null) gameState.resources = { fleeting_thought: 0, wisdom_shards: 0 };
    gameState.resources.fleeting_thought = Number(gameState.resources.fleeting_thought) || 0;
    gameState.resources.wisdom_shards = Number(gameState.resources.wisdom_shards) || 0;

    if (typeof gameState.ideas !== 'object' || gameState.ideas === null) gameState.ideas = {};
    Object.keys(IDEAS_DATA).forEach(id => { if (IDEAS_DATA[id].tier > 0) gameState.ideas[id] = Number(gameState.ideas[id]) || 0; });

    const sanitizedGenerators = {};
    if (typeof gameState.generators !== 'object' || gameState.generators === null) gameState.generators = {};
    // This loop now correctly initializes ALL generators defined in GENERATORS_DATA
    Object.keys(GENERATORS_DATA).forEach(id => {
        const loadedGenData = gameState.generators[id]; let level = 0;
        if (loadedGenData && typeof loadedGenData === 'object') { const loadedLevel = loadedGenData.level ?? loadedGenData.Level; level = Number(loadedLevel) || 0; }
        sanitizedGenerators[id] = { level: level };
    });
    gameState.generators = sanitizedGenerators;

    const sanitizedCrafters = {};
    if (typeof gameState.crafters !== 'object' || gameState.crafters === null) gameState.crafters = {};
    Object.keys(CRAFTERS_DATA).forEach(id => {
        const loadedCrafterData = gameState.crafters[id]; let level = 0;
        if (loadedCrafterData && typeof loadedCrafterData === 'object') { const loadedLevel = loadedCrafterData.level ?? loadedCrafterData.Level; level = Number(loadedLevel) || 0; }
        sanitizedCrafters[id] = { level: level };
    });
    gameState.crafters = sanitizedCrafters;

    if (!Array.isArray(gameState.unlockedRecipes)) gameState.unlockedRecipes = [];
    if (!(gameState.discoveredIdeas instanceof Set)) { gameState.discoveredIdeas = new Set(Array.isArray(gameState.discoveredIdeas) ? gameState.discoveredIdeas : []); }
    gameState.discoveredIdeas.add('fleeting_thought');

    gameState.transcendenceCount = Number(gameState.transcendenceCount) || 0;
    gameState.lastUpdate = Number(gameState.lastUpdate) || Date.now();
    gameState.tutorialCompleted = gameState.tutorialCompleted === true;

    const validMultipliers = [1, 10, 100, 'Max'];
    if (!validMultipliers.includes(gameState.purchaseMultiplier)) {
        gameState.purchaseMultiplier = 1;
    }

    if (typeof gameState.wisdomShop !== 'object' || gameState.wisdomShop === null) {
        gameState.wisdomShop = {};
    }
    
    // Initialize all wisdom shop upgrades to level 0 if they don't exist
    Object.keys(WISDOM_SHOP_DATA).forEach(upgradeId => {
        if (!gameState.wisdomShop[upgradeId]) {
            gameState.wisdomShop[upgradeId] = { level: 0 };
        } else {
            // Sanitize existing data
            gameState.wisdomShop[upgradeId].level = Number(gameState.wisdomShop[upgradeId].level) || 0;
        }
    });

    gameState.gameVersion = gameState.gameVersion || "0.1.4";
}

const WisdomShop = {
    canAfford(upgradeId) {
        const upgrade = WISDOM_SHOP_DATA[upgradeId];
        if (!upgrade) return false;
        
        const currentLevel = gameState.wisdomShop[upgradeId]?.level || 0;
        if (currentLevel >= upgrade.maxLevel) return false;
        
        const cost = upgrade.baseCost ? 
            Math.floor(upgrade.baseCost * Math.pow(upgrade.costScale || 1, currentLevel)) :
            upgrade.cost;
            
        return gameState.resources.wisdom_shards >= cost;
    },

    getCost(upgradeId) {
        const upgrade = WISDOM_SHOP_DATA[upgradeId];
        if (!upgrade) return 0;
        
        const currentLevel = gameState.wisdomShop[upgradeId]?.level || 0;
        return upgrade.baseCost ? 
            Math.floor(upgrade.baseCost * Math.pow(upgrade.costScale || 1, currentLevel)) :
            upgrade.cost;
    },

    isUnlocked(upgradeId) {
        const upgrade = WISDOM_SHOP_DATA[upgradeId];
        if (!upgrade || !upgrade.unlockCondition) return true;
        
        try {
            return upgrade.unlockCondition();
        } catch (error) {
            console.error(`Error checking unlock condition for ${upgradeId}:`, error);
            return false;
        }
    },

    purchase(upgradeId) {
        if (!this.canAfford(upgradeId) || !this.isUnlocked(upgradeId)) {
            return false;
        }

        const upgrade = WISDOM_SHOP_DATA[upgradeId];
        const cost = this.getCost(upgradeId);
        
        // Deduct cost
        gameState.resources.wisdom_shards -= cost;
        
        // Increase level
        if (!gameState.wisdomShop[upgradeId]) {
            gameState.wisdomShop[upgradeId] = { level: 0 };
        }
        gameState.wisdomShop[upgradeId].level++;
        
        // Apply the upgrade effect
        if (upgrade.applyEffect) {
            try {
                upgrade.applyEffect(gameState.wisdomShop[upgradeId].level);
            } catch (error) {
                console.error(`Error applying effect for ${upgradeId}:`, error);
            }
        }

        return true;
    }
};

/**
 * Saves the current gameState to localStorage.
 */
function saveGame() {
    try {
        gameState.lastUpdate = Date.now();
        const savableGameState = { ...gameState, discoveredIdeas: Array.from(gameState.discoveredIdeas) };
        localStorage.setItem('ideaEngineSave', JSON.stringify(savableGameState));
        if (typeof UI !== 'undefined' && UI.showNotification) {
             UI.showNotification('Game Saved!', 'success');
        }
    } catch (e) { console.error('Failed to save game:', e); if (typeof UI !== 'undefined' && UI.showNotification) { UI.showNotification('Error saving game.', 'error'); } }
}

/**
 * Loads gameState from localStorage, sanitizes it, and calculates offline progress.
 */
function loadGame() {
    const savedGame = localStorage.getItem('ideaEngineSave');
    let loadedState = null; let timeOffline = 0;
    if (savedGame) {
        try { loadedState = JSON.parse(savedGame); Object.assign(gameState, loadedState); }
        catch (e) { console.error('Failed to parse saved game:', e); loadedState = null; resetGameConfirm(true); if (typeof UI !== 'undefined' && UI.showNotification) { UI.showNotification('Failed to load save. Game has been reset.', 'error'); } }
    }
    initializeGameState(!savedGame);
    if (gameState.lastUpdate > 0) { timeOffline = Date.now() - gameState.lastUpdate; } else { gameState.lastUpdate = Date.now(); timeOffline = 0; }
    if (timeOffline > 1000 && typeof GameLogic !== 'undefined' && GameLogic.calculateOfflineProgress) {
        const offlineGains = GameLogic.calculateOfflineProgress(timeOffline);
        if (offlineGains) {
            if (GameLogic._isValidNumber(offlineGains.ftGained)) { if(!GameLogic._isValidNumber(gameState.resources.fleeting_thought)) gameState.resources.fleeting_thought = 0; gameState.resources.fleeting_thought += offlineGains.ftGained; }
            if (offlineGains.ideasGained) { Object.entries(offlineGains.ideasGained).forEach(([ideaId, count]) => { if (GameLogic._isValidNumber(count) && count > 0) { if(!GameLogic._isValidNumber(gameState.ideas[ideaId])) gameState.ideas[ideaId] = 0; gameState.ideas[ideaId] += count; gameState.discoveredIdeas.add(ideaId); } }); }
            if (offlineGains.ftGained > 0.1 || Object.keys(offlineGains.ideasGained || {}).length > 0) {
                 const secondsOfflineForNotification = timeOffline / 1000;
                 let offlineSummary = `Offline gains (${Utils.formatTime(Math.floor(secondsOfflineForNotification))}): +${Utils.formatNumber(offlineGains.ftGained)} FT. `;
                 Object.entries(offlineGains.ideasGained || {}).forEach(([id, count]) => { offlineSummary += `+${Utils.formatNumber(count)} ${IDEAS_DATA[id]?.name || id}. `; });
                 if (typeof UI !== 'undefined' && UI.showNotification) { UI.showNotification(offlineSummary, 'success'); }
            }
        }
    }
    gameState.lastUpdate = Date.now();
    if (typeof GameLogic !== 'undefined') { GameLogic.lastTick = Date.now(); }
    if (loadedState) { console.log('Game Loaded and Initialized!'); } else if (!savedGame) { console.log('No save found, starting new game.'); }
}

/**
 * Confirms and resets the game state to default values.
 */
function resetGameConfirm(isError = false) {
    const message = isError ? "Error with save data. Would you like to reset the game to its initial state? This cannot be undone." : "Are you sure you want to reset all progress? This cannot be undone.";
    if (confirm(message)) {
        localStorage.removeItem('ideaEngineSave'); initializeGameState(true); saveGame();
        if (typeof GameLogic !== 'undefined') GameLogic.lastTick = Date.now(); gameState.lastUIRefresh = 0;
        if (typeof Noosphere !== 'undefined') Noosphere.renderFromGameState();
        if (typeof UI !== 'undefined') UI.updateAllUI();
        if (typeof UI !== 'undefined') UI.switchPanel('noosphere-panel', document.querySelector('.nav-button[data-panel="noosphere-panel"]'));
        console.log("Game reset to initial state."); if (typeof UI !== 'undefined' && UI.showNotification) { UI.showNotification("Game has been reset.", "info"); }
    }
}
