<?php
require_once 'db.php';


function getAllProducts() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM products ORDER BY name");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


function getProductById($id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}


function getProductReviews($productId) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM product_reviews WHERE product_id = ? ORDER BY created_at DESC");
    $stmt->execute([$productId]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


function addReview($productId, $authorName, $reviewText, $rating) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO product_reviews (product_id, author_name, review_text, rating) VALUES (?, ?, ?, ?)");
    return $stmt->execute([$productId, $authorName, $reviewText, $rating]);
}


function uploadProductImage($file) {
    $targetDir = __DIR__ . "/../uploads/products/";
    $fileName = uniqid() . '_' . basename($file["name"]);
    $targetFile = $targetDir . $fileName;
    
 
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    
    if (!in_array($imageFileType, $allowedTypes)) {
        return ['error' => 'Недопустимый тип файла'];
    }
    
    if (move_uploaded_file($file["tmp_name"], $targetFile)) {
        return ['success' => 'uploads/products/' . $fileName];
    } else {
        return ['error' => 'Ошибка загрузки файла'];
    }
}
?>