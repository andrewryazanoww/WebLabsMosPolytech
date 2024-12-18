document.addEventListener('DOMContentLoaded', async () => {
    const orderedDishesContainer = document.getElementById('orderedDishes');
    const orderForm = document.getElementById('order-form');
    const resetButton = document.getElementById('resetButton');
    const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

    let dishes; // Объявляем переменную dishes в области видимости всего обработчика

    const selectedDishesIds = JSON.parse(localStorage.getItem('selectedDishes')) || [];

    if (selectedDishesIds.length === 0) {
        const emptyOrderMessage = document.createElement('div');
        emptyOrderMessage.className = 'empty-order-message';
        emptyOrderMessage.innerHTML = '<p>Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на <a href ="../lunchmake/makelunch.html" class="empty-order-message-href">страницу "Собрать ланч"</a>.</p>';
        orderedDishesContainer.appendChild(emptyOrderMessage);
    } else {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            dishes = await response.json();

            if (orderedDishesContainer && orderForm && dishes) {
                selectedDishesIds.forEach(dishId => {
                    const dish = dishes.find(d => d.id === parseInt(dishId));

                    if (dish) {
                        const dishElement = createDishElement(dish);
                        orderedDishesContainer.appendChild(dishElement);

                        dishElement.querySelector('.remove-button').addEventListener('click', () => {
                            removeDishFromOrder(dish.id, dishElement, orderForm, dishes);
                            updateOrderDisplay(dishes); // Обновление отображения заказа после удаления блюда
                        });
                    }
                });

                updateOrderDisplay(dishes);

                const deliveryTypeRadios = document.querySelectorAll('input[name="delivery_type"]');
                const deliveryTimeContainer = document.getElementById('delivery-time-container');
                const deliveryTimeInput = document.getElementById('delivery_time');

                if (deliveryTypeRadios && deliveryTimeContainer && deliveryTimeInput) {
                    deliveryTypeRadios.forEach(radio => {
                        radio.addEventListener('change', () => {
                            if (radio.value === 'by_time') {
                                deliveryTimeContainer.style.display = 'block';
                                deliveryTimeInput.required = true;
                            } else {
                                deliveryTimeContainer.style.display = 'none';
                                deliveryTimeInput.required = false;
                            }
                        });
                    });
                } else {
                    console.error("Один из элементов 'deliveryTypeRadios', 'deliveryTimeContainer' или 'deliveryTimeInput' не найден");
                }


                orderForm.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const formData = new FormData(orderForm);

                    try {
                        const dishesResponse = await fetch(apiUrl);
                        if (!dishesResponse.ok) {
                            throw new Error(`Ошибка при получении данных о блюдах: ${dishesResponse.status}`);
                        }
                        const dishesData = await dishesResponse.json();

                        selectedDishesIds.forEach(dishId => {
                            const dish = dishesData.find(d => d.id === parseInt(dishId));
                            if (dish) {
                                formData.append(`${dish.category}_id`, dish.id);
                            }
                        });

                        const subscribe = document.getElementById('subscribe').checked ? 1 : 0;
                        formData.append('subscribe', subscribe);

                        const deliveryType = document.querySelector('input[name="delivery_type"]:checked')?.value;
                        formData.append('delivery_type', deliveryType || 'no_delivery');
                         formData.append('delivery_time', '00:00'); // Добавляем delivery_time всегда

                         if (deliveryType === 'by_time') {
                           const deliveryTime = document.getElementById('delivery_time').value;
                             formData.set('delivery_time', deliveryTime);
                            }
                           let deliveryTime = '00:00';
                           if (document.querySelector('input[name="delivery_type"]:checked')?.value === 'by_time') {
                             const deliveryTimeInput = document.getElementById('delivery_time');
                              deliveryTime = deliveryTimeInput.value || '00:00';
                             }


                            formData.set('delivery_time', deliveryTime);


                        const apiKey = '3ba95a0d-b29f-46d7-a3d8-4fe2e0b49866';
                        const apiUrlWithKey = `${orderForm.action}?api_key=${apiKey}`;

                        try {
                            const response = await fetch(apiUrlWithKey, {
                                method: 'POST',
                                body: formData
                            });

                            if (!response.ok) {
                                const errorData = await response.json();
                                const errorMessage = errorData?.error || "Ошибка при отправке запроса";
                                showErrorModal(errorMessage);
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }

                            const result = await response.json();
                            console.log("Заказ успешно отправлен:", result);

                            localStorage.removeItem('selectedDishes');
                            alert("Ваш заказ успешно оформлен!");
                            showSuccessModal();
                            window.location.href = '../lunchmake/makelunch.html';

                        } catch (error) {
                            console.error("Ошибка при отправке заказа:", error);
                            alert("Произошла ошибка при отправке заказа. Попробуйте снова.");
                        }

                    } catch (error) {
                        console.error("Ошибка при получении данных о блюдах:", error);
                    }
                });
                if (resetButton) {
                   resetButton.addEventListener('click', () => {
                        clearOrder(dishes); // Передаём dishes в clearOrder
                        orderedDishesContainer.innerHTML = '';
                        const emptyOrderMessage = document.createElement('div');
                        emptyOrderMessage.className = 'empty-order-message';
                        emptyOrderMessage.innerHTML = '<p>Ничего не выбрано. Чтобы добавить блюда в заказ, перейдите на <a href ="../lunchmake/makelunch.html" class="empty-order-message-href">страницу "Собрать ланч"</a>.</p>';
                        orderedDishesContainer.appendChild(emptyOrderMessage);
                        orderForm.reset();
                        updateOrderDisplay(dishes); // Передаём dishes в updateOrderDisplay
                    });
                } else {
                    console.error("Элемент с id 'reset-button' не найден");
                }

            } else {
                console.error("Один из элементов 'orderedDishesContainer', 'orderForm' или dishes не найден");
            }
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            showErrorModal("Ошибка при загрузке данных.");
        }
    }
});

function createDishElement(dish) {
    const dishElement = document.createElement('div');
    dishElement.classList.add('ordered-dish');
    dishElement.innerHTML = `
    <img src="${dish.image}" alt="${dish.name}">
    <p>Цена: ${dish.price}₽</p>
    <p>${dish.name}</p>
    <p>Вес: ${dish.count}</p>
    <button class="remove-button" data-dish-id="${dish.id}">Удалить</button>
  `;
    return dishElement;
}

function removeDishFromOrder(dishId, dishElement, orderForm, dishes) {
    let selectedDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];
    selectedDishes = selectedDishes.filter(id => id !== dishId.toString());
    localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));

    dishElement.remove();

}

function showErrorModal(message) {
    const errorModal = document.createElement('div');
    errorModal.className = 'error-modal';
    errorModal.style.position = 'fixed';
    errorModal.style.top = '50%';
    errorModal.style.left = '50%';
    errorModal.style.transform = 'translate(-50%, -50%)';
    errorModal.style.zIndex = '1000';
    errorModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    errorModal.innerHTML = `
        <div class="error-modal-content" style="padding: 20px; background-color: #fff; border-radius: 8px;">
            <span class="close-btn" onclick="this.parentElement.parentElement.remove();" style="cursor: pointer; font-size: 1.5em;">×</span>
            <h2>Ошибка</h2>
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(errorModal);
    document.body.style.overflow = 'hidden';
}

function updateOrderDisplay(dishes) {
    const orderSection = document.getElementById('order-details');
     if(!orderSection) {
        console.error("Элемент с id 'order-details' не найден");
        return;
    }
    orderSection.innerHTML = '';

    const orderTitle = document.createElement('h3');
    orderTitle.textContent = 'Ваш заказ';
    orderSection.appendChild(orderTitle);

    const selectedDishesIds = JSON.parse(localStorage.getItem('selectedDishes')) || [];

    const selectedDishesByCategory = {
        soup: null,
        "main-course": null,
        salad: null,
        drink: null,
        dessert: null
    };

    if (selectedDishesIds.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'bold-text';
        emptyMessage.textContent = 'Ничего не выбрано';
        orderSection.appendChild(emptyMessage);
    } else {
          if (dishes) {
           selectedDishesIds.forEach(dishId => {
            const dish = dishes.find(d => d.id === parseInt(dishId));
                if (dish) {
                    selectedDishesByCategory[dish.category] = dish;
                    }
           });
        } else {
             console.error("Данные о блюдах не были получены для отображения заказа");
            return;
        }



        const categories = ["soup", "main-course", "salad", "drink", "dessert"];
        const categoryNames = ["Суп", "Главное блюдо", "Салат или стартер", "Напиток", "Десерт"];

        categories.forEach((category, index) => {
            const dishInfo = document.createElement('p');
            if (selectedDishesByCategory[category]) {
                dishInfo.innerHTML = `<h4>${categoryNames[index]}:</h4> ${selectedDishesByCategory[category].name} - ${selectedDishesByCategory[category].price}₽`;
            } else {
                dishInfo.innerHTML = `<h4>${categoryNames[index]}:</h4> Ничего не выбрано`;
            }

            orderSection.appendChild(dishInfo);
        });

        let totalPrice = 0;
        for (const category in selectedDishesByCategory) {
            if (selectedDishesByCategory[category]) {
                totalPrice += selectedDishesByCategory[category].price;
            }
        }

        if (totalPrice > 0) {
            const totalInfo = document.createElement('p');
            totalInfo.innerHTML = `<h4>Стоимость заказа:</h4> ${totalPrice}₽`;
            orderSection.appendChild(totalInfo);
        }
    }

    const commentLabel = document.createElement('label');
    commentLabel.htmlFor = 'comment';
    commentLabel.textContent = 'Комментарий к заказу:';
    commentLabel.className = 'comment_from_java';
    orderSection.appendChild(commentLabel);

    const commentArea = document.createElement('textarea');
    commentArea.id = 'comment';
    commentArea.name = 'comment';
    commentArea.rows = 4;
    orderSection.appendChild(commentArea);
}

function showSuccessModal() {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.style.position = 'fixed';
    successModal.style.top = '50%';
    successModal.style.left = '50%';
    successModal.style.transform = 'translate(-50%, -50%)';
    successModal.style.zIndex = '1000';
    successModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    successModal.innerHTML = `
        <div class="success-modal-content" style="padding: 20px; background-color: #fff; border-radius: 8px;">
            <span class="close-btn" onclick="this.parentElement.parentElement.remove();" style="cursor: pointer; font-size: 1.5em;">×</span>
            <h2>Успех</h2>
            <p>Ваш заказ успешно оформлен!</p>
            <p>Теперь вы можете перейти на <a href="../lunchmake/makelunch.html">страницу "Собрать ланч"</a>.</p>
        </div>
    `;

    document.body.appendChild(successModal);
    document.body.style.overflow = 'hidden';
}