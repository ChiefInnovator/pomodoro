// utils.js - Shared utility functions
// Contains common functionality used across pages

/**
 * Detect if user is on a mobile device
 * @returns {boolean} True if on mobile device
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Sanitize a string to prevent XSS attacks
 * @param {string} str - The string to sanitize
 * @returns {string} Sanitized string safe for HTML display
 */
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Initialize common page functionality
 */
function initCommonFeatures() {
    // Hide share button on mobile devices
    const shareBtn = document.getElementById('shareButton');
    if (shareBtn && isMobileDevice()) {
        shareBtn.style.display = 'none';
    }
}

/**
 * Register the service worker for offline functionality
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(() => {
                    // Service worker registered successfully
                })
                .catch(() => {
                    // Service worker registration failed - silent fail for production
                });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initCommonFeatures);

// Register service worker
registerServiceWorker();

// Export for use in other modules
window.sanitizeHTML = sanitizeHTML;
window.isMobileDevice = isMobileDevice;
