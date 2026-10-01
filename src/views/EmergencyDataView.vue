<template>
  <div class="view regular">

    <AppOverlay />

    <SnackBar
        v-if="isWarningActive"
        :message="warning.message"
        :type="warning.type || undefined"
        @click="clearWarning"
    />

    <AppPopup
        v-if="isPopupOpen"
        ref="popupRef"
        :template="popupTemplate"
        :inputValue="popupValues"
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
          <h2>{{ getSectionTitle(content) }}</h2>
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
    border-radius: var(--radius-2xl);
  }
</style>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { emergencyDataView } from "../locales/projectConfig.js"
  import { popupTemplates } from "../locales/projectConfig.js"

  import { useI18n } from "vue-i18n"
  import { useNavigation } from "../composables/useNavigation.js"
  import { usePopup } from "../composables/usePopup.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useWarning } from "../composables/useWarning.js"
  import { useAge } from "../composables/useAge.js"
  import { useForm } from "../composables/useForm.js"

  import AppHeader from "../components/AppHeader.vue"
  import AppFooter from "../components/AppFooter.vue"
  import ActionButton from "../components/common/ActionButton.vue"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"
  import SnackBar from "../components/common/SnackBar.vue"
  import AppPopup from "../components/AppPopup.vue"
  import AppOverlay from "../components/AppOverlay.vue"

  import PatientController from "../controllers/PatientController.js"
  import MedicinesController from "../controllers/MedicinesController.js"

  // COMPOSABLES
  const { t, te } = useI18n()
  const { handleReturn } = useNavigation()
  const { isPopupOpen, fillPopup, popupTemplate, closePopup, popupRef, triggerRef, popupValues, popupContext } = usePopup()
  const { getPageTitle, PAGES } = useUtils()
  const { getWarning, warning, clearWarning, isWarningActive } = useWarning()
  const { getFormattedDate } = useAge()
  const { executeDBSubmit } = useForm()

  // COMPUTED PROPERTIES
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
          if (Array.isArray(patient.value.allergies)) {
            dbButtons = patient.value.allergies.map((allergy, index) => ({
              id: index,
              title: allergy
            }))
          }
          dbButtons = [...dbButtons, ...(section.buttons)]
          break

        case "healthPlans":
          if(Array.isArray(patient.value.healthPlans)){
            dbButtons = patient.value.healthPlans.map((plan, index) => ({
              id: index,
              title: plan
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
    triggerRef.value = event.currentTarget

    if(section.btnAction === "popup") {
      const popupTemplate = popupTemplates.find(item => item.id === button.id) ?? null

      let currentInputValues = getInputValue(section.id, popupTemplate)

      const context = { sectionId: section.id, fieldId: button.id }

      fillPopup({
        popupTemplate
        },
        currentInputValues,
        context
      )
    }
  }

  /**
   * Defines the input `value` based in the database data of the input.
   *
   * @param { String } sectionId
   * @param { Object } template
   *
   * @return { Object } Object mapping input names to their database values.
   **/
  const getInputValue = (sectionId, template) => {
    const values = {}

    // 1. There's no template, form or inputs
    if(!template || !template.main || !template.main.inputs){
      return values
    }

    // 2. Iterating each input within the template
    for(const input of template.main.inputs){
      const fieldName = input.name

      if(sectionId === "patient"){
        values[fieldName] = patient.value[fieldName]
      }
    }

    return values
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
        ref: triggerRef
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
    const context = popupContext.value
    if(!context) return

    let result = null

    if(context.sectionId === "patient"){
      result = await executeDBSubmit(() => patientController.updatePatient(formData))
    }

    if(result && result.success){
      closePopup()
      getWarning(result.code)
      patient.value = result.data
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