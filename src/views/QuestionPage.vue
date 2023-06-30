<script setup>
import NavBar from '../components/NavBar.vue';
import CategoryQuestion from '../components/CategoryQuestion.vue';
import QuestionCard from '../components/QuestionCard.vue';
</script>

<script>
export default {
    name: 'QuestionPage'
}
</script>

<template lang="">
    <div class="mb-5">
        <NavBar />
        <div class="mt-5 pt-5">
            <div class="d-flex flex-column align-items-center">

                <!-- category -->
                <div class="mw-50 category mt-4">
                    <div class="row">
                        <!-- component category -->
                        <div class="col-md-2">
                            <CategoryQuestion />
                        </div>
                        <!-- component category -->
                        <!-- component category -->
                        <div class="col-md-2">
                            <CategoryQuestion />
                        </div>
                        <!-- component category -->
                        <!-- component category -->
                        <div class="col-md-2">
                            <CategoryQuestion />
                        </div>
                        <!-- component category -->
                        <!-- component category -->
                        <div class="col-md-2">
                            <CategoryQuestion />
                        </div>
                        <!-- component category -->
                        <!-- component category -->
                        <div class="col-md-2">
                            <CategoryQuestion />
                        </div>
                        <!-- component category -->
                        <!-- component category -->
                        <div class="col-md-2">
                            <CategoryQuestion />
                        </div>
                        <!-- component category -->
                    </div>
                </div>
                <!-- end category -->

                <div class="mw-50 row g-0 mt-5">
                    <div class="col-md-12">
                        <div class="border rounded shadow-sm">

                            <!-- have question component -->
                            <div class="d-flex flex-column p-5">
                                <div class="px-3">
                                    <h1 class="fs-1 fw-semibold">Have a <span class="text-danger">Question</span>?</h1>
                                    <div class="">
                                        <router-link to="/create-question" class="btn btn-lg btn-dark rounded-pill mt-3 px-4">Ask Questions</router-link>
                                    </div>
                                </div>
                            </div>
                            <!-- end have question component -->

                            <!-- question -->
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <QuestionCard />
                            <!-- end question -->

                        </div>
                    </div>
                </div>

            </div>  
        </div>
    </div>
</template>

<style scoped>
.mw-50 {
    width: 35vw;
}

div.mw-50.category {
    width: 50vw;
}
</style>
