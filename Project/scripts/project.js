// A. Array of Objects: The core data structure
let tasks = [];

// B. DOM Selection: Select the necessary elements
const taskListElement = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const taskTextInput = document.getElementById('task-text');
const taskTypeSelect = document.getElementById('task-type');

// =======================================================
// CORE DATA MANAGEMENT FUNCTIONS (localStorage Requirement)
// =======================================================

function loadTasks() {
    const storedTasks = localStorage.getItem('routineTasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function saveTasks() {
    localStorage.setItem('routineTasks', JSON.stringify(tasks));
}

// Function to initialize the page (sets date info)
function initialize() {
    // DOM interaction (Selection and Modification)
    const currentYearSpan = document.getElementById('current-year');
    const lastModifiedSpan = document.getElementById('last-modified');

    // Set current year
    const currentYear = new Date().getFullYear();
    if (currentYearSpan) {
        currentYearSpan.textContent = currentYear;
    }

    // Set last modified date
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Load and display tasks on the main page
    if (taskListElement) {
        loadTasks();
        updateDOM();
    }
}

// =======================================================
// ARRAY METHODS & DOM MANIPULATION
// =======================================================

/**
 * Function: Updates the DOM to reflect the current 'tasks' array, with optional filtering.
 * filterType: 'all', 'Habit', 'Work', etc.
 */
function updateDOM(filterType = 'all') {
    // Array Method: Filter the array before rendering
    const filteredTasks = filterType === 'all'
        ? tasks
        : tasks.filter(task => task.type === filterType);

    // Array Method: Use .map() to transform data into HTML strings
    const allTaskHTML = filteredTasks.map(task =>
        // Template Literals & Conditional Branching (Requirement)
        `<li class="task-item ${task.isComplete ? 'task-completed' : ''}" data-id="${task.id}">
            <span class="activity-text">${task.text} (${task.type})</span>
            <div class="actions">
                <button onclick="toggleComplete(${task.id})">
                    ${task.isComplete ? 'Undo' : 'Done'}
                </button>
                <button onclick="deleteTask(${task.id})" class="delete-btn">Delete</button>
            </div>
        </li>`
    ).join('');

    // DOM Interaction: Modify the content of the list element
    taskListElement.innerHTML = allTaskHTML;

    // Update active filter button class (Optional but good UX)
    document.querySelectorAll('.filters button').forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('onclick').includes(`'${filterType}'`)) {
            button.classList.add('active');
        }
    });
}


// Function to toggle the completion status (Uses Array Methods)
function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            // Modifying the object property
            return { ...task, isComplete: !task.isComplete };
        }
        return task;
    });
    saveTasks();
    updateDOM();
}

// Function to delete a task (Uses Array Methods)
function deleteTask(id) {
    // Array Method: .filter() creates a new array excluding the task with the matching ID
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    updateDOM();
}

// =======================================================
// EVENT LISTENER HANDLERS (DOM Interaction)
// =======================================================

function handleAddTask(event) {
    event.preventDefault();

    const text = taskTextInput.value.trim();
    const type = taskTypeSelect.value;

    // Conditional Branching (Requirement)
    if (text === '') {
        alert('Please enter an activity!');
        return;
    }

    // Creating a new Task Object
    const newTask = {
        id: Date.now(), // Use timestamp for unique ID
        text: text,
        isComplete: false,
        type: type
    };

    tasks.push(newTask);
    taskTextInput.value = ''; // Clear input

    saveTasks();
    updateDOM();
}

// Function to handle Hamburger Menu Toggle (New Function)
function toggleMenu() {
    const nav = document.getElementById('main-navigation');
    const button = document.getElementById('menu-toggle');

    // Toggle the 'open' class for visibility (DOM Interaction - Modification)
    nav.classList.toggle('open');

    // Update ARIA attributes and icon for accessibility
    const isOpen = nav.classList.contains('open');
    button.setAttribute('aria-expanded', isOpen);
    button.textContent = isOpen ? '✕' : '☰';
}

// --- INITIALIZATION AND LISTENERS ---
document.addEventListener('DOMContentLoaded', initialize);

// Attach Event Listener for Form Submission (DOM Interaction)
if (addTaskForm) {
    addTaskForm.addEventListener('submit', handleAddTask);
}

// Attach Event Listener for Menu Toggle (DOM Interaction)
document.getElementById('menu-toggle').addEventListener('click', toggleMenu);