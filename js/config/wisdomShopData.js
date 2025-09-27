// js/config/wisdomShopData.js

/**
 * Defines all purchasable upgrades in the Wisdom Shard shop.
 * Each upgrade can be a single purchase or have multiple levels.
 */
const WISDOM_SHOP_DATA = {
    // Core Quality of Life Upgrades
    multi_buy_unlock: {
        id: 'multi_buy_unlock',
        name: 'Bulk Purchasing',
        description: 'Unlock the ability to buy multiple upgrades at once (x1, x10, x100, Max)',
        cost: 5,
        maxLevel: 1,
        category: 'quality_of_life',
        icon: '📦',
        unlockCondition: () => true,
        applyEffect: () => {
            // This will be handled in UI logic to show/hide the multiplier button
        }
    },

    paradigm_bulk_manager: {
        id: 'paradigm_bulk_manager',
        name: 'Paradigm Automation',
        description: 'Adds "Upgrade All Paradigm Crafters" button to manage all 105 crafters at once',
        cost: 15,
        maxLevel: 1,
        category: 'quality_of_life',
        icon: '🏭',
        unlockCondition: () => gameState.wisdomShop.multi_buy_unlock?.level >= 1,
        applyEffect: () => {
            // This will be handled in UI logic to show/hide bulk upgrade buttons
        }
    },

    // Tap/Click Bonuses (upgradeable branch)
    tap_ft_bonus: {
        id: 'tap_ft_bonus',
        name: 'Enhanced Focus',
        description: 'Each manual spark earns additional FT equal to a percentage of your FT/sec',
        baseCost: 10,
        costScale: 2.0,
        maxLevel: 10,
        category: 'tap_bonuses',
        icon: '👆',
        unlockCondition: () => true,
        getEffectValue: (level) => level * 5, // 5% per level, max 50%
        applyEffect: (level) => {
            // Applied in GameLogic.sparkFleetingThought()
        }
    },

    // Global Multipliers (upgradeable branch)
    global_ft_multiplier_25: {
        id: 'global_ft_multiplier_25',
        name: 'Cognitive Enhancement I',
        description: 'Increases all Fleeting Thought generation by 25%',
        cost: 25,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🧠',
        unlockCondition: () => true,
        getEffectValue: () => 0.25,
        applyEffect: () => {
            // Applied as global multiplier in GameLogic.tick()
        }
    },

    global_ft_multiplier_50: {
        id: 'global_ft_multiplier_50',
        name: 'Cognitive Enhancement II',
        description: 'Increases all Fleeting Thought generation by 50%',
        cost: 50,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🧠',
        unlockCondition: () => gameState.wisdomShop.global_ft_multiplier_25?.level >= 1,
        getEffectValue: () => 0.50,
        applyEffect: () => {
            // Applied as global multiplier in GameLogic.tick()
        }
    },

    global_ft_multiplier_75: {
        id: 'global_ft_multiplier_75',
        name: 'Cognitive Enhancement III',
        description: 'Increases all Fleeting Thought generation by 75%',
        cost: 100,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🧠',
        unlockCondition: () => gameState.wisdomShop.global_ft_multiplier_50?.level >= 1,
        getEffectValue: () => 0.75,
        applyEffect: () => {
            // Applied as global multiplier in GameLogic.tick()
        }
    },

    global_ft_multiplier_100: {
        id: 'global_ft_multiplier_100',
        name: 'Cognitive Enhancement IV',
        description: 'Increases all Fleeting Thought generation by 100%',
        cost: 200,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🧠',
        unlockCondition: () => gameState.wisdomShop.global_ft_multiplier_75?.level >= 1,
        getEffectValue: () => 1.0,
        applyEffect: () => {
            // Applied as global multiplier in GameLogic.tick()
        }
    },

    global_ft_multiplier_150: {
        id: 'global_ft_multiplier_150',
        name: 'Cognitive Enhancement V',
        description: 'Increases all Fleeting Thought generation by 150%',
        cost: 400,
        maxLevel: 1,
        category: 'global_multipliers',
        icon: '🧠',
        unlockCondition: () => gameState.wisdomShop.global_ft_multiplier_100?.level >= 1,
        getEffectValue: () => 1.5,
        applyEffect: () => {
            // Applied as global multiplier in GameLogic.tick()
        }
    },

    // Offline Earnings Improvements
    offline_effectiveness: {
        id: 'offline_effectiveness',
        name: 'Persistent Thoughts',
        description: 'Increase offline earnings effectiveness (base: offline earns percentage of online rate)',
        baseCost: 30,
        costScale: 2.5,
        maxLevel: 5,
        category: 'offline',
        icon: '💤',
        unlockCondition: () => gameState.transcendenceCount >= 1,
        getEffectValue: (level) => Math.min(100, 20 + (level * 15)), // 35%, 50%, 65%, 80%, 95%
        applyEffect: (level) => {
            // Applied in GameLogic.calculateOfflineProgress()
        }
    },

    offline_time_cap: {
        id: 'offline_time_cap',
        name: 'Extended Contemplation',
        description: 'Increase the time cap for offline earnings',
        baseCost: 20,
        costScale: 2.0,
        maxLevel: 8,
        category: 'offline',
        icon: '⏰',
        unlockCondition: () => gameState.transcendenceCount >= 1,
        getEffectValue: (level) => 24 + (level * 12), // 36h, 48h, 60h, 72h, 84h, 96h, 108h, 120h (5 days max)
        applyEffect: (level) => {
            // Applied in GameLogic.calculateOfflineProgress()
        }
    }
};