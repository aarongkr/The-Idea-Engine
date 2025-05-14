// js/config/generatorsData.js
const GENERATORS_DATA = {
    thought_intensifier: {
        id: 'thought_intensifier',
        name: 'Thought Intensifier',
        description: 'Enhances the potency of each manually sparked Fleeting Thought.',
        baseCost: { fleeting_thought: 50 },
        costScale: 1.25,
        output: { ft_per_click_bonus: 0.2 },
        outputScale: 1.5,
        maxLevel: 100,
        icon: '💡',
        type: 'click_upgrade', // NO UNLOCKS_WITH - available from start
        unlocksWith: ['mind_palace_1']
    },
    cognitive_flow_enhancer: {
        id: 'cognitive_flow_enhancer',
        name: 'Cognitive Flow Enhancer',
        description: 'Improves overall mental efficiency, passively boosting all FT generation.',
        baseCost: { fleeting_thought: 200 },
        costScale: 1.4,
        output: { global_ft_per_sec_multiplier_bonus: 0.01 },
        outputScale: 1.0,
        maxLevel: 50,
        icon: '🌊',
        type: 'passive_ft_upgrade',
        unlocksWith: ['mind_palace_1'] // Keep this, makes sense to build mind palace first
    },
    mind_palace: {
        id: 'mind_palace',
        name: 'Mind Palace Construction',
        description: 'Establishes a mental space to passively nurture and generate Fleeting Thoughts.',
        baseCost: { fleeting_thought: 20 },
        costScale: 1.15,
        output: { fleeting_thought: 0.1 },
        outputScale: 1.1,
        maxLevel: 200,
        icon: '🧠',
        type: 'ft_generator' // Available from start
    },
    logical_filter: {
        id: 'logical_filter',
        name: 'Logical Filter Priming',
        description: 'A basic cognitive tool to sift through raw thoughts, occasionally yielding Base Concepts.',
        baseCost: { fleeting_thought: 100 },
        costScale: 1.2,
        output: { concept_duality: 0.005, concept_pattern: 0.004 },
        outputScale: 1.08,
        maxLevel: 100,
        unlocksWith: ['mind_palace_5'], // Requires Mind Palace Lvl 5
        icon: '⚙️',
        type: 'concept_generator'
    },
    conceptual_distillery: {
        id: 'conceptual_distillery',
        name: 'Conceptual Distillery',
        description: 'Refines FT into specific Base Concepts more efficiently.',
        baseCost: { fleeting_thought: 500, insight_structure: 1 },
        costScale: 1.25,
        output: { concept_matter: 0.01, concept_energy: 0.01 },
        outputScale: 1.1,
        maxLevel: 50,
        unlocksWith: ['insight_structure'], // Requires discovering Insight: Structure
        icon: '⚗️',
        type: 'concept_generator'
    }
};