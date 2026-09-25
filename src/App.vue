<template>
  <!-- Rendering Views -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import { onMounted } from "vue"
  import { useTheme } from "./composables/useTheme.js"
  import { useLanguage } from "./composables/useLanguage.js"

  const { initToggleTheme } = useTheme()
  const { initLanguage } = useLanguage()

  onMounted(() => {
    initToggleTheme()
    initLanguage()
  })
</script>