// settings.js - Handles settings functionality
// Manages user preferences and settings modal

// Initialize settings functionality
function initSettings() {
    // Add event listeners
    elements.settings.button.addEventListener('click', openSettingsModal);
    elements.settings.closeButton.addEventListener('click', closeSettingsModal);
    elements.settings.saveButton.addEventListener('click', saveSettingsFromModal);
    elements.settings.volumeControl.addEventListener('input', updateVolumePreview);
    elements.settings.muteToggle.addEventListener('change', updateMuteState);
    
    // Populate settings form with current values
    populateSettingsForm();
}

// Open settings modal
function openSettingsModal() {
    populateSettingsForm();
    elements.settings.modal.style.display = 'flex';
}

// Close settings modal
function closeSettingsModal() {
    elements.settings.modal.style.display = 'none';
}

// Populate settings form with current values
function populateSettingsForm() {
    elements.settings.workDuration.value = appState.settings.workDuration;
    elements.settings.shortBreakDuration.value = appState.settings.shortBreakDuration;
    elements.settings.longBreakDuration.value = appState.settings.longBreakDuration;
    elements.settings.longBreakInterval.value = appState.settings.longBreakInterval;
    elements.settings.volumeControl.value = appState.settings.volume;
    elements.settings.muteToggle.checked = appState.settings.mute;
}

// Save settings from modal
function saveSettingsFromModal() {
    // Validate input values
    const workDuration = parseInt(elements.settings.workDuration.value, 10);
    const shortBreakDuration = parseInt(elements.settings.shortBreakDuration.value, 10);
    const longBreakDuration = parseInt(elements.settings.longBreakDuration.value, 10);
    const longBreakInterval = parseInt(elements.settings.longBreakInterval.value, 10);
    
    if (isNaN(workDuration) || workDuration < 1 || workDuration > 60) {
        alert('Work duration must be between 1 and 60 minutes');
        return;
    }
    
    if (isNaN(shortBreakDuration) || shortBreakDuration < 1 || shortBreakDuration > 30) {
        alert('Short break duration must be between 1 and 30 minutes');
        return;
    }
    
    if (isNaN(longBreakDuration) || longBreakDuration < 1 || longBreakDuration > 60) {
        alert('Long break duration must be between 1 and 60 minutes');
        return;
    }
    
    if (isNaN(longBreakInterval) || longBreakInterval < 1 || longBreakInterval > 10) {
        alert('Long break interval must be between 1 and 10 pomodoros');
        return;
    }
    
    // Update settings
    appState.settings.workDuration = workDuration;
    appState.settings.shortBreakDuration = shortBreakDuration;
    appState.settings.longBreakDuration = longBreakDuration;
    appState.settings.longBreakInterval = longBreakInterval;
    appState.settings.volume = parseInt(elements.settings.volumeControl.value, 10);
    appState.settings.mute = elements.settings.muteToggle.checked;
    
    // Save settings to local storage
    saveSettings();
    
    // Reset timer with new duration
    resetTimer();
    
    // Close modal
    closeSettingsModal();
}

// Update volume preview when slider is moved
function updateVolumePreview() {
    const volume = parseInt(elements.settings.volumeControl.value, 10);
    
    // Play a quick preview sound at the new volume level
    if (!appState.settings.mute) {
        const previewSound = sounds.buttonClick.cloneNode();
        previewSound.volume = volume / 100;
        previewSound.play().catch(() => { /* Silent fail */ });
    }
}

// Update mute state when checkbox is toggled
function updateMuteState() {
    const muted = elements.settings.muteToggle.checked;
    
    // If unmuting, play a sound to confirm
    if (!muted) {
        const previewSound = sounds.buttonClick.cloneNode();
        previewSound.volume = parseInt(elements.settings.volumeControl.value, 10) / 100;
        previewSound.play().catch(() => { /* Silent fail */ });
    }
}

// Request notification permission
function requestNotificationPermission() {
    if (!("Notification" in window)) {
        return;
    }
    
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}

// Call this when the page loads
requestNotificationPermission();
