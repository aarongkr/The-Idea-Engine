// js/config/wisdomShopData.js

/**
 * Defines all purchasable upgrades in the Wisdom Shard shop.
 *
 * Naming philosophy:
 *   - Names should feel like genuine intellectual or cognitive advancements.
 *   - QoL upgrades are named after organisational or methodological breakthroughs.
 *   - Click bonuses reflect deepening personal discipline.
 *   - Global multipliers represent expanding schools of thought.
 *   - Offline upgrades evoke subconscious or contemplative processing.
 */
const WISDOM_SHOP_DATA = {

    // =========================================================================
    // Quality of Life
    // =========================================================================

    multi_buy_unlock: {
        id: 'multi_buy_unlock',
        name: 'Mass Production Theory',
        description: 'Formalises the principle of economies of scale, unlocking bulk purchasing (x1, x10, x100, Max).',
        cost: 5,
        maxLevel: 1,
        category: 'quality_of_life',
        icon: '📦',
        unlockCondition: () => true,
        applyEffect: () => {
            // Handled in UI logic to show/hide the multiplier button
        }
    },

    paradigm_bulk_manager: {
        id: 'paradigm_bulk_manager',
        name: 'Paradigmatic Administration',
        description: 'Establishes an administrative framework to manage all Paradigm Crafters simultaneously, adding a bulk-upgrade button.',
        cost: 15,
        maxLevel: 1,
        category: 'quality_of_life',
        icon: '🏛️',
        unlockCondition: () => gameState.wisdomShop.multi_buy_unlock?.level >= 1,
        applyEffect: () => {
            // Handled in UI logic to show/hide the bulk upgrade button
        }
    },

    // =========================================================================
    // Enhanced Focus — Tap/Click Bonuses
    // =========================================================================

    tap_thoughts_bonus: {
        id: 'tap_thoughts_bonus',
        name: 'Deep Contemplation',
        description: 'Each deliberate spark of thought draws on your passive mental output, earning bonus Thoughts equal to a percentage of your Thoughts/sec.',
        baseCost: 10,
        costScale: 2.0,
        maxLevel: 10,
        category: 'tap_bonuses',
        icon: '🧘',
        unlockCondition: () => true,
        getEffectValue: (level) => level * 5,   // 5% per level, max 50%
        applyEffect: (level) => {
            // Applied in GameLogic.sparkThought()
        }
    },

    // =========================================================================
    // Cognitive Enhancements — Global thought Multipliers
    // =========================================================================

    global_thought_multiplier_25: {
        id: 'global_thought_multiplier_25',
        name: 'School of Thought I',
        description: 'Establishes a coherent intellectual tradition, increasing all Thought generation by 25%.',
        cost: 25,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🎓',
        unlockCondition: () => true,
        getEffectValue: () => 0.25,
        applyEffect: () => {
            // Applied as global multiplier in GameLogic.tick()
        }
    },

    global_thought_multiplier_50: {
        id: 'global_thought_multiplier_50',
        name: 'School of Thought II',
        description: 'Expands the intellectual tradition into a broader academy, increasing all Thought generation by a further 50%.',
        cost: 50,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🎓',
        unlockCondition: () => gameState.wisdomShop.global_thought_multiplier_25?.level >= 1,
        getEffectValue: () => 0.50,
        applyEffect: () => {}
    },

    global_thought_multiplier_75: {
        id: 'global_thought_multiplier_75',
        name: 'School of Thought III',
        description: 'The academy grows into a renowned institute, increasing all Thought generation by a further 75%.',
        cost: 100,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🎓',
        unlockCondition: () => gameState.wisdomShop.global_thought_multiplier_50?.level >= 1,
        getEffectValue: () => 0.75,
        applyEffect: () => {}
    },

    global_thought_multiplier_100: {
        id: 'global_thought_multiplier_100',
        name: 'School of Thought IV',
        description: 'The institute achieves international recognition, doubling all Thought generation (+100%).',
        cost: 200,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🎓',
        unlockCondition: () => gameState.wisdomShop.global_thought_multiplier_75?.level >= 1,
        getEffectValue: () => 1.0,
        applyEffect: () => {}
    },

    global_thought_multiplier_150: {
        id: 'global_thought_multiplier_150',
        name: 'School of Thought V',
        description: 'A paradigm-shifting intellectual movement, increasing all Thought generation by a further 150%.',
        cost: 400,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🎓',
        unlockCondition: () => gameState.wisdomShop.global_thought_multiplier_100?.level >= 1,
        getEffectValue: () => 1.5,
        applyEffect: () => {}
    },

    // =========================================================================
    // Persistent Contemplation — Offline Earnings
    // =========================================================================

    offline_effectiveness: {
        id: 'offline_effectiveness',
        name: 'Subconscious Processing',
        description: 'Trains the mind to continue working during rest, increasing the effectiveness of offline Thought accumulation.',
        baseCost: 30,
        costScale: 2.5,
        maxLevel: 5,
        category: 'offline',
        icon: '💤',
        unlockCondition: () => gameState.transcendenceCount >= 1,
        getEffectValue: (level) => Math.min(100, 20 + (level * 15)),  // 35%, 50%, 65%, 80%, 95%
        applyEffect: (level) => {
            // Applied in GameLogic.calculateOfflineProgress()
        }
    },

    offline_time_cap: {
        id: 'offline_time_cap',
        name: 'Extended Incubation',
        description: 'Extends the window of productive offline contemplation — ideas need time to incubate.',
        baseCost: 20,
        costScale: 2.0,
        maxLevel: 8,
        category: 'offline',
        icon: '⏳',
        unlockCondition: () => gameState.transcendenceCount >= 1,
        getEffectValue: (level) => 24 + (level * 12),  // 36h, 48h ... up to 120h
        applyEffect: (level) => {
            // Applied in GameLogic.calculateOfflineProgress()
        }
    }
};