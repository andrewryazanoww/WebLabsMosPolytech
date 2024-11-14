let order = {
    soup: null,
    main_dish: null,
    salad_starter: null,
    drink: null,
    desert: null
};

function addToOrder(dish) {
    order[dish.category] = dish;
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const orderSection = document.querySelector('.order-section');

    const soupText = order.soup ? `${order.soup.name} ${order.soup.price}₽` : 'Блюдо не выбрано';
    const mainDishText = order.main_dish ? `${order.main_dish.name} ${order.main_dish.price}₽` : 'Блюдо не выбрано';
    const saladStarterText = order.salad_starter ? `${order.salad_starter.name} ${order.salad_starter.price}₽` : 'Салат или стартер не выбран';
    const drinkText = order.drink ? `${order.drink.name} ${order.drink.price}₽` : 'Напиток не выбран';
    const desertText = order.desert ? `${order.desert.name} ${order.desert.price}₽` : 'Десерт не выбран';

    const total = (order.soup ? order.soup.price : 0) +
        (order.main_dish ? order.main_dish.price : 0) +
        (order.salad_starter ? order.salad_starter.price : 0) +
        (order.drink ? order.drink.price : 0) +
        (order.desert ? order.desert.price : 0);

    if (!order.soup && !order.main_dish && !order.salad_starter && !order.drink && !order.desert) {
        orderSection.innerHTML = `
            <h3>Ваш заказ</h3>
            <p class="bold-text">Ничего не выбрано</p>
            <label for="comment" class="comment_from_java">Комментарий к заказу</label>
            <textarea id="comment" name="comment" rows="4"></textarea>
        `;
    } else {
        orderSection.innerHTML = `
        <h3>Ваш заказ</h3>
        <h4>Суп:</h4>
        ${soupText}<br><br>
        <h4>Главное блюдо:</h4>
        ${mainDishText}<br><br>
        <h4>Салат или стартер:</h4>
        ${saladStarterText}<br><br>
        <h4>Напиток:</h4>
        ${drinkText}<br><br>
        <h4>Десерт:</h4>
        ${desertText}<br><br>
        ${total > 0 ? `<h4>Стоимость заказа:</h4>${total}₽` : ''}
        <label for="comment" class="comment_from_java">Комментарий к заказу</label>
        <textarea id="comment" name="comment" rows="4"></textarea>
      `;
    }
}

function checkOrder() {
    const hasSoup = order.soup !== null;
    const hasMainDish = order.main_dish !== null;
    const hasSaladStarter = order.salad_starter !== null;
    const hasDrink = order.drink !== null;
    const hasDesert = order.desert !== null;


    if (!hasSoup && !hasMainDish && !hasSaladStarter && !hasDrink && !hasDesert) {
        showNotification("Ничего не выбрано. Выберите блюда для заказа");
        return false;
    } else if (hasSoup && !hasMainDish && !hasSaladStarter) {
        showNotification("Выберите главное блюдо/салат/стартер");
        return false;
    } else if ((hasSaladStarter && !hasSoup && !hasMainDish)|| (hasMainDish && !hasSoup) ) {
        showNotification("Выберите суп или главное блюдо");
        return false;
    } else if (!hasDrink && (hasSoup || hasMainDish || hasSaladStarter)) {
        showNotification("Выберите напиток");
        return false;
    } else if (!hasSoup && !hasMainDish && !hasSaladStarter && (hasDrink || hasDesert)) {
        showNotification("Выберите главное блюдо");
        return false;
    }

    return true;
}

function showNotification(message) {

    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    const notificationButton = document.getElementById('notification-button');

    document.body.classList.add('noscroll'); // Отключаем прокрутку

    notificationButton.addEventListener('click', () => {
        notification.classList.add('hidden');
        document.body.classList.remove('noscroll'); // Включаем прокрутку обратно
    });

    notificationText.textContent = message;
    notification.classList.remove('hidden');


    notificationButton.addEventListener('click', () => {
        notification.classList.add('hidden');
    });
}


document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('form').addEventListener('submit', (event) => {
        if (!checkOrder()) {
            event.preventDefault();
        }
    });
});
