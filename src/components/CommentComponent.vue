<script>
export default {
    name: "CommentComponent"
}
</script>

<template>
    <div class="card p-3 border-0 border-top">
        <div class="d-flex">
            <div class="img-user-comment rounded-circle">
                <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg" alt="">
            </div>
            <div class="ms-3">
                <div class="d-flex flex-column">
                    <span class="fw-bold">Dhaniar Febrin</span>
                    <p class="form-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta vero culpa porro.
                        Veniam sed quibusdam esse commodi ipsam. Illo facilis earum vitae magnam qui aperiam molestias, fuga
                        iste eum numquam.</p>
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
</style>