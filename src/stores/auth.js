import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {

    // STATE
    state: () => ({
        status: 'authenticated', // 'authenticated', 'not-authenticated', 'authenticating'
        user: null,
        idToken: null,
        refreshToken: null, 
    }),

    // GETTERS
    getters: {
        currentState() {
            return this.status
        },
        
        username() {
            return this.user?.name || ''
        }
    }, 

    // ACTIONS
    actions: {

        async createUser( user ) {
        
            const { name, email, password } = user
        
            try {
        
                const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
                const { idToken, refreshToken } = data
        
                await authApi.post(':update', { displayName: name, idToken })
        
                delete user.password
                delete user.verifyPassword


                /// login user

                if( idToken ) {
                    localStorage.setItem('idToken', idToken)
                    this.idToken = idToken
                }
            
                if( refreshToken ) {
                    localStorage.setItem('refreshToken', refreshToken)
                    this.refreshToken = refreshToken
                }
            
                this.user = user
                this.status = 'authenticated'

                // end login user
        
                return { ok: true }
        
            } catch(error){
                return { ok: false, message: error.response.data.error.message }
            }
        
        },    
    
        async signInUser(user) {
            
            const { email, password } = user
        
            try {
        
                const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
                const { displayName, idToken, refreshToken } = data        
                
                user.name = displayName
                delete user.password
                
                c/// login user

                if( idToken ) {
                    localStorage.setItem('idToken', idToken)
                    this.idToken = idToken
                }
            
                if( refreshToken ) {
                    localStorage.setItem('refreshToken', refreshToken)
                    this.refreshToken = refreshToken
                }
            
                this.user = user
                this.status = 'authenticated'

                // end login user
        
                return { ok: true }
        
            } catch(error){
                return { ok: false, message: error.response.data.error.message }
            }
        
        },        
    
    
        async checkAuthentication() {
            
            const idToken = localStorage.getItem('idToken')
            const refreshToken = localStorage.getItem('idToken')
        
            if(!idToken) {
                this.logout()
                return { ok: false, message: 'No hay token en la petición' }
            }
        
            try {
        
                const { data } = await authApi.post(':lookup', { idToken })
                const { displayName, email } = data.users[0]
        
                const user = {
                    name: displayName,
                    email
                }
                
                /// login user

                if( idToken ) {
                    localStorage.setItem('idToken', idToken)
                    this.idToken = idToken
                }
            
                if( refreshToken ) {
                    localStorage.setItem('refreshToken', refreshToken)
                    this.refreshToken = refreshToken
                }
            
                this.user = user
                this.status = 'authenticated'

                // end login user
        
                return { ok: true }
        
            } catch (error) {
                this.logout()
                return { ok: false, message: error.response.data.error.message }
            }
        
        },

        logout() {

            this.user = null
            this.idToken = null
            this.refreshToken = null
            this.status = 'not-authenticated'
        
            localStorage.removeItem('idToken')
            localStorage.removeItem('refreshToken')
        
        }

    }

})