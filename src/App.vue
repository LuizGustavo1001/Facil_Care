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
  import { useTheme } from "./composables/useTheme"
  import { useLanguage } from "./composables/useLanguage"
  import { usePersistentStorage } from "./composables/usePersistentStorage"
  import { useUnitSystem } from "./composables/useUnitSystem"

  import NotificationController from "./controllers/NotificationController"

  // CONTROLLERS
  const notificationsController = new NotificationController()

  // COMPOSABLES
  const { initToggleTheme } = useTheme()
  const { initLanguage } = useLanguage()
  const { initUnitSystem } = useUnitSystem()
  const { requestPersistence } = usePersistentStorage()

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    initToggleTheme()
    initLanguage()
    initUnitSystem()

    await requestPersistence()
    await notificationsController.removeOlds()
  })
</script>