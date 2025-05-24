import Auth from "./auth.js";

const todosService = {

    async getAll() {
        console.log('Запрос на получение всех задач...');
        const response = await fetch('http://localhost:8000/api/todo', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.token}`,
            },
        });

        const data = await response.json();
        console.log('Ответ сервера на получение задач:', data);

        if (!response.ok) {
            console.error('Ошибка при загрузке списка задач:', data);
            throw new Error('Ошибка при загрузке списка задач');
        }

        return data.data;
    },

    async create(description) {
        console.log(`Запрос на создание задачи: ${description}`);
        const response = await fetch('http://localhost:8000/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.token}`,
            },
            body: JSON.stringify({ description }),
        });

        const data = await response.json();
        console.log('Ответ сервера на создание задачи:', data);

        if (!response.ok) {
            throw new Error('Ошибка при добавлении задачи');
        }

        return data;
    },

    async updateStatus(todoId, completed) {
        console.log(`Запрос на обновление статуса задачи ${todoId} на ${completed ? 'выполнено' : 'не выполнено'}`);
        const response = await fetch(`http://localhost:8000/api/todo/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.token}`,
            },
            body: JSON.stringify({ completed }),
        });

        if (!response.ok) {
            throw new Error('Не удалось обновить статус');
        }

        const data = await response.json();
        console.log(`Ответ сервера на обновление статуса задачи ${todoId}:`, data);
        return data;
    },

    async delete(todoId) {
        console.log(`Запрос на удаление задачи ${todoId}`);
        const response = await fetch(`http://localhost:8000/api/todo/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.token}`,
            },
        });

        const data = await response.json();
        console.log(`Ответ сервера на удаление задачи ${todoId}:`, data);

        if (!response.ok) {
            throw new Error('Не удалось удалить задачу');
        }

        return data;
    }
};

export default todosService;
