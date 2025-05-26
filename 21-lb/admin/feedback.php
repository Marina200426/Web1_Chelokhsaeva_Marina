<?php
require_once '../includes/functions.php';

function doFeedbackAction($action, $data = []) {
    global $pdo;

    switch ($action) {
        case 'list':
            $stmt = $pdo->query("
                SELECT pr.*, p.name as product_name 
                FROM product_reviews pr
                JOIN products p ON pr.product_id = p.id
                ORDER BY pr.created_at DESC
            ");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);

        case 'view':
            $stmt = $pdo->prepare("
                SELECT pr.*, p.name as product_name 
                FROM product_reviews pr
                JOIN products p ON pr.product_id = p.id
                WHERE pr.id = ?
            ");
            $stmt->execute([$data['id']]);
            return $stmt->fetch(PDO::FETCH_ASSOC);

        case 'update':
            $stmt = $pdo->prepare("
                UPDATE product_reviews 
                SET author_name = ?, review_text = ?, rating = ?
                WHERE id = ?
            ");
            return $stmt->execute([
                $data['author_name'],
                $data['review_text'],
                $data['rating'],
                $data['id']
            ]);

        case 'delete':
            $stmt = $pdo->prepare("DELETE FROM product_reviews WHERE id = ?");
            return $stmt->execute([$data['id']]);

        default:
            return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    header('Content-Type: application/json');

    $response = [];
    $action = $_POST['action'];

    try {
        switch ($action) {
            case 'get_review':
                $review = doFeedbackAction('view', ['id' => (int)$_POST['id']]);
                $response = $review ? ['success' => true, 'data' => $review] : ['success' => false, 'error' => 'Отзыв не найден'];
                break;

            case 'update_review':
                $success = doFeedbackAction('update', [
                    'id' => (int)$_POST['id'],
                    'author_name' => $_POST['author_name'],
                    'review_text' => $_POST['review_text'],
                    'rating' => (int)$_POST['rating']
                ]);
                $response = ['success' => $success];
                break;

            case 'delete_review':
                $success = doFeedbackAction('delete', ['id' => (int)$_POST['id']]);
                $response = ['success' => $success];
                break;

            default:
                $response = ['success' => false, 'error' => 'Неизвестное действие'];
        }
    } catch (PDOException $e) {
        $response = ['success' => false, 'error' => $e->getMessage()];
    }

    echo json_encode($response);
    exit;
}

$reviews = doFeedbackAction('list');
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Управление отзывами</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Управление отзывами</h1>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Товар</th>
                <th>Автор</th>
                <th>Оценка</th>
                <th>Дата</th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($reviews as $review): ?>
                <tr>
                    <td><?= $review['id'] ?></td>
                    <td><?= htmlspecialchars($review['product_name']) ?></td>
                    <td><?= htmlspecialchars($review['author_name']) ?></td>
                    <td>
                        <?php for ($i = 1; $i <= 5; $i++): ?>
                            <i><?= $i <= $review['rating'] ? '★' : '☆' ?></i>
                        <?php endfor; ?>
                    </td>
                    <td><?= date('d.m.Y H:i', strtotime($review['created_at'])) ?></td>
                    <td>
                        <button class="btn edit" data-id="<?= $review['id'] ?>">Редактировать</button>
                        <button class="btn delete" data-id="<?= $review['id'] ?>">Удалить</button>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <form id="editForm">
        <h3>Редактировать отзыв</h3>
        <input type="hidden" id="edit_id" name="id">
        <label>Автор:</label>
        <input type="text" id="edit_author_name" name="author_name" required>
        <label>Оценка:</label>
        <select id="edit_rating" name="rating" required>
            <option value="5">5 - Отлично</option>
            <option value="4">4 - Хорошо</option>
            <option value="3">3 - Удовлетворительно</option>
            <option value="2">2 - Плохо</option>
            <option value="1">1 - Ужасно</option>
        </select>
        <label>Текст отзыва:</label>
        <textarea id="edit_review_text" name="review_text" rows="4" required></textarea>
        <button type="button" id="saveChanges">Сохранить</button>
    </form>


    <script>

        document.addEventListener('DOMContentLoaded', () => {
        const editForm = document.getElementById('editForm');
        const saveChangesBtn = document.getElementById('saveChanges');

        // Открытие формы редактирования
        document.querySelectorAll('.btn.edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');

                fetch('feedback.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: new URLSearchParams({
                        action: 'get_review',
                        id: id
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        editForm.edit_id.value = data.data.id;
                        editForm.edit_author_name.value = data.data.author_name;
                        editForm.edit_rating.value = data.data.rating;
                        editForm.edit_review_text.value = data.data.review_text;
                        editForm.style.display = 'block';
                        window.scrollTo(0, document.body.scrollHeight);
                    } else {
                        alert(data.error || 'Ошибка загрузки');
                    }
                });
            });
        });

        // Сохранение изменений
        saveChangesBtn.addEventListener('click', () => {
            const formData = new FormData(editForm);
            formData.append('action', 'update_review');

            fetch('feedback.php', {
                method: 'POST',
                body: new URLSearchParams(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Изменения сохранены');
                    location.reload();
                } else {
                    alert('Ошибка: ' + (data.error || ''));
                }
            });
        });

        // Удаление отзыва
        document.querySelectorAll('.btn.delete').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('Удалить отзыв?')) {
                    const id = btn.getAttribute('data-id');

                    fetch('feedback.php', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        body: new URLSearchParams({
                            action: 'delete_review',
                            id: id
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('Отзыв удален');
                            location.reload();
                        } else {
                            alert('Ошибка: ' + (data.error || ''));
                        }
                    });
                }
            });
        });
    });


    </script>
</body>
</html>
