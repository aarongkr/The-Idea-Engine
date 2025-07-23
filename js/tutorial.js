// js/tutorial.js

/**
 * Manages the interactive tutorial for new players.
 * This object controls the display of tutorial messages, highlights UI elements,
 * and checks for completion conditions for each step.
 */
const Tutorial = {
    // Defines the sequence of steps in the tutorial
    steps: [
        {
            text: "Welcome to The Idea Engine! Your journey begins with a single spark. Click 'Spark Fleeting Thought' to create your first bunch of resources.",
            target: '#spark-button',
            // This condition checks if the step is complete by looking at the game state.
            isComplete: () => gameState.resources.fleeting_thought >= 20,
            // An optional function to run before this step is shown.
            before: () => {}
        },
        {
            text: "Excellent! Fleeting Thoughts are the raw material for everything. Now, let's turn them into something useful. Click the 'Base Refinement' tab.",
            target: '.nav-button[data-panel="refinement-panel"]',
            // This function defines a user action (a specific click) that completes the step.
            action: (e) => e.target.closest('.nav-button')?.dataset.panel === 'refinement-panel',
            before: () => {}
        },
        {
            text: "This is where you build passive generators. You have enough FT to build your first 'Mind Palace Construction'. Click its 'Build' button.",
            // The target will be the button inside the first upgrade card in the list.
            target: '#generators-list .upgrade-card:first-child .buy-generator',
            isComplete: () => gameState.generators.mind_palace?.level > 0,
            // Before this step, ensure the correct panel is visible for the user.
            before: () => {
                if (typeof UI !== 'undefined') {
                    UI.switchPanel('refinement-panel', document.querySelector('.nav-button[data-panel="refinement-panel"]'));
                }
            }
        },
        {
            text: "Great! Your Mind Palace will now generate Fleeting Thoughts automatically. You've learned the basics. The rest is up to you to discover. Good luck!",
            target: null, // No target for the final informational step.
            isComplete: () => false, // This step only advances via the 'Finish' button.
            before: () => {}
        }
    ],

    // Tracks the current state of the tutorial
    currentStepIndex: 0,
    isActive: false,

    // Caches DOM elements for the tutorial UI for performance
    elements: {
        overlay: null,
        box: null,
        text: null,
        nextButton: null,
        skipButton: null
    },

    /**
     * Initializes the tutorial system, caching elements and setting up listeners.
     */
    init() {
        this.elements.overlay = document.getElementById('tutorial-overlay');
        this.elements.box = document.getElementById('tutorial-box');
        this.elements.text = document.getElementById('tutorial-text');
        this.elements.nextButton = document.getElementById('tutorial-next-button');
        this.elements.skipButton = document.getElementById('skip-tutorial-button');

        if (!this.elements.overlay) {
            console.error("Tutorial UI not found in HTML!");
            return;
        }

        this.elements.nextButton.addEventListener('click', () => this.advanceStep());
        this.elements.skipButton.addEventListener('click', () => this.end());

        // A global listener to check for tutorial actions (like clicking a specific game element).
        // Using the capture phase (true) ensures this listener fires before others might stop the event.
        document.body.addEventListener('click', (e) => {
            if (!this.isActive) return;

            const step = this.steps[this.currentStepIndex];
            if (step && typeof step.action === 'function') {
                if (step.action(e)) {
                    this.advanceStep();
                }
            }
        }, true);
    },

    /**
     * Starts the tutorial if it hasn't been completed according to the game state.
     */
    start() {
        if (gameState.tutorialCompleted) {
            return;
        }
        this.isActive = true;
        this.currentStepIndex = 0;
        this.elements.overlay.classList.remove('hidden');
        this.showStep();
    },

    /**
     * Ends the tutorial, hides the UI, and saves the completion state.
     */
    end() {
        this.isActive = false;
        this.elements.overlay.classList.add('hidden');
        this.clearHighlights();
        gameState.tutorialCompleted = true; // Set the flag in the game state.
        saveGame(); // Save the state immediately so it doesn't reappear on refresh.
    },

    /**
     * Displays the current tutorial step's text and highlights its target.
     */
    showStep() {
        if (!this.isActive || this.currentStepIndex >= this.steps.length) {
            this.end();
            return;
        }

        const step = this.steps[this.currentStepIndex];

        if (typeof step.before === 'function') {
            step.before();
        }

        this.elements.text.textContent = step.text;
        // Change the button text on the final step.
        this.elements.nextButton.textContent = (this.currentStepIndex === this.steps.length - 1) ? 'Finish' : 'Next';

        this.highlightElement(step.target);
    },

    /**
     * Moves to the next step in the tutorial sequence.
     */
    advanceStep() {
        this.currentStepIndex++;
        this.showStep();
    },

    /**
     * Checks if the completion condition for the current step is met. Called from the main game loop.
     */
    checkCompletion() {
        if (!this.isActive) return;

        const step = this.steps[this.currentStepIndex];
        if (step && typeof step.isComplete === 'function' && step.isComplete()) {
            this.advanceStep();
        }
    },

    /**
     * Removes the highlight effect from all elements.
     */
    clearHighlights() {
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
    },

    /**
     * Highlights a specific element on the page by adding a CSS class.
     * @param {string | null} selector - The CSS selector for the element to highlight.
     */
    highlightElement(selector) {
        this.clearHighlights();
        if (selector) {
            // Use a short timeout to ensure the element is visible after any UI updates.
            setTimeout(() => {
                const targetElement = document.querySelector(selector);
                if (targetElement) {
                    targetElement.classList.add('tutorial-highlight');
                }
            }, 50);
        }
    }
};
