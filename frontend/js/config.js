/**
 * Configuration for API endpoint
 * Supports environment variables for production deployment
 */

// Determine the API base URL
// Priority: Environment variable > Production detection > Localhost
function getApiBaseUrl() {
    // Check for Vite environment variable (Vercel/other platforms)
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
    
    // Production detection: if not localhost, use relative URL or default
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        
        // Local development
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:8080';
        }
        
        // Production: Use environment variable or default placeholder
        // Set VITE_API_URL environment variable in Vercel dashboard
        // If not set, this will cause an error - which is intentional
        // to remind you to set the environment variable
        const defaultProdUrl = 'https://your-backend-url.com';
        
        // Log warning if using placeholder
        console.warn('⚠️ Using placeholder backend URL. Set VITE_API_URL environment variable!');
        console.warn('Current URL:', defaultProdUrl);
        
        return defaultProdUrl;
    }
    
    // Fallback
    return 'http://localhost:8080';
}

export const API_CONFIG = {
    BASE_URL: getApiBaseUrl()
};

// Log for debugging (only in development)
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('API Base URL:', API_CONFIG.BASE_URL);
}

