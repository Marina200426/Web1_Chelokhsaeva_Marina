// script.js
class Pizza {
    constructor(type, size) {
        this.type = type;
        this.size = size;
        this.toppings = [];
    }

    addTopping(topping) {
        this.toppings.push(topping);
    }

    removeTopping(topping) {
        const index = this.toppings.indexOf(topping);
        if (index !== -1) {
            this.toppings.splice(index, 1);
        }
    }

    getToppings() {
        return this.toppings;
    }

    getSize() {
        return this.size;
    }

    getType() {
        return this.type;
    }

    calculatePrice() {
        let price = 0;

        // Базовая цена пиццы
        switch (this.type) {
            case 'Маргарита':
                price += 500;
                break;
            case 'Пепперони':
                price += 800;
                break;
            case 'Баварская':
                price += 700;
                break;
        }

        // Цена за размер
        switch (this.size) {
            case 'Большая':
                price += 200;
                break;
            case 'Маленькая':
                price += 100;
                break;
        }

        // Цена за добавки
        for (const topping of this.toppings) {
            switch (topping) {
                case 'сливочная моцарелла':
                    price += 50;
                    break;
                case 'сырный борт':
                    price += this.size === 'Большая' ? 300 : 150;
                    break;
                case 'чедер и пармезан':
                    price += this.size === 'Большая' ? 300 : 150;
                    break;
            }
        }

        return price;
    }

    calculateCalories() {
        let calories = 0;

        // Базовая калорийность пиццы
        switch (this.type) {
            case 'Маргарита':
                calories += 300;
                break;
            case 'Пепперони':
                calories += 400;
                break;
            case 'Баварская':
                calories += 450;
                break;
        }

        // Калорийность за размер
        switch (this.size) {
            case 'Большая':
                calories += 200;
                break;
            case 'Маленькая':
                calories += 100;
                break;
        }

        // Калорийность за добавки
        for (const topping of this.toppings) {
            switch (topping) {
                case 'сливочная моцарелла':
                    calories += 20;
                    break;
                case 'сырный борт':
                case 'чедер и пармезан':
                    calories += 50;
                    break;
            }
        }

        return calories;
    }
}

function calculatePizza() {
    // Получаем выбранные значения
    const pizzaType = document.getElementById('pizzaType').value;
    const pizzaSize = document.getElementById('pizzaSize').value;
    const toppings = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value);

    // Создаем объект пиццы
    const myPizza = new Pizza(pizzaType, pizzaSize);
    toppings.forEach(topping => myPizza.addTopping(topping));

    // Рассчитываем стоимость и калорийность
    const price = myPizza.calculatePrice();
    const calories = myPizza.calculateCalories();

    // Выводим результат
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p><strong>Тип пиццы:</strong> ${myPizza.getType()}</p>
        <p><strong>Размер пиццы:</strong> ${myPizza.getSize()}</p>
        <p><strong>Добавки:</strong> ${myPizza.getToppings().join(', ') || 'нет'}</p>
        <p><strong>Цена:</strong> ${price} рублей</p>
        <p><strong>Калорийность:</strong> ${calories} Ккалорий</p>
    `;
}