<template>
  <div class="view regular">
    <AppOverlay />

    <Snackbar
        :isActive="isWarningActive"
        :message="warning.message"
        :type="warning.type || undefined"
        @click="clearWarning"
    />

    <FormPopup
        :isOpen="isFormOpen"
        :popupRef="formPopup.popupRef"
        :template="formTemplate"
        :inputValue="formValues"
        @submitForm="handleSubmit"
    />

    <AppHeader
        :title="getPageTitle(PAGES['EMERGENCY_DATA'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main class="main regular gap-2">
      <section
          v-for="content in dynamicSections"
          :key="content.id"
          class="main-section regular gap-1"
      >
        <div class="section-title">
          <div class="flex gap-05 align-center">
            <Icon :icon="content.icon" size="25px" class="text-muted"/>
            <h2>{{ getSectionTitle(content) }}</h2>
          </div>

          <p
              v-if="getSectionTitle(content)"
              class="text-muted"
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

  import { emergencyDataView } from "../locales/projectConfig.js"
  import { formPopupTemplates } from "../locales/projectConfig.js"

  import { useI18n } from "vue-i18n"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useDate } from "../composables/useDate.js"
  import { useForm } from "../composables/useForm.js"
  import { useFormPopup } from "../composables/useFormPopup.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import ActionButtonAlt from "../components/buttons/ActionButtonAlt.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"
  import FormPopup from "../components/layout/popup/FormPopup.vue"
  import Icon from "../components/icons/Icon.vue"

  import PatientController from "../controllers/PatientController.js"
  import MedicinesController from "../controllers/MedicinesController.js"

  // COMPOSABLES
  const { t, te } = useI18n()
  const { handleReturn } = useNavigation()
  const { getPageTitle, PAGES } = useUtils()
  const { getWarning, warning, clearWarning, isWarningActive } = useSnackbar()
  const { getFormattedDate } = useDate()
  const form = useForm()
  const formPopup = useFormPopup()

  // COMPUTED PROPERTIES
  const isFormOpen = computed(() => formPopup.isOpen.value)
  const formTemplate = computed(() => formPopup.template.value)
  const formValues = computed(() => formPopup.values.value)

  // CONTROLLERS
  const patientController = new PatientController()
  const medicineController = new MedicinesController()
  const patient = ref({})
  const medicines = ref([])

  // FUNCTIONS
  // Dynamic map of emergency data sections, based at database and translate data (i18n)
  const dynamicSections = computed(() => {
    return emergencyDataView.sections.map((section) => {
      let dbButtons = [] // Stores all buttons from section

      section.buttons = section.buttons || []

      switch(section.id){
        case "patient":
          dbButtons = (section.buttons).map((button) => {

            let dbValue = patient.value[button.id]

            if(button.id === 'birthDate'){
              dbValue = getFormattedDate(patient.value[button.id], false)
            }

            return {
              ...button,
              subtitle: dbValue !== undefined && dbValue !== null
                  ? String(dbValue)
                  : "--"
            }
          })
          break

        case "emergencyContacts":
          if(Array.isArray(patient.value.emergencyContacts)){
            dbButtons = patient.value.emergencyContacts.map((contact) => ({
              id: contact.id,
              title: contact.name,
              subtitle: `${contact.kinship || ''} • ${contact.phone || ''}`
            }))
          }

          dbButtons = [...dbButtons, ...(section.buttons)]
          break

        case "allergies":
          if(Array.isArray(patient.value.allergies)){
            dbButtons = patient.value.allergies.map((allergy) => ({
              id: allergy.id,
              title: allergy.name
            }))
          }

          dbButtons = [...dbButtons, ...(section.buttons)]
          break

        case "healthPlans":
          if(Array.isArray(patient.value.healthPlans)){
            dbButtons = patient.value.healthPlans.map((plan) => ({
              id: plan.id,
              title: plan.name
            }))
          }

          dbButtons = [...dbButtons, ...(section.buttons)]
          break

        case "others": {
          const doctorsCount = Array.isArray(patient.value.doctors)
              ? patient.value.doctors.length
              : 0
          const medicineCount = Array.isArray(medicines.value)
              ? medicines.value.length
              : 0

          dbButtons = (section.buttons).map((button) => {
            let count = 0

            if(button.id === "doctors"){
              count = doctorsCount
            }else if(button.id === "medicines"){
              count = medicineCount
            }

            return {
              ...button,
              subtitle: `${count}`
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

    if(section.btnAction === "popup") {
      const popupTemplate = formPopupTemplates.find(item => item.id === button.id) ?? null

      let currentInputValues = null
      if(section.id === "patient") {
        currentInputValues = form.getInputValue(patient.value, popupTemplate)
      }

      const context = { sectionId: section.id, fieldId: button.id }

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
      return {
        leftIcon: button.icon,
        color: button.color,
        title: getButtonTitle(section, button),
        description: getButtonSubtitle(section, button),
        to: button.link || undefined
      }
    }

    return { // section.component === "default"
      title: getButtonTitle(section, button),
      description: getButtonSubtitle(section, button),
      padding: "lg"
    }
  }

  const getButtonPropsAction = (section) => {
    if(section.btnAction === "popup"){
      return {
        rightIcon: icons["pencil-line"],
        tag: "button",
        ref: formPopup.triggerRef
      }
    }

    if(section.btnAction === "externalLink"){
      return {
        rightIcon: icons["external-link"],
        target: "_blank"
      }
    }

    if(section.btnAction === "internalLink"){
      return {
        tag: "router",
        rightIcon: icons["chevron-right"]
      }
    }

    // section.btnAction === "default" or nothing
    return {
      tag: "button"
    }
  }

  const getButtonTitle = (section, button) => {
    // 1. Gets from database
    if(button.title) return button.title

    // 2. Gets from translate or Fallback
    return te(`views.emergencyData.sections.${section.id}.buttons.${button.id}.title`)
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

    let result = null

    if(context.sectionId === "patient"){
      result = await form.executeDBSubmit(() => patientController.updatePatient(formData))
    }

    if(result && result.success){
      patient.value = result.data
      formPopup.close()
      getWarning(result.code)
    }else if(result){
      getWarning(result.code)
    }
  }

  onMounted(async() => {
    const patientData = await patientController.getPatient()
    const medicineData = await medicineController.getAll()

    // Update frontend patient data
    if(patientData.success){
      patient.value = patientData.data
    }else if(!patientData.success){
      getWarning(patientData.code)
    }

    // Update frontend medicines data
    if(medicineData.success){
      medicines.value = medicineData.data
    }else if(!medicineData.success){
      getWarning(medicineData.code)
    }
  })
</script>