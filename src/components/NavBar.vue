<script>
// import jwtdecode from "vue-jwt-decode";
import axios from 'axios'

export default {
    name: 'NavBar',
    props: ['userLoggedIn'],
    data() {
        return {
            search: '',
            username: ''
        }
    },
    methods: {
        searchQuestion() {
            this.$router.push({ path: `/question`, query: { searchPost: this.search } }) // search
        },
        logOut() {
            localStorage.removeItem("user");
            this.$router.push("/login");
        },
        async getUserDetail() {
            try {
                if (localStorage.getItem("user")) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("user")}`
                        }
                    }
    
                    await axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/auth/data`, config)
                    .then(response => {
                        this.username = response.data.data.username
                    })
                    .catch(err => {
                        console.log("Error fetching category questions", err)
                    })
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        this.getUserDetail()
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg fixed-top py-3">
        <div class="container">
            <router-link class="navbar-brand fw-bold text-danger position-relative" to="/">
                RedCom
            </router-link>
            <div class="position-absolute top-50 start-50 translate-middle">
                <div class="input-group rounded-pill">
                    <span class="input-group-text bg-body-secondary rounded-start-pill" id="search"><i
                            class="bi bi-search"></i></span>
                    <input type="text" v-model="search" @keyup.enter="searchQuestion"
                        class="form-control bg-body-secondary rounded-end-pill" placeholder="Search the question"
                        aria-label="search" aria-describedby="search">
                </div>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto" v-if="userLoggedIn == false">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link me-3">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="btn btn-dark rounded-pill px-4">Register</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto" v-else>
                    <li class="nav-item d-flex align-items-center me-2">
                        <router-link to="/create-question" class="btn btn-dark rounded-pill px-4">Ask Question</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <div class="d-flex align-items-center justify-conten-center">
                                <div class="img-user-comment rounded-circle">
                                    <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg"
                                        alt="">
                                </div>
                            </div>
                        </a>
                        <ul class="dropdown-menu shadow">
                            <li class="px-3 py-2">
                                <p class="m-0 form-text text-dark ">{{ username }}</p>
                            </li>
                            <hr class="m-1">
                            <li>
                                <router-link to="/profile" class="dropdown-item">Profile</router-link>
                            </li>
                            <li @click="logOut">
                                <a href="#" class="dropdown-item text-danger"><i class="bi bi-box-arrow-right"></i>
                                    Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
input {
    width: 50vh !important;
}

.img-user-comment {
    width: 35px;
    height: 35px;
    overflow: hidden;
    min-width: 35px;
}

.img-user-comment>img {
    width: 100%;
    height: auto;
}

a.nav-link.dropdown-toggle::after {
    display: none;
}
</style>