/**
 * API Service for communicating with the backend
 * Handles all HTTP requests to the Spring Boot backend
 */

import { API_CONFIG } from './config.js';

class ApiService {
    constructor() {
        // Use configuration from config.js which handles environment variables
        this.baseUrl = API_CONFIG.BASE_URL;
        this.apiBase = `${this.baseUrl}/api/maze`;
        
        // Log for debugging
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
            console.log('ApiService initialized with base URL:', this.baseUrl);
        }
    }

    /**
     * Check if backend is available
     * @returns {Promise<boolean>}
     */
    async checkHealth() {
        try {
            const response = await fetch(`${this.apiBase}/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.ok;
        } catch (error) {
            console.error('Health check failed:', error);
            return false;
        }
    }

    /**
     * Generate a maze using backend API
     * @param {number} size - Grid size (rows x cols)
     * @returns {Promise<Object>} Maze object with grid, start, end
     */
    async generateMaze(size) {
        try {
            const response = await fetch(`${this.apiBase}/generate?size=${size}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const maze = await response.json();
            return {
                grid: maze.grid,
                start: maze.start,
                end: maze.end,
                rows: maze.rows,
                cols: maze.cols
            };
        } catch (error) {
            console.error('Error generating maze:', error);
            throw new Error(`Failed to generate maze: ${error.message}`);
        }
    }

    /**
     * Solve a maze using backend API
     * @param {Object} mazeData - Maze object with grid, start, end
     * @returns {Promise<Object>} Solution object with path and metadata
     */
    async solveMaze(mazeData) {
        try {
            const response = await fetch(`${this.apiBase}/solve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rows: mazeData.rows,
                    cols: mazeData.cols,
                    grid: mazeData.grid,
                    start: mazeData.start,
                    end: mazeData.end
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return {
                solution: result.solution || [],
                pathLength: result.pathLength || 0,
                found: result.found || false
            };
        } catch (error) {
            console.error('Error solving maze:', error);
            throw new Error(`Failed to solve maze: ${error.message}`);
        }
    }

    /**
     * Solve a maze with step-by-step visited cells for animation
     * @param {Object} mazeData - Maze object with grid, start, end
     * @returns {Promise<Object>} Solution with visited cells in order
     */
    async solveMazeWithSteps(mazeData) {
        try {
            const response = await fetch(`${this.apiBase}/solve-with-steps`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rows: mazeData.rows,
                    cols: mazeData.cols,
                    grid: mazeData.grid,
                    start: mazeData.start,
                    end: mazeData.end
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return {
                solution: result.solution || [],
                visitedOrder: result.visitedOrder || [],
                pathLength: result.pathLength || 0,
                found: result.found || false
            };
        } catch (error) {
            console.error('Error solving maze with steps:', error);
            // Fallback to regular solve if endpoint doesn't exist
            return this.solveMaze(mazeData);
        }
    }
}

// Export singleton instance
export const apiService = new ApiService();
