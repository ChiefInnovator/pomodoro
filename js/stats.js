// stats.js - Handles statistics functionality
// Tracks and displays Pomodoro usage statistics

// Stats state
const statsState = {
    daily: {
        date: new Date().toISOString().split('T')[0],
        completed: 0,
        target: 8
    },
    weekly: {
        startDate: getStartOfWeek(),
        completed: 0,
        target: 40
    },
    history: []
};

// Initialize stats functionality
function initStats() {
    // Load stats from local storage
    loadStats();
    
    console.log('Stats initialized');
}

// Load stats from local storage
function loadStats() {
    const savedStats = localStorage.getItem('pomodoroStats');
    if (savedStats) {
        try {
            const parsedStats = JSON.parse(savedStats);
            
            // Check if we need to reset daily stats (new day)
            const today = new Date().toISOString().split('T')[0];
            if (parsedStats.daily.date !== today) {
                // Save yesterday's stats to history before resetting
                if (parsedStats.daily.completed > 0) {
                    parsedStats.history.push({
                        date: parsedStats.daily.date,
                        completed: parsedStats.daily.completed
                    });
                    
                    // Limit history to last 30 days
                    if (parsedStats.history.length > 30) {
                        parsedStats.history.shift();
                    }
                }
                
                // Reset daily stats
                parsedStats.daily = {
                    date: today,
                    completed: 0,
                    target: parsedStats.daily.target
                };
            }
            
            // Check if we need to reset weekly stats (new week)
            const startOfWeek = getStartOfWeek();
            if (parsedStats.weekly.startDate !== startOfWeek) {
                parsedStats.weekly = {
                    startDate: startOfWeek,
                    completed: 0,
                    target: parsedStats.weekly.target
                };
            }
            
            statsState.daily = parsedStats.daily;
            statsState.weekly = parsedStats.weekly;
            statsState.history = parsedStats.history;
            
            console.log('Stats loaded from local storage');
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }
}

// Save stats to local storage
function saveStats() {
    localStorage.setItem('pomodoroStats', JSON.stringify(statsState));
}

// Get start of current week (Sunday) in ISO format
function getStartOfWeek() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = now.getDate() - day;
    const startOfWeek = new Date(now.setDate(diff));
    return startOfWeek.toISOString().split('T')[0];
}

// Update stats when a Pomodoro is completed
function updateStats() {
    // Increment daily and weekly counts
    statsState.daily.completed++;
    statsState.weekly.completed++;
    
    // Save stats to local storage
    saveStats();
    
    console.log('Stats updated');
}

// Get formatted stats for display
function getFormattedStats() {
    return {
        daily: {
            completed: statsState.daily.completed,
            target: statsState.daily.target,
            percentage: Math.round((statsState.daily.completed / statsState.daily.target) * 100)
        },
        weekly: {
            completed: statsState.weekly.completed,
            target: statsState.weekly.target,
            percentage: Math.round((statsState.weekly.completed / statsState.weekly.target) * 100)
        },
        history: statsState.history
    };
}

// Generate stats chart (placeholder for future implementation)
function generateStatsChart() {
    // This would use a charting library to visualize the stats
    console.log('Stats chart would be generated here');
}

// Export for other modules
window.statsState = statsState;
window.updateStats = updateStats;
window.getFormattedStats = getFormattedStats;
