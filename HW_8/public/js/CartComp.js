const cartItem = {
    props: ['item'],
    template: `
        <div class="cart__item" data-id="item.id_product">
            <img :src="$parent.imgCart + item.id_product" :alt="item.product_name">
            <span data-id="item.id_product" class="cart__title">{{ item.product_name }}</span>
            <p data-id="item.id_product" class="cart__price">{{ item.price }} руб</p>

            <div data-id="item.id_product" class="itemInCart__quantity">
                <button class="header__cartBtn" type="submit" @click="$parent.removeProduct(item)">
                <i class="fas fa-caret-left arrow"></i>
                </button>
                <span class="itemInCart__text">{{ item.quantity }}</span>
                <button class="header__cartBtn" type="submit" @click="$parent.addProduct(item)">
                <i class="fas fa-caret-right arrow"></i>
                </button>
                
            </div>
            
            <p data-id="item.id_product" class="cart__price">{{ item.price*item.quantity }} руб</p>
            <svg data-id="item.id_product" class="itemInCart__delete" @click="$parent.deleteProduct(item)" fill="currentColor" height="15" width="15" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>          
        </div>
         `
}
const cart = {
    
    components: {'cart-item': cartItem},
    data() {
        return {
            itemsInCart: [],
            imgCart: 'https://picsum.photos/100/150?random',
            cartUrl: '/getBasket.json',
            productIdRmv: "",
            productId: "",
            productPrice: 0,
            totalPrice: 0,
            
        }
    },
    mounted(){                                      
        this.$parent.getJson(`/api/cart`)     
           .then(data => {                          
               for(let el of data.contents){
                   console.log(el);    
                   this.itemsInCart.push(el);     
               }
           })
    },

    methods: {
        deleteProduct(product) {
            this.$root.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    this.productIdRmv = +product.id_product;
                    let find = this.itemsInCart.find(product => product.id_product === this.productIdRmv);
                    this.itemsInCart.splice(this.itemsInCart.indexOf(find), 1);
                    this.calcTotalPrice();
                } else {
                    alert('Error');
                }
            })
        },
        addProduct(product){
            this.$root.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1){
                    this.productId = +product.id_product;
                    //console.log(this.productId);
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
        },
        calcTotalPrice() {

            this.totalPrice = 0;
            this.$root.totalQuantity = 0;
            for (let elem of this.itemsInCart) {
                this.productPrice = +elem.price;
                console.log(this.productPrice);
                this.totalPrice = this.totalPrice + this.productPrice*elem.quantity;
                this.$root.totalQuantity = this.$root.totalQuantity + elem.quantity;
            }
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
    },

    template: `
        <div class="cart">
            <div class = "cart__item">
                <span></span>
                <span class="cart__head">Товар</span>
                <span class="cart__head">Цена</span>
                <span class="cart__head">Количество</span>
                <span class="cart__head">Стоимость</span>
                <span class="cart__head">Удалить</span>
            </div>

            <cart-item v-for="item of itemsInCart" 
            :key="item.id_product"
            :item="item"
            >
            </cart-item>
            <p>Итого: {{ totalPrice }} руб</p> 
        </div>
    `
};
