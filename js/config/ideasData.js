// js/config/ideasData.js

/**
 * Defines all discoverable ideas in the game, including their properties,
 * recipes for creation, and any passive effects they provide.
 */
const IDEAS_DATA = {
    // Tier 0: Base Currency
    fleeting_thought: {
        id: 'fleeting_thought', name: 'Fleeting Thought', tier: 0, color: '#cccccc', shape: 'dot',
        description: 'A raw, unrefined spark of potential.'
    },

    // Tier 1: Base Concepts
    concept_duality: {
        id: 'concept_duality', name: 'Concept: Duality', tier: 1, group: 'concept',
        color: { background: '#29b6f6', border: '#01579b' }, shape: 'ellipse',
        description: 'The notion of two contrasting aspects. (e.g., light/dark, order/chaos).',
        attributes: { ft_bonus_per_sec: 0.01 }
    },
    concept_pattern: {
        id: 'concept_pattern', name: 'Concept: Pattern', tier: 1, group: 'concept',
        color: { background: '#66bb6a', border: '#2e7d32' }, shape: 'ellipse',
        description: 'A discernible regularity or sequence.',
        attributes: { ft_bonus_per_sec: 0.01 }
    },
    concept_matter: {
        id: 'concept_matter', name: 'Concept: Matter', tier: 1, group: 'concept',
        color: { background: '#ffa726', border: '#ef6c00' }, shape: 'ellipse',
        description: 'The physical substance of the universe.',
        attributes: { ft_bonus_per_sec: 0.015 }
    },
    concept_energy: {
        id: 'concept_energy', name: 'Concept: Energy', tier: 1, group: 'concept',
        color: { background: '#ef5350', border: '#c62828' }, shape: 'ellipse',
        description: 'The capacity to perform work or produce heat.',
        attributes: { ft_bonus_per_sec: 0.015 }
    },

    // Tier 2: Insights
    insight_structure: {
        id: 'insight_structure', name: 'Insight: Structure', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond',
        description: 'Understanding how elements are arranged and organized based on underlying dualities and patterns.',
        recipe: ['concept_duality', 'concept_pattern'],
        attributes: { ft_bonus_per_sec: 0.1 }
    },
    insight_substance: {
        id: 'insight_substance', name: 'Insight: Substance', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond',
        description: 'A fundamental understanding of physical existence combining matter and energy.',
        recipe: ['concept_matter', 'concept_energy'],
        attributes: { ft_bonus_per_sec: 0.12 }
    },
    insight_causality: {
        id: 'insight_causality', name: 'Insight: Causality', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond',
        description: 'The relationship between cause and effect, derived from observing patterns in energy transformation.',
        recipe: ['concept_pattern', 'concept_energy'],
        attributes: { ft_bonus_per_sec: 0.11 }
    },
    insight_form: {
        id: 'insight_form', name: 'Insight: Form', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond',
        description: 'The understanding that matter takes on distinct forms and boundaries, often defined by contrasting properties.',
        recipe: ['concept_duality', 'concept_matter'],
        attributes: { ft_bonus_per_sec: 0.09 }
    },
    insight_potential: {
        id: 'insight_potential', name: 'Insight: Potential', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond',
        description: 'The recognition that energy exists in states of potential and kinetic expression, a fundamental duality.',
        recipe: ['concept_duality', 'concept_energy'],
        attributes: { ft_bonus_per_sec: 0.1 }
    },
    insight_mechanism: {
        id: 'insight_mechanism', name: 'Insight: Mechanism', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17'} }, shape: 'diamond',
        description: 'The realization that patterns in the arrangement of matter give rise to functional mechanisms and systems.',
        recipe: ['concept_pattern', 'concept_matter'],
        attributes: { ft_bonus_per_sec: 0.11 }
    },

    // Tier 3: Theories (15 unique combinations of 6 insights)
    theory_framework: {
        id: 'theory_framework', name: 'Theory: Framework', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'A foundational set of ideas used to develop more complex systems, built upon structure and causality.',
        recipe: ['insight_structure', 'insight_causality'],
        attributes: { ft_bonus_per_sec: 0.5 }
    },
    theory_architecture: {
        id: 'theory_architecture', name: 'Theory: Architecture', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The art and science of designing and constructing coherent forms within defined structures.',
        recipe: ['insight_structure', 'insight_form'],
        attributes: { ft_bonus_per_sec: 0.51 }
    },
    theory_metaphysics: {
        id: 'theory_metaphysics', name: 'Theory: Metaphysics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'Exploring the fundamental nature of reality, potential, and existence within defined structures.',
        recipe: ['insight_structure', 'insight_potential'],
        attributes: { ft_bonus_per_sec: 0.52 }
    },
    theory_cybernetics: {
        id: 'theory_cybernetics', name: 'Theory: Cybernetics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The study of control and communication in complex systems, linking structure to functional mechanisms.',
        recipe: ['insight_structure', 'insight_mechanism'],
        attributes: { ft_bonus_per_sec: 0.55 }
    },
    theory_cosmology: {
        id: 'theory_cosmology', name: 'Theory: Cosmology', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The study of the origin, evolution, and eventual fate of the universe, built upon its substance and structure.',
        recipe: ['insight_structure', 'insight_substance'],
        attributes: { ft_bonus_per_sec: 0.6 }
    },
    theory_ontology: {
        id: 'theory_ontology', name: 'Theory: Ontology', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The philosophical study of being, existence, and reality, considering the forms substance can take.',
        recipe: ['insight_substance', 'insight_form'],
        attributes: { ft_bonus_per_sec: 0.58 }
    },
    theory_thermodynamics: {
        id: 'theory_thermodynamics', name: 'Theory: Thermodynamics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The science of the relationships between heat and other forms of energy (potential) within material substance.',
        recipe: ['insight_substance', 'insight_potential'],
        attributes: { ft_bonus_per_sec: 0.62 }
    },
    theory_engineering: {
        id: 'theory_engineering', name: 'Theory: Engineering', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The application of scientific and material (substance) principles to design and build mechanisms.',
        recipe: ['insight_substance', 'insight_mechanism'],
        attributes: { ft_bonus_per_sec: 0.65 }
    },
    theory_physics: {
        id: 'theory_physics', name: 'Theory: Physics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The systematic study of matter, energy, and their interactions, grounded in substance and causality.',
        recipe: ['insight_substance', 'insight_causality'],
        attributes: { ft_bonus_per_sec: 0.68 }
    },
    theory_aesthetics: {
        id: 'theory_aesthetics', name: 'Theory: Aesthetics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The principles concerned with the nature and appreciation of beauty, emerging from the causal impact of form.',
        recipe: ['insight_causality', 'insight_form'],
        attributes: { ft_bonus_per_sec: 0.53 }
    },
    theory_information: {
        id: 'theory_information', name: 'Theory: Information', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'Understanding information as patterns of potential, capable of being encoded, transmitted, and interpreted through causal chains.',
        recipe: ['insight_causality', 'insight_potential'],
        attributes: { ft_bonus_per_sec: 0.56 }
    },
    theory_logic: {
        id: 'theory_logic', name: 'Theory: Logic', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The systematic principles of valid reasoning and inference, derived from the causal operations of defined mechanisms.',
        recipe: ['insight_causality', 'insight_mechanism'],
        attributes: { ft_bonus_per_sec: 0.59 }
    },
    theory_morphology: {
        id: 'theory_morphology', name: 'Theory: Morphology', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The study of the form and structure of organisms and their specific features, considering their developmental potential.',
        recipe: ['insight_form', 'insight_potential'],
        attributes: { ft_bonus_per_sec: 0.54 }
    },
    theory_system_dynamics: {
        id: 'theory_system_dynamics', name: 'Theory: System Dynamics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The study of how interconnected forms and mechanisms behave and evolve over time.',
        recipe: ['insight_form', 'insight_mechanism'],
        attributes: { ft_bonus_per_sec: 0.57 }
    },
    theory_computation: {
        id: 'theory_computation', name: 'Theory: Computation', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The study of what can be efficiently automated, harnessing the potential of defined mechanisms to process information.',
        recipe: ['insight_potential', 'insight_mechanism'],
        attributes: { ft_bonus_per_sec: 0.61 }
    },

    // Tier 4: Paradigms (105 unique combinations of 15 theories)
    paradigm_structural_design: {
        id: 'paradigm_structural_design', name: 'Paradigm: Structural Design', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A paradigm uniting foundational frameworks with architectural principles to create robust and elegant designs.',
        recipe: ['theory_framework', 'theory_architecture'],
        attributes: { ft_bonus_per_sec: 2.0 }
    },
    paradigm_foundational_reality: {
        id: 'paradigm_foundational_reality', name: 'Paradigm: Foundational Reality', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A comprehensive understanding of existence based on logical frameworks and metaphysical potential.',
        recipe: ['theory_framework', 'theory_metaphysics'],
        attributes: { ft_bonus_per_sec: 2.1 }
    },
    paradigm_control_theory_synthesis: {
        id: 'paradigm_control_theory_synthesis', name: 'Paradigm: Control Theory Synthesis', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Integrating system control with foundational frameworks for advanced automation.',
        recipe: ['theory_framework', 'theory_cybernetics'],
        attributes: { ft_bonus_per_sec: 2.2 }
    },
    paradigm_cosmic_blueprint: {
        id: 'paradigm_cosmic_blueprint', name: 'Paradigm: Cosmic Blueprint', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Understanding the universe through its fundamental structural rules and cosmological evolution.',
        recipe: ['theory_framework', 'theory_cosmology'],
        attributes: { ft_bonus_per_sec: 2.5 }
    },
    paradigm_existential_framework: {
        id: 'paradigm_existential_framework', name: 'Paradigm: Existential Framework', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Defining the nature of being within logical and causal structures.',
        recipe: ['theory_framework', 'theory_ontology'],
        attributes: { ft_bonus_per_sec: 2.3 }
    },
    paradigm_energetic_systems_analysis: {
        id: 'paradigm_energetic_systems_analysis', name: 'Paradigm: Energetic Systems Analysis', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying structural frameworks to understand energy flow and transformation.',
        recipe: ['theory_framework', 'theory_thermodynamics'],
        attributes: { ft_bonus_per_sec: 2.6 }
    },
    paradigm_applied_mechanics_principles: {
        id: 'paradigm_applied_mechanics_principles', name: 'Paradigm: Applied Mechanics Principles', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The fundamental principles of engineering derived from core structural and causal laws.',
        recipe: ['theory_framework', 'theory_engineering'],
        attributes: { ft_bonus_per_sec: 2.7 }
    },
    paradigm_unified_field_exploration: {
        id: 'paradigm_unified_field_exploration', name: 'Paradigm: Unified Field Exploration', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A quest to unify physical laws under a single comprehensive framework.',
        recipe: ['theory_framework', 'theory_physics'],
        attributes: { ft_bonus_per_sec: 2.8 }
    },
    paradigm_causal_aesthetics: {
        id: 'paradigm_causal_aesthetics', name: 'Paradigm: Causal Aesthetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Understanding beauty as an emergent property of underlying causal frameworks.',
        recipe: ['theory_framework', 'theory_aesthetics'],
        attributes: { ft_bonus_per_sec: 2.1 }
    },
    paradigm_information_architecture: {
        id: 'paradigm_information_architecture', name: 'Paradigm: Information Architecture', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Designing the structural blueprint of shared information environments.',
        recipe: ['theory_framework', 'theory_information'],
        attributes: { ft_bonus_per_sec: 2.4 }
    },
    paradigm_logical_systems_design: {
        id: 'paradigm_logical_systems_design', name: 'Paradigm: Logical Systems Design', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The creation of systems based on rigorous logical frameworks and causal reasoning.',
        recipe: ['theory_framework', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 2.5 }
    },
    paradigm_morphogenetic_fields: {
        id: 'paradigm_morphogenetic_fields', name: 'Paradigm: Morphogenetic Fields', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Hypothetical fields guiding the development of form within structural constraints.',
        recipe: ['theory_framework', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 2.2 }
    },
    paradigm_complex_adaptive_systems: {
        id: 'paradigm_complex_adaptive_systems', name: 'Paradigm: Complex Adaptive Systems', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Understanding systems that adapt based on internal frameworks and dynamic interactions.',
        recipe: ['theory_framework', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 2.4 }
    },
    paradigm_computational_frameworks: {
        id: 'paradigm_computational_frameworks', name: 'Paradigm: Computational Frameworks', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The fundamental structures underlying computational processes and algorithms.',
        recipe: ['theory_framework', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 2.6 }
    },
    paradigm_metaphysical_architecture: {
        id: 'paradigm_metaphysical_architecture', name: 'Paradigm: Metaphysical Architecture', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Designing structures that embody or explore metaphysical concepts and potential.',
        recipe: ['theory_architecture', 'theory_metaphysics'],
        attributes: { ft_bonus_per_sec: 2.3 }
    },
    paradigm_intelligent_environments: {
        id: 'paradigm_intelligent_environments', name: 'Paradigm: Intelligent Environments', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Architectures that sense, respond, and adapt through integrated control systems.',
        recipe: ['theory_architecture', 'theory_cybernetics'],
        attributes: { ft_bonus_per_sec: 2.4 }
    },
    paradigm_cosmic_structures: {
        id: 'paradigm_cosmic_structures', name: 'Paradigm: Cosmic Structures', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The grand architecture of the universe, from galaxies to large-scale filaments.',
        recipe: ['theory_architecture', 'theory_cosmology'],
        attributes: { ft_bonus_per_sec: 2.7 }
    },
    paradigm_phenomenological_design: {
        id: 'paradigm_phenomenological_design', name: 'Paradigm: Phenomenological Design', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Architectural design focused on the subjective experience and perception of being.',
        recipe: ['theory_architecture', 'theory_ontology'],
        attributes: { ft_bonus_per_sec: 2.5 }
    },
    paradigm_sustainable_architecture: {
        id: 'paradigm_sustainable_architecture', name: 'Paradigm: Sustainable Architecture', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Designing buildings and structures with optimal energy efficiency and environmental harmony.',
        recipe: ['theory_architecture', 'theory_thermodynamics'],
        attributes: { ft_bonus_per_sec: 2.8 }
    },
    paradigm_structural_engineering_mastery: {
        id: 'paradigm_structural_engineering_mastery', name: 'Paradigm: Structural Engineering Mastery', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The pinnacle of designing and constructing complex, resilient engineered structures.',
        recipe: ['theory_architecture', 'theory_engineering'],
        attributes: { ft_bonus_per_sec: 2.9 }
    },
    paradigm_physical_manifestation_principles: {
        id: 'paradigm_physical_manifestation_principles', name: 'Paradigm: Physical Manifestation', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Understanding how physical laws govern the forms and structures that can be architected.',
        recipe: ['theory_architecture', 'theory_physics'],
        attributes: { ft_bonus_per_sec: 3.0 }
    },
    paradigm_harmonious_design: {
        id: 'paradigm_harmonious_design', name: 'Paradigm: Harmonious Design', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The convergence of architectural principles and aesthetic theory to create beauty.',
        recipe: ['theory_architecture', 'theory_aesthetics'],
        attributes: { ft_bonus_per_sec: 2.2 }
    },
    paradigm_semantic_architecture: {
        id: 'paradigm_semantic_architecture', name: 'Paradigm: Semantic Architecture', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Designing structures that convey meaning and organize information effectively.',
        recipe: ['theory_architecture', 'theory_information'],
        attributes: { ft_bonus_per_sec: 2.6 }
    },
    paradigm_rational_design_methodology: {
        id: 'paradigm_rational_design_methodology', name: 'Paradigm: Rational Design Methodology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A systematic, logic-driven approach to architectural and structural design.',
        recipe: ['theory_architecture', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 2.7 }
    },
    paradigm_bio_mimetic_architecture: {
        id: 'paradigm_bio_mimetic_architecture', name: 'Paradigm: Bio-Mimetic Architecture', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Architectural design inspired by the forms and processes found in biological systems.',
        recipe: ['theory_architecture', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 2.4 }
    },
    paradigm_dynamic_environments: {
        id: 'paradigm_dynamic_environments', name: 'Paradigm: Dynamic Environments', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Creating architectural spaces that evolve and respond to changing conditions and user needs.',
        recipe: ['theory_architecture', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 2.6 }
    },
    paradigm_generative_design: {
        id: 'paradigm_generative_design', name: 'Paradigm: Generative Design', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using computational algorithms to explore and generate novel architectural forms and structures.',
        recipe: ['theory_architecture', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 2.8 }
    },
    paradigm_cybernetic_consciousness: { 
        id: 'paradigm_cybernetic_consciousness', name: 'Paradigm: Cybernetic Consciousness', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Exploring the nature of consciousness through control systems and metaphysical potential.',
        recipe: ['theory_metaphysics', 'theory_cybernetics'],
        attributes: { ft_bonus_per_sec: 2.5 } 
    },
    paradigm_cosmic_potentiality: { 
        id: 'paradigm_cosmic_potentiality', name: 'Paradigm: Cosmic Potentiality', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The universe as a realm of infinite potential governed by metaphysical and cosmological laws.',
        recipe: ['theory_metaphysics', 'theory_cosmology'],
        attributes: { ft_bonus_per_sec: 2.8 } 
    },
    paradigm_ontological_potential: { 
        id: 'paradigm_ontological_potential', name: 'Paradigm: Ontological Potential', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The inherent potential within being and existence, a core metaphysical inquiry.',
        recipe: ['theory_metaphysics', 'theory_ontology'],
        attributes: { ft_bonus_per_sec: 2.6 } 
    },
    paradigm_thermodynamic_idealism: { 
        id: 'paradigm_thermodynamic_idealism', name: 'Paradigm: Thermodynamic Idealism', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A worldview where energy and potential are primary, governed by thermodynamic and metaphysical laws.',
        recipe: ['theory_metaphysics', 'theory_thermodynamics'],
        attributes: { ft_bonus_per_sec: 2.9 } 
    },
    paradigm_transcendental_engineering: { 
        id: 'paradigm_transcendental_engineering', name: 'Paradigm: Transcendental Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Engineering creations that tap into or reflect deeper metaphysical potentials.',
        recipe: ['theory_metaphysics', 'theory_engineering'],
        attributes: { ft_bonus_per_sec: 3.0 } 
    },
    paradigm_quantum_metaphysics: { 
        id: 'paradigm_quantum_metaphysics', name: 'Paradigm: Quantum Metaphysics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The intersection of quantum physics and metaphysical inquiries into reality and potential.',
        recipe: ['theory_metaphysics', 'theory_physics'],
        attributes: { ft_bonus_per_sec: 3.1 } 
    },
    paradigm_aesthetic_idealism: { 
        id: 'paradigm_aesthetic_idealism', name: 'Paradigm: Aesthetic Idealism', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Beauty as a manifestation of underlying metaphysical truths and potentials.',
        recipe: ['theory_metaphysics', 'theory_aesthetics'],
        attributes: { ft_bonus_per_sec: 2.4 } 
    },
    paradigm_informational_potential: { 
        id: 'paradigm_informational_potential', name: 'Paradigm: Informational Potential', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The universe of information as a realm of untapped metaphysical potential.',
        recipe: ['theory_metaphysics', 'theory_information'],
        attributes: { ft_bonus_per_sec: 2.7 } 
    },
    paradigm_logical_positivism_reimagined: { 
        id: 'paradigm_logical_positivism_reimagined', name: 'Paradigm: Logical Positivism Reimagined', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A fusion of logical rigor with the exploration of metaphysical potential.',
        recipe: ['theory_metaphysics', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 2.8 } 
    },
    paradigm_developmental_metaphysics: { 
        id: 'paradigm_developmental_metaphysics', name: 'Paradigm: Developmental Metaphysics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Understanding form development through the lens of inherent potential and metaphysical principles.',
        recipe: ['theory_metaphysics', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 2.5 } 
    },
    paradigm_systemic_potential: { 
        id: 'paradigm_systemic_potential', name: 'Paradigm: Systemic Potential', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The inherent potential for change and evolution within complex dynamic systems.',
        recipe: ['theory_metaphysics', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 2.7 } 
    },
    paradigm_computational_metaphysics: { 
        id: 'paradigm_computational_metaphysics', name: 'Paradigm: Computational Metaphysics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using computation to explore and model metaphysical concepts and potentials.',
        recipe: ['theory_metaphysics', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 2.9 } 
    },
    paradigm_cosmic_cybernetics: { 
        id: 'paradigm_cosmic_cybernetics', name: 'Paradigm: Cosmic Cybernetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The universe as a vast, self-regulating cybernetic system.',
        recipe: ['theory_cybernetics', 'theory_cosmology'],
        attributes: { ft_bonus_per_sec: 2.9 } 
    },
    paradigm_ontological_cybernetics: { 
        id: 'paradigm_ontological_cybernetics', name: 'Paradigm: Ontological Cybernetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of being and existence through the lens of control and communication systems.',
        recipe: ['theory_cybernetics', 'theory_ontology'],
        attributes: { ft_bonus_per_sec: 2.7 } 
    },
    paradigm_thermodynamic_control: { 
        id: 'paradigm_thermodynamic_control', name: 'Paradigm: Thermodynamic Control', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying cybernetic principles to manage and optimize energy systems.',
        recipe: ['theory_cybernetics', 'theory_thermodynamics'],
        attributes: { ft_bonus_per_sec: 3.0 } 
    },
    paradigm_advanced_robotics: { 
        id: 'paradigm_advanced_robotics', name: 'Paradigm: Advanced Robotics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The pinnacle of engineering autonomous systems with sophisticated control.',
        recipe: ['theory_cybernetics', 'theory_engineering'],
        attributes: { ft_bonus_per_sec: 3.1 } 
    },
    paradigm_physical_systems_control: { 
        id: 'paradigm_physical_systems_control', name: 'Paradigm: Physical Systems Control', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Controlling physical phenomena through cybernetic understanding of underlying laws.',
        recipe: ['theory_cybernetics', 'theory_physics'],
        attributes: { ft_bonus_per_sec: 3.2 } 
    },
    paradigm_aesthetic_interaction: { 
        id: 'paradigm_aesthetic_interaction', name: 'Paradigm: Aesthetic Interaction', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Designing interactive systems where control and feedback contribute to aesthetic experience.',
        recipe: ['theory_cybernetics', 'theory_aesthetics'],
        attributes: { ft_bonus_per_sec: 2.6 } 
    },
    paradigm_information_control_systems: { 
        id: 'paradigm_information_control_systems', name: 'Paradigm: Information Control Systems', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The design and management of systems that control the flow and processing of information.',
        recipe: ['theory_cybernetics', 'theory_information'],
        attributes: { ft_bonus_per_sec: 2.8 } 
    },
    paradigm_logical_control: { 
        id: 'paradigm_logical_control', name: 'Paradigm: Logical Control', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying formal logic to the design and verification of control systems.',
        recipe: ['theory_cybernetics', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 2.9 } 
    },
    paradigm_bio_cybernetics: { 
        id: 'paradigm_bio_cybernetics', name: 'Paradigm: Bio-Cybernetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of control systems in living organisms and the application of biological principles to cybernetics.',
        recipe: ['theory_cybernetics', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 2.7 } 
    },
    paradigm_socio_technical_systems: { 
        id: 'paradigm_socio_technical_systems', name: 'Paradigm: Socio-Technical Systems', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Understanding complex systems involving interactions between social structures and technological controls.',
        recipe: ['theory_cybernetics', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 2.8 } 
    },
    paradigm_artificial_intelligence_foundations: { 
        id: 'paradigm_artificial_intelligence_foundations', name: 'Paradigm: Artificial Intelligence Foundations', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The core principles of AI, rooted in computational control and feedback systems.',
        recipe: ['theory_cybernetics', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.0 } 
    },
    paradigm_ontological_cosmology: { 
        id: 'paradigm_ontological_cosmology', name: 'Paradigm: Ontological Cosmology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Exploring the nature of being within the context of the universe\'s origin and evolution.',
        recipe: ['theory_cosmology', 'theory_ontology'],
        attributes: { ft_bonus_per_sec: 3.1 } 
    },
    paradigm_cosmic_thermodynamics: { 
        id: 'paradigm_cosmic_thermodynamics', name: 'Paradigm: Cosmic Thermodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The application of thermodynamic laws to the universe as a whole, including its heat death.',
        recipe: ['theory_cosmology', 'theory_thermodynamics'],
        attributes: { ft_bonus_per_sec: 3.4 } 
    },
    paradigm_astro_engineering: { 
        id: 'paradigm_astro_engineering', name: 'Paradigm: Astro-Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The hypothetical engineering of structures and systems on a cosmic scale.',
        recipe: ['theory_cosmology', 'theory_engineering'],
        attributes: { ft_bonus_per_sec: 3.5 } 
    },
    paradigm_grand_unification_theory: { 
        id: 'paradigm_grand_unification_theory', name: 'Paradigm: Grand Unification', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A model in which the three gauge interactions of the Standard Model are merged into one single force.',
        recipe: ['theory_cosmology', 'theory_physics'],
        attributes: { ft_bonus_per_sec: 3.6 } 
    },
    paradigm_cosmic_aesthetics: { 
        id: 'paradigm_cosmic_aesthetics', name: 'Paradigm: Cosmic Aesthetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The appreciation of beauty and order on a universal, cosmological scale.',
        recipe: ['theory_cosmology', 'theory_aesthetics'],
        attributes: { ft_bonus_per_sec: 2.8 } 
    },
    paradigm_cosmic_information_density: { 
        id: 'paradigm_cosmic_information_density', name: 'Paradigm: Cosmic Information Density', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Exploring the information content of the universe and its evolution.',
        recipe: ['theory_cosmology', 'theory_information'],
        attributes: { ft_bonus_per_sec: 3.2 } 
    },
    paradigm_cosmological_argument_revisited: { 
        id: 'paradigm_cosmological_argument_revisited', name: 'Paradigm: Cosmological Argument', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A logical re-examination of arguments for the existence of a first cause, based on modern cosmology.',
        recipe: ['theory_cosmology', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 3.3 } 
    },
    paradigm_astrobiology: { 
        id: 'paradigm_astrobiology', name: 'Paradigm: Astrobiology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of the origin, evolution, distribution, and future of life in the universe.',
        recipe: ['theory_cosmology', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 3.0 } 
    },
    paradigm_universal_evolution: { 
        id: 'paradigm_universal_evolution', name: 'Paradigm: Universal Evolution', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Viewing the universe as a dynamically evolving system from the Big Bang to the present.',
        recipe: ['theory_cosmology', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 3.2 } 
    },
    paradigm_computational_cosmology: { 
        id: 'paradigm_computational_cosmology', name: 'Paradigm: Computational Cosmology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using large-scale simulations to model the formation and evolution of cosmic structures.',
        recipe: ['theory_cosmology', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.4 } 
    },
    paradigm_thermodynamic_being: { 
        id: 'paradigm_thermodynamic_being', name: 'Paradigm: Thermodynamic Being', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Exploring existence through the lens of energy, entropy, and thermodynamic principles.',
        recipe: ['theory_ontology', 'theory_thermodynamics'],
        attributes: { ft_bonus_per_sec: 3.2 } 
    },
    paradigm_existential_engineering: { 
        id: 'paradigm_existential_engineering', name: 'Paradigm: Existential Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Engineering systems or experiences that engage with fundamental questions of being.',
        recipe: ['theory_ontology', 'theory_engineering'],
        attributes: { ft_bonus_per_sec: 3.3 } 
    },
    paradigm_physical_ontology: { 
        id: 'paradigm_physical_ontology', name: 'Paradigm: Physical Ontology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of the fundamental constituents of physical reality.',
        recipe: ['theory_ontology', 'theory_physics'],
        attributes: { ft_bonus_per_sec: 3.4 } 
    },
    paradigm_ontological_aesthetics: { 
        id: 'paradigm_ontological_aesthetics', name: 'Paradigm: Ontological Aesthetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The nature of beauty as it relates to the fundamental nature of being.',
        recipe: ['theory_ontology', 'theory_aesthetics'],
        attributes: { ft_bonus_per_sec: 2.9 } 
    },
    paradigm_informational_ontology: { 
        id: 'paradigm_informational_ontology', name: 'Paradigm: Informational Ontology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of information as a fundamental aspect of existence.',
        recipe: ['theory_ontology', 'theory_information'],
        attributes: { ft_bonus_per_sec: 3.1 } 
    },
    paradigm_formal_ontology: { 
        id: 'paradigm_formal_ontology', name: 'Paradigm: Formal Ontology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying formal logic to categorize and define the types of entities that exist.',
        recipe: ['theory_ontology', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 3.2 } 
    },
    paradigm_biological_ontology: { 
        id: 'paradigm_biological_ontology', name: 'Paradigm: Biological Ontology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Classifying and defining the forms and types of being within the biological realm.',
        recipe: ['theory_ontology', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 3.0 } 
    },
    paradigm_systemic_ontology: { 
        id: 'paradigm_systemic_ontology', name: 'Paradigm: Systemic Ontology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Understanding existence as emergent from the interactions within dynamic systems.',
        recipe: ['theory_ontology', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 3.1 } 
    },
    paradigm_computational_ontology: { 
        id: 'paradigm_computational_ontology', name: 'Paradigm: Computational Ontology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using computational models to represent and reason about categories of being.',
        recipe: ['theory_ontology', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.3 } 
    },
    paradigm_applied_thermodynamics: { 
        id: 'paradigm_applied_thermodynamics', name: 'Paradigm: Applied Thermodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The practical application of thermodynamic principles in engineering design and processes.',
        recipe: ['theory_thermodynamics', 'theory_engineering'],
        attributes: { ft_bonus_per_sec: 3.6 } 
    },
    paradigm_statistical_mechanics: { 
        id: 'paradigm_statistical_mechanics', name: 'Paradigm: Statistical Mechanics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Deriving macroscopic thermodynamic properties from the statistical behavior of microscopic physical constituents.',
        recipe: ['theory_thermodynamics', 'theory_physics'],
        attributes: { ft_bonus_per_sec: 3.7 } 
    },
    paradigm_aesthetic_energy: { 
        id: 'paradigm_aesthetic_energy', name: 'Paradigm: Aesthetic Energy', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The perception of energy and flow as components of aesthetic experience.',
        recipe: ['theory_thermodynamics', 'theory_aesthetics'],
        attributes: { ft_bonus_per_sec: 3.1 } 
    },
    paradigm_information_thermodynamics: { 
        id: 'paradigm_information_thermodynamics', name: 'Paradigm: Information Thermodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of the connections between information theory and thermodynamics, including Maxwell\'s Demon.',
        recipe: ['theory_thermodynamics', 'theory_information'],
        attributes: { ft_bonus_per_sec: 3.5 } 
    },
    paradigm_logical_foundations_of_thermo: { 
        id: 'paradigm_logical_foundations_of_thermo', name: 'Paradigm: Thermodynamic Logic', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A rigorous, logical axiomatization of the laws of thermodynamics.',
        recipe: ['theory_thermodynamics', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 3.6 } 
    },
    paradigm_bioenergetics: { 
        id: 'paradigm_bioenergetics', name: 'Paradigm: Bioenergetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of energy transformations in living organisms and their forms.',
        recipe: ['theory_thermodynamics', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 3.4 } 
    },
    paradigm_non_equilibrium_thermodynamics: { 
        id: 'paradigm_non_equilibrium_thermodynamics', name: 'Paradigm: Non-Equilibrium Systems', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of thermodynamic systems that are not in thermodynamic equilibrium but evolve dynamically.',
        recipe: ['theory_thermodynamics', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 3.5 } 
    },
    paradigm_computational_thermodynamics: { 
        id: 'paradigm_computational_thermodynamics', name: 'Paradigm: Computational Thermodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using computational methods to model and predict thermodynamic properties and phase equilibria.',
        recipe: ['theory_thermodynamics', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.7 } 
    },
    paradigm_physical_engineering: { 
        id: 'paradigm_physical_engineering', name: 'Paradigm: Physical Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Engineering disciplines directly applying principles of physics, like mechanical or electrical engineering.',
        recipe: ['theory_engineering', 'theory_physics'],
        attributes: { ft_bonus_per_sec: 3.8 } 
    },
    paradigm_functional_aesthetics: { 
        id: 'paradigm_functional_aesthetics', name: 'Paradigm: Functional Aesthetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The design philosophy where the aesthetic appeal of an object is derived from its fitness for purpose.',
        recipe: ['theory_engineering', 'theory_aesthetics'],
        attributes: { ft_bonus_per_sec: 3.2 } 
    },
    paradigm_knowledge_engineering: { 
        id: 'paradigm_knowledge_engineering', name: 'Paradigm: Knowledge Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The discipline of building and maintaining knowledge-based systems by applying engineering principles.',
        recipe: ['theory_engineering', 'theory_information'],
        attributes: { ft_bonus_per_sec: 3.6 } 
    },
    paradigm_formal_methods_in_engineering: { 
        id: 'paradigm_formal_methods_in_engineering', name: 'Paradigm: Formal Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Mathematically rigorous techniques for the specification, development, and verification of engineered systems.',
        recipe: ['theory_engineering', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 3.7 } 
    },
    paradigm_bio_engineering: { 
        id: 'paradigm_bio_engineering', name: 'Paradigm: Bio-Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying engineering principles to biological systems and forms, including prosthetics and tissue engineering.',
        recipe: ['theory_engineering', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 3.5 } 
    },
    paradigm_systems_engineering: { 
        id: 'paradigm_systems_engineering', name: 'Paradigm: Systems Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'An interdisciplinary field of engineering focusing on how to design and manage complex engineering systems over their life cycles.',
        recipe: ['theory_engineering', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 3.6 } 
    },
    paradigm_software_engineering_mastery: { 
        id: 'paradigm_software_engineering_mastery', name: 'Paradigm: Software Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The systematic application of engineering principles to the design, development, and maintenance of software.',
        recipe: ['theory_engineering', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.8 } 
    },
    paradigm_aesthetic_relativity: { 
        id: 'paradigm_aesthetic_relativity', name: 'Paradigm: Aesthetic Relativity', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Exploring the beauty and elegance found within the laws of physics, particularly relativity.',
        recipe: ['theory_physics', 'theory_aesthetics'],
        attributes: { ft_bonus_per_sec: 3.3 } 
    },
    paradigm_quantum_information_science: { 
        id: 'paradigm_quantum_information_science', name: 'Paradigm: Quantum Information', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'An interdisciplinary field that seeks to understand how information can be processed using quantum mechanical systems.',
        recipe: ['theory_physics', 'theory_information'],
        attributes: { ft_bonus_per_sec: 3.7 } 
    },
    paradigm_logical_foundations_of_physics: { 
        id: 'paradigm_logical_foundations_of_physics', name: 'Paradigm: Physical Logic', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Investigating the logical and mathematical underpinnings of physical theories.',
        recipe: ['theory_physics', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 3.8 } 
    },
    paradigm_biophysics: { 
        id: 'paradigm_biophysics', name: 'Paradigm: Biophysics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying the theories and methods of physics to understand biological systems and their forms.',
        recipe: ['theory_physics', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 3.6 } 
    },
    paradigm_chaotic_systems_physics: { 
        id: 'paradigm_chaotic_systems_physics', name: 'Paradigm: Chaotic Systems', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of dynamic systems highly sensitive to initial conditions, governed by physical laws.',
        recipe: ['theory_physics', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 3.7 } 
    },
    paradigm_computational_physics: { 
        id: 'paradigm_computational_physics', name: 'Paradigm: Computational Physics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study and implementation of numerical analysis to solve problems in physics for which a quantitative theory already exists.',
        recipe: ['theory_physics', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.9 } 
    },
    paradigm_informational_aesthetics: { 
        id: 'paradigm_informational_aesthetics', name: 'Paradigm: Informational Aesthetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of aesthetic properties of information, data visualization, and communication.',
        recipe: ['theory_aesthetics', 'theory_information'],
        attributes: { ft_bonus_per_sec: 2.9 } 
    },
    paradigm_logical_aesthetics: { 
        id: 'paradigm_logical_aesthetics', name: 'Paradigm: Logical Aesthetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Exploring the beauty inherent in logical structures, mathematical proofs, and elegant arguments.',
        recipe: ['theory_aesthetics', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 3.0 } 
    },
    paradigm_morphological_beauty: { 
        id: 'paradigm_morphological_beauty', name: 'Paradigm: Morphological Beauty', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The aesthetic appreciation of natural forms and the principles governing their development.',
        recipe: ['theory_aesthetics', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 2.8 } 
    },
    paradigm_dynamic_art_forms: { 
        id: 'paradigm_dynamic_art_forms', name: 'Paradigm: Dynamic Art Forms', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Art that incorporates change, evolution, and interaction over time, governed by systemic principles.',
        recipe: ['theory_aesthetics', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 2.9 } 
    },
    paradigm_computational_aesthetics: { 
        id: 'paradigm_computational_aesthetics', name: 'Paradigm: Computational Aesthetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using computational methods to generate, analyze, and understand aesthetic phenomena.',
        recipe: ['theory_aesthetics', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.1 } 
    },
    paradigm_logical_information_theory: { 
        id: 'paradigm_logical_information_theory', name: 'Paradigm: Logical Information Theory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A formal, logical approach to the quantification and manipulation of information.',
        recipe: ['theory_information', 'theory_logic'],
        attributes: { ft_bonus_per_sec: 3.4 } 
    },
    paradigm_bio_informatics: { 
        id: 'paradigm_bio_informatics', name: 'Paradigm: Bio-Informatics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying information science to understand biological data, including genetic sequences and protein structures.',
        recipe: ['theory_information', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 3.2 } 
    },
    paradigm_information_systems_dynamics: { 
        id: 'paradigm_information_systems_dynamics', name: 'Paradigm: Information Systems Dynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Modeling the flow and transformation of information within complex, evolving systems.',
        recipe: ['theory_information', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 3.3 } 
    },
    paradigm_theoretical_computer_science: { 
        id: 'paradigm_theoretical_computer_science', name: 'Paradigm: Theoretical Computer Science', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The mathematical foundations of computation and information processing.',
        recipe: ['theory_information', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.5 } 
    },
    paradigm_morphological_logic: { 
        id: 'paradigm_morphological_logic', name: 'Paradigm: Morphological Logic', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying logical principles to analyze and categorize forms and their development.',
        recipe: ['theory_logic', 'theory_morphology'],
        attributes: { ft_bonus_per_sec: 3.1 } 
    },
    paradigm_formal_systems_theory: { 
        id: 'paradigm_formal_systems_theory', name: 'Paradigm: Formal Systems Theory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'A rigorous, logic-based approach to understanding the behavior of dynamic systems.',
        recipe: ['theory_logic', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 3.2 } 
    },
    paradigm_computational_logic: { 
        id: 'paradigm_computational_logic', name: 'Paradigm: Computational Logic', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The use of logic in computer science, including automated reasoning and program verification.',
        recipe: ['theory_logic', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.4 } 
    },
    paradigm_dynamic_morphogenesis: { 
        id: 'paradigm_dynamic_morphogenesis', name: 'Paradigm: Dynamic Morphogenesis', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The study of how biological forms develop and change through dynamic systemic interactions.',
        recipe: ['theory_morphology', 'theory_system_dynamics'],
        attributes: { ft_bonus_per_sec: 3.1 } 
    },
    paradigm_computational_morphology: { 
        id: 'paradigm_computational_morphology', name: 'Paradigm: Computational Morphology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using computational models to simulate and understand the development of form.',
        recipe: ['theory_morphology', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.3 } 
    },
    paradigm_large_scale_simulation: { 
        id: 'paradigm_large_scale_simulation', name: 'Paradigm: Large-Scale Simulation', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The use of high-performance computing to model and predict the behavior of vast, complex dynamic systems.',
        recipe: ['theory_system_dynamics', 'theory_computation'],
        attributes: { ft_bonus_per_sec: 3.5 } 
    }
};

// Ensures all ideas have a unique ID and an attributes object
Object.keys(IDEAS_DATA).forEach(key => {
    if (!IDEAS_DATA[key].id) IDEAS_DATA[key].id = key;
    if (!IDEAS_DATA[key].attributes) IDEAS_DATA[key].attributes = {};
});
