<template>
  <div class="view regular">
    <!-- Home View -->
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppHeader
        :title="utils.getPageTitle(PAGES['HOME'])"
        :leftIcon="icons['hospital-fill']"
        :hasNotifications="true"
        type="noButton"
    />

    <!-- Main Section -->
    <main class="main regular flex flex-column gap-1">
      <section class="main-section gap-1">
        <!-- Hero -->
        <div class="main-card flex flex-column gap-1 text-center relative overflow-hidden">
          <div>
            <Icon :icon="icons['logo-colorful-bg']" size="50px" />

            <!-- Patient's Name -->
            <p class="main-card-patient-name">
              {{ t(`utils.hello`) }}, <span class="bolder-weight">{{ patient?.name ?? "" }}</span>!
            </p>
          </div>

          <!-- Current Full Date -->
          <div class="text-muted bold-weight flex align-center gap-05 justify-center capitalize-words">
            <Badge
                class="currentDate"
                :text="date.getFullDate()"
                :icon="icons['time-fill']"
                spacing="xs"
            />
          </div>
        </div>
      </section>

      <!-- Today's Medicines List -->
      <section class="main-section regular gap-1">
        <div class="section-title-container flex align-center gap-05">
          <h2 class="section-title text-muted flex-grow-1 truncate-single">{{ t(`views.${PAGES.HOME}.todaysMedicines`) }}:</h2>
        </div>

        <template v-if="medicines.length > 0">
          <!-- List -->
          <ul class="medicines-list buttons-wrapper overflow-auto">
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
                    <span class="capitalize-words medium-weight"> ({{ getRouteAdminLabel(medicine.routeAdmin) }})</span>
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

        <!-- FallBack Card -->
        <NotFoundCard v-else type="noMedicinesToday" size="large" />
      </section>
    </main>

    <NavigationBar
        :activeItem="mainNavigationBar[PAGES.HOME].id"
    />
  </div>
</template>

<style scoped>
  .main-card:before {
    content: "";
    position: absolute;

    height: 100%;
    width: 100%;
    inset: 0;
    background: var(--color-bg-blue);

    z-index: -1;
  }
  .main-card {
    background: url("../assets/images/lm-doodles.svg");
    background-size: contain;

    padding: var(--spacing-xl);
    border-radius: var(--radius-sm);
  }

  .main-card .badge {
    box-shadow: 0 0 2px 2px var(--color-shadow-subtle);
  }

  .main-card .text-muted {
    color: var(--color-text-inverse-muted);
  }

  .main-card-patient-name {
    font-size: var(--font-heading-2);
  }
  .currentDate {
    font-size: var(--font-body-md);
  }

  .medicines-list {
    max-height: 500px;
  }

  .medicines-list .item {
    padding: var(--spacing-md);
    background: var(--color-bg-subtle);
  }

  /* DARK MODE */
  .dark .main-card {
    background: url("../assets/images/dm-doodles.svg");
    background-size: contain;

    color: inherit;
  }

  /* HIGH CONTRAST */
  .highContrast .main-card {
    background: var(--color-bg-subtle);
    color: inherit;
  }
</style>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import { mainNavigationBar, pages } from "../locales/projectConfig"
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