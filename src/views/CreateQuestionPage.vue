<script setup>
import NavBar from '../components/NavBar.vue';
import axios from 'axios'
</script>

<script>
export default {
    name: 'CreateQuestionPage',
    data() {
        return {
            userLoggedIn: Boolean, // TODO get this value from store or cookie after login page is done
            categories: []
        }
    },
    methods: {
        getCategories() {
            axios.get('http://localhost:5000/api/kategori')
                .then(response => {
                    this.categories = response.data.data
                })
                .catch(err => {
                    console.log("Error fetching category questions", err)
                })
        }
    },
    mounted() {
        let token = localStorage.getItem("user")
        this.userLoggedIn = token ? true : false
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
                    <form>
                        <textarea name="question" id="" cols="30" rows="5"
                            class="form-control bg-body-secondary rounded-4 mb-4"
                            placeholder="write question here"></textarea>
                        <select name="category" class="form-select bg-body-secondary rounded-pill" id="">
                            <option selected disabled>Choose category</option>
                            <option v-for="category in categories" :key="category._id" :value="category._id">{{category.kategori}}</option>
                        </select>
                        <button type="submit" class="btn mt-5 px-4 py-2 btn-dark rounded-pill"
                            v-if="userLoggedIn">Submit</button>
                        <div class="d-flex text-center justify-content-center mt-5" v-else>You need to login first</div>
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