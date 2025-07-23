// js/utils.js

/**
 * A collection of utility functions for the game.
 */
const Utils = {
    /**
     * Formats a number into a compact, readable string with suffixes (K, M, B, etc.).
     * Handles invalid inputs, integers, decimals, and very large numbers gracefully.
     * @param {number | string} num - The number to format.
     * @returns {string} The formatted number string.
     */
    formatTime(seconds) {
          const h = Math.floor(seconds / 3600);
          const m = Math.floor((seconds % 3600) / 60);
          const s = seconds % 60;

          const parts = [];
          if (h) parts.push(`${h}h`);
          if (m) parts.push(`${m}m`);
          if (s || parts.length === 0) parts.push(`${s}s`);

          return parts.join(' ');
    },

    formatNumber(num) {
        const n = parseFloat(num);

        // Handle invalid inputs by returning a default '0'
        if (isNaN(n) || n === null || n === undefined) {
            return '0';
        }

        if (n === 0) return '0';

        // Use exponential notation for very small non-zero numbers
        if (Math.abs(n) < 0.001) {
            return n.toExponential(1);
        }

        // Handle numbers that don't need a suffix
        if (Math.abs(n) < 1000) {
            if (Number.isInteger(n)) {
                return n.toString();
            } else {
                const fixed = n.toFixed(1);
                return fixed.endsWith('.0') ? fixed.slice(0, -2) : fixed;
            }
        }

        // Handle large numbers with suffixes
        const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
        let i = 0;
        let tempNumAbs = Math.abs(n);

        if (tempNumAbs >= 1000) {
            i = Math.floor(Math.log10(tempNumAbs) / 3);
        }

        // Fallback to scientific notation if number is larger than defined suffixes
        if (i >= suffixes.length) {
            return n.toExponential(2);
        }

        const value = n / Math.pow(1000, i);

        // Determine the number of decimal places for a clean look
        let formattedValue;
        if (Math.abs(value) < 10 && i > 0) {
            formattedValue = value.toFixed(2);
        } else if (Math.abs(value) < 100 && i > 0) {
            formattedValue = value.toFixed(1);
        } else {
            formattedValue = Math.round(value).toString();
        }

        // Clean up trailing ".00" or ".0" that might result from toFixed
        if (formattedValue.includes('.')) {
            formattedValue = formattedValue.replace(/\.00$/, "");
            formattedValue = formattedValue.replace(/(\.\d)0$/, "$1");
        }

        return formattedValue + suffixes[i];
    },

    /**
     * Simple unique ID generator. (Currently unused in the game logic but useful for debugging or future features).
     */
    uid: (() => { let i = 0; return () => `id_${i++}`; })(),

    /**
     * Capitalizes the first letter of a string.
     * @param {string} str - The input string.
     * @returns {string} The capitalized string.
     */
    capitalizeFirst(str) {
        if (typeof str !== 'string' || str.length === 0) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};
