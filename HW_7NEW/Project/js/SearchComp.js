const field = {   

    data() {
        return {
            userSearch:'',
            abc: [],
        }
    },
    methods: {
        filter() {
                console.dir(this.userSearch);
                document.querySelector(".products").classList.add('invsbl');
                document.querySelector(".searchResult__wrap").classList.remove('invsbl');
                //let nnn = "["+this.userSearch+"]"+"+";
                 
                const REGEXP = new RegExp(this.userSearch, 'i');
                
                this.abc = this.$root.$refs.catalog.products.filter(el => REGEXP.test(el.product_name));
                
                if (this.userSearch === '') {
                    document.querySelector(".products").classList.remove('invsbl');
                    document.querySelector(".searchResult__wrap").classList.add('invsbl');
                }
                if (this.abc.length === 0) {
                    document.querySelector(".searchResult__text").innerHTML ='Поиск не дал результатов';
                } else {
                    document.querySelector(".searchResult__text").innerHTML ='Результат поиска';
                }        
            },
    },
    template: `
        <form action="#" class="header__search" @submit.prevent="filter(userSearch)">
            <input type="text" class="header__searchField" v-model.lazy="userSearch">
            <button class="header__searchBtn" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
   }

    