document.addEventListener("DOMContentLoaded", () => {
    // URL API для получения списка блюд
    const apiUrl = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

    // Функция для загрузки данных о блюдах
    async function loadDishes() {
        try {
            // Выполняем GET-запрос
            const response = await fetch(apiUrl);

            // Проверяем успешность запроса
            if (!response.ok) {
                throw new Error(`Ошибка загрузки данных: ${response.status}`);
            }

            // Преобразуем ответ в JSON
            const dishes = await response.json();
            displayDishes(dishes); // Передаем данные для отображения
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            alert("Не удалось загрузить данные о блюдах. Проверьте соединение с сервером.");
        }
    }

    // Функция для отображения блюд
    function displayDishes(dishes) {
        const soupSection = document.querySelector('#soups .dishes');
        const mainDishSection = document.querySelector('#main_dishes .dishes');
        const saladSection = document.querySelector('#salad_starter .dishes');
        const dessertSection = document.querySelector('#dessert .dishes');

        // Очищаем секции перед добавлением новых данных
        [soupSection, mainDishSection, saladSection, dessertSection].forEach(section => section.innerHTML = '');

        // Сортируем блюда по имени
        dishes.sort((a, b) => a.name.localeCompare(b.name));

        dishes.forEach(dish => {
            const dishElement = document.createElement('div');
            dishElement.classList.add('dish');
            dishElement.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <p>${dish.name}</p>
                <p>Цена: ${dish.price}₽</p>
                <p>Вес: ${dish.count}</p>
                <button>Добавить</button>
            `;

            // Распределяем блюда по категориям
            if (dish.category === 'soup') {
                soupSection.appendChild(dishElement);
            } else if (dish.category === 'main-course') {
                mainDishSection.appendChild(dishElement);
            } else if (dish.category === 'salad') {
                saladSection.appendChild(dishElement);
            } else if (dish.category === 'dessert') {
                dessertSection.appendChild(dishElement);
            }

            // Добавляем обработчик для кнопки "Добавить"
            dishElement.querySelector('button').addEventListener('click', () => {
                addToOrder(dish);
            });
        });
    }

    // Фильтрация блюд по типу (например, вегетарианские, мясные)
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kind = button.getAttribute('data-kind');
            const section = button.closest('section');
            const dishes = section.querySelectorAll('.dish');

            // Если кнопка активна, снимаем класс и показываем все блюда
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                dishes.forEach(dish => dish.style.display = 'block');
            } else {
                // Убираем класс active у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Добавляем класс active к текущей кнопке
                button.classList.add('active');

                // Показать/скрыть блюда в зависимости от фильтра
                dishes.forEach(dish => {
                    if (dish.getAttribute('data-kind') === kind) {
                        dish.style.display = 'block';
                    } else {
                        dish.style.display = 'none';
                    }
                });
            }
        });
    });

    // Обработчик для кнопки "Сброс"
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
        // Сбрасываем объект order
        order = {
            soup: null,
            main_dish: null,
            drink: null,
            salad_starter: null,
            dessert: null
        };

        // Обновляем отображение заказа после сброса
        updateOrderDisplay();
    });

    // Загружаем блюда при загрузке страницы
    loadDishes();
});
