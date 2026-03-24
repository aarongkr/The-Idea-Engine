// js/config/craftersData.js

/**
 * Defines the Auto-Crafters — buildings that consume lower-tier ideas to
 * automatically produce higher-tier ones.
 *
 * Naming philosophy: each crafter name describes the intellectual process or
 * the cognitive/institutional apparatus that would naturally produce that idea.
 * Insight crafters are "engines" and "synthesisers"; Theory crafters are
 * "institutes" and "laboratories"; Paradigm crafters are "institutes",
 * "observatories", "academies", and "foundations".
 */
const CRAFTERS_DATA = {

    // =========================================================================
    // Insight Crafters (6)
    // Each consumes two base Concepts to produce one Insight.
    // =========================================================================

    insight_thermodynamics_crafter: {
        id: 'insight_thermodynamics_crafter',
        name: 'Thermodynamic Engine',
        description: 'Feeds Matter and Energy into a cyclic reasoning loop, automatically generating Insight: Thermodynamics.',
        targetIdeaId: 'insight_thermodynamics',
        baseCost: { thought: 10000, concept_matter: 5, concept_energy: 5 },
        costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50,
        unlocksWith: ['insight_thermodynamics']
    },
    insight_structure_crafter: {
        id: 'insight_structure_crafter',
        name: 'Structural Synthesiser',
        description: 'Weaves Matter and Information together to continuously produce Insight: Structure.',
        targetIdeaId: 'insight_structure',
        baseCost: { thought: 10000, concept_matter: 5, concept_information: 5 },
        costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50,
        unlocksWith: ['insight_structure']
    },
    insight_entropy_crafter: {
        id: 'insight_entropy_crafter',
        name: 'Entropy Accumulator',
        description: 'Tracks the dispersal of Matter across Time, distilling the concept of Insight: Entropy.',
        targetIdeaId: 'insight_entropy',
        baseCost: { thought: 10000, concept_matter: 5, concept_time: 5 },
        costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50,
        unlocksWith: ['insight_entropy']
    },
    insight_signal_crafter: {
        id: 'insight_signal_crafter',
        name: 'Signal Modulator',
        description: 'Encodes Energy as Information in a repeating cycle, producing Insight: Signal.',
        targetIdeaId: 'insight_signal',
        baseCost: { thought: 10000, concept_energy: 5, concept_information: 5 },
        costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50,
        unlocksWith: ['insight_signal']
    },
    insight_dynamics_crafter: {
        id: 'insight_dynamics_crafter',
        name: 'Dynamics Processor',
        description: 'Traces the evolution of Energy through Time, generating Insight: Dynamics.',
        targetIdeaId: 'insight_dynamics',
        baseCost: { thought: 10000, concept_energy: 5, concept_time: 5 },
        costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50,
        unlocksWith: ['insight_dynamics']
    },
    insight_memory_crafter: {
        id: 'insight_memory_crafter',
        name: 'Memory Consolidator',
        description: 'Imprints Information against the flow of Time, steadily producing Insight: Memory.',
        targetIdeaId: 'insight_memory',
        baseCost: { thought: 10000, concept_information: 5, concept_time: 5 },
        costScale: 1.5, outputAmount: 0.01, outputScale: 1.1, maxLevel: 50,
        unlocksWith: ['insight_memory']
    },

    // =========================================================================
    // Theory Crafters (15)
    // Each consumes two Insights to produce one Theory.
    // =========================================================================

    theory_materials_science_crafter: {
        id: 'theory_materials_science_crafter',
        name: 'Materials Research Laboratory',
        description: 'Fuses Thermodynamics and Structure insights to systematically generate Theory: Materials Science.',
        targetIdeaId: 'theory_materials_science',
        baseCost: { thought: 100000, insight_thermodynamics: 2, insight_structure: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_materials_science']
    },
    theory_statistical_mechanics_crafter: {
        id: 'theory_statistical_mechanics_crafter',
        name: 'Statistical Mechanics Institute',
        description: 'Bridges Thermodynamics and Entropy to produce Theory: Statistical Mechanics.',
        targetIdeaId: 'theory_statistical_mechanics',
        baseCost: { thought: 110000, insight_thermodynamics: 2, insight_entropy: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_statistical_mechanics']
    },
    theory_electromagnetic_theory_crafter: {
        id: 'theory_electromagnetic_theory_crafter',
        name: 'Electromagnetic Research Centre',
        description: 'Unifies Thermodynamics and Signal insights to produce Theory: Electromagnetism.',
        targetIdeaId: 'theory_electromagnetic_theory',
        baseCost: { thought: 120000, insight_thermodynamics: 2, insight_signal: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_electromagnetic_theory']
    },
    theory_classical_mechanics_crafter: {
        id: 'theory_classical_mechanics_crafter',
        name: 'Classical Mechanics Laboratory',
        description: 'Derives motion laws from Thermodynamics and Dynamics to produce Theory: Classical Mechanics.',
        targetIdeaId: 'theory_classical_mechanics',
        baseCost: { thought: 130000, insight_thermodynamics: 2, insight_dynamics: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_classical_mechanics']
    },
    theory_chemical_kinetics_crafter: {
        id: 'theory_chemical_kinetics_crafter',
        name: 'Kinetics Analysis Engine',
        description: 'Combines Thermodynamics and Memory insights to produce Theory: Chemical Kinetics.',
        targetIdeaId: 'theory_chemical_kinetics',
        baseCost: { thought: 110000, insight_thermodynamics: 2, insight_memory: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_chemical_kinetics']
    },
    theory_geology_crafter: {
        id: 'theory_geology_crafter',
        name: 'Deep Time Observatory',
        description: 'Reads Structure against Entropy to generate Theory: Geology.',
        targetIdeaId: 'theory_geology',
        baseCost: { thought: 100000, insight_structure: 2, insight_entropy: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_geology']
    },
    theory_crystallography_crafter: {
        id: 'theory_crystallography_crafter',
        name: 'Lattice Mapping Array',
        description: 'Decodes Signal patterns within Structure to produce Theory: Crystallography.',
        targetIdeaId: 'theory_crystallography',
        baseCost: { thought: 110000, insight_structure: 2, insight_signal: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_crystallography']
    },
    theory_fluid_dynamics_crafter: {
        id: 'theory_fluid_dynamics_crafter',
        name: 'Flow Dynamics Simulator',
        description: 'Models Structure in motion through Dynamics insights to produce Theory: Fluid Dynamics.',
        targetIdeaId: 'theory_fluid_dynamics',
        baseCost: { thought: 120000, insight_structure: 2, insight_dynamics: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_fluid_dynamics']
    },
    theory_archaeology_crafter: {
        id: 'theory_archaeology_crafter',
        name: 'Stratigraphic Archive',
        description: 'Recovers Memory embedded in physical Structure to produce Theory: Archaeology.',
        targetIdeaId: 'theory_archaeology',
        baseCost: { thought: 100000, insight_structure: 2, insight_memory: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_archaeology']
    },
    theory_information_theory_crafter: {
        id: 'theory_information_theory_crafter',
        name: 'Shannon Codex Engine',
        description: 'Formalises the relationship between Entropy and Signal to generate Theory: Information Theory.',
        targetIdeaId: 'theory_information_theory',
        baseCost: { thought: 140000, insight_entropy: 2, insight_signal: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_information_theory']
    },
    theory_chaos_theory_crafter: {
        id: 'theory_chaos_theory_crafter',
        name: 'Nonlinear Dynamics Laboratory',
        description: 'Tracks Entropy unfolding through Dynamics to produce Theory: Chaos Theory.',
        targetIdeaId: 'theory_chaos_theory',
        baseCost: { thought: 130000, insight_entropy: 2, insight_dynamics: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_chaos_theory']
    },
    theory_evolutionary_theory_crafter: {
        id: 'theory_evolutionary_theory_crafter',
        name: 'Evolutionary Archive',
        description: 'Traces Entropic variation accumulating in Memory over time to produce Theory: Evolutionary Theory.',
        targetIdeaId: 'theory_evolutionary_theory',
        baseCost: { thought: 125000, insight_entropy: 2, insight_memory: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_evolutionary_theory']
    },
    theory_wave_mechanics_crafter: {
        id: 'theory_wave_mechanics_crafter',
        name: 'Wave Propagation Array',
        description: 'Models Signal propagating through dynamic media to produce Theory: Wave Mechanics.',
        targetIdeaId: 'theory_wave_mechanics',
        baseCost: { thought: 150000, insight_signal: 2, insight_dynamics: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_wave_mechanics']
    },
    theory_cognitive_science_crafter: {
        id: 'theory_cognitive_science_crafter',
        name: 'Mind Mapping Institute',
        description: 'Studies how Signal is stored as Memory to produce Theory: Cognitive Science.',
        targetIdeaId: 'theory_cognitive_science',
        baseCost: { thought: 155000, insight_signal: 2, insight_memory: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_cognitive_science']
    },
    theory_historiography_crafter: {
        id: 'theory_historiography_crafter',
        name: 'Historical Dynamics Centre',
        description: 'Reconstructs Memory from the traces left by Dynamics to produce Theory: Historiography.',
        targetIdeaId: 'theory_historiography',
        baseCost: { thought: 105000, insight_dynamics: 2, insight_memory: 2 },
        costScale: 1.8, outputAmount: 0.005, outputScale: 1.1, maxLevel: 30,
        unlocksWith: ['theory_historiography']
    },

    // =========================================================================
    // Paradigm Crafters (105)
    // Each consumes two Theories to produce one Paradigm.
    // =========================================================================

    // --- Materials Science pairings ---
    paradigm_condensed_matter_physics_crafter: { id: 'paradigm_condensed_matter_physics_crafter', name: 'Condensed Matter Institute', description: 'Automates Paradigm: Condensed Matter Physics.', targetIdeaId: 'paradigm_condensed_matter_physics', baseCost: { thought: 5000000, theory_materials_science: 3, theory_statistical_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_condensed_matter_physics'] },
    paradigm_photonics_crafter: { id: 'paradigm_photonics_crafter', name: 'Photonics Research Lab', description: 'Automates Paradigm: Photonics.', targetIdeaId: 'paradigm_photonics', baseCost: { thought: 5100000, theory_materials_science: 3, theory_electromagnetic_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_photonics'] },
    paradigm_structural_engineering_crafter: { id: 'paradigm_structural_engineering_crafter', name: 'Structural Engineering Academy', description: 'Automates Paradigm: Structural Engineering.', targetIdeaId: 'paradigm_structural_engineering', baseCost: { thought: 5000000, theory_materials_science: 3, theory_classical_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_structural_engineering'] },
    paradigm_metallurgy_crafter: { id: 'paradigm_metallurgy_crafter', name: 'Metallurgical Forge', description: 'Automates Paradigm: Metallurgy.', targetIdeaId: 'paradigm_metallurgy', baseCost: { thought: 5000000, theory_materials_science: 3, theory_chemical_kinetics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_metallurgy'] },
    paradigm_geomaterials_crafter: { id: 'paradigm_geomaterials_crafter', name: 'Geomaterials Survey Station', description: 'Automates Paradigm: Geomaterials.', targetIdeaId: 'paradigm_geomaterials', baseCost: { thought: 5000000, theory_materials_science: 3, theory_geology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_geomaterials'] },
    paradigm_solid_state_physics_crafter: { id: 'paradigm_solid_state_physics_crafter', name: 'Solid State Physics Laboratory', description: 'Automates Paradigm: Solid State Physics.', targetIdeaId: 'paradigm_solid_state_physics', baseCost: { thought: 5200000, theory_materials_science: 3, theory_crystallography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_solid_state_physics'] },
    paradigm_rheology_crafter: { id: 'paradigm_rheology_crafter', name: 'Rheological Flow Rig', description: 'Automates Paradigm: Rheology.', targetIdeaId: 'paradigm_rheology', baseCost: { thought: 5000000, theory_materials_science: 3, theory_fluid_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_rheology'] },
    paradigm_archaeomaterials_crafter: { id: 'paradigm_archaeomaterials_crafter', name: 'Archaeomaterials Analysis Suite', description: 'Automates Paradigm: Archaeomaterials.', targetIdeaId: 'paradigm_archaeomaterials', baseCost: { thought: 5000000, theory_materials_science: 3, theory_archaeology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_archaeomaterials'] },
    paradigm_data_storage_crafter: { id: 'paradigm_data_storage_crafter', name: 'Data Substrate Foundry', description: 'Automates Paradigm: Data Storage.', targetIdeaId: 'paradigm_data_storage', baseCost: { thought: 5300000, theory_materials_science: 3, theory_information_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_data_storage'] },
    paradigm_fracture_mechanics_crafter: { id: 'paradigm_fracture_mechanics_crafter', name: 'Fracture Mechanics Testing Rig', description: 'Automates Paradigm: Fracture Mechanics.', targetIdeaId: 'paradigm_fracture_mechanics', baseCost: { thought: 5100000, theory_materials_science: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_fracture_mechanics'] },
    paradigm_biomimetics_crafter: { id: 'paradigm_biomimetics_crafter', name: 'Biomimetics Design Studio', description: 'Automates Paradigm: Biomimetics.', targetIdeaId: 'paradigm_biomimetics', baseCost: { thought: 5200000, theory_materials_science: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_biomimetics'] },
    paradigm_acoustics_engineering_crafter: { id: 'paradigm_acoustics_engineering_crafter', name: 'Acoustics Engineering Workshop', description: 'Automates Paradigm: Acoustics Engineering.', targetIdeaId: 'paradigm_acoustics_engineering', baseCost: { thought: 5100000, theory_materials_science: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_acoustics_engineering'] },
    paradigm_neuroprosthetics_crafter: { id: 'paradigm_neuroprosthetics_crafter', name: 'Neural Interface Laboratory', description: 'Automates Paradigm: Neuroprosthetics.', targetIdeaId: 'paradigm_neuroprosthetics', baseCost: { thought: 5400000, theory_materials_science: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_neuroprosthetics'] },
    paradigm_industrial_heritage_crafter: { id: 'paradigm_industrial_heritage_crafter', name: 'Industrial Heritage Archive', description: 'Automates Paradigm: Industrial Heritage.', targetIdeaId: 'paradigm_industrial_heritage', baseCost: { thought: 5000000, theory_materials_science: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_industrial_heritage'] },

    // --- Statistical Mechanics pairings ---
    paradigm_plasma_physics_crafter: { id: 'paradigm_plasma_physics_crafter', name: 'Plasma Confinement Facility', description: 'Automates Paradigm: Plasma Physics.', targetIdeaId: 'paradigm_plasma_physics', baseCost: { thought: 5500000, theory_statistical_mechanics: 3, theory_electromagnetic_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_plasma_physics'] },
    paradigm_kinetic_theory_crafter: { id: 'paradigm_kinetic_theory_crafter', name: 'Kinetic Theory Simulator', description: 'Automates Paradigm: Kinetic Theory.', targetIdeaId: 'paradigm_kinetic_theory', baseCost: { thought: 5200000, theory_statistical_mechanics: 3, theory_classical_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_kinetic_theory'] },
    paradigm_physical_chemistry_crafter: { id: 'paradigm_physical_chemistry_crafter', name: 'Physical Chemistry Institute', description: 'Automates Paradigm: Physical Chemistry.', targetIdeaId: 'paradigm_physical_chemistry', baseCost: { thought: 5200000, theory_statistical_mechanics: 3, theory_chemical_kinetics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_physical_chemistry'] },
    paradigm_geophysics_crafter: { id: 'paradigm_geophysics_crafter', name: 'Geophysical Survey Array', description: 'Automates Paradigm: Geophysics.', targetIdeaId: 'paradigm_geophysics', baseCost: { thought: 5200000, theory_statistical_mechanics: 3, theory_geology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_geophysics'] },
    paradigm_lattice_dynamics_crafter: { id: 'paradigm_lattice_dynamics_crafter', name: 'Lattice Dynamics Modeller', description: 'Automates Paradigm: Lattice Dynamics.', targetIdeaId: 'paradigm_lattice_dynamics', baseCost: { thought: 5300000, theory_statistical_mechanics: 3, theory_crystallography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_lattice_dynamics'] },
    paradigm_turbulence_theory_crafter: { id: 'paradigm_turbulence_theory_crafter', name: 'Turbulence Research Wind Tunnel', description: 'Automates Paradigm: Turbulence Theory.', targetIdeaId: 'paradigm_turbulence_theory', baseCost: { thought: 5400000, theory_statistical_mechanics: 3, theory_fluid_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_turbulence_theory'] },
    paradigm_geochronology_crafter: { id: 'paradigm_geochronology_crafter', name: 'Isotopic Dating Laboratory', description: 'Automates Paradigm: Geochronology.', targetIdeaId: 'paradigm_geochronology', baseCost: { thought: 5100000, theory_statistical_mechanics: 3, theory_archaeology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_geochronology'] },
    paradigm_algorithmic_complexity_crafter: { id: 'paradigm_algorithmic_complexity_crafter', name: 'Complexity Theory Engine', description: 'Automates Paradigm: Algorithmic Complexity.', targetIdeaId: 'paradigm_algorithmic_complexity', baseCost: { thought: 5600000, theory_statistical_mechanics: 3, theory_information_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_algorithmic_complexity'] },
    paradigm_non_equilibrium_systems_crafter: { id: 'paradigm_non_equilibrium_systems_crafter', name: 'Dissipative Structures Laboratory', description: 'Automates Paradigm: Non-Equilibrium Systems.', targetIdeaId: 'paradigm_non_equilibrium_systems', baseCost: { thought: 5500000, theory_statistical_mechanics: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_non_equilibrium_systems'] },
    paradigm_population_genetics_crafter: { id: 'paradigm_population_genetics_crafter', name: 'Population Genomics Centre', description: 'Automates Paradigm: Population Genetics.', targetIdeaId: 'paradigm_population_genetics', baseCost: { thought: 5300000, theory_statistical_mechanics: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_population_genetics'] },
    paradigm_quantum_mechanics_crafter: { id: 'paradigm_quantum_mechanics_crafter', name: 'Quantum State Laboratory', description: 'Automates Paradigm: Quantum Mechanics.', targetIdeaId: 'paradigm_quantum_mechanics', baseCost: { thought: 7000000, theory_statistical_mechanics: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.00017, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_quantum_mechanics'] },
    paradigm_stochastic_cognition_crafter: { id: 'paradigm_stochastic_cognition_crafter', name: 'Bayesian Inference Engine', description: 'Automates Paradigm: Stochastic Cognition.', targetIdeaId: 'paradigm_stochastic_cognition', baseCost: { thought: 5500000, theory_statistical_mechanics: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_stochastic_cognition'] },
    paradigm_cliodynamics_crafter: { id: 'paradigm_cliodynamics_crafter', name: 'Historical Dynamics Modeller', description: 'Automates Paradigm: Cliodynamics.', targetIdeaId: 'paradigm_cliodynamics', baseCost: { thought: 5200000, theory_statistical_mechanics: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cliodynamics'] },

    // --- Electromagnetism pairings ---
    paradigm_electrodynamics_crafter: { id: 'paradigm_electrodynamics_crafter', name: 'Field Theory Laboratory', description: 'Automates Paradigm: Electrodynamics.', targetIdeaId: 'paradigm_electrodynamics', baseCost: { thought: 5500000, theory_electromagnetic_theory: 3, theory_classical_mechanics: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_electrodynamics'] },
    paradigm_electrochemistry_crafter: { id: 'paradigm_electrochemistry_crafter', name: 'Electrochemical Cell Array', description: 'Automates Paradigm: Electrochemistry.', targetIdeaId: 'paradigm_electrochemistry', baseCost: { thought: 5300000, theory_electromagnetic_theory: 3, theory_chemical_kinetics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_electrochemistry'] },
    paradigm_magnetotellurics_crafter: { id: 'paradigm_magnetotellurics_crafter', name: 'Magnetotelluric Survey Station', description: 'Automates Paradigm: Magnetotellurics.', targetIdeaId: 'paradigm_magnetotellurics', baseCost: { thought: 5100000, theory_electromagnetic_theory: 3, theory_geology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_magnetotellurics'] },
    paradigm_xray_crystallography_crafter: { id: 'paradigm_xray_crystallography_crafter', name: 'X-Ray Diffraction Suite', description: 'Automates Paradigm: X-Ray Crystallography.', targetIdeaId: 'paradigm_xray_crystallography', baseCost: { thought: 5400000, theory_electromagnetic_theory: 3, theory_crystallography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_xray_crystallography'] },
    paradigm_magnetohydrodynamics_crafter: { id: 'paradigm_magnetohydrodynamics_crafter', name: 'MHD Plasma Reactor', description: 'Automates Paradigm: Magnetohydrodynamics.', targetIdeaId: 'paradigm_magnetohydrodynamics', baseCost: { thought: 5500000, theory_electromagnetic_theory: 3, theory_fluid_dynamics: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_magnetohydrodynamics'] },
    paradigm_remote_sensing_crafter: { id: 'paradigm_remote_sensing_crafter', name: 'Remote Sensing Observatory', description: 'Automates Paradigm: Remote Sensing.', targetIdeaId: 'paradigm_remote_sensing', baseCost: { thought: 5200000, theory_electromagnetic_theory: 3, theory_archaeology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_remote_sensing'] },
    paradigm_radio_astronomy_crafter: { id: 'paradigm_radio_astronomy_crafter', name: 'Radio Telescope Array', description: 'Automates Paradigm: Radio Astronomy.', targetIdeaId: 'paradigm_radio_astronomy', baseCost: { thought: 5700000, theory_electromagnetic_theory: 3, theory_information_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_radio_astronomy'] },
    paradigm_nonlinear_optics_crafter: { id: 'paradigm_nonlinear_optics_crafter', name: 'Nonlinear Optics Bench', description: 'Automates Paradigm: Nonlinear Optics.', targetIdeaId: 'paradigm_nonlinear_optics', baseCost: { thought: 5600000, theory_electromagnetic_theory: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_nonlinear_optics'] },
    paradigm_biophotonics_crafter: { id: 'paradigm_biophotonics_crafter', name: 'Biophotonics Imaging Suite', description: 'Automates Paradigm: Biophotonics.', targetIdeaId: 'paradigm_biophotonics', baseCost: { thought: 5300000, theory_electromagnetic_theory: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_biophotonics'] },
    paradigm_quantum_electrodynamics_crafter: { id: 'paradigm_quantum_electrodynamics_crafter', name: 'QED Calculation Centre', description: 'Automates Paradigm: Quantum Electrodynamics.', targetIdeaId: 'paradigm_quantum_electrodynamics', baseCost: { thought: 7200000, theory_electromagnetic_theory: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.00016, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_quantum_electrodynamics'] },
    paradigm_neural_signalling_crafter: { id: 'paradigm_neural_signalling_crafter', name: 'Neural Electrophysiology Rig', description: 'Automates Paradigm: Neural Signalling.', targetIdeaId: 'paradigm_neural_signalling', baseCost: { thought: 5600000, theory_electromagnetic_theory: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_neural_signalling'] },
    paradigm_archaeomagnetism_crafter: { id: 'paradigm_archaeomagnetism_crafter', name: 'Palaeomagnetic Dating Suite', description: 'Automates Paradigm: Archaeomagnetism.', targetIdeaId: 'paradigm_archaeomagnetism', baseCost: { thought: 5100000, theory_electromagnetic_theory: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_archaeomagnetism'] },

    // --- Classical Mechanics pairings ---
    paradigm_reaction_dynamics_crafter: { id: 'paradigm_reaction_dynamics_crafter', name: 'Reaction Trajectory Simulator', description: 'Automates Paradigm: Reaction Dynamics.', targetIdeaId: 'paradigm_reaction_dynamics', baseCost: { thought: 5200000, theory_classical_mechanics: 3, theory_chemical_kinetics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_reaction_dynamics'] },
    paradigm_plate_tectonics_crafter: { id: 'paradigm_plate_tectonics_crafter', name: 'Tectonic Dynamics Laboratory', description: 'Automates Paradigm: Plate Tectonics.', targetIdeaId: 'paradigm_plate_tectonics', baseCost: { thought: 5300000, theory_classical_mechanics: 3, theory_geology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_plate_tectonics'] },
    paradigm_crystalline_mechanics_crafter: { id: 'paradigm_crystalline_mechanics_crafter', name: 'Crystal Deformation Testing Rig', description: 'Automates Paradigm: Crystalline Mechanics.', targetIdeaId: 'paradigm_crystalline_mechanics', baseCost: { thought: 5200000, theory_classical_mechanics: 3, theory_crystallography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_crystalline_mechanics'] },
    paradigm_aerodynamics_crafter: { id: 'paradigm_aerodynamics_crafter', name: 'Aerodynamic Wind Tunnel', description: 'Automates Paradigm: Aerodynamics.', targetIdeaId: 'paradigm_aerodynamics', baseCost: { thought: 5400000, theory_classical_mechanics: 3, theory_fluid_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_aerodynamics'] },
    paradigm_experimental_archaeology_crafter: { id: 'paradigm_experimental_archaeology_crafter', name: 'Experimental Reconstruction Workshop', description: 'Automates Paradigm: Experimental Archaeology.', targetIdeaId: 'paradigm_experimental_archaeology', baseCost: { thought: 5000000, theory_classical_mechanics: 3, theory_archaeology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_experimental_archaeology'] },
    paradigm_control_theory_crafter: { id: 'paradigm_control_theory_crafter', name: 'Control Systems Laboratory', description: 'Automates Paradigm: Control Theory.', targetIdeaId: 'paradigm_control_theory', baseCost: { thought: 5600000, theory_classical_mechanics: 3, theory_information_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_control_theory'] },
    paradigm_orbital_mechanics_crafter: { id: 'paradigm_orbital_mechanics_crafter', name: 'Celestial Mechanics Observatory', description: 'Automates Paradigm: Orbital Mechanics.', targetIdeaId: 'paradigm_orbital_mechanics', baseCost: { thought: 5500000, theory_classical_mechanics: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_orbital_mechanics'] },
    paradigm_biomechanics_crafter: { id: 'paradigm_biomechanics_crafter', name: 'Biomechanics Motion Laboratory', description: 'Automates Paradigm: Biomechanics.', targetIdeaId: 'paradigm_biomechanics', baseCost: { thought: 5300000, theory_classical_mechanics: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_biomechanics'] },
    paradigm_acoustics_crafter: { id: 'paradigm_acoustics_crafter', name: 'Acoustic Research Chamber', description: 'Automates Paradigm: Acoustics.', targetIdeaId: 'paradigm_acoustics', baseCost: { thought: 5200000, theory_classical_mechanics: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_acoustics'] },
    paradigm_embodied_cognition_crafter: { id: 'paradigm_embodied_cognition_crafter', name: 'Embodied Cognition Research Hub', description: 'Automates Paradigm: Embodied Cognition.', targetIdeaId: 'paradigm_embodied_cognition', baseCost: { thought: 5300000, theory_classical_mechanics: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_embodied_cognition'] },
    paradigm_archaeoastronomy_crafter: { id: 'paradigm_archaeoastronomy_crafter', name: 'Archaeoastronomy Survey Centre', description: 'Automates Paradigm: Archaeoastronomy.', targetIdeaId: 'paradigm_archaeoastronomy', baseCost: { thought: 5100000, theory_classical_mechanics: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_archaeoastronomy'] },

    // --- Chemical Kinetics pairings ---
    paradigm_geochemistry_crafter: { id: 'paradigm_geochemistry_crafter', name: 'Geochemical Analysis Laboratory', description: 'Automates Paradigm: Geochemistry.', targetIdeaId: 'paradigm_geochemistry', baseCost: { thought: 5200000, theory_chemical_kinetics: 3, theory_geology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_geochemistry'] },
    paradigm_crystal_growth_crafter: { id: 'paradigm_crystal_growth_crafter', name: 'Crystal Nucleation Furnace', description: 'Automates Paradigm: Crystal Growth.', targetIdeaId: 'paradigm_crystal_growth', baseCost: { thought: 5200000, theory_chemical_kinetics: 3, theory_crystallography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_crystal_growth'] },
    paradigm_chemical_engineering_crafter: { id: 'paradigm_chemical_engineering_crafter', name: 'Industrial Reactor Plant', description: 'Automates Paradigm: Chemical Engineering.', targetIdeaId: 'paradigm_chemical_engineering', baseCost: { thought: 5400000, theory_chemical_kinetics: 3, theory_fluid_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_chemical_engineering'] },
    paradigm_archaeochemistry_crafter: { id: 'paradigm_archaeochemistry_crafter', name: 'Ancient Residue Analysis Suite', description: 'Automates Paradigm: Archaeochemistry.', targetIdeaId: 'paradigm_archaeochemistry', baseCost: { thought: 5000000, theory_chemical_kinetics: 3, theory_archaeology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_archaeochemistry'] },
    paradigm_molecular_computing_crafter: { id: 'paradigm_molecular_computing_crafter', name: 'DNA Computing Substrate', description: 'Automates Paradigm: Molecular Computing.', targetIdeaId: 'paradigm_molecular_computing', baseCost: { thought: 5600000, theory_chemical_kinetics: 3, theory_information_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_molecular_computing'] },
    paradigm_reaction_diffusion_systems_crafter: { id: 'paradigm_reaction_diffusion_systems_crafter', name: 'Turing Pattern Generator', description: 'Automates Paradigm: Reaction-Diffusion Systems.', targetIdeaId: 'paradigm_reaction_diffusion_systems', baseCost: { thought: 5500000, theory_chemical_kinetics: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_reaction_diffusion_systems'] },
    paradigm_biochemistry_crafter: { id: 'paradigm_biochemistry_crafter', name: 'Biochemical Pathway Synthesiser', description: 'Automates Paradigm: Biochemistry.', targetIdeaId: 'paradigm_biochemistry', baseCost: { thought: 5500000, theory_chemical_kinetics: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_biochemistry'] },
    paradigm_spectroscopy_crafter: { id: 'paradigm_spectroscopy_crafter', name: 'Spectroscopic Analysis Array', description: 'Automates Paradigm: Spectroscopy.', targetIdeaId: 'paradigm_spectroscopy', baseCost: { thought: 5400000, theory_chemical_kinetics: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_spectroscopy'] },
    paradigm_neuropharmacology_crafter: { id: 'paradigm_neuropharmacology_crafter', name: 'Neuropharmacology Research Wing', description: 'Automates Paradigm: Neuropharmacology.', targetIdeaId: 'paradigm_neuropharmacology', baseCost: { thought: 5500000, theory_chemical_kinetics: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_neuropharmacology'] },
    paradigm_palaeochemistry_crafter: { id: 'paradigm_palaeochemistry_crafter', name: 'Isotopic Palaeo-Environment Suite', description: 'Automates Paradigm: Palaeochemistry.', targetIdeaId: 'paradigm_palaeochemistry', baseCost: { thought: 5100000, theory_chemical_kinetics: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_palaeochemistry'] },

    // --- Geology pairings ---
    paradigm_mineralogy_crafter: { id: 'paradigm_mineralogy_crafter', name: 'Mineral Classification Laboratory', description: 'Automates Paradigm: Mineralogy.', targetIdeaId: 'paradigm_mineralogy', baseCost: { thought: 5100000, theory_geology: 3, theory_crystallography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_mineralogy'] },
    paradigm_hydrogeology_crafter: { id: 'paradigm_hydrogeology_crafter', name: 'Aquifer Monitoring Network', description: 'Automates Paradigm: Hydrogeology.', targetIdeaId: 'paradigm_hydrogeology', baseCost: { thought: 5200000, theory_geology: 3, theory_fluid_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_hydrogeology'] },
    paradigm_geoarchaeology_crafter: { id: 'paradigm_geoarchaeology_crafter', name: 'Geoarchaeological Survey Unit', description: 'Automates Paradigm: Geoarchaeology.', targetIdeaId: 'paradigm_geoarchaeology', baseCost: { thought: 5000000, theory_geology: 3, theory_archaeology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_geoarchaeology'] },
    paradigm_geoinformatics_crafter: { id: 'paradigm_geoinformatics_crafter', name: 'GIS Data Processing Centre', description: 'Automates Paradigm: Geoinformatics.', targetIdeaId: 'paradigm_geoinformatics', baseCost: { thought: 5300000, theory_geology: 3, theory_information_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_geoinformatics'] },
    paradigm_seismology_crafter: { id: 'paradigm_seismology_crafter', name: 'Seismographic Monitoring Array', description: 'Automates Paradigm: Seismology.', targetIdeaId: 'paradigm_seismology', baseCost: { thought: 5400000, theory_geology: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_seismology'] },
    paradigm_palaeontology_crafter: { id: 'paradigm_palaeontology_crafter', name: 'Fossil Excavation and Analysis Site', description: 'Automates Paradigm: Palaeontology.', targetIdeaId: 'paradigm_palaeontology', baseCost: { thought: 5300000, theory_geology: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_palaeontology'] },
    paradigm_seismic_imaging_crafter: { id: 'paradigm_seismic_imaging_crafter', name: 'Seismic Reflection Survey Platform', description: 'Automates Paradigm: Seismic Imaging.', targetIdeaId: 'paradigm_seismic_imaging', baseCost: { thought: 5300000, theory_geology: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_seismic_imaging'] },
    paradigm_landscape_cognition_crafter: { id: 'paradigm_landscape_cognition_crafter', name: 'Landscape Cognition Research Institute', description: 'Automates Paradigm: Landscape Cognition.', targetIdeaId: 'paradigm_landscape_cognition', baseCost: { thought: 5100000, theory_geology: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_landscape_cognition'] },
    paradigm_geohistory_crafter: { id: 'paradigm_geohistory_crafter', name: 'Stratigraphic Narrative Archive', description: 'Automates Paradigm: Geohistory.', targetIdeaId: 'paradigm_geohistory', baseCost: { thought: 5100000, theory_geology: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_geohistory'] },

    // --- Crystallography pairings ---
    paradigm_liquid_crystals_crafter: { id: 'paradigm_liquid_crystals_crafter', name: 'Liquid Crystal Phase Laboratory', description: 'Automates Paradigm: Liquid Crystals.', targetIdeaId: 'paradigm_liquid_crystals', baseCost: { thought: 5300000, theory_crystallography: 3, theory_fluid_dynamics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_liquid_crystals'] },
    paradigm_petrology_crafter: { id: 'paradigm_petrology_crafter', name: 'Petrographic Thin Section Laboratory', description: 'Automates Paradigm: Petrology.', targetIdeaId: 'paradigm_petrology', baseCost: { thought: 5100000, theory_crystallography: 3, theory_archaeology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_petrology'] },
    paradigm_lattice_cryptography_crafter: { id: 'paradigm_lattice_cryptography_crafter', name: 'Post-Quantum Cryptography Engine', description: 'Automates Paradigm: Lattice Cryptography.', targetIdeaId: 'paradigm_lattice_cryptography', baseCost: { thought: 5700000, theory_crystallography: 3, theory_information_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_lattice_cryptography'] },
    paradigm_quasicrystals_crafter: { id: 'paradigm_quasicrystals_crafter', name: 'Quasicrystal Synthesis Chamber', description: 'Automates Paradigm: Quasicrystals.', targetIdeaId: 'paradigm_quasicrystals', baseCost: { thought: 5600000, theory_crystallography: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_quasicrystals'] },
    paradigm_biomineralisation_crafter: { id: 'paradigm_biomineralisation_crafter', name: 'Biomineralisation Research Suite', description: 'Automates Paradigm: Biomineralisation.', targetIdeaId: 'paradigm_biomineralisation', baseCost: { thought: 5300000, theory_crystallography: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_biomineralisation'] },
    paradigm_diffraction_theory_crafter: { id: 'paradigm_diffraction_theory_crafter', name: 'Wave Diffraction Analysis Bench', description: 'Automates Paradigm: Diffraction Theory.', targetIdeaId: 'paradigm_diffraction_theory', baseCost: { thought: 5400000, theory_crystallography: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_diffraction_theory'] },
    paradigm_pattern_recognition_crafter: { id: 'paradigm_pattern_recognition_crafter', name: 'Pattern Recognition Engine', description: 'Automates Paradigm: Pattern Recognition.', targetIdeaId: 'paradigm_pattern_recognition', baseCost: { thought: 5500000, theory_crystallography: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_pattern_recognition'] },
    paradigm_provenance_studies_crafter: { id: 'paradigm_provenance_studies_crafter', name: 'Artefact Provenance Laboratory', description: 'Automates Paradigm: Provenance Studies.', targetIdeaId: 'paradigm_provenance_studies', baseCost: { thought: 5100000, theory_crystallography: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_provenance_studies'] },

    // --- Fluid Dynamics pairings ---
    paradigm_maritime_archaeology_crafter: { id: 'paradigm_maritime_archaeology_crafter', name: 'Underwater Excavation Platform', description: 'Automates Paradigm: Maritime Archaeology.', targetIdeaId: 'paradigm_maritime_archaeology', baseCost: { thought: 5000000, theory_fluid_dynamics: 3, theory_archaeology: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_maritime_archaeology'] },
    paradigm_network_flow_theory_crafter: { id: 'paradigm_network_flow_theory_crafter', name: 'Network Topology Optimiser', description: 'Automates Paradigm: Network Flow Theory.', targetIdeaId: 'paradigm_network_flow_theory', baseCost: { thought: 5500000, theory_fluid_dynamics: 3, theory_information_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_network_flow_theory'] },
    paradigm_strange_attractors_crafter: { id: 'paradigm_strange_attractors_crafter', name: 'Chaotic Attractor Visualiser', description: 'Automates Paradigm: Strange Attractors.', targetIdeaId: 'paradigm_strange_attractors', baseCost: { thought: 5600000, theory_fluid_dynamics: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_strange_attractors'] },
    paradigm_morphogenesis_crafter: { id: 'paradigm_morphogenesis_crafter', name: 'Developmental Biology Laboratory', description: 'Automates Paradigm: Morphogenesis.', targetIdeaId: 'paradigm_morphogenesis', baseCost: { thought: 5500000, theory_fluid_dynamics: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_morphogenesis'] },
    paradigm_hydrodynamics_crafter: { id: 'paradigm_hydrodynamics_crafter', name: 'Wave Tank and Flow Basin', description: 'Automates Paradigm: Hydrodynamics.', targetIdeaId: 'paradigm_hydrodynamics', baseCost: { thought: 5300000, theory_fluid_dynamics: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_hydrodynamics'] },
    paradigm_swarm_intelligence_crafter: { id: 'paradigm_swarm_intelligence_crafter', name: 'Collective Behaviour Simulation Hub', description: 'Automates Paradigm: Swarm Intelligence.', targetIdeaId: 'paradigm_swarm_intelligence', baseCost: { thought: 5600000, theory_fluid_dynamics: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_swarm_intelligence'] },
    paradigm_climate_history_crafter: { id: 'paradigm_climate_history_crafter', name: 'Palaeoclimate Reconstruction Centre', description: 'Automates Paradigm: Climate History.', targetIdeaId: 'paradigm_climate_history', baseCost: { thought: 5300000, theory_fluid_dynamics: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_climate_history'] },

    // --- Archaeology pairings ---
    paradigm_digital_humanities_crafter: { id: 'paradigm_digital_humanities_crafter', name: 'Digital Heritage Archive', description: 'Automates Paradigm: Digital Humanities.', targetIdeaId: 'paradigm_digital_humanities', baseCost: { thought: 5300000, theory_archaeology: 3, theory_information_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_digital_humanities'] },
    paradigm_collapse_theory_crafter: { id: 'paradigm_collapse_theory_crafter', name: 'Civilisation Collapse Analysis Unit', description: 'Automates Paradigm: Collapse Theory.', targetIdeaId: 'paradigm_collapse_theory', baseCost: { thought: 5400000, theory_archaeology: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_collapse_theory'] },
    paradigm_palaeoanthropology_crafter: { id: 'paradigm_palaeoanthropology_crafter', name: 'Hominin Evolution Research Centre', description: 'Automates Paradigm: Palaeoanthropology.', targetIdeaId: 'paradigm_palaeoanthropology', baseCost: { thought: 5400000, theory_archaeology: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_palaeoanthropology'] },
    paradigm_acoustic_archaeology_crafter: { id: 'paradigm_acoustic_archaeology_crafter', name: 'Ancient Soundscape Laboratory', description: 'Automates Paradigm: Acoustic Archaeology.', targetIdeaId: 'paradigm_acoustic_archaeology', baseCost: { thought: 5200000, theory_archaeology: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_acoustic_archaeology'] },
    paradigm_cognitive_archaeology_crafter: { id: 'paradigm_cognitive_archaeology_crafter', name: 'Prehistoric Mind Research Institute', description: 'Automates Paradigm: Cognitive Archaeology.', targetIdeaId: 'paradigm_cognitive_archaeology', baseCost: { thought: 5400000, theory_archaeology: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cognitive_archaeology'] },
    paradigm_historical_archaeology_crafter: { id: 'paradigm_historical_archaeology_crafter', name: 'Historical Period Excavation Unit', description: 'Automates Paradigm: Historical Archaeology.', targetIdeaId: 'paradigm_historical_archaeology', baseCost: { thought: 5100000, theory_archaeology: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_historical_archaeology'] },

    // --- Information Theory pairings ---
    paradigm_cryptography_crafter: { id: 'paradigm_cryptography_crafter', name: 'Cryptographic Protocol Engine', description: 'Automates Paradigm: Cryptography.', targetIdeaId: 'paradigm_cryptography', baseCost: { thought: 5800000, theory_information_theory: 3, theory_chaos_theory: 3 }, costScale: 2.5, outputAmount: 0.00018, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cryptography'] },
    paradigm_evolutionary_computation_crafter: { id: 'paradigm_evolutionary_computation_crafter', name: 'Genetic Algorithm Processor', description: 'Automates Paradigm: Evolutionary Computation.', targetIdeaId: 'paradigm_evolutionary_computation', baseCost: { thought: 5800000, theory_information_theory: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.00018, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_evolutionary_computation'] },
    paradigm_signal_processing_crafter: { id: 'paradigm_signal_processing_crafter', name: 'Digital Signal Processing Array', description: 'Automates Paradigm: Signal Processing.', targetIdeaId: 'paradigm_signal_processing', baseCost: { thought: 5700000, theory_information_theory: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_signal_processing'] },
    paradigm_artificial_intelligence_crafter: { id: 'paradigm_artificial_intelligence_crafter', name: 'Artificial Intelligence Research Cluster', description: 'Automates Paradigm: Artificial Intelligence.', targetIdeaId: 'paradigm_artificial_intelligence', baseCost: { thought: 7200000, theory_information_theory: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.00016, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_artificial_intelligence'] },
    paradigm_archival_science_crafter: { id: 'paradigm_archival_science_crafter', name: 'Long-Term Knowledge Preservation Vault', description: 'Automates Paradigm: Archival Science.', targetIdeaId: 'paradigm_archival_science', baseCost: { thought: 5300000, theory_information_theory: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_archival_science'] },

    // --- Chaos Theory pairings ---
    paradigm_complex_adaptive_systems_crafter: { id: 'paradigm_complex_adaptive_systems_crafter', name: 'Complex Systems Modelling Centre', description: 'Automates Paradigm: Complex Adaptive Systems.', targetIdeaId: 'paradigm_complex_adaptive_systems', baseCost: { thought: 5900000, theory_chaos_theory: 3, theory_evolutionary_theory: 3 }, costScale: 2.5, outputAmount: 0.00018, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_complex_adaptive_systems'] },
    paradigm_soliton_theory_crafter: { id: 'paradigm_soliton_theory_crafter', name: 'Nonlinear Wave Research Laboratory', description: 'Automates Paradigm: Soliton Theory.', targetIdeaId: 'paradigm_soliton_theory', baseCost: { thought: 5700000, theory_chaos_theory: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_soliton_theory'] },
    paradigm_emergence_crafter: { id: 'paradigm_emergence_crafter', name: 'Emergence and Complexity Institute', description: 'Automates Paradigm: Emergence.', targetIdeaId: 'paradigm_emergence', baseCost: { thought: 5900000, theory_chaos_theory: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.00018, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_emergence'] },
    paradigm_catastrophism_crafter: { id: 'paradigm_catastrophism_crafter', name: 'Mass Extinction Research Centre', description: 'Automates Paradigm: Catastrophism.', targetIdeaId: 'paradigm_catastrophism', baseCost: { thought: 5500000, theory_chaos_theory: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_catastrophism'] },

    // --- Evolutionary Theory pairings ---
    paradigm_bioacoustics_crafter: { id: 'paradigm_bioacoustics_crafter', name: 'Bioacoustics Field Recording Suite', description: 'Automates Paradigm: Bioacoustics.', targetIdeaId: 'paradigm_bioacoustics', baseCost: { thought: 5400000, theory_evolutionary_theory: 3, theory_wave_mechanics: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_bioacoustics'] },
    paradigm_evolutionary_psychology_crafter: { id: 'paradigm_evolutionary_psychology_crafter', name: 'Evolutionary Cognition Laboratory', description: 'Automates Paradigm: Evolutionary Psychology.', targetIdeaId: 'paradigm_evolutionary_psychology', baseCost: { thought: 5600000, theory_evolutionary_theory: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_evolutionary_psychology'] },
    paradigm_cultural_evolution_crafter: { id: 'paradigm_cultural_evolution_crafter', name: 'Cultural Transmission Research Hub', description: 'Automates Paradigm: Cultural Evolution.', targetIdeaId: 'paradigm_cultural_evolution', baseCost: { thought: 5500000, theory_evolutionary_theory: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_cultural_evolution'] },

    // --- Wave Mechanics pairings ---
    paradigm_psychoacoustics_crafter: { id: 'paradigm_psychoacoustics_crafter', name: 'Auditory Perception Laboratory', description: 'Automates Paradigm: Psychoacoustics.', targetIdeaId: 'paradigm_psychoacoustics', baseCost: { thought: 5500000, theory_wave_mechanics: 3, theory_cognitive_science: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_psychoacoustics'] },
    paradigm_archaeoacoustics_crafter: { id: 'paradigm_archaeoacoustics_crafter', name: 'Ancient Acoustic Environment Rig', description: 'Automates Paradigm: Archaeoacoustics.', targetIdeaId: 'paradigm_archaeoacoustics', baseCost: { thought: 5300000, theory_wave_mechanics: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.0002, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_archaeoacoustics'] },

    // --- Cognitive Science pairings ---
    paradigm_historiography_of_mind_crafter: { id: 'paradigm_historiography_of_mind_crafter', name: 'History of Consciousness Archive', description: 'Automates Paradigm: Historiography of Mind.', targetIdeaId: 'paradigm_historiography_of_mind', baseCost: { thought: 5600000, theory_cognitive_science: 3, theory_historiography: 3 }, costScale: 2.5, outputAmount: 0.00019, outputScale: 1.05, maxLevel: 15, unlocksWith: ['paradigm_historiography_of_mind'] }

};