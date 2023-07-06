<script setup>
import NavBar from '../../../components/NavBar.vue'
import axios from 'axios';
</script>

<script>
import { KeepAlive } from 'vue';

export default {
    name: 'Layout',
    components: {
        KeepAlive
    },
    data() {
        return {
            dataUser: {}
        }
    },
    methods: {
        getUserDetail() {
            if (localStorage.getItem("user")) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`
                    }
                }

                axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/auth/data`, config)
                    .then(response => {
                        this.dataUser = response.data.data
                    })
                    .catch(err => {
                        console.log("Error fetching category questions", err)
                    })
            }
        }
    },
    created() {
        this.getUserDetail()
    }
}
</script>

<template>
    <div class="mt-5 pt-5 h-100">
        <NavBar :user-logged-in="true" />
        <div class="d-flex ">
            <KeepAlive>
                <div class="sidebar-parent sticky-top">
                    <div class="bg-white shadow-sm sidebar  p-4 rounded">
                        <div class="p-2 w-100">
                            <div class="d-flex align-items-center justify-content-center">
                                <div class="img-user-comment rounded-circle">
                                    <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg"
                                        alt="">
                                </div>
                            </div>
                            <h5 class="text-center mt-2">{{ dataUser.username }}</h5>
                        </div>
                        <ul class="list-group mt-3">
                            <li class="list-group-item mb-2 border-0">
                                <router-link to="/admin/dashboard" class="nav-link">Dashboard</router-link>
                            </li>
                            <li class="list-group-item mb-2 border-0">
                                <router-link to="/admin/reports" class="nav-link">Reports</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </KeepAlive>
            <div class="ms-5 w-100">

                <slot />

            </div>
        </div>
    </div>
</template>

<style scoped>
.img-user-comment {
    width: 80px;
    height: 80px;
    overflow: hidden;
    min-width: 35px;
}

.img-user-comment>img {
    width: 100%;
    height: auto;
}

.sidebar {
    width: 15vw;
    height: 100%;
}

.sidebar-parent {
    height: 80vh;
}

.sidebar-parent.sticky-top {
    position: sticky;
    top: 100px;
}

ul.list-group > li.list-group-item > a:hover {
    transform: translateX(4px);
    color: red;
}
</style>