const product = {
	props: ['product'],
    template: `
    	<div class="product__item">
                <img :src="$parent.imgCatalog + product.id_product" alt="product.product_name">
                <div class="desc">
                    <h3 class="products__title">{{ product.product_name }}</h3>
                    <p class="products__price">{{ product.price }} руб</p>
                    <button class="products__buyBtn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
        </div>
        `
}


const catalog ={
	components: {product},

	data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://picsum.photos/200/300?random',
        }
    },
        
    mounted () {        			//запуск

        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    },

    template: `			
    <div class="products">
        <product 			
        v-for="product of products" 
        :key="product.id_product"  
        :product="product">		
       </product>
    </div>
    `
}