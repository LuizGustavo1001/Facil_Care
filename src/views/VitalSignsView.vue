<template>
  <AppHeader :title="$t('views.vitalSigns.headerTitle')" :leftBtnIcon="icons['chevron-left']"/>
</template>

<style scoped>
</style>

<script setup>
  import AppHeader from "../components/common/AppHeader.vue"
  import {icons} from "../assets/icons/icons.js";
</script>