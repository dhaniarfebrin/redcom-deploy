<script>
export default {
    name: 'HeaderTopMobile',
    data() {
        return {
            search: ''
        }
    },
    methods: {
        searchQuestion() {
            this.$router.push({ path: `/question`, query: { searchPost: this.search } }) // search
        },
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg d-block d-md-none fixed-top py-1">
        <div class="container">
            <div class="d-flex align-items-center w-100">
                <router-link class="navbar-brand fw-bold text-danger position-relative" to="/">
                    RedCom
                </router-link>
                <div class="search-form w-100 d-flex">
                    <input type="text" v-model="search" @keyup="searchQuestion"
                        class="form-control bg-body-secondary rounded-pill w-100" placeholder="Search the question"
                        aria-label="search" aria-describedby="search">
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.search-form > input {
    font-size: small;
    width: 100% !important;
    height: 30px;
}
</style>