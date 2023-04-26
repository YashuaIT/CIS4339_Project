<template>
    <main>

        <div class="row justify-content-center pt-3">
            <div class="col-md-4">
                <h1 class="text-center pb-3 font-weight-bold text-danger fs-3">Login Page</h1>
                <form @submit.prevent="store.login(username, password)">
                    <div class="form-group">
                        <label>Username</label>
                        <input class="form-control" type="text" name="username" v-model="username" placeholder="Username" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input class="form-control" type="password" name="password" v-model="password"
                            placeholder="Password" />
                    </div>
                    <div>
                        <button class="btn-grp" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>

    </main>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { userLoggedIn } from '@/store/userLoggedIn'

export default {
    /* Access the pinia store for users */
    setup() {
        const store = userLoggedIn();
        return { 
            v$: useVuelidate({ $autoDirty: true }),
            store
        }
    },
    /* Data that can be assigned to the different inputs in the form */
    data() {
        return {
            username: '',
            password: ''
        }
    },
    validations() {
        return {
            username: { required },
            password: { required }
        }
    }
}
</script>

<style>
.login {
    padding-top: 60px;
    text-align: center;
    justify-content: center;
}

.form-input {
    padding-bottom: 20px;
    padding-top: 10px;
    border: none;
    padding-left: 37.5%;
}

.input-group {
    width: 40%;
    height: 45%;
}

.btn-grp {
    background-color: #c8102e;
    color: white;
    width: 25%;
}
</style>