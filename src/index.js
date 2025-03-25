const API_URL = "http://localhost:5000/api/todos"; 

document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    document.getElementById("todo-form").addEventListener("submit", addTodo);
});

async function loadTodos() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error("Error loading todos:", error);
    }
}

function renderTodos(todos) {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.classList.add("todo-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodo(todo.id, checkbox));

        const text = document.createElement("span");
        text.textContent = todo.text;

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

async function addTodo(event) {
    event.preventDefault();
    const input = document.getElementById("todo-input");
    const newTodo = { text: input.value, completed: false };

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newTodo)
        });

        const createdTodo = await response.json();
        loadTodos(); // Перезагружаем список
        input.value = "";
    } catch (error) {
        console.error("Error adding todo:", error);
    }
}

async function toggleTodo(id, checkbox) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ completed: checkbox.checked })
        });

        if (!response.ok) throw new Error("Failed to update todo");

        const updatedTodo = await response.json();
        checkbox.checked = updatedTodo.completed;
    } catch (error) {
        console.error("Error updating todo:", error);
        checkbox.checked = !checkbox.checked; // Откатываем, если ошибка
    }
}

async function deleteTodo(id) {
    try {
        const token = localStorage.getItem("token");
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        loadTodos();
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}
