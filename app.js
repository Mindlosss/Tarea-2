document.addEventListener('DOMContentLoaded', loadTasks);
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Agregar tarea
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    addTask(taskText);
    saveTask(taskText);
    taskInput.value = '';
});

// Función para agregar una tarea al DOM
function addTask(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${taskText}</span>
        <button onclick="removeTask(this)">Eliminar</button>
    `;
    li.addEventListener('click', toggleComplete);
    taskList.appendChild(li);
}

// Marcar tarea como completada
function toggleComplete(event) {
    event.target.classList.toggle('completed');
}

// Eliminar tarea
function removeTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('span').textContent; // Obtén solo el texto de la tarea
    taskList.removeChild(taskItem);
    removeTaskFromStorage(taskText);
}

// Almacenar tarea en localStorage
function saveTask(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Obtener tareas desde localStorage
function getTasksFromStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Cargar tareas desde localStorage
function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => addTask(task));
}

// Remover tarea de localStorage
function removeTaskFromStorage(task) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
