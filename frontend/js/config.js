/**
 * Configuration for API endpoint
 * Supports environment variables for production deployment
 */

// Determine the API base URL
// Priority: Environment variable > Hardcoded production URL > Localhost
function getApiBaseUrl() {
    // Check for Vite environment variable (Vercel/other platforms)
    // Note: For Vercel static sites, env vars need to be available at build time
    if (import.meta.env?.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    
    // Check for process.env (Node.js environments)
    if (typeof process !== 'undefined' && process.env?.VITE_API_URL) {
        return process.env.VITE_API_URL;
    }
    
    // Check for window.env (some deployment platforms)
    if (typeof window !== 'undefined' && window.env?.VITE_API_URL) {
        return window.env.VITE_API_URL;
    }
    
    // Production detection: if not localhost, use hardcoded backend URL
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        
        // Local development
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8080';
        }
        
        // Production: Use hardcoded Railway backend URL
        // This will work even if environment variable is not set
        // But ideally, set VITE_API_URL in Vercel for flexibility
        const productionBackendUrl = 'https://maze-solver-webapp-production.up.railway.app';
        
        console.log('🌐 Using production backend URL:', productionBackendUrl);
        
        return productionBackendUrl;
    }
    
    // Fallback
    return 'http://localhost:8080';
}

export const API_CONFIG = {
    BASE_URL: getApiBaseUrl()
};

// Log for debugging (always log in production to help debug)
if (typeof window !== 'undefined') {
    console.log('🌐 API Base URL:', API_CONFIG.BASE_URL);
    console.log('📍 Current Hostname:', window.location.hostname);
    
    // Check if using placeholder
    if (API_CONFIG.BASE_URL === 'https://your-backend-url.com') {
        console.error('❌ ERROR: Backend URL not configured!');
        console.error('Please set VITE_API_URL environment variable in Vercel');
    }
}

