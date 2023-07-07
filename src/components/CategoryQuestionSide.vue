<script>
export default {
    name: 'CategoryQuestionSide',
    props: ['category'],
    methods: {
        sortQuestion() {
            this.$router.push({ path: `/question`, query: { categoryPost: this.category.kategori } }) // search
        }
    },
}
</script>

<template>
    <div class="d-flex category-item w-100 fw-bold">
        <span><i class="bi bi-arrow-right-short fw-bold"></i></span>
        <span class="form-text my-0 ms-1">{{ category.kategori }}</span>
    </div>
</template>

<style scoped>
.category-item:hover {
    color: #dc3545 !important;
    cursor: pointer;
    transform: translateX(4px);
}

.category-item:hover > span.form-text {
    color: #dc3545 !important;
    cursor: pointer;
}

.category-item:active {
    color: #dc3545 !important;
    cursor: pointer;
}
</style>