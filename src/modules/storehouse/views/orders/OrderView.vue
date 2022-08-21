<template>Order
  <div class="main">
    <h5 class="mt20" v-if="order.id">Edit Order</h5>
    <h5 class="mt20" v-else>Add Order</h5>
    <hr>

    <label for="provider" class="form-label">Provider</label>
    <input type="text" v-model="order.providerName" class="form-control inline" readonly disabled />   

    <div class="mt20">
      <label for="number" class="form-label">Order Nº</label>
      <input type="text" v-model="order.number" class="form-control inline" readonly disabled />    
    </div>    

    <div class="mt20">

      <div class="products">
        <div v-for="product in order.products" v-bind:key="product.id">
          {{ product.name }}
          {{ product.numberOfPackages }} pack / {{ product.amount/product.numberOfPackages }}
          {{ product.pricePerUnit }} €
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

        const order = ref({ 
        });

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
                console.log('create', order)
                await orderStore.createOrder(order.value);
            }          

            router.push({ name: "orders" });
        };

        return {
            orderStore,
            order,
            loadOrder,
            save,
        }
    },

    created() {
        this.loadOrder()
    },
};
</script>