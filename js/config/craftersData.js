// js/config/craftersData.js

/**
 * Defines the "Auto-Crafters" for the game.
 * These are special buildings that consume lower-tier ideas to automatically produce
 * higher-tier ideas (Insights, Theories, Paradigms).
 * Each crafter is unlocked upon the first manual discovery of its target idea.
 */
const CRAFTERS_DATA = {
    // --- Insight Crafters (6 total) ---
    insight_structure_crafter: {
        id: 'insight_structure_crafter', name: 'Structural Synthesizer',
        description: 'Automates the combination of Duality and Pattern to produce Insight: Structure.',
        targetIdeaId: 'insight_structure',
        baseCost: { fleeting_thought: 10000, concept_duality: 5, concept_pattern: 5 },
        costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50,
        unlocksWith: ['insight_structure']
    },
    insight_substance_crafter: {
        id: 'insight_substance_crafter', name: 'Substantial Assembler',
        description: 'Automates the creation of Insight: Substance from Matter and Energy.',
        targetIdeaId: 'insight_substance',
        baseCost: { fleeting_thought: 12000, concept_matter: 5, concept_energy: 5 },
        costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50,
        unlocksWith: ['insight_substance']
    },
    insight_causality_crafter: {
        id: 'insight_causality_crafter', name: 'Causal Engine',
        description: 'Automates the synthesis of Insight: Causality from Pattern and Energy.',
        targetIdeaId: 'insight_causality',
        baseCost:{fleeting_thought:11000,concept_pattern:5,concept_energy:5},
        costScale:1.5, outputAmount:0.01, outputScale:1.1, maxLevel:50,
        unlocksWith: ['insight_causality']
    },
    insight_form_crafter: {
        id: 'insight_form_crafter', name: 'Form Modulator',
        description: 'Automates the shaping of Insight: Form from Duality and Matter.',
        targetIdeaId: 'insight_form',
        baseCost:{fleeting_thought:9000,concept_duality:5,concept_matter:5},
        costScale:1.5, outputAmount:0.01, outputScale:1.1, maxLevel:50,
        unlocksWith: ['insight_form']
    },
    insight_potential_crafter: {
        id: 'insight_potential_crafter', name: 'Potential Harmonizer',
        description: 'Automates the realization of Insight: Potential from Duality and Energy.',
        targetIdeaId: 'insight_potential',
        baseCost:{fleeting_thought:10000,concept_duality:5,concept_energy:5},
        costScale:1.5, outputAmount:0.01, outputScale:1.1, maxLevel:50,
        unlocksWith: ['insight_potential']
    },
    insight_mechanism_crafter: {
        id: 'insight_mechanism_crafter', name: 'Mechanistic Weaver',
        description: 'Automates the construction of Insight: Mechanism from Pattern and Matter.',
        targetIdeaId: 'insight_mechanism',
        baseCost:{fleeting_thought:11000,concept_pattern:5,concept_matter:5},
        costScale:1.5, outputAmount:0.01, outputScale:1.1, maxLevel:50,
        unlocksWith: ['insight_mechanism']
    },

    // --- Theory Crafters (15 total) ---
    theory_framework_crafter: {
        id: 'theory_framework_crafter', name: 'Framework Theorem Prover',
        description: 'Automates Theory: Framework from Structure and Causality.',
        targetIdeaId: 'theory_framework',
        baseCost: { fleeting_thought: 100000, insight_structure: 2, insight_causality: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_framework']
    },
    theory_architecture_crafter: {
        id: 'theory_architecture_crafter', name: 'Architectural Blueprint Generator',
        description: 'Automates Theory: Architecture from Structure and Form.',
        targetIdeaId: 'theory_architecture',
        baseCost: { fleeting_thought: 110000, insight_structure: 2, insight_form: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_architecture']
    },
    theory_metaphysics_crafter: {
        id: 'theory_metaphysics_crafter', name: 'Metaphysical Inquiry Engine',
        description: 'Automates Theory: Metaphysics from Structure and Potential.',
        targetIdeaId: 'theory_metaphysics',
        baseCost: { fleeting_thought: 120000, insight_structure: 2, insight_potential: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_metaphysics']
    },
    theory_cybernetics_crafter: {
        id: 'theory_cybernetics_crafter', name: 'Cybernetic Core Constructor',
        description: 'Automates Theory: Cybernetics from Structure and Mechanism.',
        targetIdeaId: 'theory_cybernetics',
        baseCost: { fleeting_thought: 130000, insight_structure: 2, insight_mechanism: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_cybernetics']
    },
    theory_cosmology_crafter: {
        id: 'theory_cosmology_crafter', name: 'Cosmological Modeler',
        description: 'Automates Theory: Cosmology from Structure and Substance.',
        targetIdeaId: 'theory_cosmology',
        baseCost: { fleeting_thought: 150000, insight_structure: 2, insight_substance: 2 },
        costScale: 1.8, outputAmount: 0.004, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_cosmology']
    },
    theory_ontology_crafter: {
        id: 'theory_ontology_crafter', name: 'Ontological Classifier',
        description: 'Automates Theory: Ontology from Substance and Form.',
        targetIdeaId: 'theory_ontology',
        baseCost: { fleeting_thought: 140000, insight_substance: 2, insight_form: 2 },
        costScale: 1.8, outputAmount: 0.0045, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_ontology']
    },
    theory_thermodynamics_crafter: {
        id: 'theory_thermodynamics_crafter', name: 'Thermo-Dynamic Simulator',
        description: 'Automates Theory: Thermodynamics from Substance and Potential.',
        targetIdeaId: 'theory_thermodynamics',
        baseCost: { fleeting_thought: 160000, insight_substance: 2, insight_potential: 2 },
        costScale: 1.8, outputAmount: 0.004, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_thermodynamics']
    },
    theory_engineering_crafter: {
        id: 'theory_engineering_crafter', name: 'Engineering Design Suite',
        description: 'Automates Theory: Engineering from Substance and Mechanism.',
        targetIdeaId: 'theory_engineering',
        baseCost: { fleeting_thought: 170000, insight_substance: 2, insight_mechanism: 2 },
        costScale: 1.8, outputAmount: 0.0035, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_engineering']
    },
    theory_physics_crafter: {
        id: 'theory_physics_crafter', name: 'Unified Physics Postulator',
        description: 'Automates Theory: Physics from Substance and Causality.',
        targetIdeaId: 'theory_physics',
        baseCost: { fleeting_thought: 180000, insight_substance: 2, insight_causality: 2 },
        costScale: 1.8, outputAmount: 0.003, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_physics']
    },
    theory_aesthetics_crafter: {
        id: 'theory_aesthetics_crafter', name: 'Aesthetic Principle Synthesizer',
        description: 'Automates Theory: Aesthetics from Causality and Form.',
        targetIdeaId: 'theory_aesthetics',
        baseCost: { fleeting_thought: 125000, insight_causality: 2, insight_form: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_aesthetics']
    },
    theory_information_crafter: {
        id: 'theory_information_crafter', name: 'Information Flow Modeler',
        description: 'Automates Theory: Information from Causality and Potential.',
        targetIdeaId: 'theory_information',
        baseCost: { fleeting_thought: 135000, insight_causality: 2, insight_potential: 2 },
        costScale: 1.8, outputAmount: 0.0048, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_information']
    },
    theory_logic_crafter: {
        id: 'theory_logic_crafter', name: 'Logical Deduction Engine',
        description: 'Automates Theory: Logic from Causality and Mechanism.',
        targetIdeaId: 'theory_logic',
        baseCost: { fleeting_thought: 145000, insight_causality: 2, insight_mechanism: 2 },
        costScale: 1.8, outputAmount: 0.0046, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_logic']
    },
    theory_morphology_crafter: {
        id: 'theory_morphology_crafter', name: 'Morphogenetic Patterner',
        description: 'Automates Theory: Morphology from Form and Potential.',
        targetIdeaId: 'theory_morphology',
        baseCost: { fleeting_thought: 130000, insight_form: 2, insight_potential: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_morphology']
    },
    theory_system_dynamics_crafter: {
        id: 'theory_system_dynamics_crafter', name: 'System Evolution Predictor',
        description: 'Automates Theory: System Dynamics from Form and Mechanism.',
        targetIdeaId: 'theory_system_dynamics',
        baseCost: { fleeting_thought: 140000, insight_form: 2, insight_mechanism: 2 },
        costScale: 1.8, outputAmount: 0.0047, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_system_dynamics']
    },
    theory_computation_crafter: {
        id: 'theory_computation_crafter', name: 'Algorithmic Thought Processor',
        description: 'Automates Theory: Computation from Potential and Mechanism.',
        targetIdeaId: 'theory_computation',
        baseCost: { fleeting_thought: 155000, insight_potential: 2, insight_mechanism: 2 },
        costScale: 1.8, outputAmount: 0.0042, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_computation']
    },

    // --- Paradigm Crafters (105 total) ---
    // Note: These costs and outputs are placeholders and will require significant balancing for endgame progression.
    paradigm_structural_design_crafter: { id: 'paradigm_structural_design_crafter', name: 'Structural Design Matrix', description: 'Automates Paradigm: Structural Design.', targetIdeaId: 'paradigm_structural_design', baseCost: { fleeting_thought: 5000000, theory_framework: 3, theory_architecture: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_structural_design']},
    paradigm_foundational_reality_crafter: { id: 'paradigm_foundational_reality_crafter', name: 'Reality Fabricator Core', description: 'Automates Paradigm: Foundational Reality.', targetIdeaId: 'paradigm_foundational_reality', baseCost: { fleeting_thought: 5100000, theory_framework: 3, theory_metaphysics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_foundational_reality']},
    paradigm_control_theory_synthesis_crafter: { id: 'paradigm_control_theory_synthesis_crafter', name: 'Control Synthesis Nexus', description: 'Automates Paradigm: Control Theory Synthesis.', targetIdeaId: 'paradigm_control_theory_synthesis', baseCost: { fleeting_thought: 5200000, theory_framework: 3, theory_cybernetics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_control_theory_synthesis']},
    paradigm_cosmic_blueprint_crafter: { id: 'paradigm_cosmic_blueprint_crafter', name: 'Cosmic Blueprint Weaver', description: 'Automates Paradigm: Cosmic Blueprint.', targetIdeaId: 'paradigm_cosmic_blueprint', baseCost: { fleeting_thought: 5300000, theory_framework: 3, theory_cosmology: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cosmic_blueprint']},
    paradigm_existential_framework_crafter: { id: 'paradigm_existential_framework_crafter', name: 'Existential Framework Engine', description: 'Automates Paradigm: Existential Framework.', targetIdeaId: 'paradigm_existential_framework', baseCost: { fleeting_thought: 5400000, theory_framework: 3, theory_ontology: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_existential_framework']},
    paradigm_energetic_systems_analysis_crafter: { id: 'paradigm_energetic_systems_analysis_crafter', name: 'Energetic Systems Analyzer', description: 'Automates Paradigm: Energetic Systems Analysis.', targetIdeaId: 'paradigm_energetic_systems_analysis', baseCost: { fleeting_thought: 5500000, theory_framework: 3, theory_thermodynamics: 3 }, costScale: 2.5, outputAmount: 0.00018, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_energetic_systems_analysis']},
    paradigm_applied_mechanics_principles_crafter: { id: 'paradigm_applied_mechanics_principles_crafter', name: 'Applied Mechanics Forge', description: 'Automates Paradigm: Applied Mechanics Principles.', targetIdeaId: 'paradigm_applied_mechanics_principles', baseCost: { fleeting_thought: 5600000, theory_framework: 3, theory_engineering: 3 }, costScale: 2.5, outputAmount: 0.00018, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_applied_mechanics_principles']},
    paradigm_unified_field_exploration_crafter: { id: 'paradigm_unified_field_exploration_crafter', name: 'Unified Field Explorer', description: 'Automates Paradigm: Unified Field Exploration.', targetIdeaId: 'paradigm_unified_field_exploration', baseCost: { fleeting_thought: 5700000, theory_framework: 3, theory_physics: 3 }, costScale: 2.5, outputAmount: 0.00017, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_unified_field_exploration']},
    paradigm_causal_aesthetics_crafter: { id: 'paradigm_causal_aesthetics_crafter', name: 'Causal Aesthetics Catalyst', description: 'Automates Paradigm: Causal Aesthetics.', targetIdeaId: 'paradigm_causal_aesthetics', baseCost: { fleeting_thought: 5800000, theory_framework: 3, theory_aesthetics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_causal_aesthetics']},
    paradigm_information_architecture_crafter: { id: 'paradigm_information_architecture_crafter', name: 'Info-Architecture Assembler', description: 'Automates Paradigm: Information Architecture.', targetIdeaId: 'paradigm_information_architecture', baseCost: { fleeting_thought: 5900000, theory_framework: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_information_architecture']},
    paradigm_logical_systems_design_crafter: { id: 'paradigm_logical_systems_design_crafter', name: 'Logical Systems Constructor', description: 'Automates Paradigm: Logical Systems Design.', targetIdeaId: 'paradigm_logical_systems_design', baseCost: { fleeting_thought: 6000000, theory_framework: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.00018, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_logical_systems_design']},
    paradigm_morphogenetic_fields_crafter: { id: 'paradigm_morphogenetic_fields_crafter', name: 'Morphogenetic Field Projector', description: 'Automates Paradigm: Morphogenetic Fields.', targetIdeaId: 'paradigm_morphogenetic_fields', baseCost: { fleeting_thought: 6100000, theory_framework: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_morphogenetic_fields']},
    paradigm_complex_adaptive_systems_crafter: { id: 'paradigm_complex_adaptive_systems_crafter', name: 'Complex Systems Modeler', description: 'Automates Paradigm: Complex Adaptive Systems.', targetIdeaId: 'paradigm_complex_adaptive_systems', baseCost: { fleeting_thought: 6200000, theory_framework: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_complex_adaptive_systems']},
    paradigm_computational_frameworks_crafter: { id: 'paradigm_computational_frameworks_crafter', name: 'Computational Framework Builder', description: 'Automates Paradigm: Computational Frameworks.', targetIdeaId: 'paradigm_computational_frameworks', baseCost: { fleeting_thought: 6300000, theory_framework: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.00018, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_computational_frameworks']},
    paradigm_metaphysical_architecture_crafter: { id: 'paradigm_metaphysical_architecture_crafter', name: 'Metaphysical Architecture Spire', description: 'Automates Paradigm: Metaphysical Architecture.', targetIdeaId: 'paradigm_metaphysical_architecture', baseCost: { fleeting_thought: 6400000, theory_architecture: 3, theory_metaphysics: 3 }, costScale: 2.5, outputAmount: 0.00017, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_metaphysical_architecture']},
    paradigm_intelligent_environments_crafter: { id: 'paradigm_intelligent_environments_crafter', name: 'Intelligent Environment Grid', description: 'Automates Paradigm: Intelligent Environments.', targetIdeaId: 'paradigm_intelligent_environments', baseCost: { fleeting_thought: 6500000, theory_architecture: 3, theory_cybernetics: 3 }, costScale: 2.5, outputAmount: 0.00017, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_intelligent_environments']},
    paradigm_cosmic_structures_crafter: { id: 'paradigm_cosmic_structures_crafter', name: 'Cosmic Structure Weaver', description: 'Automates Paradigm: Cosmic Structures.', targetIdeaId: 'paradigm_cosmic_structures', baseCost: { fleeting_thought: 6600000, theory_architecture: 3, theory_cosmology: 3 }, costScale: 2.5, outputAmount: 0.00016, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cosmic_structures']},
    paradigm_phenomenological_design_crafter: { id: 'paradigm_phenomenological_design_crafter', name: 'Phenomenological Design Studio', description: 'Automates Paradigm: Phenomenological Design.', targetIdeaId: 'paradigm_phenomenological_design', baseCost: { fleeting_thought: 6700000, theory_architecture: 3, theory_ontology: 3 }, costScale: 2.5, outputAmount: 0.00016, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_phenomenological_design']},
    paradigm_sustainable_architecture_crafter: { id: 'paradigm_sustainable_architecture_crafter', name: 'Sustainable Architecture Nexus', description: 'Automates Paradigm: Sustainable Architecture.', targetIdeaId: 'paradigm_sustainable_architecture', baseCost: { fleeting_thought: 6800000, theory_architecture: 3, theory_thermodynamics: 3 }, costScale: 2.5, outputAmount: 0.00015, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_sustainable_architecture']},
    paradigm_structural_engineering_mastery_crafter: { id: 'paradigm_structural_engineering_mastery_crafter', name: 'Structural Mastery Forge', description: 'Automates Paradigm: Structural Engineering Mastery.', targetIdeaId: 'paradigm_structural_engineering_mastery', baseCost: { fleeting_thought: 6900000, theory_architecture: 3, theory_engineering: 3 }, costScale: 2.5, outputAmount: 0.00015, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_structural_engineering_mastery']},
    paradigm_physical_manifestation_principles_crafter: { id: 'paradigm_physical_manifestation_principles_crafter', name: 'Physical Manifestation Engine', description: 'Automates Paradigm: Physical Manifestation.', targetIdeaId: 'paradigm_physical_manifestation_principles', baseCost: { fleeting_thought: 7000000, theory_architecture: 3, theory_physics: 3 }, costScale: 2.5, outputAmount: 0.00014, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_physical_manifestation_principles']},
    paradigm_harmonious_design_crafter: { id: 'paradigm_harmonious_design_crafter', name: 'Harmonious Design Catalyst', description: 'Automates Paradigm: Harmonious Design.', targetIdeaId: 'paradigm_harmonious_design', baseCost: { fleeting_thought: 7100000, theory_architecture: 3, theory_aesthetics: 3 }, costScale: 2.5, outputAmount: 0.00017, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_harmonious_design']},
    paradigm_semantic_architecture_crafter: { id: 'paradigm_semantic_architecture_crafter', name: 'Semantic Architecture Core', description: 'Automates Paradigm: Semantic Architecture.', targetIdeaId: 'paradigm_semantic_architecture', baseCost: { fleeting_thought: 7200000, theory_architecture: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.00016, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_semantic_architecture']},
    paradigm_rational_design_methodology_crafter: { id: 'paradigm_rational_design_methodology_crafter', name: 'Rational Design Matrix', description: 'Automates Paradigm: Rational Design Methodology.', targetIdeaId: 'paradigm_rational_design_methodology', baseCost: { fleeting_thought: 7300000, theory_architecture: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.00015, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_rational_design_methodology']},
    paradigm_bio_mimetic_architecture_crafter: { id: 'paradigm_bio_mimetic_architecture_crafter', name: 'Bio-Mimetic Forge', description: 'Automates Paradigm: Bio-Mimetic Architecture.', targetIdeaId: 'paradigm_bio_mimetic_architecture', baseCost: { fleeting_thought: 7400000, theory_architecture: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.00017, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_bio_mimetic_architecture']},
    paradigm_dynamic_environments_crafter: { id: 'paradigm_dynamic_environments_crafter', name: 'Dynamic Environment Simulator', description: 'Automates Paradigm: Dynamic Environments.', targetIdeaId: 'paradigm_dynamic_environments', baseCost: { fleeting_thought: 7500000, theory_architecture: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.00016, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_dynamic_environments']},
    paradigm_generative_design_crafter: { id: 'paradigm_generative_design_crafter', name: 'Generative Design Engine', description: 'Automates Paradigm: Generative Design.', targetIdeaId: 'paradigm_generative_design', baseCost: { fleeting_thought: 7600000, theory_architecture: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.00015, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_generative_design']},
    paradigm_cybernetic_consciousness_crafter: { id: 'paradigm_cybernetic_consciousness_crafter', name: 'Consciousness Core', description: 'Automates Paradigm: Cybernetic Consciousness.', targetIdeaId: 'paradigm_cybernetic_consciousness', baseCost: { fleeting_thought: 7700000, theory_metaphysics: 3, theory_cybernetics: 3 }, costScale: 2.5, outputAmount: 0.00014, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cybernetic_consciousness']},
    paradigm_cosmic_potentiality_crafter: { id: 'paradigm_cosmic_potentiality_crafter', name: 'Cosmic Potentiality Well', description: 'Automates Paradigm: Cosmic Potentiality.', targetIdeaId: 'paradigm_cosmic_potentiality', baseCost: { fleeting_thought: 7800000, theory_metaphysics: 3, theory_cosmology: 3 }, costScale: 2.5, outputAmount: 0.00014, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cosmic_potentiality']},
    paradigm_ontological_potential_crafter: { id: 'paradigm_ontological_potential_crafter', name: 'Ontological Potential Matrix', description: 'Automates Paradigm: Ontological Potential.', targetIdeaId: 'paradigm_ontological_potential', baseCost: { fleeting_thought: 7900000, theory_metaphysics: 3, theory_ontology: 3 }, costScale: 2.5, outputAmount: 0.00013, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_ontological_potential']},
    paradigm_thermodynamic_idealism_crafter: { id: 'paradigm_thermodynamic_idealism_crafter', name: 'Thermodynamic Idealism Core', description: 'Automates Paradigm: Thermodynamic Idealism.', targetIdeaId: 'paradigm_thermodynamic_idealism', baseCost: { fleeting_thought: 8000000, theory_metaphysics: 3, theory_thermodynamics: 3 }, costScale: 2.5, outputAmount: 0.00013, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_thermodynamic_idealism']},
    paradigm_transcendental_engineering_crafter: { id: 'paradigm_transcendental_engineering_crafter', name: 'Transcendental Engineering Nexus', description: 'Automates Paradigm: Transcendental Engineering.', targetIdeaId: 'paradigm_transcendental_engineering', baseCost: { fleeting_thought: 8100000, theory_metaphysics: 3, theory_engineering: 3 }, costScale: 2.5, outputAmount: 0.00012, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_transcendental_engineering']},
    paradigm_quantum_metaphysics_crafter: { id: 'paradigm_quantum_metaphysics_crafter', name: 'Quantum Metaphysics Engine', description: 'Automates Paradigm: Quantum Metaphysics.', targetIdeaId: 'paradigm_quantum_metaphysics', baseCost: { fleeting_thought: 8200000, theory_metaphysics: 3, theory_physics: 3 }, costScale: 2.5, outputAmount: 0.00012, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_quantum_metaphysics']},
    paradigm_aesthetic_idealism_crafter: { id: 'paradigm_aesthetic_idealism_crafter', name: 'Aesthetic Idealism Synthesizer', description: 'Automates Paradigm: Aesthetic Idealism.', targetIdeaId: 'paradigm_aesthetic_idealism', baseCost: { fleeting_thought: 8300000, theory_metaphysics: 3, theory_aesthetics: 3 }, costScale: 2.5, outputAmount: 0.00014, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_aesthetic_idealism']},
    paradigm_informational_potential_crafter: { id: 'paradigm_informational_potential_crafter', name: 'Informational Potential Matrix', description: 'Automates Paradigm: Informational Potential.', targetIdeaId: 'paradigm_informational_potential', baseCost: { fleeting_thought: 8400000, theory_metaphysics: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.00013, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_informational_potential']},
    paradigm_logical_positivism_reimagined_crafter: { id: 'paradigm_logical_positivism_reimagined_crafter', name: 'Logical Positivism Engine', description: 'Automates Paradigm: Logical Positivism Reimagined.', targetIdeaId: 'paradigm_logical_positivism_reimagined', baseCost: { fleeting_thought: 8500000, theory_metaphysics: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.00012, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_logical_positivism_reimagined']},
    paradigm_developmental_metaphysics_crafter: { id: 'paradigm_developmental_metaphysics_crafter', name: 'Developmental Metaphysics Core', description: 'Automates Paradigm: Developmental Metaphysics.', targetIdeaId: 'paradigm_developmental_metaphysics', baseCost: { fleeting_thought: 8600000, theory_metaphysics: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.00014, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_developmental_metaphysics']},
    paradigm_systemic_potential_crafter: { id: 'paradigm_systemic_potential_crafter', name: 'Systemic Potential Nexus', description: 'Automates Paradigm: Systemic Potential.', targetIdeaId: 'paradigm_systemic_potential', baseCost: { fleeting_thought: 8700000, theory_metaphysics: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.00013, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_systemic_potential']},
    paradigm_computational_metaphysics_crafter: { id: 'paradigm_computational_metaphysics_crafter', name: 'Computational Metaphysics Engine', description: 'Automates Paradigm: Computational Metaphysics.', targetIdeaId: 'paradigm_computational_metaphysics', baseCost: { fleeting_thought: 8800000, theory_metaphysics: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.00012, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_computational_metaphysics']},
    paradigm_cosmic_cybernetics_crafter: { id: 'paradigm_cosmic_cybernetics_crafter', name: 'Cosmic Cybernetics Core', description: 'Automates Paradigm: Cosmic Cybernetics.', targetIdeaId: 'paradigm_cosmic_cybernetics', baseCost: { fleeting_thought: 8900000, theory_cybernetics: 3, theory_cosmology: 3 }, costScale: 2.5, outputAmount: 0.00011, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cosmic_cybernetics']},
    paradigm_ontological_cybernetics_crafter: { id: 'paradigm_ontological_cybernetics_crafter', name: 'Ontological Cybernetics Matrix', description: 'Automates Paradigm: Ontological Cybernetics.', targetIdeaId: 'paradigm_ontological_cybernetics', baseCost: { fleeting_thought: 9000000, theory_cybernetics: 3, theory_ontology: 3 }, costScale: 2.5, outputAmount: 0.00012, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_ontological_cybernetics']},
    paradigm_thermodynamic_control_crafter: { id: 'paradigm_thermodynamic_control_crafter', name: 'Thermodynamic Control Nexus', description: 'Automates Paradigm: Thermodynamic Control.', targetIdeaId: 'paradigm_thermodynamic_control', baseCost: { fleeting_thought: 9100000, theory_cybernetics: 3, theory_thermodynamics: 3 }, costScale: 2.5, outputAmount: 0.00011, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_thermodynamic_control']},
    paradigm_advanced_robotics_crafter: { id: 'paradigm_advanced_robotics_crafter', name: 'Advanced Robotics Fabricator', description: 'Automates Paradigm: Advanced Robotics.', targetIdeaId: 'paradigm_advanced_robotics', baseCost: { fleeting_thought: 9200000, theory_cybernetics: 3, theory_engineering: 3 }, costScale: 2.5, outputAmount: 0.00011, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_advanced_robotics']},
    paradigm_physical_systems_control_crafter: { id: 'paradigm_physical_systems_control_crafter', name: 'Physical Systems Controller', description: 'Automates Paradigm: Physical Systems Control.', targetIdeaId: 'paradigm_physical_systems_control', baseCost: { fleeting_thought: 9300000, theory_cybernetics: 3, theory_physics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_physical_systems_control']},
    paradigm_aesthetic_interaction_crafter: { id: 'paradigm_aesthetic_interaction_crafter', name: 'Aesthetic Interaction Core', description: 'Automates Paradigm: Aesthetic Interaction.', targetIdeaId: 'paradigm_aesthetic_interaction', baseCost: { fleeting_thought: 9400000, theory_cybernetics: 3, theory_aesthetics: 3 }, costScale: 2.5, outputAmount: 0.00013, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_aesthetic_interaction']},
    paradigm_information_control_systems_crafter: { id: 'paradigm_information_control_systems_crafter', name: 'Info-Control Systems Grid', description: 'Automates Paradigm: Information Control Systems.', targetIdeaId: 'paradigm_information_control_systems', baseCost: { fleeting_thought: 9500000, theory_cybernetics: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.00012, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_information_control_systems']},
    paradigm_logical_control_crafter: { id: 'paradigm_logical_control_crafter', name: 'Logical Control Matrix', description: 'Automates Paradigm: Logical Control.', targetIdeaId: 'paradigm_logical_control', baseCost: { fleeting_thought: 9600000, theory_cybernetics: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.00011, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_logical_control']},
    paradigm_bio_cybernetics_crafter: { id: 'paradigm_bio_cybernetics_crafter', name: 'Bio-Cybernetics Nexus', description: 'Automates Paradigm: Bio-Cybernetics.', targetIdeaId: 'paradigm_bio_cybernetics', baseCost: { fleeting_thought: 9700000, theory_cybernetics: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.00012, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_bio_cybernetics']},
    paradigm_socio_technical_systems_crafter: { id: 'paradigm_socio_technical_systems_crafter', name: 'Socio-Technical Systems Modeler', description: 'Automates Paradigm: Socio-Technical Systems.', targetIdeaId: 'paradigm_socio_technical_systems', baseCost: { fleeting_thought: 9800000, theory_cybernetics: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.00011, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_socio_technical_systems']},
    paradigm_artificial_intelligence_foundations_crafter: { id: 'paradigm_artificial_intelligence_foundations_crafter', name: 'AI Foundation Core', description: 'Automates Paradigm: Artificial Intelligence Foundations.', targetIdeaId: 'paradigm_artificial_intelligence_foundations', baseCost: { fleeting_thought: 9900000, theory_cybernetics: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_artificial_intelligence_foundations']},
    paradigm_ontological_cosmology_crafter: { id: 'paradigm_ontological_cosmology_crafter', name: 'Ontological Cosmology Engine', description: 'Automates Paradigm: Ontological Cosmology.', targetIdeaId: 'paradigm_ontological_cosmology', baseCost: { fleeting_thought: 10000000, theory_cosmology: 3, theory_ontology: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_ontological_cosmology']},
    paradigm_cosmic_thermodynamics_crafter: { id: 'paradigm_cosmic_thermodynamics_crafter', name: 'Cosmic Thermodynamics Core', description: 'Automates Paradigm: Cosmic Thermodynamics.', targetIdeaId: 'paradigm_cosmic_thermodynamics', baseCost: { fleeting_thought: 10100000, theory_cosmology: 3, theory_thermodynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cosmic_thermodynamics']},
    paradigm_astro_engineering_crafter: { id: 'paradigm_astro_engineering_crafter', name: 'Astro-Engineering Forge', description: 'Automates Paradigm: Astro-Engineering.', targetIdeaId: 'paradigm_astro_engineering', baseCost: { fleeting_thought: 10200000, theory_cosmology: 3, theory_engineering: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_astro_engineering']},
    paradigm_grand_unification_theory_crafter: { id: 'paradigm_grand_unification_theory_crafter', name: 'Grand Unification Matrix', description: 'Automates Paradigm: Grand Unification.', targetIdeaId: 'paradigm_grand_unification_theory', baseCost: { fleeting_thought: 10300000, theory_cosmology: 3, theory_physics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_grand_unification_theory']},
    paradigm_cosmic_aesthetics_crafter: { id: 'paradigm_cosmic_aesthetics_crafter', name: 'Cosmic Aesthetics Synthesizer', description: 'Automates Paradigm: Cosmic Aesthetics.', targetIdeaId: 'paradigm_cosmic_aesthetics', baseCost: { fleeting_thought: 10400000, theory_cosmology: 3, theory_aesthetics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cosmic_aesthetics']},
    paradigm_cosmic_information_density_crafter: { id: 'paradigm_cosmic_information_density_crafter', name: 'Cosmic Info-Density Core', description: 'Automates Paradigm: Cosmic Information Density.', targetIdeaId: 'paradigm_cosmic_information_density', baseCost: { fleeting_thought: 10500000, theory_cosmology: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cosmic_information_density']},
    paradigm_cosmological_argument_revisited_crafter: { id: 'paradigm_cosmological_argument_revisited_crafter', name: 'Cosmological Argument Engine', description: 'Automates Paradigm: Cosmological Argument.', targetIdeaId: 'paradigm_cosmological_argument_revisited', baseCost: { fleeting_thought: 10600000, theory_cosmology: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cosmological_argument_revisited']},
    paradigm_astrobiology_crafter: { id: 'paradigm_astrobiology_crafter', name: 'Astrobiology Lab', description: 'Automates Paradigm: Astrobiology.', targetIdeaId: 'paradigm_astrobiology', baseCost: { fleeting_thought: 10700000, theory_cosmology: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_astrobiology']},
    paradigm_universal_evolution_crafter: { id: 'paradigm_universal_evolution_crafter', name: 'Universal Evolution Simulator', description: 'Automates Paradigm: Universal Evolution.', targetIdeaId: 'paradigm_universal_evolution', baseCost: { fleeting_thought: 10800000, theory_cosmology: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_universal_evolution']},
    paradigm_computational_cosmology_crafter: { id: 'paradigm_computational_cosmology_crafter', name: 'Computational Cosmology Engine', description: 'Automates Paradigm: Computational Cosmology.', targetIdeaId: 'paradigm_computational_cosmology', baseCost: { fleeting_thought: 10900000, theory_cosmology: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_computational_cosmology']},
    paradigm_thermodynamic_being_crafter: { id: 'paradigm_thermodynamic_being_crafter', name: 'Thermodynamic Being Nexus', description: 'Automates Paradigm: Thermodynamic Being.', targetIdeaId: 'paradigm_thermodynamic_being', baseCost: { fleeting_thought: 11000000, theory_ontology: 3, theory_thermodynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_thermodynamic_being']},
    paradigm_existential_engineering_crafter: { id: 'paradigm_existential_engineering_crafter', name: 'Existential Engineering Core', description: 'Automates Paradigm: Existential Engineering.', targetIdeaId: 'paradigm_existential_engineering', baseCost: { fleeting_thought: 11100000, theory_ontology: 3, theory_engineering: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_existential_engineering']},
    paradigm_physical_ontology_crafter: { id: 'paradigm_physical_ontology_crafter', name: 'Physical Ontology Matrix', description: 'Automates Paradigm: Physical Ontology.', targetIdeaId: 'paradigm_physical_ontology', baseCost: { fleeting_thought: 11200000, theory_ontology: 3, theory_physics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_physical_ontology']},
    paradigm_ontological_aesthetics_crafter: { id: 'paradigm_ontological_aesthetics_crafter', name: 'Ontological Aesthetics Engine', description: 'Automates Paradigm: Ontological Aesthetics.', targetIdeaId: 'paradigm_ontological_aesthetics', baseCost: { fleeting_thought: 11300000, theory_ontology: 3, theory_aesthetics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_ontological_aesthetics']},
    paradigm_informational_ontology_crafter: { id: 'paradigm_informational_ontology_crafter', name: 'Informational Ontology Core', description: 'Automates Paradigm: Informational Ontology.', targetIdeaId: 'paradigm_informational_ontology', baseCost: { fleeting_thought: 11400000, theory_ontology: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_informational_ontology']},
    paradigm_formal_ontology_crafter: { id: 'paradigm_formal_ontology_crafter', name: 'Formal Ontology Synthesizer', description: 'Automates Paradigm: Formal Ontology.', targetIdeaId: 'paradigm_formal_ontology', baseCost: { fleeting_thought: 11500000, theory_ontology: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_formal_ontology']},
    paradigm_biological_ontology_crafter: { id: 'paradigm_biological_ontology_crafter', name: 'Biological Ontology Matrix', description: 'Automates Paradigm: Biological Ontology.', targetIdeaId: 'paradigm_biological_ontology', baseCost: { fleeting_thought: 11600000, theory_ontology: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_biological_ontology']},
    paradigm_systemic_ontology_crafter: { id: 'paradigm_systemic_ontology_crafter', name: 'Systemic Ontology Nexus', description: 'Automates Paradigm: Systemic Ontology.', targetIdeaId: 'paradigm_systemic_ontology', baseCost: { fleeting_thought: 11700000, theory_ontology: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_systemic_ontology']},
    paradigm_computational_ontology_crafter: { id: 'paradigm_computational_ontology_crafter', name: 'Computational Ontology Engine', description: 'Automates Paradigm: Computational Ontology.', targetIdeaId: 'paradigm_computational_ontology', baseCost: { fleeting_thought: 11800000, theory_ontology: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_computational_ontology']},
    paradigm_applied_thermodynamics_crafter: { id: 'paradigm_applied_thermodynamics_crafter', name: 'Applied Thermodynamics Core', description: 'Automates Paradigm: Applied Thermodynamics.', targetIdeaId: 'paradigm_applied_thermodynamics', baseCost: { fleeting_thought: 11900000, theory_thermodynamics: 3, theory_engineering: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_applied_thermodynamics']},
    paradigm_statistical_mechanics_crafter: { id: 'paradigm_statistical_mechanics_crafter', name: 'Statistical Mechanics Matrix', description: 'Automates Paradigm: Statistical Mechanics.', targetIdeaId: 'paradigm_statistical_mechanics', baseCost: { fleeting_thought: 12000000, theory_thermodynamics: 3, theory_physics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_statistical_mechanics']},
    paradigm_aesthetic_energy_crafter: { id: 'paradigm_aesthetic_energy_crafter', name: 'Aesthetic Energy Synthesizer', description: 'Automates Paradigm: Aesthetic Energy.', targetIdeaId: 'paradigm_aesthetic_energy', baseCost: { fleeting_thought: 12100000, theory_thermodynamics: 3, theory_aesthetics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_aesthetic_energy']},
    paradigm_information_thermodynamics_crafter: { id: 'paradigm_information_thermodynamics_crafter', name: 'Info-Thermo Dynamics Core', description: 'Automates Paradigm: Information Thermodynamics.', targetIdeaId: 'paradigm_information_thermodynamics', baseCost: { fleeting_thought: 12200000, theory_thermodynamics: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_information_thermodynamics']},
    paradigm_logical_foundations_of_thermo_crafter: { id: 'paradigm_logical_foundations_of_thermo_crafter', name: 'Thermo-Logic Engine', description: 'Automates Paradigm: Thermodynamic Logic.', targetIdeaId: 'paradigm_logical_foundations_of_thermo', baseCost: { fleeting_thought: 12300000, theory_thermodynamics: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_logical_foundations_of_thermo']},
    paradigm_bioenergetics_crafter: { id: 'paradigm_bioenergetics_crafter', name: 'Bioenergetics Matrix', description: 'Automates Paradigm: Bioenergetics.', targetIdeaId: 'paradigm_bioenergetics', baseCost: { fleeting_thought: 12400000, theory_thermodynamics: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_bioenergetics']},
    paradigm_non_equilibrium_thermodynamics_crafter: { id: 'paradigm_non_equilibrium_thermodynamics_crafter', name: 'Non-Equilibrium Systems Core', description: 'Automates Paradigm: Non-Equilibrium Systems.', targetIdeaId: 'paradigm_non_equilibrium_thermodynamics', baseCost: { fleeting_thought: 12500000, theory_thermodynamics: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_non_equilibrium_thermodynamics']},
    paradigm_computational_thermodynamics_crafter: { id: 'paradigm_computational_thermodynamics_crafter', name: 'Computational Thermo Engine', description: 'Automates Paradigm: Computational Thermodynamics.', targetIdeaId: 'paradigm_computational_thermodynamics', baseCost: { fleeting_thought: 12600000, theory_thermodynamics: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_computational_thermodynamics']},
    paradigm_physical_engineering_crafter: { id: 'paradigm_physical_engineering_crafter', name: 'Physical Engineering Matrix', description: 'Automates Paradigm: Physical Engineering.', targetIdeaId: 'paradigm_physical_engineering', baseCost: { fleeting_thought: 12700000, theory_engineering: 3, theory_physics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_physical_engineering']},
    paradigm_functional_aesthetics_crafter: { id: 'paradigm_functional_aesthetics_crafter', name: 'Functional Aesthetics Synthesizer', description: 'Automates Paradigm: Functional Aesthetics.', targetIdeaId: 'paradigm_functional_aesthetics', baseCost: { fleeting_thought: 12800000, theory_engineering: 3, theory_aesthetics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_functional_aesthetics']},
    paradigm_knowledge_engineering_crafter: { id: 'paradigm_knowledge_engineering_crafter', name: 'Knowledge Engineering Core', description: 'Automates Paradigm: Knowledge Engineering.', targetIdeaId: 'paradigm_knowledge_engineering', baseCost: { fleeting_thought: 12900000, theory_engineering: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_knowledge_engineering']},
    paradigm_formal_methods_in_engineering_crafter: { id: 'paradigm_formal_methods_in_engineering_crafter', name: 'Formal Engineering Matrix', description: 'Automates Paradigm: Formal Engineering.', targetIdeaId: 'paradigm_formal_methods_in_engineering', baseCost: { fleeting_thought: 13000000, theory_engineering: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_formal_methods_in_engineering']},
    paradigm_bio_engineering_crafter: { id: 'paradigm_bio_engineering_crafter', name: 'Bio-Engineering Nexus', description: 'Automates Paradigm: Bio-Engineering.', targetIdeaId: 'paradigm_bio_engineering', baseCost: { fleeting_thought: 13100000, theory_engineering: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_bio_engineering']},
    paradigm_systems_engineering_crafter: { id: 'paradigm_systems_engineering_crafter', name: 'Systems Engineering Core', description: 'Automates Paradigm: Systems Engineering.', targetIdeaId: 'paradigm_systems_engineering', baseCost: { fleeting_thought: 13200000, theory_engineering: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_systems_engineering']},
    paradigm_software_engineering_mastery_crafter: { id: 'paradigm_software_engineering_mastery_crafter', name: 'Software Engineering Matrix', description: 'Automates Paradigm: Software Engineering.', targetIdeaId: 'paradigm_software_engineering_mastery', baseCost: { fleeting_thought: 13300000, theory_engineering: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_software_engineering_mastery']},
    paradigm_aesthetic_relativity_crafter: { id: 'paradigm_aesthetic_relativity_crafter', name: 'Aesthetic Relativity Engine', description: 'Automates Paradigm: Aesthetic Relativity.', targetIdeaId: 'paradigm_aesthetic_relativity', baseCost: { fleeting_thought: 13400000, theory_physics: 3, theory_aesthetics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_aesthetic_relativity']},
    paradigm_quantum_information_science_crafter: { id: 'paradigm_quantum_information_science_crafter', name: 'Quantum Information Core', description: 'Automates Paradigm: Quantum Information.', targetIdeaId: 'paradigm_quantum_information_science', baseCost: { fleeting_thought: 13500000, theory_physics: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_quantum_information_science']},
    paradigm_logical_foundations_of_physics_crafter: { id: 'paradigm_logical_foundations_of_physics_crafter', name: 'Physical Logic Synthesizer', description: 'Automates Paradigm: Physical Logic.', targetIdeaId: 'paradigm_logical_foundations_of_physics', baseCost: { fleeting_thought: 13600000, theory_physics: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_logical_foundations_of_physics']},
    paradigm_biophysics_crafter: { id: 'paradigm_biophysics_crafter', name: 'Biophysics Matrix', description: 'Automates Paradigm: Biophysics.', targetIdeaId: 'paradigm_biophysics', baseCost: { fleeting_thought: 13700000, theory_physics: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_biophysics']},
    paradigm_chaotic_systems_physics_crafter: { id: 'paradigm_chaotic_systems_physics_crafter', name: 'Chaotic Systems Nexus', description: 'Automates Paradigm: Chaotic Systems.', targetIdeaId: 'paradigm_chaotic_systems_physics', baseCost: { fleeting_thought: 13800000, theory_physics: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_chaotic_systems_physics']},
    paradigm_computational_physics_crafter: { id: 'paradigm_computational_physics_crafter', name: 'Computational Physics Engine', description: 'Automates Paradigm: Computational Physics.', targetIdeaId: 'paradigm_computational_physics', baseCost: { fleeting_thought: 13900000, theory_physics: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_computational_physics']},
    paradigm_informational_aesthetics_crafter: { id: 'paradigm_informational_aesthetics_crafter', name: 'Informational Aesthetics Core', description: 'Automates Paradigm: Informational Aesthetics.', targetIdeaId: 'paradigm_informational_aesthetics', baseCost: { fleeting_thought: 14000000, theory_aesthetics: 3, theory_information: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_informational_aesthetics']},
    paradigm_logical_aesthetics_crafter: { id: 'paradigm_logical_aesthetics_crafter', name: 'Logical Aesthetics Synthesizer', description: 'Automates Paradigm: Logical Aesthetics.', targetIdeaId: 'paradigm_logical_aesthetics', baseCost: { fleeting_thought: 14100000, theory_aesthetics: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_logical_aesthetics']},
    paradigm_morphological_beauty_crafter: { id: 'paradigm_morphological_beauty_crafter', name: 'Morphological Beauty Matrix', description: 'Automates Paradigm: Morphological Beauty.', targetIdeaId: 'paradigm_morphological_beauty', baseCost: { fleeting_thought: 14200000, theory_aesthetics: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_morphological_beauty']},
    paradigm_dynamic_art_forms_crafter: { id: 'paradigm_dynamic_art_forms_crafter', name: 'Dynamic Art Forms Nexus', description: 'Automates Paradigm: Dynamic Art Forms.', targetIdeaId: 'paradigm_dynamic_art_forms', baseCost: { fleeting_thought: 14300000, theory_aesthetics: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_dynamic_art_forms']},
    paradigm_computational_aesthetics_crafter: { id: 'paradigm_computational_aesthetics_crafter', name: 'Computational Aesthetics Engine', description: 'Automates Paradigm: Computational Aesthetics.', targetIdeaId: 'paradigm_computational_aesthetics', baseCost: { fleeting_thought: 14400000, theory_aesthetics: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_computational_aesthetics']},
    paradigm_logical_information_theory_crafter: { id: 'paradigm_logical_information_theory_crafter', name: 'Logical Information Core', description: 'Automates Paradigm: Logical Information Theory.', targetIdeaId: 'paradigm_logical_information_theory', baseCost: { fleeting_thought: 14500000, theory_information: 3, theory_logic: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_logical_information_theory']},
    paradigm_bio_informatics_crafter: { id: 'paradigm_bio_informatics_crafter', name: 'Bio-Informatics Matrix', description: 'Automates Paradigm: Bio-Informatics.', targetIdeaId: 'paradigm_bio_informatics', baseCost: { fleeting_thought: 14600000, theory_information: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_bio_informatics']},
    paradigm_information_systems_dynamics_crafter: { id: 'paradigm_information_systems_dynamics_crafter', name: 'Info-Systems Dynamics Nexus', description: 'Automates Paradigm: Information Systems Dynamics.', targetIdeaId: 'paradigm_information_systems_dynamics', baseCost: { fleeting_thought: 14700000, theory_information: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_information_systems_dynamics']},
    paradigm_theoretical_computer_science_crafter: { id: 'paradigm_theoretical_computer_science_crafter', name: 'Theoretical CS Engine', description: 'Automates Paradigm: Theoretical Computer Science.', targetIdeaId: 'paradigm_theoretical_computer_science', baseCost: { fleeting_thought: 14800000, theory_information: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_theoretical_computer_science']},
    paradigm_morphological_logic_crafter: { id: 'paradigm_morphological_logic_crafter', name: 'Morphological Logic Core', description: 'Automates Paradigm: Morphological Logic.', targetIdeaId: 'paradigm_morphological_logic', baseCost: { fleeting_thought: 14900000, theory_logic: 3, theory_morphology: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_morphological_logic']},
    paradigm_formal_systems_theory_crafter: { id: 'paradigm_formal_systems_theory_crafter', name: 'Formal Systems Matrix', description: 'Automates Paradigm: Formal Systems Theory.', targetIdeaId: 'paradigm_formal_systems_theory', baseCost: { fleeting_thought: 15000000, theory_logic: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_formal_systems_theory']},
    paradigm_computational_logic_crafter: { id: 'paradigm_computational_logic_crafter', name: 'Computational Logic Engine', description: 'Automates Paradigm: Computational Logic.', targetIdeaId: 'paradigm_computational_logic', baseCost: { fleeting_thought: 15100000, theory_logic: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_computational_logic']},
    paradigm_dynamic_morphogenesis_crafter: { id: 'paradigm_dynamic_morphogenesis_crafter', name: 'Dynamic Morphogenesis Core', description: 'Automates Paradigm: Dynamic Morphogenesis.', targetIdeaId: 'paradigm_dynamic_morphogenesis', baseCost: { fleeting_thought: 15200000, theory_morphology: 3, theory_system_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_dynamic_morphogenesis']},
    paradigm_computational_morphology_crafter: { id: 'paradigm_computational_morphology_crafter', name: 'Computational Morphology Engine', description: 'Automates Paradigm: Computational Morphology.', targetIdeaId: 'paradigm_computational_morphology', baseCost: { fleeting_thought: 15300000, theory_morphology: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_computational_morphology']},
    paradigm_large_scale_simulation_crafter: { id: 'paradigm_large_scale_simulation_crafter', name: 'Large-Scale Simulation Matrix', description: 'Automates Paradigm: Large-Scale Simulation.', targetIdeaId: 'paradigm_large_scale_simulation', baseCost: { fleeting_thought: 15400000, theory_system_dynamics: 3, theory_computation: 3 }, costScale: 2.5, outputAmount: 0.0001, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_large_scale_simulation']}
};
