<script>
import NavBarMobile from '../../components/NavBarMobile.vue';
import QuestionCard from '../../components/QuestionCard.vue';
import axios from 'axios';

export default {
    name: "SearchMobilePage",
    components: {
        NavBarMobile,
        QuestionCard
    },
    data() {
        return {
            search: '',
            questionData: [],
            isLoading: false
        }
    },
    methods: {
        async searchQuestion() {
            this.questionsData = []
            this.isLoading = true

            await axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/search?searchPost=${this.search}`)
                .then(response => {
                    this.isLoading = false
                    this.questionsData = response.data.data
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        this.questionsData = []
                        this.questionsData = false
                        this.isLoading = false
                    } else {
                        console.log("Error fetching", err.response.status)
                    }
                })
        }
    }
}
</script>

<template>
    <div class="">
        <nav class="navbar navbar-expand-lg d-block d-md-none fixed-top py-1">
            <div class="container">
                <div class="d-flex align-items-center w-100">
                    <div class="search-form w-100 py-2 d-flex">
                        <input type="text" v-model="search" @keyup="searchQuestion"
                            class="form-control form-control-sm bg-body-secondary rounded-pill w-100" placeholder="Search the question"
                            aria-label="search" aria-describedby="search">
                    </div>
                </div>
            </div>
        </nav>

        <div class="mt-5">
            <div class="d-flex flex-column mt-3">
                <img src="../../assets/img/loader-red.svg" alt="" width="50" class="m-auto" v-if="isLoading">
                <div v-if="questionsData === false">
                    <p class="text-center d-flex align-items-center justify-content-center m-0"><i
                            class="bi bi-x-square me-2"></i> not found</p>
                </div>
                <QuestionCard v-else v-for="question in questionsData" :key="question._id" :question="question" />
            </div>
        </div>

        <NavBarMobile />
    </div>
</template>