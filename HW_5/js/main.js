'use strict';


const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const App = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [], //массив товаров из исходника необработанный
        itemsInCart: [],
        imgCatalog: 'https://picsum.photos/200/300?random',
        imgCart: 'https://picsum.photos/100/150?random',
        userSearch: '',
        show: false,
        abc: [],
        productId: "",
        productIdRmv: "",
        productPrice: 0,
        totalPrice: 0,
        totalQuantity: 2,

    },
    methods: {
        getJson(url){                             // 3) запустить getJson и получить url из mounted
            return fetch(url)
                .then(result => result.json())    // 4) получил исходник и перевел в JS, вернул в mounted
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    this.productId = +product.id_product;
                    let find = this.itemsInCart.find(product => product.id_product === this.productId);
                    if(find){
                        find.quantity++;
                        this.calcTotalPrice();
                    } 
                } else {
                    alert('Error');
                }
                // if (this.itemsInCart.length == 0) {
                //     ?????
                // }
            })
            console.log(this.totalPrice);
        },

        removeProduct(product) {
            this.productIdRmv = +product.id_product;
            let find = this.itemsInCart.find(product => product.id_product === this.productIdRmv);
                    if(find.quantity > 1){
                        find.quantity--;
                    } else {
                        this.itemsInCart.splice(this.itemsInCart.indexOf(find), 1);
                    }
            this.calcTotalPrice();        
        },

         toggleClass(event) {
            event.target.nextElementSibling.classList.toggle('vsbl');
            
            this.calcTotalPrice();
            
        },
        filter() {
            console.dir(this.userSearch);
            document.querySelector(".products").classList.add('invsbl');
            document.querySelector(".searchResult__wrap").classList.remove('invsbl');
            //let nnn = "["+this.userSearch+"]"+"+";
             
            const REGEXP = new RegExp(this.userSearch, 'i');
                //console.log(REGEXP.test("mmTT"));
            this.abc = this.products.filter(el => REGEXP.test(el.product_name));
            
            if (this.abc.length === 0) {
                document.querySelector(".searchResult__text").innerHTML ='Поиск не дал результатов';
            } else {
                document.querySelector(".searchResult__text").innerHTML ='Результат поиска';
            }        
        },
        calcTotalPrice() {
            this.totalPrice = 0;
            this.totalQuantity = 0;
            for (let elem of this.itemsInCart) {
                this.productPrice = +elem.price;
                console.log(this.productPrice);
                console.log(elem.quantity);
                this.totalPrice = this.totalPrice + this.productPrice*elem.quantity;
                this.totalQuantity = this.totalQuantity + elem.quantity;
            }
        }
    },
    mounted(){                                      // 1) запускается первым
       this.getJson(`${API + this.catalogUrl}`)     // 2) запустить getJson и передать url
           .then(data => {                          // 5) получил исходник в JS
               for(let el of data){                 // 6) для каждого объекта исходника 
                   this.products.push(el);          //  - записать каждый в массив products
               }
           }),
        /*this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            }),*/

        this.getJson(`${API + this.cartUrl}`)     // 2) запустить getJson и передать url
           .then(data => {                          // 5) получил исходник в JS
               for(let el of data.contents){        // 6) для каждого объекта исходника 
                   this.itemsInCart.push(el);          //  - записать каждый в cart
               }
           })
    }
})







/*
class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; // массив товаров из JSON документа, необработанный
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data]; // распаковка и заполнение массива goods
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`) //подгрузить
            .then(result => result.json())  // перевести исходник в объект JS promise
            .catch(error => {
                console.log(error);
            })
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
    constructor(product, img = `https://picsum.photos/200/300?random=${product.id_product}" alt="pic${product.id_product}`){
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        
        this.img = img;
    }
     render() {
         return `<div class="product__item" data-id="${this.id}">
                <img src="${this.img}">
                <h3  class="products__title">${this.title}</h3>
                <p  class="products__price">${this.price} руб</p>
                <button class="products__buyBtn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list.render();

class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.inCart = []; // [{...}, {...}] - ПЕРВЫЙ НЕОБРАБОТАННЫЙ МАССИВ ИЗ ИСХОДНИКА ПОСЛЕ fetch И ПЕРЕВОДА В ОБЪЕКТ JS
        this.inCartModified = []; // ВТОРОЙ ТОТ ЖЕ МАССИВ ТОВАРОВ, УЖЕ ОБРАБОТАННЫЙ В CartItem
        this.amountInCart = 0;
        this.quantityInCart = 0;
        this._getInCart()
            .then(data => { //data - объект js
            this.inCart = [...data.contents];
            this.amountInCart = data.amount;
            this.quantityInCart = data.countGoods;
            
            console.log(this.inCart); // [{...}, {...}] - ПЕРВЫЙ МАССИВ ИЗ ИСХОДНИКА ПОСЛЕ fetch И ПЕРЕВОДА В ОБЪЕКТ JS
            console.log(this.inCartModified); // ВТОРОЙ ТОТ ЖЕ МАССИВ ТОВАРОВ, УЖЕ ОБРАБОТАННЫЙ В CartItem
            this.renderCart()
            console.log(this.total()); //ВЫЗЫВАТЬ ОТСЮДА, Т.К., ПО-ВИДИМОМУ, РАБОТАЕТ АСИНХРОННОСТЬ
            });
    }
    _getInCart() {
        // записать в массив inCart все товары, добавленные в корзину:
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    renderCart() {
        const element = document.querySelector(this.container);
        for(let product of this.inCart){
            const cartItem = new CartItem(product);
            this.inCartModified.push(cartItem); //ДОБАВИТЬ КАЖДЫЙ ОБРАБОТАННЫЙ ТОВАР ВО ВТОРОЙ МАССИВ ТОВАРОВ
            element.insertAdjacentHTML('beforeend', cartItem.render())
        }
        element.insertAdjacentHTML('beforeend', `<span class="cartInfo">Итого:</span>
            <span class="cartInfo">${this.amountInCart} руб</span>
            <span class="cartInfo cartInfo__quantity">${this.quantityInCart}</span>
            <svg class="cartInfo__delete" fill="currentColor" height="15" width="15" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
            `)
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
        return this.inCartModified.reduce((accum, item) => accum += item.price, 0);
            
    }
}

class CartItem {
    constructor(product, img = `https://picsum.photos/70/100?random=${product.id_product}" alt="pic${product.id_product}`){
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
        this.img = img;
    }

    render() {
         return `
                <img data-id="${this.id}" src="${this.img}">
                <div data-id="${this.id}">
                <span class="cart__title">${this.title}</span>
                <p  class="cart__price">${this.price} руб</p>
                </div>
                <div data-id="${this.id}" class="itemInCart__quantity">${this.quantity}</div>
                <svg data-id="${this.id}" class="itemInCart__delete" fill="currentColor" height="15" width="15" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
            `
    }
}

let shopCart = new Cart();

//----------------------------- Слушатель кнопки-корзины
let btnCart = document.querySelector(".header__btnCart");
let cartPage = document.querySelector(".cart");

btnCart.addEventListener('click', function(event) {
    if (cartPage.style.visibility == "visible") {
        cartPage.style.visibility = "hidden";
    } else {
        cartPage.style.visibility = "visible";
        del();
        delAll();     
    }
});
//-----------------------------

let del = function() {
    document.querySelectorAll(".itemInCart__delete").forEach(function(elem) {
        elem.addEventListener('click', function(event) {
            let delAttr = this.getAttribute('data-id');
            
            let allDel = cartPage.querySelectorAll(`[data-id="${delAttr}"]`);
            console.log(allDel);
            allDel.forEach(function(el) {
                el.remove();
            });
        });
    });
}

let delAll = function() {
    if (cartPage.innerHTML != "") {
        document.querySelector(".cartInfo__delete").addEventListener('click', function(event) {
            cartPage.innerHTML = "";
        });
    }
}
*/