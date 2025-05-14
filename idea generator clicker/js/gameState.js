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
    noosphereState: { nodes: [], edges: [] }, // Primarily managed by Vis.js, structure placeholder
    discoveredIdeas: new Set(), // Will be populated by initializeGameState
    transcendenceCount: 0,
    gameVersion: "0.1.0" // Update this if you make breaking save changes
};

/**
 * Initializes or sanitizes the global gameState object.
 * Ensures all expected properties exist and have correct types.
 * @param {boolean} isNewGame - True if starting a fresh game (no save loaded).
 */
function initializeGameState(isNewGame = false) {
    if (isNewGame) {
        gameState.lastUpdate = Date.now();
        gameState.resources = { fleeting_thought: 0, wisdom_shards: 0 };
        gameState.ideas = {};
        gameState.generators = {}; // Initialize as empty; loop below populates with level 0
        gameState.crafters = {};   // Initialize as empty; loop below populates with level 0
        gameState.unlockedRecipes = [];
        gameState.discoveredIdeas = new Set(['fleeting_thought']);
        gameState.transcendenceCount = 0;
        // gameState.gameVersion = "0.1.0"; // Stays as defined in default
        gameState.noosphereState = { nodes: [], edges: [] };
        // console.log("Initializing NEW game state.");
    } else {
        // console.log("Sanitizing LOADED game state.");
    }

    // --- Sanitize Core Properties ---
    const ensureObject = (obj) => (typeof obj === 'object' && obj !== null) ? obj : {};
    gameState.resources = ensureObject(gameState.resources);
    gameState.ideas = ensureObject(gameState.ideas);
    gameState.generators = ensureObject(gameState.generators);
    gameState.crafters = ensureObject(gameState.crafters);

    gameState.resources.fleeting_thought = Number(gameState.resources.fleeting_thought) || 0;
    gameState.resources.wisdom_shards = Number(gameState.resources.wisdom_shards) || 0;

    // Initialize/Sanitize Ideas counts
    Object.keys(IDEAS_DATA).forEach(id => {
        if (id !== 'fleeting_thought' && IDEAS_DATA[id]?.tier > 0) {
            gameState.ideas[id] = Number(gameState.ideas[id]) || 0;
        }
    });

    // Initialize/Sanitize Generators levels
    const sanitizedGenerators = {};
    Object.keys(GENERATORS_DATA).forEach(id => {
        const loadedLevel = gameState.generators[id]?.level ?? gameState.generators[id]?.Level; // Check for old 'Level'
        sanitizedGenerators[id] = { level: Number(loadedLevel) || 0 };
    });
    gameState.generators = sanitizedGenerators;

    // Initialize/Sanitize Crafters levels
    const sanitizedCrafters = {};
    Object.keys(CRAFTERS_DATA).forEach(id => {
        const loadedLevel = gameState.crafters[id]?.level ?? gameState.crafters[id]?.Level;
        sanitizedCrafters[id] = { level: Number(loadedLevel) || 0 };
    });
    gameState.crafters = sanitizedCrafters;

    // Sanitize other properties
    gameState.unlockedRecipes = Array.isArray(gameState.unlockedRecipes) ? gameState.unlockedRecipes : [];
    gameState.discoveredIdeas = (gameState.discoveredIdeas instanceof Set) ? gameState.discoveredIdeas : new Set(Array.isArray(gameState.discoveredIdeas) ? gameState.discoveredIdeas : ['fleeting_thought']);
    gameState.discoveredIdeas.add('fleeting_thought');

    gameState.transcendenceCount = Number(gameState.transcendenceCount) || 0;
    gameState.lastUpdate = Number(gameState.lastUpdate) || Date.now();
    gameState.gameVersion = gameState.gameVersion || "0.1.0";

    gameState.noosphereState = ensureObject(gameState.noosphereState);
    gameState.noosphereState.nodes = Array.isArray(gameState.noosphereState.nodes) ? gameState.noosphereState.nodes : [];
    gameState.noosphereState.edges = Array.isArray(gameState.noosphereState.edges) ? gameState.noosphereState.edges : [];

    // console.log("[InitializeGameState END] gameState fully sanitized/initialized.");
}

/**
 * Saves the current gameState to localStorage.
 */
function saveGame() {
    try {
        gameState.lastUpdate = Date.now();
        // Convert Set to Array for JSON stringification
        const savableGameState = { ...gameState, discoveredIdeas: Array.from(gameState.discoveredIdeas) };
        localStorage.setItem('ideaEngineSave', JSON.stringify(savableGameState));

        if (typeof UI !== 'undefined' && UI.showNotification) {
             UI.showNotification('Game Saved!', 'success');
        }
    } catch (e) {
        console.error('Failed to save game:', e);
         if (typeof UI !== 'undefined' && UI.showNotification) {
            UI.showNotification('Error saving game. Storage might be full or data unstringifiable.', 'error');
         }
    }
}

/**
 * Loads gameState from localStorage, sanitizes it, and calculates offline progress.
 */
function loadGame() {
    const savedGame = localStorage.getItem('ideaEngineSave');
    let loadedState = null;
    let timeOffline = 0;

    if (savedGame) {
        try {
            loadedState = JSON.parse(savedGame);
            // If discoveredIdeas was saved as an array, it will be converted to Set by initializeGameState
            Object.assign(gameState, loadedState); // Overwrite default gameState with loaded data
        } catch (e) {
            console.error('Failed to parse saved game:', e);
            loadedState = null; // Force initialization as new game if parse fails
            // resetGameConfirm(true); // Optionally offer reset, or just initialize new
            // Forcing new game on corrupted save is safer for now:
             if (typeof UI !== 'undefined' && UI.showNotification) {
                UI.showNotification('Save data corrupted. Starting new game.', 'error');
             }
        }
    }

    initializeGameState(!loadedState && !savedGame); // True for new game only if no save existed *and* no loadedState
                                                   // Otherwise, sanitize the loaded (or partially loaded) state

    if (GameLogic._isValidNumber(gameState.lastUpdate) && gameState.lastUpdate > 0) {
        timeOffline = Date.now() - gameState.lastUpdate;
    } else {
        gameState.lastUpdate = Date.now(); // Correct invalid lastUpdate
        timeOffline = 0;
    }

    // Calculate and Apply Offline Progress (if GameLogic is available)
    if (timeOffline > 1000 && typeof GameLogic !== 'undefined' && GameLogic.calculateOfflineProgress) {
        const offlineGains = GameLogic.calculateOfflineProgress(timeOffline);
        if (offlineGains) {
            if (GameLogic._isValidNumber(offlineGains.ftGained)) {
                 if(!GameLogic._isValidNumber(gameState.resources.fleeting_thought)) gameState.resources.fleeting_thought = 0;
                gameState.resources.fleeting_thought += offlineGains.ftGained;
            }
            if (offlineGains.ideasGained) {
                 Object.entries(offlineGains.ideasGained).forEach(([ideaId, count]) => {
                     if (GameLogic._isValidNumber(count) && count > 0) {
                         if(!GameLogic._isValidNumber(gameState.ideas[ideaId])) gameState.ideas[ideaId] = 0;
                         gameState.ideas[ideaId] += count;
                         gameState.discoveredIdeas.add(ideaId);
                    }
                });
            }
             if (offlineGains.ftGained > 0.1 || Object.keys(offlineGains.ideasGained || {}).length > 0) {
                 const secondsOfflineForNotification = timeOffline / 1000;
                 let offlineSummary = `Offline gains (${Math.floor(secondsOfflineForNotification / 60)} min): +${Utils.formatNumber(offlineGains.ftGained)} FT. `;
                 Object.entries(offlineGains.ideasGained || {}).forEach(([id, count]) => {
                     offlineSummary += `+${Utils.formatNumber(count)} ${IDEAS_DATA[id]?.name || id}. `;
                 });
                 if (typeof UI !== 'undefined' && UI.showNotification) {
                    UI.showNotification(offlineSummary, 'success');
                 }
             }
        }
    }

    gameState.lastUpdate = Date.now(); // Set last update to now after processing
    if (typeof GameLogic !== 'undefined') GameLogic.lastTick = Date.now(); // Sync GameLogic's timer

    if (loadedState) console.log('Game Loaded and Initialized!');
    else if (!savedGame) console.log('No save found, starting new game.');
}

/**
 * Confirms and resets the game state to default values.
 * @param {boolean} isError - If true, displays a message indicating a save error prompted the reset.
 */
function resetGameConfirm(isError = false) {
    const message = isError
        ? "Error with save data. Would you like to reset the game to its initial state? This cannot be undone."
        : "Are you sure you want to reset all progress? This cannot be undone.";

    if (confirm(message)) {
        localStorage.removeItem('ideaEngineSave');
        initializeGameState(true); // true for "brand new game"
        saveGame();

         if (typeof GameLogic !== 'undefined') GameLogic.lastTick = Date.now();
         gameState.lastUIRefresh = 0;

        if (typeof Noosphere !== 'undefined' && Noosphere.renderFromGameState) Noosphere.renderFromGameState();
        if (typeof UI !== 'undefined' && UI.updateAllUI) UI.updateAllUI();
        if (typeof UI !== 'undefined' && UI.switchPanel) UI.switchPanel('noosphere-panel', document.querySelector('.nav-button[data-panel="noosphere-panel"]'));

        console.log("Game reset to initial state.");
        if (typeof UI !== 'undefined' && UI.showNotification) {
             UI.showNotification("Game has been reset.", "info");
        }
    }
}