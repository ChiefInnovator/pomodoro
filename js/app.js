// app.js - Main application file
// Handles initialization and coordination between modules

// Global state
const appState = {
    isRunning: false,
    currentSession: 'work', // 'work', 'shortBreak', 'longBreak'
    pomodoroCount: 0,
    currentTaskId: null,
    settings: {
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        longBreakInterval: 4,
        volume: 50,
        mute: false
    }
};

// DOM Elements
const elements = {
    timer: {
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        knob: document.getElementById('timerKnob'),
        progress: document.getElementById('timerProgress'),
        startButton: document.getElementById('startButton'),
        pauseButton: document.getElementById('pauseButton'),
        resetButton: document.getElementById('resetButton'),
        sessionType: document.getElementById('sessionType'),
        pomodoroCount: document.getElementById('pomodoroCount')
    },
    settings: {
        button: document.getElementById('settingsButton'),
        modal: document.getElementById('settingsModal'),
        closeButton: document.getElementById('closeSettings'),
        saveButton: document.getElementById('saveSettings'),
        workDuration: document.getElementById('workDuration'),
        shortBreakDuration: document.getElementById('shortBreakDuration'),
        longBreakDuration: document.getElementById('longBreakDuration'),
        longBreakInterval: document.getElementById('longBreakInterval'),
        volumeControl: document.getElementById('volumeControl'),
        muteToggle: document.getElementById('muteToggle')
    },
    tasks: {
        addButton: document.getElementById('addTaskButton'),
        list: document.getElementById('taskList'),
        modal: document.getElementById('taskModal'),
        closeButton: document.getElementById('closeTaskModal'),
        saveButton: document.getElementById('saveTaskButton'),
        cancelButton: document.getElementById('cancelTaskButton'),
        title: document.getElementById('taskTitle'),
        category: document.getElementById('taskCategory'),
        priority: document.getElementById('taskPriority'),
        notes: document.getElementById('taskNotes'),
        estimatedPomodoros: document.getElementById('estimatedPomodoros'),
        taskId: document.getElementById('taskId'),
        modalTitle: document.getElementById('taskModalTitle'),
        categoryFilter: document.getElementById('categoryFilter')
    },
    homeScreen: {
        button: document.getElementById('addToHomeButton'),
        tutorial: document.getElementById('addToHomeTutorial'),
        closeTutorial: document.getElementById('closeTutorial')
    },
    share: {
        button: document.getElementById('shareButton')
    }
};

// Sound effects
const sounds = {
    workComplete: new Audio('sounds/work-complete.mp3'),
    breakComplete: new Audio('sounds/break-complete.mp3'),
    buttonClick: new Audio('sounds/button-click.mp3')
};

// Initialize the application
function initApp() {
    // Load settings from local storage
    loadSettings();
    
    // Initialize timer
    initTimer();
    
    // Initialize tasks
    initTasks();
    
    // Initialize settings
    initSettings();
    
    // Initialize home screen tutorial
    initHomeScreen();
    
    // Initialize share functionality
    initShare();
    
    // Update UI with initial state
    updateUI();
    
    // Update current task display if there's a saved task
    if (typeof updateCurrentTaskDisplay === 'function') {
        updateCurrentTaskDisplay();
    }
    
    // Log initialization
    console.log('Pomodoro Timer initialized');
}

// Load settings from local storage
function loadSettings() {
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
        try {
            const parsedSettings = JSON.parse(savedSettings);
            appState.settings = { ...appState.settings, ...parsedSettings };
            console.log('Settings loaded from local storage');
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }
    
    // Load pomodoro count
    const savedCount = localStorage.getItem('pomodoroCount');
    if (savedCount) {
        appState.pomodoroCount = parseInt(savedCount, 10) || 0;
    }
}

// Save settings to local storage
function saveSettings() {
    localStorage.setItem('pomodoroSettings', JSON.stringify(appState.settings));
    localStorage.setItem('pomodoroCount', appState.pomodoroCount.toString());
}

// Update UI based on current state
function updateUI() {
    // Update timer display
    updateTimerDisplay();
    
    // Update session type
    updateSessionType();
    
    // Update pomodoro count
    elements.timer.pomodoroCount.textContent = appState.pomodoroCount;
    
    // Update button states
    updateButtonStates();
}

// Update timer display
function updateTimerDisplay() {
    const { minutes, seconds } = timerState;
    elements.timer.minutes.textContent = minutes.toString().padStart(2, '0');
    elements.timer.seconds.textContent = seconds.toString().padStart(2, '0');
}

// Update session type display
function updateSessionType() {
    let sessionText = '';
    switch (appState.currentSession) {
        case 'work':
            sessionText = 'Work Session';
            break;
        case 'shortBreak':
            sessionText = 'Short Break';
            break;
        case 'longBreak':
            sessionText = 'Long Break';
            break;
    }
    elements.timer.sessionType.textContent = sessionText;
    
    // Update color theme based on session type
    document.documentElement.setAttribute('data-session', appState.currentSession);
}

// Update button states
function updateButtonStates() {
    if (appState.isRunning) {
        elements.timer.startButton.disabled = true;
        elements.timer.pauseButton.disabled = false;
    } else {
        elements.timer.startButton.disabled = false;
        elements.timer.pauseButton.disabled = true;
    }
}

// Initialize home screen tutorial
function initHomeScreen() {
    elements.homeScreen.button.addEventListener('click', () => {
        elements.homeScreen.tutorial.style.display = 'block';
        elements.homeScreen.tutorial.classList.add('fade-in');
    });
    
    elements.homeScreen.closeTutorial.addEventListener('click', () => {
        elements.homeScreen.tutorial.style.display = 'none';
    });
}

// Initialize share functionality
function initShare() {
    elements.share.button.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Pomodoro Timer',
                text: 'Check out this awesome Pomodoro Timer app!',
                url: window.location.href
            })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.log('Error sharing:', error));
        } else {
            alert('Web Share API not supported in your browser. You can copy the URL manually.');
        }
    });
}

// Play sound with volume control
function playSound(sound) {
    if (!appState.settings.mute) {
        sound.volume = appState.settings.volume / 100;
        sound.play().catch(error => console.log('Error playing sound:', error));
    }
}

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Handle keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // Only apply shortcuts when not in input or textarea elements
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return; // Allow normal typing in input fields
    }
    
    if (event.code === 'Space') {
        if (appState.isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
        event.preventDefault();
    } else if (event.code === 'KeyR') {
        resetTimer();
        event.preventDefault();
    }
});

// Export for other modules
window.appState = appState;
window.elements = elements;
window.sounds = sounds;
window.playSound = playSound;
window.saveSettings = saveSettings;


// Task panel toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const taskToggle = document.getElementById('taskToggle');
    const taskContainer = document.getElementById('taskContainer');
    const closeTasks = document.getElementById('closeTasks');
    
    if (taskToggle && taskContainer && closeTasks) {
        taskToggle.addEventListener('click', function() {
            taskContainer.classList.toggle('open');
        });
        
        closeTasks.addEventListener('click', function() {
            taskContainer.classList.remove('open');
        });
    }
});
