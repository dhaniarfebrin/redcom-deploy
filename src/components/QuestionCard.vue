<script>
import axios from 'axios'

export default {
    name: 'QuestionCard',
    props: ['question'],
    computed: {
        showBtnDelete() {
            return this.$route.meta?.showQuestionDelete
        }
    },
    methods: {
        deletePost(id) {
            axios.delete(`${import.meta.env.VITE_APP_ROOT_API}api/posts/delete/${id}`)
                .then(response => {
                    // this.$router.push({ path: '/profile' })
                    this.$emit("callGetQuestion")
                })
                .catch(err => {
                    console.log("Error", err)
                })
        }
    }
}
</script>

<template>
    <div class="card bg-transparent border border-0 border-top p-4">
        <div class="d-flex w-100">
            <div class="img-user rounded-circle">
                <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg" alt="">
            </div>
            <div class="ms-3 d-flex align-items-center w-100">
                <div class="d-flex flex-column">
                    <span class="fs-5">{{ question.user_id ? question.user_id.username : "{Deleted User}" }}</span>
                    <span class="form-text m-0">{{ question.date_created }} {{ question.time }}</span>
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
                <button class="btn btn-outline-danger me-1" v-if="showBtnDelete" @click="deletePost(question._id)"><i
                        class="bi bi-trash"></i></button>
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

.img-user>img {
    width: 100%;
    height: auto;
}
</style>