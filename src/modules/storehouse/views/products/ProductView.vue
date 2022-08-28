<template>inline
  <div class="main">
    <h5 class="mt20" v-if="product.id">Edit Product</h5>
    <h5 class="mt20" v-else>Add Product</h5>
    <hr>

    <label for="cif" class="form-label">Code</label>
    <input type="text" v-model="product.code" class="form-control inline" placeholder="Code"/>    

    <div class="mt20">

      <label for="name" class="form-label">Product name</label>
      <input type="text" v-model="product.name" class="form-control inline" placeholder="Product name"/>

    </div>    
    
    <div class="mt20">

      <label for="name" class="form-label">Multiply</label>
      <input type="number" v-model="product.multiply" class="form-control inline" placeholder="Multiply"/>

    </div>    

    <div class="mt20">

      <label for="name" class="form-label">Provider</label>
      <select class="form-control" v-model="product.providerId">
        <option value="" selected disabled>Select provider</option>
        <option v-for="provider in providerStore.providers" v-bind:key="provider.id" :value="provider.id">
          {{ provider.name }}
        </option>
      </select>

    </div>

    <button
      type="button"
      @click="save"
      class="btn btn-primary btn-lg btn-fab"
      title="Save product"
    >
      <i class="fa fa-save"></i>
    </button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/products';
import { useProviderStore } from '@/stores/providers';
import { ref } from 'vue';

export default {
    name: "Product View",

    props: {
        id: String
    },

    components: {},

    setup(props) {        
        
        const router = useRouter();
        const providerStore = useProviderStore();
        const productStore = useProductStore();

        const product = ref({ 
           code: '', name: '', providerId: '' 
        });

        const loadProduct = () => {
            if(props.id){
                product.value = productStore.products.find((product) => product.id === props.id)
            }
        };

        const save = async() => {
            if (product.value.id) {                
                console.log('update')
                await productStore.updateProduct(product.value);
            } else {            
                console.log('create', product)
                await productStore.createProduct(product.value);
            }          

            router.push({ name: "products" });
        };

        return {
            productStore,
            providerStore,
            product,
            loadProduct,
            save,
        }
    },

    created() {
        this.loadProduct()
        this.providerStore.loadProviders()   
    },
};
</script>