<script setup>
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <div class="d-flex flex-column h-100 bg-body-tertiary">
    <router-view />
    <FooterComponent class="d-none d-md-block" />
  </div>
</template>

<style scoped>
div.d-flex.flex-column.h-100 {
  min-height: 100vh;
}
</style>
