<template>
  <div class="view regular">
    <!-- Patient Data View -->
    <!-- Here you can manage patient's data and execute some system actions -->
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppHeader
        :title="utils.getPageTitle(PAGES['PATIENT_DATA'])"
        :leftIcon="pages[PAGES.PATIENT_DATA].iconFill"
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
          <Icon :icon="icons['emphatize-fill']" size="30px" />

          <div class="flex flex-column">
            <h3>{{ patient.name }}</h3>
            <p>{{ age }} {{ utils.getTranslate("utils.years") }} • {{ utils.getOptionTranslate("bloodType", `${patient.bloodType}`) }}</p>
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
          <h3 class="category-title text-uppercase text-muted"> {{ getCategoryTitle(category.id) }} </h3>

          <menu class="lined-menu">
            <router-link
                class="menu-item"
                v-for="button in category.buttons"
                :key="button.id"
                :to="button.href"
            >
              <span class="flex align-center flex-grow-1 gap-05">
                <Icon :icon="button.iconLine" class="left-icon" size="25px" />
                <span>{{ getButtonTitle(button.id) }}</span>
              </span>

              <Icon :icon="icons['chevron-right']" size="15px" />
            </router-link>
          </menu>
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
            :padding="PADDING_SIZE.SMALL"
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
  .patient-info {
    padding: var(--spacing-md);
    border-radius: var(--radius-sm);
    background: var(--color-bg-brand);

    color: var(--color-text-inverse);
  }


  .patient-info p {
    font-size: var(--font-body-sm);
    font-weight: var(--bold-weight);
    color: var(--color-text-inverse-muted);
  }

  /* HIGH CONTRAST */
  .highContrast .patient-info,
  .highContrast .patient-info p {
    color: var(--color-text-inverse);
  }
</style>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons"
  import { mainNavigationBar, pages, patientDataView } from "../locales/projectConfig"

  import { PAGES } from "../constants/sysPages"
  import { ACTION_BUTTON_VARIANTS } from "../constants/components/appButtons"
  import { PADDING_SIZE } from "../constants/spacing"
  import { HEADER_TYPES } from "../constants/components/appHeader"

  import { useUtils } from "../composables/useUtils"
  import { useSnackbar } from "../composables/components/useSnackbar"
  import { useDate } from "../composables/useDate"

  import PatientController from "../controllers/PatientController"

  import type { IPatient } from "../interfaces/IPatient"
  import type { WarningCode } from "../types/components/snackbar"

  import AppHeader from "../components/layout/AppHeader.vue"
  import NavigationBar from "../components/layout/NavigationBar.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import Icon from "../components/icons/Icon.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"

  // COMPOSABLES
  const utils = useUtils()
  const snackbar = useSnackbar()
  const date = useDate()

  // CONTROLLERS
  const patientController = new PatientController()
  const patient = ref<IPatient | null>(null)

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)

  const age = computed<number | null>(() => { // Patient age
    return date.getAge(new Date((patient.value as IPatient).birthDate))
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
      patient.value = result.data as IPatient
    } else {
      snackbar.open(result.code as WarningCode)
    }
  })
</script>