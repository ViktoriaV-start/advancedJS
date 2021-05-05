const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const App = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        imgCatalog: 'https://picsum.photos/200/300?random',
        imgCart: 'https://picsum.photos/100/150?random',
        totalQuantity: 2,
    },
    components: {catalog, cart, field, search, error},
    methods: {
        getJson(url){                 
            return fetch(url)
                .then(result => result.json())    
                .catch(error => this.$refs.error.setText(error))
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.text = error;
                })
            },
            putJson(url, data){
                return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        this.$refs.error.text = error;
                    })
            },
        
         toggleClass(event) {
            //event.target.nextElementSibling.classList.toggle('vsbl');
            let cartTable = document.querySelector('.cart');
            cartTable.classList.toggle('vsbl');
            this.$root.$refs.cart.calcTotalPrice();
        },
    }    
})