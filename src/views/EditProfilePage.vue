<script setup>
import NavBar from '../components/NavBar.vue';
import NavBarMobile from '../components/NavBarMobile.vue';
import HeaderTopMobile from '../components/HeaderTopMobile.vue';

import axios from 'axios';
</script>

<script>
export default {
    name: 'EditProfilePage',
    data() {
        return {
            userData: {},
            configRequest: {},
            messageError: '',
            isLoading: false
        }
    },
    methods: {
        setUserData(data) {
            this.userData = data
        },
        editUser() {
            this.isLoading = true
            axios.put(`${import.meta.env.VITE_APP_ROOT_API}api/auth/edit`, this.userData, this.configRequest)
                .then(response => {
                    this.isLoading = false
                    this.$router.push({ path: '/profile' })
                    this.$toast.success('Edit Success', {
                        duration: 3000,
                        position: 'top'
                    })
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        this.isLoading = false

                        this.messageError = err.response.data.msg
                        console.log("Error fetching: ", err.response.data.msg)
                    } else {
                        console.log("Error fetching", err.response)
                    }
                })
        },
        goBack() {
            window.history.back()
        }
    },
    created() {
        this.configRequest = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`
            }
        }

        axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/auth/data`, this.configRequest)
            .then(response => {
                this.setUserData(response.data.data)
            })
            .catch(err => {
                console.log("Error fetching", err)
            })
    }
}
</script>

<template>
    <div>
        <NavBar :user-logged-in="true" class="d-none d-md-block" />
        <HeaderTopMobile />

        <div class="container mt-5 pt-5 w-100 d-flex justify-content-start flex-column">
            <h2 class="my-5">Edit Profile</h2>

            <form action="#" v-on:submit.prevent="editUser" class="w-25 mx-auto">
                <!-- alert -->
                <div class="alert alert-danger alert-dismissible d-flex align-items-center" role="alert"
                    v-if="messageError">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <div class="m-0 message-error">
                        {{ messageError }}
                    </div>
                </div>

                <div class="form-group mb-3">
                    <label for="" class="form-label">Username</label>
                    <input type="text" class="form-control rounded-pill bg-body-secondary" required
                        v-model="userData.username">
                </div>
                <div class="form-group">
                    <label for="" class="form-label">Email</label>
                    <input type="email" v-model="userData.email" class="form-control rounded-pill bg-body-secondary"
                        required>
                </div>
                <button type="submit" class="btn btn-dark w-100 rounded-pill mt-5 py-2" disabled v-if="isLoading">
                    <img src="../assets/img/loader.svg" alt="" width="25" class="mx-auto">
                </button>
                <button type="submit" class="btn btn-dark w-100 rounded-pill mt-5 py-2" v-else>Save</button>
                <button type="button" class="btn bg-body-secondary w-100 rounded-pill mt-3 py-2"
                    @click="goBack">Cancel</button>
            </form>

        </div>
    </div>

    <NavBarMobile />
</template>

<style>
@media (max-width: 575.98px) {
    form.w-25 {
        width: 80vw !important;
    }

    div.message-error {
        font-size: small;
    }
}
</style>