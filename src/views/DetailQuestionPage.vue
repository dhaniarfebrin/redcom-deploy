<script setup>
import NavBar from '../components/NavBar.vue';
import CommentComponent from '../components/CommentComponent.vue';
import axios from 'axios'
</script>

<script>
export default {
    name: 'DetailQuestionPage',
    data() {
        return {
            userLoggedIn: Boolean,
            questionData: {},
            commentsData: []
        }
    },
    methods: {
        setQuestionData(data) {
            this.questionData = data
        },
        setCommentsData(data) {
            this.commentsData = data
        }
    },
    beforeMount() {
        let token = localStorage.getItem("user")
        this.userLoggedIn = token ? true : false

        axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/posts/${this.$route.params.id}`)
            .then(response => {
                this.setQuestionData(response.data.data)
            }).catch(err => {
                console.log(err);
            })

        axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/comments?postId=${this.$route.params.id}`)
            .then(response => {
                this.setCommentsData(response.data.data)
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
    }
}
</script>

<template>
    <div class="mb-3">
        <NavBar :userLoggedIn="userLoggedIn" />
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
                                            <span class="fs-5 fw-bold">{{ questionData.user_id.username }}</span>
                                            <span class="d-flex">
                                                <p class="fw-light form-text m-0">{{ questionData.crdAt }}</p>
                                                <span
                                                    class="ms-2 fw-light badge rounded-pill text-bg-secondary">{{ questionData.kategori_id.kategori }}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <p class="mt-3 fw-superlight">{{ questionData.content }}</p>
                                    <div class="d-flex mt-4 border border-0 pt-3 border-top" v-if="userLoggedIn">
                                        <input type="text" class="form-control bg-body-secondary rounded-pill"
                                            placeholder="write answer or comment here">
                                        <button type="button" class="btn btn-dark rounded-circle ms-1"><i
                                                class="bi bi-send-fill"></i></button>
                                    </div>
                                    <div class="d-flex mt-4 border border-0 pt-3 border-top" v-else>
                                        <input type="text"
                                            class="form-control bg-body-secondary rounded-pill not-logged-in-form"
                                            placeholder="login first" disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="border rounded bg-white mt-4 p-3">
                        <h5>Comments</h5>

                        <CommentComponent v-for="comment in commentsData" :key="comment._id" :comment="comment"  />

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