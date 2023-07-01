<script setup>
import NavBar from '../components/NavBar.vue';
</script>

<script>
export default {
    data() {
        return {
            passwordFieldType: "password",
            classShowHide: "bi bi-eye-slash"
        }
    },
    methods: {
        togglePasswordFieldType() {
            if (this.passwordFieldType === "text") {
                this.passwordFieldType = "password"
                this.classShowHide = "bi bi-eye-slash"
            } else {
                this.passwordFieldType =  "text"
                this.classShowHide = "bi bi-eye"
            }
        }
    }
}
</script>

<template>
    <div class="container mt-auto h-100">
        <div class="d-flex flex-column justify-content-center align-items-center">
            <h2 class="fw-bold">Register</h2>
            <p class="text-center">Tell us about yourself. We need<br>this information to ensure Redcom as a safe place to learn</p>
            <div class="form-register w-25 mt-4">
                <form action="">
                    <div class="form-group">
                        <label for="" class="form-label">Full Name</label>
                        <input type="text" class="form-control rounded-pill bg-body-secondary">
                    </div>
                    <div class="form-group mt-3">
                        <label for="" class="form-label">Email</label>
                        <input type="email" class="form-control rounded-pill bg-body-secondary">
                    </div>
                    <div class="form-group mt-3">
                        <label for="" class="form-label">Password</label>
                        <div class="input-group mb-3">
                            <input :type="passwordFieldType" class="form-control rounded-start-pill bg-body-secondary">
                            <button type="button" class="bg-body-secondary input-group-text rounded-end-pill" @click="togglePasswordFieldType">
                                <i :class="classShowHide"></i>
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-dark w-100 rounded-pill mt-4 py-2">Register</button>
                </form>
            </div>
            <span class="mt-4">Already have an account? <router-link to="/login" class="text-danger">Login Here</router-link></span>
        </div>
    </div>
</template>