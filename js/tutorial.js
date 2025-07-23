// js/tutorial.js

/**
 * Manages the interactive tutorial for new players.
 */
const Tutorial = {
    steps: [
        {
            text: "Welcome to The Idea Engine! Your journey begins with a single spark. Click 'Spark Fleeting Thought' until you have 20 FT.",
            target: '#spark-button',
            isComplete: () => gameState.resources.fleeting_thought >= 20,
            before: () => {}
        },
        {
            text: "Excellent! Fleeting Thoughts are the raw material for everything. Now, let's turn them into something useful. Click the 'Base Refinement' tab.",
            target: '.nav-button[data-panel="refinement-panel"]',
            // isComplete for this step will be handled by the click action
            action: (e) => e.target.closest('.nav-button')?.dataset.panel === 'refinement-panel',
            before: () => {}
        },
        {
            text: "This is where you build passive generators. You have enough FT to build your first 'Mind Palace Construction'. Click its 'Build' button.",
            target: '#generators-list .upgrade-card:first-child .buy-generator',
            isComplete: () => gameState.generators.mind_palace?.level > 0,
            before: () => {
                // Force the correct panel to be open for this step
                if (typeof UI !== 'undefined') {
                    UI.switchPanel('refinement-panel', document.querySelector('.nav-button[data-panel="refinement-panel"]'));
                    UI.renderGenerators(); // Ensure the generator is visible
                }
            }
        },
        {
            text: "Great! Your Mind Palace will now generate Fleeting Thoughts automatically. You've learned the basics. The rest is up to you to discover. Good luck!",
            target: null, // No specific element to highlight
            isComplete: () => false, // This step is only advanced by clicking "Finish"
            before: () => {}
        }
    ],

    currentStepIndex: 0,
    isActive: false,

    // Cache elements for performance
    elements: {
        overlay: null, box: null, text: null,
        nextButton: null, skipButton: null
    },

    init() {
        this.elements.overlay = document.getElementById('tutorial-overlay');
        this.elements.box = document.getElementById('tutorial-box');
        this.elements.text = document.getElementById('tutorial-text');
        this.elements.nextButton = document.getElementById('tutorial-next-button');
        this.elements.skipButton = document.getElementById('skip-tutorial-button');

        if (!this.elements.overlay) { console.error("Tutorial UI not found in HTML!"); return; }

        // Add event listeners
        this.elements.nextButton.addEventListener('click', () => this.advanceStep());
        this.elements.skipButton.addEventListener('click', () => this.end());

        // Use a single delegated event listener on the body for action-based steps
        document.body.addEventListener('click', (e) => {
            if (!this.isActive) return;
            const step = this.steps[this.currentStepIndex];
            // Check if the step requires a specific click action
            if (step && typeof step.action === 'function') {
                if (step.action(e)) {
                    this.advanceStep();
                }
            }
        }, true); // Use capture phase to catch the click early
    },

    start() {
        if (gameState.tutorialCompleted) return; // Don't start if already completed
        this.isActive = true;
        this.currentStepIndex = 0;
        this.elements.overlay.classList.remove('hidden');
        this.showStep();
    },

    end() {
        this.isActive = false;
        this.elements.overlay.classList.add('hidden');
        this.clearHighlights();
        gameState.tutorialCompleted = true; // Mark as completed
        saveGame(); // Save the completion state
        // Trigger a final UI update to ensure everything is rendered correctly post-tutorial
        if (typeof UI !== 'undefined') {
            UI.updateAllUI();
        }
    },

    showStep() {
        if (!this.isActive || this.currentStepIndex >= this.steps.length) {
            this.end();
            return;
        }
        const step = this.steps[this.currentStepIndex];
        // Run any setup function before showing the step
        if (typeof step.before === 'function') {
            step.before();
        }

        this.elements.text.textContent = step.text;
        // The 'Next' button becomes 'Finish' on the last step
        this.elements.nextButton.textContent = (this.currentStepIndex === this.steps.length - 1) ? 'Finish' : 'Next';
        // 'Next' button should be hidden for steps that require an action or have a completion check
        this.elements.nextButton.style.display = (step.isComplete || step.action) ? 'none' : 'flex';

        this.highlightElement(step.target);
    },

    advanceStep() {
        this.currentStepIndex++;
        this.showStep();
    },

    // This function will be called by the game's main tick
    checkCompletion() {
        if (!this.isActive) return;
        const step = this.steps[this.currentStepIndex];
        // If the step has a completion condition and it's met, advance.
        if (step && typeof step.isComplete === 'function' && step.isComplete()) {
            this.advanceStep();
        }
    },

    clearHighlights() {
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
    },

    highlightElement(selector) {
        this.clearHighlights();
        if (selector) {
            // Use a timeout to ensure the element is rendered before highlighting
            setTimeout(() => {
                const targetElement = document.querySelector(selector);
                if (targetElement) {
                    targetElement.classList.add('tutorial-highlight');
                } else {
                    console.warn(`Tutorial trying to highlight an element that was not found: ${selector}`);
                }
            }, 50);
        }
    }
};
