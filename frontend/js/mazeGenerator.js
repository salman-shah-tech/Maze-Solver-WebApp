/**
 * Maze Generator using Recursive Backtracking (DFS-based)
 * Creates a perfect maze (only one unique path between any two points)
 */

import { getNeighbors, shuffleArray } from './utils.js';

export class MazeGenerator {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.maze = null;
    }

    /**
     * Generate a maze using Recursive Backtracking algorithm
     * @returns {Array<Array<number>>} 2D array where 0 = wall, 1 = path
     */
    generate() {
        // Initialize maze with all walls (0 = wall, 1 = path)
        // We use a grid where odd rows/cols are cells, even are walls
        const gridRows = this.rows * 2 + 1;
        const gridCols = this.cols * 2 + 1;
        
        this.maze = Array(gridRows).fill(null).map(() => 
            Array(gridCols).fill(0)
        );

        // Mark all cells as unvisited initially
        const visited = Array(this.rows).fill(null).map(() => 
            Array(this.cols).fill(false)
        );

        // Start from top-left (0, 0)
        const stack = [{ row: 0, col: 0 }];
        visited[0][0] = true;

        // Convert cell coordinates to grid coordinates
        const cellToGrid = (cellRow, cellCol) => ({
            gridRow: cellRow * 2 + 1,
            gridCol: cellCol * 2 + 1
        });

        while (stack.length > 0) {
            const current = stack[stack.length - 1];
            const { gridRow, gridCol } = cellToGrid(current.row, current.col);
            
            // Mark current cell as path
            this.maze[gridRow][gridCol] = 1;

            // Get unvisited neighbors
            const neighbors = getNeighbors(current.row, current.col, this.rows, this.cols)
                .filter(n => !visited[n.row][n.col]);

            if (neighbors.length > 0) {
                // Choose random unvisited neighbor
                const shuffled = shuffleArray(neighbors);
                const next = shuffled[0];

                // Mark neighbor as visited
                visited[next.row][next.col] = true;

                // Remove wall between current and next
                const nextGrid = cellToGrid(next.row, next.col);
                const wallRow = (gridRow + nextGrid.gridRow) / 2;
                const wallCol = (gridCol + nextGrid.gridCol) / 2;
                this.maze[wallRow][wallCol] = 1;

                // Add to stack
                stack.push(next);
            } else {
                // Backtrack
                stack.pop();
            }
        }

        // Set start (top-left) and end (bottom-right)
        const startGrid = cellToGrid(0, 0);
        const endGrid = cellToGrid(this.rows - 1, this.cols - 1);
        
        this.maze[startGrid.gridRow][startGrid.gridCol] = 1;
        this.maze[endGrid.gridRow][endGrid.gridCol] = 1;

        // Ensure entrance and exit are open
        this.maze[0][startGrid.gridCol] = 1; // Top entrance
        this.maze[gridRows - 1][endGrid.gridCol] = 1; // Bottom exit

        return this.maze;
    }

    /**
     * Get the generated maze
     * @returns {Array<Array<number>>}
     */
    getMaze() {
        return this.maze;
    }

    /**
     * Get start position in grid coordinates
     * @returns {Object} {row, col}
     */
    getStart() {
        return {
            row: 1,
            col: 1
        };
    }

    /**
     * Get end position in grid coordinates
     * @returns {Object} {row, col}
     */
    getEnd() {
        return {
            row: this.rows * 2 - 1,
            col: this.cols * 2 - 1
        };
    }
}

