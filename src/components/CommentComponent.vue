<script>
export default {
    name: "CommentComponent",
    data() {
        return {
            is_admin: Boolean
        }
    },
    props: ['comment'],
    mounted() {
        this.is_admin = this.comment.is_admin ? true : false
    }
}
</script>

<template>
    <div class="card p-3 border-0 border-top">
        <div class="d-flex">
            <div class="">
                <div class="img-user-comment rounded-circle">
                    <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg" alt="">
                </div>
            </div>
            <div class="ms-3">
                <div class="d-flex flex-column text-wrap">
                    <div class="d-flex align-items-center">
                        <span class="username">{{comment?.username}}</span>
                        <span class="badge rounded-pill text-bg-danger fw-light ms-1" v-if="is_admin">Admin</span>
                    </div>
                    <div class="form-text comment-text text-wrap">{{comment.text}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.img-user-comment {
    width: 40px;
    height: 40px;
    overflow: hidden;
    min-width: 40px;
}

.img-user-comment>img {
    width: 100%;
    height: auto;
}

@media (max-width: 575.98px) {
    .img-user-comment {
        width: 30px;
        height: 30px;
        min-width: 20px;
    }
    
    span.username {
        font-size: small;
        font-weight: 600;
    }
    
    div.comment-text {
        font-size: 12px;
    }
}
</style>