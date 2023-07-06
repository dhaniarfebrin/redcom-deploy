<script>
import NavBar from '../components/NavBar.vue';
// import CategoryQuestion from '../components/CategoryQuestion.vue';
import CategoryQuestionSide from '../components/CategoryQuestionSide.vue';
import QuestionCard from '../components/QuestionCard.vue';
import axios from 'axios'
import { KeepAlive, Suspense, TransitionGroup } from 'vue';

export default {
    name: 'QuestionPage',
    components: {
        NavBar,
        CategoryQuestionSide,
        QuestionCard,
        KeepAlive,
        Suspense,
        TransitionGroup
    },
    data() {
        return {
            categoriesData: [],
            questionsData: [],
            userLoggedIn: Boolean
        }
    },
    methods: {
        async getCategories() {
            await axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/kategori`)
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
        async getQuestions() {
            await axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/`)
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
        async sortQuestion() {
            await axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/sort-kategori?kategoriPost=${this.$route.query.categoryPost}`)
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
        async sortQuestionInPage(kategori) {
            await axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/sort-kategori?kategoriPost=${kategori}`)
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
        async searchQuestion() {
            await axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/search?searchPost=${this.$route.query.searchPost}`)
                .then(response => {
                    this.questionsData = response.data.data
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        this.questionsData = []
                        this.questionsData = false
                    } else {
                        console.log("Error fetching question questions", err.response.status)
                    }
                })
        }
    },
    created() {
        let token = localStorage.getItem("user")
        this.userLoggedIn = token ? true : false
    },
    mounted() {
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
        <div class="mt-5">
            <div class="d-flex flex-column align-items-center">

                <!-- category -->
                <!-- <KeepAlive>
                    <div class="mw-50 category mt-4">
                        <div class="row">

                            <div class="col-md-2" v-for="category in categoriesData" :key="category._id">
                                <CategoryQuestion :category="category" />
                            </div>

                        </div>
                    </div>
                </KeepAlive> -->
                <!-- end category -->

                <div class="mw-50 row g-4 mt-5">

                    <!-- category -->
                    <div class="col-md-3">
                        <div class="bg-light p-3 sticky-top category border rounded-3 w-100 shadow-sm">
                            <span class="text-dark fw-bold">Category</span>
                            <div class="d-flex flex-column border-top mt-2">
                                
                                <CategoryQuestionSide v-for="category in categoriesData" @click="sortQuestionInPage(category.kategori)" :key="category._id" :category="category"/>
                                
                            </div>
                        </div>
                    </div>
                    <!-- end category -->

                    <div class="col-md">
                        <div class="border rounded-4 shadow-sm">

                            <!-- have question component -->
                            <div class="d-flex flex-column p-5" v-if="!userLoggedIn">
                                <div class="px-3">
                                    <h1 class="fs-1 fw-semibold">Have a <span class="text-danger">Question</span>?</h1>
                                    <div class="">
                                        <router-link to="/create-question" class="btn btn-lg btn-dark rounded-pill mt-3 px-4">Ask Questions</router-link>
                                    </div>
                                </div>
                            </div>
                            <!-- end have question component -->
                            
                            <Transition name="fade">
                                <Suspense>
                                    <template #default>
                                        <div>
                                            <div v-if="questionsData === false">
                                                <p class="text-center d-flex align-items-center justify-content-center m-0"><i class="bi bi-x-square me-2"></i> not found</p>
                                            </div>
                                            <QuestionCard v-else v-for="question in questionsData" :key="question._id" :question="question" />
                                        </div>
                                    </template>
                                    
                                    <template #fallback>
                                        <h2>wait bang....</h2>
                                    </template>
                                </Suspense>
                            </Transition>

                            
                        </div>
                    </div>

                </div>

            </div>  
        </div>
    </div>
</template>

<style scoped>
.mw-50 {
    width: 50vw;
}

div.sticky-top.category {
    top: 110px;
}
</style>
