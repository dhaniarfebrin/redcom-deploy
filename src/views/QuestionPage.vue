<script setup>
import NavBar from '../components/NavBar.vue';
import CategoryQuestion from '../components/CategoryQuestion.vue';
import QuestionCard from '../components/QuestionCard.vue';
import axios from 'axios'
</script>

<script>
export default {
    name: 'QuestionPage',
    data() {
        return {
            categoriesData: [],
            questionsData: [],
            userLoggedIn: Boolean
        }
    },
    methods: {
        getCategories() {
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}/api/kategori`)
                .then(response => {
                    this.categoriesData = response.data.data
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        this.categoriesData = []
                    } else {
                        console.log("Error fetching question questions", err.response.status)
                    }
                })
        },
        getQuestions() {
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}/api/homepage/`)
                .then(response => {
                    this.questionsData = response.data.data
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        this.questionsData = []
                    } else {
                        console.log("Error fetching question questions", err.response.status)
                    }
                })
        },
        sortQuestion() {
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/sort-kategori?kategoriPost=${this.$route.query.categoryPost}`)
                .then(response => {
                    this.questionsData = response.data.data
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        this.questionsData = []
                    } else {
                        console.log("Error fetching question questions", err.response.status)
                    }
                })
        },
        searchQuestion() {
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/search?searchPost=${this.$route.query.searchPost}`)
                .then(response => {
                    this.questionsData = response.data.data
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        this.questionsData = []
                    } else {
                        console.log("Error fetching question questions", err.response.status)
                    }
                })
        }
    },
    beforeMount() {
        let token = localStorage.getItem("user")
        this.userLoggedIn = token ? true : false

        this.getCategories()
        if (this.$route.query.categoryPost) {
            return this.sortQuestion()
        } else if (this.$route.query.searchPost) {
            return this.searchQuestion()
        }
        else {
            return this.getQuestions()
        }
    },
    watch: {
        '$route.query.categoryPost': 'sortQuestion',
        '$route.query.searchPost': 'searchQuestion',
    }
}
</script>

<template lang="">
    <div class="mb-5">
        <NavBar :userLoggedIn="userLoggedIn" />
        <div class="mt-5 pt-5">
            <div class="d-flex flex-column align-items-center">

                <!-- category -->
                <div class="mw-50 category mt-4">
                    <div class="row">
                        <!-- component category -->
                        <div class="col-md-2" v-for="category in categoriesData" :key="category._id">
                            <CategoryQuestion :category="category" />
                        </div>
                        <!-- component category -->
                    </div>
                </div>
                <!-- end category -->

                <div class="mw-50 row g-0 mt-5">
                    <div class="col-md-12">
                        <div class="border rounded shadow-sm">

                            <!-- have question component -->
                            <div class="d-flex flex-column p-5">
                                <div class="px-3">
                                    <h1 class="fs-1 fw-semibold">Have a <span class="text-danger">Question</span>?</h1>
                                    <div class="">
                                        <router-link to="/create-question" class="btn btn-lg btn-dark rounded-pill mt-3 px-4">Ask Questions</router-link>
                                    </div>
                                </div>
                            </div>
                            <!-- end have question component -->
                            <div>
                                <QuestionCard v-for="question in questionsData" :key="question._id" :question="question" />
                            </div>

                        </div>
                    </div>
                </div>

            </div>  
        </div>
    </div>
</template>

<style scoped>
.mw-50 {
    width: 35vw;
}

div.mw-50.category {
    width: 50vw;
}
</style>
