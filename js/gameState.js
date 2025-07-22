// js/gameState.js
let gameState = { // Default structure for a NEW game or the target after loading.
    lastUpdate: 0,
    resources: {
        fleeting_thought: 0,
        wisdom_shards: 0
    },
    ideas: {},
    generators: {}, // For base FT upgrades, FT generators, concept generators
    crafters: {},   // For Insight, Theory, Paradigm auto-crafters
    unlockedRecipes: [],
    noosphereState: { nodes: [], edges: [] },
    discoveredIdeas: new Set(),
    transcendenceCount: 0,
    gameVersion: "0.2.0", // Increment version for new stats/tutorial structure
    buyMode: 1, // NEW: For mass buy. Can be 1, 10, 100, or -1 (for MAX)
    tutorial: { // NEW: Tutorial State
        isActive: true,
        step: 0 // Current step index
    },
    stats: { // NEW: Statistics Tracking
        startTime: Date.now(),
        playTimeSeconds: 0,
        totalClicks: 0,
        ftSparkedManual: 0,
        ftGeneratedPassive: 0,
        lifetimeFT: 0,
        ideasSynthesized: 0,
        autoCraftProductions: 0,
        gameSaves: 0,
        transcendences: 0
    }
};

/**
 * Initializes or sanitizes the global gameState object.
 * @param {boolean} isNewGameFromFile - True if no save file was found at all.
 */
function initializeGameState(isNewGameFromFile = false) {
    let previousStats = gameState.stats ? { ...gameState.stats } : null;

    if (isNewGameFromFile) {
        console.log("Initializing NEW game state from scratch.");
        // Reset all properties to their default values
        Object.assign(gameState, {
            lastUpdate: Date.now(), resources: { fleeting_thought: 0, wisdom_shards: 0 }, ideas: {},
            generators: {}, crafters: {}, unlockedRecipes: [], noosphereState: { nodes: [], edges: [] },
            discoveredIdeas: new Set(['fleeting_thought']), transcendenceCount: 0, gameVersion: "0.2.0",
            buyMode: 1, tutorial: { isActive: true, step: 0 },
            stats: {
                startTime: Date.now(), playTimeSeconds: 0, totalClicks: 0, ftSparkedManual: 0,
                ftGeneratedPassive: 0, lifetimeFT: 0, ideasSynthesized: 0, autoCraftProductions: 0,
                gameSaves: 0, transcendences: 0
            }
        });
    }

    // --- Sanitize Core Properties ---
    const ensureObject = (obj) => (typeof obj === 'object' && obj !== null) ? obj : {};
    gameState.resources = ensureObject(gameState.resources);
    gameState.ideas = ensureObject(gameState.ideas);
    gameState.generators = ensureObject(gameState.generators);
    gameState.crafters = ensureObject(gameState.crafters);
    gameState.tutorial = ensureObject(gameState.tutorial);
    gameState.stats = { ...{/* Default stats structure */}, ...ensureObject(gameState.stats) }; // Merge to ensure all stats keys exist

    // ... (Sanitization logic for resources, ideas, generators, crafters, etc. remains the same)
    gameState.resources.fleeting_thought = Number(gameState.resources.fleeting_thought) || 0;
    gameState.resources.wisdom_shards = Number(gameState.resources.wisdom_shards) || 0;
    Object.keys(IDEAS_DATA).forEach(id => { if (id !== 'fleeting_thought' && IDEAS_DATA[id]?.tier > 0) gameState.ideas[id] = Number(gameState.ideas[id]) || 0; });
    const sanitizedGenerators = {}; Object.keys(GENERATORS_DATA).forEach(id => { const loadedLevel = gameState.generators[id]?.level ?? gameState.generators[id]?.Level; sanitizedGenerators[id] = { level: Number(loadedLevel) || 0 }; }); gameState.generators = sanitizedGenerators;
    const sanitizedCrafters = {}; Object.keys(CRAFTERS_DATA).forEach(id => { const loadedLevel = gameState.crafters[id]?.level ?? gameState.crafters[id]?.Level; sanitizedCrafters[id] = { level: Number(loadedLevel) || 0 }; }); gameState.crafters = sanitizedCrafters;
    gameState.unlockedRecipes = Array.isArray(gameState.unlockedRecipes) ? gameState.unlockedRecipes : [];
    gameState.discoveredIdeas = (gameState.discoveredIdeas instanceof Set) ? gameState.discoveredIdeas : new Set(Array.isArray(gameState.discoveredIdeas) ? gameState.discoveredIdeas : ['fleeting_thought']);
    gameState.discoveredIdeas.add('fleeting_thought');
    gameState.transcendenceCount = Number(gameState.transcendenceCount) || 0;
    gameState.lastUpdate = Number(gameState.lastUpdate) || Date.now();
    gameState.gameVersion = gameState.gameVersion || "0.2.0";
    gameState.buyMode = [1, 10, 100, -1].includes(gameState.buyMode) ? gameState.buyMode : 1; // Sanitize buyMode
    gameState.tutorial.isActive = typeof gameState.tutorial.isActive === 'boolean' ? gameState.tutorial.isActive : false;
    gameState.tutorial.step = Number(gameState.tutorial.step) || 0;
}

/**
 * Saves the current gameState to localStorage, converting Set to Array.
 */
function saveGame() {
    try {
        if (gameState.stats && GameLogic._isValidNumber(gameState.lastUpdate) && gameState.lastUpdate > 0) {
            const sessionTime = (Date.now() - gameState.lastUpdate) / 1000;
            if (GameLogic._isValidNumber(sessionTime) && sessionTime > 0) {
                gameState.stats.playTimeSeconds = (Number(gameState.stats.playTimeSeconds) || 0) + sessionTime;
            }
        }
        gameState.lastUpdate = Date.now();
        if (gameState.stats) gameState.stats.gameSaves = (Number(gameState.stats.gameSaves) || 0) + 1;

        // Convert Set to Array for JSON compatibility
        const savableGameState = { ...gameState, discoveredIdeas: Array.from(gameState.discoveredIdeas) };
        localStorage.setItem('ideaEngineSave', JSON.stringify(savableGameState));

        if (typeof UI !== 'undefined') UI.showNotification('Game Saved!', 'success');
    } catch (e) {
        console.error('Failed to save game:', e);
        if (typeof UI !== 'undefined') UI.showNotification('Error saving game.', 'error');
    }
}

/**
 * Loads gameState from localStorage, sanitizes it, and calculates offline progress.
 */
function loadGame() {
    const savedGame = localStorage.getItem('ideaEngineSave');
    let loadedState = null;
    let timeOffline = 0;
    let isTrulyNewGame = !savedGame;

    if (savedGame) {
        try {
            loadedState = JSON.parse(savedGame);
            Object.assign(gameState, loadedState); // Overwrite default state
        } catch (e) {
            console.error('Failed to parse save data:', e);
            loadedState = null; // Treat as if no save was loaded
            if (typeof UI !== 'undefined') UI.showNotification('Save data corrupted. Starting new game.', 'error');
        }
    }

    initializeGameState(isTrulyNewGame);

    if (GameLogic._isValidNumber(gameState.lastUpdate) && gameState.lastUpdate > 0) {
        timeOffline = Date.now() - gameState.lastUpdate;
        if (!isTrulyNewGame && timeOffline > 0 && timeOffline < (1000 * 60 * 60 * 24 * 7)) {
            gameState.stats.playTimeSeconds = (Number(gameState.stats.playTimeSeconds) || 0) + (timeOffline / 1000);
        }
    }

    if (timeOffline > 1000 && typeof GameLogic !== 'undefined') {
        const offlineGains = GameLogic.calculateOfflineProgress(timeOffline);
        if (offlineGains) {
            if (GameLogic._isValidNumber(offlineGains.ftGained)) gameState.resources.fleeting_thought += offlineGains.ftGained;
            if (offlineGains.ideasGained) {
                Object.entries(offlineGains.ideasGained).forEach(([id, count]) => { if (GameLogic._isValidNumber(count) && count > 0) { gameState.ideas[id] = (gameState.ideas[id] || 0) + count; gameState.discoveredIdeas.add(id); } });
            }
            if (offlineGains.ftGained > 0.1 || Object.keys(offlineGains.ideasGained || {}).length > 0) {
                const secondsOfflineForNotification = timeOffline / 1000;
                let offlineSummary = `Offline gains (${Utils.formatTime(secondsOfflineForNotification)}): +${Utils.formatNumber(offlineGains.ftGained)} FT. `;
                Object.entries(offlineGains.ideasGained || {}).forEach(([id, count]) => { offlineSummary += `+${Utils.formatNumber(count)} ${IDEAS_DATA[id]?.name || id}. `; });
                if (typeof UI !== 'undefined') UI.showNotification(offlineSummary, 'success');
            }
        }
    }

    gameState.lastUpdate = Date.now();
    if (typeof GameLogic !== 'undefined') GameLogic.lastTick = Date.now();

    if (loadedState && !isTrulyNewGame) console.log('Game Loaded and Initialized!');
    else if (isTrulyNewGame) console.log('No save found, starting new game.');
}

function resetGameConfirm(isError = false) { /* ... same as your version ... */
    const message = isError ? "Error with save data. Reset game?" : "Reset all progress?";
    if (confirm(message)) {
        localStorage.removeItem('ideaEngineSave');
        const originalStartTime = !isError ? gameState.stats?.startTime : null;
        initializeGameState(true);
        if (gameState.stats && originalStartTime) gameState.stats.startTime = originalStartTime;
        else if (gameState.stats) gameState.stats.playTimeSeconds = 0;
        saveGame();
        if (typeof GameLogic !== 'undefined') GameLogic.lastTick = Date.now();
        gameState.lastUIRefresh = 0;
        if (typeof Noosphere !== 'undefined') Noosphere.renderFromGameState();
        if (typeof UI !== 'undefined') {
            UI.updateAllUI();
            UI.switchPanel('base-refinement-panel', document.querySelector('.nav-button[data-panel="base-refinement-panel"]'));
            UI.showNotification("Game has been reset.", "info");
        }
        console.log("Game reset to initial state.");
    }
}
