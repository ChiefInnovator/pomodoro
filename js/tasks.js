// tasks.js - Handles task management functionality
// Manages task creation, editing, deletion, and filtering

// Tasks state
const tasksState = {
    tasks: [],
    categories: ['Work', 'Study', 'Personal'],
    editingTaskId: null
};

// Initialize tasks functionality
function initTasks() {
    // Load tasks from local storage
    loadTasks();
    
    // Add event listeners
    elements.tasks.addButton.addEventListener('click', openTaskModal);
    elements.tasks.closeButton.addEventListener('click', closeTaskModal);
    elements.tasks.saveButton.addEventListener('click', saveTask);
    elements.tasks.cancelButton.addEventListener('click', closeTaskModal);
    elements.tasks.categoryFilter.addEventListener('change', filterTasks);
    
    // Render tasks
    renderTasks();
    
    // Populate category filter
    populateCategoryFilter();
    
    console.log('Tasks initialized');
}

// Load tasks from local storage
function loadTasks() {
    const savedTasks = localStorage.getItem('pomodoroTasks');
    if (savedTasks) {
        try {
            tasksState.tasks = JSON.parse(savedTasks);
            console.log('Tasks loaded from local storage');
            
            // Extract unique categories
            updateCategories();
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasksState.tasks));
}

// Update categories list from tasks
function updateCategories() {
    const uniqueCategories = new Set(['Work', 'Study', 'Personal']);
    
    tasksState.tasks.forEach(task => {
        if (task.category && task.category.trim() !== '') {
            uniqueCategories.add(task.category);
        }
    });
    
    tasksState.categories = Array.from(uniqueCategories);
    
    // Update category filter dropdown
    populateCategoryFilter();
}

// Populate category filter dropdown
function populateCategoryFilter() {
    // Clear existing options except "All Categories"
    while (elements.tasks.categoryFilter.options.length > 1) {
        elements.tasks.categoryFilter.remove(1);
    }
    
    // Add categories to filter
    tasksState.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        elements.tasks.categoryFilter.appendChild(option);
    });
}

// Render tasks in the task list
function renderTasks() {
    // Clear existing tasks
    elements.tasks.list.innerHTML = '';
    
    // Get selected category filter
    const selectedCategory = elements.tasks.categoryFilter.value;
    
    // Filter tasks if needed
    const filteredTasks = selectedCategory === 'all' 
        ? tasksState.tasks 
        : tasksState.tasks.filter(task => task.category === selectedCategory);
    
    // Sort tasks by priority (high to low) and then by completed status
    const sortedTasks = filteredTasks.sort((a, b) => {
        // First sort by completion status
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        
        // Then sort by priority
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    // Add tasks to the list
    if (sortedTasks.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-task-message';
        emptyMessage.textContent = 'No tasks found. Add a task to get started!';
        elements.tasks.list.appendChild(emptyMessage);
    } else {
        sortedTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            elements.tasks.list.appendChild(taskElement);
        });
    }
}

// Create a task element
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.className = `task-item ${task.completed ? 'completed' : ''} ${appState.currentTaskId === task.id ? 'active-task' : ''}`;
    taskElement.dataset.id = task.id;
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
    
    // Create task content
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    
    // Create task header
    const taskHeader = document.createElement('div');
    taskHeader.className = 'task-header';
    
    const taskTitle = document.createElement('div');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task.title;
    
    const taskCategory = document.createElement('div');
    taskCategory.className = 'task-category';
    taskCategory.textContent = task.category || 'Uncategorized';
    
    taskHeader.appendChild(taskTitle);
    taskHeader.appendChild(taskCategory);
    
    // Create task details
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    
    const taskPriority = document.createElement('div');
    taskPriority.className = 'task-priority';
    
    const priorityIndicator = document.createElement('div');
    priorityIndicator.className = `priority-indicator priority-${task.priority}`;
    
    const priorityText = document.createElement('span');
    priorityText.textContent = `Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`;
    
    taskPriority.appendChild(priorityIndicator);
    taskPriority.appendChild(priorityText);
    
    const taskPomodoros = document.createElement('div');
    taskPomodoros.className = 'task-pomodoros';
    taskPomodoros.innerHTML = `<span>🍅</span> ${task.completedPomodoros}/${task.estimatedPomodoros}`;
    
    taskDetails.appendChild(taskPriority);
    taskDetails.appendChild(taskPomodoros);
    
    // Create task notes if they exist
    let taskNotes;
    if (task.notes && task.notes.trim() !== '') {
        taskNotes = document.createElement('div');
        taskNotes.className = 'task-notes';
        taskNotes.textContent = task.notes;
    }
    
    // Create task actions
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';
    
    // Add Start Working button
    const startWorkingButton = document.createElement('button');
    startWorkingButton.className = 'task-action-button start-working-button';
    startWorkingButton.innerHTML = '▶️';
    startWorkingButton.title = 'Start Working on this Task';
    startWorkingButton.addEventListener('click', () => startWorkingOnTask(task.id));
    
    const editButton = document.createElement('button');
    editButton.className = 'task-action-button';
    editButton.innerHTML = '✏️';
    editButton.title = 'Edit Task';
    editButton.addEventListener('click', () => editTask(task.id));
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-action-button';
    deleteButton.innerHTML = '🗑️';
    deleteButton.title = 'Delete Task';
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    
    const expandButton = document.createElement('button');
    expandButton.className = 'task-action-button';
    expandButton.innerHTML = task.notes && task.notes.trim() !== '' ? '🔽' : '';
    expandButton.title = 'Show Notes';
    if (task.notes && task.notes.trim() !== '') {
        expandButton.addEventListener('click', () => {
            taskElement.classList.toggle('expanded');
            expandButton.innerHTML = taskElement.classList.contains('expanded') ? '🔼' : '🔽';
        });
    }
    
    taskActions.appendChild(startWorkingButton);
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);
    taskActions.appendChild(expandButton);
    
    // Assemble task element
    taskContent.appendChild(taskHeader);
    taskContent.appendChild(taskDetails);
    if (taskNotes) {
        taskContent.appendChild(taskNotes);
    }
    
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskContent);
    taskElement.appendChild(taskActions);
    
    return taskElement;
}

// Open task modal for adding a new task
function openTaskModal() {
    elements.tasks.modalTitle.textContent = 'Add Task';
    elements.tasks.taskId.value = '';
    elements.tasks.title.value = '';
    elements.tasks.category.value = '';
    elements.tasks.priority.value = 'medium';
    elements.tasks.notes.value = '';
    elements.tasks.estimatedPomodoros.value = '1';
    
    tasksState.editingTaskId = null;
    
    elements.tasks.modal.style.display = 'flex';
    elements.tasks.title.focus();
}

// Close task modal
function closeTaskModal() {
    elements.tasks.modal.style.display = 'none';
}

// Save task
function saveTask() {
    const title = elements.tasks.title.value.trim();
    if (!title) {
        alert('Task title is required');
        return;
    }
    
    const taskId = elements.tasks.taskId.value;
    const isEditing = taskId !== '';
    
    const task = {
        id: isEditing ? taskId : Date.now().toString(),
        title: title,
        category: elements.tasks.category.value.trim(),
        priority: elements.tasks.priority.value,
        notes: elements.tasks.notes.value.trim(),
        estimatedPomodoros: parseInt(elements.tasks.estimatedPomodoros.value, 10) || 1,
        completedPomodoros: isEditing ? 
            tasksState.tasks.find(t => t.id === taskId).completedPomodoros : 0,
        completed: isEditing ? 
            tasksState.tasks.find(t => t.id === taskId).completed : false,
        createdAt: isEditing ? 
            tasksState.tasks.find(t => t.id === taskId).createdAt : new Date().toISOString()
    };
    
    if (isEditing) {
        // Update existing task
        const taskIndex = tasksState.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            tasksState.tasks[taskIndex] = task;
        }
    } else {
        // Add new task
        tasksState.tasks.push(task);
    }
    
    // Save to local storage
    saveTasks();
    
    // Update categories
    updateCategories();
    
    // Render tasks
    renderTasks();
    
    // Close modal
    closeTaskModal();
    
    console.log(`Task ${isEditing ? 'updated' : 'added'}: ${task.title}`);
}

// Edit task
function editTask(taskId) {
    const task = tasksState.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    elements.tasks.modalTitle.textContent = 'Edit Task';
    elements.tasks.taskId.value = task.id;
    elements.tasks.title.value = task.title;
    elements.tasks.category.value = task.category || '';
    elements.tasks.priority.value = task.priority;
    elements.tasks.notes.value = task.notes || '';
    elements.tasks.estimatedPomodoros.value = task.estimatedPomodoros;
    
    tasksState.editingTaskId = taskId;
    
    elements.tasks.modal.style.display = 'flex';
    elements.tasks.title.focus();
}

// Delete task
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasksState.tasks = tasksState.tasks.filter(t => t.id !== taskId);
        
        // Save to local storage
        saveTasks();
        
        // Update categories
        updateCategories();
        
        // Render tasks
        renderTasks();
        
        console.log(`Task deleted: ${taskId}`);
    }
}

// Toggle task completion
function toggleTaskCompletion(taskId) {
    const taskIndex = tasksState.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasksState.tasks[taskIndex].completed = !tasksState.tasks[taskIndex].completed;
        
        // Save to local storage
        saveTasks();
        
        // Render tasks
        renderTasks();
        
        console.log(`Task ${tasksState.tasks[taskIndex].completed ? 'completed' : 'uncompleted'}: ${tasksState.tasks[taskIndex].title}`);
    }
}

// Filter tasks by category
function filterTasks() {
    renderTasks();
}

// Increment completed pomodoros for the current task
function incrementTaskPomodoros() {
    if (appState.currentTaskId) {
        const taskIndex = tasksState.tasks.findIndex(t => t.id === appState.currentTaskId);
        if (taskIndex !== -1) {
            tasksState.tasks[taskIndex].completedPomodoros++;
            
            // Save to local storage
            saveTasks();
            
            // Render tasks
            renderTasks();
            
            console.log(`Pomodoro completed for task: ${tasksState.tasks[taskIndex].title}`);
        }
    }
}

// Export for other modules
window.tasksState = tasksState;
window.incrementTaskPomodoros = incrementTaskPomodoros;

// Start working on a specific task
function startWorkingOnTask(taskId) {
    // Set the current task ID in app state
    appState.currentTaskId = taskId;
    
    // Get the task details
    const task = tasksState.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Update the task container to close it
    const taskContainer = document.getElementById('taskContainer');
    if (taskContainer) {
        taskContainer.classList.remove('open');
    }
    
    // Update the current task display
    updateCurrentTaskDisplay();
    
    // Reset and start the timer
    resetTimer();
    startTimer();
    
    console.log(`Started working on task: ${task.title}`);
    
    // Re-render tasks to show active task
    renderTasks();
}

// Update the current task display near the timer
function updateCurrentTaskDisplay() {
    // Find or create the current task display element
    let currentTaskDisplay = document.getElementById('currentTaskDisplay');
    
    if (!currentTaskDisplay) {
        currentTaskDisplay = document.createElement('div');
        currentTaskDisplay.id = 'currentTaskDisplay';
        currentTaskDisplay.className = 'current-task-display';
        
        // Insert after session info
        const sessionInfo = document.querySelector('.session-info');
        if (sessionInfo) {
            sessionInfo.parentNode.insertBefore(currentTaskDisplay, sessionInfo.nextSibling);
        }
    }
    
    // Update the content based on whether there's an active task
    if (appState.currentTaskId) {
        const task = tasksState.tasks.find(t => t.id === appState.currentTaskId);
        if (task) {
            currentTaskDisplay.innerHTML = `
                <span class="task-icon">🎯</span>
                <span>Working on: ${task.title}</span>
            `;
        } else {
            // Task might have been deleted
            currentTaskDisplay.innerHTML = `
                <span class="no-active-task">No task selected</span>
            `;
            appState.currentTaskId = null;
        }
    } else {
        currentTaskDisplay.innerHTML = `
            <span class="no-active-task">No task selected</span>
        `;
    }
}

// Handle work session completion
function handleWorkSessionCompletion() {
    // If there's an active task, increment its pomodoro count
    if (appState.currentTaskId) {
        incrementTaskPomodoros();
    }
}

// Clear current task
function clearCurrentTask() {
    appState.currentTaskId = null;
    updateCurrentTaskDisplay();
    renderTasks();
}
