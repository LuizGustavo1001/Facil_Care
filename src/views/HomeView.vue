<template>
  <div class="view regular home-view relative overflow-hidden">
    <!-- Home View -->

    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <!-- Header / Hero -->
    <header class="home-hero flex-shrink">
      <AppHeader
          :title="utils.getPageTitle(PAGES['HOME'])"
          :leftIcon="pages[PAGES.HOME].iconFill"
          :hasNotifications="false"
          :type="HEADER_TYPES['NO_BUTTON']"
          :variant="HEADER_VARIANTS.TRANSPARENT"
      />

      <!-- Patient Information -->
      <section class="home-patient-card flex flex-column gap-05">
        <h1 class="home-patient-name medium-weight">
          {{ utils.getTranslate(`utils.hello`) }},
          <span class="bold-weight">{{ patient?.name ?? "" }}</span>!
        </h1>

        <!-- Current Date -->
        <div class="home-patient-date">
          <Badge
              class="capitalize-words width-fit"
              :text="date.getFullDate()"
              :icon="icons['time-fill']"
              :spacing="BUTTON_PADDING.SMALL"
              style="box-shadow: 0 0 4px 0px var(--color-shadow-default)"
          />
        </div>
      </section>
    </header>

    <!-- Main Content -->
    <main class="home-content flex flex-column flex-grow-1">
      <!-- Quick Access -->
      <section class="quick-access flex flex-column gap-05">
        <div class="section-title-container">
          <h2 class="section-title text-uppercase text-muted">Acesso Rápido</h2>
        </div>

        <div class="quick-access-list flex gap-15 overflow-scroll">
          <FeaturedItem
              v-for="item in homeView.quickAccess"
              :key="item?.id"
              class="list-item"
              :icon="item.iconFill"
              :label="getQuickAccessItemTitle(item.id)"
              :to="item.href"
          />
        </div>
      </section>

      <!-- Today's Medicine -->
      <section class="home-medicines flex flex-column gap-05 flex-grow-1">
        <div class="section-title-container">
          <h2 class="section-title text-uppercase text-muted">{{ utils.getTranslate(`views.${PAGES.HOME}.todaysMedicines`) }}</h2>
        </div>

        <MedicineList :medicineList="medicines" />
      </section>
    </main>

    <!-- Add New Medicine Button -->
    <ActionButton
        :tag="BUTTON_TAGS.ROUTER"
        :to="pages[PAGES.MEDICINES].href"
        :rightIcon="icons['add']"
        :title="utils.getTranslate(`views.${PAGES.HOME}.newMedicine`)"
        :padding="BUTTON_PADDING.MEDIUM"
        class="fixed add-new-medicine-button width-fit"
        style="align-self: flex-end"
    />

    <NavigationBar :activeItem="mainNavigationBar.find(page => page.id === PAGES.HOME)?.id" />
  </div>
</template>

<style scoped>
  .home-view {
    background: var(--color-bg-primary);
    border-radius:  0 0 14px 14px;
  }

  .home-hero {
    background:
        var(--blue-100)
        url("../assets/images/lm-doodles.svg") center / cover;
  }

  .home-patient-card {
    padding:
        var(--spacing-md)
        var(--spacing-md)
        64px;
  }

  .home-content {
    z-index: 1;
    gap: 16px;
    margin-top: -24px;

    width: 100%;

    padding:
        var(--spacing-xl)
        var(--spacing-md)
        200px;

    background: var(--color-bg-primary);
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
    box-shadow: 0 0 10px 2px var(--color-shadow-subtle);
  }

  .add-new-medicine-button {
    bottom: 5em;
    right: 1em;

    z-index: 8;
  }

  /* DARK MODE */
  .dark .home-hero {
    background:
        var(--blue-700)
        url("../assets/images/dm-doodles.svg") center / cover;
  }

  /* HIGH CONTRAST */
  .highContrast .home-hero {
    background: var(--color-bg-subtle);
    color: inherit;
  }
  .highContrast .app-header {
    color: inherit;
  }
  .highContrast .home-content {
    border: 2px solid var(--color-border-default);
  }
</style>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import { mainNavigationBar, pages, homeView } from "../locales/projectConfig"
  import { icons } from "../assets/icons/icons"

  import { useSnackbar } from "../composables/components/useSnackbar"
  import { useUtils } from "../composables/useUtils"
  import { useDate } from "../composables/useDate"

  import PatientController from "../controllers/PatientController"
  import WeeklyMedicineAdministrationController from "../controllers/WeeklyMedicineAdministrationController"

  import { PAGES } from "../constants/sysPages"
  import { HEADER_TYPES, HEADER_VARIANTS } from "../constants/components/appHeader"
  import { BUTTON_PADDING, BUTTON_TAGS } from "../constants/components/appButtons"

  import type { IFormattedMedicine } from "../interfaces/IMedicine"
  import type { IPatient } from "../interfaces/IPatient"

  import type { WarningCode } from "../types/components/snackbar"

  import AppHeader from "../components/layout/AppHeader.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import NavigationBar from "../components/layout/NavigationBar.vue"
  import Badge from "../components/common/Badge.vue"
  import FeaturedItem from "../components/common/FeaturedItem.vue"
  import MedicineList from "../components/layout/MedicineList.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"

  // COMPOSABLES
  const snackbar = useSnackbar()
  const utils = useUtils()
  const date = useDate()

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)

  // CONTROLLERS
  const patientController = new PatientController()
  const weeklyAdministrationController = new WeeklyMedicineAdministrationController()

  // STATES
  const patient = ref<IPatient | null>(null)
  const medicines = ref<IFormattedMedicine[]>([])

  // FUNCTIONS
  const getQuickAccessItemTitle = (itemId: string): string => {
    const key = `views.${PAGES.HOME}.quickAccess.${itemId}.title`
    return utils.getTranslate(key)
  }

  const loadDailyMedicines = async () => {
    try {
      medicines.value = await weeklyAdministrationController.loadDailyMedicinesByDay(date.getDayNumber()) as IFormattedMedicine[]
    } catch(err) {
      console.error("Error loading daily medicines:", err)

      medicines.value = []
      snackbar.open("DBError" as WarningCode)
    }
  }

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    const results = await Promise.all([patientController.getPatient()])

    const [patientData] = results

    await loadDailyMedicines()

    patientData.success
        ? patient.value = patientData.data as IPatient
        : snackbar.open(patientData.code as WarningCode)
  })
</script>