// js/config/generatorsData.js

/**
 * Defines the "base" generators for the game.
 * These typically produce Fleeting Thoughts or the most basic tier of ideas (Concepts).
 * They are distinct from "Auto-Crafters," which consume ideas to produce higher-tier ideas.
 */
const GENERATORS_DATA = {
    /**
     * Generates Fleeting Thoughts passively.
     */
    mind_palace: {
        id: 'mind_palace',
        name: 'Mind Palace Construction',
        description: 'Establishes a mental space to passively nurture and generate Fleeting Thoughts.',
        // Cost to build or upgrade the generator.
        baseCost: { fleeting_thought: 20 },
        // Multiplier for the cost at each subsequent level (cost = baseCost * costScale^level).
        costScale: 1.15,
        // The resource(s) this generator produces per second, per level.
        output: { fleeting_thought: 0.1 },
        // A multiplier for the output at each level.
        outputScale: 1.1,
        // The maximum level this generator can reach.
        maxLevel: 200,
        // A placeholder icon for the UI.
        icon: '🧠'
    },
    /**
     * Consumes Fleeting Thoughts to generate Tier 1 Concepts.
     */
    logical_filter: {
        id: 'logical_filter',
        name: 'Logical Filter Priming',
        description: 'A basic cognitive tool to slowly sift through raw thoughts, occasionally yielding Base Concepts.',
        baseCost: { fleeting_thought: 100 },
        costScale: 1.2,
        // For probabilistic generation, this value represents the chance per second per level to generate one unit.
        output: {
            concept_duality: 0.005,
            concept_pattern: 0.004
        },
        outputScale: 1.08,
        maxLevel: 100,
        // Conditions that must be met for this generator to be visible/purchasable.
        // Format: 'generatorId_level' or 'ideaId'.
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
