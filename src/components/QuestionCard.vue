<script>
import axios from 'axios'

export default {
    name: 'QuestionCard',
    props: ['question'],
    data() {
        return {
            isLoading: false
        }
    },
    computed: {
        showBtnDelete() {
            return this.$route.meta?.showQuestionDelete
        }
    },
    methods: {
        deletePost(id) {
            this.isLoading = true
            axios.delete(`${import.meta.env.VITE_APP_ROOT_API}api/posts/delete/${id}`)
                .then(response => {
                    this.isLoading = false
                    this.$emit("callGetQuestion")
                    this.$toast.error('The Post Deleted', {
                        duration: 3000,
                        position: 'top'
                    })
                })
                .catch(err => {
                    console.log("Error", err)
                })
        },
        redirectToDetail(id) {
            this.$router.push({ path: `/question/${id}` })
        } 
    }
}
</script>

<template>
    <div class="card bg-transparent border border-0 border-top p-4" @click="redirectToDetail(question._id)">
        <div class="d-flex w-100">
            <div class="img-user rounded-circle">
                <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg" alt="">
            </div>
            <div class="ms-3 d-flex align-items-center w-100">
                <div class="d-flex flex-column">
                    <span class="fs-5 username fw-medium">{{ question.user_id ? question.user_id.username : "{Deleted User}" }}</span>
                    <span class="form-text m-0 date">{{ question.date_created }} {{ question.time }}</span>
                </div>
                <span class="fw-light badge rounded-pill text-bg-secondary ms-auto">{{ question.kategori_id?.kategori
                }}</span>
            </div>
        </div>
        <p class="mt-3 fw-superlight">{{ question.content }}</p>
        <div class="d-flex">
            <div class="d-flex align-items-center">
                <span><i class="bi bi-chat"></i></span>
                <span class="ms-1 my-0 form-text">{{ question.total_comments }}</span>
            </div>
            <div class="ms-auto">
                <button class="btn btn-outline-danger me-1" v-if="showBtnDelete" @click="deletePost(question._id)">
                    <img src="../assets/img/loader.svg" alt="" width="30" class="mx-auto" v-if="isLoading">
                    <i class="bi bi-trash" v-else></i>
                </button>
                <router-link :to="`/question/${question._id}`"
                    class="btn btn-outline-dark rounded-pill px-4">See</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.img-user {
    width: 50px;
    height: 50px;
    overflow: hidden;
}

div.img-user>img {
    width: 100%;
    height: auto;
}

@media (max-width: 575.98px) {
    .img-user {
        width: 40px;
        height: 35px;
    }

    span.fs-5.username {
        font-size: small!important;
        font-weight: 600 !important;
    }

    span.date {
        font-size: 10px !important;
    }

    span.badge {
        font-size: 10px !important;
    }

    p.fw-superlight {
        font-size: small;
    }

    a.btn.btn-outline-dark {
        padding: 1px;
        padding-left: 12px !important;
        padding-right: 12px !important;
        font-size: small;
    }

    button.btn.btn-outline-danger {
        font-size: small;
        padding: 0;
        width: 24px;
        height: 24px;
        margin-right: 12px !important;
    }
}
</style>