/**
 * Utility functions for maze operations
 */

/**
 * Get neighbors of a cell (up, down, left, right)
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} rows - Total rows
 * @param {number} cols - Total columns
 * @returns {Array} Array of {row, col} objects
 */
export function getNeighbors(row, col, rows, cols) {
    const neighbors = [];
    const directions = [
        { dr: -1, dc: 0 }, // up
        { dr: 1, dc: 0 },  // down
        { dr: 0, dc: -1 }, // left
        { dr: 0, dc: 1 }   // right
    ];

    for (const dir of directions) {
        const newRow = row + dir.dr;
        const newCol = col + dir.dc;
        
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            neighbors.push({ row: newRow, col: newCol });
        }
    }

    return neighbors;
}

/**
 * Get the cell between two adjacent cells
 * @param {number} row1 - First cell row
 * @param {number} col1 - First cell col
 * @param {number} row2 - Second cell row
 * @param {number} col2 - Second cell col
 * @returns {Object} {row, col} of the wall cell
 */
export function getWallBetween(row1, col1, row2, col2) {
    return {
        row: row1 + (row2 - row1) / 2,
        col: col1 + (col2 - col1) / 2
    };
}

/**
 * Sleep function for animation delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise}
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Check if two cells are equal
 * @param {Object} cell1 - First cell {row, col}
 * @param {Object} cell2 - Second cell {row, col}
 * @returns {boolean}
 */
export function cellsEqual(cell1, cell2) {
    return cell1.row === cell2.row && cell1.col === cell2.col;
}

