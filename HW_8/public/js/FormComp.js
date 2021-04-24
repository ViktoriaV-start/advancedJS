const search = {   
    
    template: `
        <div class='searchResult__wrap container invsbl'>
            <h3 class="searchResult__text">Результат поиска</h3>
                <div class="searchResult">
                    <div class="product__item" v-for="el of $root.$refs.field.abc" :key="el.id_product" data-id="el.id_product">
                        <img :src="$parent.imgCatalog + el.id_product" :alt="el.product_name">
                        <div class="desc">
                            <h3 class="products__title">{{ el.product_name }}</h3>
                            <p class="products__price">{{ el.price }} руб</p>
                            <button class="products__buyBtn" @click="$root.$refs.cart.addProduct(el)">Купить</button>
                        </div>                        
                    </div>    
                </div>
            </div>
    `
   }