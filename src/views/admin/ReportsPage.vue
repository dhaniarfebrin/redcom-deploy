<script setup>
import layout from './layout/layout.vue';
import axios from 'axios';
</script>

<script>
export default {
    name: 'ReportsPage',
    data() {
        return {
            reportsData: [], // TODO fetch this dynamically using API call to server side code (not implemented,
        }
    },
    methods: {
        getDataReport() {
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/admin/getReports`)
                .then(response => {
                    this.reportsData = response.data.data
                })
                .catch(err => {
                    console.log("Error fetching category questions", err)
                })
        },
        gotoDetail(id) {
            const routeData = this.$router.resolve({ name: `detail-question`, params: { id: id } });
            window.open(routeData.href, '_blank');
        },
        deletePost(post_id) {
            axios.delete(`${import.meta.env.VITE_APP_ROOT_API}api/admin/delete/${post_id}`)
                .then(response => {
                    this.getDataReport()
                })
                .catch(err => {
                    console.log("Error fetching category questions", err)
                })
        }
    },
    mounted() {
        this.getDataReport()
    }
}
</script>

<template>
    <layout>
        <h3 class="mt-4">Reports</h3>
        <div class="mt-3">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Who Reported</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="report in reportsData" :key="report._id">
                        <td>{{ report.user_id.username }}</td>
                        <td>{{ report.reason }}</td>
                        <td class="d-flex">
                            <button class="btn btn-light bg-body-secondary rounded-pill"
                                @click="gotoDetail(report.post_id)">Detail</button>
                            <button class="btn btn-danger rounded-pill ms-2" @click="deletePost(report.post_id)">Delete
                                Post</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </layout>
</template>

<style scoped></style>