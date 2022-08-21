<template>
  <div class="main">

    <h5 class="mt20">Providers</h5>
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
          <th width="20%">CIF</th>
          <th width="60%">Nombre</th>
          <th width="20%" class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in providerStore.filteredProviders" v-bind:key="item.id" class="align-middle">
          <td>{{ item.cif }}</td>
          <td>{{ item.name }}</td>
          <td class="text-center">
            <button type="button" class="btn btn-warning mr5" @click="edit(item)"><i class="fa fa-edit"></i></button>
            <button type="button" class="btn btn-danger" @click="remove(item)"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

    <button type="button" @click="add" class="btn btn-primary btn-lg btn-fab" title="New provider"><i class="fa fa-plus"></i></button>

  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useProviderStore } from '@/stores/providers';

import Swal from "sweetalert2";

export default {

  components: {},

  setup() {
    
    const router = useRouter();
    const providerStore = useProviderStore();

    const add = () => {
      router.push({ name: 'add-provider' })
    };

    const edit = (item) => {
      router.push({ name: 'edit-provider', params: {'id':item.id } })
    };

    const remove = async(item) => {
      Swal.fire({
        title: `Remove ${item.name}?`,
        text: "Provider will be removed",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          await providerStore.deleteProvider(item.id)
          providerStore.loadProviders();
          Swal.fire(
            'Removed!',
            'Your provider has been removed.',
            'success'
          )
        }
      })
    };

    const filter = (event) => {
      const searchTerm = event.target.value
      providerStore.filterProvidersByTerm(searchTerm)
    };
    

    return {
      providerStore,
      add,
      edit,
      remove,
      filter,
    };

  },

  created() {
    this.providerStore.loadProviders()    
  },


};
</script>

<style scoped>


</style>
