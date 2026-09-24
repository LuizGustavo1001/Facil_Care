<template>
  <div class="view">
    <AppHeader
        :title="getPageTitle(PAGES['EMERGENCY_DATA'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main class="flex flex-column gap-15 relative flex-grow-1">
      <section
          v-for="content in emergencyDataView.sections"
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

        <ul class="flex flex-column gap-1">
          <li
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
        </ul>
      </section>
    </main>

    <AppFooter page="emergencyData" />
  </div>
</template>

<style scoped></style>

<script setup>
  import { onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { emergencyDataView } from "../locales/projectConfig.js"

  import { useNavigation } from "../composables/useNavigation.js"
  import { usePopup } from "../composables/usePopup.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useI18n } from "vue-i18n"

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import ActionButton from "../components/common/ActionButton.vue"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"

  import PatientController from "../controllers/PatientController.js"
  import MedicinesController from "../controllers/MedicinesController.js"
  import db from "../database/db.js"

  // Composables
  const { t, te } = useI18n()
  const { handleReturn } = useNavigation()
  const { handlePopup } = usePopup()
  const { getPageTitle, PAGES } = useUtils()

  // Functions
  const patientController = new PatientController(db)
  const medicineController = new MedicinesController(db)
  const patient = ref({})
  const medicines = ref([])

  const handleButtonAction = (section, button) => {
    switch (section.btnAction){
      case "popup":
        handlePopup(button)
        break
      case "externalLink": // desnecessário
        handleExternalLink(button)
        break
      case "internalLink": // desnecessário
        handleInternalLink(button)
        break
    }
  }

  const handleExternalLink = (button) => {

  }

  const handleInternalLink = (button) => {

  }

  const buttonComponent = (section) => {
    return section.component === "alt" ? ActionButtonAlt : ActionButton
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
        description: getButtonSubtitle(section, button)
      }
    }

    return { // section.component === "default"
      title: getButtonTitle(section, button),
      description: getButtonSubtitle(section, button)
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

    return { // section.btnAction === "default"
      tag: "button"
    }
  }

  const getButtonTitle = (section, button) => {
    if(te(`views.emergencyData.sections.${section.id}.buttons.${button.id}.title`)){
      return t(`views.emergencyData.sections.${section.id}.buttons.${button.id}.title`)
    }

    // returns from database
    return "DatabaseTitle"
  }

  const getButtonSubtitle = (section, button) => {
    if(te(`views.emergencyData.sections.${section.id}.buttons.${button.id}.subtitle`)){
      return t(`views.emergencyData.sections.${section.id}.buttons.${button.id}.subtitle`)
    }

    // returns from database
    return "DatabaseDescription"
  }

  const getSectionTitle = (section) => {
    return te(`views.emergencyData.sections.${section.id}.title`) ? t(`views.emergencyData.sections.${section.id}.title`) : ""
  }

  const getSectionSubtitle = (section) => {
    return te(`views.emergencyData.sections.${section.id}.subtitle`) ? t(`views.emergencyData.sections.${section.id}.subtitle`) : ""
  }

  onMounted(async() => {
    const patientData = await patientController.getPatient()
    const medicineData = await medicineController.getAll()

    // Update frontend patient data
    if(patientData){
      Object.assign(patient.value, patientData)
    }

    // Update frontend medicines data
    if(medicineData){
      medicines.value.push(medicineData)
    }
  })
</script>