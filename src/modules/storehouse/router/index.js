export default {    
    name: "storehouse",
    component: () => import(/* webpackChunkName: "Storehouse Layout" */ '@/modules/storehouse/layouts/StorehouseLayout.vue'),
    children: [
        {
            name: "home",
            path: '/',
            component: () => import(/* webpackChunkName: "Home" */ '@/modules/storehouse/views/Home.vue'),
        },
        {
            name: "orders",
            path: '/orders',
            component: () => import(/* webpackChunkName: "Orders" */ '@/modules/storehouse/views/orders/Orders.vue'),
        },
        {
            name: "add-order",
            path: '/add-order',
            component: () => import(/* webpackChunkName: "Add Order" */ '@/modules/storehouse/views/orders/OrderView.vue'),
        },
        {
            name: "edit-order",
            path: 'order/:id',
            component: () => import(/* webpackChunkName: "Edit Order" */ '@/modules/storehouse/views/orders/OrderView.vue'),
            props: ( route ) => {
                return {
                    id: route.params.id
                }
            }
        },
        {
            name: "products",
            path: '/products',
            component: () => import(/* webpackChunkName: "Products" */ '@/modules/storehouse/views/products/Products.vue'),
        },
        {
            name: "add-product",
            path: '/add-product',
            component: () => import(/* webpackChunkName: "Add Product" */ '@/modules/storehouse/views/products/ProductView.vue'),
        },
        {
            name: "edit-product",
            path: 'product/:id',
            component: () => import(/* webpackChunkName: "Edit Product" */ '@/modules/storehouse/views/products/ProductView.vue'),
            props: ( route ) => {
                return {
                    id: route.params.id
                }
            }
        },
        {
            name: "providers",
            path: '/providers',
            component: () => import(/* webpackChunkName: "Providers" */ '../views/providers/Providers.vue'),
        },
        {
            name: "edit-provider",
            path: 'provider/:id',
            component: () => import(/* webpackChunkName: "Edit Provider" */ '../views/providers/ProviderView.vue'),
            props: ( route ) => {
                return {
                    id: route.params.id
                }
            }
        },
        {
            name: "add-provider",
            path: '/add-provider',
            component: () => import(/* webpackChunkName: "Add Provider" */ '../views/providers/ProviderView.vue'),
        },
        {
            name: "join-codes",
            path: '/join-codes',
            component: () => import(/* webpackChunkName: "Join Codes" */ '../views/JoinCodes.vue'),
        },
    ],
}