const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
const renderProduct = item => {
    return `<div class="product-item">
                <img src="https://picsum.photos/200/300?random=${item.id}" alt="pic${item.id}">
                <h3 class="products__title">${item.title}</h3>
                <p class="products__price">${item.price}</p>
                <button class="products__buyBtn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item)); 
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join("");
};

renderPage(products);