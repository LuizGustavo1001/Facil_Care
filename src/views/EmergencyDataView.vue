<template>
  <div class="view regular">
    <!-- Emergency Data View -->
    <AppOverlay />

    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <FormPopup
        :isOpen="isFormOpen"
        :popupRef="formPopup.popupRef"
        :template="formTemplate"
        :inputValue="formValues"
        @submitForm="handleSubmit"
    />

    <AppHeader :title="utils.getPageTitle(PAGES['EMERGENCY_DATA'])"/>

    <main class="main regular gap-2">
      <!-- Category -->
      <section
          v-for="category in dynamicCategories"
          :key="category.id"
          class="main-section regular gap-05"
      >
        <!-- Category Title -->
        <div class="section-title-container flex">
          <div class="flex-grow-1">
            <h2 class="section-title">{{ getCategoryTitle(category) }}</h2>
            <p
                v-if="getCategoryTitle(category)"
                class="section-description text-muted"
            >
              {{ getCategorySubtitle(category) }}
            </p>
          </div>

          <router-link
              v-if="category.edit"
              :to="category.href as string"
              class="edit-link"
          >
            {{ utils.getTranslate(`utils.edit`) }}
            <Icon :icon="icons['pencil-fill']"/>
          </router-link>
        </div>

        <!-- Category Item List -->
        <div class="item-list buttons-wrapper">
            <component
                :is="buttonComponent(category)"
                v-for="btn in category.buttons"
                :key="btn.id"
                v-bind="getButtonProps(category, btn)"
                class="width-full"
                @click="handleButtonAction(category, btn, $event)"
            />
        </div>
      </section>
    </main>

    <AppFooter page="emergencyData" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  import type { Component } from "vue"
  import { computed, onMounted, ref } from "vue"

  import { icons } from "../assets/icons/icons"
  import { emergencyDataView , formTemplates } from "../locales/projectConfig"

  import { useUtils } from "../composables/useUtils"
  import { useSnackbar } from "../composables/components/useSnackbar"
  import { useDate } from "../composables/useDate"
  import { useForm } from "../composables/components/useForm"
  import { useFormPopup } from "../composables/components/useFormPopup"

  import PatientController from "../controllers/PatientController"
  import MedicineController from "../controllers/MedicineController"
  import EmergencyContactController from "../controllers/EmergencyContactController"
  import AllergyController from "../controllers/AllergyController"
  import HealthPlanController from "../controllers/HealthPlanController"
  import DoctorController from "../controllers/DoctorController"
  import CaregiverController from "../controllers/CaregiverController"

  import type { IPatient } from "../interfaces/IPatient"
  import type { ICaregiver } from "../interfaces/ICaregiver"
  import type { IHealthPlan } from "../interfaces/IHealthPlan"
  import type { IDoctor } from "../interfaces/IDoctor"
  import type { IAllergy } from "../interfaces/IAllergy"
  import type { IEmergencyContact } from "../interfaces/IEmergencyContact"
  import type { IMedicine } from "../interfaces/IMedicine"
  import type { FormPopupTemplate } from "../interfaces/IForm"

  import type { WarningCode } from "../types/components/snackbar"
  import type { FormValues } from "../types/components/appForm"
  import type { FormContext } from "../types/components/appPopup"

  import { PAGES } from "../constants/sysPages"
  import { ACTION_BUTTON_COLORFUL_VARIANTS, BUTTON_PADDING, BUTTON_TAGS } from "../constants/components/appButtons"
  import { BORDER_RADIUS } from "../constants/spacing"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"
  import FormPopup from "../components/layout/popup/FormPopup.vue"
  import Icon from "../components/icons/Icon.vue"


  // TYPES & INTERFACES
  // Emegergency data button template
  interface ButtonConfig {
    id: string
    title?: string
    subtitle?: string
    icon?: string
    iconFill?: string
    color?: string
    href?: string
  }

  // Emegergency data category template
  interface CategoryConfig {
    id: string
    action?: string
    component?: string
    buttons?: ButtonConfig[]
    edit?: boolean
    href?: string
  }

  // COMPOSABLES
  const utils = useUtils()
  const snackbar = useSnackbar()
  const date = useDate()
  const form = useForm()
  const formPopup = useFormPopup()

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)
  const isFormOpen = computed<boolean>(() => formPopup.isOpen.value)
  const formTemplate = computed(() => formPopup.template.value as FormPopupTemplate)
  const formValues = computed(() => formPopup.values.value as FormValues)

  // CONTROLLERS
  const patientController = new PatientController()
  const medicineController = new MedicineController()
  const emergencyContactController = new EmergencyContactController()
  const allergyController = new AllergyController()
  const healthPlanController = new HealthPlanController()
  const doctorController = new DoctorController()
  const caregiverController = new CaregiverController()

  const patient = ref<IPatient | null>(null)
  const caregivers = ref<ICaregiver[]>([])
  const healthPlans = ref<IHealthPlan[]>([])
  const doctors = ref<IDoctor[]>([])
  const allergies = ref<IAllergy[]>([])
  const emergencyContacts = ref<IEmergencyContact[]>([])
  const medicines = ref<IMedicine[]>([])

  // FUNCTIONS
  // Dynamic map of emergency data categories, based at database and translate data (i18n)
  const dynamicCategories = computed<CategoryConfig[]>(() => {
    const currentPatient = patient.value
    if(!currentPatient) return []

    const baseCategories = emergencyDataView.categories as CategoryConfig[]

    return baseCategories.map((category) => {
      let dbButtons: ButtonConfig[] = [] // stores all buttons from each category

      const currentButtons = category.buttons || []

      switch(category.id) {
        case "patient":
          dbButtons = currentButtons.map((button) => {
            let dbValue = currentPatient[button.id as keyof IPatient]

            if(button.id === "birthDate") {
              dbValue = date.getFormatted(currentPatient.birthDate, false)
            }

            if(button.id === "bloodType") {
              dbValue = utils.getOptionTranslate("bloodType", currentPatient.bloodType)
            }

            return {
              ...button,
              subtitle: dbValue !== undefined && dbValue !== null
                  ? String(dbValue)
                  : "---"
            }
          })
              break

        case PAGES.EMERGENCY_CONTACTS:
          dbButtons = [
            ...emergencyContacts.value.map((contact) => ({
              id: String(contact._id),
              title: contact.name,
              subtitle: `${utils.getOptionTranslate("kinship", String(contact.kinship))} • ${contact.phone || ""}`
            })),
            ...currentButtons
          ]
              break

        case PAGES.ALLERGIES:
          dbButtons = [
            ...allergies.value.map((allergy) => ({
              id: String(allergy._id),
              title: allergy.name,
            })),
            ...currentButtons
          ]
              break

        case PAGES.HEALTH_PLANS:
          dbButtons = [
              ...healthPlans.value.map((plan) => ({
                id: String(plan._id),
                title: plan.name
              })),
              ...currentButtons
          ]
              break
        case "others":
          dbButtons = currentButtons.map((button) => {
            let count = 0

            if(button.id === PAGES.DOCTORS) {
              count = doctors.value.length
            } else if(button.id === PAGES.MEDICINES) {
              count = medicines.value.length
            } else if(button.id === PAGES.CAREGIVERS) {
              count = caregivers.value.length
            }

            return {
              ...button,
              subtitle: String(count)
            }
          })
          break
      }

      return {
        ...category,
        buttons: dbButtons
      }
    })
  })

  /**
   * Popup:
   * - Triggers the current event target (Prevents the popup from closing unexpectedly)
   * - Defines the template data (`popupTemplate`) to be displayed in the popup
   * - Defines the popup context (`sectionId` and `fieldId`) needed to access the corret database table and attribute. Example: `categoryId` = "patient" and `fieldId` = "birthDate"
   **/
  const handleButtonAction = (category: CategoryConfig, button: ButtonConfig, event: Event) => {
    formPopup.triggerRef.value = event.currentTarget as HTMLElement

    if(category.action === "popup") {
      const popupTemplate = (formTemplates as FormPopupTemplate[])
          .find(item => item.id === button.id) ?? null

      let currentInputValues: FormValues | null = null

      if(category.id === "patient" && popupTemplate && patient.value) {
        currentInputValues = form.getInputValue(patient.value, popupTemplate as FormPopupTemplate) as FormValues
      }

      const context: FormContext = {
        sectionId: category.id,
        fieldId: button.id
      }

      if(popupTemplate) {
        formPopup.open(popupTemplate, currentInputValues ?? undefined, context)
      }
    }
  }

  // Returns the current button component
  const buttonComponent = (category: CategoryConfig): Component => {
    return category.component === "alt"
        ? ActionButtonColorful
        : ActionButton
  }

  // Returns the current button properties
  const getButtonProps = (category: CategoryConfig, button: ButtonConfig): Record<string, unknown> => {
    return {
      ...getButtonPropsAction(category),
      ...getButtonPropsComponent(category, button)
    }
  }

  // Returns the current button component properties
  const getButtonPropsComponent = (category: CategoryConfig, button: ButtonConfig): Record<string, unknown> => {
    if(category.component === "alt") {
      const title = category.action === "popup"
          ? form.getInputLabel(button.id, button as any)
          : getButtonTitle(category, button)

      return {
        leftIcon: button.icon ?? button.iconFill ?? null,
        color: button.color,
        title: title,
        description: getButtonSubtitle(category, button),
        to: button.href || "#"
      }
    }

    // category.component === "default"
    return {
      title: getButtonTitle(category, button),
      description: getButtonSubtitle(category, button),
      padding: BUTTON_PADDING.MEDIUM,
      variant: ACTION_BUTTON_COLORFUL_VARIANTS.SUBTLE,
      borderRadius: BORDER_RADIUS.SMALL
    }
  }

  // Returns the current button action type
  const getButtonPropsAction = (category: CategoryConfig): Record<string, unknown> => {
    if(category.action === "popup") {
      return {
        rightIcon: icons["pencil-line"],
        tag: BUTTON_TAGS.BUTTON,
        ref: formPopup.triggerRef
      }
    }

    if(category.action === "externalLink") {
      return {
        rightIcon: icons["external-link"],
        target: "_blank"
      }
    }

    if(category.action === "internalLink") {
      return {
        rightIcon: icons["chevron-right"],
        tag: BUTTON_TAGS.ROUTER
      }
    }

    // category.action === "none" or nothing
    return {
      tag: BUTTON_TAGS.BUTTON
    }
  }

  // Returns the translated button title
  const getButtonTitle = (category: CategoryConfig, button: ButtonConfig): string => {
    return button.title
        ? button.title
        : utils.getTranslate(`views.emergencyData.categories.${category.id}.buttons.${button.id}.title`)
  }

  // Returns the translated button subtitle
  const getButtonSubtitle = (category: CategoryConfig, button: ButtonConfig): string => {
    // 1. Gets from database
    if(button.subtitle) return button.subtitle

    // 2. Gets from translate or Fallback
    const key = `views.emergencyData.categories.${category.id}.buttons.${button.id}.subtitle`
    return utils.getTranslate(key)
  }

  // Returns the category translated title
  const getCategoryTitle = (category: CategoryConfig): string => {
    const key = `views.emergencyData.categories.${category.id}.title`
    return utils.getTranslate(key)
  }

  // Returns the category translated subtitle
  const getCategorySubtitle = (category: CategoryConfig): string => {
    const key = `views.emergencyData.categories.${category.id}.subtitle`
    return utils.getTranslate(key)
  }

  // Handle submit form event (updated data)
  const handleSubmit = async (formData: FormValues) => {
    const context = formPopup.context.value as FormContext | null
    if(!context) return

    const cleanData = JSON.parse(JSON.stringify(formData))

    let result = null
    if(context.sectionId === "patient") {
      result = await patientController.update(cleanData)
    }

    if(!result) return

    if(result && result.success) {
      const newPatient = await patientController.getPatient()
      patient.value = newPatient.data as IPatient
      formPopup.close()
    }

    if(result.code) {
      snackbar.open(result.code as WarningCode)
    }
  }

  onMounted(async () => {
    const results = await Promise.all([
      patientController.getPatient(),
      medicineController.getAll(),
      allergyController.getAll(),
      healthPlanController.getAll(),
      doctorController.getAll(),
      emergencyContactController.getAll(),
      caregiverController.getAll()
    ])

    const [
      patientData,
      medicineData,
      allergyData,
      healthPlanData,
      doctorData,
      emergencyContactData,
      caregiverData
    ] = results

    if(patientData.success && patientData.data) {
      patient.value = patientData.data as IPatient
    } else if(patientData.code) {
      snackbar.open(patientData.code as WarningCode)
    }

    if(medicineData.success) medicines.value = medicineData.data as IMedicine[]
    if(allergyData.success) allergies.value = allergyData.data as IAllergy[]
    if(healthPlanData.success) healthPlans.value = healthPlanData.data as IHealthPlan[]
    if(doctorData.success) doctors.value = doctorData.data as IDoctor[]
    if(emergencyContactData.success) emergencyContacts.value = emergencyContactData.data as IEmergencyContact[]
    if(caregiverData.success) caregivers.value = caregiverData.data as ICaregiver[]
  })
</script>