document.addEventListener('DOMContentLoaded', async () => {
    const soupSection = document.querySelector('#soups .dishes');
    const mainDishSection = document.querySelector('#main_dishes .dishes');
    const drinkSection = document.querySelector('#drinks .dishes');
    const saladSection = document.querySelector('#salad_starter .dishes');
    const desertSection = document.querySelector('#desert .dishes');
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes'; // Верный URL
    let sortedDishes = [];

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const dishes_massive = await response.json();

        sortedDishes = dishes_massive.sort((a, b) => a.name.localeCompare(b.name));

        sortedDishes.forEach(dish => {

            const dishElement = document.createElement('div');
            dishElement.classList.add('dish');
            dishElement.setAttribute('data-dish', dish.id);
            dishElement.setAttribute('data-kind', dish.kind);
            dishElement.innerHTML = `
              <img src="${dish.image}" alt="${dish.name}">
              <p>Цена: ${dish.price}₽</p>
              <p>${dish.name}</p>
              <p>Вес: ${dish.count}</p>
              <button>Добавить</button>
            `;

            if (dish.category === 'soup') {
                soupSection.appendChild(dishElement);
            } else if (dish.category === 'main-course') { // Изменено с 'main_dish' на 'main-course'
                mainDishSection.appendChild(dishElement);
            } else if (dish.category === 'drink') {
                drinkSection.appendChild(dishElement);
            } else if (dish.category === 'salad') { // Изменено с 'salad_starter' на 'salad'
                saladSection.appendChild(dishElement);
            } else if (dish.category === 'dessert') { // Изменено с 'desert' на 'dessert'
                desertSection.appendChild(dishElement);
            }

            dishElement.querySelector('button').addEventListener('click', () => {
                addToOrder(dish);
                // Сохраняем ID блюда в localStorage
                let selectedDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];
                if (!selectedDishes.includes(dish.id)) { // Используем dish.id
                    selectedDishes.push(dish.id);
                }
                localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));

                // Добавляем класс "selected" к кнопке и блоку блюда
                dishElement.classList.toggle('selected');
                dishElement.querySelector('button').classList.toggle('selected');
                updateOrderSummary(); // Вызываем функцию для обновления суммарной стоимости и отображения панели
                checkOrderAvailability();
                console.log(dish.id)
                console.log(JSON.parse(localStorage.getItem('selectedDishes')))
            });
        });
        // Восстановление состояния при загрузке страницы
        updateOrderSummary();
        checkOrderAvailability();
        const selectedDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];
        selectedDishes.forEach(dishId => {
            const dish = sortedDishes.find(d => d.id === parseInt(dishId)); // или  +dishId
            if (dish) {
                totalPrice += dish.price;
            }
        });

    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }

    function updateOrderSummary() {
        const selectedDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];
        let totalPrice = 0;

        selectedDishes.forEach(dishId => {
            const dish = sortedDishes.find(d => d.id === parseInt(dishId)); // или  +dishId
            if (dish) {
                totalPrice += dish.price;
            }
        });


        const orderSummary = document.getElementById('orderSummary');
        if (selectedDishes.length > 0) {
            orderSummary.innerHTML = `
            <p>Общая стоимость: ${totalPrice}₽</p>
            <a href="order.html" id="orderLink">Перейти к оформлению</a>
        `;
            orderSummary.style.display = 'block';
        } else {
            orderSummary.style.display = 'none';
        }
        checkOrderAvailability();
        console.log("selectedDishes:", selectedDishes);
        console.log("sortedDishes:", sortedDishes);
        console.log("totalPrice:", totalPrice);
    }

    function checkOrderAvailability() {
        const orderLink = document.getElementById('orderLink');
        if (orderLink) { // Проверяем, существует ли элемент
            if (checkOrder()) { // Вызываем checkOrder() из order.js
                orderLink.classList.remove('disabled');
            } else {
                orderLink.classList.add('disabled');
            }
        }
    }
});
