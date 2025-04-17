// timer.js - Handles timer functionality
// Manages timer state, countdown, and animations

// Timer state
const timerState = {
    minutes: 25,
    seconds: 0,
    totalSeconds: 25 * 60,
    currentSeconds: 25 * 60,
    timerId: null,
    windingAnimation: null
};

// Initialize timer functionality
function initTimer() {
    // Set initial timer values based on settings
    resetTimer();
    
    // Add event listeners
    elements.timer.startButton.addEventListener('click', startTimer);
    elements.timer.pauseButton.addEventListener('click', pauseTimer);
    elements.timer.resetButton.addEventListener('click', resetTimer);
    elements.timer.knob.addEventListener('click', windTimer);
    
    // Update timer display
    updateTimerDisplay();
    
    console.log('Timer initialized');
}

// Start the timer
function startTimer() {
    if (appState.isRunning) return;
    
    appState.isRunning = true;
    updateButtonStates();
    
    // Play button click sound
    playSound(sounds.buttonClick);
    
    // Start the countdown
    timerState.timerId = setInterval(() => {
        timerState.currentSeconds--;
        
        if (timerState.currentSeconds < 0) {
            completeTimer();
            return;
        }
        
        // Update minutes and seconds
        timerState.minutes = Math.floor(timerState.currentSeconds / 60);
        timerState.seconds = timerState.currentSeconds % 60;
        
        // Update timer display
        updateTimerDisplay();
        
        // Update progress indicator
        updateTimerProgress();
    }, 1000);
    
    console.log('Timer started');
}

// Pause the timer
function pauseTimer() {
    if (!appState.isRunning) return;
    
    appState.isRunning = false;
    clearInterval(timerState.timerId);
    updateButtonStates();
    
    // Play button click sound
    playSound(sounds.buttonClick);
    
    console.log('Timer paused');
}

// Reset the timer
function resetTimer() {
    // Clear any existing timer
    if (timerState.timerId) {
        clearInterval(timerState.timerId);
    }
    
    appState.isRunning = false;
    
    // Set timer duration based on current session type
    switch (appState.currentSession) {
        case 'work':
            timerState.totalSeconds = appState.settings.workDuration * 60;
            break;
        case 'shortBreak':
            timerState.totalSeconds = appState.settings.shortBreakDuration * 60;
            break;
        case 'longBreak':
            timerState.totalSeconds = appState.settings.longBreakDuration * 60;
            break;
    }
    
    // Reset current seconds
    timerState.currentSeconds = timerState.totalSeconds;
    
    // Update minutes and seconds
    timerState.minutes = Math.floor(timerState.currentSeconds / 60);
    timerState.seconds = timerState.currentSeconds % 60;
    
    // Update UI
    updateTimerDisplay();
    updateButtonStates();
    resetTimerProgress();
    
    console.log('Timer reset');
}

// Complete the current timer session
function completeTimer() {
    clearInterval(timerState.timerId);
    
    // Play appropriate sound
    if (appState.currentSession === 'work') {
        playSound(sounds.workComplete);
        
        // Increment pomodoro count
        appState.pomodoroCount++;
        elements.timer.pomodoroCount.textContent = appState.pomodoroCount;
        
        // Handle work session completion for task tracking
        if (typeof handleWorkSessionCompletion === 'function') {
            handleWorkSessionCompletion();
        }
        
        // Save to local storage
        saveSettings();
        
        // Update stats
        updateStats();
        
        // Check if it's time for a long break
        if (appState.pomodoroCount % appState.settings.longBreakInterval === 0) {
            appState.currentSession = 'longBreak';
        } else {
            appState.currentSession = 'shortBreak';
        }
    } else {
        playSound(sounds.breakComplete);
        appState.currentSession = 'work';
    }
    
    // Update session type display
    updateSessionType();
    
    // Reset timer for next session
    resetTimer();
    
    // Show notification if available
    showNotification();
    
    console.log('Timer completed');
}

// Show browser notification
function showNotification() {
    if (!("Notification" in window)) {
        return;
    }
    
    if (Notification.permission === "granted") {
        let message = '';
        if (appState.currentSession === 'work') {
            message = 'Time to focus! Work session started.';
        } else if (appState.currentSession === 'shortBreak') {
            message = 'Take a short break! You\'ve earned it.';
        } else {
            message = 'Time for a longer break! Relax and recharge.';
        }
        
        const notification = new Notification('Pomodoro Timer', {
            body: message,
            icon: '/assets/icon-192x192.png'
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}

// Wind the timer (skeuomorphic animation)
function windTimer() {
    if (appState.isRunning) return;
    
    // Play winding sound
    playSound(sounds.buttonClick);
    
    // Add winding animation class
    elements.timer.knob.classList.add('winding');
    
    // Remove class after animation completes
    setTimeout(() => {
        elements.timer.knob.classList.remove('winding');
        startTimer();
    }, 2000);
}

// Update timer progress indicator
function updateTimerProgress() {
    const progressPercentage = (1 - timerState.currentSeconds / timerState.totalSeconds) * 360;
    elements.timer.progress.style.transform = `rotate(${progressPercentage}deg)`;
}

// Reset timer progress indicator
function resetTimerProgress() {
    elements.timer.progress.style.transform = 'rotate(0deg)';
}

// Export for other modules
window.timerState = timerState;
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
