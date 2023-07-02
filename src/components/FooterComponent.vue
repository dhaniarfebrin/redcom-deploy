<script>
export default {
    name: 'FooterComponent'
}
</script>

<template>
    <div class="container footer">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div class="col-md-4 d-flex align-items-center">
                <router-link to="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                    <span class="fw-bold">RedCom</span>
                </router-link>
                <span class="mb-3 mb-md-0 text-body-secondary">© 2023 Company, Inc</span>
            </div>

            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24">
                            <use xlink:href="#twitter"></use>
                        </svg></a></li>
                <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24">
                            <use xlink:href="#instagram"></use>
                        </svg></a></li>
                <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24">
                            <use xlink:href="#facebook"></use>
                        </svg></a></li>
            </ul>
        </footer>
    </div>
</template>

<style scoped>
div.container.footer {
    margin-top: auto !important;
}
</style>