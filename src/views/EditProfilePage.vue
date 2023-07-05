<script setup>
import NavBar from '../components/NavBar.vue';
import axios from 'axios';
</script>

<script>
export default {
    name: 'EditProfilePage',
    data() {
        return {
            userData: {}
        }
    },
    methods: {
        setUserData(data) {
            this.userData = data
        }
    },
    created() {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`
            }
        }

        axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/auth/data`, config)
            .then(response => {
                this.setUserData(response.data.data)
            })
            .catch(err => {
                console.log("Error fetching category questions", err)
            })
    }
}
</script>

<template>
    <div>
        <NavBar :user-logged-in="true" />
        <div class="container mt-5 pt-5">
            <h2>Edit Profil</h2>
        </div>
    </div>
</template>