'use strict';




//КЛАСС-ОСНОВА ДЛЯ СПИСКА ТОВАРОВ
class Catalog {
    static API = 'https://raw.githubusercontent.com/ViktoriaV-start/advancedJS/master/brand_data';
    allProducts = []; //это будет массив из товаров, уже обработанный, массив объектов соответствующего класса

    constructor(selector, url, place, list = list2) {
        this.container = selector;
        this.url = url;
        this.place = place;
        this.list = list;
        this._init(); //автовызов
    }
//Лучше сделать его как внешний метод, потому что мы можем передавать какие-то отдельные файлы

    _getProducts(url) { //если ()-пустые - то берется url из наших данных, если писать так(url) - значит можно будет передавать сюда еще и сторониие данные
        return fetch(url ? url : `${Catalog.API + this.url}`) //подгрузить
            .then(result => result.json())  // перевести исходник в объект JS promise
            .catch(error => { //можно не вставлять, так как будет еще внешний обработчик
                console.log(error);
            })
    }
     
    handleData(data) {
        for (let item of data) {
            this.allProducts.push(new this.list[this.constructor.name](item));//у конструктора есть есть свойство name, поэтому его можно вытащить(это ключ в list2) и по нему вытащить название для item - это значение в list=list2
        }
        this._render();
    }

    _render() {
        const block = document.querySelector(this.container);
        
        for (let product of this.allProducts) {
            if (product.rendered) {
                continue;
            }
            block.insertAdjacentHTML(this.place, product.markUp());
            
        }
    } 
    

    getItem(id) {
        //return this.allProducts.indexOf(this.allProducts.find(el => el.id_product === id));
        return this.allProducts.find(el => el.id_product === id);
    }

    _init() {
        return false
    }
}

//КЛАСС-ОСНОВА ДЛЯ ОДНОГО ТОВАРА
class Item {
    rendered = false;

    constructor(product, img = `img1/card${product.id_product}.jpg`) {
        this.id_product = product.id_product;
        this.product_name = product.product_name; 
        this.price = product.price;
        this.color = product.color;
        this.size = product.size;
        this.img = img;
    }
     markUp() {
        this.rendered = true;
        return `
            <figure class="promo__card" data-id="${this.id_product}"> 
                <img src="${this.img}" alt="Mango_${this.id_product}">
                <figcaption class="promo__mango">
                    <h3 class="promo__mangoName">${this.product_name}</h3> 
                    <span class="promo__mangoPrice">$${this.price}.00</span>
                </figcaption>
                <div class="promo__cardHover"></div>
                <div class="promo__cardHoverCart add" data-id="${this.id_product}"> 
                    <svg class="whiteCart add" data-id="${this.id_product}" fill="rgb(255, 255, 255)" width="32" height="29" viewBox="0 0 32 29">
                        <path class="add" d="M31.899,7.565 L26.493,19.977 C26.296,20.410 25.882,20.686 25.409,20.686 L10.554,20.686 C10.021,20.686 9.548,20.331 9.410,19.819 L4.577,2.364 L1.184,2.364 C0.533,2.364 -0.000,1.832 -0.000,1.182 C-0.000,0.532 0.533,-0.001 1.184,-0.001 L5.464,-0.001 C5.997,-0.001 6.471,0.354 6.609,0.866 L11.442,18.322 L24.620,18.322 L28.999,8.274 L14.401,8.274 C13.750,8.274 13.217,7.742 13.217,7.092 C13.217,6.442 13.750,5.910 14.401,5.910 L30.814,5.910 C31.208,5.910 31.583,6.107 31.800,6.442 C32.017,6.777 32.057,7.190 31.899,7.565 ZM9.429,23.641 C10.909,23.641 12.112,24.843 12.112,26.320 C12.112,27.798 10.909,28.999 9.429,28.999 C7.950,28.999 6.747,27.798 6.747,26.320 C6.747,24.843 7.950,23.641 9.429,23.641 ZM26.020,23.641 C27.500,23.542 28.782,24.665 28.881,26.123 C28.920,26.852 28.703,27.542 28.230,28.073 C27.756,28.625 27.105,28.940 26.395,28.999 C26.336,28.999 26.257,28.999 26.198,28.999 C24.797,28.999 23.633,27.896 23.535,26.498 C23.436,25.040 24.541,23.739 26.020,23.641 Z" /> 
                    </svg> 
                    <span class="promo__addToCart add" data-id="${this.id_product}">Add to cart</span> 
                </div>
            </figure>`
    }
}

//КАТАЛОГ
class CatalogHome extends Catalog {
    cart = null;

    constructor(cart, selector, url, place){ //c
    super(selector, url, place);
    this.cart = cart;
    this._getProducts()
            .then(data => this.handleData(data));
    }
    

    selectPriceSize() {
        console.log("Вызвана ф-кция")
    }

    
     
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            
            if (e.target.classList.contains('add')) {
                const id = +e.target.dataset['id'];
                this.cart.addProduct(this.getItem(id)); //вызвать метод из cart - добавление товара в корзину
                
            }          
        });

    } 
}

//ТОВАР В КАТАЛОГЕ
class CatalogItem extends Item{}

//КОРЗИНА
class Cart extends Catalog {
    constructor(selector, url, place){
        super(selector, url, place);
        this._getProducts()
            .then(data => this.handleData(data.contents));
    }
    
    addProduct(product) {
        // this.getJson(`${List.API}/addToBasket.json`) //ИМИТАЦИЯ ПРОВЕРКИ УСПЕШНОЙ СВЯЗИ 
        //     .then(data => {
        //         if (data.result) {
        //             let find = this.products.find(el => el.id_product === product.id_product);
        //             if (find) {
        //                 find.changeQuantity(1);
        //                 return;
        //
        let find = this.allProducts.find(el => el.id_product === product.id_product);
            if (find) {
                find.changeQuantity(1);
                
                    return;             
            }

            let prod = Object.assign({ quantity: 1 }, product);
            this.handleData([prod]);
            
            document.querySelector('.total').textContent = `$${this.calcTotal()}`;
    }

    calcTotal() {
        return this.allProducts.reduce((accum, item) => accum += item.price*item.quantity, 0);
    }
    updateTotal() {
        document.querySelector('.total').textContent = `$${this.calcTotal()}`;
        document.querySelector('.subTotal').textContent = `$${this.calcTotal()}`;
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            
//УДАЛЕНИЕ ПОЛНОСТЬЮ ТОВАРА КНОПКОЙ
            if (e.target.classList.contains('shoppingCart__dlt')) {
                const id = +e.target.dataset['id'];
                this.removeMarkUp(id);
                let item = this.getItem(id);
                this.allProducts.splice(this.allProducts.indexOf(item), 1);
                this.updateTotal();
            }

//ИЗМЕНЕНИЕ КОЛИЧЕСТВА ТОВАРА ЧЕРЕЗ КНОПКУ В КОРЗИНЕ

            if (e.target.classList.contains('quantityMinus')) {
                const id = +e.target.dataset['id'];
                let item = this.getItem(id);
                this.deleteItem(item);
                this.updateTotal();
            }

            if (e.target.classList.contains('quantityPlus')) {
                const id = +e.target.dataset['id'];
                let item = this.getItem(id);
                item.changeQuantity(1);
                this.updateTotal();
            }
        });

//УДАЛЕНИЕ СРАЗУ ВСЕХ ТОВАРОВ ИЗ КОРЗИНЫ КНОПКОЙ CLEAR
        document.querySelector('.cartClear').addEventListener('click', (e) => {
            e.preventDefault();
            this.allProducts.forEach(el => {
                document.querySelector(`.shoppingCart__line[data-id="${el.id_product}"]`).remove();
            })
            this.allProducts = [];
            this.updateTotal();
            console.log(this.allProducts);   
        });

//ПОКАЗ или СКРЫТИЕ КОРЗИНЫ
            document.querySelector('.headerFirst__cart').addEventListener('click', () => {
                const cartTable = document.querySelector(this.container);
                cartTable.parentNode.classList.toggle('cartInvsbl');
                if (!cartTable.parentNode.classList.contains('cartInvsbl')) {
                    this.closeCart(cartTable);  
                }        
            });
        }

    closeCart(cartTable) {
            document.querySelector('.cartContinue').addEventListener('click', () => {
                cartTable.parentNode.classList.add('cartInvsbl'); 
            });

            document.querySelector('body').addEventListener('click', (e) => {
                const coordinates = cartTable.parentNode.getBoundingClientRect();
                if (e.clientX < coordinates.left || e.clientX > coordinates.right || e.clientY > coordinates.bottom + 80) {
                    cartTable.parentNode.classList.add('cartInvsbl');
                }
            });
    }

        deleteItem(item) {
            if (item.quantity > 1) {
                item.changeQuantity(-1);
                return;
            }
            this.allProducts.splice(this.allProducts.indexOf(item), 1);
            this.removeMarkUp(item.id_product);
        }

        removeMarkUp(id) {  
//удалить разметку товара со страницы и сам товар из общего списка товаров
            document.querySelector(`.shoppingCart__line[data-id="${id}"]`).remove();
        }             
}

//ТОВАР В КОРЗИНЕ
class CartItem extends Item {
    constructor(el, img = `img2/card${el.id_product}.jpg`) { //фото передаем другое 
        super(el, img); //передать наверх в Item
        this.quantity = el.quantity;
        this.color = el.color;
        this.size = el.size;
    }
    changeQuantity(count) {
        this.quantity += count;
        this._updateItem();
    } 
    _updateItem() {
        const block = document.querySelector(`.shoppingCart__line[data-id="${this.id_product}"]`);
        const inputQuantity = block.querySelector(`.shoppingCart__quantity`);
        inputQuantity.textContent = `${this.quantity}`;
        block.querySelector(`.shoppingCart__price`).textContent = `$${this.quantity*this.price}`;
    }
   
    markUp() {
        this.rendered = true;
        return `
        <div class = "shoppingCart__line" data-id = "${this.id_product}">
            <div class="shoppingCart_productDetails">
                <img class="shoppingCart__productPhoto" src="${this.img}" alt="Added Product">
                <div class="shoppingCart__detailsWrapper"><span class="shoppingCart__productName">${this.product_name}</span>
                <span class="shoppingCart__productInfo">Color:<span class="shoppingCart__productInfo_spec">${this.color}</span></span>
                <span class="shoppingCart__productInfo">Size:<span class="shoppingCart__productInfo_spec">${this.size}</span></span></div>
            </div>

            <span class="shoppingCart__data">$${this.price}</span>

            <div class="shoppingCart__dataInput">
                <div class="shoppingCart__quantityWrap">
                    <button data-id = "${this.id_product}" class="shoppingCart__quantityBtn quantityMinus" type="submit">
                        <i data-id = "${this.id_product}" class="fas fa-caret-left arrow fa-lg quantityMinus"></i>
                    </button>

                    <span data-id = "${this.id_product}" class="shoppingCart__quantity">${this.quantity}</span>
                
                    <button data-id = "${this.id_product}" class="shoppingCart__quantityBtn quantityPlus" type="submit">
                        <i data-id = "${this.id_product}" class="fas fa-caret-right arrow fa-lg quantityPlus"></i>
                    </button>
                </div>

            </div>

            <span class="shoppingCart__data">FREE</span>
            <span class="shoppingCart__data shoppingCart__price">$${this.quantity*this.price}</span>
            <button class="shoppingCart__deleteWrapper shoppingCart__dlt" data-id = "${this.id_product}">
                <svg class="shoppingCart__delete shoppingCart__dlt" data-id = "${this.id_product}" fill="currentColor" height="15" width="15" viewBox="0 0 512 512"><path class="shoppingCart__dlt" data-id = "${this.id_product}" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
            </button>
        </div>
        `
    }
}

class FilteredHome extends CatalogHome {
    constructor(cart, selector, url, place, selector1){
        super(cart, selector, url, place);
        this.mainSection = document.querySelector(selector1);
    }

    handleData(data) {
        for (let item of data) {
            this.allProducts.push(new this.list[this.constructor.name](item));//у конструктора есть есть свойство name, поэтому его можно вытащить(это ключ в list2) и по нему вытащить название для item - это значение в list=list2
        }
    }

    filter(value) {
        
        this.mainSection.classList.add('displayNone');
        
        const block = document.querySelector(this.container);
        block.parentNode.classList.remove('displayNone');
        block.innerHTML = "";

        const regexp = RegExp(value, 'i');
        this.abc = this.allProducts.filter(el => regexp.test(el.product_name));
        
        if (this.abc.length === 0 || value === '') {
            block.innerText = 'No search result';
        } else {
            this.abc.forEach(el => {           
            block.insertAdjacentHTML(this.place, el.markUp());
            })
        }
        
        document.querySelector('.filterClose').addEventListener('click', () => {
            block.parentNode.classList.add('displayNone');
            this.mainSection.classList.remove('displayNone');
        })
    }

    _init() {
        
        document.querySelector(this.container).addEventListener('click', e => {
            
            if (e.target.classList.contains('add')) {
                const id = +e.target.dataset['id'];
                this.cart.addProduct(this.getItem(id)); //вызвать метод из cart - добавление товара в корзину
                
            }          
        });

        document.querySelector('.headerFirst__searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.filter(document.querySelector('.headerFirst__search').value);
        })
    } 
}
class FilteredItem extends Item{}

class CatalogMen extends CatalogHome{
    constructor(cart, selector, url, place){ 
        super(cart, selector, url, place);
        this.priceFrom = 0;
        this.priceTo = 400;
        this.selected = [];
        this.sizeRanged = [];
    }

    checkPrice() {
        this.selected = this.allProducts.filter(el => el.price <= this.priceTo && el.price >= this.priceFrom);
        this.checkSize();
        this.showSelected();
    }
    checkSize() {

       this.sizeRanged = [];

       const inputSize = document.querySelectorAll('input[type="checkbox"]:checked');
       for (let el of inputSize) {
           this.sizeRanged.push(el.value);
       }
       console.log(this.sizeRanged)
       console.log(this.selected);

       if (this.sizeRanged.length !== 0) {
           this.selected = this.selected.filter((el)=> {
               if (this.sizeRanged.includes(el.size)) {
                   console.log(`${el.size}`);
                   return el;
               }
           })
       }
        console.log(this.selected);
    }
   
    showSelected() {
        this.allProducts.forEach(el => {
            const blockMan = document.querySelector(`.productSelection__card[data-id="${el.id_product}"]`);
            
            if (!this.selected.includes(el)) {
                blockMan.classList.add('displayNone');
            } else {
                blockMan.classList.remove('displayNone');
            }
        })
    }

    getPrice(from, to) {
        this.priceFrom = from;
        this.priceTo = to;
        this.checkPrice();
    }


    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('add')) {
                const id = +e.target.dataset['id'];
                this.cart.addProduct(this.getItem(id)); //вызвать метод из cart - добавление товара в корзину
                
            }
            if (e.target.classList.contains('heart')) {
                let heartParent = e.target.parentNode.children; 
                for (let i = 0; i < heartParent.length; i++) {
                    heartParent[i].classList.toggle('displayNone');
                }
            }   
            
        });

        document.querySelector('.productSelection__filterSize').addEventListener('click', () => {
            this.checkPrice();
        });

    }
}

class MenItem extends Item {
    markUp() {
        this.rendered = true;
        return `
        <figure class="productSelection__card" data-id="${this.id_product}">
            <img src="${this.img}" alt="Mango_${this.id_product}">
            <figcaption class="productSelection__mango">
                <h3 class="mango-top">${this.product_name}</h3> 
                <span class="mango-down">$${this.price}.00</span>
            </figcaption>
            <div class="productSelection__cardHover"></div>
            <button class="productSelection__cardHoverCart add" data-id="${this.id_product}">
                <svg class="whiteCart add" data-id="${this.id_product}" fill="rgb(255, 255, 255)" width="32" height="29" viewBox="0 0 32 29">
                    <path data-id="${this.id_product}" class="add" d="M31.899,7.565 L26.493,19.977 C26.296,20.410 25.882,20.686 25.409,20.686 L10.554,20.686 C10.021,20.686 9.548,20.331 9.410,19.819 L4.577,2.364 L1.184,2.364 C0.533,2.364 -0.000,1.832 -0.000,1.182 C-0.000,0.532 0.533,-0.001 1.184,-0.001 L5.464,-0.001 C5.997,-0.001 6.471,0.354 6.609,0.866 L11.442,18.322 L24.620,18.322 L28.999,8.274 L14.401,8.274 C13.750,8.274 13.217,7.742 13.217,7.092 C13.217,6.442 13.750,5.910 14.401,5.910 L30.814,5.910 C31.208,5.910 31.583,6.107 31.800,6.442 C32.017,6.777 32.057,7.190 31.899,7.565 ZM9.429,23.641 C10.909,23.641 12.112,24.843 12.112,26.320 C12.112,27.798 10.909,28.999 9.429,28.999 C7.950,28.999 6.747,27.798 6.747,26.320 C6.747,24.843 7.950,23.641 9.429,23.641 ZM26.020,23.641 C27.500,23.542 28.782,24.665 28.881,26.123 C28.920,26.852 28.703,27.542 28.230,28.073 C27.756,28.625 27.105,28.940 26.395,28.999 C26.336,28.999 26.257,28.999 26.198,28.999 C24.797,28.999 23.633,27.896 23.535,26.498 C23.436,25.040 24.541,23.739 26.020,23.641 Z" /> 
                </svg> 
                <span class="productSelection__addToCart add" data-id="${this.id_product}">Add to cart</span>
            </button>
            <div class="productSelection__hoverIconWrapper">
                <button class="productSelection__cardHoverIcon" type="submit">
                    <svg fill="rgb(255, 255, 255)" width="23px" height="22px" viewBox="0 -5 23 22">
                        <path d="M21.702,7.179 C21.325,6.788 20.714,6.788 20.338,7.179 L18.986,8.582 L18.986,1.001 C18.986,0.448 18.554,-0.000 18.021,-0.000 L8.582,-0.000 C8.050,-0.000 7.618,0.448 7.618,1.001 C7.618,1.553 8.050,2.002 8.582,2.002 L17.057,2.002 L17.057,8.582 L15.705,7.178 C15.328,6.787 14.718,6.787 14.342,7.178 C13.965,7.569 13.965,8.202 14.341,8.594 L17.339,11.705 C17.521,11.894 17.766,11.999 18.021,11.999 C18.278,11.999 18.522,11.893 18.704,11.705 L21.702,8.594 C22.078,8.203 22.078,7.569 21.702,7.179 ZM13.401,9.998 L4.926,9.998 L4.926,3.418 L6.278,4.821 C6.467,5.017 6.713,5.114 6.960,5.114 C7.207,5.114 7.454,5.017 7.642,4.821 C8.019,4.430 8.019,3.797 7.642,3.406 L4.644,0.293 C4.463,0.106 4.218,0.000 3.962,0.000 C3.705,0.000 3.460,0.106 3.279,0.293 L0.282,3.406 C-0.095,3.797 -0.095,4.430 0.282,4.821 C0.659,5.212 1.268,5.212 1.645,4.821 L2.998,3.418 L2.998,10.999 C2.998,11.551 3.429,12.000 3.962,12.000 L13.401,12.000 C13.934,12.000 14.365,11.551 14.365,10.999 C14.365,10.446 13.934,9.998 13.401,9.998 Z" /> 
                    </svg>
                </button>
                <button class="productSelection__cardHoverIcon" type="submit">
                    <i class=" heart heartThin far fa-heart fa-lg"></i>
                    <i class="heart heartPink displayNone fas fa-heart fa-lg"></i>         
                </button>
            </div>
        </figure>
        `
    }
}

const list2 = {
    CatalogHome: CatalogItem,
    Cart: CartItem,
    FilteredHome: FilteredItem,
    CatalogMen: MenItem
};


class RangeSlider {
    
    constructor() {
    this._init();
    }

    _init() {
        $(".js-range-slider").ionRangeSlider({
            type: "double",
            skin: "round",
            min: 52,
            max: 400,
            from: 52, 
            to: 300,

            onFinish: function(data) {
                //console.log(`Значение от: ${data.from}, значение до: ${data.to}`);
                catalogMen.getPrice(data.from, data.to); //здесь, чтобы вызвать метод - обращаемся к экземпляру класса: catalogMen, который создаем на страницк html
            }
        });
        
        $('.irs--round').width(282);
        
        $('.irs-bar').css({
            "backgroundColor": "rgb(241, 109, 127)",
            "height": "6px"
        });
        
        $('.irs-line').css("backgroundColor", "#f0eeef")
        .height(6);
        
        $('.irs-min').css("display", "none");
        $('.irs-max').css("display", "none");
        
        $('.irs-handle').css("backgroundColor", "rgb(241, 109, 127)")
            .css("border", "none")
            .css("top", 32)
            .width(14)
            .height(14);
        
        $('.irs-from, .irs-to, .irs-single').css({
            "top": 4,
            "backgroundColor": "rgb(241, 109, 127)"
        });
    }
}

