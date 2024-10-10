document.addEventListener('DOMContentLoaded', function() {
    const soupSection = document.querySelector('section:nth-of-type(1) .position');
    const mainSection = document.querySelector('section:nth-of-type(2) .position');
    const drinkSection = document.querySelector('section:nth-of-type(3) .position');
    
    const soupSelect = document.getElementById('soup');
    const mainDishSelect = document.getElementById('main-dish');
    const drinkSelect = document.getElementById('drink');

    let selectedDishes = {
        soup: null,
        main: null,
        drink: null
    };

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

    function updateOrder() {
        soupSelect.value = selectedDishes.soup ? selectedDishes.soup.keyword : '';
        mainDishSelect.value = selectedDishes.main ? selectedDishes.main.keyword : '';
        drinkSelect.value = selectedDishes.drink ? selectedDishes.drink.keyword : '';

        const totalPrice = Object.values(selectedDishes)
            .filter(dish => dish !== null)
            .reduce((sum, dish) => sum + dish.price, 0);

        const totalPriceElement = document.querySelector('.total-price');
        if (totalPrice > 0) {
            if (!totalPriceElement) {
                const priceDiv = document.createElement('div');
                priceDiv.className = 'total-price';
                priceDiv.textContent = `Стоимость заказа: ${totalPrice}₽`;
                document.querySelector('.order-block').appendChild(priceDiv);
            } else {
                totalPriceElement.textContent = `Стоимость заказа: ${totalPrice}₽`;
            }
        } else if (totalPriceElement) {
            totalPriceElement.remove();
        }
    }

    function resetDishSelection(category) {
        document.querySelectorAll(`section:nth-of-type(${category}) .dish`).forEach(card => {
            card.classList.remove('selected');
            const button = card.querySelector('button');
            button.style.backgroundColor = '';
            button.style.color = '';
        });
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

    displayDishes();
});
