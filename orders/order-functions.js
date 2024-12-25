// order-functions.js
// Глобальные переменные для API (замените на ваши значения)
const apiKey = '3ba95a0d-b29f-46d7-a3d8-4fe2e0b49866'; // Ваш API ключ
const apiUrl = 'http://lab8-api.std-900.ist.mospolytech.ru/labs/api';

// Функция для форматирования даты
function formatOrderDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Функция для расчета общей стоимости заказа
function calculateOrderTotal(order, dishes) {
    let total = 0;
     if (order.soup_id) {
        const soup = dishes.find(d => d.id === order.soup_id);
        if (soup) total += soup.price;
    }
    if (order.main_course_id) {
        const main = dishes.find(d => d.id === order.main_course_id);
        if (main) total += main.price;
    }
    if (order.salad_id) {
        const salad = dishes.find(d => d.id === order.salad_id);
        if (salad) total += salad.price;
    }
    if (order.drink_id) {
        const drink = dishes.find(d => d.id === order.drink_id);
        if (drink) total += drink.price;
    }
    if (order.dessert_id) {
        const dessert = dishes.find(d => d.id === order.dessert_id);
        if (dessert) total += dessert.price;
    }
    return total;
}

// Функция для форматирования состава заказа в виде строки
function formatOrderItems(order, dishes) {
    const orderDishes = [];
     if (order.soup_id) {
        const soup = dishes.find(d => d.id === order.soup_id);
        if (soup) orderDishes.push(soup.name);
    }
    if (order.main_course_id) {
        const main = dishes.find(d => d.id === order.main_course_id);
        if (main) orderDishes.push(main.name);
    }
    if (order.salad_id) {
        const salad = dishes.find(d => d.id === order.salad_id);
        if (salad) orderDishes.push(salad.name);
    }
    if (order.drink_id) {
        const drink = dishes.find(d => d.id === order.drink_id);
        if (drink) orderDishes.push(drink.name);
    }
    if (order.dessert_id) {
        const dessert = dishes.find(d => d.id === order.dessert_id);
        if (dessert) orderDishes.push(dessert.name);
    }
    return orderDishes.join(', ') || 'Пустой заказ';
}

// Функция для загрузки заказов с API и отображения в таблице
async function fetchAndDisplayOrders() {
    const orderTableBody = document.getElementById('orderTableBody');
    if (!orderTableBody) {
        console.error('Не найден элемент tbody для таблицы заказов.');
        return;
    }

    try {
        const ordersResponse = await fetch(`${apiUrl}/orders?api_key=${apiKey}`);
        if (!ordersResponse.ok) {
            throw new Error(`Ошибка при загрузке заказов: ${ordersResponse.status}`);
        }
        const orders = await ordersResponse.json();

        const dishesResponse = await fetch(`${apiUrl}/dishes?api_key=${apiKey}`);
        if (!dishesResponse.ok) {
            throw new Error(`Ошибка при загрузке блюд: ${dishesResponse.status}`);
        }
        const dishes = await dishesResponse.json();


        // Сортировка заказов по дате в обратном порядке
        orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        orderTableBody.innerHTML = '';

        orders.forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
          <td>${index + 1}</td>
          <td>${formatOrderDate(order.created_at)}</td>
          <td>${formatOrderItems(order, dishes)}</td>
          <td>${calculateOrderTotal(order, dishes)}₽</td>
          <td>${order.delivery_type === 'now' ? 'В течение дня (с 7:00 до 23:00)' : order.delivery_time}</td>
          <td>
              <button onclick="openOrderDetails(${order.id})" class="btn btn-primary btn-sm">Подробнее</button>
              <button onclick="openEditOrderForm(${order.id})" class="btn btn-secondary btn-sm">Редактировать</button>
              <button onclick="initiateOrderDeletion(${order.id})" class="btn btn-danger btn-sm">Удалить</button>
          </td>
      `;
            orderTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Ошибка при загрузке и отображении заказов:', error);
        showNotification('Ошибка при загрузке заказов: ' + error.message, 'error');
    }
}


// Глобальная переменная для хранения ID заказа, который нужно удалить
let currentOrderId = null;

// Функция для отображения модального окна с деталями заказа
async function openOrderDetails(orderId) {
    try {
        const response = await fetch(`${apiUrl}/orders/${orderId}?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Ошибка при получении данных заказа');
        const order = await response.json();

        const dishesResponse = await fetch(`${apiUrl}/dishes?api_key=${apiKey}`);
        if (!dishesResponse.ok) throw new Error('Ошибка при получении данных блюд');
        const dishes = await dishesResponse.json();
    
        document.getElementById('viewOrderDate').textContent = formatOrderDate(order.created_at);
        document.getElementById('viewOrderFullName').textContent = order.full_name;
        document.getElementById('viewOrderAddress').textContent = order.delivery_address;
        document.getElementById('viewOrderDeliveryType').textContent = order.delivery_type === 'now' ? 'Как можно скорее' : 'Ко времени';
        document.getElementById('viewOrderDeliveryTime').textContent = order.delivery_type === 'now' ? 'В течение дня (с 7:00 до 23:00)' : order.delivery_time;
           document.getElementById('viewOrderPhone').textContent = order.phone;
        document.getElementById('viewOrderEmail').textContent = order.email;
        document.getElementById('viewOrderComment').textContent = order.comment;
        document.getElementById('viewOrderItems').textContent = formatOrderItems(order, dishes);
        document.getElementById('viewOrderCost').textContent = calculateOrderTotal(order, dishes) + '₽';
    
        showModal('viewOrderModal');
    } catch (error) {
        console.error('Ошибка при загрузке данных заказа:', error);
        showNotification('Ошибка при загрузке данных заказа: ' + error.message, 'error');
    }
}


// Функция для открытия модального окна редактирования заказа
// Функция для открытия модального окна редактирования заказа
async function openEditOrderForm(orderId) {
    try {
        const response = await fetch(`${apiUrl}/orders/${orderId}?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Ошибка при получении данных заказа');
        const order = await response.json();

        const dishesResponse = await fetch(`${apiUrl}/dishes?api_key=${apiKey}`);
        if (!dishesResponse.ok) throw new Error('Ошибка при получении данных блюд');
        const dishes = await dishesResponse.json();
        
        const form = document.querySelector('#editOrderModal form');
        form.dataset.orderId = orderId;

        form.querySelector('#editOrderFullName').value = order.full_name;
        form.querySelector('#editOrderAddress').value = order.delivery_address;
        form.querySelector('#editOrderPhone').value = order.phone;
        form.querySelector('#editOrderEmail').value = order.email;
        form.querySelector('#editOrderComment').value = order.comment;
        
        if (order.delivery_type === 'by_time'){
          form.querySelector('input[name="delivery_type"][value="by_time"]').checked = true
          form.querySelector('#editOrderDeliveryTime').value = order.delivery_time ? order.delivery_time.slice(0, 5) : '';
        } else {
             form.querySelector('input[name="delivery_type"][value="now"]').checked = true;
            form.querySelector('#editOrderDeliveryTime').disabled = true
             form.querySelector('#editOrderDeliveryTime').value = '';
          }

           // Создаем текстовые поля для отображения блюд
        const dishTypes = [
            { id: 'soup_id', label: 'Суп' },
            { id: 'main_course_id', label: 'Основное блюдо' },
            { id: 'salad_id', label: 'Салат' },
            { id: 'drink_id', label: 'Напиток' },
            { id: 'dessert_id', label: 'Десерт' }
        ];
        
        dishTypes.forEach(type => {
                const dish = dishes.find(d => d.id === order[type.id]);
                const dishName = dish ? dish.name : 'Не выбрано';
                  const existingLabel = form.querySelector(`label[for="${type.id}"]`);
             if (existingLabel) {
                  form.removeChild(existingLabel);
              }
                 const label = document.createElement('label');
                 label.setAttribute('for', type.id);
                 label.textContent = `${type.label}:`;

             const input = document.createElement('input');
             input.type = 'text';
             input.name = type.id;
             input.value = dishName;
              input.classList.add('form-control');
             input.readOnly = true;
             form.insertBefore(label, form.querySelector('button[type="submit"]'));
             form.insertBefore(input, form.querySelector('button[type="submit"]'));
        });
          
        showModal('editOrderModal');
    } catch (error) {
        console.error('Ошибка при загрузке данных заказа:', error);
        showNotification('Ошибка при загрузке данных заказа: ' + error.message, 'error');
    }
}


async function submitEditedOrder() {
   try {
        const form = document.querySelector('#editOrderModal form');
        const orderId = form.dataset.orderId;
       const formData = new FormData(form);

        const updatedOrder = {
            full_name: formData.get('full_name'),
            delivery_address: formData.get('delivery_address'),
            delivery_type: formData.get('delivery_type'),
            delivery_time: formData.get('delivery_type') === 'by_time' ? formData.get('delivery_time') : null,
            phone: formData.get('phone'),
            email: formData.get('email'),
            comment: formData.get('comment'),
            soup_id: formData.get('soup_id') || null,
            main_course_id: formData.get('main_course_id') || null,
            salad_id: formData.get('salad_id') || null,
            drink_id: formData.get('drink_id') || null,
            dessert_id: formData.get('dessert_id') || null
        };
       console.log('Данные для отправки:', updatedOrder);

        const response = await fetch(`${apiUrl}/orders/${orderId}?api_key=${apiKey}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrder)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка при сохранении заказа');
        }
          showNotification('Заказ успешно обновлен', 'success');
            closeModal('editOrderModal');
             fetchAndDisplayOrders();

             const updatedOrderResponse = await fetch(`${apiUrl}/orders/${orderId}?api_key=${apiKey}`);
             if (!updatedOrderResponse.ok) throw new Error('Ошибка при получении данных заказа');
               const updatedOrderData = await updatedOrderResponse.json();

            const dishesResponse = await fetch(`${apiUrl}/dishes?api_key=${apiKey}`);
        if (!dishesResponse.ok) throw new Error('Ошибка при получении данных блюд');
        const dishes = await dishesResponse.json();

            openOrderDetails(orderId);
       
    } catch (error) {
        console.error('Ошибка при сохранении заказа:', error);
        showNotification('Ошибка при сохранении заказа: ' + error.message, 'error');
    }
}

// Функция для открытия модального окна подтверждения удаления
async function initiateOrderDeletion(orderId) {
    currentOrderId = orderId;
    document.getElementById('deleteConfirmationText').textContent = `Вы уверены, что хотите удалить заказ №${orderId}?`;
    showModal('deleteOrderModal');
}


// Функция для выполнения удаления заказа
async function executeOrderDeletion() {
    try {
        const response = await fetch(`${apiUrl}/orders/${currentOrderId}?api_key=${apiKey}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка при удалении заказа');
        }
        showNotification('Заказ успешно удален', 'success');
        closeModal('deleteOrderModal');
        fetchAndDisplayOrders();
    } catch (error) {
        console.error('Ошибка при удалении заказа:', error);
        showNotification('Ошибка при удалении заказа: ' + error.message, 'error');
    }
}

// Функция для открытия модального окна
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    modal.classList.remove('hidden');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    console.log('Открываю модальное окно:', modalId);
}

// Функция для закрытия модального окна
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    modal.classList.remove('show');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    console.log('Закрываю модальное окно:', modalId);
}

// Функция для отображения уведомлений
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    console.log('Показываю уведомление:', message);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// Добавляем обработчики событий после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем заказы при загрузке страницы
    fetchAndDisplayOrders();

    // Обработчики закрытия модальных окон
    document.querySelectorAll('.modal .btn-close').forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // Обработчик для сохранения заказа
     document.querySelector('#editOrderModal form').addEventListener('submit', (e) => {
        e.preventDefault();
        submitEditedOrder();
    });

    // Обработчик для подтверждения удаления
    document.getElementById('confirmDeleteButton').addEventListener('click', executeOrderDeletion);

    // Обработчик для отмены удаления
    document.querySelectorAll('#deleteOrderModal .btn-secondary').forEach(button => {
        button.addEventListener('click', () => closeModal('deleteOrderModal'));
    });

    document.querySelectorAll('#editOrderModal .btn-secondary').forEach(button => {
        button.addEventListener('click', () => closeModal('editOrderModal'));
    });
      // Обработчик изменения типа доставки
    const deliveryTypeInputs = document.querySelectorAll('#editOrderModal input[name="delivery_type"]');
    const timeInput = document.querySelector('#editOrderModal input[name="delivery_time"]');

    deliveryTypeInputs.forEach(input => {
        input.addEventListener('change', () => {
            timeInput.disabled = input.value !== 'by_time';
            if (input.value === 'by_time') {
                timeInput.required = true;
                 if (!timeInput.value) {
                   timeInput.value = '12:00';
                 }

            } else {
                timeInput.required = false;
                timeInput.value = '';
            }
        });
    });

});


// Обновляем CSS для модальных окон
const styleSheet = document.createElement('style');
styleSheet.textContent = `
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}

.modal.show {
    display: flex !important;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: modalFadeIn 0.3s;
}

@keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 4px;
    z-index: 1001;
    animation: fadeIn 0.3s;
    display: none;
}

.notification.success {
    background-color: #28a745;
    color: white;
}

.notification.error {
    background-color: #dc3545;
    color: white;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
}

.hidden {
    display: none !important;
}

/* Обновляем стили для кнопок */
.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    border-radius: 0.25rem;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #545b62;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #c82333;
}

.form-control {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    box-sizing: border-box;
}
`;

document.head.appendChild(styleSheet);