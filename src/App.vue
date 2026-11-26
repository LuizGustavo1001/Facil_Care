<template>
  <!-- Rendering Views -->
    <routerView v-slot="{ Component }">
      <transition name="page-transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </routerView>
</template>

<style scoped>
  .page-transition-enter-active,
  .page-transition-leave-active {
    transition: all 0.2s ease-out;
  }

  .page-transition-enter-from,
  .page-transition-leave-to {
    opacity: 0;
  }
</style>

<script setup>
  import { RouterView } from 'vue-router'
  import { onMounted } from "vue"
  import { useTheme } from "./composables/useTheme"
  import { useLanguage } from "./composables/useLanguage"
  import { usePersistentStorage } from "./composables/usePersistentStorage"
  import { useUnitSystem } from "./composables/useUnitSystem"

  import NotificationController from "./controllers/NotificationController"
  import WeeklyMedicineAdministrationController from "./controllers/WeeklyMedicineAdministrationController.ts"

  // CONTROLLERS
  const notificationsController = new NotificationController()

  // COMPOSABLES
  const { initToggleTheme } = useTheme()
  const { initLanguage } = useLanguage()
  const { initUnitSystem } = useUnitSystem()
  const { requestPersistence } = usePersistentStorage()
  const medicineAdministrationController = new WeeklyMedicineAdministrationController()

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    initToggleTheme()
    initLanguage()
    initUnitSystem()

    await requestPersistence()
    await notificationsController.removeOlds()
    await medicineAdministrationController.clearPreviousWeek()
  })
</script>