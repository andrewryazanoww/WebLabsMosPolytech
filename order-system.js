document.addEventListener('DOMContentLoaded', function() {
    const soupSection = document.querySelector('section:nth-of-type(1) .position');
    const mainSection = document.querySelector('section:nth-of-type(2) .position');
    const drinkSection = document.querySelector('section:nth-of-type(3) .position');
    const orderContainer = document.querySelector('.order');

    const sortedDishes = {
        soup: dishes.filter(dish => dish.category === 'soup').sort((a, b) => a.name.localeCompare(b.name)),
        main: dishes.filter(dish => dish.category === 'main').sort((a, b) => a.name.localeCompare(b.name)),
        drink: dishes.filter(dish => dish.category === 'drink').sort((a, b) => a.name.localeCompare(b.name))
    };

    function createDishCard(dish) {
        const dishDiv = document.createElement('div');
        dishDiv.className = 'dish';
        dishDiv.dataset.dish = dish.keyword;

        dishDiv.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="info">${dish.name}</p>
            <p class="info">${dish.price}₽</p>
            <p class="weight">${dish.count}</p>
            <button type="button">Добавить</button>
        `;
        return dishDiv;
    }

    function displayDishes() {
        soupSection.innerHTML = '';
        mainSection.innerHTML = '';
        drinkSection.innerHTML = '';

        sortedDishes.soup.forEach(dish => soupSection.appendChild(createDishCard(dish)));
        sortedDishes.main.forEach(dish => mainSection.appendChild(createDishCard(dish)));
        sortedDishes.drink.forEach(dish => drinkSection.appendChild(createDishCard(dish)));
    }

    displayDishes();

    const selectedDishes = {
        soup: null,
        main: null,
        drink: null
    };

    function updateOrder() {
        const orderText = [];
        let totalPrice = 0;

        if (selectedDishes.soup) {
            orderText.push(`Суп<br>${selectedDishes.soup.name} ${selectedDishes.soup.price}₽`);
            totalPrice += selectedDishes.soup.price;
        } else {
            orderText.push('Суп<br>Блюдо не выбрано');
        }

        if (selectedDishes.main) {
            orderText.push(`Главное блюдо<br>${selectedDishes.main.name} ${selectedDishes.main.price}₽`);
            totalPrice += selectedDishes.main.price;
        } else {
            orderText.push('Главное блюдо<br>Блюдо не выбрано');
        }

        if (selectedDishes.drink) {
            orderText.push(`Напиток<br>${selectedDishes.drink.name} ${selectedDishes.drink.price}₽`);
            totalPrice += selectedDishes.drink.price;
        } else {
            orderText.push('Напиток<br>Напиток не выбран');
        }

        if (!selectedDishes.soup && !selectedDishes.main && !selectedDishes.drink) {
            orderContainer.innerHTML = '<p>Ничего не выбрано</p>';
        } else {
            orderContainer.innerHTML = `<p>${orderText.join('<br><br>')}</p><p>Стоимость заказа: ${totalPrice}₽</p>`;
        }
    }

    document.addEventListener('click', function(event) {
        if (event.target.matches('button')) {
            const dishCard = event.target.closest('.dish');
            if (!dishCard) return;

            const keyword = dishCard.dataset.dish;
            const dish = dishes.find(d => d.keyword === keyword);
            if (!dish) return;

            const categoryIndex = dish.category === 'soup' ? 1 : dish.category === 'main' ? 2 : 3;
            resetDishSelection(categoryIndex);

            selectedDishes[dish.category] = dish;
            updateOrder();

            dishCard.classList.add('selected');
            const button = dishCard.querySelector('button');
            button.style.backgroundColor = '#4CAF50';
            button.style.color = 'white';
        }
    });

    function resetDishSelection(categoryIndex) {
        if (categoryIndex === 1) {
            selectedDishes.soup = null;
        } else if (categoryIndex === 2) {
            selectedDishes.main = null;
        } else if (categoryIndex === 3) {
            selectedDishes.drink = null;
        }

        const selectedButtons = document.querySelectorAll('.dish.selected');
        selectedButtons.forEach(button => {
            button.classList.remove('selected');
            const innerButton = button.querySelector('button');
            innerButton.style.backgroundColor = '';
            innerButton.style.color = '';
        });
    }
});
