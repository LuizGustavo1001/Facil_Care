<template>
  <div class="view regular">
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

    <AppHeader
        :title="utils.getPageTitle(PAGES['EMERGENCY_DATA'])"
        :leftBtnIcon="icons['chevron-left']"
        :hasNotifications="false"
        @return-page="navigation.handleReturn"
    />

    <main class="main regular gap-2">
      <section
          v-for="content in dynamicSections"
          :key="content.id"
          class="main-section regular gap-1"
      >
        <div class="section-title-container">
          <div class="flex gap-03 align-center">
            <Icon :icon="content.icon" size="25px" />
            <h2 class="section-title">{{ getSectionTitle(content) }}</h2>
          </div>

          <p
              v-if="getSectionTitle(content)"
              class="section-description text-muted"
          >
            {{ getSectionSubtitle(content) }}
          </p>
        </div>

        <ul class="item-list flex flex-column gap-1">
          <template v-if="content.buttons?.length">
            <li v-for="btn in content.buttons" :key="btn.id">
              <component
                  :is="buttonComponent(content)"
                  v-bind="getButtonProps(content, btn)"
                  variant="primary"
                  class="width-full"
                  @click="handleButtonAction(content, btn, $event)"
              />
            </li>
          </template>
        </ul>
      </section>
    </main>

    <AppFooter page="emergencyData" />
  </div>
</template>

<style scoped>
.item-list{
  background: var(--color-bg-subtle);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}

</style>

<script setup>
import { computed, onMounted, ref } from "vue"
import { icons } from "../assets/icons/icons.js"

import { emergencyDataView , formTemplates } from "../locales/projectConfig.js"
import { PAGES } from "../composables/usePages.js"

import { useI18n } from "vue-i18n"
import { useNavigation } from "../composables/useNavigation.js"
import { useUtils } from "../composables/useUtils.js"
import { useSnackbar } from "../composables/useSnackbar.js"
import { useDate } from "../composables/useDate.js"
import { useForm } from "../composables/useForm.js"
import { useFormPopup } from "../composables/useFormPopup.js"
import { useUnitSystem } from "../composables/useUnitSystem.js"

import AppHeader from "../components/layout/AppHeader.vue"
import AppFooter from "../components/layout/AppFooter.vue"
import ActionButton from "../components/buttons/ActionButton.vue"
import ActionButtonAlt from "../components/buttons/ActionButtonAlt.vue"
import Snackbar from "../components/feedback/Snackbar.vue"
import AppOverlay from "../components/layout/AppOverlay.vue"
import FormPopup from "../components/layout/popup/FormPopup.vue"
import Icon from "../components/icons/Icon.vue"

import PatientController from "../controllers/PatientController.js"
import MedicineController from "../controllers/MedicineController.js"
import EmergencyContactController from "../controllers/EmergencyContactController.js";
import AllergyController from "../controllers/AllergyController.js";
import HealthPlanController from "../controllers/HealthPlanController.js";
import DoctorController from "../controllers/DoctorController.js";

// COMPOSABLES
const { t, te } = useI18n()
const navigation = useNavigation()
const utils = useUtils()
const snackbar = useSnackbar()
const date = useDate()
const form = useForm()
const formPopup = useFormPopup()
const unit = useUnitSystem()

// COMPUTED PROPERTIES
const isSnackbarOpen = computed(() => snackbar.isActive.value)

const isFormOpen = computed(() => formPopup.isOpen.value)
const formTemplate = computed(() => formPopup.template.value)
const formValues = computed(() => formPopup.values.value)

// CONTROLLERS
const patientController = new PatientController()
const medicineController = new MedicineController()
const emergencyContactController = new EmergencyContactController()
const allergyController = new AllergyController()
const healthPlanController = new HealthPlanController()
const doctorController = new DoctorController()

const patient = ref(null)
const caregivers = ref([])
const healthPlans = ref([])
const doctors = ref([])
const allergies = ref([])
const emergencyContacts = ref([])
const medicines = ref([])

// FUNCTIONS
// Dynamic map of emergency data sections, based at database and translate data (i18n)
const dynamicSections = computed(() => {
  if(!patient.value) return []

  return emergencyDataView.sections.map((section) => {
    let dbButtons = [] // Stores all buttons from section

    section.buttons = section.buttons || []

    switch(section.id){
      case "patient":
        dbButtons = (section.buttons).map((button) => {
          let dbValue = patient.value[button.id]

          if(button.id === 'birthDate'){
            dbValue = date.getFormatted(patient.value[button.id], false)
          }

          if(button.id === 'bloodType'){
            dbValue = utils.getOptionTranslate("bloodType",`${patient.value[button.id]}`)
          }

          return {
            ...button,
            subtitle: dbValue !== undefined && dbValue !== null
                ? String(dbValue)
                : "--"
          }
        })
        break

      case PAGES.EMERGENCY_CONTACTS:
          dbButtons = [
            ...emergencyContacts.value.map((contact) => ({
              id: contact._id,
              title: contact.name,
              subtitle: `${utils.getOptionTranslate("kinship", contact.kinship)} • ${contact.phone || ""}`
            })),
            ...section.buttons
          ]
        break

      case PAGES.ALLERGIES:
        dbButtons = [
          ...allergies.value.map((allergy) => ({
            id: allergy._id,
            title: allergy.name
          })),
          ...section.buttons
        ]
        break

      case PAGES.HEALTH_PLANS:
        dbButtons = [
          ...healthPlans.value.map((plan) => ({
            id: plan._id,
            title: plan.name
          })),
          ...section.buttons
        ]
        break

      case "others": {
        dbButtons = section.buttons.map((button) => {
          let count = 0

          if (button.id === "doctors") {
            count = doctors.value.length
          } else if (button.id === "medicines") {
            count = medicines.value.length
          }

          return {
            ...button,
            subtitle: String(count)
          }
        })
        break
      }
    }

    return {
      ...section,
      buttons: dbButtons
    }
  })
})

/**
 * Popup:
 * - Triggers the current event target (Prevents the popup from closing unexpectedly)
 * - Defines the template data (`popupTemplate`) to be displayed in the popup
 * - Defines the popup context (`sectionId` and `fieldId`) needed to access the corret database table and attribute. Example: `sectionId` = "patient" and `fieldId` = "birthDate"
 *
 * @param { Object } section
 * @param { Object } button
 * @param { Event } event
 **/
const handleButtonAction = (section, button, event) => {
  formPopup.triggerRef.value = event.currentTarget

  if(section.action === "popup") {
    const popupTemplate = formTemplates.find(item => item.id === button.id) ?? null

    let currentInputValues = null
    if(section.id === "patient") {
      currentInputValues = form.getInputValue(patient.value, popupTemplate)
    }

    const context = {
      sectionId: section.id,
      fieldId: button.id
    }

    formPopup.open(popupTemplate, currentInputValues, context)
  }
}

const buttonComponent = (section) => {
  return section.component === "alt"
      ? ActionButtonAlt
      : ActionButton
}

const getButtonProps = (section, button) => {
  return {
    ...getButtonPropsAction(section),
    ...getButtonPropsComponent(section, button)
  }
}

const getButtonPropsComponent = (section, button) => {
  if(section.component === "alt"){
    const title = section.action === "popup"
        ? form.getInputLabel(button.id, button)
        : getButtonTitle(section, button)

    return {
      leftIcon: button.icon,
      color: button.color,
      title: title,
      description: getButtonSubtitle(section, button),
      to: button.route || undefined
    }
  }

  return { // section.component === "default"
    title: getButtonTitle(section, button),
    description: getButtonSubtitle(section, button),
    padding: "lg"
  }
}

const getButtonPropsAction = (section) => {
  if(section.action === "popup"){
    return {
      rightIcon: icons["pencil-line"],
      tag: "button",
      ref: formPopup.triggerRef
    }
  }

  if(section.action === "externalLink"){
    return {
      rightIcon: icons["external-link"],
      target: "_blank"
    }
  }

  if(section.action === "internalLink"){
    return {
      tag: "router",
      rightIcon: icons["chevron-right"]
    }
  }

  // section.action === "default" or nothing
  return {
    tag: "button"
  }
}

const getButtonTitle = (section, button) => {
  return button.title
      ? button.title
      : te(`views.emergencyData.sections.${section.id}.buttons.${button.id}.title`)
          ? t(`views.emergencyData.sections.${section.id}.buttons.${button.id}.title`)
          : ""
}

const getButtonSubtitle = (section, button) => {
  // 1. Gets from database
  if(button.subtitle) return button.subtitle

  // 2. Gets from translate or Fallback
  return te(`views.emergencyData.sections.${section.id}.buttons.${button.id}.subtitle`)
      ? t(`views.emergencyData.sections.${section.id}.buttons.${button.id}.subtitle`)
      : ""
}

const getSectionTitle = (section) => {
  return te(`views.emergencyData.sections.${section.id}.title`)
      ? t(`views.emergencyData.sections.${section.id}.title`)
      : ""
}

const getSectionSubtitle = (section) => {
  return te(`views.emergencyData.sections.${section.id}.subtitle`)
      ? t(`views.emergencyData.sections.${section.id}.subtitle`)
      : ""
}

const handleSubmit = async (formData) => {
  const context = formPopup.context.value
  if(!context) return

  const cleanData = JSON.parse(JSON.stringify(formData))

  let result = null
  if(context.sectionId === "patient"){
    result = await form.executeDBSubmit(() => patientController.update(cleanData))
  }

  if(!result) return

  if(result && result.success){
    patient.value = result.data
    formPopup.close()
    snackbar.open(result.code)
  }

  snackbar.open(result.code)
}

onMounted(async () => {
  const results = await Promise.all([
      patientController.getPatient(),
      medicineController.getAll(),
      allergyController.getAll(),
      healthPlanController.getAll(),
      doctorController.getAll(),
      emergencyContactController.getAll(),
  ])

  const [
      patientData,
      medicineData,
      allergyData,
      healthPlanData,
      doctorData,
      emergencyContactData
  ] = results

  if(patientData.success){
    patient.value = patientData.data
  }else{
    snackbar.open(patientData.code)
  }

  if (medicineData.success) medicines.value = medicineData.data
  if (allergyData.success) allergies.value = allergyData.data
  if (healthPlanData.success) healthPlans.value = healthPlanData.data
  if (doctorData.success) doctors.value = doctorData.data
  if (emergencyContactData.success) emergencyContacts.value = emergencyContactData.data
})
</script>