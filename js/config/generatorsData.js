// js/config/generatorsData.js

/**
 * Defines the "base" generators for the game.
 * These typically produce Fleeting Thoughts, basic Concepts, or provide global bonuses.
 */
const GENERATORS_DATA = {
    /**
     * Generates Fleeting Thoughts passively.
     */
    mind_palace: {
        id: 'mind_palace',
        name: 'Mind Palace Construction',
        description: 'Establishes a mental space to passively nurture and generate Fleeting Thoughts.',
        baseCost: { fleeting_thought: 20 },
        costScale: 1.15,
        output: { fleeting_thought: 0.1 }, // This is FT/sec per level
        outputScale: 1.1,
        maxLevel: 200,
        icon: '🧠'
    },

    /**
     * NEW: Increases the amount of Fleeting Thoughts gained per manual click.
     */
    focused_intent: {
        id: 'focused_intent',
        name: 'Focused Intent',
        description: 'Hones your concentration, increasing the amount of Fleeting Thoughts generated per manual spark.',
        baseCost: { fleeting_thought: 50 }, // Starts a bit more expensive than the first passive generator
        costScale: 1.15, // Same cost scaling as Mind Palace
        // Note: This generator has no 'output' property. Its effect is handled directly in GameLogic.sparkFleetingThought.
        // We will add an 'effect' property for display purposes.
        effect: { ft_per_click: 0.2 }, // Adds 0.2 FT per click, per level
        outputScale: 1.1, // Effect will also scale
        maxLevel: 100,
        unlocksWith: ['mind_palace_1'], // Unlocks after building the first Mind Palace
        icon: '🎯'
    },

    /**
     * NEW: Provides a global percentage increase to all Fleeting Thought production.
     */
    methodical_approach: {
        id: 'methodical_approach',
        name: 'Methodical Approach',
        description: 'Develops a systematic way of thinking, granting a global +1% bonus to all Fleeting Thought generation for each level.',
        baseCost: { fleeting_thought: 1000 }, // Starts quite expensive
        costScale: 1.5, // Significantly higher cost scaling, as requested
        // Note: This generator also has no 'output' property. Its effect is a global multiplier applied in GameLogic.tick.
        effect: { global_ft_multiplier_bonus: 0.01 }, // Represents a +1% bonus per level (0.01)
        // No outputScale needed as the effect is additive (+1% per level)
        maxLevel: 50, // Capped at a powerful +50%
        unlocksWith: ['logical_filter_1'], // Unlocks after building the first Logical Filter, indicating a more advanced stage of thought
        icon: '📈'
    },

    /**
     * Generates basic Tier 1 Concepts.
     */
    logical_filter: {
        id: 'logical_filter',
        name: 'Logical Filter Priming',
        description: 'A basic cognitive tool to slowly sift through raw thoughts, occasionally yielding Base Concepts.',
        baseCost: { fleeting_thought: 100 },
        costScale: 1.2,
        output: {
            concept_duality: 0.005,
            concept_pattern: 0.004
        },
        outputScale: 1.08,
        maxLevel: 100,
        unlocksWith: ['mind_palace_5'],
        icon: '⚙️'
    },

    /**
     * A more advanced generator for Tier 1 Concepts.
     */
    conceptual_distillery: {
        id: 'conceptual_distillery',
        name: 'Conceptual Distillery',
        description: 'Refines Fleeting Thoughts into denser packets of specific Base Concepts more efficiently.',
        baseCost: { fleeting_thought: 500, insight_structure: 1 },
        costScale: 1.25,
        output: {
            concept_matter: 0.01,
            concept_energy: 0.01
        },
        outputScale: 1.1,
        maxLevel: 50,
        unlocksWith: ['insight_structure'],
        icon: '⚗️'
    }
};
