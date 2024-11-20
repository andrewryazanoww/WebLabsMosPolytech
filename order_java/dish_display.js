document.addEventListener("DOMContentLoaded", () => {
    // URL API для получения списка блюд
    const apiUrl = "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

    // Функция для загрузки данных о блюдах
    async function loadDishes() {
        try {
            // Запрашиваем данные с сервера
            const response = await fetch(apiUrl);

            // Проверяем успешность запроса
            if (!response.ok) {
                throw new Error(`Ошибка загрузки данных: ${response.status}`);
            }

            // Преобразуем ответ в JSON
            const dishes = await response.json();

            // Вызываем функцию для отображения блюд
            displayDishes(dishes);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            alert("Не удалось загрузить данные о блюдах. Попробуйте позже.");
        }
    }

    // Функция для отображения загруженных блюд
    function displayDishes(dishes) {
        const soupSection = document.querySelector('#soups .dishes');
        const mainDishSection = document.querySelector('#main_dishes .dishes');
        const drinkSection = document.querySelector('#drinks .dishes');
        const saladSection = document.querySelector('#salad_starter .dishes');
        const desertSection = document.querySelector('#desert .dishes');

        // Очищаем текущие блюда
        [soupSection, mainDishSection, drinkSection, saladSection, desertSection].forEach(section => section.innerHTML = '');

        // Сортируем блюда по имени
        dishes.sort((a, b) => a.name.localeCompare(b.name));

        dishes.forEach(dish => {
            const dishElement = document.createElement('div');
            dishElement.classList.add('dish');
            dishElement.setAttribute('data-dish', dish.keyword);
            dishElement.setAttribute('data-kind', dish.kind); // Добавляем data-kind для фильтрации
            dishElement.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">
                <p>Цена: ${dish.price}₽</p>
                <p>${dish.name}</p>
                <p>Вес: ${dish.count}</p>
                <button>Добавить</button>
            `;

            // Добавляем в соответствующую секцию в зависимости от категории
            if (dish.category === 'soup') {
                soupSection.appendChild(dishElement);
            } else if (dish.category === 'main_dish') {
                mainDishSection.appendChild(dishElement);
            } else if (dish.category === 'drink') {
                drinkSection.appendChild(dishElement);
            } else if (dish.category === 'salad_starter') {
                saladSection.appendChild(dishElement);
            } else if (dish.category === 'desert') {
                desertSection.appendChild(dishElement);
            }

            // Добавление блюда в заказ по клику
            dishElement.querySelector('button').addEventListener('click', () => {
                addToOrder(dish);
            });
        });
    }

    // Фильтрация блюд по типу (вегетарианские, мясные и т.д.)
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kind = button.getAttribute('data-kind');
            const section = button.closest('section');
            const dishes = section.querySelectorAll('.dish');

            // Если кнопка уже активна, снимаем класс active и показываем все блюда
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                dishes.forEach(dish => dish.style.display = 'block'); // Показываем все блюда
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
            desert: null
        };

        // Обновляем отображение заказа после сброса
        updateOrderDisplay();
    });

    // Загружаем блюда при загрузке страницы
    loadDishes();
});
