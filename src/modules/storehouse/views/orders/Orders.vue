<template>
  <div class="main">

    <h5 class="mt20">Orders</h5>
    <hr>

    <div class="col-sm-12 col-md-12 col-lg-4 mt20">
      <input
        type="text"
        id="search"
        @keyup="filter($event)"
        class="form-control inline"
        placeholder="Type to search..."
      />
    </div>

    <table class="table text-left expanded">
      <thead>
        <tr>
          <th width="15%">Order Nº</th>
          <th width="45%">Provider</th>
          <th width="15%">Date / Hour</th>
          <th width="15%">Total Amount</th>
          <th width="10%" class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orderStore.filteredOrders" v-bind:key="item.id" class="align-middle">
          <td>{{ item.number }}</td>
          <td>{{ item.providerName }}</td>
          <td>{{ item.date }} / {{ item.hour }}</td>
          <td>{{ item.totalPrice }} €</td>
          <td class="text-center">
            <button type="button" class="btn btn-warning mr5" @click="edit(item)"><i class="fa fa-edit"></i></button>
            <button type="button" class="btn btn-danger" @click="remove(item)"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <button type="button" @click="add" class="btn btn-primary btn-lg btn-fab" title="New order"><i class="fa fa-plus"></i></button>

  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orders';

import Swal from "sweetalert2";

export default {

  components: {},

  setup() {
    
    const router = useRouter();
    const orderStore = useOrderStore();

    const add = () => {
      router.push({ name: 'add-order' })
    };

    const edit = (item) => {
      console.log(item)
      router.push({ name: 'edit-order', params: {'id':item.id } })
    };

    const remove = async(item) => {
      Swal.fire({
        title: `Remove ${item.number}?`,
        text: "Order will be removed",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          await orderStore.deleteOrder(item.id)
          orderStore.loadOrders();
          Swal.fire(
            'Removed!',
            'Your order has been removed.',
            'success'
          )
        }
      })
    };

    const filter = (event) => {
      const searchTerm = event.target.value
      orderStore.filterOrdersByTerm(searchTerm)
    };
    

    return {
      orderStore,
      add,
      edit,
      remove,
      filter,
    };

  },

  created() {
    this.orderStore.loadOrders()    
  },


};
</script>

<style scoped>


</style>
