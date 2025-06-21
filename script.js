// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert('Please enter a task.');
            return; // Stop the function if the input is empty
        }

        // --- Task Creation and Removal (Updated Logic) ---

        // Create a new li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn'; // Or removeButton.classList.add('remove-btn');

        // **THE FIX IS HERE:** We now use addEventListener for the remove button.
        removeButton.addEventListener('click', function() {
            // When the remove button is clicked, we remove its parent, the <li>
            taskList.removeChild(listItem);
        });

        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // Attach Event Listeners
    // Add event listener to addButton
    addButton.addEventListener('click', addTask);

    // Add event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
