// Page Navigation Detection
document.addEventListener('DOMContentLoaded', function() {
  // Intercept all internal link clicks to show the ad on navigation
  document.body.addEventListener('click', function(e) {
    // Find if the click was on a link or inside a link
    let target = e.target;
    while (target && target !== document.body) {
      if (target.tagName === 'A') {
        // Check if it's an internal link (same origin)
        const href = target.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#')) {
          // It's an internal link, mark that we're navigating
          sessionStorage.setItem('pageNavigation', 'true');
          break;
        }
      }
      target = target.parentNode;
    }
  });
  
  // Check if we just navigated from another page
  if (sessionStorage.getItem('pageNavigation') === 'true') {
    // Clear the flag
    sessionStorage.removeItem('pageNavigation');
    
    // Force show the ad regardless of previous state
    localStorage.removeItem('adCollapsed');
    localStorage.removeItem('adCollapsedTime');
    
    // Initialize the ad (it will show automatically)
    const existingAd = document.querySelector('.collapsible-ad');
    if (existingAd) {
      existingAd.remove();
    }
    
    // Small delay to ensure DOM is ready
    setTimeout(function() {
      // This will be called by the main script, but we need to make sure
      // it's available in this context
      if (typeof initCollapsibleAd === 'function') {
        initCollapsibleAd();
      }
    }, 100);
  }
});
