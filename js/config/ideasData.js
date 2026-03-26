// js/config/ideasData.js

/**
 * Defines all discoverable ideas in the game.
 *
 * Tier 0 : Thoughts          — the base currency
 * Tier 1 : Concepts (4)      — Matter, Energy, Information, Time
 * Tier 2 : Insights (6)      — all C(4,2) pairs of concepts
 * Tier 3 : Theories (15)     — all C(6,2) pairs of insights
 * Tier 4 : Paradigms (105)   — all C(15,2) pairs of theories
 */
const IDEAS_DATA = {

    // =========================================================================
    // Tier 0 — Base Currency
    // =========================================================================
    thought: {
        id: 'thought', name: 'Thought', tier: 0,
        color: '#cccccc', shape: 'dot',
        description: 'A raw, unrefined spark of mental potential. The seed of all understanding.'
    },

    // =========================================================================
    // Tier 1 — Base Concepts
    // =========================================================================
    concept_matter: {
        id: 'concept_matter', name: 'Concept: Matter', tier: 1, group: 'concept',
        color: { background: '#ef5350', border: '#b71c1c' }, shape: 'ellipse',
        description: 'The substance of the universe — atoms, molecules, and everything with mass and volume.',
        attributes: { thought_bonus_per_sec: 0.01 }
    },
    concept_energy: {
        id: 'concept_energy', name: 'Concept: Energy', tier: 1, group: 'concept',
        color: { background: '#ffa726', border: '#e65100' }, shape: 'ellipse',
        description: 'The capacity to do work or cause change — heat, light, motion, and force.',
        attributes: { thought_bonus_per_sec: 0.01 }
    },
    concept_information: {
        id: 'concept_information', name: 'Concept: Information', tier: 1, group: 'concept',
        color: { background: '#29b6f6', border: '#01579b' }, shape: 'ellipse',
        description: 'Patterns, signals, and structure that carry meaning — the fabric of knowledge itself.',
        attributes: { thought_bonus_per_sec: 0.01 }
    },
    concept_time: {
        id: 'concept_time', name: 'Concept: Time', tier: 1, group: 'concept',
        color: { background: '#66bb6a', border: '#1b5e20' }, shape: 'ellipse',
        description: 'The dimension through which change unfolds — the arrow that gives causality its direction.',
        attributes: { thought_bonus_per_sec: 0.01 }
    },

    // =========================================================================
    // Tier 2 — Insights   (C(4,2) = 6 pairs)
    // Matter+Energy, Matter+Information, Matter+Time,
    // Energy+Information, Energy+Time, Information+Time
    // =========================================================================
    insight_thermodynamics: {
        id: 'insight_thermodynamics', name: 'Insight: Thermodynamics', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17' } }, shape: 'diamond',
        description: 'The laws governing the exchange of energy and matter — heat flow, work, and the universal drive toward equilibrium.',
        recipe: ['concept_matter', 'concept_energy'],
        attributes: { thought_bonus_per_sec: 0.10 }
    },
    insight_structure: {
        id: 'insight_structure', name: 'Insight: Structure', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17' } }, shape: 'diamond',
        description: 'The realisation that information is always encoded in a physical substrate — form and data are inseparable.',
        recipe: ['concept_matter', 'concept_information'],
        attributes: { thought_bonus_per_sec: 0.10 }
    },
    insight_entropy: {
        id: 'insight_entropy', name: 'Insight: Entropy', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17' } }, shape: 'diamond',
        description: 'The tendency of matter to disperse and disorder as time progresses — the measure of irreversible change.',
        recipe: ['concept_matter', 'concept_time'],
        attributes: { thought_bonus_per_sec: 0.10 }
    },
    insight_signal: {
        id: 'insight_signal', name: 'Insight: Signal', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17' } }, shape: 'diamond',
        description: 'Energy harnessed to carry information — the principle behind every wave, transmission, and communication.',
        recipe: ['concept_energy', 'concept_information'],
        attributes: { thought_bonus_per_sec: 0.10 }
    },
    insight_dynamics: {
        id: 'insight_dynamics', name: 'Insight: Dynamics', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17' } }, shape: 'diamond',
        description: 'Energy expressed across time — the study of motion, force, and how systems evolve from one state to another.',
        recipe: ['concept_energy', 'concept_time'],
        attributes: { thought_bonus_per_sec: 0.10 }
    },
    insight_memory: {
        id: 'insight_memory', name: 'Insight: Memory', tier: 2, group: 'insight',
        color: { background: '#ffee58', border: '#f57f17', highlight: { background: '#fff59d', border: '#f57f17' } }, shape: 'diamond',
        description: 'Information that persists through time — the foundation of learning, history, and identity.',
        recipe: ['concept_information', 'concept_time'],
        attributes: { thought_bonus_per_sec: 0.10 }
    },

    // =========================================================================
    // Tier 3 — Theories   (C(6,2) = 15 pairs)
    // =========================================================================
    theory_materials_science: {
        id: 'theory_materials_science', name: 'Theory: Materials Science', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The study of how physical structure and thermal properties together determine the behaviour of materials.',
        recipe: ['insight_thermodynamics', 'insight_structure'],
        attributes: { thought_bonus_per_sec: 0.50 }
    },
    theory_statistical_mechanics: {
        id: 'theory_statistical_mechanics', name: 'Theory: Statistical Mechanics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'Bridging thermodynamic laws and entropy by describing macroscopic phenomena through the statistical behaviour of vast numbers of particles.',
        recipe: ['insight_thermodynamics', 'insight_entropy'],
        attributes: { thought_bonus_per_sec: 0.52 }
    },
    theory_electromagnetic_theory: {
        id: 'theory_electromagnetic_theory', name: 'Theory: Electromagnetism', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The unified framework in which thermal radiation and signal propagation are understood as manifestations of the same electromagnetic field.',
        recipe: ['insight_thermodynamics', 'insight_signal'],
        attributes: { thought_bonus_per_sec: 0.55 }
    },
    theory_classical_mechanics: {
        id: 'theory_classical_mechanics', name: 'Theory: Classical Mechanics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The laws governing energy and dynamics — motion, force, and the predictable trajectories of bodies through time.',
        recipe: ['insight_thermodynamics', 'insight_dynamics'],
        attributes: { thought_bonus_per_sec: 0.54 }
    },
    theory_chemical_kinetics: {
        id: 'theory_chemical_kinetics', name: 'Theory: Chemical Kinetics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'How thermodynamic energy drives reactions whose rates and pathways are recorded in molecular memory over time.',
        recipe: ['insight_thermodynamics', 'insight_memory'],
        attributes: { thought_bonus_per_sec: 0.51 }
    },
    theory_geology: {
        id: 'theory_geology', name: 'Theory: Geology', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The structured record of Earth\'s entropic history — rocks as information written by deep time.',
        recipe: ['insight_structure', 'insight_entropy'],
        attributes: { thought_bonus_per_sec: 0.50 }
    },
    theory_crystallography: {
        id: 'theory_crystallography', name: 'Theory: Crystallography', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The science of how physical structure encodes information in repeating atomic lattices — the language of minerals.',
        recipe: ['insight_structure', 'insight_signal'],
        attributes: { thought_bonus_per_sec: 0.53 }
    },
    theory_fluid_dynamics: {
        id: 'theory_fluid_dynamics', name: 'Theory: Fluid Dynamics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The dynamic behaviour of structured matter in motion — how form and flow interact in liquids and gases.',
        recipe: ['insight_structure', 'insight_dynamics'],
        attributes: { thought_bonus_per_sec: 0.56 }
    },
    theory_archaeology: {
        id: 'theory_archaeology', name: 'Theory: Archaeology', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'Reading the structured memory of humanity — recovering information about the past from physical remains.',
        recipe: ['insight_structure', 'insight_memory'],
        attributes: { thought_bonus_per_sec: 0.50 }
    },
    theory_information_theory: {
        id: 'theory_information_theory', name: 'Theory: Information Theory', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'Shannon\'s formal treatment of signal and entropy — quantifying the capacity to communicate in the face of noise.',
        recipe: ['insight_entropy', 'insight_signal'],
        attributes: { thought_bonus_per_sec: 0.60 }
    },
    theory_chaos_theory: {
        id: 'theory_chaos_theory', name: 'Theory: Chaos Theory', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The study of entropic dynamics — how deterministic systems produce unpredictable, sensitive-to-initial-conditions behaviour.',
        recipe: ['insight_entropy', 'insight_dynamics'],
        attributes: { thought_bonus_per_sec: 0.58 }
    },
    theory_evolutionary_theory: {
        id: 'theory_evolutionary_theory', name: 'Theory: Evolutionary Theory', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'How entropic variation accumulates in biological memory over time, driving the diversification of life.',
        recipe: ['insight_entropy', 'insight_memory'],
        attributes: { thought_bonus_per_sec: 0.57 }
    },
    theory_wave_mechanics: {
        id: 'theory_wave_mechanics', name: 'Theory: Wave Mechanics', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The mathematics of signals propagating dynamically through media — unifying sound, light, and quantum wavefunctions.',
        recipe: ['insight_signal', 'insight_dynamics'],
        attributes: { thought_bonus_per_sec: 0.61 }
    },
    theory_cognitive_science: {
        id: 'theory_cognitive_science', name: 'Theory: Cognitive Science', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The interdisciplinary study of how signals are processed and stored as memory — the science of the mind.',
        recipe: ['insight_signal', 'insight_memory'],
        attributes: { thought_bonus_per_sec: 0.62 }
    },
    theory_historiography: {
        id: 'theory_historiography', name: 'Theory: Historiography', tier: 3, group: 'theory',
        color: { background: '#ab47bc', border: '#4a148c' }, shape: 'star',
        description: 'The study of how dynamic processes leave memory — the methodology of constructing historical narrative from evidence.',
        recipe: ['insight_dynamics', 'insight_memory'],
        attributes: { thought_bonus_per_sec: 0.51 }
    },

    // =========================================================================
    // Tier 4 — Paradigms   (C(15,2) = 105 pairs)
    // =========================================================================

    // --- Materials Science pairings (14) ---
    paradigm_condensed_matter_physics: {
        id: 'paradigm_condensed_matter_physics', name: 'Paradigm: Condensed Matter Physics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The quantum statistical framework describing how matter organises at high density — superconductors, magnets, and phase transitions.',
        recipe: ['theory_materials_science', 'theory_statistical_mechanics'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_photonics: {
        id: 'paradigm_photonics', name: 'Paradigm: Photonics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Engineering the interaction of light with matter — lasers, fibre optics, and photonic crystals.',
        recipe: ['theory_materials_science', 'theory_electromagnetic_theory'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },
    paradigm_structural_engineering: {
        id: 'paradigm_structural_engineering', name: 'Paradigm: Structural Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying the mechanical laws of materials science to design structures that safely bear loads.',
        recipe: ['theory_materials_science', 'theory_classical_mechanics'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_metallurgy: {
        id: 'paradigm_metallurgy', name: 'Paradigm: Metallurgy', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The science of extracting, alloying, and shaping metals by mastering their chemical and material properties.',
        recipe: ['theory_materials_science', 'theory_chemical_kinetics'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_geomaterials: {
        id: 'paradigm_geomaterials', name: 'Paradigm: Geomaterials', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Understanding the material properties of rocks, soils, and minerals that compose the Earth.',
        recipe: ['theory_materials_science', 'theory_geology'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_solid_state_physics: {
        id: 'paradigm_solid_state_physics', name: 'Paradigm: Solid State Physics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The physics of crystalline and amorphous solids — the foundation of semiconductors and modern electronics.',
        recipe: ['theory_materials_science', 'theory_crystallography'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_rheology: {
        id: 'paradigm_rheology', name: 'Paradigm: Rheology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The science of flow and deformation in complex materials — bridging solid mechanics and fluid dynamics.',
        recipe: ['theory_materials_science', 'theory_fluid_dynamics'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_archaeomaterials: {
        id: 'paradigm_archaeomaterials', name: 'Paradigm: Archaeomaterials', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Analysing the physical and chemical composition of ancient artefacts to reconstruct past technologies.',
        recipe: ['theory_materials_science', 'theory_archaeology'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_data_storage: {
        id: 'paradigm_data_storage', name: 'Paradigm: Data Storage', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Encoding information in physical substrates — from magnetic tape to solid-state drives and DNA.',
        recipe: ['theory_materials_science', 'theory_information_theory'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_fracture_mechanics: {
        id: 'paradigm_fracture_mechanics', name: 'Paradigm: Fracture Mechanics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The chaotic propagation of cracks in materials — predicting when structures will catastrophically fail.',
        recipe: ['theory_materials_science', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },
    paradigm_biomimetics: {
        id: 'paradigm_biomimetics', name: 'Paradigm: Biomimetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Engineering novel materials and structures by copying solutions that evolutionary biology has already optimised.',
        recipe: ['theory_materials_science', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_acoustics_engineering: {
        id: 'paradigm_acoustics_engineering', name: 'Paradigm: Acoustics Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Designing materials and spaces that control wave propagation — from concert halls to noise-cancelling foams.',
        recipe: ['theory_materials_science', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },
    paradigm_neuroprosthetics: {
        id: 'paradigm_neuroprosthetics', name: 'Paradigm: Neuroprosthetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Interfacing engineered materials with the nervous system to restore or augment sensory and motor function.',
        recipe: ['theory_materials_science', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_industrial_heritage: {
        id: 'paradigm_industrial_heritage', name: 'Paradigm: Industrial Heritage', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Preserving the material legacy of industrialisation — understanding how past technologies shaped the modern world.',
        recipe: ['theory_materials_science', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },

    // --- Statistical Mechanics pairings (13) ---
    paradigm_plasma_physics: {
        id: 'paradigm_plasma_physics', name: 'Paradigm: Plasma Physics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The statistical mechanics of ionised gases — the fourth state of matter, governing stars and fusion reactors.',
        recipe: ['theory_statistical_mechanics', 'theory_electromagnetic_theory'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_kinetic_theory: {
        id: 'paradigm_kinetic_theory', name: 'Paradigm: Kinetic Theory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Deriving macroscopic mechanical properties from the statistical dynamics of microscopic particles.',
        recipe: ['theory_statistical_mechanics', 'theory_classical_mechanics'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_physical_chemistry: {
        id: 'paradigm_physical_chemistry', name: 'Paradigm: Physical Chemistry', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Explaining chemical phenomena through statistical mechanics and thermodynamics.',
        recipe: ['theory_statistical_mechanics', 'theory_chemical_kinetics'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_geophysics: {
        id: 'paradigm_geophysics', name: 'Paradigm: Geophysics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying statistical and physical laws to understand the Earth\'s interior, gravity, and magnetic field.',
        recipe: ['theory_statistical_mechanics', 'theory_geology'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_lattice_dynamics: {
        id: 'paradigm_lattice_dynamics', name: 'Paradigm: Lattice Dynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The statistical mechanics of atomic vibrations in crystals — phonons, heat capacity, and thermal conductivity.',
        recipe: ['theory_statistical_mechanics', 'theory_crystallography'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_turbulence_theory: {
        id: 'paradigm_turbulence_theory', name: 'Paradigm: Turbulence Theory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The statistical description of chaotic fluid flow — one of the last unsolved problems in classical physics.',
        recipe: ['theory_statistical_mechanics', 'theory_fluid_dynamics'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_geochronology: {
        id: 'paradigm_geochronology', name: 'Paradigm: Geochronology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using statistical decay rates of isotopes to date rocks and archaeological deposits with precision.',
        recipe: ['theory_statistical_mechanics', 'theory_archaeology'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },
    paradigm_algorithmic_complexity: {
        id: 'paradigm_algorithmic_complexity', name: 'Paradigm: Algorithmic Complexity', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Kolmogorov complexity and statistical compression — the deep link between entropy and the minimum description of information.',
        recipe: ['theory_statistical_mechanics', 'theory_information_theory'],
        attributes: { thought_bonus_per_sec: 2.6 }
    },
    paradigm_non_equilibrium_systems: {
        id: 'paradigm_non_equilibrium_systems', name: 'Paradigm: Non-Equilibrium Systems', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Statistical mechanics extended to chaotic, driven systems far from equilibrium — dissipative structures and self-organisation.',
        recipe: ['theory_statistical_mechanics', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_population_genetics: {
        id: 'paradigm_population_genetics', name: 'Paradigm: Population Genetics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The statistical mechanics of evolutionary change — allele frequencies, genetic drift, and natural selection at the population level.',
        recipe: ['theory_statistical_mechanics', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_quantum_mechanics: {
        id: 'paradigm_quantum_mechanics', name: 'Paradigm: Quantum Mechanics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The probabilistic wave mechanics underlying all of physics — where statistical uncertainty is not ignorance but fundamental reality.',
        recipe: ['theory_statistical_mechanics', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 3.0 }
    },
    paradigm_stochastic_cognition: {
        id: 'paradigm_stochastic_cognition', name: 'Paradigm: Stochastic Cognition', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Modelling thought and perception as statistical inference — the Bayesian brain hypothesis.',
        recipe: ['theory_statistical_mechanics', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_cliodynamics: {
        id: 'paradigm_cliodynamics', name: 'Paradigm: Cliodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying statistical mechanics and dynamical systems to detect patterns and predict cycles in historical data.',
        recipe: ['theory_statistical_mechanics', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },

    // --- Electromagnetism pairings (12) ---
    paradigm_electrodynamics: {
        id: 'paradigm_electrodynamics', name: 'Paradigm: Electrodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Maxwell\'s unification of electricity and magnetism with classical mechanics — the blueprint for all field theories.',
        recipe: ['theory_electromagnetic_theory', 'theory_classical_mechanics'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_electrochemistry: {
        id: 'paradigm_electrochemistry', name: 'Paradigm: Electrochemistry', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The chemical reactions driven by or producing electromagnetic energy — batteries, electrolysis, and corrosion.',
        recipe: ['theory_electromagnetic_theory', 'theory_chemical_kinetics'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_magnetotellurics: {
        id: 'paradigm_magnetotellurics', name: 'Paradigm: Magnetotellurics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Probing the Earth\'s geological structure using naturally occurring electromagnetic fields.',
        recipe: ['theory_electromagnetic_theory', 'theory_geology'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },
    paradigm_xray_crystallography: {
        id: 'paradigm_xray_crystallography', name: 'Paradigm: X-Ray Crystallography', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Revealing atomic structure by analysing how crystals diffract X-ray signals — the tool that decoded DNA.',
        recipe: ['theory_electromagnetic_theory', 'theory_crystallography'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_magnetohydrodynamics: {
        id: 'paradigm_magnetohydrodynamics', name: 'Paradigm: Magnetohydrodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The dynamics of electrically conducting fluids in electromagnetic fields — governing stellar interiors and liquid metal reactors.',
        recipe: ['theory_electromagnetic_theory', 'theory_fluid_dynamics'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_remote_sensing: {
        id: 'paradigm_remote_sensing', name: 'Paradigm: Remote Sensing', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using electromagnetic signals to survey and reveal archaeological and geological features from a distance.',
        recipe: ['theory_electromagnetic_theory', 'theory_archaeology'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_radio_astronomy: {
        id: 'paradigm_radio_astronomy', name: 'Paradigm: Radio Astronomy', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Extracting cosmological information from electromagnetic signals — mapping the universe through the radio waves that traverse it.',
        recipe: ['theory_electromagnetic_theory', 'theory_information_theory'],
        attributes: { thought_bonus_per_sec: 2.7 }
    },
    paradigm_nonlinear_optics: {
        id: 'paradigm_nonlinear_optics', name: 'Paradigm: Nonlinear Optics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Light interacting with matter in chaotic, intensity-dependent ways — frequency doubling, solitons, and optical chaos.',
        recipe: ['theory_electromagnetic_theory', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.6 }
    },
    paradigm_biophotonics: {
        id: 'paradigm_biophotonics', name: 'Paradigm: Biophotonics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The electromagnetic basis of biological light emission and absorption — from bioluminescence to medical imaging.',
        recipe: ['theory_electromagnetic_theory', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_quantum_electrodynamics: {
        id: 'paradigm_quantum_electrodynamics', name: 'Paradigm: Quantum Electrodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The most precisely tested theory in science — the quantum field description of electromagnetic waves and their interactions.',
        recipe: ['theory_electromagnetic_theory', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 3.2 }
    },
    paradigm_neural_signalling: {
        id: 'paradigm_neural_signalling', name: 'Paradigm: Neural Signalling', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The electrochemical basis of cognition — how electromagnetic signals propagate through neural networks to produce thought.',
        recipe: ['theory_electromagnetic_theory', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.6 }
    },
    paradigm_archaeomagnetism: {
        id: 'paradigm_archaeomagnetism', name: 'Paradigm: Archaeomagnetism', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Dating ancient kilns and hearths by reading the magnetic alignment locked into fired clay at the moment of cooling.',
        recipe: ['theory_electromagnetic_theory', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },

    // --- Classical Mechanics pairings (11) ---
    paradigm_reaction_dynamics: {
        id: 'paradigm_reaction_dynamics', name: 'Paradigm: Reaction Dynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The mechanical pathways of chemical reactions — tracking atomic trajectories through transition states.',
        recipe: ['theory_classical_mechanics', 'theory_chemical_kinetics'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_plate_tectonics: {
        id: 'paradigm_plate_tectonics', name: 'Paradigm: Plate Tectonics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The grand mechanical theory of geological change — continents in slow collision, driven by convective forces.',
        recipe: ['theory_classical_mechanics', 'theory_geology'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_crystalline_mechanics: {
        id: 'paradigm_crystalline_mechanics', name: 'Paradigm: Crystalline Mechanics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The mechanical response of crystalline solids to stress — dislocations, plasticity, and elastic limits.',
        recipe: ['theory_classical_mechanics', 'theory_crystallography'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_aerodynamics: {
        id: 'paradigm_aerodynamics', name: 'Paradigm: Aerodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The mechanics of bodies moving through fluids — the science that makes flight possible.',
        recipe: ['theory_classical_mechanics', 'theory_fluid_dynamics'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_experimental_archaeology: {
        id: 'paradigm_experimental_archaeology', name: 'Paradigm: Experimental Archaeology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Reconstructing ancient technologies by applying mechanical principles — building Bronze Age tools to understand them.',
        recipe: ['theory_classical_mechanics', 'theory_archaeology'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_control_theory: {
        id: 'paradigm_control_theory', name: 'Paradigm: Control Theory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying information feedback to mechanical systems — the mathematics of autopilots, thermostats, and servomechanisms.',
        recipe: ['theory_classical_mechanics', 'theory_information_theory'],
        attributes: { thought_bonus_per_sec: 2.6 }
    },
    paradigm_orbital_mechanics: {
        id: 'paradigm_orbital_mechanics', name: 'Paradigm: Orbital Mechanics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The chaotic precision of celestial trajectories — n-body gravitational dynamics and the limits of long-range prediction.',
        recipe: ['theory_classical_mechanics', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_biomechanics: {
        id: 'paradigm_biomechanics', name: 'Paradigm: Biomechanics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The mechanical analysis of biological structures — how evolution has engineered bone, muscle, and locomotion.',
        recipe: ['theory_classical_mechanics', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_acoustics: {
        id: 'paradigm_acoustics', name: 'Paradigm: Acoustics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The mechanical propagation of pressure waves through matter — music, noise, and the physics of sound.',
        recipe: ['theory_classical_mechanics', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_embodied_cognition: {
        id: 'paradigm_embodied_cognition', name: 'Paradigm: Embodied Cognition', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The theory that cognition is shaped by the mechanical body — that thought is inseparable from physical action.',
        recipe: ['theory_classical_mechanics', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_archaeoastronomy: {
        id: 'paradigm_archaeoastronomy', name: 'Paradigm: Archaeoastronomy', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Recovering ancient knowledge of celestial mechanics from monuments, artefacts, and historical records.',
        recipe: ['theory_classical_mechanics', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },

    // --- Chemical Kinetics pairings (10) ---
    paradigm_geochemistry: {
        id: 'paradigm_geochemistry', name: 'Paradigm: Geochemistry', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The chemical kinetics that shaped the Earth — elemental cycling, volcanic chemistry, and ocean composition.',
        recipe: ['theory_chemical_kinetics', 'theory_geology'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_crystal_growth: {
        id: 'paradigm_crystal_growth', name: 'Paradigm: Crystal Growth', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The kinetic and thermodynamic processes by which ordered crystalline structures nucleate and propagate.',
        recipe: ['theory_chemical_kinetics', 'theory_crystallography'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_chemical_engineering: {
        id: 'paradigm_chemical_engineering', name: 'Paradigm: Chemical Engineering', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Scaling chemical kinetics from the laboratory to industrial fluid processes — reactors, separations, and process control.',
        recipe: ['theory_chemical_kinetics', 'theory_fluid_dynamics'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_archaeochemistry: {
        id: 'paradigm_archaeochemistry', name: 'Paradigm: Archaeochemistry', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Chemical analysis of ancient residues, pigments, and organic materials to reconstruct past practices.',
        recipe: ['theory_chemical_kinetics', 'theory_archaeology'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_molecular_computing: {
        id: 'paradigm_molecular_computing', name: 'Paradigm: Molecular Computing', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using chemical reactions as computational steps — DNA computing and reaction networks as logic gates.',
        recipe: ['theory_chemical_kinetics', 'theory_information_theory'],
        attributes: { thought_bonus_per_sec: 2.6 }
    },
    paradigm_reaction_diffusion_systems: {
        id: 'paradigm_reaction_diffusion_systems', name: 'Paradigm: Reaction-Diffusion Systems', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The chaotic self-organising patterns that emerge when chemical reactions and diffusion interact — from Turing patterns to heartbeat rhythms.',
        recipe: ['theory_chemical_kinetics', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_biochemistry: {
        id: 'paradigm_biochemistry', name: 'Paradigm: Biochemistry', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The chemical kinetics of life — metabolic pathways, enzyme catalysis, and the molecular machinery of evolution.',
        recipe: ['theory_chemical_kinetics', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_spectroscopy: {
        id: 'paradigm_spectroscopy', name: 'Paradigm: Spectroscopy', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Identifying chemical composition by analysing how matter interacts with waves across the electromagnetic spectrum.',
        recipe: ['theory_chemical_kinetics', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_neuropharmacology: {
        id: 'paradigm_neuropharmacology', name: 'Paradigm: Neuropharmacology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'How chemical kinetics in the brain alter cognition — neurotransmitters, receptors, and the molecular basis of behaviour.',
        recipe: ['theory_chemical_kinetics', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_palaeochemistry: {
        id: 'paradigm_palaeochemistry', name: 'Paradigm: Palaeochemistry', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Reconstructing ancient chemical environments from isotopic and molecular signatures preserved in rocks and fossils.',
        recipe: ['theory_chemical_kinetics', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },

    // --- Geology pairings (9) ---
    paradigm_mineralogy: {
        id: 'paradigm_mineralogy', name: 'Paradigm: Mineralogy', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The classification and properties of minerals — the crystalline building blocks of geology.',
        recipe: ['theory_geology', 'theory_crystallography'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },
    paradigm_hydrogeology: {
        id: 'paradigm_hydrogeology', name: 'Paradigm: Hydrogeology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The fluid dynamics of water moving through geological formations — aquifers, springs, and groundwater systems.',
        recipe: ['theory_geology', 'theory_fluid_dynamics'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_geoarchaeology: {
        id: 'paradigm_geoarchaeology', name: 'Paradigm: Geoarchaeology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Reading the geological context of archaeological sites to reconstruct past landscapes and depositional histories.',
        recipe: ['theory_geology', 'theory_archaeology'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_geoinformatics: {
        id: 'paradigm_geoinformatics', name: 'Paradigm: Geoinformatics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Processing geological information at scale — GIS, satellite data, and computational models of the Earth.',
        recipe: ['theory_geology', 'theory_information_theory'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_seismology: {
        id: 'paradigm_seismology', name: 'Paradigm: Seismology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The chaotic rupture of geological faults — predicting earthquakes and imaging the Earth\'s interior with shock waves.',
        recipe: ['theory_geology', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_palaeontology: {
        id: 'paradigm_palaeontology', name: 'Paradigm: Palaeontology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The geological record of evolutionary history — fossils as physical documents of deep time.',
        recipe: ['theory_geology', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_seismic_imaging: {
        id: 'paradigm_seismic_imaging', name: 'Paradigm: Seismic Imaging', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Using reflected wave mechanics to create cross-sectional images of geological structure beneath the surface.',
        recipe: ['theory_geology', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_landscape_cognition: {
        id: 'paradigm_landscape_cognition', name: 'Paradigm: Landscape Cognition', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'How geological environments shape human cognition, wayfinding, and cultural identity.',
        recipe: ['theory_geology', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },
    paradigm_geohistory: {
        id: 'paradigm_geohistory', name: 'Paradigm: Geohistory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Reconstructing Earth\'s historical narrative from its geological record — stratigraphy as the planet\'s autobiography.',
        recipe: ['theory_geology', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },

    // --- Crystallography pairings (8) ---
    paradigm_liquid_crystals: {
        id: 'paradigm_liquid_crystals', name: 'Paradigm: Liquid Crystals', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Matter between crystalline order and fluid chaos — the phase that makes LCD screens possible.',
        recipe: ['theory_crystallography', 'theory_fluid_dynamics'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_petrology: {
        id: 'paradigm_petrology', name: 'Paradigm: Petrology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The crystallographic archaeology of rocks — reading mineral assemblages to reconstruct ancient geological conditions.',
        recipe: ['theory_crystallography', 'theory_archaeology'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },
    paradigm_lattice_cryptography: {
        id: 'paradigm_lattice_cryptography', name: 'Paradigm: Lattice Cryptography', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Post-quantum encryption based on the computational hardness of problems defined on crystalline lattice structures.',
        recipe: ['theory_crystallography', 'theory_information_theory'],
        attributes: { thought_bonus_per_sec: 2.7 }
    },
    paradigm_quasicrystals: {
        id: 'paradigm_quasicrystals', name: 'Paradigm: Quasicrystals', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Ordered but non-periodic atomic arrangements — the chaotic edge of crystalline structure that defied classical theory.',
        recipe: ['theory_crystallography', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.6 }
    },
    paradigm_biomineralisation: {
        id: 'paradigm_biomineralisation', name: 'Paradigm: Biomineralisation', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'How evolution discovered crystal growth — shells, bones, and teeth as biologically engineered crystalline structures.',
        recipe: ['theory_crystallography', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_diffraction_theory: {
        id: 'paradigm_diffraction_theory', name: 'Paradigm: Diffraction Theory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The wave mechanics of interference patterns — how crystal lattices bend and scatter waves to reveal atomic geometry.',
        recipe: ['theory_crystallography', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_pattern_recognition: {
        id: 'paradigm_pattern_recognition', name: 'Paradigm: Pattern Recognition', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The cognitive ability to identify crystalline regularities in noisy data — the foundation of perception and machine learning.',
        recipe: ['theory_crystallography', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_provenance_studies: {
        id: 'paradigm_provenance_studies', name: 'Paradigm: Provenance Studies', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Tracing the historical origin of artefacts through crystallographic and geochemical fingerprinting.',
        recipe: ['theory_crystallography', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },

    // --- Fluid Dynamics pairings (7) ---
    paradigm_maritime_archaeology: {
        id: 'paradigm_maritime_archaeology', name: 'Paradigm: Maritime Archaeology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Excavating submerged archaeological sites — recovering ships, ports, and cargo preserved by fluid dynamics.',
        recipe: ['theory_fluid_dynamics', 'theory_archaeology'],
        attributes: { thought_bonus_per_sec: 2.0 }
    },
    paradigm_network_flow_theory: {
        id: 'paradigm_network_flow_theory', name: 'Paradigm: Network Flow Theory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Treating information routing as a fluid dynamics problem — optimising flow through networks, pipes, and traffic systems.',
        recipe: ['theory_fluid_dynamics', 'theory_information_theory'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_strange_attractors: {
        id: 'paradigm_strange_attractors', name: 'Paradigm: Strange Attractors', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The fractal geometry of chaotic fluid trajectories — Lorenz attractors and the hidden order within turbulent flow.',
        recipe: ['theory_fluid_dynamics', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.6 }
    },
    paradigm_morphogenesis: {
        id: 'paradigm_morphogenesis', name: 'Paradigm: Morphogenesis', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The fluid dynamic and evolutionary processes that generate biological form — how a single cell becomes an organism.',
        recipe: ['theory_fluid_dynamics', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_hydrodynamics: {
        id: 'paradigm_hydrodynamics', name: 'Paradigm: Hydrodynamics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The wave mechanics of water — surface waves, tsunamis, and the deep mathematics of incompressible flow.',
        recipe: ['theory_fluid_dynamics', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_swarm_intelligence: {
        id: 'paradigm_swarm_intelligence', name: 'Paradigm: Swarm Intelligence', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Collective cognition emerging from fluid-like interaction rules — ant colonies, bird flocks, and distributed AI.',
        recipe: ['theory_fluid_dynamics', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.6 }
    },
    paradigm_climate_history: {
        id: 'paradigm_climate_history', name: 'Paradigm: Climate History', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Reconstructing the historical record of atmospheric and oceanic fluid dynamics — ice cores, tree rings, and palaeoclimate proxies.',
        recipe: ['theory_fluid_dynamics', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },

    // --- Archaeology pairings (6) ---
    paradigm_digital_humanities: {
        id: 'paradigm_digital_humanities', name: 'Paradigm: Digital Humanities', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying information theory to the archaeological and historical record — digitising, analysing, and preserving human heritage.',
        recipe: ['theory_archaeology', 'theory_information_theory'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },
    paradigm_collapse_theory: {
        id: 'paradigm_collapse_theory', name: 'Paradigm: Collapse Theory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The chaotic archaeology of civilisation decline — understanding why complex societies abruptly fail.',
        recipe: ['theory_archaeology', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_palaeoanthropology: {
        id: 'paradigm_palaeoanthropology', name: 'Paradigm: Palaeoanthropology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The evolutionary archaeology of humanity — stone tools, hominin fossils, and the long prehistory of our species.',
        recipe: ['theory_archaeology', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_acoustic_archaeology: {
        id: 'paradigm_acoustic_archaeology', name: 'Paradigm: Acoustic Archaeology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Recovering the soundscapes of the past — studying wave mechanics in ancient spaces from Stonehenge to cave paintings.',
        recipe: ['theory_archaeology', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.2 }
    },
    paradigm_cognitive_archaeology: {
        id: 'paradigm_cognitive_archaeology', name: 'Paradigm: Cognitive Archaeology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Inferring the cognitive capacities of past peoples from the material record — symbolic behaviour, planning, and social cognition.',
        recipe: ['theory_archaeology', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_historical_archaeology: {
        id: 'paradigm_historical_archaeology', name: 'Paradigm: Historical Archaeology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The archaeology of literate societies — combining material evidence with written historical records.',
        recipe: ['theory_archaeology', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.1 }
    },

    // --- Information Theory pairings (5) ---
    paradigm_cryptography: {
        id: 'paradigm_cryptography', name: 'Paradigm: Cryptography', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Exploiting computational complexity and chaos to protect information — the mathematical arms race of secrecy.',
        recipe: ['theory_information_theory', 'theory_chaos_theory'],
        attributes: { thought_bonus_per_sec: 2.8 }
    },
    paradigm_evolutionary_computation: {
        id: 'paradigm_evolutionary_computation', name: 'Paradigm: Evolutionary Computation', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Solving computational problems using algorithms inspired by evolutionary information processing — genetic algorithms and neural evolution.',
        recipe: ['theory_information_theory', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.8 }
    },
    paradigm_signal_processing: {
        id: 'paradigm_signal_processing', name: 'Paradigm: Signal Processing', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Extracting, filtering, and transforming information from wave signals — the mathematics behind audio, imaging, and communication.',
        recipe: ['theory_information_theory', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.7 }
    },
    paradigm_artificial_intelligence: {
        id: 'paradigm_artificial_intelligence', name: 'Paradigm: Artificial Intelligence', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Engineering cognitive processes from information theory — machine learning, reasoning, and the architecture of artificial minds.',
        recipe: ['theory_information_theory', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 3.2 }
    },
    paradigm_archival_science: {
        id: 'paradigm_archival_science', name: 'Paradigm: Archival Science', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The information theory of preserving historical records — encoding, redundancy, and the long-term survival of knowledge.',
        recipe: ['theory_information_theory', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },

    // --- Chaos Theory pairings (4) ---
    paradigm_complex_adaptive_systems: {
        id: 'paradigm_complex_adaptive_systems', name: 'Paradigm: Complex Adaptive Systems', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Systems where evolutionary agents interacting under chaos rules produce emergent, adaptive global behaviour — ecosystems, economies, immune systems.',
        recipe: ['theory_chaos_theory', 'theory_evolutionary_theory'],
        attributes: { thought_bonus_per_sec: 2.9 }
    },
    paradigm_soliton_theory: {
        id: 'paradigm_soliton_theory', name: 'Paradigm: Soliton Theory', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Self-reinforcing solitary waves that propagate without dispersion through chaotic nonlinear media — from water canals to optical fibres.',
        recipe: ['theory_chaos_theory', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.7 }
    },
    paradigm_emergence: {
        id: 'paradigm_emergence', name: 'Paradigm: Emergence', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'How cognition and consciousness arise from chaotic low-level interactions — the hardest problem in science.',
        recipe: ['theory_chaos_theory', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.9 }
    },
    paradigm_catastrophism: {
        id: 'paradigm_catastrophism', name: 'Paradigm: Catastrophism', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The historical role of chaotic catastrophic events — mass extinctions, volcanic winters, and the punctuation of deep history.',
        recipe: ['theory_chaos_theory', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },

    // --- Evolutionary Theory pairings (3) ---
    paradigm_bioacoustics: {
        id: 'paradigm_bioacoustics', name: 'Paradigm: Bioacoustics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The evolution of sound production and reception — whale song, echolocation, and the origins of language.',
        recipe: ['theory_evolutionary_theory', 'theory_wave_mechanics'],
        attributes: { thought_bonus_per_sec: 2.4 }
    },
    paradigm_evolutionary_psychology: {
        id: 'paradigm_evolutionary_psychology', name: 'Paradigm: Evolutionary Psychology', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Understanding cognition as an evolved adaptation — how ancestral selection pressures shape modern minds.',
        recipe: ['theory_evolutionary_theory', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.6 }
    },
    paradigm_cultural_evolution: {
        id: 'paradigm_cultural_evolution', name: 'Paradigm: Cultural Evolution', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Applying evolutionary theory to the historical transmission of ideas, technologies, and social norms.',
        recipe: ['theory_evolutionary_theory', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },

    // --- Wave Mechanics pairings (2) ---
    paradigm_psychoacoustics: {
        id: 'paradigm_psychoacoustics', name: 'Paradigm: Psychoacoustics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'The cognitive perception of acoustic waves — how the brain interprets sound, pitch, and music.',
        recipe: ['theory_wave_mechanics', 'theory_cognitive_science'],
        attributes: { thought_bonus_per_sec: 2.5 }
    },
    paradigm_archaeoacoustics: {
        id: 'paradigm_archaeoacoustics', name: 'Paradigm: Archaeoacoustics', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Studying wave propagation in ancient sites to understand how past peoples designed and used sound environments.',
        recipe: ['theory_wave_mechanics', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.3 }
    },

    // --- Cognitive Science pairings (1) ---
    paradigm_historiography_of_mind: {
        id: 'paradigm_historiography_of_mind', name: 'Paradigm: Historiography of Mind', tier: 4, group: 'paradigm',
        color: { background: '#ff69b4', border: '#c71585' }, shape: 'hexagon',
        description: 'Tracing how cognitive frameworks and theories of consciousness have evolved through intellectual history.',
        recipe: ['theory_cognitive_science', 'theory_historiography'],
        attributes: { thought_bonus_per_sec: 2.6 }
    }

};

// Ensures all ideas have a unique ID and an attributes object
Object.keys(IDEAS_DATA).forEach(key => {
    if (!IDEAS_DATA[key].id) IDEAS_DATA[key].id = key;
    if (!IDEAS_DATA[key].attributes) IDEAS_DATA[key].attributes = {};
});