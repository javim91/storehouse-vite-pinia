<template>
  <div class="main">

    <h5 class="mt20">Products</h5>
    <hr>

    <div class="col-sm-12 col-md-12 col-lg-4 mb20">
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
          <th width="20%">Code</th>
          <th width="30%">Name</th>
          <th width="30%">Provider</th>
          <th width="20%" class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in productStore.filteredProducts" v-bind:key="item.id" class="align-middle">
          <td>{{ item.code }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.providerName }}</td>
          <td class="text-center">
            <button type="button" class="btn btn-warning mr5" @click="edit(item)"><i class="fa fa-edit"></i></button>
            <button type="button" class="btn btn-danger" @click="remove(item)"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <button type="button" @click="add" class="btn btn-primary btn-lg btn-fab" title="New product"><i class="fa fa-plus"></i></button>

  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/products';

import Swal from "sweetalert2";

export default {

  components: {},
  
  setup() {
    
    const router = useRouter();
    const productStore = useProductStore();

  const add = () => {
      router.push({ name: 'add-product' })
    };

    const edit = (item) => {
      router.push({ name: 'edit-product', params: {'id':item.id } })
    };

    const remove = async(item) => {
      Swal.fire({
        title: `Remove ${item.name}?`,
        text: "Product will be removed",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          await productStore.deleteProduct(item.id)
          productStore.loadProducts();
          Swal.fire(
            'Removed!',
            'Your product has been removed.',
            'success'
          )
        }
      })
    };

    const filter = (event) => {
      const searchTerm = event.target.value
      productStore.filterProductsByTerm(searchTerm)
    };
    

    return {
      productStore,
      add,
      edit,
      remove,
      filter,
    };

  },

  created() {
    this.productStore.loadProducts()    
  },


};
</script>

<style scoped>


</style>