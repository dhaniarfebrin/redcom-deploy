<script>
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
                <router-link to="/create-question" class="d-flex flex-column text-secondary justify-content-center px-1">
                    <i class="bi bi-plus-circle-fill"></i>
                </router-link>
                <router-link :to="routeProfile" class="d-flex flex-column text-secondary justify-content-center px-1">
                    <i class="bi bi-person-fill"></i>
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

</style>