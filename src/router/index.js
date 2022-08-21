import { createRouter, createWebHistory } from "vue-router";

//import authRouter from '../modules/auth/router'
import storehouseRouter from '@/modules/storehouse/router'

//import isAuthenticatedGuard from '../modules/auth/router/auth-guard'

const routes = [
  {
    path: "/",    
    //beforeEnter: [ isAuthenticatedGuard ],
    ...storehouseRouter
  },
  /*{
    path: '/auth',
    ...authRouter
  }*/
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
