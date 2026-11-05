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
              {{ t(`utils.hello`) }}, <span class="bolder-weight">{{ patient.name }}</span>!
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
        :items="mainNavigationBar"
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
    background:
        linear-gradient(to top, var(--color-shadow-default), transparent),
        var(--color-bg-blue);

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

<script setup>
  import { computed, onMounted, ref } from "vue"

  import { mainNavigationBar, pages } from "../locales/projectConfig.js"
  import { icons } from "../assets/icons/icons.js"
  import { PAGES } from "../constants/sysPages.js"
  import { DAY_PERIODS } from "../constants/dayPeriods.js"
  import { BUTTON_COLORS } from "../constants/btnColors.js"

  import { useI18n } from "vue-i18n"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useDate } from "../composables/useDate.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import NavigationBar from "../components/layout/NavigationBar.vue"
  import Icon from "../components/icons/Icon.vue"
  import Badge from "../components/common/Badge.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import NotFoundCard from "../components/feedback/NotFoundCard.vue"

  import PatientController from "../controllers/PatientController.js"
  import MedicineController from "../controllers/MedicineController.js"

  // COMPOSABLES
  const { t, te } = useI18n()
  const snackbar = useSnackbar()
  const utils = useUtils()
  const date = useDate()

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed(() => snackbar.isActive.value)

  // CONTROLLERS
  const patientController = new PatientController()
  const medicineController = new MedicineController()

  // STATES
  const medicines = ref([])
  const patient = ref({})

  // FUNCTIONS
  const getBadgeColor = (schedule) => {
    const formattedTime = date.timeToDate(schedule)

    const dayPeriod = date.getDayPeriod(formattedTime)

    switch (dayPeriod) {
      case DAY_PERIODS.AFTERNOON:
        return BUTTON_COLORS.PURPLE

      case DAY_PERIODS.EVENING:
        return BUTTON_COLORS.ORANGE

      default:
        return BUTTON_COLORS.BLUE
    }
  }

  const getRouteAdminLabel = (route) => {
    const key = `options.routeAdmin.${route}`

    return te(key) ? t(key) : ""
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
      medicines.value = medicineData.data
    }

    patientData.success
        ? patient.value = patientData.data
        : snackbar.open(patientData.code)
  })
</script>