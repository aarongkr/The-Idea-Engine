// js/config/ideasData.js
const IDEAS_DATA = {
    // Tier 0: Base Currency
    fleeting_thought: {
        id: 'fleeting_thought', name: 'Fleeting Thought', tier: 0, color: '#cccccc', shape: 'dot',
        description: 'A raw, unrefined spark of potential.'
    },

    // Tier 1: Base Concepts
    concept_duality: { id: 'concept_duality', name: 'Concept: Duality', tier: 1, group: 'concept', color: { background: '#29b6f6', border: '#01579b' }, shape: 'ellipse', description: 'The notion of two contrasting aspects.', attributes: { ft_bonus_per_sec: 0.01 } },
    concept_pattern: { id: 'concept_pattern', name: 'Concept: Pattern', tier: 1, group: 'concept', color: { background: '#66bb6a', border: '#2e7d32' }, shape: 'ellipse', description: 'A discernible regularity or sequence.', attributes: { ft_bonus_per_sec: 0.01 } },
    concept_matter: { id: 'concept_matter', name: 'Concept: Matter', tier: 1, group: 'concept', color: { background: '#ffa726', border: '#ef6c00' }, shape: 'ellipse', description: 'The physical substance of the universe.', attributes: { ft_bonus_per_sec: 0.015 } },
    concept_energy: { id: 'concept_energy', name: 'Concept: Energy', tier: 1, group: 'concept', color: { background: '#ef5350', border: '#c62828' }, shape: 'ellipse', description: 'The capacity to perform work or produce heat.', attributes: { ft_bonus_per_sec: 0.015 } },

    // Tier 2: Insights
    insight_structure: { id: 'insight_structure', name: 'Insight: Structure', tier: 2, group: 'insight', color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond', description: 'Understanding how elements are arranged and organized.', recipe: ['concept_duality', 'concept_pattern'], attributes: { ft_bonus_per_sec: 0.1 } },
    insight_substance: { id: 'insight_substance', name: 'Insight: Substance', tier: 2, group: 'insight', color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond', description: 'A fundamental understanding of physical existence.', recipe: ['concept_matter', 'concept_energy'], attributes: { ft_bonus_per_sec: 0.12 } },
    insight_causality: { id: 'insight_causality', name: 'Insight: Causality', tier: 2, group: 'insight', color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond', description: 'The relationship between cause and effect.', recipe: ['concept_pattern', 'concept_energy'], attributes: { ft_bonus_per_sec: 0.11 } },
    insight_form: { id: 'insight_form', name: 'Insight: Form', tier: 2, group: 'insight', color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond', description: 'The understanding that matter takes on distinct forms.', recipe: ['concept_duality', 'concept_matter'], attributes: { ft_bonus_per_sec: 0.09 } },
    insight_potential: { id: 'insight_potential', name: 'Insight: Potential', tier: 2, group: 'insight', color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond', description: 'The recognition that energy exists in states of potential and kinetic expression.', recipe: ['concept_duality', 'concept_energy'], attributes: { ft_bonus_per_sec: 0.1 } },
    insight_mechanism: { id: 'insight_mechanism', name: 'Insight: Mechanism', tier: 2, group: 'insight', color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond', description: 'The realization that patterns in matter give rise to functional systems.', recipe: ['concept_pattern', 'concept_matter'], attributes: { ft_bonus_per_sec: 0.11 } },

    // Tier 3: Theories
    theory_framework: { id: 'theory_framework', name: 'Theory: Framework', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Foundational ideas for complex systems.', recipe: ['insight_structure', 'insight_causality'], attributes: { ft_bonus_per_sec: 0.5 } },
    theory_architecture: { id: 'theory_architecture', name: 'Theory: Architecture', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Designing coherent forms within structures.', recipe: ['insight_structure', 'insight_form'], attributes: { ft_bonus_per_sec: 0.51 } },
    theory_metaphysics: { id: 'theory_metaphysics', name: 'Theory: Metaphysics', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Exploring reality, potential, and existence.', recipe: ['insight_structure', 'insight_potential'], attributes: { ft_bonus_per_sec: 0.52 } },
    theory_cybernetics: { id: 'theory_cybernetics', name: 'Theory: Cybernetics', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Control and communication in complex systems.', recipe: ['insight_structure', 'insight_mechanism'], attributes: { ft_bonus_per_sec: 0.55 } },
    theory_cosmology: { id: 'theory_cosmology', name: 'Theory: Cosmology', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Origin and evolution of the universe.', recipe: ['insight_structure', 'insight_substance'], attributes: { ft_bonus_per_sec: 0.6 } },
    theory_ontology: { id: 'theory_ontology', name: 'Theory: Ontology', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'The study of being and existence.', recipe: ['insight_substance', 'insight_form'], attributes: { ft_bonus_per_sec: 0.58 } },
    theory_thermodynamics: { id: 'theory_thermodynamics', name: 'Theory: Thermodynamics', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Heat and energy relationships in substance.', recipe: ['insight_substance', 'insight_potential'], attributes: { ft_bonus_per_sec: 0.62 } },
    theory_engineering: { id: 'theory_engineering', name: 'Theory: Engineering', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Applying principles to design mechanisms.', recipe: ['insight_substance', 'insight_mechanism'], attributes: { ft_bonus_per_sec: 0.65 } },
    theory_physics: { id: 'theory_physics', name: 'Theory: Physics', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Study of matter, energy, and interactions.', recipe: ['insight_substance', 'insight_causality'], attributes: { ft_bonus_per_sec: 0.68 } },
    theory_aesthetics: { id: 'theory_aesthetics', name: 'Theory: Aesthetics', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Principles of beauty and its causal impact.', recipe: ['insight_causality', 'insight_form'], attributes: { ft_bonus_per_sec: 0.53 } },
    theory_information: { id: 'theory_information', name: 'Theory: Information', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Information as patterns of potential.', recipe: ['insight_causality', 'insight_potential'], attributes: { ft_bonus_per_sec: 0.56 } },
    theory_logic: { id: 'theory_logic', name: 'Theory: Logic', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Principles of valid reasoning from mechanisms.', recipe: ['insight_causality', 'insight_mechanism'], attributes: { ft_bonus_per_sec: 0.59 } },
    theory_morphology: { id: 'theory_morphology', name: 'Theory: Morphology', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'Study of form, structure, and potential.', recipe: ['insight_form', 'insight_potential'], attributes: { ft_bonus_per_sec: 0.54 } },
    theory_system_dynamics: { id: 'theory_system_dynamics', name: 'Theory: System Dynamics', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'How interconnected forms and mechanisms evolve.', recipe: ['insight_form', 'insight_mechanism'], attributes: { ft_bonus_per_sec: 0.57 } },
    theory_computation: { id: 'theory_computation', name: 'Theory: Computation', tier: 3, group: 'theory', color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star', description: 'What can be automated via potential of mechanisms.', recipe: ['insight_potential', 'insight_mechanism'], attributes: { ft_bonus_per_sec: 0.61 } },

    // Tier 4: Paradigms (105 unique combinations of 15 theories)
    // Generic Paradigm Color and Shape
    _paradigm_style: { color: { background: '#FFD700', border: '#B8860B' }, shape: 'hexagon' }, // Gold Hexagon
    _paradigm_ft_bonus: 2.5, // Base FT bonus for paradigms, can be overridden

    // Programmatically generated paradigms will be inserted here by the loop below
    // For brevity, I will not list all 105 manually.
    // The loop at the end of this file will populate them.
    // Example of ONE manually defined for structure (the programmatic one would override if names clash):
    /*
    paradigm_structural_design: {
        id: 'paradigm_structural_design', name: 'Paradigm: Structural Design', tier: 4, group: 'paradigm',
        color: { background: '#FFD700', border: '#B8860B' }, shape: 'hexagon',
        description: 'A paradigm uniting foundational frameworks with architectural principles.',
        recipe: ['theory_framework', 'theory_architecture'],
        attributes: { ft_bonus_per_sec: 2.0 }
    },
    */
};

// --- Utility to ensure consistent naming and data for programmatically generated ideas ---
function generateParadigmName(theory1Name, theory2Name) {
    // Remove "Theory: " prefix
    const t1 = theory1Name.replace('Theory: ', '');
    const t2 = theory2Name.replace('Theory: ', '');
    // Create a somewhat descriptive name, ensuring alphabetical order for consistency
    const parts = [t1, t2].sort();
    return `Paradigm: ${parts[0]}-${parts[1]} Synthesis`; // Example: Paradigm: Architecture-Computation Synthesis
}

// --- Programmatically generate Paradigms from all unique pairs of Theories ---
const theoryKeys = Object.keys(IDEAS_DATA).filter(key => IDEAS_DATA[key].tier === 3);
for (let i = 0; i < theoryKeys.length; i++) {
    for (let j = i + 1; j < theoryKeys.length; j++) {
        const theory1_id = theoryKeys[i];
        const theory2_id = theoryKeys[j];
        const theory1_data = IDEAS_DATA[theory1_id];
        const theory2_data = IDEAS_DATA[theory2_id];

        // Create a unique ID for the paradigm based on sorted theory IDs to avoid duplicates like A+B and B+A
        const sortedTheoryIds = [theory1_id, theory2_id].sort();
        const paradigmId = `paradigm_gen_${sortedTheoryIds[0].replace('theory_', '')}_${sortedTheoryIds[1].replace('theory_', '')}`;
        const paradigmName = generateParadigmName(theory1_data.name, theory2_data.name);

        if (!IDEAS_DATA[paradigmId]) { // Avoid overwriting if manually defined with same ID pattern
            IDEAS_DATA[paradigmId] = {
                id: paradigmId,
                name: paradigmName,
                tier: 4,
                group: 'paradigm',
                ...IDEAS_DATA._paradigm_style, // Use default style
                description: `A grand unification of ${theory1_data.name} and ${theory2_data.name}, leading to new fundamental understanding.`,
                recipe: [theory1_id, theory2_id],
                attributes: { ft_bonus_per_sec: IDEAS_DATA._paradigm_ft_bonus + ( (i + j) * 0.05 ) } // Slightly vary FT bonus
            };
        }
    }
}
// Remove helper properties after generation
delete IDEAS_DATA._paradigm_style;
delete IDEAS_DATA._paradigm_ft_bonus;


// --- Final pass to ensure all ideas have an ID and an attributes object ---
Object.keys(IDEAS_DATA).forEach(key => {
    if (!IDEAS_DATA[key].id) {
        IDEAS_DATA[key].id = key;
    }
    if (!IDEAS_DATA[key].attributes) {
        IDEAS_DATA[key].attributes = {};
    }
});