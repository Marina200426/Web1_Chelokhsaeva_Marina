<?php
/*
 * Задание 1
 * С помощью цикла do...while написать функцию для вывода чисел от 0 до 10
 */
echo "<h2>Задание 1</h2>";
function printNumbers() {
    $i = 0;
    do {
        if ($i == 0) {
            echo "$i - это ноль<br>";
        } elseif ($i % 2 == 0) {
            echo "$i - четное число<br>";
        } else {
            echo "$i - нечетное число<br>";
        }
        $i++;
    } while ($i <= 10);
}
printNumbers();

/*
 * Задание 2
 * Массив областей и городов с выводом
 */
echo "<h2>Задание 2</h2>";
$regions = [
    'Московская область' => ['Москва', 'Зеленоград', 'Клин'],
    'Ленинградская область' => ['Санкт-Петербург', 'Всеволожск', 'Павловск', 'Кронштадт'],
    'Рязанская область' => ['Рязань', 'Касимов', 'Скопин', 'Сасово']
];

foreach ($regions as $region => $cities) {
    echo "<b>$region:</b><br>";
    echo implode(', ', $cities) . ".<br><br>";
}

/*
 * Задание 3
 * Функция транслитерации
 */
echo "<h2>Задание 3</h2>";
function transliterate($string) {
    $translitMap = [
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
        'е' => 'e', 'ё' => 'yo', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
        'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
        'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
        'у' => 'u', 'ф' => 'f', 'х' => 'kh', 'ц' => 'ts', 'ч' => 'ch',
        'ш' => 'sh', 'щ' => 'shch', 'ъ' => '', 'ы' => 'y', 'ь' => '',
        'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
        'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Д' => 'D',
        'Е' => 'E', 'Ё' => 'Yo', 'Ж' => 'Zh', 'З' => 'Z', 'И' => 'I',
        'Й' => 'Y', 'К' => 'K', 'Л' => 'L', 'М' => 'M', 'Н' => 'N',
        'О' => 'O', 'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T',
        'У' => 'U', 'Ф' => 'F', 'Х' => 'Kh', 'Ц' => 'Ts', 'Ч' => 'Ch',
        'Ш' => 'Sh', 'Щ' => 'Shch', 'Ъ' => '', 'Ы' => 'Y', 'Ь' => '',
        'Э' => 'E', 'Ю' => 'Yu', 'Я' => 'Ya'
    ];
    
    return strtr($string, $translitMap);
}

$testString = "Пример текста для транслитерации";
echo "<b>Исходная строка:</b> $testString<br>";
echo "<b>Транслитерация:</b> " . transliterate($testString) . "<br>";

/*
 * Задание 4
 * Динамическое меню
 */
echo "<h2>Задание 4</h2>";
$menu = [
    'Главная' => '/',
    'Каталог' => [
        'Электроника' => '/catalog/electronics',
        'Одежда' => '/catalog/clothes',
        'Книги' => '/catalog/books'
    ],
    'О компании' => '/about',
    'Контакты' => '/contacts'
];

function buildMenu($items) {
    echo '<ul>';
    foreach ($items as $title => $link) {
        if (is_array($link)) {
            echo '<li>' . $title;
            buildMenu($link);
            echo '</li>';
        } else {
            echo '<li><a href="' . $link . '">' . $title . '</a></li>';
        }
    }
    echo '</ul>';
}

echo "<div style='border:1px solid #ccc; padding:10px; display:inline-block;'>";
buildMenu($menu);
echo "</div>";


/*
 * Задание 6 (необязательное)
 * Города на букву "К"
 */
echo "<h2>Задание 6 (необязательное)</h2>";
foreach ($regions as $region => $cities) {
    $kCities = [];
    foreach ($cities as $city) {
        if (mb_substr($city, 0, 1, 'UTF-8') === 'К') {
            $kCities[] = $city;
        }
    }
    
    if (!empty($kCities)) {
        echo "<b>$region:</b><br>";
        echo implode(', ', $kCities) . ".<br><br>";
    }
}
?>