// js/tutorial.js

/**
 * Manages the interactive tutorial for new players.
 *
 * DESIGN PRINCIPLE — the tutorial is a guide, not a gate.
 * Any step where the player would have to sit and wait for something
 * to happen uses hiddenUntilComplete, which works in two phases:
 *
 *   Phase 1 — "READ"    : overlay is visible, player reads the tip,
 *                         clicks 'Got it' to dismiss it.
 *   Phase 2 — "WAITING" : overlay is hidden, player plays freely.
 *   Completion           : isComplete() fires → overlay reappears,
 *                          tutorial advances automatically.
 *
 * Steps that require an instant player action (clicking a button or
 * tab) keep the overlay visible because they resolve in one click.
 *
 * The tutorial box is always positioned away from the highlighted
 * element by _positionBox(), which picks the screen direction with
 * the most free space.
 */
const Tutorial = {
    steps: [

        // -------------------------------------------------------------------
        // Step 0 — Introduce sparking
        // Locks: briefly — player just needs to click a few times. Fine.
        // -------------------------------------------------------------------
        {
            text: "Welcome to The Idea Engine! Your journey begins with a single spark. Click 'Spark Thought' until you have 20 Thoughts.",
            target: '#spark-button',
            isComplete: () => gameState.resources.thought >= 20,
            before: () => {}
        },

        // -------------------------------------------------------------------
        // Step 1 — Navigate to Base Refinement
        // Locks: one click — resolves immediately.
        // -------------------------------------------------------------------
        {
            text: "Excellent! Thoughts are the raw material for everything. Now let's put them to work — click the 'Base Refinement' tab.",
            target: '.nav-button[data-panel="refinement-panel"]',
            action: (e) => e.target.closest('.nav-button')?.dataset.panel === 'refinement-panel',
            before: () => {}
        },

        // -------------------------------------------------------------------
        // Step 2 — Build first Mind Palace
        // Locks: one click — player already has 20 thoughts, cost is 20.
        // -------------------------------------------------------------------
        {
            text: "This is where you build passive generators. You have enough Thoughts to build your first 'Mind Palace' — it generates Thoughts automatically. Click its 'Build' button.",
            target: '#generators-list .upgrade-card:first-child .buy-generator',
            isComplete: () => (gameState.generators.mind_palace?.level || 0) > 0,
            before: () => {
                if (typeof UI !== 'undefined') {
                    UI.switchPanel('refinement-panel', document.querySelector('.nav-button[data-panel="refinement-panel"]'));
                    UI.renderGenerators();
                }
            }
        },

        // -------------------------------------------------------------------
        // Step 3 — Reach 5 Mind Palaces  [hiddenUntilComplete]
        // Locks: player needs to earn ~300 more Thoughts. Hidden so they can
        //        keep clicking and building without the overlay in the way.
        // -------------------------------------------------------------------
        {
            text: "Your Mind Palace is generating Thoughts passively — great work! Keep building them up until you have 5. The tutorial will quietly step aside and return once you get there.",
            target: '#generators-list .upgrade-card:first-child .buy-generator',
            hiddenUntilComplete: true,
            isComplete: () => (gameState.generators.mind_palace?.level || 0) >= 5,
            before: () => {
                if (typeof UI !== 'undefined') {
                    UI.switchPanel('refinement-panel', document.querySelector('.nav-button[data-panel="refinement-panel"]'));
                    UI.renderGenerators();
                }
            }
        },

        // -------------------------------------------------------------------
        // Step 4 — Wait until player has 100 Thoughts  [hiddenUntilComplete]
        // Locks: player needs to save up 100 Thoughts before they can buy
        //        the Conceptual Filter. Hidden so they can click/wait freely.
        // -------------------------------------------------------------------
        {
            text: "Five Mind Palaces — solid work! The next step is to build a 'Conceptual Filter' (costs 100 Thoughts). It will distil raw Thoughts into your first Concepts. The tutorial will return once you have enough.",
            target: '#generators-list',
            hiddenUntilComplete: true,
            isComplete: () => gameState.resources.thought >= 100,
            before: () => {
                if (typeof UI !== 'undefined') {
                    UI.switchPanel('refinement-panel', document.querySelector('.nav-button[data-panel="refinement-panel"]'));
                    UI.renderGenerators();
                }
            }
        },

        // -------------------------------------------------------------------
        // Step 5 — Buy the Conceptual Filter
        // Locks: one click — player now has the Thoughts required.
        // -------------------------------------------------------------------
        {
            text: "You have enough Thoughts! Build the 'Conceptual Filter' now — it will begin distilling raw Thoughts into Matter and Energy Concepts.",
            target: '#generators-list',
            isComplete: () => (gameState.generators.logical_filter?.level || 0) > 0,
            before: () => {
                if (typeof UI !== 'undefined') {
                    UI.switchPanel('refinement-panel', document.querySelector('.nav-button[data-panel="refinement-panel"]'));
                    UI.renderGenerators();
                }
            }
        },

        // -------------------------------------------------------------------
        // Step 6 — Wait for first Concept  [hiddenUntilComplete]
        // Locks: takes ~200 s on average for the first concept to drop.
        //        Hidden — player can keep sparking, buying more Mind Palaces,
        //        or just explore the UI while they wait.
        // -------------------------------------------------------------------
        {
            text: "The Conceptual Filter is now running. It takes a little while to produce your first Concept — feel free to keep clicking and exploring. The tutorial will return the moment one arrives.",
            target: null,
            hiddenUntilComplete: true,
            isComplete: () => Array.from(gameState.discoveredIdeas).some(id => IDEAS_DATA[id]?.tier === 1),
            before: () => {}
        },

        // -------------------------------------------------------------------
        // Step 7 — Navigate to Concepts panel
        // Locks: one click — resolves immediately.
        // -------------------------------------------------------------------
        {
            text: "Your first Concept has been discovered! Click the 'Concepts' tab to inspect it — each one passively boosts your Thoughts/sec.",
            target: '.nav-button[data-panel="concepts-panel"]',
            action: (e) => e.target.closest('.nav-button')?.dataset.panel === 'concepts-panel',
            before: () => {}
        },

        // -------------------------------------------------------------------
        // Step 8 — Wait for a second Concept  [hiddenUntilComplete]
        // Locks: another ~200 s wait on average. Hidden so the player can
        //        keep building generators and sparking in the background.
        // -------------------------------------------------------------------
        {
            text: "To Synthesise your first Insight you'll need two different Concepts. Keep the Conceptual Filter running — and keep sparking to speed things up. The tutorial will return once a second Concept appears.",
            target: null,
            hiddenUntilComplete: true,
            isComplete: () => Array.from(gameState.discoveredIdeas).filter(id => IDEAS_DATA[id]?.tier === 1).length >= 2,
            before: () => {
                if (typeof UI !== 'undefined') {
                    UI.switchPanel('concepts-panel', document.querySelector('.nav-button[data-panel="concepts-panel"]'));
                }
            }
        },

        // -------------------------------------------------------------------
        // Step 9 — Navigate to Synthesis Forge
        // Locks: one click — resolves immediately.
        // -------------------------------------------------------------------
        {
            text: "Two Concepts — now the real fun begins. Click the 'Synthesis Forge' tab. This is where you combine ideas to produce entirely new, higher-tier ones.",
            target: '.nav-button[data-panel="synthesis-panel"]',
            action: (e) => e.target.closest('.nav-button')?.dataset.panel === 'synthesis-panel',
            before: () => {}
        },

        // -------------------------------------------------------------------
        // Step 10 — Perform first synthesis
        // Locks: player has everything they need — one click to synthesise.
        // -------------------------------------------------------------------
        {
            text: "Select one Concept in each forge slot, then click 'Synthesise'. Combining Matter + Energy produces 'Insight: Thermodynamics', but any two Concepts will produce an Insight. Give it a try!",
            target: '#forge-interface',
            isComplete: () => Array.from(gameState.discoveredIdeas).some(id => IDEAS_DATA[id]?.tier === 2),
            before: () => {
                if (typeof UI !== 'undefined') {
                    UI.switchPanel('synthesis-panel', document.querySelector('.nav-button[data-panel="synthesis-panel"]'));
                    UI.populateForgeSelectors();
                }
            }
        },

        // -------------------------------------------------------------------
        // Step 11 — Point at the Knowsphere
        // Locks: one click — resolves immediately.
        // -------------------------------------------------------------------
        {
            text: "Finally, take a look at the 'Knowsphere' tab. Every Idea you discover appears as a node in this graph, connected to the Concepts that produced it. As you synthesise higher-tier Ideas — Insights → Theories → Paradigms — the graph will grow into a map of your entire intellectual universe.",
            target: '.nav-button[data-panel="noosphere-panel"]',
            hiddenUntilComplete: true,
            action: (e) => e.target.closest('.nav-button')?.dataset.panel === 'noosphere-panel',
            before: () => {}
        },

        // -------------------------------------------------------------------
        // Step 12 — Final sign-off
        // -------------------------------------------------------------------
        {
            text: "You know everything you need to begin. Keep generating Thoughts, distilling Concepts, and synthesising ever-higher Ideas until you're ready to Transcend and spend your Wisdom Shards on permanent upgrades. Good luck, and enjoy the journey!",
            target: null,
            isComplete: () => false,   // Only the 'End Tutorial' button advances this
            before: () => {}
        }
    ],

    currentStepIndex: 0,
    isActive: false,

    // true while a hiddenUntilComplete step is in Phase 2 (overlay hidden, polling)
    _waitingHidden: false,

    elements: {
        overlay: null, box: null, text: null,
        nextButton: null, skipButton: null
    },

    // =========================================================================
    init() {
        this.elements.overlay    = document.getElementById('tutorial-overlay');
        this.elements.box        = document.getElementById('tutorial-box');
        this.elements.text       = document.getElementById('tutorial-text');
        this.elements.nextButton = document.getElementById('tutorial-next-button');
        this.elements.skipButton = document.getElementById('skip-tutorial-button');

        if (!this.elements.overlay) { console.error("Tutorial UI not found in HTML!"); return; }

        this.elements.nextButton.addEventListener('click', () => this._onNextClick());
        this.elements.skipButton.addEventListener('click', () => this.end());

        // Delegated listener for action-based steps (capture phase so it fires
        // before the nav panel switch handler)
        document.body.addEventListener('click', (e) => {
            if (!this.isActive || this._waitingHidden) return;
            const step = this.steps[this.currentStepIndex];
            if (step && typeof step.action === 'function' && step.action(e)) {
                this.advanceStep();
            }
        }, true);
    },

    // =========================================================================
    start() {
        if (gameState.tutorialCompleted) return;
        this.isActive         = true;
        this._waitingHidden   = false;
        this.currentStepIndex = 0;
        this.elements.overlay.classList.remove('hidden');
        this.showStep();
    },

    // =========================================================================
    end() {
        this.isActive       = false;
        this._waitingHidden = false;
        this.elements.overlay.classList.add('hidden');
        this.clearHighlights();
        this._positionBox(null);
        gameState.tutorialCompleted = true;
        saveGame();
        if (typeof UI !== 'undefined') UI.updateAllUI();
    },

    // =========================================================================
    // Handles the Next / Got it / End Tutorial button.
    // For a hiddenUntilComplete step still in Phase 1, clicking 'Got it'
    // enters Phase 2 (hides overlay) rather than advancing.
    // =========================================================================
    _onNextClick() {
        const step = this.steps[this.currentStepIndex];
        if (step?.hiddenUntilComplete && !this._waitingHidden) {
            // Phase 1 → Phase 2: dismiss the overlay and poll silently
            this._waitingHidden = true;
            this.elements.overlay.classList.add('hidden');
            this.clearHighlights();
        } else {
            this.advanceStep();
        }
    },

    // =========================================================================
    showStep() {
        if (!this.isActive || this.currentStepIndex >= this.steps.length) {
            this.end();
            return;
        }

        const step       = this.steps[this.currentStepIndex];
        const isLastStep = this.currentStepIndex === this.steps.length - 1;

        if (typeof step.before === 'function') step.before();

        // Entering showStep always means Phase 1 or a normal step — reset flag
        this._waitingHidden = false;
        this.elements.overlay.classList.remove('hidden');
        this.elements.text.textContent = step.text;

        if (isLastStep) {
            // Single 'End Tutorial' button, Skip hidden
            this.elements.nextButton.textContent   = 'End Tutorial';
            this.elements.nextButton.style.display = 'flex';
            this.elements.skipButton.style.display = 'none';

        } else if (step.hiddenUntilComplete) {
            // Phase 1: player reads the tip then clicks 'Got it' to dismiss
            this.elements.nextButton.textContent   = 'Got it';
            this.elements.nextButton.style.display = 'flex';
            this.elements.skipButton.style.display = 'flex';

        } else if (step.isComplete || step.action) {
            // Pure condition / action step: no Next, keep Skip
            this.elements.nextButton.style.display = 'none';
            this.elements.skipButton.style.display = 'flex';

        } else {
            // Standard informational step
            this.elements.nextButton.textContent   = 'Next';
            this.elements.nextButton.style.display = 'flex';
            this.elements.skipButton.style.display = 'flex';
        }

        this.highlightElement(step.target);
    },

    // =========================================================================
    advanceStep() {
        this._waitingHidden = false;
        this.currentStepIndex++;
        this.showStep();
    },

    // =========================================================================
    // Called every game tick (via GameLogic.tick).
    // Polls isComplete() for whichever step is current. During Phase 2 of a
    // hiddenUntilComplete step the overlay is hidden while this runs; once the
    // condition is met the overlay is restored and the tutorial advances.
    // =========================================================================
    checkCompletion() {
        if (!this.isActive) return;
        const step = this.steps[this.currentStepIndex];
        if (!step || typeof step.isComplete !== 'function') return;

        if (step.isComplete()) {
            this.elements.overlay.classList.remove('hidden');
            this.advanceStep();
        }
    },

    // =========================================================================
    clearHighlights() {
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
    },

    // =========================================================================
    highlightElement(selector) {
        this.clearHighlights();
        if (selector) {
            // Small delay lets the DOM settle after any panel switch in before()
            setTimeout(() => {
                const targetEl = document.querySelector(selector);
                if (targetEl) {
                    targetEl.classList.add('tutorial-highlight');
                    this._positionBox(targetEl);
                } else {
                    console.warn(`Tutorial: element not found for highlight: ${selector}`);
                    this._positionBox(null);
                }
            }, 60);
        } else {
            this._positionBox(null);
        }
    },

    // =========================================================================
    /**
     * Positions #tutorial-box so it never overlaps the highlighted element.
     *
     * Algorithm:
     *   1. Measure the target's bounding rect.
     *   2. Calculate free space in all four directions.
     *   3. Place the box in the direction with the most room, centred on the
     *      target's perpendicular axis.
     *   4. Clamp within the viewport with a safety margin on all sides.
     *
     * When targetEl is null inline overrides are cleared and the overlay's
     * flexbox centering takes over.
     */
    _positionBox(targetEl) {
        const box    = this.elements.box;
        const MARGIN = 20;

        box.style.position  = '';
        box.style.left      = '';
        box.style.top       = '';
        box.style.transform = '';

        if (!targetEl) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const tr = targetEl.getBoundingClientRect();
        const bw = box.offsetWidth  || 460;
        const bh = box.offsetHeight || 220;

        const spaceBelow = vh - tr.bottom - MARGIN;
        const spaceAbove = tr.top         - MARGIN;
        const spaceRight = vw - tr.right  - MARGIN;
        const spaceLeft  = tr.left        - MARGIN;

        const best = Math.max(spaceBelow, spaceAbove, spaceRight, spaceLeft);

        let left, top;

        if (best === spaceBelow) {
            top  = tr.bottom + MARGIN;
            left = tr.left + tr.width / 2 - bw / 2;
        } else if (best === spaceAbove) {
            top  = tr.top - bh - MARGIN;
            left = tr.left + tr.width / 2 - bw / 2;
        } else if (best === spaceRight) {
            left = tr.right + MARGIN;
            top  = tr.top + tr.height / 2 - bh / 2;
        } else {
            left = tr.left - bw - MARGIN;
            top  = tr.top + tr.height / 2 - bh / 2;
        }

        left = Math.max(MARGIN, Math.min(left, vw - bw - MARGIN));
        top  = Math.max(MARGIN, Math.min(top,  vh - bh - MARGIN));

        box.style.position  = 'fixed';
        box.style.left      = `${Math.round(left)}px`;
        box.style.top       = `${Math.round(top)}px`;
        box.style.transform = 'none';
    }
};