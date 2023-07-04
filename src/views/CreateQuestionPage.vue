<script setup>
import NavBar from '../components/NavBar.vue';
import axios from 'axios'
import VueJwtDecode from "vue-jwt-decode";
</script>

<script>
export default {
    name: 'CreateQuestionPage',
    data() {
        return {
            userLoggedIn: Boolean, // TODO get this value from store or cookie after login page is done
            categories: [],
            access_token: '',
            dataNewQuestion: {}
        }
    },
    methods: {
        getCategories() {
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/kategori`)
                .then(response => {
                    this.categories = response.data.data
                })
                .catch(err => {
                    console.log("Error fetching category questions", err)
                })
        },
        createQuestion() {
            const config = {
                headers: {'Authorization': `Bearer ${this.access_token}`}
            }

            const decoded = VueJwtDecode.decode(this.access_token);
            this.dataNewQuestion.userId = decoded.aud

            axios.post(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/new-post`, this.dataNewQuestion, config)
                .then(response => {
                    this.$router.push({ path: '/question' })
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        // this.messageError = err.response.data.message
                        console.log("Error fetching: ", err.response.data.message)
                    } else {
                        console.log("Error fetching", err.response.status)
                    }
                })
        }
    },
    created() {
        this.access_token = localStorage.getItem("user")
        this.userLoggedIn = this.access_token ? true : false
        this.getCategories()
    }
}
</script>

<template>
    <div>
        <NavBar :userLoggedIn="userLoggedIn" />
        <div class="container mt-5 pt-5">
            <div class="d-flex justify-content-center">
                <div class="card p-5 shadow-sm mt-5">
                    <h6 class="fw-bold mb-2">Ask Question</h6>
                    <form action="#" v-on:submit.prevent="createQuestion">
                        <textarea name="question" id="" cols="30" rows="5"
                            class="form-control bg-body-secondary rounded-4 mb-4"
                            placeholder="write question here" v-model="dataNewQuestion.content"></textarea>
                        <select name="category" class="form-select bg-body-secondary rounded-pill" id="" v-model="dataNewQuestion.kategoriId">
                            <option selected disabled>Choose category</option>
                            <option v-for="category in categories" :key="category._id" :value="category._id">
                                {{ category.kategori }}</option>
                        </select>
                        <button type="submit" class="btn mt-5 px-4 py-2 btn-dark rounded-pill"
                            v-if="userLoggedIn">Submit</button>
                        <div class="d-flex justify-content-center align-items-center mt-5" v-else>
                            <p class="m-0 me-2">You need to login first</p>
                            <router-link to="/login" class="btn btn-dark rounded-pill px-3">Login</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 35vw;
}
</style>