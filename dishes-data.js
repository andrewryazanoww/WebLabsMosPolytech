const dishes = [
    // Супы
    {
        keyword: 'gaspacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        count: '350г',
        image: 'images/soup/1.jpeg',
        kind: 'veg'
    },
    {
        keyword: 'mushroom_soup',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        count: '350г',
        image: 'images/soup/2.jpeg' ,
        kind: 'veg'
    },
    {
        keyword: 'norwegian_soup',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: '330г',
        image: 'images/soup/3.jpeg',
        kind: 'fish'
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 375,
        category: 'soup',
        count: '425г',
        image: 'images/soup/4.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'tom_yam',
        name: 'Том ям с креветками',
        price: 650,
        category: 'soup',
        count: '500г',
        image: 'images/soup/5.jpeg',
        kind: 'fish'
    },
    {
        keyword: 'chicken_soup',
        name: 'Куриный суп',
        price: 330,
        category: 'soup',
        count: '350г',
        image: 'images/soup/6.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'steak',
        name: 'Стейк',
        price: 500,
        category: 'main',
        count: '300г',
        image: 'images/main/1.jpeg', 
        kind: 'meat'
    },
    {
        keyword: 'fish_fillet',
        name: 'Рыбное филе',
        price: 450,
        category: 'main',
        count: '250г',
        image: 'images/main/2.jpeg',
        kind: 'fish'
    },
    {
        keyword: 'carbonara',
        name: 'Паста Карбонара',
        price: 350,
        category: 'main',
        count: '300г',
        image: 'images/main/3.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'pilaf',
        name: 'Плов',
        price: 400,
        category: 'main',
        count: '350г',
        image: 'images/main/4.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'vegetable_stew',
        name: 'Овощное рагу',
        price: 300,
        category: 'main',
        count: '250г',
        image: 'images/main/5.jpeg',
        kind: 'veg'
    },
    {
        keyword: 'grilled_chicken',
        name: 'Курица на гриле',
        price: 380,
        category: 'main',
        count: '320г',
        image: 'images/main/6.jpeg',
        kind: 'meat'
    },

    // Салаты и стартеры
    {
        keyword: 'caesar',
        name: 'Салат Цезарь',
        price: 250,
        category: 'starter',
        count: '200г',
        image: 'images/starters/1.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'greek_salad',
        name: 'Греческий салат',
        price: 200,
        category: 'starter',
        count: '180г',
        image: 'images/starters/2.jpeg',
        kind: 'veg'
    },
    {
        keyword: 'shrimp_salad',
        name: 'Салат с креветками',
        price: 300,
        category: 'starter',
        count: '220г',
        image: 'images/starters/3.jpeg',
        kind: 'fish'
    },
    {
        keyword: 'olivier',
        name: 'Салат Оливье',
        price: 180,
        category: 'starter',
        count: '200г',
        image: 'images/starters/4.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'beetroot_salad',
        name: 'Свекольный салат',
        price: 150,
        category: 'starter',
        count: '150г',
        image: 'images/starters/5.jpeg',
        kind: 'veg'
    },
    {
        keyword: 'bruschetta',
        name: 'Брускетта с томатами',
        price: 170,
        category: 'starter',
        count: '100г',
        image: 'images/starters/6.jpeg',
        kind: 'veg'
    },
    // Напитки
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'drink',
        count: '350мл',
        image: 'images/drinks/1.jpeg',
        kind: 'hot'
    },
    {
        keyword: 'orange_juice',
        name: 'Апельсиновый сок',
        price: 130,
        category: 'drink',
        count: '400мл',
        image: 'images/drinks/2.jpeg',
        kind: 'cold'
    },
    {
        keyword: 'mojito',
        name: 'Мохито безалкогольный',
        price: 150,
        category: 'drink',
        count: '350мл',
        image: 'images/drinks/3.jpeg',
        kind: 'cold'
    },
    {
        keyword: 'cola',
        name: 'Кола',
        price: 90,
        category: 'drink',
        count: '330мл',
        image: 'images/drinks/4.jpeg',
        kind: 'cold'
    },
    {
        keyword: 'green_tea',
        name: 'Зеленый чай',
        price: 100,
        category: 'drink',
        count: '300мл',
        image: 'images/drinks/5.jpeg',
        kind: 'hot'
    },
    {
        keyword: 'black_tea',
        name: 'Черный чай',
        price: 90,
        category: 'drink',
        count: '300мл',
        image: 'images/drinks/6.jpeg',
        kind: 'hot'
    },
    // Десерты
    {
        keyword: 'chocolate_cake',
        name: 'Шоколадный торт',
        price: 270,
        category: 'dessert',
        count: '140г',
        image: 'images/desserts/1.jpeg',
        kind: 'small'
    },
    {
        keyword: 'donuts_medium',
        name: 'Пончики маленькие',
        price: 410,
        category: 'dessert',
        count: '350г',
        image: 'images/desserts/2.jpeg',
        kind: 'medium'
    },
    {
        keyword: 'donuts_large',
        name: 'Пончики большие',
        price: 650,
        category: 'dessert',
        count: '700г',
        image: 'images/desserts/3.jpeg',
        kind: 'large'
    }
];