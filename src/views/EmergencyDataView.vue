<template>
  <div class="view">
    <SnackBar
        v-if="warning.message !== ''"
        :message="warning.message"
        :type="warning.type || undefined"
    />

    <AppHeader
        :title="getPageTitle(PAGES['EMERGENCY_DATA'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main class="flex flex-column gap-15 relative flex-grow-1">
      <section
          v-for="content in dynamicSections"
          :key="content.id"
          class="flex flex-column gap-05"
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

        <ul class="flex flex-column gap-05">
          <li
            v-if="content.buttons.length > 0"
            v-for="btn in content.buttons"
            :key="btn.id"
          >
            <component
                :is="buttonComponent(content)"
                v-bind="getButtonProps(content, btn)"
                @click="handleButtonAction(content, btn)"
                class="width-full"
            >
            </component>
          </li>

          <li v-else>{{ t("views.emergencyData.fallback") }}</li>
        </ul>
      </section>
    </main>

    <AppFooter page="emergencyData" />
  </div>
</template>

<style scoped></style>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { emergencyDataView } from "../locales/projectConfig.js"

  import { useNavigation } from "../composables/useNavigation.js"
  import { usePopup } from "../composables/usePopup.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useI18n } from "vue-i18n"
  import { useWarning } from "../composables/useWarning.js"
  import { useAge } from "../composables/useAge.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import ActionButton from "../components/common/ActionButton.vue"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"
  import SnackBar from "../components/common/SnackBar.vue"

  import PatientController from "../controllers/PatientController.js"
  import MedicinesController from "../controllers/MedicinesController.js"
  import db from "../database/db.js"

  // Composables
  const { t, te } = useI18n()
  const { handleReturn } = useNavigation()
  const { handlePopup } = usePopup()
  const { getPageTitle, PAGES } = useUtils()
  const { getWarning, warning } = useWarning()
  const { getFormattedDate } = useAge()

  // Functions
  const patientController = new PatientController(db)
  const medicineController = new MedicinesController(db)
  const patient = ref({})
  const medicines = ref([])

  // Dynamic map of emergency data sections, based at database and translate data (i18n)
  const dynamicSections = computed(() => {
    return emergencyDataView.sections.map((section) => {
      let dbButtons = [] // stores all buttons from section

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

  const handleButtonAction = (section, button) => {
    if(section.btnAction === "popup"){
      handlePopup(button)
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
      variant: "subtle",
      padding: "lg"
    }
  }

  const getButtonPropsAction = (section) => {
    if(section.btnAction === "popup"){
      return {
        rightIcon: icons["pencil-line"],
        tag: "button"
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