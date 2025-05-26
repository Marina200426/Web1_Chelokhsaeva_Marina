<?php
require_once 'includes/functions.php';

$products = getAllProducts();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Каталог товаров</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <h1>Каталог товаров</h1>

    <div class="product-grid">
        <?php foreach ($products as $product): ?>
            <div class="product-card">
                <?php if ($product['image_path']): ?>
                    <img src="<?= htmlspecialchars($product['image_path']) ?>" alt="<?= htmlspecialchars($product['name']) ?>">
                <?php endif; ?>
                <h5><?= htmlspecialchars($product['name']) ?></h5>
                <p><?= htmlspecialchars(substr($product['description'], 0, 100)) ?>...</p>
                <p class="price"><?= number_format($product['price'], 2, '.', ' ') ?> руб.</p>
                <a href="product.php?id=<?= $product['id'] ?>" class="btn">Подробнее</a>
            </div>
        <?php endforeach; ?>
    </div>
</div>

</body>
</html>
