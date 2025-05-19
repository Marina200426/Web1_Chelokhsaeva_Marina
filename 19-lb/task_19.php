<?php
/*
 * Фотогалерея с возможностью загрузки новых изображений
 */

// Конфигурация
define('GALLERY_DIR', 'images/');
define('THUMBS_DIR', 'thumbs/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('THUMB_WIDTH', 200);
define('LOG_FILE', 'log.txt');
define('LOG_ARCHIVE_PREFIX', 'log');
define('MAX_LOGS_PER_FILE', 10);

// Создаем необходимые директории, если их нет
if (!file_exists(GALLERY_DIR)) mkdir(GALLERY_DIR);
if (!file_exists(THUMBS_DIR)) mkdir(THUMBS_DIR);

// Логирование (задание 4* и 5*)
function logAccess() {
    $logEntry = date('Y-m-d H:i:s') . " - Доступ к галерее\n";
    
    // Проверяем, нужно ли архивировать текущий лог
    if (file_exists(LOG_FILE)) {
        $lines = file(LOG_FILE);
        if (count($lines) >= MAX_LOGS_PER_FILE) {
            // Находим следующий номер для архива
            $archiveNumber = 0;
            while (file_exists(LOG_ARCHIVE_PREFIX . $archiveNumber . '.txt')) {
                $archiveNumber++;
            }
            rename(LOG_FILE, LOG_ARCHIVE_PREFIX . $archiveNumber . '.txt');
        }
    }
    
    // Добавляем новую запись
    file_put_contents(LOG_FILE, $logEntry, FILE_APPEND);
}

// Вызываем логирование при каждом доступе
logAccess();

// Функция для создания миниатюры (задание 3)
function createThumbnail($source, $dest, $width) {
    $info = getimagesize($source);
    
    if (!$info) return false;
    
    list($origWidth, $origHeight, $type) = $info;
    
    switch ($type) {
        case IMAGETYPE_JPEG:
            $image = imagecreatefromjpeg($source);
            break;
        case IMAGETYPE_PNG:
            $image = imagecreatefrompng($source);
            break;
        case IMAGETYPE_GIF:
            $image = imagecreatefromgif($source);
            break;
        default:
            return false;
    }
    
    $ratio = $width / $origWidth;
    $height = $origHeight * $ratio;
    
    $thumb = imagecreatetruecolor($width, $height);
    imagecopyresampled($thumb, $image, 0, 0, 0, 0, $width, $height, $origWidth, $origHeight);
    
    switch ($type) {
        case IMAGETYPE_JPEG:
            imagejpeg($thumb, $dest);
            break;
        case IMAGETYPE_PNG:
            imagepng($thumb, $dest);
            break;
        case IMAGETYPE_GIF:
            imagegif($thumb, $dest);
            break;
    }
    
    imagedestroy($image);
    imagedestroy($thumb);
    
    return true;
}

// Обработка загрузки файла (задание 3)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $file = $_FILES['image'];
    
    // Проверка ошибок загрузки
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $error = "Ошибка загрузки файла";
    } 
    // Проверка типа файла
    elseif (!in_array($file['type'], ['image/jpeg', 'image/png', 'image/gif'])) {
        $error = "Разрешены только JPG, PNG и GIF файлы";
    }
    // Проверка размера файла
    elseif ($file['size'] > MAX_FILE_SIZE) {
        $error = "Файл слишком большой. Максимальный размер: " . (MAX_FILE_SIZE / 1024 / 1024) . "MB";
    } else {
        // Генерируем уникальное имя файла
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $extension;
        $destination = GALLERY_DIR . $filename;
        
        // Перемещаем загруженный файл
        if (move_uploaded_file($file['tmp_name'], $destination)) {
            // Создаем миниатюру
            createThumbnail($destination, THUMBS_DIR . $filename, THUMB_WIDTH);
            // Перенаправляем чтобы избежать повторной отправки формы
            header("Location: " . $_SERVER['PHP_SELF']);
            exit;
        } else {
            $error = "Ошибка при сохранении файла";
        }
    }
}

// Функция для получения списка изображений (задание 2)
function getGalleryImages($dir) {
    $images = [];
    if ($handle = opendir($dir)) {
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != ".." && !is_dir($dir . $entry)) {
                $images[] = $entry;
            }
        }
        closedir($handle);
    }
    return $images;
}

// Получаем список изображений
$images = getGalleryImages(GALLERY_DIR);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Фотогалерея</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .gallery-item {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
        }
        .gallery-item img {
            max-width: 100%;
            height: auto;
        }
        .upload-form {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 5px;
            margin-top: 30px;
        }
        .error {
            color: red;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Фотогалерея</h1>
    
    <!-- Галерея изображений (задание 1 и 2) -->
    <div class="gallery">
        <?php foreach ($images as $image): ?>
            <div class="gallery-item">
                <a href="<?= GALLERY_DIR . $image ?>" target="_blank">
                    <img src="<?= THUMBS_DIR . $image ?>" alt="<?= $image ?>">
                </a>
            </div>
        <?php endforeach; ?>
    </div>
    
    <!-- Форма загрузки (задание 3) -->
    <div class="upload-form">
        <h2>Загрузить новое изображение</h2>
        <?php if (isset($error)): ?>
            <div class="error"><?= $error ?></div>
        <?php endif; ?>
        <form action="" method="post" enctype="multipart/form-data">
            <input type="file" name="image" accept="image/jpeg,image/png,image/gif" required>
            <button type="submit">Загрузить</button>
            <p>Максимальный размер файла: <?= (MAX_FILE_SIZE / 1024 / 1024) ?>MB</p>
        </form>
    </div>
</body>
</html>