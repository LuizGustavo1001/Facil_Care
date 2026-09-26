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
  import NotificationsController from "./controllers/NotificationsController.js"

  // CONTROLLERS
  const notificationsController = new NotificationsController()

  // COMPOSABLES
  const { initToggleTheme } = useTheme()
  const { initLanguage } = useLanguage()

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    initToggleTheme()
    initLanguage()
    await notificationsController.removeOldNotifications()
  })
</script>