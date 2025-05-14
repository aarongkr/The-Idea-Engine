// js/main.js
let gameLoopInterval;

/**
 * Main function to initialize and start the game.
 */
function main() {
    console.log("Initializing The Idea Engine...");

    // Load game data or initialize a new game state
    // loadGame() also handles initial offline progress calculation
    loadGame();

    // Initialize UI components and event listeners
    if (typeof UI !== 'undefined' && UI.init) {
        UI.init();
    } else {
        console.error("UI object or UI.init method not found!");
        // Display a critical error to the user if UI can't init
        document.body.innerHTML = "<p style='color:red; font-size:20px; padding:30px;'>Critical Error: Game UI could not be initialized. Please check console.</p>";
        return; // Stop further execution if UI is broken
    }

    // Initialize Noosphere visualization
    if (typeof Noosphere !== 'undefined' && Noosphere.init) {
        Noosphere.init('noosphere-graph', 'tooltip-container');
    } else {
        console.error("Noosphere object or Noosphere.init method not found!");
        // Potentially display a non-critical error if Noosphere is just for visuals
    }

    // Perform initial full UI render based on the loaded/initialized state
    if (typeof UI !== 'undefined' && UI.updateAllUI) {
        UI.updateAllUI();
    }
    if (typeof Noosphere !== 'undefined' && Noosphere.renderFromGameState) {
        Noosphere.renderFromGameState(); // Draw initial Noosphere state
    }


    // Setup Core Game Action Event Listeners
    // Ensure UI.elements are available before adding listeners
    if (UI.elements) {
        if (UI.elements.sparkButton) UI.elements.sparkButton.addEventListener('click', GameLogic.sparkFleetingThought);
        if (UI.elements.combineButton) UI.elements.combineButton.addEventListener('click', GameLogic.attemptCombination);
        if (UI.elements.transcendButton) UI.elements.transcendButton.addEventListener('click', GameLogic.transcend);

        // Save/Load/Reset Buttons
        const saveBtn = document.getElementById('save-button');
        const loadBtn = document.getElementById('load-button');
        const resetBtn = document.getElementById('reset-button');
        const exportBtn = document.getElementById('export-save-button');
        const importArea = document.getElementById('import-save-area');
        const importBtn = document.getElementById('import-save-button');


        if (saveBtn) saveBtn.addEventListener('click', saveGame);
        if (loadBtn) loadBtn.addEventListener('click', () => {
            loadGame(); // loadGame now handles offline progress and initial sanitization
            if (typeof UI !== 'undefined') UI.updateAllUI();
            if (typeof Noosphere !== 'undefined') Noosphere.renderFromGameState();
        });
        if (resetBtn) resetBtn.addEventListener('click', () => resetGameConfirm(false));

        // Export/Import Save Functionality (Basic)
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                try {
                    const saveData = localStorage.getItem('ideaEngineSave');
                    if (saveData) {
                        navigator.clipboard.writeText(saveData)
                            .then(() => UI.showNotification("Save data copied to clipboard!", "success"))
                            .catch(err => { console.error('Failed to copy save data: ', err); UI.showNotification("Failed to copy save data.", "error"); });
                    } else {
                        UI.showNotification("No save data to export.", "info");
                    }
                } catch (e) { console.error("Export error:", e); UI.showNotification("Error exporting save.", "error");}
            });
        }
        if (importBtn && importArea) {
            importBtn.addEventListener('click', () => {
                const saveDataString = importArea.value.trim();
                if (saveDataString) {
                    if (confirm("Importing will overwrite your current game. Are you sure?")) {
                        try {
                            JSON.parse(saveDataString); // Test if it's valid JSON
                            localStorage.setItem('ideaEngineSave', saveDataString);
                            loadGame(); // Reload game with imported data
                            if (typeof UI !== 'undefined') UI.updateAllUI();
                            if (typeof Noosphere !== 'undefined') Noosphere.renderFromGameState();
                            UI.showNotification("Game data imported successfully!", "success");
                            importArea.value = ''; // Clear textarea
                        } catch (e) {
                            console.error("Import error - Invalid save data:", e);
                            UI.showNotification("Invalid save data format.", "error");
                        }
                    }
                } else {
                    UI.showNotification("Paste save data into the text area first.", "info");
                }
            });
        }


    } else {
        console.error("UI.elements not found, cannot attach core game listeners.");
    }

    // Start Game Loop
    if (gameLoopInterval) clearInterval(gameLoopInterval); // Clear existing interval if any
    gameLoopInterval = setInterval(GameLogic.tick, 100); // Tick ~10 times per second

    console.log("The Idea Engine Initialized and Running.");
}

// Ensure DOM is fully loaded before starting the game
document.addEventListener('DOMContentLoaded', main);

// Optional: Auto-save periodically
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds
setInterval(() => {
    if (typeof saveGame === 'function') { // Ensure saveGame is defined
        saveGame();
        // console.log("Auto-saved game."); // Optional: Less obtrusive than a notification
    }
}, AUTO_SAVE_INTERVAL);