// Структура заказа, изначально все блюда не выбраны
let order = {
    soup: null,
    main_dish: null,
    salad_starter: null,
    drink: null,
    dessert: null
};

// Функция для добавления блюда в заказ
function addToOrder(dish) {
    order[dish.category] = dish;  // Добавляем блюдо в соответствующую категорию
    updateOrderDisplay();  // Обновляем отображение заказа
}

// Функция для обновления отображения заказа на странице
function updateOrderDisplay() {
    const orderSection = document.querySelector('.order-section');  // Секция, куда будем выводить заказ

    // Генерация текста для каждого блюда
    const soupText = order.soup ? `${order.soup.name} - ${order.soup.price}₽` : 'Блюдо не выбрано';
    const mainDishText = order.main_dish ? `${order.main_dish.name} - ${order.main_dish.price}₽` : 'Блюдо не выбрано';
    const saladStarterText = order.salad_starter ? `${order.salad_starter.name} - ${order.salad_starter.price}₽` : 'Салат или стартер не выбран';
    const drinkText = order.drink ? `${order.drink.name} - ${order.drink.price}₽` : 'Напиток не выбран';
    const dessertText = order.dessert ? `${order.dessert.name} - ${order.dessert.price}₽` : 'Десерт не выбран';

    // Рассчитываем общую стоимость заказа
    const total = (order.soup ? order.soup.price : 0) +
                  (order.main_dish ? order.main_dish.price : 0) +
                  (order.salad_starter ? order.salad_starter.price : 0) +
                  (order.drink ? order.drink.price : 0) +
                  (order.dessert ? order.dessert.price : 0);

    // Если ничего не выбрано, показываем "Ничего не выбрано"
    if (!order.soup && !order.main_dish && !order.salad_starter && !order.drink && !order.dessert) {
        orderSection.innerHTML = `
            <h3>Ваш заказ</h3>
            <p class="bold-text">Ничего не выбрано</p>
            <label for="comment" class="comment_from_java">Комментарий к заказу</label>
            <textarea id="comment" name="comment" rows="4"></textarea>
        `;
    } else {
        // Обновляем заказ с выбранными блюдами
        orderSection.innerHTML = `
            <h3>Ваш заказ</h3>
            <h4>Суп:</h4>
            ${soupText}<br><br>
            <h4>Основное блюдо:</h4>
            ${mainDishText}<br><br>
            <h4>Салат или стартер:</h4>
            ${saladStarterText}<br><br>
            <h4>Напиток:</h4>
            ${drinkText}<br><br>
            <h4>Десерт:</h4>
            ${dessertText}<br><br>
            <h4>Стоимость заказа:</h4>
            ${total > 0 ? `${total}₽` : '0₽'}<br><br>
            <label for="comment" class="comment_from_java">Комментарий к заказу</label>
            <textarea id="comment" name="comment" rows="4"></textarea>
        `;
    }
}

// Функция для проверки правильности заказа
function checkOrder() {
    const hasSoup = order.soup !== null;
    const hasMainDish = order.main_dish !== null;
    const hasSaladStarter = order.salad_starter !== null;
    const hasDrink = order.drink !== null;
    const hasDessert = order.dessert !== null;

    // Логика, проверяющая корректность заказа
    if (!hasSoup && !hasMainDish && !hasSaladStarter && !hasDrink && !hasDessert) {
        showNotification("Ничего не выбрано. Выберите блюда для заказа");
        return false;
    }

    if (hasSoup && !hasMainDish && !hasSaladStarter && !hasDrink) {
        showNotification("Выберите главное блюдо/салат/стартер и напиток");
        return false;
    }

    if (!hasSoup && !hasMainDish && !hasSaladStarter && hasDrink) {
        showNotification("Выберите хотя бы одно блюдо (суп/основное/салат) вместе с напитком");
        return false;
    }

    if (!hasDrink && (hasSoup || hasMainDish || hasSaladStarter || hasDessert)) {
        showNotification("Выберите напиток");
        return false;
    }

    if ((hasMainDish || hasSaladStarter) && !hasSoup) {
        showNotification("Выберите суп");
        return false;
    }

    if (hasDessert && !(hasMainDish || hasSaladStarter || hasSoup)) {
        showNotification("Выберите хотя бы одно основное блюдо или суп перед добавлением десерта");
        return false;
    }

    return true;  // Если все проверки прошли успешно, заказ корректен
}

// Функция для отображения уведомлений
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    const notificationButton = document.getElementById('notification-button');

    document.body.classList.add('noscroll'); // Отключаем прокрутку

    notificationText.textContent = message;
    notification.classList.remove('hidden');

    notificationButton.addEventListener('click', () => {
        notification.classList.add('hidden');
        document.body.classList.remove('noscroll'); // Включаем прокрутку обратно
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Добавляем обработчик для отправки формы
    document.querySelector('form').addEventListener('submit', (event) => {
        if (!checkOrder()) {
            event.preventDefault(); // Останавливаем отправку формы, если заказ некорректен
        }
    });
});
