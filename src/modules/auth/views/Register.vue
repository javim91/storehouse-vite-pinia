<template>
    <h4 class="mb30">Registro</h4>
    <form action class="form" @submit.prevent="onSubmit">

        <div class="form-group text-left">
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name" v-model="userForm.name" class="form-control" placeholder="Nombre" required/>
        </div>

        <div class="form-group mt20 text-left">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="userForm.email" class="form-control" placeholder="Email" required/>
        </div>

        <div class="form-group mt20 text-left">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" v-model="userForm.password" class="form-control" placeholder="Contraseña" required/>
        </div>

        <div class="form-group mt20 text-left">
            <label for="verify-password">Repetir Contraseña</label>
            <input type="password" id="verify-password" name="verify-password" v-model="userForm.verifyPassword" class="form-control" placeholder="Repetir Contraseña" required/>
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
        const { createUser } = useAuth()

        const userForm = ref({
            name: '',
            email: '',
            password: '',
            verifyPassword: '',
        })

        return {
            userForm,

            onSubmit: async() => {
                const {ok, message} = await createUser(userForm.value)

                if( !ok ) Swal.fire('Error', message, 'error')
                else router.push({ name: 'login'})
            }
        }
    }

}
</script>

<style>
</style>