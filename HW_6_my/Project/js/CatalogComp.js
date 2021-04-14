Vue.component('catalog', {
    props:['products', 'img'],
   
    template: `
        <div class="products">
            <product v-for="el of products" 
            :key="el.id_product" 
            :img="img"
            :product="el"></product>
        </div>

    `
   })

Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <div class="product__item">
                <img :src="img + product.id_product" alt="product.product_name">
                <div class="desc">
                    <h3 class="products__title">{{ product.product_name }}</h3>
                    <p class="products__price">{{ product.price }}</p>
                    <button class="products__buyBtn" @click="$parent.$emit('add-product', product)">Купить</button>
                </div>
            </div>
    `
})
