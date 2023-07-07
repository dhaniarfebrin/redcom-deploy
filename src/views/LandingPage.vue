<script setup>
import NavBar from '../components/NavBar.vue';
import CategoryQuestion from '../components/CategoryQuestion.vue';
import HeaderTopMobile from '../components/HeaderTopMobile.vue';
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
    created() {
        let token = localStorage.getItem("user")
        this.userLoggedIn = token ? true : false

        if (token) {
            return this.$router.push({ path: '/question' })
        }
    },
    beforeMount() {
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

        <NavBar :userLoggedIn="userLoggedIn" class="d-none d-md-block" />
        <HeaderTopMobile />

        <div class="container mt-5">
            <div class="row hero">
                <div class="col-md-6 d-flex justify-content-center flex-column pe-3 order-2 order-md-1">
                    <h1 class="fs-1 fw-bold mb-3">From Asking to <span class="text-danger">Understanding</span></h1>
                    <p class="fw-lighter">RedCom is where hundreds of millions of students and education experts share their knowledge, learning together to solve even the most complex problems.</p>
                    <div class="mt-4 d d-none d-md-block">
                        <router-link to="/create-question" class="btn btn-lg btn-dark rounded-pill px-5 py-3">Ask Question</router-link>
                    </div>
                    <div class="mt-4 d d-block d-md-none">
                        <router-link to="/question" class="btn btn-lg btn-dark rounded-pill px-5 py-3">Discover</router-link>
                    </div>
                </div>
                <div class="col-md-6 d-flex justify-content-center align-items-center order-1 order-md-2">
                    <img src="../assets/img/hero2.svg" alt="" class="w-100">
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-4 col-md-2 mb-2" v-for="category in categoriesData" :key="category._id">
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
    min-height: 70vh;
}

@media (max-width: 575.98px) {
    .search-form {
        display: none;
    }

    h1.fs-1 {
        text-align: center;
        font-size: 38px !important;
    }

    p.fw-lighter {
        text-align: center;
        font-size: 14px !important;
    }

    div.container.mt-5 {
        margin-top: 80px !important;
    }

    a.btn.btn-lg {
        margin-bottom: 3rem;
        width: 100%;
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }
}
</style>    
