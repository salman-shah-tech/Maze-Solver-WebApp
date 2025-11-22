/**
 * UI Component utilities
 */

/**
 * Update status text
 * @param {string} text - Status message
 */
export function updateStatus(text) {
    const statusElement = document.getElementById('statusText');
    if (statusElement) {
        statusElement.textContent = text;
    }
}

/**
 * Update path length display
 * @param {number} length - Path length
 */
export function updatePathLength(length) {
    const pathLengthElement = document.getElementById('pathLength');
    if (pathLengthElement) {
        pathLengthElement.textContent = length > 0 ? length : '-';
    }
}

/**
 * Update grid size display
 * @param {number} size - Grid size
 */
export function updateGridSizeDisplay(size) {
    const gridSizeValue = document.getElementById('gridSizeValue');
    if (gridSizeValue) {
        gridSizeValue.textContent = `${size}x${size}`;
    }
}

/**
 * Update animation speed display
 * @param {number} speed - Animation speed (1-10)
 */
export function updateAnimationSpeedDisplay(speed) {
    const animationSpeedValue = document.getElementById('animationSpeedValue');
    if (animationSpeedValue) {
        animationSpeedValue.textContent = speed;
    }
}

/**
 * Enable/disable solve button
 * @param {boolean} enabled - Whether button should be enabled
 */
export function setSolveButtonEnabled(enabled) {
    const solveBtn = document.getElementById('solveBtn');
    if (solveBtn) {
        solveBtn.disabled = !enabled;
    }
}

/**
 * Enable/disable generate button
 * @param {boolean} enabled - Whether button should be enabled
 */
export function setGenerateButtonEnabled(enabled) {
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.disabled = !enabled;
    }
}

/**
 * Update backend connection status
 * @param {boolean} connected - Whether backend is connected
 */
export function updateBackendStatus(connected) {
    const backendStatus = document.getElementById('backendStatus');
    if (backendStatus) {
        backendStatus.className = 'backend-status ' + (connected ? 'connected' : 'disconnected');
        backendStatus.textContent = connected ? '✅ Connected' : '❌ Disconnected';
    }
}

/**
 * Set backend status to checking
 */
export function setBackendStatusChecking() {
    const backendStatus = document.getElementById('backendStatus');
    if (backendStatus) {
        backendStatus.className = 'backend-status checking';
        backendStatus.textContent = '⏳ Checking...';
    }
}

