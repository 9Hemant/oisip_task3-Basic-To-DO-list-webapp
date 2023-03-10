// Define variables for DOM elements
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const filterCompletedBtn = document.querySelector('#filter-completed');
const filterIncompleteBtn = document.querySelector('#filter-incomplete');

// Define array to hold to-do objects
let todos = [];

// Define event listener for form submission
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo();
});

// Define function to add new to-do
function addTodo() {
  const text = todoInput.value;
  if (text !== '') {
    const date = new Date();
    const todo = {
      text: text,
      date: date,
      completed: false
    };
    todos.push(todo);
    todoInput.value = '';
    renderTodos();
  }
}

// Define event listeners for filter buttons
filterCompletedBtn.addEventListener('click', function() {
  filterCompleted();
  setActiveFilter(filterCompletedBtn);
});

filterIncompleteBtn.addEventListener('click', function() {
  filterIncomplete();
  setActiveFilter(filterIncompleteBtn);
});

// Define function to render all to-dos
function renderTodos() {
  todoList.innerHTML = '';
  sortTodosByDate();
  todos.forEach(function(todo, index) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="text">${todo.text}</span>
      <span class="date">${todo.date.toLocaleString()}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
      <button class="edit-btn" data-index="${index}">Edit</button>
    `;
    if (todo.completed) li.classList.add('completed');
    li.addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('delete-btn')) {
        deleteTodoByIndex(index);
      } else if (target.classList.contains('edit-btn')) {
        editTodoByIndex(index);
      } else {
        toggleTodoCompletion(index);
      }
    });
    todoList.appendChild(li);
  });
}

// Define function to toggle completion status of a to-do
function toggleTodoCompletion(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// Define function to delete a to-do by index
function deleteTodoByIndex(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Define function to edit a to-do by index
function editTodoByIndex(index) {
  const li = todoList.childNodes[index];
  const textSpan = li.querySelector('.text');
  const editText = prompt('Edit your to-do:', textSpan.textContent);
  if (editText !== null) {
    todos[index].text = editText;
    renderTodos();
  }
}

// Define function to filter all to-dos
function filterAll() {
  renderTodos();
}

// Define function to filter completed to-dos
function filterCompleted() {
  const completedTodos = todos.filter(function(todo) {
    return todo.completed;
  });
  renderFilteredTodos(completedTodos);
}

// Define function to filter incomplete to-dos
function filterIncomplete() {
  const incompleteTodos = todos.filter(function(todo) {
    return !todo.completed;
  });
  renderFilteredTodos(incompleteTodos);
}

// Define function to render filtered to-dos
function renderFilteredTodos(filteredTodos) {
  todoList.innerHTML = '';
  filteredTodos.forEach(function(todo, index) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="text">${todo.text}</span>
      <span class date">${todo.date.toLocaleString()}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
      <button class="edit-btn" data-index="${index}">Edit</button>
      `;
      if (todo.completed) li.classList.add('completed');
      li.addEventListener('click', function(event) {
      const target = event.target;
      if (target.classList.contains('delete-btn')) {
      deleteTodoByIndex(index);
      } else if (target.classList.contains('edit-btn')) {
      editTodoByIndex(index);
      } else {
      toggleTodoCompletion(index);
      }
      });
      todoList.appendChild(li);
      });
      }
      
      // Define function to set active filter button
      function setActiveFilter(filterButton) {
      const activeButton = document.querySelector('.active');
      if (activeButton) activeButton.classList.remove('active');
      filterButton.classList.add('active');
      }
      
      // Define function to sort to-dos by date
      function sortTodosByDate() {
      todos.sort(function(a, b) {
      return b.date - a.date;
      });
      }
      
      // Call renderTodos function to display initial to-dos
      renderTodos();
            
