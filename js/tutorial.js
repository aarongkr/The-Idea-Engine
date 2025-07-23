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
            action: (e) => e.target.closest('.nav-button')?.dataset.panel === 'refinement-panel',
            before: () => {}
        },
        {
            text: "This is where you build passive generators. You have enough FT to build your first 'Mind Palace Construction'. Click its 'Build' button.",
            target: '#generators-list .upgrade-card:first-child .buy-generator',
            isComplete: () => gameState.generators.mind_palace?.level > 0,
            before: () => {
                if (typeof UI !== 'undefined') {
                    UI.switchPanel('refinement-panel', document.querySelector('.nav-button[data-panel="refinement-panel"]'));
                    UI.renderGenerators();
                }
            }
        },
        {
            text: "Great! Your Mind Palace will now generate Fleeting Thoughts automatically. You've learned the basics. The rest is up to you to discover. Good luck!",
            target: null,
            isComplete: () => false,
            before: () => {}
        }
    ],

    currentStepIndex: 0,
    isActive: false,

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
        if (!this.elements.overlay) { console.error("Tutorial UI not found!"); return; }
        this.elements.nextButton.addEventListener('click', () => this.advanceStep());
        this.elements.skipButton.addEventListener('click', () => this.end());
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

    start() {
        if (gameState.tutorialCompleted) return;
        this.isActive = true;
        this.currentStepIndex = 0;
        this.elements.overlay.classList.remove('hidden');
        this.showStep();
    },

    end() {
        this.isActive = false;
        this.elements.overlay.classList.add('hidden');
        this.clearHighlights();
        gameState.tutorialCompleted = true;
        saveGame();
        // *** FIX: Trigger a final UI update when the tutorial ends ***
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
        if (typeof step.before === 'function') {
            step.before();
        }
        this.elements.text.textContent = step.text;
        this.elements.nextButton.textContent = (this.currentStepIndex === this.steps.length - 1) ? 'Finish' : 'Next';
        this.highlightElement(step.target);
    },

    advanceStep() {
        this.currentStepIndex++;
        this.showStep();
    },

    checkCompletion() {
        if (!this.isActive) return;
        const step = this.steps[this.currentStepIndex];
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
