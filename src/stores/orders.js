import { defineStore } from 'pinia';

import storehouseApi from '@/api/storehouseApi';


export const useOrderStore = defineStore('orders', {

    // STATE
    state: () => ({        
        orders: [],
        filteredOrders: [],
    }),    
    persist: true,

    // GETTERS
    getters: {
        getOrders() {
            return this.orders
        },

        getOrdersById: (state) => (orderId) => {
            return (orderId) => state.orders.find((order) => order.id === orderId)
        },
    }, 

    // ACTIONS
    actions: {
        async loadOrders() {
    
            const { data } = await storehouseApi.get('/orders.json')
         
            if ( !data ) {
                this.orders = []
                return 
            }
         
            const orders = []
         
            for( let id of Object.keys(data) ){
                orders.push({
                    id,
                    ...data[id],
                })
            }
         
            this.orders = orders
            this.filteredOrders = orders
        },

        async filterOrdersByTerm(searchTerm) {
            const arr = this.orders;

            const res = arr.filter(obj => Object.values(obj).some(val => val.toString().toLowerCase().includes(searchTerm.toLowerCase())));
            this.filteredOrders = res

        },
         
         
        async createOrder( order ) {
         
            const { providerName, products } = order
            const dataToSave = { code, name, providerId }
         
            const { data } = await storehouseApi.post(`orders.json`, dataToSave)
            
         
            dataToSave.id = data.name
         
            this.orders = [ dataToSave, ...this.orders ]
         
            return data.name
         
         },
         
        async updateOrder( order ) {
         
            const { products } = order
            const dataToSave = { code, name, providerId }
         
            const { data } = await storehouseApi.put(`orders/${order.id}.json`, dataToSave)
            
            const idx = this.orders.map( p => p.id ).indexOf( order.id )
            this.orders[idx] = order
         
        },
         
        async deleteOrder( id ) {
         
            await storehouseApi.delete(`/orders/${id}.json`)
            
            this.order = this.orders.filter( order => order.id !== id )
            
            return id
        }
    }

})