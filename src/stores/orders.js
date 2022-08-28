import { defineStore } from 'pinia';
import moment from 'moment';

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
         
         
        async createOrder( cart ) {

            const orders = [];

            cart.map( (productCart) => {
                const { code, name, amount, multiply, providerName, providerId } = productCart

                const orderProviderIndex = orders.findIndex((order) => order.providerId === providerId)

                if(orderProviderIndex<0){

                    let order = {
                        providerId,
                        providerName,
                        products: [],
                        datetime: moment().format("DD/MM/YYYY hh:mm")
                    }
    
                    order.products.push({
                        code,
                        name,
                        amount,
                        multiply,
                    })

                    orders.push(order)

                } else {

                    orders[orderProviderIndex].products.push({
                        code,
                        name,
                        amount,
                        multiply,
                    })

                }               
                
            })

            orders.map( async (order) => {
                const { data } = await storehouseApi.post(`orders.json`, order)
                orders.id = data.name
                this.orders = [ order, ...this.orders ]
            })
         
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
            this.filteredOrders = this.order
            
            return id
        }
    }

})