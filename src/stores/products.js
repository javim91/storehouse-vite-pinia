import { defineStore } from 'pinia';

import storehouseApi from '@/api/storehouseApi';

import { useProviderStore } from './providers'

export const useProductStore = defineStore('products', {

    // STATE
    state: () => ({        
        products: [],
        filteredProducts: [],
    }),    
    persist: true,

    // GETTERS
    getters: {
        getProducts() {
            return this.products
        },

        getProductById: (state) => (productId) => {
            return (productId) => state.products.find((product) => product.id === productId)
        },
    }, 

    // ACTIONS
    actions: {
        async loadProducts() {
    
            const { data } = await storehouseApi.get('/products.json')            
            const providerStore = useProviderStore();
         
            if ( !data ) {
                this.products = []
                return 
            }
         
            const products = []
         
            for( let id of Object.keys(data) ){
                const provider = providerStore.providers.find((provider) => provider.id === data[id].providerId)
                products.push({
                    id,
                    ...data[id],
                    'providerName' : provider.name
                })
            }
         
            this.products = products
            this.filteredProducts = products
        },

        async filterProductsByTerm(searchTerm) {
            const arr = this.products;

            const res = arr.filter(obj => Object.values(obj).some(val => val.toString().toLowerCase().includes(searchTerm.toLowerCase())));
            this.filteredProducts = res

        },
         
         
        async createProduct( product ) {
         
            const { code, name, providerId } = product
            const dataToSave = { code, name, providerId }
         
            const { data } = await storehouseApi.post(`products.json`, dataToSave)
            
         
            dataToSave.id = data.name
         
            this.products = [ dataToSave, ...this.products ]
         
            return data.name
         
         },
         
        async updateProduct( product ) {
         
            const { code, name, providerId } = product
            const dataToSave = { code, name, providerId }
         
            const { data } = await storehouseApi.put(`products/${product.id}.json`, dataToSave)
            
            const idx = this.products.map( p => p.id ).indexOf( product.id )
            this.products[idx] = product
         
        },
         
        async deleteProduct( id ) {
         
            await storehouseApi.delete(`/products/${id}.json`)
            
            this.product = this.products.filter( product => product.id !== id )
            
            return id
        }
    }

})