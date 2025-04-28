<?php
$title = "Мой сайт";
$heading = "Вот вам время!";
$currentYear = date('Y');
$currentTime = getCurrentTimeWithDeclension();


function getCurrentTimeWithDeclension(): string
{

    $hours = (int)date('H');
    $minutes = (int)date('i');

    $hourWord = 'час';
    if ($hours >= 2 && $hours <= 4) {
        $hourWord = 'часа';
    } elseif ($hours >= 5 || $hours === 0) {
        $hourWord = 'часов';
    }
    
    $lastDigit = $minutes % 10;
    $minuteWord = 'минут';
    
    if ($minutes >= 11 && $minutes <= 19) {
        $minuteWord = 'минут';
    } elseif ($lastDigit === 1) {
        $minuteWord = 'минута';
    } elseif ($lastDigit >= 2 && $lastDigit <= 4) {
        $minuteWord = 'минуты';
    }
    
    return "$hours $hourWord $minutes $minuteWord";
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
</head>
<body>
    <h1><?php echo $heading; ?></h1>
    
    <div class="content">
        <p>Текущий год: <?php echo $currentYear; ?></p>
        <p>Текущее время: <?php echo $currentTime; ?></p>
    </div>
</body>
</html>