/**
 * Control handlers for UI interactions
 */

import { updateGridSizeDisplay, updateAnimationSpeedDisplay } from './ui.js';

/**
 * Initialize control event listeners
 * @param {Object} callbacks - Object with callback functions
 * @returns {Object} Control values
 */
export function initializeControls(callbacks) {
    const gridSizeSlider = document.getElementById('gridSize');
    const animationSpeedSlider = document.getElementById('animationSpeed');
    const generateBtn = document.getElementById('generateBtn');
    const solveBtn = document.getElementById('solveBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Grid size slider
    if (gridSizeSlider) {
        const initialSize = parseInt(gridSizeSlider.value);
        updateGridSizeDisplay(initialSize);
        
        gridSizeSlider.addEventListener('input', (e) => {
            const size = parseInt(e.target.value);
            updateGridSizeDisplay(size);
        });
    }

    // Animation speed slider
    if (animationSpeedSlider) {
        const initialSpeed = parseInt(animationSpeedSlider.value);
        updateAnimationSpeedDisplay(initialSpeed);
        
        animationSpeedSlider.addEventListener('input', (e) => {
            const speed = parseInt(e.target.value);
            updateAnimationSpeedDisplay(speed);
        });
    }

    // Generate button
    if (generateBtn && callbacks.onGenerate) {
        generateBtn.addEventListener('click', () => {
            const gridSize = parseInt(gridSizeSlider.value);
            callbacks.onGenerate(gridSize);
        });
    }

    // Solve button
    if (solveBtn && callbacks.onSolve) {
        solveBtn.addEventListener('click', () => {
            const speed = parseInt(animationSpeedSlider.value);
            // Convert speed (1-10) to delay (100ms - 10ms)
            const delay = 110 - (speed * 10);
            callbacks.onSolve(delay);
        });
    }

    // Clear button
    if (clearBtn && callbacks.onClear) {
        clearBtn.addEventListener('click', () => {
            callbacks.onClear();
        });
    }

    return {
        getGridSize: () => parseInt(gridSizeSlider.value),
        getAnimationSpeed: () => parseInt(animationSpeedSlider.value)
    };
}

