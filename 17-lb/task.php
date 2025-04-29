<?php
echo "<h2>Задание 1: Проверка чисел</h2>";
$a = 10;
$b = 5;

if ($a >= 0 && $b >= 0) {
    echo "Разность чисел: " . ($a - $b) . "<br>";
} elseif ($a < 0 && $b < 0) {
    echo "Произведение чисел: " . ($a * $b) . "<br>";
} else {
    echo "Сумма чисел: " . ($a + $b) . "<br>";
}

echo "<h2>Задание 2: Вывод чисел через switch</h2>";
$a = rand(0, 15);
echo "Числа от $a до 15: ";
switch ($a) {
    case 0: echo "0 ";
    case 1: echo "1 ";
    case 2: echo "2 ";
    case 3: echo "3 ";
    case 4: echo "4 ";
    case 5: echo "5 ";
    case 6: echo "6 ";
    case 7: echo "7 ";
    case 8: echo "8 ";
    case 9: echo "9 ";
    case 10: echo "10 ";
    case 11: echo "11 ";
    case 12: echo "12 ";
    case 13: echo "13 ";
    case 14: echo "14 ";
    case 15: echo "15 "; break;
    default: echo "Число вне диапазона";
}
echo "<br>";

echo "<h2>Задание 3: Арифметические функции</h2>";
function add($x, $y) {
    return $x + $y;
}

function subtract($x, $y) {
    return $x - $y;
}

function multiply($x, $y) {
    return $x * $y;
}

function divide($x, $y) {
    return $y != 0 ? $x / $y : "Деление на ноль!";
}

echo "<h2>Задание 4: Функция mathOperation</h2>";
function mathOperation($arg1, $arg2, $operation) {
    switch ($operation) {
        case 'add': return add($arg1, $arg2);
        case 'subtract': return subtract($arg1, $arg2);
        case 'multiply': return multiply($arg1, $arg2);
        case 'divide': return divide($arg1, $arg2);
        default: return "Неизвестная операция";
    }
}

echo "Результат сложения: " . mathOperation(10, 5, 'add') . "<br>";
echo "Результат вычитания: " . mathOperation(10, 5, 'subtract') . "<br>";
echo "Результат умножения: " . mathOperation(10, 5, 'multiply') . "<br>";
echo "Результат деления: " . mathOperation(10, 5, 'divide') . "<br>";

echo "<h2>Задание 5*: Вывод текущего года</h2>";
?>
<!DOCTYPE html>
<html>
<head>
    <title>Текущий год</title>
</head>
<body>
    <p>Текущий год (способ 1): <?php echo date('Y'); ?></p>
    <p>Текущий год (способ 2): <?php echo date('Y', time()); ?></p>
    <p>Текущий год (способ 3): <?php echo (new DateTime())->format('Y'); ?></p>
</body>
</html>
<?php

echo "<h2>Задание 6*: Рекурсивное возведение в степень</h2>";
function power($val, $pow) {
    if ($pow == 0) return 1;
    if ($pow < 0) return 1 / power($val, -$pow);
    return $val * power($val, $pow - 1);
}

echo "2 в степени 3: " . power(2, 3) . "<br>";
echo "5 в степени -2: " . power(5, -2) . "<br>";
?>