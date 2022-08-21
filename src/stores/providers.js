import { defineStore } from 'pinia';

import storehouseApi from '@/api/storehouseApi';

export const useProviderStore = defineStore('providers', {

    // STATE
    state: () => ({        
        providers: [],
        filteredProviders: [],
    }),    
    persist: true,

    // GETTERS
    getters: {
        getProviders() {
            return this.providers
        },

        getProviderById: (state) => (providerId) => {
            return (providerId) => state.providers.find((provider) => provider.id === providerId)
        },
    }, 

    // ACTIONS
    actions: {
        async loadProviders() {
    
            const { data } = await storehouseApi.get('/providers.json')
         
            if ( !data ) {
                this.providers = []
                return 
            }
         
            const providers = []
         
            for( let id of Object.keys(data) ){
               providers.push({
                  id,
                  ...data[id]
               })
            }
         
            this.providers = providers
            this.filteredProviders = providers
        },

        async filterProvidersByTerm(searchTerm) {
            const arr = this.providers;

            const res = arr.filter(obj => Object.values(obj).some(val => val.toString().toLowerCase().includes(searchTerm.toLowerCase())));
            this.filteredProviders = res

        },
         
         
        async createProvider( provider ) {
         
            const { cif, name } = provider
            const dataToSave = { cif, name }
         
            const { data } = await storehouseApi.post(`providers.json`, dataToSave)
            
         
            dataToSave.id = data.name
         
            this.providers = [ dataToSave, ...this.providers ]
         
            return data.name
         
         },
         
        async updateProvider( provider ) {
         
            const { cif, name } = provider
            const dataToSave = { cif, name }
            console.log(dataToSave)
         
            const { data } = await storehouseApi.put(`providers/${provider.id}.json`, dataToSave)
            
            const idx = this.providers.map( p => p.id ).indexOf( provider.id )
            this.providers[idx] = provider
         
        },
         
        async deleteProvider( id ) {
         
            await storehouseApi.delete(`/providers/${id}.json`)
            
            this.provider = this.providers.filter( provider => provider.id !== id )
            
            return id
        }
    }

})