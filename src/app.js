const API_URL = 'http://localhost:8000/todos';
let todos = [];

// DOM элементы
const newTodoInput = document.getElementById('newTodoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const errorMessage = document.getElementById('errorMessage');

// Получение токена из localStorage
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html'; 
}

// Загрузка задач
async function loadTodos() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Ошибка загрузки задач');
    }
    
    todos = await response.json();
    renderTodos();
    errorMessage.textContent = '';
  } catch (error) {
    errorMessage.textContent = error.message;
    console.error('Ошибка:', error);
  }
}

// Отображение задач
function renderTodos() {
  todoList.innerHTML = '';
  
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodoStatus(todo));
    
    const span = document.createElement('span');
    span.className = todo.completed ? 'title completed' : 'title';
    span.textContent = todo.title;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    todoList.appendChild(li);
  });
}

// Добавление новой задачи
async function addTodo() {
  const title = newTodoInput.value.trim();
  if (!title) return;
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });
    
    if (!response.ok) {
      throw new Error('Ошибка добавления задачи');
    }
    
    newTodoInput.value = '';
    await loadTodos();
    errorMessage.textContent = '';
  } catch (error) {
    errorMessage.textContent = error.message;
    console.error('Ошибка:', error);
  }
}

// Изменение статуса задачи
async function toggleTodoStatus(todo) {
  try {
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ completed: !todo.completed })
    });
    
    if (!response.ok) {
      throw new Error('Ошибка обновления задачи');
    }
    
    await loadTodos();
    errorMessage.textContent = '';
  } catch (error) {
    errorMessage.textContent = error.message;
    console.error('Ошибка:', error);
  }
}

// Удаление задачи
async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Ошибка удаления задачи');
    }
    
    await loadTodos();
    errorMessage.textContent = '';
  } catch (error) {
    errorMessage.textContent = error.message;
    console.error('Ошибка:', error);
  }
}

// Обработчики событий
addTodoBtn.addEventListener('click', addTodo);
newTodoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Инициализация
loadTodos();