<script setup>
import layout from './layout/layout.vue';
import axios from 'axios';
</script>

<script>
export default {
    name: 'ReportsPage',
    data() {
        return {
            reportsData: [] // TODO fetch this dynamically using API call to server side code (not implemented
        }
    },
    mounted() {
        
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
                        <th scope="col">#</th>
                        <th scope="col">Who Reported</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>menganun nganukan</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </layout>
</template>

<style scoped></style>