<script setup>
import NavBar from '../components/NavBar.vue';
import CommentComponent from '../components/CommentComponent.vue';
import { KeepAlive, Suspense, TransitionGroup } from 'vue';
import NavBarMobile from '../components/NavBarMobile.vue';
import HeaderTopMobile from '../components/HeaderTopMobile.vue';

import axios from 'axios'
import VueJwtDecode from "vue-jwt-decode";
import linkify from 'linkify-html'
</script>

<script>
export default {
    name: 'DetailQuestionPage',
    components: {
        KeepAlive,
        Suspense,
        TransitionGroup,
        NavBarMobile,
        HeaderTopMobile
    },
    data() {
        return {
            userLoggedIn: Boolean,
            questionData: {},
            commentsData: [],
            createComment: {},
            token: '',
            user_id: '',
            reportData: {},
            isLoading: false,
            isLoadingCreateComment: false
        }
    },
    methods: {
        linkify,
        setQuestionData(data) {
            this.questionData = data
        },
        setCommentsData(data) {
            this.commentsData = data
        },
        getCommentPost() {
            axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/comments?postId=${this.$route.params.id}`)
                .then(response => {
                    this.setCommentsData(response.data.data)
                }).catch(err => {
                    if (err.response.status === 404) {
                        this.commentsData = false
                    } else {
                        console.log("Error fetching question questions", err.response.status)
                    }
                })
        },
        getUserId() {
            if (this.token) {
                const decoded = VueJwtDecode.decode(this.token);
                this.createComment.userId = decoded.aud
            }
        },
        createCommentPost() {
            if (this.token) {
                this.isLoadingCreateComment = true
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`
                    }
                }

                axios.post(`${import.meta.env.VITE_APP_ROOT_API}api/homepage/new-comment`, this.createComment, config)
                    .then(response => {
                        this.getCommentPost()
                        this.$toast.success('Comment Added', {
                            duration: 3000,
                            position: 'top'
                        })
                        this.createComment.text = ''
                        this.isLoadingCreateComment = false
                    })
                    .catch(error => {
                        if (error.response) {
                            this.isLoadingCreateComment = false

                            console.log(error.response.data)
                            this.$toast.error(`${error.response}`, {
                                duration: 3000,
                                position: 'top'
                            })
                        }
                    })
            }
        },
        goBack() {
            window.history.back()
        },
        reportPost(reason) {
            const config = {
                headers: { 'Authorization': `Bearer ${this.token}` }
            }
            this.reportData.reason = reason

            axios.post(`${import.meta.env.VITE_APP_ROOT_API}api/auth/report/${this.$route.params.id}`, this.reportData, config)
                .then(response => {
                    // console.log(response.data.message);
                    this.$toast.warning('This post reported', {
                        duration: 3000,
                        position: 'top'
                    })
                })
                .catch(err => {
                    console.log("Error : ", err.response.data.msg)
                    this.$toast.error(`${err.response}`, {
                        duration: 3000,
                        position: 'top'
                    })
                })
        }
    },
    created() {
        this.token = localStorage.getItem("user")
        this.userLoggedIn = this.token ? true : false
    },
    beforeMount() {
        this.isLoading = true
        axios.get(`${import.meta.env.VITE_APP_ROOT_API}api/posts/${this.$route.params.id}`)
            .then(response => {
                this.isLoading = false
                this.setQuestionData(response.data.data)
            }).catch(err => {
                this.isLoading = false

                console.log(err);
            })

        this.getCommentPost()
    },
    mounted() {
        this.getUserId()
        this.createComment.postId = this.$route.params.id
    }
}
</script>

<template>
    <div class="mb-3">

        <NavBar :userLoggedIn="userLoggedIn" class="d-none d-md-block" />
        <HeaderTopMobile />

        <div class="container mt-5 pt-2">
            <div class="d-flex flex-column align-items-center">
                <div class="mw-50 row g-0 mt-5">
                    <div class="col-md-12 d-flex flex-column">
                        <img src="../assets/img/loader-red.svg" alt="" width="50" class="mx-auto" v-if="isLoading">

                        <div class="border rounded-4 shadow">
                            <div class="d-flex py-2 px-3 border border-bottom align-items-center">
                                <button class="btn" @click="goBack">
                                    <i class="bi bi-arrow-left"></i>
                                </button>
                                <div class="ms-1">Detail Question</div>
                            </div>
                            <div class="d-flex flex-column p-4">
                                <div class="card bg-transparent border border-0">
                                    <div class="d-flex">
                                        <div class="img-user rounded-circle">
                                            <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg"
                                                alt="">
                                        </div>
                                        <div class="ms-3 d-flex flex-column justify-content-center">
                                            <span class="fs-5 username">{{ questionData.user_id ? questionData.user_id.username :
                                                "{Deleted User}" }}</span>
                                            <span class="d-flex">
                                                <p class="fw-light form-text m-0 date">{{ questionData.date_created }} {{
                                                    questionData.time }}</p>
                                                <span class="ms-2 fw-light badge rounded-pill text-bg-secondary">{{
                                                    questionData.kategori_id?.kategori }}</span>
                                            </span>
                                        </div>

                                        <div class="ms-auto" v-if="userLoggedIn">
                                            <button class="btn bg-transparent p-1 text-secondary py-0"
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-exclamation-triangle-fill
                                                "></i></button>
                                        </div>
                                        
                                    </div>
                                    <p class="mt-4 fw-superlight" v-html="linkify(questionData.content)"></p>
                                    <div class="mt-3 border border-0 pt-3 border-top" v-if="userLoggedIn">
                                        <form action="#" v-on:submit.prevent="createCommentPost" class="d-flex">
                                            
                                            <!-- <input type="text" class="form-control bg-body-secondary rounded-pill"
                                                placeholder="write answer here" v-model="createComment.text" name="text"> -->
                                            <textarea type="text" rows="1" class="form-control bg-body-secondary rounded-pill"
                                                placeholder="write answer here" v-model="createComment.text" name="text" wrap="soft"></textarea>

                                            <button type="submit" class="btn btn-dark rounded-circle ms-1"
                                                v-if="isLoadingCreateComment" disabled>
                                                <img src="../assets/img/loader.svg" alt="" width="20" class="mx-auto">
                                            </button>
                                            <button type="submit" class="btn btn-dark rounded-circle ms-1" v-else>
                                                <i class="bi bi-send-fill"></i>
                                            </button>

                                        </form>
                                    </div>
                                    <div class="d-flex mt-3 border border-0 pt-3 border-top justify-content-center align-items-center"
                                        v-else>
                                        <p class="m-0 me-2 fw-bold text-danger">want to answer the question?</p>
                                        <router-link to="/login" class="btn btn-dark rounded-pill px-3">Login</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="border rounded-4 bg-white mt-4 p-3">
                        <h5>Answers</h5>

                        <div v-if="commentsData == false" class="text-center m-0 my-5">No Answers yet</div>
                        <CommentComponent v-else v-for="comment in commentsData" :key="comment._id" :comment="comment" />

                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 px-4 py-4">
                    <h2 class="modal-title fs-5" id="staticBackdropLabel">
                        <i class="bi bi-exclamation-triangle-fill text-danger"></i> Report this post
                    </h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-0 pb-4">
                    <div class="d-flex flex-column">
                        <button class="btn btn-light bg-transparent" data-bs-dismiss="modal"
                            @click="reportPost('contains inappropriate words')">contains inappropriate words</button>
                        <button class="btn btn-light bg-transparent" data-bs-dismiss="modal"
                            @click="reportPost('hate-spreaders')">hate-spreaders</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <NavBarMobile />
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

@media (max-width: 575.98px) {
    .mw-50 {
        width: 98vw;
        padding-top: 0 !important;
        margin-top: 10px !important;
        margin-bottom: 30px;
    }

    .img-user {
        width: 30px;
        height: 30px;
        overflow: hidden;
    }

    span.fs-5.username {
        font-size: small!important;
        font-weight: 600 !important;
    }

    p.date {
        font-size: 10px !important;
    }

    span.badge {
        font-size: 10px !important;
    }

    p.fw-superlight {
        font-size: 14px;
    }

    p.text-danger {
        font-size: small;
    }

    a.btn.btn-dark {
        padding: 0;
        padding-top: 2px;
        padding-bottom: 2px;
        font-size: small;
    }
}
</style>