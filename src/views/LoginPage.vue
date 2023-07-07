<script setup>
// import NavBar from '../components/NavBar.vue';
import axios from 'axios'
</script>

<script>
export default {
    data() {
        return {
            passwordFieldType: "password",
            classShowHide: "bi bi-eye-slash",
            dataLogin: {},
            messageError: '',
            isLoading: false
        }
    },
    methods: {
        togglePasswordFieldType() {
            if (this.passwordFieldType === "text") {
                this.passwordFieldType = "password"
                this.classShowHide = "bi bi-eye-slash"
            } else {
                this.passwordFieldType = "text"
                this.classShowHide = "bi bi-eye"
            }
        },
        login() {
            this.isLoading = true
            axios.post(`${import.meta.env.VITE_APP_ROOT_API}api/auth/login`, this.dataLogin)
                .then(response => {
                    this.isLoading = false

                    const token = response.data.access_token
                    localStorage.setItem("user", token);
                    this.$router.push({ path: '/question' })
                    this.$toast.success('Login Success', {
                        duration: 4000,
                        position: 'top'
                    })
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.isLoading = false

                        this.messageError = err.response.data.message
                        console.log("Error fetching: ", err.response.data.message)
                    } else {
                        console.log("Error fetching", err.response.status)
                    }
                })
        }
    },
    created() {
        let token = localStorage.getItem("user")
        if (token) {
            return this.$router.push({ path: '/question' }); // Go back to previous page in history stack
        }
    }
}
</script>

<template>
    <div class="container my-auto h-100">
        <div class="d-flex flex-column justify-content-center align-items-center">
            <h3 class="fw-bold">Welcome <span class="text-danger">Back</span></h3>
            <p class="text-center">Get answers in minutes<br>so you can complete your tasks faster.</p>

            <div class="form-login w-25 mt-4">

                <!-- alert -->
                <div class="alert alert-danger alert-dismissible d-flex align-items-center" role="alert"
                    v-if="messageError">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <div class="m-0">
                        {{ messageError }}
                    </div>
                </div>

                <form action="#" v-on:submit.prevent="login">
                    <div class="form-group">
                        <label for="" class="form-label">Email</label>
                        <input type="email" v-model="dataLogin.email" class="form-control rounded-pill bg-body-secondary"
                            required>
                    </div>
                    <div class="form-group mt-3">
                        <label for="" class="form-label">Password</label>
                        <div class="input-group mb-3">
                            <input required :type="passwordFieldType" v-model="dataLogin.password"
                                class="form-control rounded-start-pill bg-body-secondary">
                            <button type="button" class="bg-body-secondary input-group-text rounded-end-pill"
                                @click="togglePasswordFieldType">
                                <i :class="classShowHide"></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-dark w-100 rounded-pill mt-4 py-2" v-if="isLoading" disabled>
                        <img src="../assets/img/loader.svg" alt="" width="30">
                    </button>
                    <button type="submit" class="btn btn-dark w-100 rounded-pill mt-4 py-2" v-else>
                        Login
                    </button>
                </form>
            </div>

            <span class="mt-4">Don't have an account? <router-link to="/register" class="text-danger">Register
                    Here</router-link></span>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 575.98px) {
    .form-login.w-25 {
        width: 80vw !important;
    }
}
</style>