// js/main.js

let gameLoopInterval;

/**
 * The main entry point for the game. Initializes all systems and starts the game loop.
 */
function main() {
    console.log("Initializing The Idea Engine...");
    loadGame(); // Load saved data or initialize a fresh state

    // Initialize UI components and event listeners
    if (typeof UI !== 'undefined') UI.init();
    if (typeof Noosphere !== 'undefined') Noosphere.init('noosphere-graph', 'tooltip-container');

    // Perform the initial full render of the UI and graph based on the loaded state
    if (typeof UI !== 'undefined') UI.updateAllUI();
    if (typeof Noosphere !== 'undefined') Noosphere.renderFromGameState();


    // Setup core game action event listeners
    if (UI?.elements?.sparkButton) UI.elements.sparkButton.addEventListener('click', GameLogic.sparkFleetingThought);
    if (UI?.elements?.combineButton) UI.elements.combineButton.addEventListener('click', GameLogic.attemptCombination);
    if (UI?.elements?.transcendButton) UI.elements.transcendButton.addEventListener('click', GameLogic.transcend);


    // Setup footer button event listeners
    const saveBtn = document.getElementById('save-button');
    const loadBtn = document.getElementById('load-button');
    const resetBtn = document.getElementById('reset-button');
    
    if (saveBtn) saveBtn.addEventListener('click', saveGame);
    if (loadBtn) loadBtn.addEventListener('click', () => {
        loadGame();
        // Manually trigger a full refresh after loading
        if (typeof UI !== 'undefined') UI.updateAllUI();
        if (typeof Noosphere !== 'undefined') Noosphere.renderFromGameState();
    });
    if (resetBtn) resetBtn.addEventListener('click', () => resetGameConfirm(false));

    // Start the game loop, executing the tick function periodically
    gameLoopInterval = setInterval(GameLogic.tick, 100); // 10 ticks per second
    
    console.log("The Idea Engine Initialized and Running.");
}

// Ensure the main function runs only after the entire page is loaded
document.addEventListener('DOMContentLoaded', main);

// Set up an auto-save interval
setInterval(saveGame, 30000); // Save every 30 seconds
