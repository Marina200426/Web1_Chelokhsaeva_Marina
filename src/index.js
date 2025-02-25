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

        let selectedPizzaType = 'Пепперони';
        let selectedSize = 'Маленькая';
        let selectedToppings = [];

        // Логика для выбора вида пиццы
        function selectPizzaType(pizzaType) {
            selectedPizzaType = pizzaType;
            document.querySelectorAll('.pizza-type-button').forEach(button => {
                button.classList.remove('active');
            });
            document.getElementById(`${pizzaType}Button`).classList.add('active');
            updateTotal();
        }

        // Логика для выбора размера
        function selectSize(size) {
            selectedSize = size;
            document.querySelectorAll('.size-button').forEach(button => {
                button.classList.remove('active');
            });
            if (size === 'Маленькая') {
                document.getElementById('smallButton').classList.add('active');
            } else if (size === 'Большая') {
                document.getElementById('largeButton').classList.add('active');
            }
            updateTotal();
        }

        // Логика для выбора добавки
        function selectTopping(topping) {
            const button = document.getElementById(`${topping.replace(/ /g, '')}Button`);
            if (selectedToppings.includes(topping)) {
                selectedToppings = selectedToppings.filter(item => item !== topping);
                button.classList.remove('active');
            } else {
                selectedToppings.push(topping);
                button.classList.add('active');
            }
            updateTotal();
        }

        // Обновление итоговой стоимости и калорийности
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

        // По умолчанию выбираем "Пепперони", "Маленькая" и первую добавку
        selectPizzaType('Пепперони');
        selectSize('Маленькая');
        selectTopping('Сырный бортик');