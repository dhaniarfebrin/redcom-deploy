<script>
export default {
    name: 'QuestionCard',
    props: ['question']
}
</script>

<template>
    <div class="card border border-0 border-top p-4">
        <div class="d-flex">
            <div class="img-user rounded-circle">
                <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg" alt="">
            </div>
            <div class="ms-3 d-flex align-items-center">
                <span class="fs-5">{{ question.user_id.username }}</span>
            </div>
        </div>
        <p class="mt-3 fw-superlight">{{ question.content }}</p>
        <div class="d-flex">
            <div class="d-flex align-items-center">
                <span class="fw-light badge rounded-pill text-bg-secondary">{{ question.kategori_id.kategori }}</span>
                <span class="ms-2 form-text m-0">{{ question.crdAt }}</span>
            </div>
            <router-link :to="`/question/${question._id}`" class="ms-auto btn btn-outline-dark rounded-pill px-4">See</router-link>
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