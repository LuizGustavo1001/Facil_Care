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
          :leftIcon="icons['hospital-fill']"
          :hasNotifications="false"
          type="noButton"
          variant="transparent"
      />

      <!-- Patient Information -->
      <section class="home-patient-card flex flex-column gap-05">
        <p class="home-patient-name">
          {{ t(`utils.hello`) }},
          <span class="bolder-weight">{{ patient?.name ?? "" }}</span>!
        </p>

        <!-- Current Date -->
        <div class="home-patient-date">
          <Badge
              class="bold-weight capitalize-words"
              :text="date.getFullDate()"
              :icon="icons['time-fill']"
              spacing="xs"
          />
        </div>
      </section>
    </header>

    <!-- Main Content -->
    <main class="home-content flex flex-column">
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
      <section class="home-medicines flex flex-column gap-05 flex-grow-1">
        <div class="section-title-container">
          <h2 class="section-title text-uppercase text-muted bolder-weight">{{ t(`views.${PAGES.HOME}.todaysMedicines`) }}</h2>
        </div>

        <template v-if="medicines.length > 0">
          <ul class="buttons-wrapper overflow-auto" style="height: 500px">
            <template
                v-for="medicine in medicines"
                :key="medicine._id"
            >
              <li
                  v-for="medicineSchedule in medicine.administrationTimes"
                  :key="medicine._id + medicineSchedule"
                  class="flex gap-05 align-center item"
              >
                <Badge :text="medicineSchedule" class="flex-shrink" :color="getBadgeColor(medicineSchedule)" />

                <div class="flex-grow-1">
                  <p class="truncate-single">
                    <span class="bold-weight">{{ medicine.name }}</span>
                    <span class="capitalize-words medium-weight"> ({{ getRouteAdminLabel(medicine.routeAdmin) }}) </span>
                  </p>

                  <p class="text-muted truncate-single">
                    {{ medicine.observations }}
                  </p>
                </div>
              </li>
            </template>
          </ul>

          <!-- Add New Medicine Button -->
          <ActionButton
              tag="router"
              :to="pages[PAGES.MEDICINES].href"
              :rightIcon="icons['add']"
              :title="t(`views.${PAGES.HOME}.newMedicine`)"
              padding="sm"
              :align-center="true"
              style="
                align-self: flex-end;
                width: fit-content;
              "
          />
        </template>

        <NotFoundCard v-else type="noMedicinesToday" size="medium" />
      </section>
    </main>

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

  .home-medicines .item {
    padding: var(--spacing-md);
    background: var(--color-bg-subtle);
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
    border: 1px solid var(--color-border-default);
  }
</style>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import { mainNavigationBar, pages } from "../locales/projectConfig"
  import { homeView } from "../locales/projectConfig"
  import { icons } from "../assets/icons/icons.js"

  import { useI18n } from "vue-i18n"
  import { useSnackbar } from "../composables/useSnackbar"
  import { useUtils } from "../composables/useUtils"
  import { useDate } from "../composables/useDate"

  import AppHeader from "../components/layout/AppHeader.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import NavigationBar from "../components/layout/NavigationBar.vue"
  import Icon from "../components/icons/Icon.vue"
  import Badge from "../components/common/Badge.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import NotFoundCard from "../components/feedback/NotFoundCard.vue"

  import PatientController from "../controllers/PatientController"
  import MedicineController from "../controllers/MedicineController"

  import { PAGES } from "../constants/sysPages"
  import { DAY_PERIODS } from "../constants/dayPeriods"
  import { BUTTON_COLORS } from "../constants/buttonComponent"

  import type { Medicine } from "../interfaces/Medicine"
  import type { Patient } from "../interfaces/Patient"

  import type { WarningCode } from "../types/snackbar"
  import type { DayPeriod } from "../types/date"
  import FeaturedItem from "../components/buttons/FeaturedItem.vue"

  // COMPOSABLES
  const { t } = useI18n()
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
  // Returns the time badge color based at the current day period
  const getBadgeColor = (schedule: string): string => {
    const formattedTime = date.timeToDate(schedule) as Date

    const dayPeriod: DayPeriod = date.getDayPeriod(formattedTime)

    switch (dayPeriod) {
      case DAY_PERIODS.AFTERNOON:
        return BUTTON_COLORS.PURPLE

      case DAY_PERIODS.EVENING:
        return BUTTON_COLORS.ORANGE

      default:
        return BUTTON_COLORS.BLUE
    }
  }

  // Returns the translated route admin
  const getRouteAdminLabel = (route: string): string => {
    const key = `options.routeAdmin.${route}`

    return utils.getTranslate(key)
  }

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