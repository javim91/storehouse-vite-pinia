<template>
  <div class="main">
    <h5 class="mt20" v-if="order.id">Edit Order</h5>
    <h5 class="mt20" v-else>Add Order</h5>
    <hr>

    <label for="provider" class="form-label">Provider</label>
    <input type="text" v-model="order.providerName" class="form-control inline" readonly disabled />   

    <div class="mt20" v-if="order.id">
      <label for="number" class="form-label">Order Nº</label>
      <input type="text" v-model="order.number" class="form-control inline" readonly disabled />    
    </div>    

    <div class="mt20">
      <label for="provider" class="form-label">Search product</label>
      <input
        type="text"
        id="search"
        @keyup="filter($event)"
        class="form-control inline"
        placeholder="Search..."
      />
    </div>
    

    <div class="mt20">

      <div class="products" v-if="order.id">
        <div v-for="product in order.products" v-bind:key="product.id">
          {{ product.name }}
          {{ product.numberOfPackages }} pack / {{ product.amount/product.numberOfPackages }}
          {{ product.pricePerUnit }} €
        </div>
      </div>

      <div v-else>
        <div v-for="product in productStore.filteredProducts" v-bind:key="product.id" class="card mt15">
          <div class="card-body">
            <div class="product-name">{{ product.name }}</div>
            <input type="text" class="form-control" v-model="product.amount" readonly> 
            <div class="mt15">
              <button class="btn btn-outline-warning mr5" @click="processProductAmount(product, 0, 'reset')" >Reset</button>
              <button class="btn btn-outline-primary mr5" @click="processProductAmount(product, 1, 'sub')" >-1 unit</button>
              <button class="btn btn-outline-primary mr5" @click="processProductAmount(product, 1, 'add')">+1 unit</button>
              <button class="btn btn-outline-primary mr5" @click="processProductAmount(product, product.multiply, 'sub')" >-1 <i class="fa fa-cube"></i></button>
              <button class="btn btn-outline-primary mr5" @click="processProductAmount(product, product.multiply, 'add')">+1 <i class="fa fa-cube"></i></button>
              <button class="btn btn-outline-primary mr5" @click="processProductAmount(product, product.multiply*10, 'sub')" >-10 <i class="fa fa-cubes"></i></button>
              <button class="btn btn-outline-primary mr5" @click="processProductAmount(product, product.multiply*10, 'add')">+10 <i class="fa fa-cubes"></i></button>
            </div>              
          </div>
                        
        </div>
      </div>

      

    </div>

    <button
      type="button"
      @click="save"
      class="btn btn-primary btn-lg btn-fab"
      title="Save order"
    >
      <i class="fa fa-save"></i>
    </button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orders';
import { useProductStore } from '@/stores/products';
import { ref } from 'vue';

export default {
    name: "Order View",

    props: {
        id: String
    },

    components: {},

    setup(props) {
        
        const router = useRouter();
        const orderStore = useOrderStore();
        const productStore = useProductStore();

        const order = ref({ 
        });

        const cart = ref([]);

        const loadOrder = () => {
            if(props.id){
                order.value = orderStore.orders.find((order) => order.id === props.id)
            }
        };

        const save = async() => {
            if (order.value.id) {                
                console.log('update')
                await orderStore.updateOrder(order.value);
            } else {            
                console.log('create', cart)
                await orderStore.createOrder(cart.value);
                orderStore.loadOrders()
            }          

            router.push({ name: "orders" });
        };

        const filter = (event) => {
          const searchTerm = event.target.value
          productStore.filterProductsByTerm(searchTerm)
        };

        const processProductAmount = (prod, qty, op) => {
          if(op=='reset') {
            prod.amount = 0;
          }
          if(op == 'add'){
            prod.amount=prod.amount+qty
          }
          if(op == 'sub'){
            prod.amount=prod.amount-qty
          }
          
          const cartProductIndex = cart.value.findIndex((product) => product.id === prod.id)

          if(prod.amount > 0) {            
              if(cartProductIndex>=0){
                cart.value[cartProductIndex] = prod
              } else{
                cart.value.push(prod)
              }
          } else if (cartProductIndex>=0) {
            cart.value.splice(cartProductIndex, 1)
          } else if(prod.amount < 0) {      
            prod.amount = 0
          }
          
        };

        return {
            productStore,
            orderStore,
            order,
            loadOrder,
            save,
            filter,
            cart,
            processProductAmount,
        }
    },

    created() {
        this.loadOrder(),
        this.productStore.loadProducts()    
    },
};
</script>


<style scoped>
.product-name{
  font-weight: bold;

}

</style>