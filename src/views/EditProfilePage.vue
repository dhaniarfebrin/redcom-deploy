<script setup>
import NavBar from '../components/NavBar.vue';
</script>

<script>
export default {
    name: 'EditProfile',
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
        axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/auth/data`)
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
            
        </div>
    </div>
</template>