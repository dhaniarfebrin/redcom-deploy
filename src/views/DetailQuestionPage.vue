<script setup>
import NavBar from '../components/NavBar.vue';
import CommentComponent from '../components/CommentComponent.vue';
</script>

<script>
export default {
    name: 'DetailQuestionPage',
    data() {
        return {
            isLoggedIn: true,
        }
    }
}
</script>

<template>
    <div class="mb-3">
        <NavBar :userLoggedIn="isLoggedIn" />
        <div class="container mt-5 pt-2">

            <div class="d-flex flex-column align-items-center">
                <div class="mw-50 row g-0 mt-5">
                    <div class="col-md-12">

                        <div class="border rounded shadow">
                            <div class="d-flex flex-column p-4">
                                <div class="card border border-0">
                                    <div class="d-flex">
                                        <div class="img-user rounded-circle">
                                            <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg"
                                                alt="">
                                        </div>
                                        <div class="ms-3 d-flex flex-column justify-content-center">
                                            <span class="fs-5 fw-bold">Dhaniar Febrin</span>
                                            <span class="d-flex">
                                                <p class="fw-light form-text m-0">21 Juni 2023</p>
                                                <span
                                                    class="ms-2 fw-light badge rounded-pill text-bg-secondary">Programming</span>
                                            </span>
                                        </div>
                                    </div>
                                    <p class="mt-3 fw-superlight">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Optio temporibus quibusdam
                                        nostrum dolores dolorum quisquam placeat quos culpa pariatur.</p>
                                    <div class="d-flex mt-4 border border-0 pt-3 border-top" v-if="isLoggedIn">
                                        <input type="text" class="form-control bg-body-secondary rounded-pill"
                                            placeholder="write answer or comment here">
                                        <button type="button" class="btn btn-dark rounded-circle ms-1"><i
                                                class="bi bi-send-fill"></i></button>
                                    </div>
                                    <div class="d-flex mt-4 border border-0 pt-3 border-top" v-else>
                                        <input type="text" class="form-control bg-body-secondary rounded-pill not-logged-in-form"
                                            placeholder="login first" disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="border rounded bg-white mt-4 p-3">
                        <h5>Comments</h5>

                        <CommentComponent />
                        <CommentComponent />
                        <CommentComponent />
                        <CommentComponent />

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

.img-user {
    width: 50px;
    height: 50px;
    overflow: hidden;
}

.img-user>img {
    width: 100%;
    height: auto;
}

.not-logged-in-form:hover {
    cursor: not-allowed;
}
</style>