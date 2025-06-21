// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // === Step 2: Function to load tasks from Local Storage ===
    function loadTasks() {
        // Get tasks from localStorage, or an empty array if none are found
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Use addTask to display each task, but with saving turned OFF
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // === Step 1: Updated addTask function with a 'save' switch ===
    function addTask(taskText, save = true) {
        
        // --- Part 1: Displaying the task on the screen (DOM) ---
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // === Step 3: Update the remove button's logic ===
        removeButton.addEventListener('click', function() {
            // Remove from the screen
            taskList.removeChild(listItem);
            
            // Remove from the "storage locker" (localStorage)
            removeTaskFromStorage(taskText);
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // --- Part 2: Saving the task to the "storage locker" ---
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            // We use JSON.stringify to turn our list into a string, which is how localStorage saves things.
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Helper function for Step 3: Removing a specific task from localStorage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Create a new list containing all tasks EXCEPT the one we want to remove
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // --- Event Listeners for User Actions ---
    
    // Add button click
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }
        addTask(taskText); // By default, this will save the task
        taskInput.value = ""; 
    });

    // "Enter" key press
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert('Please enter a task.');
                return;
            }
            addTask(taskText); // By default, this will save the task
            taskInput.value = "";
        }
    });
    
    // === Step 4: Load all saved tasks when the page first loads ===
    loadTasks();
});
