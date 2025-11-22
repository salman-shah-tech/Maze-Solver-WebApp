/**
 * Maze Solver using BFS (Breadth-First Search)
 * Finds the shortest path from start to end
 */

import { getNeighbors, cellsEqual } from './utils.js';

export class MazeSolver {
    constructor(maze, start, end) {
        this.maze = maze;
        this.start = start;
        this.end = end;
        this.rows = maze.length;
        this.cols = maze[0].length;
    }

    /**
     * Solve the maze using BFS
     * @param {Function} onVisit - Callback when a cell is visited (for animation)
     * @param {Function} onComplete - Callback when solution is found
     * @param {number} delay - Delay between steps (ms)
     * @returns {Promise<Array>} Array of {row, col} representing the path
     */
    async solve(onVisit = null, onComplete = null, delay = 0) {
        const queue = [this.start];
        const visited = new Set();
        const parent = new Map();
        const visitedOrder = [];

        // Mark start as visited
        visited.add(`${this.start.row},${this.start.col}`);
        visitedOrder.push({ ...this.start });

        // BFS traversal
        while (queue.length > 0) {
            const current = queue.shift();

            // Check if we reached the end
            if (cellsEqual(current, this.end)) {
                // Reconstruct path
                const path = this.reconstructPath(parent, this.start, this.end);
                
                if (onComplete) {
                    await onComplete(path);
                }
                
                return path;
            }

            // Get valid neighbors (paths, not walls)
            const neighbors = getNeighbors(current.row, current.col, this.rows, this.cols)
                .filter(n => {
                    // Check if it's a path (1) and not visited
                    const key = `${n.row},${n.col}`;
                    return this.maze[n.row][n.col] === 1 && !visited.has(key);
                });

            for (const neighbor of neighbors) {
                const key = `${neighbor.row},${neighbor.col}`;
                visited.add(key);
                parent.set(key, current);
                queue.push(neighbor);
                visitedOrder.push({ ...neighbor });

                // Callback for animation
                if (onVisit) {
                    await onVisit(neighbor, visitedOrder);
                }

                if (delay > 0) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        // No path found
        if (onComplete) {
            await onComplete([]);
        }
        
        return [];
    }

    /**
     * Reconstruct path from parent map
     * @param {Map} parent - Map of cell to parent cell
     * @param {Object} start - Start cell
     * @param {Object} end - End cell
     * @returns {Array} Path from start to end
     */
    reconstructPath(parent, start, end) {
        const path = [];
        let current = end;

        while (current) {
            path.unshift({ ...current });
            
            if (cellsEqual(current, start)) {
                break;
            }

            const key = `${current.row},${current.col}`;
            current = parent.get(key);
        }

        return path;
    }

    /**
     * Get all visited cells during BFS
     * @returns {Array} Array of visited cells
     */
    getVisitedCells() {
        // This would be populated during solve()
        return [];
    }
}

