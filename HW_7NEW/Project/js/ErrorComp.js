const error = {   
    data() {
        return {
            text: ''
        }
    },

    methods: {
        setText(val) {
            this.text = val;
        }
    },

    template: `
        <div class="products__error" v-if="text">
            <p class="products__errorMsg">
            <button class="products__errorClose" @click="setText('')">&times;</button>
            {{ text }}
            </p>
        </div>        
    `
   }