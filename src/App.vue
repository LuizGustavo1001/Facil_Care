<template>

  <!-- Rendering Views -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <nav>
    <router-link to="/">Início</router-link>
    <RouterLink to="/vital-signs">Sinais Vitais</RouterLink>
  </nav>

</template>

<script setup>
  import { RouterView, RouterLink } from 'vue-router'
</script>