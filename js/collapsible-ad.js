// Collapsible Ad Component
document.addEventListener('DOMContentLoaded', function() {
  // Create the collapsible ad element
  function createCollapsibleAd() {
    const adContainer = document.createElement('div');
    adContainer.className = 'collapsible-ad';
    adContainer.innerHTML = `
      <div class="collapsible-ad-header">
        <span class="collapsible-ad-title">Advertisement</span>
        <button class="collapsible-ad-toggle" aria-label="Close advertisement">×</button>
      </div>
      <div class="collapsible-ad-content">
        <div class="ad-placeholder">
          <p>Ad Space</p>
          <!-- Replace with actual ad code in production -->
        </div>
      </div>
    `;
    
    document.body.appendChild(adContainer);
    return adContainer;
  }
  
  // Add event listeners to the ad
  function setupAdBehavior(adElement) {
    const toggleButton = adElement.querySelector('.collapsible-ad-toggle');
    const adHeader = adElement.querySelector('.collapsible-ad-header');
    
    // Toggle ad visibility when the close button is clicked
    toggleButton.addEventListener('click', function() {
      adElement.classList.toggle('expanded');
      
      // Store the state in localStorage so it stays collapsed on page refresh
      if (!adElement.classList.contains('expanded')) {
        localStorage.setItem('adCollapsed', 'true');
        // Store the timestamp when the ad was manually collapsed
        localStorage.setItem('adCollapsedTime', Date.now().toString());
      } else {
        localStorage.removeItem('adCollapsed');
        localStorage.removeItem('adCollapsedTime');
      }
    });
    
    // Toggle ad visibility when the header is clicked
    adHeader.addEventListener('click', function(e) {
      // Only toggle if the click wasn't on the close button
      if (e.target !== toggleButton) {
        adElement.classList.toggle('expanded');
        
        // Update localStorage
        if (!adElement.classList.contains('expanded')) {
          localStorage.setItem('adCollapsed', 'true');
          // Store the timestamp when the ad was manually collapsed
          localStorage.setItem('adCollapsedTime', Date.now().toString());
        } else {
          localStorage.removeItem('adCollapsed');
          localStorage.removeItem('adCollapsedTime');
        }
      }
    });
  }
  
  // Initialize the ad
  window.initCollapsibleAd = function() {
    const adElement = createCollapsibleAd();
    setupAdBehavior(adElement);
    
    // Check if we just navigated from another page
    const isPageNavigation = sessionStorage.getItem('pageNavigation') === 'true';
    
    // If this is a page navigation, we always show the ad
    if (isPageNavigation) {
      sessionStorage.removeItem('pageNavigation');
      
      // Show the ad after a short delay
      setTimeout(function() {
        adElement.classList.add('expanded');
        
        // Auto-collapse the ad after 20 seconds
        setTimeout(function() {
          adElement.classList.remove('expanded');
        }, 20000); // 20 seconds
      }, 500); // shorter delay for navigation
      
      return;
    }
    
    // For normal page loads, check if the ad was previously collapsed by the user
    const wasCollapsed = localStorage.getItem('adCollapsed');
    const lastCollapsedTime = localStorage.getItem('adCollapsedTime');
    const currentTime = Date.now();
    
    // If the ad was collapsed less than 5 minutes ago, keep it collapsed
    // This prevents the ad from showing again immediately if the user just collapsed it
    if (wasCollapsed && lastCollapsedTime && (currentTime - parseInt(lastCollapsedTime)) < 5 * 60 * 1000) {
      return;
    }
    
    // Show the ad after a delay
    setTimeout(function() {
      adElement.classList.add('expanded');
      
      // Auto-collapse the ad after 20 seconds
      setTimeout(function() {
        adElement.classList.remove('expanded');
        // Don't store in localStorage so it will show again on next page navigation
      }, 20000); // 20 seconds
    }, 2000); // 2 seconds delay before showing
  };
  
  // Initialize the ad when the page loads
  initCollapsibleAd();
  
  // Listen for page navigation events (when using History API)
  window.addEventListener('popstate', function() {
    // Remove any existing ad first
    const existingAd = document.querySelector('.collapsible-ad');
    if (existingAd) {
      existingAd.remove();
    }
    
    // Set the navigation flag
    sessionStorage.setItem('pageNavigation', 'true');
    
    // Initialize a new ad
    setTimeout(function() {
      initCollapsibleAd();
    }, 100); // Small delay to ensure DOM is ready
  });
});
