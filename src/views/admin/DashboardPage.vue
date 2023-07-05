<script setup>
import layout from './layout/layout.vue';
import axios from 'axios';
</script>

<script>
export default {
    name: 'DashboardPage',
    data() {
        return {
            dataDashboard: {}
        }
    },
    methods: {
        getDataDashboard() {
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/admin/dashboard`)
                .then(response => {
                    this.dataDashboard = response.data.data;
                }).catch(err => {
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
                        <span class="w-100 text-end fs-1">{{ dataDashboard.countUsers }}</span>
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
                        <span class="w-100 text-end fs-1">{{ dataDashboard.countPosts }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
    </layout>
</template>

<style scoped></style>