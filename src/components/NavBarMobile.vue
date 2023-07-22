<script>
import VueJwtDecode from 'vue-jwt-decode'

export default {
    name: 'NavBarMobile',
    data() {
        return {
            userLoggedIn: Boolean,
            routeProfile: ""
        }
    },
    created() {
        const token = localStorage.getItem('user')
        this.userLoggedIn = token ? true : false
        this.routeProfile = this.userLoggedIn ? "/profile" : "/login"

        if (this.userLoggedIn) {
            const token = localStorage.getItem("user")
            const decode = VueJwtDecode.decode(token)

            this.isAdmin = decode.is_admin ? true : false
        }
    }  
}
</script>

<template>
    <nav class="navbar d-block d-md-none fixed-bottom py-3">
        <div class="container w-100">
            <div class="d-flex justify-content-around w-100">
                <router-link to="/question" class="d-flex flex-column text-secondary justify-content-center px-1">
                    <i class="bi bi-house-fill"></i>
                </router-link>
                <router-link to="/search" class="d-flex flex-column text-secondary justify-content-center px-1">
                    <i class="bi bi-search"></i>
                </router-link>
                <router-link to="/create-question" class="d-flex flex-column text-secondary justify-content-center px-1" v-if="!isAdmin">
                    <i class="bi bi-plus-circle-fill"></i>
                </router-link>
                <router-link :to="routeProfile" class="d-flex flex-column text-secondary justify-content-center px-1">
                    <i class="bi bi-person-fill" v-if="!userLoggedIn"></i>
                    <div class="d-flex align-items-center justify-content-center" v-else>
                        <div class="img-user-comment rounded-circle">
                            <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg"
                                alt="">
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<!-- <template>
    <nav class="navbar navbar-expand-lg fixed-top py-3">bang</nav>
</template> -->

<style scoped>

a.text-secondary:hover {
    color: #dc3545 !important;
}

a.text-secondary:active {
    color: #dc3545 !important;
}

a.text-secondary:focus {
    color: #dc3545 !important;
}

.img-user-comment {
    width: 22px;
    height: 22px;
    overflow: hidden;
    min-width: 22px;
}

.img-user-comment>img {
    width: 100%;
    height: auto;
}
</style>