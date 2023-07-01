<script setup>
import NavBar from '../../components/NavBar.vue';
</script>

<script>
export default {
    name: 'PageNotFound',
    methods: {
        goBack() {
            window.history.back(); // Go back to previous page in history stack
        }
    }
}
</script>

<template>
    <div class="h-100">
        <NavBar />
        <div class="container d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
            <img src="../../assets/img/404.gif" alt="">
            <button class="btn btn-dark px-4 rounded-pill" @click="goBack">Go Back</button>
        </div>
    </div>
</template>

<style scoped>
div.h-100 {
    height: 80vh !important;
}
</style>