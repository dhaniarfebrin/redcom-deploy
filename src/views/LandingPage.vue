<script setup>
import NavBar from '../components/NavBar.vue';
import CategoryQuestion from '../components/CategoryQuestion.vue';
import axios from 'axios'
</script>

<script>
export default {
    name: 'LandingPage',
    data() {
        return {
            categoriesData: [],
            userLoggedIn: Boolean
        }
    },
    methods: {
        setCategoriesData(data) {
            this.categoriesData = data
        }
    },
    mounted() {
        let token = localStorage.getItem("user")
        this.userLoggedIn = token ? true : false

        axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/kategori`)
            .then(response => {
                this.setCategoriesData(response.data.data)
            })
            .catch(err => {
                console.log("Error fetching category questions", err)
            })

    }
}
</script>

<template lang="">
    <div>
        <NavBar :userLoggedIn="userLoggedIn" />
        <div class="container mt-5">
            <div class="row hero">
                <div class="col-md-6 d-flex justify-content-center flex-column pe-3">
                    <h1 class="fs-1 fw-semibold mb-3">From Asking to <span class="text-danger">Understanding</span></h1>
                    <p class="fw-lighter">RedCom is where hundreds of millions of students and education experts share their knowledge, learning together to solve even the most complex problems.</p>
                    <div class="mt-4">
                        <router-link to="/create-question" class="btn btn-lg btn-dark rounded-pill px-5 py-3">Ask Question</router-link>
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-center">
                    <img src="../assets/img/hero.gif" alt="">
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-md-2" v-for="category in categoriesData" :key="category._id">
                    <CategoryQuestion :category="category" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1.fs-1 {
    font-size: 68px !important;
}

div.row.hero {
    height: 70vh;
}
</style>    
