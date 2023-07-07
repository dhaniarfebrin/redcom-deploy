<script setup>
// import NavBar from '../components/NavBar.vue';
import axios from 'axios';
</script>

<script>
export default {
    data() {
        return {
            passwordFieldType: "password",
            classShowHide: "bi bi-eye-slash",
            dataRegister: {},
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
        register() {
            this.isLoading = true
            axios.post(`${import.meta.env.VITE_APP_ROOT_API}api/auth/signup`, this.dataRegister)
                .then(response => {
                    this.isLoading = false
                    this.$router.push({ path: '/login' })
                    this.$toast.success('Success to Register', {
                        duration: 4000,
                        position: 'top'
                    })
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.isLoading = false

                        this.messageError = err.response.data.msg
                        console.log("Error fetching: ", err.response.data.msg)
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
            <h2 class="fw-bold">Register</h2>
            <p class="text-center">Tell us about yourself. We need<br>this information to ensure Redcom as a safe place to
                learn</p>

            <div class="form-register w-25 mt-4">

                <!-- alert -->
                <div class="alert alert-danger alert-dismissible d-flex align-items-center" role="alert"
                    v-if="messageError">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <div class="m-0 message-error">
                        {{ messageError }}
                    </div>
                </div>

                <form action="#" v-on:submit.prevent="register">
                    <div class="form-group">
                        <label for="" class="form-label">Username</label>
                        <input type="text" class="form-control rounded-pill bg-body-secondary"
                            v-model="dataRegister.username" required>
                    </div>
                    <div class="form-group mt-3">
                        <label for="" class="form-label">Email</label>
                        <input type="email" class="form-control rounded-pill bg-body-secondary" v-model="dataRegister.email"
                            required>
                    </div>
                    <div class="form-group mt-3">
                        <label for="" class="form-label">Password</label>
                        <div class="input-group mb-3">
                            <input :type="passwordFieldType" class="form-control rounded-start-pill bg-body-secondary"
                                v-model="dataRegister.password" required>
                            <button type="button" class="bg-body-secondary input-group-text rounded-end-pill"
                                @click="togglePasswordFieldType">
                                <i :class="classShowHide"></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-dark w-100 rounded-pill mt-4 py-2" v-if="isLoading" disabled>
                        <img src="../assets/img/loader.svg" alt="" width="30">
                    </button>
                    <button type="submit" class="btn btn-dark w-100 rounded-pill mt-4 py-2" v-else>Register</button>
                </form>

            </div>

            <span class="mt-4">Already have an account? <router-link to="/login" class="text-danger">Login
                    Here</router-link></span>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 575.98px) {
    .form-register.w-25 {
        width: 80vw !important;
    }

    .message-error {
        font-size: small;
        margin-left: 8px !important;
    }
}
</style>