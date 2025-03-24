// Данные о стоимости и калорийности
const basePrices = {
    Пепперони: 800,
    Маргарита: 500,
    Баварская: 700
};

const baseCalories = {
    Пепперони: 400,
    Маргарита: 300,
    Баварская: 450
};

// Доплата за размер
const sizeModifiers = {
    Большая: { price: 200, calories: 200 },
    Маленькая: { price: 100, calories: 100 }
};

// Дополнения с разными ценами для маленькой и большой пиццы
const toppings = {
    'Сливочная моцарелла': { price: 50, calories: 20 },
    'Сырный бортик': { Маленькая: { price: 150, calories: 50 }, Большая: { price: 300, calories: 50 } },
    'Чеддер и пармезан': { Маленькая: { price: 150, calories: 50 }, Большая: { price: 300, calories: 50 } }
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
    let totalPrice = basePrices[selectedPizzaType] + sizeModifiers[selectedSize].price;
    let totalCalories = baseCalories[selectedPizzaType] + sizeModifiers[selectedSize].calories;

    selectedToppings.forEach(topping => {
        if (topping in toppings) {
            if (typeof toppings[topping] === 'object' && selectedSize in toppings[topping]) {
                totalPrice += toppings[topping][selectedSize].price;
                totalCalories += toppings[topping][selectedSize].calories;
            } else {
                totalPrice += toppings[topping].price;
                totalCalories += toppings[topping].calories;
            }
        }
    });

    document.getElementById('totalPrice').textContent = totalPrice;
    document.getElementById('totalCalories').textContent = totalCalories;
}

// Установка значений по умолчанию
document.addEventListener('DOMContentLoaded', () => {
    selectPizzaType('Пепперони');
    selectSize('Маленькая');
});
