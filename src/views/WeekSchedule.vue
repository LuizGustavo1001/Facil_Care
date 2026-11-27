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

      <ul class="flex align-center gap-05 overflow-scroll ">
        <li v-for="weekDay in weekScheculeView.weekDaysFormat">
          <Chips
              :label="date.getDayLabel(weekDay.value)"
              :isActive="weekDay.value === selectedDay"
              @click="selectedDay = weekDay.value"
              class="capitalize-words"
          />
        </li>
      </ul>

      <MedicineList :medicineList="dailyMedicines" />
    </main>

    <NavigationBar :activeItem="mainNavigationBar.find(page => page.id === PAGES.WEEK_SCHEDULE)?.id" />
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

  import WeeklyMedicineAdministrationController from "../controllers/WeeklyMedicineAdministrationController"

  import type { IFormattedMedicine } from "../interfaces/IMedicine"

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
  const weeklyAdministrationController = new WeeklyMedicineAdministrationController()

  // OBJECTS
  const dailyMedicines = ref<IFormattedMedicine[]>([])

  // FUNCTIONS
  const loadDailyMedicines = async () => {
    try {
      dailyMedicines.value = await weeklyAdministrationController.loadDailyMedicinesByDay(selectedDay.value) as IFormattedMedicine[]
    } catch(err) {
      console.error("Error loading daily medicines:", err)

      dailyMedicines.value = []
      snackbar.open("DBError" as WarningCode)
    }
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