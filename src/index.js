class Pizza {
    constructor(type, size) {
        this.type = type;
        this.size = size;
        this.toppings = [];
    }

    addTopping(topping) {
        if (!this.toppings.includes(topping)) {
            this.toppings.push(topping);
        }
    }

    removeTopping(topping) {
        this.toppings = this.toppings.filter(t => t !== topping);
    }

    calculatePrice() {
        let price = {
            'Маргарита': 500,
            'Пепперони': 800,
            'Баварская': 700
        }[this.type] || 0;

        price += this.size === 'Большая' ? 200 : 100;

        const toppingPrices = {
            'Сливочная моцарелла': 50,
            'Сырный бортик': this.size === 'Большая' ? 300 : 150,
            'Чеддер и пармезан': this.size === 'Большая' ? 300 : 150
        };

        this.toppings.forEach(t => price += toppingPrices[t] || 0);

        return price;
    }

    calculateCalories() {
        let calories = {
            'Маргарита': 300,
            'Пепперони': 400,
            'Баварская': 450
        }[this.type] || 0;

        calories += this.size === 'Большая' ? 200 : 100;

        const toppingCalories = {
            'Сливочная моцарелла': 20,
            'Сырный бортик': 50,
            'Чеддер и пармезан': 50
        };

        this.toppings.forEach(t => calories += toppingCalories[t] || 0);

        return calories;
    }
}

let selectedPizza = new Pizza('Маргарита', 'Маленькая');

function updateUI() {
    document.getElementById('totalPrice').textContent = selectedPizza.calculatePrice();
    document.getElementById('totalCalories').textContent = selectedPizza.calculateCalories();
}

function selectPizzaType(type) {
    selectedPizza.type = type;
    updateUI();
}

function selectSize(size) {
    selectedPizza.size = size;
    updateUI();
}

function selectTopping(topping) {
    if (selectedPizza.toppings.includes(topping)) {
        selectedPizza.removeTopping(topping);
    } else {
        selectedPizza.addTopping(topping);
    }
    updateUI();
}

document.addEventListener('DOMContentLoaded', updateUI);
