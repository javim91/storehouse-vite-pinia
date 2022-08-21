/*import { computed } from 'vue'

import { useAuthStore } from "../../../stores/auth"

const authStore = useAuthStore()

const useAuth = () => {

    const createUser = async( user ) => {
        const resp = await authStore.createUser(user)
        return resp
    }

    const loginUser = async( user ) => {
        const resp = await authStore.signInUser(user)
        return resp
    }

    const checkAuthStatus = async() => {
        const resp = await authStore.checkAuthentication()
        return resp
    }

    const logout = () => {
        authStore.logout()
    }

    return {
        createUser,
        checkAuthStatus,
        loginUser,
        logout,

        authStatus: computed(() => authStore.currentState ),
        username: computed(() => authStore.username )
    }

}

export default useAuth*/