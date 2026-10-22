<template>
  <div class="view regular">
    <Snackbar
        :isActive="isSnakcbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.open"
    />

    <AppHeader
        :title="getPageTitle(PAGES.REGISTER)"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="navigation.handleReturn"
    />

    <main class="main regular gap-1">
      <section v-if="!addSuccess" class="main-section regular gap-15">
        <form
            v-if="template"
            class="main-form flex flex-column gap-05"
            @submit.prevent="handleSubmit"
        >
          <div class="form-inputs flex flex-column gap-05">
            <component
                v-for="input in template.main.inputs"
                :key="input.id || input.name"
                :is="form.getInputComponent(input.tag)"
                v-bind="form.getInputProps(input, { readOnly: false }, template?.id, null, dynamicData)"
            />
          </div>

          <div
              class="popup-bts flex flex-column gap-05"
          >
            <ActionButton
                v-for="btn in getButtons()"
                :key="btn.id"
                v-bind="form.getBtnProps(btn, FORM_TYPES.CREATE)"
                :aria-disabled="form.isSubmitting"
            />
          </div>
        </form>
      </section>

      <section v-else class="success-section main-section center text-center align-center gap-15">
        <Icon :icon="icons['check-circle-line']" size="50px" padding="sm"/>

        <p>{{ successMessage }}!</p>

        <ActionButton
            tag="button"
            @click="navigation.handleReturn"
            :title="t(`utils.back`)"
            padding="lg"
        />
      </section>

    </main>

    <AppFooter page="register" />
  </div>
</template>

<style scoped>
  .success-section .icon-wrapper{
    background: var(--green-400);
    border-radius: var(--radius-xl);
  }
</style>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import { PAGES } from "../composables/usePages.js"
  import { icons } from "../assets/icons/icons.js"
  import { formTemplates } from "../locales/projectConfig.js"
  import { FORM_TYPES } from "../composables/useForm.js"
  import { VITAL_SIGNS_PAGES, FOLLOW_UPS_PAGES } from "../composables/usePages.js"

  import { useRoute } from "vue-router"
  import { useI18n } from "vue-i18n"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useForm } from "../composables/useForm.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"

  import MedicinesController from "../controllers/MedicineController.js"
  import MedicineRegistriesController from "../controllers/MedicineRegistriesController.js"
  import HealthPlanController from "../controllers/HealthPlanController.js"
  import AllergyController from "../controllers/AllergyController.js"
  import CaregiverController from "../controllers/CaregiverController.js"
  import DoctorController from "../controllers/DoctorController.js"
  import EmergencyContactController from "../controllers/EmergencyContactController.js"
  import FollowUpController from "../controllers/FollowUpController.js"
  import VitalSignController from "../controllers/VitalSignController.js"
  import Icon from "../components/icons/Icon.vue"

  // COMPOSABLES
  const navigation = useNavigation()
  const snackbar = useSnackbar()
  const route = useRoute()
  const form = useForm()
  const { t, te } = useI18n()

  // CONTROLLERS
  const medicineController = new MedicinesController()
  const medicineRegistryController = new MedicineRegistriesController()
  const healthPlanController = new HealthPlanController()
  const allergyController = new AllergyController()
  const caregiverController = new CaregiverController()
  const doctorController = new DoctorController()
  const emergencyContactController = new EmergencyContactController()
  const followUpController = new FollowUpController()
  const vitalSignController = new VitalSignController()

  // COMPUTED PROPERTIES
  // State for dynamic data
  const caregiversList = ref([])
  const addSuccess = ref(false)
  const successMessage = ref("")

  // Search for dynamic data to mount on the screen
  onMounted(async() => {
    try {
      const response = await caregiverController.getAll()
      if (response) {
        caregiversList.value = Array.isArray(response) ? response : (response.data || [])
      }
    } catch (error) {
      console.error("DB Error:", error)
    }
  })

  // Grouping dynamic data
  const dynamicData = computed(() => ({
    caregivers: caregiversList.value
  }))

  // Page's current category within route params
  const currentCategory = computed(() => {
    return route.params.category || null
  })

  // Returns the current form template based on the current category
  const template = computed(() => {
    return formTemplates.find(item => item.id === currentCategory.value) ?? null
  })

  const isSnakcbarOpen = computed(() => snackbar.isActive.value)

  // FUNCTIONS
  const getPageTitle = () => {
    const registerKey = `pageTitle.${PAGES.REGISTER}`
    const currentCategoryKey = `views.register.categories.${currentCategory.value}.title`

    const registerLabel = te(registerKey) ? t(registerKey) : ""
    const currentCategoryLabel = te(currentCategoryKey) ? t(currentCategoryKey) : ""

    return `${registerLabel} ${currentCategoryLabel}`
  }

  // Returns the form buttons based on the selected template
  const getButtons = () => {
    return template.value?.main?.buttons ?? []
  }

  const handleSubmit = async (event) => {
    const formElement = event.currentTarget
    const data = form.extractData(event)
    let result

    if(!formElement.checkValidity()){
      formElement.checkValidity()
      return
    }

    if (currentCategory.value === PAGES.CAREGIVERS) {
      result = await caregiverController.create(data)
    } else if (currentCategory.value === PAGES.HEALTH_PLANS) {
      result = await healthPlanController.create(data)
    } else if (currentCategory.value === PAGES.ALLERGIES) {
      result = await allergyController.create(data)
    } else if (currentCategory.value === PAGES.DOCTORS) {
      result = await doctorController.create(data)
    } else if (currentCategory.value === PAGES.EMERGENCY_CONTACTS) {
      result = await emergencyContactController.create(data)
    } else if (currentCategory.value === PAGES.MEDICINES) {
      result = await medicineController.create(data)
    } else if (currentCategory.value === PAGES.MEDICINE_REGISTRIES) {
      result = await medicineRegistryController.create(data)
    } else if (VITAL_SIGNS_PAGES.includes(currentCategory.value)) {
      result = await vitalSignController.create(data, currentCategory.value)
    } else if (FOLLOW_UPS_PAGES.includes(currentCategory.value)) {
      result = await followUpController.create(data, currentCategory.value)
    }

    if(result && result.success){
      formElement.reset()
      addSuccess.value = !addSuccess.value
      successMessage.value = snackbar.getWarningTitle(result.code)
    }

    snackbar.open(result.code || "DatabaseError")
  }
</script>