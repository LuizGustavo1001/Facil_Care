<template>
  <div class="view regular">
    <!-- Patient Data Vie -->
    <!-- Here you can manage patient's data and execute some system actions -->
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppHeader
        :title="utils.getPageTitle(PAGES['PATIENT_DATA'])"
        :leftIcon="icons['user-fill']"
        :hasNotifications="false"
        :type="HEADER_TYPES['NO_BUTTON']"
    />

    <main class="main flex flex-column gap-15">
      <!-- Patient Data Resume -->
      <section class="main-section regular gap-1">
        <div
            v-if="patient"
            class="patient-info flex gap-05 align-center"
        >
          <Icon :icon="icons['user-smile-fill']" size="30px" padding="2xs" />

          <div class="flex flex-column">
            <h1>{{ patient.name }}</h1>
            <p class="text-muted">{{ age }} {{ utils.getTranslate("utils.years") }} • {{ utils.getOptionTranslate("bloodType", `${patient.bloodType}`) }}</p>
          </div>
        </div>
      </section>

      <!-- Actions List -->
      <section class="main-section regular gap-1">
        <div
            v-for="category in patientDataView.categories"
            :key="category.id"
            class="flex flex-column gap-05"
        >
          <h2 class="category-title text-uppercase"> {{ getCategoryTitle(category.id) }} </h2>

          <!-- List Category -->
          <div class="buttons-wrapper">
            <template
                v-for="button in category.buttons"
                :key="button.id"
            >
              <!-- Category Item -->
              <ActionButtonColorful
                  :tag="BUTTON_TAGS.ROUTER"
                  :to="button.href"
                  :title="getButtonTitle(button.id)"
                  :leftIcon="button.iconFill"
                  :rightIcon="icons['chevron-right']"
                  :color="button?.color ?? null"
              />
            </template>
          </div>
        </div>
      </section>

      <!-- Reset Data Router Button -->
      <section class="main-section regular gap-1">
        <ActionButton
            v-if="patientDataView.delete"
            tag="router"
            :to="`${patientDataView.delete.href}`"
            :leftIcon="patientDataView.delete.iconFill"
            :variant="ACTION_BUTTON_VARIANTS.DESTRUCTIVE"
            :title="utils.getTranslate(`utils.deleteAccount`)"
            :padding="PADDING_SIZE.MEDIUM"
            class="btn"
            style="
              width: fit-content;
              align-self: flex-end;
            "
        />
      </section>
    </main>

    <NavigationBar :activeItem="mainNavigationBar[PAGES.PATIENT_DATA].id" />
  </div>
</template>

<style scoped>
  .category-title {
    font-size: var(--font-heading-3);
    color: var(--color-text-primary-muted);
  }

  .patient-info {
    padding: var(--spacing-md);
    border-radius: var(--radius-sm);
    background: var(--color-bg-blue);

    box-shadow: 0 2px 2px 1px var(--color-shadow-subtle);
  }

  .patient-info h1 {
    font-size: var(--font-body-md);
  }
  .patient-info p {
    font-size: var(--font-body-sm);
  }

  /* HIGH CONTRAST */
  .highContrast .patient-info,
  .highContrast .patient-info p {
    color: var(--color-text-inverse);
  }
</style>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { mainNavigationBar, patientDataView } from "../locales/projectConfig"

  import { PAGES } from "../constants/sysPages"
  import { ACTION_BUTTON_VARIANTS, BUTTON_TAGS } from "../constants/components/buttons"
  import { PADDING_SIZE } from "../constants/paddindSizes"
  import { HEADER_TYPES } from "../constants/components/appHeader"

  import { useUtils } from "../composables/useUtils"
  import { useSnackbar } from "../composables/useSnackbar"
  import { useDate } from "../composables/useDate"

  import PatientController from "../controllers/PatientController"

  import type { Patient } from "../interfaces/Patient"
  import type { WarningCode } from "../types/components/snackbar"

  import AppHeader from "../components/layout/AppHeader.vue"
  import NavigationBar from "../components/layout/NavigationBar.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import Icon from "../components/icons/Icon.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"

  // COMPOSABLES
  const utils = useUtils()
  const snackbar = useSnackbar()
  const date = useDate()

  // CONTROLLERS
  const patientController = new PatientController()
  const patient = ref<Patient | null>(null)

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)

  const age = computed<number | null>(() => { // Patient age
    return date.getAge(new Date((patient.value as Patient).birthDate))
  })

  // FUNCTIONS
  const getButtonTitle = (buttonId: string): string => {
    const key = `pageTitle.${buttonId}`

    return utils.getTranslate(key)
  }

  const getCategoryTitle = (categoryId: string): string => {
    const key = `views.${PAGES.PATIENT_DATA}.${categoryId}.title`

    return utils.getTranslate(key)
  }

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    const result = await patientController.getPatient()

    // Update frontend patient data
    if(result.success) {
      patient.value = result.data as Patient
    } else {
      snackbar.open(result.code as WarningCode)
    }
  })
</script>