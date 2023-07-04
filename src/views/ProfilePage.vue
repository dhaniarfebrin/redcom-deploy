<script setup>
import NavBar from '../components/NavBar.vue';
import QuestionCard from '../components/QuestionCard.vue';
import axios from 'axios';
</script>

<script>
export default {
    name: 'ProfilePage',
    data() {
        return {
            isVisitor: Boolean,
            userLoggedIn: Boolean,
            userData: {},
            userQuestions: [],
            sumQuestion: 0
        }
    },
    methods: {
        async getUserDetail() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`
                    }
                }

                await axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/auth/data`, config)
                    .then(response => {
                        this.userData = response.data.data
                    })
                    .catch(err => {
                        console.log("Error fetching category questions", err)
                    })

            } catch (err) {
                console.log(err);
            }
        },
        async getUserQuestions() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`
                    }
                }

                await axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/auth/post`, config)
                    .then(response => {
                        this.userQuestions = response.data.data
                        this.sumQuestion = this.userQuestions.length
                    })
                    .catch(err => {
                        console.log("Error fetching category questions", err)
                    })

            } catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        let token = localStorage.getItem("user")
        this.userLoggedIn = token ? true : false
        this.isVisitor = false
        this.getUserDetail()
    },
    mounted() {
        this.getUserQuestions()
    }
}
</script>

<template>
    <div class="">
        <NavBar :user-logged-in="userLoggedIn" />
        <div class="background-img">
            <img src="https://img.freepik.com/free-photo/flat-lay-black-background-with-laptop-coffee-cup-calculator-top-view_169016-36166.jpg?w=1800&t=st=1688220986~exp=1688221586~hmac=501494180e2a9d0ee0781613fb1ccf1fe0e0286b7223bee126c8711fb384206d"
                alt="">
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-5">
                    <div class="d-flex flex-column profile-side align-items-center sticky-top">
                        <div class="user-img rounded-circle shadow-sm">
                            <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg" alt="">
                        </div>
                        <h4 class="mt-2 m-0">{{ userData.username }}</h4>
                        <p class="text-secondary m-0">{{ userData.email }}</p>
                        <span class="form-text"><i class="bi bi-calendar-date"></i> {{ userData.crdAt }}</span>
                        <div class="d-flex flex-column mt-3" v-if="!isVisitor">
                            <router-link class="btn btn-secondary rounded-pill px-4" :to="`/edit-profile/${userData._id}`">
                                Edit Profile
                            </router-link>
                            <!-- <button class="btn btn-outline-danger rounded-pill px-4 mt-2">Change Password</button> -->
                        </div>
                    </div>
                </div>
                <div class="col-md">
                    <div class="border rounded-3 shadow p-5">
                        <div class="d-flex">
                            <h5>My Questions</h5>
                            <div class="ms-2">
                                <span class="badge rounded-pill text-bg-dark fw-light">{{ sumQuestion }}</span>
                            </div>
                        </div>
                        <div class="mt-3">
                            <div class="d-flex flex-column">
                                <QuestionCard v-for="question in userQuestions" :key="question._id" :question="question"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div.background-img {
    margin-top: 85px;
    width: 100vw;
    height: 150px;
    overflow: hidden;
}

div.background-img>img {
    width: 100vw;
    filter: grayscale(100%);
}

div.user-img {
    width: 150px;
    height: 150px;
    overflow: hidden;
}

div.user-img>img {
    width: 100%;
}

div.profile-side.sticky-top {
    top: 120px;
}
</style>