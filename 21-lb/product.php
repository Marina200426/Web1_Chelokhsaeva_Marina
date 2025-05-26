<?php
require_once 'includes/functions.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    header("Location: catalog.php");
    exit;
}

$productId = (int)$_GET['id'];
$product = getProductById($productId);
$reviews = getProductReviews($productId);

if (!$product) {
    header("Location: catalog.php");
    exit;
}

// Обработка отправки отзыва
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $authorName = $_POST['author_name'] ?? '';
    $reviewText = $_POST['review_text'] ?? '';
    $rating = (int)($_POST['rating'] ?? 0);

    if (!empty($authorName) && !empty($reviewText) && $rating > 0) {
        if (addReview($productId, $authorName, $reviewText, $rating)) {
            header("Location: product.php?id=$productId");
            exit;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($product['name']) ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1><?= htmlspecialchars($product['name']) ?></h1>

    <div style="display: flex; gap: 20px;">
        <div style="flex: 1;">
            <?php if ($product['image_path']): ?>
                <img src="<?= htmlspecialchars($product['image_path']) ?>" alt="<?= htmlspecialchars($product['name']) ?>" style="width:100%;">
            <?php endif; ?>
        </div>
        <div style="flex: 1;">
            <p class="price"><?= number_format($product['price'], 2, '.', ' ') ?> руб.</p>
            <p><?= nl2br(htmlspecialchars($product['description'])) ?></p>
        </div>
    </div>

    <h2>Отзывы</h2>

    <?php if ($reviews): ?>
        <?php foreach ($reviews as $review): ?>
            <div class="review">
                <h4><?= htmlspecialchars($review['author_name']) ?></h4>
                <div>
                    <?php for ($i = 1; $i <= 5; $i++): ?>
                        <span class="star <?= $i <= $review['rating'] ? 'filled' : '' ?>">★</span>
                    <?php endfor; ?>
                </div>
                <p><?= nl2br(htmlspecialchars($review['review_text'])) ?></p>
                <small><?= date('d.m.Y H:i', strtotime($review['created_at'])) ?></small>
            </div>
        <?php endforeach; ?>
    <?php else: ?>
        <p>Пока нет отзывов. Будьте первым!</p>
    <?php endif; ?>

    <h4>Оставить отзыв</h4>
    <form method="post">
        <input type="text" name="author_name" placeholder="Ваше имя" required>
        <select name="rating" required>
            <option value="5">Отлично</option>
            <option value="4">Хорошо</option>
            <option value="3">Удовлетворительно</option>
            <option value="2">Плохо</option>
            <option value="1">Ужасно</option>
        </select>
        <textarea name="review_text" rows="3" placeholder="Текст отзыва" required></textarea>
        <button type="submit">Отправить</button>
    </form>
</div>

</body>
</html>
