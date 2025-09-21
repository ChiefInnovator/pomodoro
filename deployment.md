# Pomodoro Web Application - Deployment Instructions

## Local Development Setup

1. Clone or download the repository to your local machine
2. Navigate to the project directory
3. Open `index.html` in your web browser to run the application locally

No build process is required as this is a vanilla JavaScript application.

## Customization Options

### Changing Colors
To modify the color scheme, edit the CSS variables in the `:root` selector in `css/styles.css`:

```css
:root {
    --primary-color: #e74c3c; /* Tomato red */
    --primary-dark: #c0392b; /* Darker red */
    --primary-light: #f9ebea; /* Light red */
    --secondary-color: #f39c12; /* Orange */
    /* Other variables... */
}
```

### Adding Custom Sounds
To replace the default sounds:

1. Place your custom sound files in the `/sounds` directory
2. Update the file paths in `app.js` where the sounds are initialized:

```javascript
const sounds = {
    workComplete: new Audio('sounds/your-work-complete-sound.mp3'),
    breakComplete: new Audio('sounds/your-break-complete-sound.mp3'),
    buttonClick: new Audio('sounds/your-button-click-sound.mp3')
};
```

### Modifying Default Settings
To change the default timer durations, edit the settings object in `app.js`:

```javascript
const appState = {
    // Other properties...
    settings: {
        workDuration: 25, // Change default work duration (minutes)
        shortBreakDuration: 5, // Change default short break (minutes)
        longBreakDuration: 15, // Change default long break (minutes)
        longBreakInterval: 4, // Change number of pomodoros before long break
        // Other settings...
    }
};
```

## Production Deployment

### Web Server Deployment
1. Upload all files to your web server
2. Ensure the server is configured to serve static files
3. Make sure the server supports HTTPS for service worker functionality

### GitHub Pages Deployment
1. Push the project to a GitHub repository
2. Enable GitHub Pages in the repository settings
3. Select the branch you want to deploy (usually `main` or `master`)

### Netlify Deployment
1. Sign up for a Netlify account
2. Drag and drop the project folder to the Netlify dashboard
3. Configure your domain settings as needed

## Troubleshooting

### Service Worker Issues
If the offline functionality isn't working:

1. Make sure you're serving the app over HTTPS (required for service workers)
2. Check the browser console for service worker registration errors
3. Verify that the service worker path in `index.html` is correct

### Sound Not Playing
If sound notifications aren't working:

1. Check if the browser has autoplay restrictions
2. Verify that the sound files exist in the correct location
3. Make sure the volume is not muted in the app settings

### Cross-Browser Compatibility
If you encounter issues in specific browsers:

1. Check the browser console for errors
2. Verify that you're using web standards compatible with your target browsers
3. Consider adding polyfills for older browsers if needed
