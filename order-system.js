document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        soup: document.querySelector('#soup-section'),
        main: document.querySelector('#main-section'),
        starter: document.querySelector('#starter-section'),
        drink: document.querySelector('#drink-section'),
        dessert: document.querySelector('#dessert-section')
    };
    const orderContainer = document.querySelector('.order');

    const sortedDishes = {
        soup: dishes.filter(dish => dish.category === 'soup').sort((a, b) => a.name.localeCompare(b.name)),
        main: dishes.filter(dish => dish.category === 'main').sort((a, b) => a.name.localeCompare(b.name)),
        starter: dishes.filter(dish => dish.category === 'starter').sort((a, b) => a.name.localeCompare(b.name)),
        drink: dishes.filter(dish => dish.category === 'drink').sort((a, b) => a.name.localeCompare(b.name)),
        dessert: dishes.filter(dish => dish.category === 'dessert').sort((a, b) => a.name.localeCompare(b.name)),
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

    function displayDishes(category, filter = '') {
        const section = sections[category];
        section.innerHTML = '';

        const dishesToShow = sortedDishes[category].filter(dish => !filter || dish.kind === filter);
        dishesToShow.forEach(dish => section.appendChild(createDishCard(dish)));
    }

    // Инициализация всех разделов без фильтра
    Object.keys(sections).forEach(category => displayDishes(category));

    // Обработчик нажатия на фильтры
    document.querySelectorAll('.filters').forEach(filterContainer => {
        filterContainer.addEventListener('click', (event) => {
            event.preventDefault();
            const filterLink = event.target.closest('a');
            if (!filterLink) return;
    
            const filter = filterLink.dataset.kind;
            const sectionType = filterContainer.closest('section').querySelector('.position').id.split('-')[0];
    
            // Проверяем,. активен ли фильтр
            if (filterLink.classList.contains('active')) {
                // Если активен, сбрасываем фильтр и показываем все блюда
                displayDishes(sectionType);
                filterLink.classList.remove('active');
            } else {
                // Применяем фильтр только к выбранной секции
                displayDishes(sectionType, filter);
    
                // Обновляем стили активного фильтра
                filterContainer.querySelectorAll('a').forEach(link => link.classList.remove('active'));
                filterLink.classList.add('active');
            }
        });
    });

    const selectedDishes = {
        soup: null,
        main: null,
        starter: null,
        drink: null,
        dessert: null
    };

    function updateOrder() {
        const orderText = [];
        let totalPrice = 0;
        let hasSelectedDishes = false;

        for (const [category, dish] of Object.entries(selectedDishes)) {
            if (dish) {
                orderText.push(`${dish.name} - ${dish.price}₽`);
                totalPrice += dish.price;
                hasSelectedDishes = true;
            }
        }

        if (!hasSelectedDishes) {
            orderContainer.innerHTML = '<p>Ничего не выбрано</p>';
        } else {
            orderContainer.innerHTML = `<p>${orderText.join('<br>')}</p><p>Стоимость заказа: ${totalPrice}₽</p>`;
        }
    }

    document.addEventListener('click', function(event) {
        if (event.target.matches('button')) {
            const dishCard = event.target.closest('.dish');
            if (!dishCard) return;

            const keyword = dishCard.dataset.dish;
            const dish = dishes.find(d => d.keyword === keyword);
            if (!dish) return;

            selectedDishes[dish.category] = dish;
            updateOrder();

            document.querySelectorAll(`.dish[data-dish="${keyword}"] button`).forEach(button => {
                button.style.backgroundColor = '#4CAF50';
                button.style.color = 'white';
            });
        }
    });

    function resetDishSelection(category) {
        selectedDishes[category] = null;
        updateOrder();
        document.querySelectorAll('.dish button').forEach(button => {
            button.style.backgroundColor = '';
            button.style.color = '';
        });
    }
});
