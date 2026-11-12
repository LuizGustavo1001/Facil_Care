<template>
  <div class="view regular">
    <!-- Register View -->
    <Snackbar
        :isActive="isSnakcbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.open"
    />

    <AppHeader
        :title="getPageTitle()"
    />

    <main class="main regular gap-1">
      <!-- Form Section -->
      <section v-if="!addSuccess" class="main-section regular gap-15">
        <form
            v-if="template"
            class="main-form flex flex-column gap-1"
            @submit.prevent="handleSubmit"
        >
          <div class="form-inputs flex flex-column gap-1">
            <component
                v-for="input in template?.main?.inputs ?? []"
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
                type="submit"
                :aria-disabled="form.isSubmitting"
                style=" min-width: 200px; max-width: 80dvw; align-self: flex-end"
            />
          </div>
        </form>
      </section>

      <!-- Item Registred Successfully Section -->
      <section v-else class=" main-section center text-center align-center gap-15" >
        <Icon :icon="icons['user-smile-fill']" size="50px" padding="sm" :bgColor="BUTTON_COLORS.GREEN" style="border-radius: var(--radius-lg)" />

        <p>{{ successMessage }}!</p>

        <ActionButton
            tag="button"
            @click="navigation.handleReturn"
            :title="utils.getTranslate(`utils.back`)"
            padding="lg"
        />
      </section>

    </main>

    <AppFooter page="register" />
  </div>
</template>

<style scoped>
  .success-section .icon-wrapper {
    background: var(--green-400);
    border-radius: var(--radius-xl);
  }
</style>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { formTemplates } from "../locales/projectConfig"

  import { PAGES } from "../constants/sysPages"
  import { FORM_TYPES } from "../constants/components/form"
  import { VITAL_SIGNS_PAGES, FOLLOW_UPS_PAGES } from "../constants/sysPages"
  import { BUTTON_COLORS } from "../constants/components/buttons"

  import type { WarningCode } from "../types/components/snackbar"
  import type { FollowUpType, VitalSignType } from "../types/sysPages"
  import type { FormRecord } from "../types/components/genericForm"

  import { useRoute } from "vue-router"
  import { useNavigation } from "../composables/useNavigation"
  import { useSnackbar } from "../composables/useSnackbar"
  import { useForm } from "../composables/useForm"
  import { useUtils } from "../composables/useUtils"

  import MedicinesController from "../controllers/MedicineController"
  import HealthPlanController from "../controllers/HealthPlanController"
  import AllergyController from "../controllers/AllergyController"
  import CaregiverController from "../controllers/CaregiverController"
  import DoctorController from "../controllers/DoctorController"
  import EmergencyContactController from "../controllers/EmergencyContactController"
  import FollowUpController from "../controllers/FollowUpController"
  import VitalSignController from "../controllers/VitalSignController"

  import type { Caregiver } from "../interfaces/Caregiver"
  import type { FormRegularTemplate } from "../interfaces/Form"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import Icon from "../components/icons/Icon.vue"

  // TYPES & INTERFACES
  type RegisterResult =
      | Awaited<ReturnType<typeof caregiverController.create>>
      | Awaited<ReturnType<typeof healthPlanController.create>>
      | Awaited<ReturnType<typeof allergyController.create>>
      | Awaited<ReturnType<typeof doctorController.create>>
      | Awaited<ReturnType<typeof emergencyContactController.create>>
      | Awaited<ReturnType<typeof medicineController.create>>
      | Awaited<ReturnType<typeof vitalSignController.create>>
      | Awaited<ReturnType<typeof followUpController.create>>

  // COMPOSABLES
  const navigation = useNavigation()
  const snackbar = useSnackbar()
  const route = useRoute()
  const form = useForm()
  const utils = useUtils()

  // CONTROLLERS
  const medicineController = new MedicinesController()
  const healthPlanController = new HealthPlanController()
  const allergyController = new AllergyController()
  const caregiverController = new CaregiverController()
  const doctorController = new DoctorController()
  const emergencyContactController = new EmergencyContactController()
  const followUpController = new FollowUpController()
  const vitalSignController = new VitalSignController()

  // COMPUTED PROPERTIES
  const isSnakcbarOpen = computed<boolean>(() => snackbar.isActive.value)

  // STATES
  const caregiversList = ref<Caregiver[]>([])
  const addSuccess = ref<boolean>(false)
  const successMessage = ref<string>("")

  // Search for dynamic data to mount on the screen
  onMounted(async() => {
    try {
      const response = await caregiverController.getAll()
      if (response) {
        caregiversList.value = response.data || []
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
  const currentCategory = computed<string | null>(() => {
    const category = route.params.category

    return typeof category === "string" ? category : null
  })

  // Returns the current form template based on the current category
  const template = computed<FormRegularTemplate | null>(() => {
    return formTemplates.find(
        item => item.id === currentCategory.value
    ) ?? null
  })

  // FUNCTIONS
  const getPageTitle = (): string => {
    const registerKey = `pageTitle.${PAGES.REGISTER}`
    const currentCategoryKey = `views.register.categories.${currentCategory.value}.title`

    const registerLabel = utils.getTranslate(registerKey)
    const currentCategoryLabel = utils.getTranslate(currentCategoryKey)

    return `${registerLabel} ${currentCategoryLabel}`
  }

  // Returns the form buttons based on the selected template
  const getButtons = () => {
    return template.value?.main?.buttons ?? []
  }

  const handleRegisterByCategory = async (category: string, formData: FormRecord): Promise<RegisterResult | undefined> => {
    // Cast payload to any / target input type per controller mapping
    const payload = formData as any

    if (category === PAGES.CAREGIVERS) {
      return caregiverController.create(payload)
    }
    if (category === PAGES.HEALTH_PLANS) {
      return healthPlanController.create(payload)
    }
    if (category === PAGES.ALLERGIES) {
      return allergyController.create(payload)
    }
    if (category === PAGES.DOCTORS) {
      return doctorController.create(payload)
    }
    if (category === PAGES.EMERGENCY_CONTACTS) {
      return emergencyContactController.create(payload)
    }
    if (category === PAGES.MEDICINES) {
      return medicineController.create(payload)
    }
    if (VITAL_SIGNS_PAGES.includes(category as VitalSignType)) {
      return vitalSignController.create(payload, category as VitalSignType)
    }
    if (FOLLOW_UPS_PAGES.includes(category as FollowUpType)) {
      return followUpController.create(payload, category as FollowUpType)
    }

    return undefined
  }

  const handleSubmit = async (event: SubmitEvent) => {
    const formElement = event.currentTarget
    if (!(formElement instanceof HTMLFormElement)) return

    const category = currentCategory.value
    const currentTemplate = template.value
    if (!category || !currentTemplate || !formElement.checkValidity()) return

    let data: FormRecord = form.extractData(event, currentTemplate)

    if(data.dateTime) {
      data.dateTime = new Date(data.dateTime as string)
    }

    const result = await handleRegisterByCategory(category, data)

    if (result?.success) {
      formElement.reset()
      addSuccess.value = true
      successMessage.value = snackbar.getWarningTitle(result.code as WarningCode)
    }

    if (result?.code) {
      snackbar.open(result.code as WarningCode)
    }
  }
</script>