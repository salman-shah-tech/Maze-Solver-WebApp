/**
 * Main application entry point
 * Orchestrates maze generation, solving, and visualization
 * Now uses backend API for all algorithm operations
 */

import { apiService } from './js/apiService.js';
import { MazeRenderer } from './js/renderer.js';
import { initializeControls } from './components/controls.js';
import { 
    //updateStatus, 
    updatePathLength, 
    setSolveButtonEnabled,
    setGenerateButtonEnabled,
    updateBackendStatus,
    //setBackendStatusChecking
} from './components/ui.js';
import { sleep } from './js/utils.js';

class MazeSolverApp {
    constructor() {
        this.mazeData = null; // Store maze data from backend
        this.renderer = new MazeRenderer('mazeCanvas');
        this.isGenerating = false;
        this.isSolving = false;
        this.backendConnected = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        setBackendStatusChecking();
        updateStatus('Checking backend connection...');
        
        // Check if backend is available
        this.backendConnected = await apiService.checkHealth();
        updateBackendStatus(this.backendConnected);
        
        if (this.backendConnected) {
            updateStatus('Ready - Click "Generate Maze" to start');
        } else {
            updateStatus('⚠️ Backend not connected. Please start the backend server on port 8080');
        }
        
        // Initialize controls
        initializeControls({
            onGenerate: (gridSize) => this.generateMaze(gridSize),
            onSolve: (delay) => this.solveMaze(delay),
            onClear: () => this.clear()
        });
    }

    /**
     * Generate a new maze using backend API
     * @param {number} gridSize - Size of the grid (rows x cols)
     */
    async generateMaze(gridSize) {
        if (this.isGenerating || this.isSolving) return;

        // Check backend connection
        if (!this.backendConnected) {
            setBackendStatusChecking();
            this.backendConnected = await apiService.checkHealth();
            updateBackendStatus(this.backendConnected);
            if (!this.backendConnected) {
                updateStatus('❌ Backend not available. Please start the backend server.');
                return;
            }
        }

        this.isGenerating = true;
        setGenerateButtonEnabled(false);
        setSolveButtonEnabled(false);
        updateStatus('Generating maze via backend...');
        updatePathLength(0);

        try {
            // Call backend API to generate maze
            this.mazeData = await apiService.generateMaze(gridSize);

            // Render the maze
            this.renderer.setMaze(this.mazeData.grid);

            updateStatus('Maze generated! Click "Solve Maze" to find the path');
            setSolveButtonEnabled(true);
        } catch (error) {
            console.error('Error generating maze:', error);
            updateStatus(`❌ Error: ${error.message}`);
            this.backendConnected = false;
            updateBackendStatus(false);
        } finally {
            this.isGenerating = false;
            setGenerateButtonEnabled(true);
        }
    }

    /**
     * Solve the current maze using backend API
     * @param {number} delay - Delay between animation steps (ms)
     */
    async solveMaze(delay) {
        if (!this.mazeData || this.isSolving || this.isGenerating) {
            return;
        }

        // Check backend connection
        if (!this.backendConnected) {
            setBackendStatusChecking();
            this.backendConnected = await apiService.checkHealth();
            updateBackendStatus(this.backendConnected);
            if (!this.backendConnected) {
                updateStatus('❌ Backend not available. Please start the backend server.');
                return;
            }
        }

        this.isSolving = true;
        setSolveButtonEnabled(false);
        setGenerateButtonEnabled(false);
        updateStatus('Solving maze with BFS via backend...');

        // Clear previous solution
        this.renderer.clearSolution();

        try {
            // Try to get step-by-step solution for animation
            const result = await apiService.solveMazeWithSteps(this.mazeData);

            if (result.visitedOrder && result.visitedOrder.length > 0) {
                // Animate visited cells step by step
                await this.animateVisitedCells(result.visitedOrder, delay);
            } else {
                // Simulate animation by showing solution path progressively
                await this.animateSolutionPath(result.solution, delay);
            }

            // Show final solution
            if (result.solution && result.solution.length > 0) {
                this.renderer.setSolutionPath(result.solution);
                updatePathLength(result.pathLength);
                updateStatus(`✅ Path found! Length: ${result.pathLength} cells`);
            } else {
                updateStatus('❌ No path found');
                updatePathLength(0);
            }
        } catch (error) {
            console.error('Error solving maze:', error);
            updateStatus(`❌ Error: ${error.message}`);
            this.backendConnected = false;
            updateBackendStatus(false);
        } finally {
            this.isSolving = false;
            setSolveButtonEnabled(true);
            setGenerateButtonEnabled(true);
        }
    }

    /**
     * Animate visited cells in order
     * @param {Array} visitedOrder - Array of visited cells in order
     * @param {number} delay - Delay between steps
     */
    async animateVisitedCells(visitedOrder, delay) {
        for (const cell of visitedOrder) {
            this.renderer.markVisited(cell);
            if (delay > 0) {
                await sleep(delay);
            }
        }
    }

    /**
     * Animate solution path progressively (fallback when visited order not available)
     * @param {Array} solution - Solution path
     * @param {number} delay - Delay between steps
     */
    async animateSolutionPath(solution, delay) {
        if (!solution || solution.length === 0) return;

        // Show path progressively
        for (let i = 0; i < solution.length; i++) {
            const partialPath = solution.slice(0, i + 1);
            this.renderer.setSolutionPath(partialPath);
            
            // Also mark as visited for visual feedback
            this.renderer.markVisited(solution[i]);
            
            if (delay > 0) {
                await sleep(delay);
            }
        }
    }

    /**
     * Clear the current maze and reset
     */
    clear() {
        if (this.isGenerating || this.isSolving) return;

        this.mazeData = null;
        this.renderer.reset();
        this.renderer.setMaze(null);
        
        if (this.backendConnected) {
            updateStatus('Ready - Click "Generate Maze" to start');
        } else {
            updateStatus('⚠️ Backend not connected. Please start the backend server.');
        }
        updatePathLength(0);
        setSolveButtonEnabled(false);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new MazeSolverApp();
    app.init();
});
