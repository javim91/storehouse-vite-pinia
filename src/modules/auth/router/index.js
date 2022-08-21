export default {
    name: 'auth',
    component: () => import(/* webpackChunkName: "Auth Layout" */ '../layouts/AuthLayout.vue'),
    children: [
        {
            name: 'login',
            path: '',
            component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
        },
        {
             path: '/register',
             name: 'register',
             component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
        }
    ]
}