// Данные о стоимости и калорийности
const prices = {
    Пепперони: { Маленькая: 400, Большая: 600 },
    Маргарита: { Маленькая: 350, Большая: 550 },
    Баварская: { Маленькая: 450, Большая: 650 },
    'Сырный бортик': 189,
    'Сливочная моцарелла': 99,
    'Чеддер и пармезан': 99
};

const calories = {
    Пепперони: { Маленькая: 800, Большая: 1200 },
    Маргарита: { Маленькая: 700, Большая: 1100 },
    Баварская: { Маленькая: 900, Большая: 1300 },
    'Сырный бортик': 200,
    'Сливочная моцарелла': 150,
    'Чеддер и пармезан': 150
};

// Соответствие русских названий `id` кнопок
const pizzaIdMap = {
    'Пепперони': 'pepperoniButton',
    'Маргарита': 'margaritaButton',
    'Баварская': 'bavarianButton'
};

const toppingIdMap = {
    'Сырный бортик': 'cheeseCrustButton',
    'Сливочная моцарелла': 'creamyMozzarellaButton',
    'Чеддер и пармезан': 'cheddarParmesanButton'
};

let selectedPizzaType = 'Пепперони';
let selectedSize = 'Маленькая';
let selectedToppings = [];

// Функция выбора вида пиццы
function selectPizzaType(pizzaType) {
    selectedPizzaType = pizzaType;

    document.querySelectorAll('.pizza-type-button').forEach(button => {
        button.classList.remove('active');
    });

    const selectedButton = document.getElementById(pizzaIdMap[pizzaType]);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    updateTotal();
}

// Функция выбора размера
function selectSize(size) {
    selectedSize = size;

    document.querySelectorAll('.size-button').forEach(button => {
        button.classList.remove('active');
    });

    const selectedButton = document.getElementById(size === 'Маленькая' ? 'smallButton' : 'largeButton');
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    updateTotal();
}

// Функция выбора добавки
function selectTopping(topping) {
    const buttonId = toppingIdMap[topping];
    const button = document.getElementById(buttonId);

    if (button) {
        if (selectedToppings.includes(topping)) {
            selectedToppings = selectedToppings.filter(item => item !== topping);
            button.classList.remove('active');
        } else {
            selectedToppings.push(topping);
            button.classList.add('active');
        }
        updateTotal();
    }
}

// Функция обновления итоговой стоимости и калорийности
function updateTotal() {
    let totalPrice = prices[selectedPizzaType][selectedSize];
    let totalCalories = calories[selectedPizzaType][selectedSize];

    selectedToppings.forEach(topping => {
        totalPrice += prices[topping];
        totalCalories += calories[topping];
    });

    document.getElementById('totalPrice').textContent = totalPrice;
    document.getElementById('totalCalories').textContent = totalCalories;
}

// Установка значений по умолчанию
document.addEventListener('DOMContentLoaded', () => {
    selectPizzaType('Пепперони');
    selectSize('Маленькая');
    selectTopping('Сырный бортик');
});
