// js/config/generatorsData.js

/**
 * Defines the passive generators and permanent upgrades available in Base Refinement.
 *
 * Naming philosophy:
 *   - Each name should evoke what it does and feel at home in a game about
 *     accumulating and refining ideas.
 *   - Thought generators are named after mental disciplines or cognitive practices.
 *   - Click/multiplier upgrades are named after sharpened intentional focus.
 *   - Concept generators are named after the intellectual process of refinement.
 */
const GENERATORS_DATA = {

    /**
     * The first passive generator.
     * Builds a structured mental space that quietly produces Thoughts.
     */
    mind_palace: {
        id: 'mind_palace',
        name: 'Mind Palace',
        description: 'Constructs a vivid internal memory theatre, passively generating a steady stream of Thoughts.',
        baseCost: { thought: 20 },
        costScale: 1.15,
        output: { thought: 0.1 },   // Thought/sec per level
        outputScale: 1.1,
        maxLevel: 200,
        icon: '🏛️'
    },

    /**
     * Increases Thoughts gained per manual spark.
     * Reflects disciplined, deliberate mental effort rather than idle wandering.
     */
    focused_intent: {
        id: 'focused_intent',
        name: 'Focused Intent',
        description: 'Trains deliberate concentration, amplifying the Thoughts produced by each manual spark of insight.',
        baseCost: { thought: 50 },
        costScale: 1.15,
        effect: { thought_per_click: 0.2 },
        outputScale: 1.1,
        maxLevel: 100,
        unlocksWith: ['mind_palace_1'],
        icon: '🎯'
    },

    /**
     * Global thought multiplier — represents systematic rigour applied to all thinking.
     */
    methodical_approach: {
        id: 'methodical_approach',
        name: 'Methodical Approach',
        description: 'Cultivates a systematic habit of thought, granting a +1% global bonus to all Thought generation per level.',
        baseCost: { thought: 1000 },
        costScale: 1.5,
        effect: { global_thought_multiplier_bonus: 0.01 },   // +1% per level
        maxLevel: 50,
        unlocksWith: ['logical_filter_1'],
        icon: '📐'
    },

    /**
     * First concept generator.
     * A basic cognitive filter that occasionally crystallises raw Thoughts into
     * the four base Concepts (Matter, Energy, Information, Time).
     */
    logical_filter: {
        id: 'logical_filter',
        name: 'Conceptual Filter',
        description: 'A rudimentary cognitive sieve that distils raw Thoughts into base Concepts — occasionally yielding Matter and Energy.',
        baseCost: { thought: 100 },
        costScale: 1.2,
        output: {
            concept_matter: 0.005,
            concept_energy: 0.004
        },
        outputScale: 1.08,
        maxLevel: 100,
        unlocksWith: ['mind_palace_5'],
        icon: '⚗️'
    },

    /**
     * Advanced concept generator.
     * A more refined cognitive apparatus that distils the higher-order concepts
     * of Information and Time from structured thought.
     */
    conceptual_distillery: {
        id: 'conceptual_distillery',
        name: 'Conceptual Distillery',
        description: 'Refines dense thought structures into the abstract concepts of Information and Time — a more sophisticated cognitive apparatus.',
        baseCost: { thought: 500, insight_structure: 1 },
        costScale: 1.25,
        output: {
            concept_information: 0.01,
            concept_time: 0.01
        },
        outputScale: 1.1,
        maxLevel: 50,
        unlocksWith: ['insight_structure'],
        icon: '🔬'
    }
};