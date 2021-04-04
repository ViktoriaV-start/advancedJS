class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    } 


    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
            {id: 5, title: 'Notebook', price: 2000},
            {id: 6, title: 'Mouse', price: 20},
            {id: 7, title: 'Keyboard', price: 200},
            {id: 8, title: 'Gamepad', price: 50},
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }   
}

class ProductItem {
    constructor(product, img = `https://picsum.photos/200/300?random=${product.id}" alt="pic${product.id}`){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }
     render() {
         return `<div class="product__item" data-id="${this.id}">
                <img src="${this.img}">
                <h3  class="products__title">${this.title}</h3>
                <p  class="products__price">${this.price}</p>
                <button class="products__buyBtn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list.render();

class Cart {
    constructor(product) {
        this.inCart = [];
        this.getInCart();
        
    }
    getInCart() {
        // записать в массив inCart все товары, добавленные в корзину:
        this.inCart = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},   
        ];
    }

    // удалить товар из корзины, внести изменения в массив this.inCart 
    removeItem() {

    }

    // добавить единицу товара, внести изменения в массив this.inCart 
    addOne() {

    }

    // уменьшить кол-во товара на один, внести изменения в массив this.inCart 
    lessOne() {

    }

    // Подсчитать стоимость всех товаров в корзине
    total() {
        let totalSum = 0;
        for (let product of this.inCart) {
            totalSum += product.price;  
    }
    return totalSum;
    }
}

let shopCart = new Cart(); // в скобках передаем массив товаров в корзине
console.log(shopCart.total());
    



