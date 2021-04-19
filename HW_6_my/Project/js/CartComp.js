Vue.component('cart', {
    props: ['itemsInCart', 'img', 'total'],
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

            <cart-item v-for="item of itemsInCart" :key="item.id_product" :img="img" :item="item">
            </cart-item>
            <p>Итого: {{ total }} руб</p> 
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'item'],
    template: `
        <div class="cart__item" data-id="item.id_product">
            <img :src="img + item.id_product" :alt="item.product_name">
            <span data-id="item.id_product" class="cart__title">{{ item.product_name }}</span>
            <p data-id="item.id_product" class="cart__price">{{ item.price }} руб</p>
            <div data-id="item.id_product" class="itemInCart__quantity">{{ item.quantity }}</div>
            <p data-id="item.id_product" class="cart__price">{{ item.price*item.quantity }} руб</p>
            <svg data-id="item.id_product" class="itemInCart__delete" @click="$parent.$emit('remove', item)" fill="currentColor" height="15" width="15" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>          
        </div>
    `
})
