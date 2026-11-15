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
        <p class="home-patient-name">
          {{ utils.getTranslate(`utils.hello`) }},
          <span class="bolder-weight">{{ patient?.name ?? "" }}</span>!
        </p>

        <!-- Current Date -->
        <div class="home-patient-date">
          <Badge
              class="bold-weight capitalize-words"
              :text="date.getFullDate()"
              :icon="icons['time-fill']"
              :spacing="PADDING_SIZE.EXTRA_SMALL_1"
          />
        </div>
      </section>
    </header>

    <!-- Main Content -->
    <main class="home-content flex flex-column flex-grow-1">
      <!-- Quick Access -->
      <section class="quick-access flex flex-column gap-05">
        <div class="section-title-container">
          <h2 class="section-title text-uppercase text-muted bolder-weight">Acesso Rápido</h2>
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
      <section class="home-medicines flex flex-column gap-1 flex-grow-1">
        <div class="section-title-container">
          <h2 class="section-title text-uppercase text-muted bolder-weight">{{ utils.getTranslate(`views.${PAGES.HOME}.todaysMedicines`) }}</h2>
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
        :padding="PADDING_SIZE.SMALL"
        :align-center="true"
        class="fixed add-new-medicine-button"
        style="
          align-self: flex-end;
          width: fit-content;
        "
    />

    <NavigationBar :activeItem="mainNavigationBar[PAGES.HOME].id" />
  </div>
</template>

<style scoped>
  .home-view {
    background: var(--color-bg-primary);
    border-radius:  0 0 14px 14px;
  }

  .home-hero {
    color: var(--color-text-inverse);

    background:
        var(--color-bg-brand)
        url("../assets/images/lm-doodles.svg") center / cover;
  }

  .home-patient-card {
    padding:
        var(--spacing-md)
        var(--spacing-md)
        64px;
  }
  .home-patient-name {
    font-size: var(--font-heading-1);
    font-weight: var(--medium-weight);
  }

  .home-patient-date .badge {
    width: fit-content;
  }

  .home-content {
    z-index: 1;
    gap: 32px;
    margin-top: -24px;

    width: 100%;

    padding:
        var(--spacing-xl)
        var(--spacing-md)
        200px;

    background: var(--color-bg-primary);
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
    box-shadow: 0 0 5px 5px var(--color-shadow-subtle);
  }

  .add-new-medicine-button {
    bottom: 5em;
    right: 1em;

    z-index: 8;
  }

  /* DARK MODE */
  .dark .home-hero {
    background:
        var(--color-bg-brand)
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
  import { mainNavigationBar, pages } from "../locales/projectConfig"
  import { homeView } from "../locales/projectConfig"
  import { icons } from "../assets/icons/icons.js"

  import { useSnackbar } from "../composables/components/useSnackbar"
  import { useUtils } from "../composables/useUtils"
  import { useDate } from "../composables/useDate"

  import PatientController from "../controllers/PatientController"
  import MedicineController from "../controllers/MedicineController"

  import { PAGES } from "../constants/sysPages"
  import { PADDING_SIZE } from "../constants/paddindSizes"
  import { HEADER_TYPES, HEADER_VARIANTS } from "../constants/components/appHeader"
  import { BUTTON_TAGS } from "../constants/components/buttons"

  import type { Medicine } from "../interfaces/Medicine"
  import type { Patient } from "../interfaces/Patient"

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
  const medicineController = new MedicineController()

  // STATES
  const patient = ref<Patient | null>(null)
  const medicines = ref<Medicine[]>([])

  // FUNCTIONS
  const getQuickAccessItemTitle = (itemId: string): string => {
    const key = `views.${PAGES.HOME}.quickAccess.${itemId}.title`
    return utils.getTranslate(key)
  }

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    const results = await Promise.all([
        patientController.getPatient(),
        medicineController.getByWeekDay()
    ])

    const [
        patientData,
        medicineData
    ] = results

    if(medicineData.success) {
      medicines.value = medicineData.data as Medicine[]
    }

    patientData.success
        ? patient.value = patientData.data as Patient
        : snackbar.open(patientData.code as WarningCode)
  })
</script>