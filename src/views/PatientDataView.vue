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
        :hasNotifications="true"
        type="noButton"
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
            <p>{{ age }} {{ t("utils.years") }} • {{ utils.getOptionTranslate("bloodType", `${patient.bloodType}`) }}</p>
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
          <h2 class="category-title text-uppercase"> {{ getCategoryTitle(category) }} </h2>

          <!-- List Category -->
          <div class="buttons-wrapper">
            <template
                v-for="button in category.buttons"
                :key="button.id"
            >
              <!-- Category Item -->
              <ActionButtonColorful
                  tag="router"
                  :to="button.href"
                  :title="getButtonTitle(button)"
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
            variant="destructive"
            :title="t(`utils.deleteAccount`)"
            padding="sm"
            class="btn"
            style="
              width: fit-content;
              align-self: flex-end;
            "
        />
      </section>
    </main>

    <NavigationBar
        :items="mainNavigationBar"
        :activeItem="mainNavigationBar[PAGES.PATIENT_DATA].id"
    />
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
    background: var(--color-bg-hover);
    border: 1px solid var(--color-border-default);
  }

  .patient-info h1 {
    font-size: var(--font-body-md);
  }
  .patient-info p {
    font-size: var(--font-body-sm);
  }
</style>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import { PAGES } from "../constants/sysPages.js"
  import { icons } from "../assets/icons/icons.js"
  import { mainNavigationBar, patientDataView } from "../locales/projectConfig.js"

  import { useUtils } from "../composables/useUtils.js"
  import { useI18n } from "vue-i18n"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useDate } from "../composables/useDate.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import NavigationBar from "../components/layout/NavigationBar.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import Icon from "../components/icons/Icon.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"

  import PatientController from "../controllers/PatientController.js"

  // COMPOSABLES
  const { t, te } = useI18n()
  const utils = useUtils()
  const snackbar = useSnackbar()
  const date = useDate()

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed(() => snackbar.isActive.value)

  const age = computed(() => {
    return date.getAge(new Date(patient.value.birthDate))
  })

  // FUNCTIONS
  const getButtonTitle = (button) => {
    const key = `pageTitle.${button?.id}`

    return te(key) ? t(key) : ""
  }

  const getCategoryTitle = (category) => {
    const key = `views.${PAGES.PATIENT_DATA}.${category.id}.title`

    return te(key) ? t(key) : ""
  }

  // CONTROLLERS
  const patientController = new PatientController()
  const patient = ref({})

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    const result = await patientController.getPatient()

    // Update frontend patient data
    if(result.success) {
      patient.value = result.data
    } else {
      snackbar.open(result.code)
    }
  })
</script>