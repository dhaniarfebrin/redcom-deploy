<script setup>
import layout from './layout/layout.vue';
import axios from 'axios';
</script>

<script>
export default {
    name: 'DashboardPage',
    data() {
        return {
            dataDashboard: {},
            isLoading: false
        }
    },
    methods: {
        getDataDashboard() {
            this.isLoading = true
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/admin/dashboard`)
                .then(response => {
                    this.isLoading = false
                    this.dataDashboard = response.data.data;
                }).catch(err => {
                    this.isLoading = false

                    console.log(err);
                })
        }
    },
    mounted() {
        this.getDataDashboard()
    }
}
</script>

<template>
    <layout>
        <h3 class="mt-4">Dashboard</h3>
        <div class="row mt-4 w-100">
            <div class="col-md-3">
                <div class="card shadow-sm border-0 rounded w-100 p-4">
                    <div class="d-flex flex-column">
                        <span class="d-flex">
                            <i class="bi bi-people-fill"></i>
                            <h5 class="ms-2">Users</h5>
                        </span>
                        <img src="../../assets/img/loader-red.svg" alt="" width="40" class="ms-auto" v-if="isLoading">
                        <span class="w-100 text-end fs-1" v-else>{{ dataDashboard.countUsers }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow-sm border-0 rounded w-100 p-4">
                    <div class="d-flex flex-column">
                        <span class="d-flex">
                            <i class="bi bi-stickies-fill"></i>
                            <h5 class="ms-2">Posts</h5>
                        </span>
                        <img src="../../assets/img/loader-red.svg" alt="" width="40" class="ms-auto" v-if="isLoading">
                        <span class="w-100 text-end fs-1" v-else>{{ dataDashboard.countPosts }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
    </layout>
</template>

<style scoped></style>