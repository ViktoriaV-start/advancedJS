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
        getJson(url){                      // 3) запустить getJson и получить url из mounted
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
                    console.log(this.productId);
                    let find = this.itemsInCart.find(product => product.id_product === this.productId);
                    if(find){
                        find.quantity++;
                        this.calcTotalPrice();
                    } else {
                        const prd = Object.assign({quantity: 1}, product);
                        this.itemsInCart.push(prd);
                        this.calcTotalPrice();
                    }
                } else {
                    alert('Error');
                }
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
           });
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