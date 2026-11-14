<template>
  <div class="view regular">
    <!-- Week Schedule (Medicines) -->
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppHeader
        :title="utils.getPageTitle(PAGES['WEEK_SCHEDULE'])"
        :leftIcon="pages[PAGES.WEEK_SCHEDULE].iconFill"
        :hasNotifications="false"
        :type="HEADER_TYPES['NO_BUTTON']"
    />

    <main class="main regular gap-1">
      <div class="section-title-container">
        <p class="section-description text-muted">{{ getPageSubtitle() }}:</p>
      </div>

      <ul class="flex align-center gap-03">
        <li v-for="weekDay in weekScheculeView.weekDaysFormat">
          <Chips
              :label="date.getDayLabel(weekDay.value)"
              :isActive="weekDay.value === selectedDay"
              @click="selectedDay = weekDay.value"
          />
        </li>
      </ul>

      <MedicineList :medicineList="dailyMedicines" />
    </main>

    <NavigationBar :activeItem="mainNavigationBar[PAGES.WEEK_SCHEDULE].id" />
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
  import { computed, ref, watch } from "vue"

  import { PAGES } from "../constants/sysPages"
  import { HEADER_TYPES } from "../constants/components/appHeader"

  import { useUtils } from "../composables/useUtils"
  import { useDate } from "../composables/useDate"
  import { useSnackbar } from "../composables/components/useSnackbar"

  import { mainNavigationBar, pages, weekScheculeView } from "../locales/projectConfig"

  import MedicineController from "../controllers/MedicineController"

  import type { Medicine } from "../interfaces/Medicine"
  import type { WarningCode } from "../types/components/snackbar"

  import NavigationBar from "../components/layout/NavigationBar.vue"
  import AppHeader from "../components/layout/AppHeader.vue"
  import Chips from "../components/common/Chips.vue"
  import MedicineList from "../components/layout/MedicineList.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"

  // COMPOSABLES
  const utils = useUtils()
  const date = useDate()
  const snackbar = useSnackbar()

  // CONSTANTS
  const selectedDay = ref<number>(date.getDayNumber())

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)

  // CONTROLLERS
  const medicineController = new MedicineController()

  // OBJECTS
  const dailyMedicines = ref<Medicine[]>([])

  // FUNCTIONS
  const loadDailyMedicines = async () => {
    const result = await medicineController.getByWeekDay(selectedDay.value)

    if(!result) {
      snackbar.open("DBError" as WarningCode)
      return []
    }

    if(!result.success) {
      snackbar.open(result.code as WarningCode || "DBError")
    }

    dailyMedicines.value = result.data as Medicine[]
  }

  const getPageSubtitle = (): string => {
    const key = `views.${PAGES.WEEK_SCHEDULE}.subtitle`
    return utils.getTranslate(key)
  }

  // WATCHERS
  watch(
      [selectedDay],
      loadDailyMedicines,
      { immediate: true }
  )
</script>