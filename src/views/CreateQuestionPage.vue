<script setup>
import NavBar from '../components/NavBar.vue';
</script>

<script>
export default {
    name: 'CreateQuestionPage',
    data() {
        return {
            userLoggedIn: Boolean, // TODO get this value from store or cookie after login page is done
        }
    },
    mounted() {
        let token = localStorage.getItem("user")
        this.userLoggedIn = token ? true : false
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
                        <textarea name="question" id="" cols="30" rows="5" class="form-control bg-body-secondary rounded-4 mb-4" placeholder="write question here"></textarea>
                        <select name="category" class="form-select bg-body-secondary rounded-pill" id="">
                            <option selected disabled>Choose category</option>
                            <option >Computer</option>
                            <option >Computer</option>
                            <option >Computer</option>
                            <option >Computer</option>
                            <option >Computer</option>
                        </select>
                        <button type="submit" class="btn mt-5 px-4 py-2 btn-dark rounded-pill" v-if="userLoggedIn">Submit</button>
                        <button type="submit" disabled  class="btn mt-5 px-4 py-2 btn-dark rounded-pill" v-else>Login First</button>
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