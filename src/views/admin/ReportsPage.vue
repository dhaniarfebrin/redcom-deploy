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
            getDataLoading: false,
            actionLoading: false
        }
    },
    methods: {
        getDataReport() {
            this.getDataLoading = true
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/admin/getReports`)
                .then(response => {
                    this.getDataLoading = false
                    this.reportsData = response.data.data
                })
                .catch(err => {
                    this.getDataLoading = false

                    console.log("Error fetching category questions", err)
                })
        },
        gotoDetail(id) {
            const routeData = this.$router.resolve({ name: `detail-question`, params: { id: id } });
            window.open(routeData.href, '_blank');
        },
        deletePost(post_id) {
            this.actionLoading = true
            axios.delete(`${import.meta.env.VITE_APP_ROOT_API}api/admin/delete/${post_id}`)
                .then(response => {
                    this.actionLoading = false
                    this.getDataReport()
                    this.$toast.error('The Post Deleted', {
                        duration: 3000,
                        position: 'top'
                    })
                })
                .catch(err => {
                    this.actionLoading = false

                    console.log("Error", err)
                    this.$toast.error(`${error.response}`, {
                        duration: 3000,
                        position: 'top'
                    })
                })
        },
        rejectReport(id) {
            this.actionLoading = true
            axios.delete(`${import.meta.env.VITE_APP_ROOT_API}api/admin/report/delete/${id}`)
                .then(response => {
                    this.actionLoading = false
                    this.getDataReport()
                    this.$toast.warning('The Report Rejected', {
                        duration: 3000,
                        position: 'top'
                    })
                })
                .catch(err => {
                    this.actionLoading = false

                    console.log("Error", err)
                    this.$toast.error(`${error.response}`, {
                        duration: 3000,
                        position: 'top'
                    })
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
        <div class="mt-3 p-5">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Who Reported</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody v-if="getDataLoading">
                    <tr>
                        <td colspan="3">
                            <span class="d-flex my-5 justify-content-center align-items-center">
                                <img src="../../assets/img/loader-red.svg" alt="" width="40" class="mx-auto">
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tbody v-if="reportsData[0]">
                    <tr v-for="report in reportsData" :key="report._id">
                        <td>{{ report.user_id.username }}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                {{ report.reason }}
                                <button class="btn btn-light bg-body-secondary rounded-pill ms-2"
                                    @click="gotoDetail(report.post_id)">Detail</button>
                            </div>
                        </td>
                        <td>
                            <img src="../../assets/img/loader-red.svg" alt="" width="20" class="mx-auto"
                                v-if="actionLoading">
                            <div class="d-flex" v-else>
                                <button class="btn btn-light bg-body-secondary rounded-pill ms-2"
                                    @click="rejectReport(report._id)">
                                    Reject
                                </button>
                                <button class="btn btn-danger rounded-pill ms-2" @click="deletePost(report.post_id)">
                                    Delete Post
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="3">
                            <span class="d-flex my-5 justify-content-center align-items-center">
                                <p>There is no report</p>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </layout>
</template>

<style scoped></style>