let order = {
    soup: null,
    "main-course": null,
    salad: null,
    drink: null,
    dessert: null
};

function addToOrder(dish) {
    order[dish.category] = dish;
    /*updateOrderDisplay();*/
}

function updateOrderDisplay() {
    const orderSection = document.querySelector('.order-section');
     if(!orderSection) {
       return;
    }

    const soupText = order.soup ? `${order.soup.name} ${order.soup.price}₽` : 'Блюдо не выбрано';
    const mainDishText = order["main-course"] ? `${order["main-course"].name} ${order["main-course"].price}₽` : 'Блюдо не выбрано';
    const saladStarterText = order.salad ? `${order.salad.name} ${order.salad.price}₽` : 'Салат или стартер не выбран';
    const drinkText = order.drink ? `${order.drink.name} ${order.drink.price}₽` : 'Напиток не выбран';
    const desertText = order.dessert ? `${order.dessert.name} ${order.dessert.price}₽` : 'Десерт не выбран';

    const total = (order.soup ? order.soup.price : 0) +
        (order.main_dish ? order.main_dish.price : 0) +
        (order.salad ? order.salad.price : 0) +
        (order.drink ? order.drink.price : 0) +
        (order.dessert ? order.dessert.price : 0);

    if (!order.soup && !order["main-course"] && !order.salad && !order.drink && !order.dessert) {
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
    const hasMainDish = order["main-course"] !== null;
    const hasSaladStarter = order.salad !== null;
    const hasDrink = order.drink !== null;
    const hasDesert = order.dessert !== null;

    // Проверка полностью собранных комбинаций (без изменений)
    if (hasSoup && hasMainDish && hasSaladStarter && hasDrink) return true;
    if (hasSoup && hasMainDish && hasDrink && !hasSaladStarter) return true;
    if (hasSoup && hasSaladStarter && hasDrink && !hasMainDish) return true;
    if (!hasSoup && hasMainDish && hasSaladStarter && hasDrink) return true;
    if (!hasSoup && !hasSaladStarter && hasMainDish && hasDrink) return true;

    if (!hasSoup && !hasMainDish && !hasSaladStarter && !hasDrink && !hasDesert) {
        showNotification("Ничего не выбрано. Выберите блюда для заказа");
        return false;
    } else if (hasSoup && !hasMainDish && !hasSaladStarter && !hasDrink) { 
        showNotification("Выберите главное блюдо/салат/стартер и напиток");
        return false;
    } else if (hasSaladStarter && !hasSoup && !hasMainDish && !hasDrink) { // Только салат/стартер - ошибка
        showNotification("Выберите суп или главное блюдо и напиток");
        return false;
    }else if (!hasDrink && (hasSoup || hasMainDish || hasSaladStarter)) {
        showNotification("Выберите напиток");
        return false;
    } else if (hasSoup && !(hasMainDish || hasSaladStarter)) { // Только суп - ошибка
        showNotification("Выберите главное блюдо/салат/стартер");
        return false;
    }else if ((hasSaladStarter || hasMainDish) && !hasSoup && hasDrink) {
        showNotification("Выберите суп");
        return false;
    }
    else if ((hasDrink || hasDesert) && !hasMainDish && !(hasSoup && hasSaladStarter)) { //Напиток/Десерт без главного - ошибка
        showNotification("Выберите суп");
        return false;
    }
    else {
        return true;  // Заказ корректен
    }
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
 function clearOrder(dishes) {
    order = {
        soup: null,
        "main-course": null,
        salad: null,
        drink: null,
        dessert: null
    };
    localStorage.removeItem('selectedDishes');
     if(typeof updateOrderDisplay === 'function'){
     updateOrderDisplay(dishes);
    }
}
document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('form').addEventListener('submit', (event) => {
        if (!checkOrder()) {
            event.preventDefault();
        }
    });
});