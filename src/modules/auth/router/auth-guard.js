import { useAuthStore } from "../../../stores/auth"

const authStore = useAuthStore();

const  isAthenticatedGuard = async(to, from, next) => {

    const { ok } = await authStore.checkAuthentication()    
    if( ok ) next()
    else next({ name: 'login' })
}


export default isAthenticatedGuard