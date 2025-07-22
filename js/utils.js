// js/utils.js
const Utils = {
    /**
     * Formats a number into a more readable string, using suffixes for large numbers (K, M, B, etc.)
     * and appropriate decimal places for smaller numbers.
     * @param {number | string} num - The number or numeric string to format.
     * @returns {string} The formatted number string, or '0' for invalid inputs.
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

        if (isNaN(n) || n === null || n === undefined) {
            return '0';
        }
        if (n === 0) return '0';

        if (Math.abs(n) < 0.001 && n !== 0) { // Use exponential for very small non-zero
            return n.toExponential(1);
        }
        if (Math.abs(n) < 1000) {
            if (Number.isInteger(n)) return n.toString();
            const fixed = n.toFixed(1);
            return fixed.endsWith('.0') ? fixed.slice(0, -2) : fixed;
        }

        const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "UDc", "DDc", "TDc", "QaDc", "QiDc", "SxDc", "SpDc", "OcDc", "NoDc", "Vg"]; // Added more suffixes
        let i = 0;
        let tempNumAbs = Math.abs(n);

        if (tempNumAbs >= 1000) {
            i = Math.floor(Math.log10(tempNumAbs) / 3);
        }

        if (i >= suffixes.length) {
            return n.toExponential(2); // Fallback for extremely large numbers
        }

        const value = n / Math.pow(1000, i);
        let formattedValue;

        if (i === 0) { // No suffix, show up to 1 decimal if not integer
             if (Number.isInteger(value)) formattedValue = value.toString();
             else formattedValue = value.toFixed(1).replace(/\.0$/, "");
        } else if (Math.abs(value) < 10) { // e.g., 1.23K
            formattedValue = value.toFixed(2);
        } else if (Math.abs(value) < 100) { // e.g., 12.3K
            formattedValue = value.toFixed(1);
        } else { // e.g., 123K
            formattedValue = Math.floor(value).toString(); // No decimals for 100+ with suffix
        }
        // Remove trailing .00 or .0 from fixed point numbers with suffixes
        if (i > 0) {
            formattedValue = formattedValue.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
        }

        return formattedValue + suffixes[i];
    },

    /**
     * Generates a simple unique ID string.
     * @returns {string} A unique ID like "id_0", "id_1", etc.
     */
    uid: (() => { let i = 0; return () => `id_${i++}`; })(),

    /**
     * Capitalizes the first letter of a string.
     * @param {string} str - The input string.
     * @returns {string} The string with its first letter capitalized, or an empty string if input is invalid.
     */
    capitalizeFirst(str) {
        if (typeof str !== 'string' || str.length === 0) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};
