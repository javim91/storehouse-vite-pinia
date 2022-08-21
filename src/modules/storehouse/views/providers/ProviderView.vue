<template>
  <div class="main">
    <h5 class="mt20" v-if="provider.id">Edit Provider</h5>
    <h5 class="mt20" v-else>Add Provider</h5>
    <hr>

    <label for="cif" class="form-label">CIF</label>
    <input type="text" v-model="provider.cif" class="form-control inline" placeholder="CIF"/>    

    <div class="mt20">

      <label for="name" class="form-label">Provider name</label>
      <input type="text" v-model="provider.name" @keypress.enter="save" class="form-control inline" placeholder="Provider name"/>

    </div>

    <button
      type="button"
      @click="save"
      class="btn btn-primary btn-lg btn-fab"
      title="Save provider"
    >
      <i class="fa fa-save"></i>
    </button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useProviderStore } from '@/stores/providers';
import { ref } from 'vue';

export default {
    name: "Provider View",

    props: {
        id: String
    },

    components: {},

    setup(props) {
        
        const router = useRouter();
        const providerStore = useProviderStore();

        const provider = ref({ 
           cif: '', name: '' 
        });

        const loadProvider = () => {
            if(props.id){
                provider.value = providerStore.providers.find((provider) => provider.id === props.id)
            }
        };

        const save = async() => {
            if (provider.value.id) {                
                console.log('update')
                await providerStore.updateProvider(provider.value);
            } else {            
                console.log('create', provider)
                await providerStore.createProvider(provider.value);
            }          

            router.push({ name: "providers" });
        };

        return {
            providerStore,
            provider,
            loadProvider,
            save,
        }
    },

    created() {
        this.loadProvider()
    },
};
</script>