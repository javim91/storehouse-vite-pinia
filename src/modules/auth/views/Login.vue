<template>
    <h4 class="mb30">Acceso</h4>
    <form action class="form" @submit.prevent="onSubmit">

        <div class="form-group text-left">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model.trim="userForm.email" class="form-control" placeholder="Email" required/>
        </div>

        <div class="form-group mt20 text-left">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" v-model.trim="userForm.password" class="form-control" placeholder="Contraseña" required/>
        </div>

        <!--<p v-if="formError" class="error">Usuario y contraseña obligatorios</p>
        <p v-if="error" class="error">Usuario o contraseña incorrectos</p>-->

        <button type="submit" class="btn btn-primary mt30 full-width p10">Acceder</button>
    
    </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'

import Swal from 'sweetalert2'

export default {

    setup() {

        const router = useRouter()
        const { loginUser } = useAuth()

        const userForm = ref({
            email: '',
            password: '',
        })

        return {
            userForm,

            onSubmit: async() => {
                const {ok, message} = await loginUser(userForm.value)

                if( !ok ) Swal.fire('Error', message, 'error')
                else router.push({ name: 'home'})
            }
        }
    }

}
</script>

<style>
</style>