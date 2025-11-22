/**
 * Canvas Renderer for maze visualization
 * Handles drawing and animation of maze generation and solving
 */

export class MazeRenderer {
    constructor(canvasId, cellSize = 20) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = cellSize;
        this.maze = null;
        this.visitedCells = new Set();
        this.solutionPath = [];
        this.currentCell = null;
    }

    /**
     * Set the maze to render
     * @param {Array<Array<number>>} maze - 2D maze array
     */
    setMaze(maze) {
        this.maze = maze;
        this.visitedCells.clear();
        this.solutionPath = [];
        this.currentCell = null;
        this.resizeCanvas();
        this.draw();
    }

    /**
     * Resize canvas to fit maze
     */
    resizeCanvas() {
        if (!this.maze) return;

        const rows = this.maze.length;
        const cols = this.maze[0].length;

        // Calculate optimal cell size to fit in viewport
        const maxWidth = Math.min(800, window.innerWidth - 100);
        const maxHeight = Math.min(600, window.innerHeight - 200);
        
        const cellSizeX = Math.floor(maxWidth / cols);
        const cellSizeY = Math.floor(maxHeight / rows);
        this.cellSize = Math.min(cellSizeX, cellSizeY, 20);

        this.canvas.width = cols * this.cellSize;
        this.canvas.height = rows * this.cellSize;
    }

    /**
     * Draw the entire maze
     */
    draw() {
        if (!this.maze) return;

        const rows = this.maze.length;
        const cols = this.maze[0].length;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw each cell
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.drawCell(row, col);
            }
        }
    }

    /**
     * Draw a single cell
     * @param {number} row - Row index
     * @param {number} col - Column index
     */
    drawCell(row, col) {
        const x = col * this.cellSize;
        const y = row * this.cellSize;
        const value = this.maze[row][col];

        // Determine cell color based on state
        let color = '#ffffff';

        if (value === 0) {
            // Wall
            color = '#1a1a1a';
        } else {
            // Path
            const cellKey = `${row},${col}`;
            
            if (this.isStart(row, col)) {
                color = '#00ff00';
            } else if (this.isEnd(row, col)) {
                color = '#ff0000';
            } else if (this.solutionPath.some(c => c.row === row && c.col === col)) {
                color = '#00ff00';
            } else if (this.visitedCells.has(cellKey)) {
                color = '#ffd700'; // Visited cells in yellow
            } else {
                color = '#ffffff'; // Unvisited path
            }
        }

        // Draw cell
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);

        // Draw border
        this.ctx.strokeStyle = '#ddd';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
    }

    /**
     * Check if cell is start position
     * @param {number} row - Row index
     * @param {number} col - Column index
     * @returns {boolean}
     */
    isStart(row, col) {
        return row === 1 && col === 1;
    }

    /**
     * Check if cell is end position
     * @param {number} row - Row index
     * @param {number} col - Column index
     * @returns {boolean}
     */
    isEnd(row, col) {
        if (!this.maze) return false;
        return row === this.maze.length - 2 && col === this.maze[0].length - 2;
    }

    /**
     * Mark a cell as visited
     * @param {Object} cell - {row, col}
     */
    markVisited(cell) {
        const key = `${cell.row},${cell.col}`;
        this.visitedCells.add(key);
        this.drawCell(cell.row, cell.col);
    }

    /**
     * Mark multiple cells as visited
     * @param {Array} cells - Array of {row, col}
     */
    markVisitedCells(cells) {
        cells.forEach(cell => {
            const key = `${cell.row},${cell.col}`;
            this.visitedCells.add(key);
        });
        this.draw();
    }

    /**
     * Set the solution path
     * @param {Array} path - Array of {row, col} representing the solution
     */
    setSolutionPath(path) {
        this.solutionPath = path;
        this.draw();
    }

    /**
     * Clear visited cells and solution
     */
    clearSolution() {
        this.visitedCells.clear();
        this.solutionPath = [];
        this.currentCell = null;
        this.draw();
    }

    /**
     * Reset renderer
     */
    reset() {
        this.visitedCells.clear();
        this.solutionPath = [];
        this.currentCell = null;
        if (this.maze) {
            this.draw();
        }
    }
}

