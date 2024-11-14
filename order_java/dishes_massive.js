const dishes_massive = [
    // Супы
    {
        keyword: 'fish_soup1',
        name: 'Рыбный суп',
        price: 400,
        category: 'soup',
        count: '300г',
        image: '../images/soups/fish1_soup.jpeg',
        kind: 'fish'
    },
    {
        keyword: 'fish_soup2',
        name: 'Суп с креветками',
        price: 500,
        category: 'soup',
        count: '350г',
        image: '../images/soups/fish2_soup.jpeg',
        kind: 'fish'
    },
    {
        keyword: 'meat_soup1',
        name: 'Куриный суп',
        price: 300,
        category: 'soup',
        count: '400г',
        image: '../images/soups/meat1_soup.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'meat_soup2',
        name: 'Рамен',
        price: 350,
        category: 'soup',
        count: '350г',
        image: '../images/soups/meat2_soup.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'veg_soup1',
        name: 'Гаспачо',
        price: 240,
        category: 'soup',
        count: '300г',
        image: '../images/soups/veg1_soup.jpeg',
        kind: 'veg'
    },
    {
        keyword: 'veg_soup2',
        name: 'Грибной суп',
        price: 240,
        category: 'soup',
        count: '320г',
        image: '../images/soups/veg2_soup.jpeg',
        kind: 'veg'
    },

    // Основные блюда
    {
        keyword: 'fish_main1',
        name: 'Рыбные оладья',
        price: 340,
        category: 'main_dish',
        count: '350г',
        image: '../images/main_dishes/fish1_main.jpg',
        kind: 'fish'
    },
    {
        keyword: 'fish_main2',
        name: 'Рыба гриль',
        price: 420,
        category: 'main_dish',
        count: '400г',
        image: '../images/main_dishes/fish2_main.jpeg',
        kind: 'fish'
    },
    {
        keyword: 'meat_main1',
        name: 'Плов',
        price: 500,
        category: 'main_dish',
        count: '500г',
        image: '../images/main_dishes/meat1_main.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'meat_main2',
        name: 'Стейк',
        price: 680,
        category: 'main_dish',
        count: '400г',
        image: '../images/main_dishes/meat2_main.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'veg_main1',
        name: 'Веганский плов',
        price: 320,
        category: 'main_dish',
        count: '250г',
        image: '../images/main_dishes/veg1_main.jpeg',
        kind: 'veg'
    },
    {
        keyword: 'veg_main2',
        name: 'Овощной боул',
        price: 370,
        category: 'main_dish',
        count: '300г',
        image: '../images/main_dishes/veg2_main.jpeg',
        kind: 'veg'
    },

    // Салаты и стартеры
    {
        keyword: 'fish_starter1',
        name: 'Салат с креветками',
        price: 350,
        category: 'salad_starter',
        count: '250г',
        image: '../images/salad_starter/fish1_salad.jpeg',
        kind: 'fish'
    },
    {
        keyword: 'meat_salad1',
        name: 'Цезарь',
        price: 260,
        category: 'salad_starter',
        count: '200г',
        image: '../images/salad_starter/meat1_salad.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'veg_salad1',
        name: 'Канапе с томатами',
        price: 180,
        category: 'salad_starter',
        count: '200г',
        image: '../images/salad_starter/veg1_salad.jpeg',
        kind: 'veg'
    },
    {
        keyword: 'veg_salad2',
        name: 'Кукурузный салат',
        price: 230,
        category: 'salad_starter',
        count: '250г',
        image: '../images/salad_starter/veg2_salad.jpg',
        kind: 'veg'
    },
    {
        keyword: 'veg_salad3',
        name: 'Греческий салат',
        price: 300,
        category: 'salad_starter',
        count: '230г',
        image: '../images/salad_starter/veg3_salad.jpeg',
        kind: 'veg'
    },
    {
        keyword: 'veg_salad4',
        name: 'Веганский оливье',
        price: 250,
        category: 'salad_starter',
        count: '300г',
        image: '../images/salad_starter/veg4_salad.jpeg',
        kind: 'veg'
    },

    // Напитки
    {
        keyword: 'cold_drink1',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        count: '300мл',
        image: '../images/drinks/cold1_drink.jpeg',
        kind: 'cold'
    },
    {
        keyword: 'cold_drink2',
        name: 'Мохито',
        price: 190,
        category: 'drink',
        count: '350мл',
        image: '../images/drinks/cold2_drink.jpeg',
        kind: 'cold'
    },
    {
        keyword: 'cold_drink3',
        name: 'Кола',
        price: 150,
        category: 'drink',
        count: '250мл',
        image: '../images/drinks/cold3_drink.jpeg',
        kind: 'cold'
    },
    {
        keyword: 'heat_drink1',
        name: 'Капучино',
        price: 110,
        category: 'drink',
        count: '200мл',
        image: '../images/drinks/heat1_drink.jpeg',
        kind: 'hot'
    },
    {
        keyword: 'heat_drink2',
        name: 'Чай чёрный',
        price: 100,
        category: 'drink',
        count: '250мл',
        image: '../images/drinks/heat2_drink.jpeg',
        kind: 'hot'
    },
    {
        keyword: 'heat_drink3',
        name: 'Чай зелёный',
        price: 110,
        category: 'drink',
        count: '300мл',
        image: '../images/drinks/heat3_drink.jpeg',
        kind: 'hot'
    },

    // Десерты
    {
        keyword: 'small_desert1',
        name: 'Эклеры',
        price: 90,
        category: 'desert',
        count: '100г',
        image: '../images/desert/small1_desert.jpg',
        kind: 'small'
    },
    {
        keyword: 'small_desert2',
        name: 'Мини-пончики"',
        price: 120,
        category: 'desert',
        count: '120г',
        image: '../images/desert/small2_desert.jpeg',
        kind: 'small'
    },
    {
        keyword: 'small_desert3',
        name: 'Дубайский шоколад"',
        price: 170,
        category: 'desert',
        count: '50г',
        image: '../images/desert/small3_desert.jpg',
        kind: 'small'
    },
    {
        keyword: 'medium_desert1',
        name: 'Пончики',
        price: 180,
        category: 'desert',
        count: '200г',
        image: '../images/desert/medium1_desert.jpeg',
        kind: 'medium'
    },
    {
        keyword: 'medium_desert2',
        name: 'Вафли',
        price: 270,
        category: 'desert',
        count: '220г',
        image: '../images/desert/medium2_desert.jpg',
        kind: 'medium'
    },
    {
        keyword: 'large_desert1',
        name: 'Торт шоколадный',
        price: 340,
        category: 'desert',
        count: '350г',
        image: '../images/desert/large_desert.jpeg',
        kind: 'large'
    }
];
