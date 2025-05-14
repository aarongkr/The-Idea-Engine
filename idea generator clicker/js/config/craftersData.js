// js/config/craftersData.js
const CRAFTERS_DATA = {
    // --- Insight Crafters (6 total) ---
    insight_structure_crafter: { id: 'insight_structure_crafter', name: 'Structural Synthesizer', description: 'Automates Insight: Structure.', targetIdeaId: 'insight_structure', baseCost: { fleeting_thought: 10000, concept_duality: 5, concept_pattern: 5 }, costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50, unlocksWith: ['insight_structure'] },
    insight_substance_crafter: { id: 'insight_substance_crafter', name: 'Substantial Assembler', description: 'Automates Insight: Substance.', targetIdeaId: 'insight_substance', baseCost: { fleeting_thought: 12000, concept_matter: 5, concept_energy: 5 }, costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50, unlocksWith: ['insight_substance'] },
    insight_causality_crafter: { id: 'insight_causality_crafter', name: 'Causal Engine', description: 'Automates Insight: Causality.', targetIdeaId: 'insight_causality', baseCost:{fleeting_thought:11000,concept_pattern:5,concept_energy:5}, costScale:1.5, outputAmount:0.01, outputScale:1.1, maxLevel:50, unlocksWith: ['insight_causality']},
    insight_form_crafter: { id: 'insight_form_crafter', name: 'Form Modulator', description: 'Automates Insight: Form.', targetIdeaId: 'insight_form', baseCost:{fleeting_thought:9000,concept_duality:5,concept_matter:5}, costScale:1.5, outputAmount:0.01, outputScale:1.1, maxLevel:50, unlocksWith: ['insight_form']},
    insight_potential_crafter: { id: 'insight_potential_crafter', name: 'Potential Harmonizer', description: 'Automates Insight: Potential.', targetIdeaId: 'insight_potential', baseCost:{fleeting_thought:10000,concept_duality:5,concept_energy:5}, costScale:1.5, outputAmount:0.01, outputScale:1.1, maxLevel:50, unlocksWith: ['insight_potential']},
    insight_mechanism_crafter: { id: 'insight_mechanism_crafter', name: 'Mechanistic Weaver', description: 'Automates Insight: Mechanism.', targetIdeaId: 'insight_mechanism', baseCost:{fleeting_thought:11000,concept_pattern:5,concept_matter:5}, costScale:1.5, outputAmount:0.01, outputScale:1.1, maxLevel:50, unlocksWith: ['insight_mechanism']},

    // --- Theory Crafters (15 total) ---
    theory_framework_crafter: { id: 'theory_framework_crafter', name: 'Framework Prover', targetIdeaId: 'theory_framework', baseCost: { fleeting_thought: 100000, insight_structure: 2, insight_causality: 2 }, costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_framework'], description: "Automates Theory: Framework." },
    theory_architecture_crafter: { id: 'theory_architecture_crafter', name: 'Architectural Engine', targetIdeaId: 'theory_architecture', baseCost: { fleeting_thought: 110000, insight_structure: 2, insight_form: 2 }, costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_architecture'], description: "Automates Theory: Architecture." },
    theory_metaphysics_crafter: { id: 'theory_metaphysics_crafter', name: 'Metaphysical Conduit', targetIdeaId: 'theory_metaphysics', baseCost: { fleeting_thought: 120000, insight_structure: 2, insight_potential: 2 }, costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_metaphysics'], description: "Automates Theory: Metaphysics." },
    theory_cybernetics_crafter: { id: 'theory_cybernetics_crafter', name: 'Cybernetic Core', targetIdeaId: 'theory_cybernetics', baseCost: { fleeting_thought: 130000, insight_structure: 2, insight_mechanism: 2 }, costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_cybernetics'], description: "Automates Theory: Cybernetics." },
    theory_cosmology_crafter: { id: 'theory_cosmology_crafter', name: 'Cosmic Modeler', targetIdeaId: 'theory_cosmology', baseCost: { fleeting_thought: 150000, insight_structure: 2, insight_substance: 2 }, costScale: 1.8, outputAmount: 0.004, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_cosmology'], description: "Automates Theory: Cosmology." },
    theory_ontology_crafter: { id: 'theory_ontology_crafter', name: 'Ontological Forge', targetIdeaId: 'theory_ontology', baseCost: { fleeting_thought: 140000, insight_substance: 2, insight_form: 2 }, costScale: 1.8, outputAmount: 0.0045, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_ontology'], description: "Automates Theory: Ontology." },
    theory_thermodynamics_crafter: { id: 'theory_thermodynamics_crafter', name: 'Thermo Calibrator', targetIdeaId: 'theory_thermodynamics', baseCost: { fleeting_thought: 160000, insight_substance: 2, insight_potential: 2 }, costScale: 1.8, outputAmount: 0.004, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_thermodynamics'], description: "Automates Theory: Thermodynamics." },
    theory_engineering_crafter: { id: 'theory_engineering_crafter', name: 'Engineering Blueprint', targetIdeaId: 'theory_engineering', baseCost: { fleeting_thought: 170000, insight_substance: 2, insight_mechanism: 2 }, costScale: 1.8, outputAmount: 0.0035, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_engineering'], description: "Automates Theory: Engineering." },
    theory_physics_crafter: { id: 'theory_physics_crafter', name: 'Physics Synthesizer', targetIdeaId: 'theory_physics', baseCost: { fleeting_thought: 180000, insight_substance: 2, insight_causality: 2 }, costScale: 1.8, outputAmount: 0.003, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_physics'], description: "Automates Theory: Physics." },
    theory_aesthetics_crafter: { id: 'theory_aesthetics_crafter', name: 'Aesthetic Generator', targetIdeaId: 'theory_aesthetics', baseCost: { fleeting_thought: 125000, insight_causality: 2, insight_form: 2 }, costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_aesthetics'], description: "Automates Theory: Aesthetics." },
    theory_information_crafter: { id: 'theory_information_crafter', name: 'Information Matrix', targetIdeaId: 'theory_information', baseCost: { fleeting_thought: 135000, insight_causality: 2, insight_potential: 2 }, costScale: 1.8, outputAmount: 0.0048, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_information'], description: "Automates Theory: Information." },
    theory_logic_crafter: { id: 'theory_logic_crafter', name: 'Logical Construct', targetIdeaId: 'theory_logic', baseCost: { fleeting_thought: 145000, insight_causality: 2, insight_mechanism: 2 }, costScale: 1.8, outputAmount: 0.0046, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_logic'], description: "Automates Theory: Logic." },
    theory_morphology_crafter: { id: 'theory_morphology_crafter', name: 'Morphological Shaper', targetIdeaId: 'theory_morphology', baseCost: { fleeting_thought: 130000, insight_form: 2, insight_potential: 2 }, costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_morphology'], description: "Automates Theory: Morphology." },
    theory_system_dynamics_crafter: { id: 'theory_system_dynamics_crafter', name: 'System Dynamics Engine', targetIdeaId: 'theory_system_dynamics', baseCost: { fleeting_thought: 140000, insight_form: 2, insight_mechanism: 2 }, costScale: 1.8, outputAmount: 0.0047, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_system_dynamics'], description: "Automates Theory: System Dynamics." },
    theory_computation_crafter: { id: 'theory_computation_crafter', name: 'Computational Nexus', targetIdeaId: 'theory_computation', baseCost: { fleeting_thought: 155000, insight_potential: 2, insight_mechanism: 2 }, costScale: 1.8, outputAmount: 0.0042, outputScale: 1.1, maxLevel: 30, unlocksWith: ['theory_computation'], description: "Automates Theory: Computation." },

    // --- Paradigm Crafters (Generated Below) ---
};

// Programmatically generate paradigm crafters
// This requires IDEAS_DATA to be fully defined before this script runs,
// which it should be if script order in index.html is correct.
if (typeof IDEAS_DATA !== 'undefined') {
    const theoryKeysForCrafters = Object.keys(IDEAS_DATA).filter(key => IDEAS_DATA[key].tier === 3);

    for (let i = 0; i < theoryKeysForCrafters.length; i++) {
        for (let j = i + 1; j < theoryKeysForCrafters.length; j++) {
            const theory1_id_crafter = theoryKeysForCrafters[i];
            const theory2_id_crafter = theoryKeysForCrafters[j];

            let paradigmIdForCrafter = null;
            let paradigmDataForCrafter = null;

            for (const pId_crafter in IDEAS_DATA) {
                const pData_crafter = IDEAS_DATA[pId_crafter];
                if (pData_crafter.tier === 4 && pData_crafter.recipe &&
                    ((pData_crafter.recipe[0] === theory1_id_crafter && pData_crafter.recipe[1] === theory2_id_crafter) ||
                     (pData_crafter.recipe[0] === theory2_id_crafter && pData_crafter.recipe[1] === theory1_id_crafter))) {
                    paradigmIdForCrafter = pId_crafter;
                    paradigmDataForCrafter = pData_crafter;
                    break;
                }
            }

            if (paradigmIdForCrafter && paradigmDataForCrafter) {
                const crafterIdGen = `${paradigmIdForCrafter}_crafter`;
                if (!CRAFTERS_DATA[crafterIdGen]) {
                    CRAFTERS_DATA[crafterIdGen] = {
                        id: crafterIdGen,
                        name: `${paradigmDataForCrafter.name.replace('Paradigm: ', '')} Crucible`, // Generic name
                        description: `Automates the grand synthesis of ${paradigmDataForCrafter.name}.`,
                        targetIdeaId: paradigmIdForCrafter,
                        baseCost: {
                            fleeting_thought: 5000000 + ((i + j) * 250000), // Scaled FT cost
                            [theory1_id_crafter]: 3 + Math.floor((i+j)/5),      // Scale theory cost slightly
                            [theory2_id_crafter]: 3 + Math.floor((i+j)/5)
                        },
                        costScale: 2.2 + ( (i+j) * 0.02), // Slightly increasing cost scale
                        outputAmount: 0.0002 - ( (i+j) * 0.000005), // Slightly decreasing base output
                        outputScale: 1.05,
                        maxLevel: 10 + Math.floor((theoryKeysForCrafters.length - (i+j))/5), // Vary max level slightly
                        unlocksWith: [paradigmIdForCrafter],
                        type: 'paradigm' // For UI filtering if needed
                    };
                }
            } else {
                // This warning might appear if IDEAS_DATA paradigm generation logic changes and this loop isn't updated.
                // console.warn(`Crafter Gen: Could not find paradigm for theories: ${theory1_id_crafter} and ${theory2_id_crafter}`);
            }
        }
    }
} else {
    console.error("CRAFTERS_DATA: IDEAS_DATA is not defined. Paradigm crafters cannot be generated.");
}