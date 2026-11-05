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
          v-for="content in dynamicCategories"
          :key="content.id"
          class="main-section regular gap-05"
      >
        <!-- Category Title -->
        <div class="section-title-container">
          <h2 class="section-title">{{ getCategoryTitle(content) }}</h2>
          <p
              v-if="getCategoryTitle(content)"
              class="section-description text-muted"
          >
            {{ getCategorySubtitle(content) }}
          </p>
        </div>

        <!-- Category Item List -->
        <div class="item-list buttons-wrapper">
            <component
                :is="buttonComponent(content)"
                v-for="btn in content.buttons"
                :key="btn.id"
                v-bind="getButtonProps(content, btn)"
                class="width-full"
                @click="handleButtonAction(content, btn, $event)"
            />
        </div>
      </section>
    </main>

    <AppFooter page="emergencyData" />
  </div>
</template>

<style scoped></style>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { emergencyDataView , formTemplates } from "../locales/projectConfig.js"
  import { PAGES } from "../constants/sysPages.js"

  import { useI18n } from "vue-i18n"
  import { useUtils } from "../composables/useUtils.js"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useDate } from "../composables/useDate.js"
  import { useForm } from "../composables/useForm.js"
  import { useFormPopup } from "../composables/useFormPopup.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"
  import FormPopup from "../components/layout/popup/FormPopup.vue"

  import PatientController from "../controllers/PatientController.js"
  import MedicineController from "../controllers/MedicineController.js"
  import EmergencyContactController from "../controllers/EmergencyContactController.js"
  import AllergyController from "../controllers/AllergyController.js"
  import HealthPlanController from "../controllers/HealthPlanController.js"
  import DoctorController from "../controllers/DoctorController.js"
  import CaregiverController from "../controllers/CaregiverController.js"

  // COMPOSABLES
  const { t, te } = useI18n()
  const utils = useUtils()
  const snackbar = useSnackbar()
  const date = useDate()
  const form = useForm()
  const formPopup = useFormPopup()

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
  const caregiverController = new CaregiverController()

  const patient = ref(null)
  const caregivers = ref([])
  const healthPlans = ref([])
  const doctors = ref([])
  const allergies = ref([])
  const emergencyContacts = ref([])
  const medicines = ref([])

  // FUNCTIONS
  // Dynamic map of emergency data categories, based at database and translate data (i18n)
  const dynamicCategories = computed(() => {
    if(!patient.value) return []

    return emergencyDataView.categories.map((category) => {
      let dbButtons = [] // Stores all buttons from category

      category.buttons = category.buttons || []

      switch(category.id) {
        case "patient":
          dbButtons = (category.buttons).map((button) => {
            let dbValue = patient.value[button.id]

            if(button.id === 'birthDate') {
              dbValue = date.getFormatted(patient.value[button.id], false)
            }

            if(button.id === 'bloodType') {
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
              ...category.buttons
            ]
          break

        case PAGES.ALLERGIES:
          dbButtons = [
            ...allergies.value.map((allergy) => ({
              id: allergy._id,
              title: allergy.name
            })),
            ...category.buttons
          ]
          break

        case PAGES.HEALTH_PLANS:
          dbButtons = [
            ...healthPlans.value.map((plan) => ({
              id: plan._id,
              title: plan.name
            })),
            ...category.buttons
          ]
          break

        case "others": {
          dbButtons = category.buttons.map((button) => {
            let count = 0

            if (button.id === PAGES.DOCTORS) {
              count = doctors.value.length
            } else if (button.id === PAGES.MEDICINES) {
              count = medicines.value.length
            } else if (button.id === PAGES.CAREGIVERS) {
              count = caregivers.value.length
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
   *
   * @param { Object } category
   * @param { Object } button
   * @param { Event } event
   **/
  const handleButtonAction = (category, button, event) => {
    formPopup.triggerRef.value = event.currentTarget

    if(category.action === "popup") {
      const popupTemplate = formTemplates.find(item => item.id === button.id) ?? null

      let currentInputValues = null
      if(category.id === "patient") {
        currentInputValues = form.getInputValue(patient.value, popupTemplate)
      }

      const context = {
        sectionId: category.id,
        fieldId: button.id
      }

      formPopup.open(popupTemplate, currentInputValues, context)
    }
  }

  const buttonComponent = (category) => {
    return category.component === "alt"
        ? ActionButtonColorful
        : ActionButton
  }

  const getButtonProps = (category, button) => {
    return {
      ...getButtonPropsAction(category),
      ...getButtonPropsComponent(category, button)
    }
  }

  const getButtonPropsComponent = (category, button) => {
    if(category.component === "alt") {
      const title = category.action === "popup"
          ? form.getInputLabel(button.id, button)
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
      padding: "md",
      variant: "subtle",
      hasBorderRadius: false,
    }
  }

  const getButtonPropsAction = (category) => {
    if(category.action === "popup") {
      return {
        rightIcon: icons["pencil-line"],
        tag: "button",
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
        tag: "router"
      }
    }

    // category.action === "none" or nothing
    return {
      tag: "button"
    }
  }

  const getButtonTitle = (category, button) => {
    return button.title
        ? button.title
        : te(`views.emergencyData.categories.${category.id}.buttons.${button.id}.title`)
            ? t(`views.emergencyData.categories.${category.id}.buttons.${button.id}.title`)
            : ""
  }

  const getButtonSubtitle = (category, button) => {
    // 1. Gets from database
    if(button.subtitle) return button.subtitle

    // 2. Gets from translate or Fallback
    return te(`views.emergencyData.categories.${category.id}.buttons.${button.id}.subtitle`)
        ? t(`views.emergencyData.categories.${category.id}.buttons.${button.id}.subtitle`)
        : ""
  }

  const getCategoryTitle = (category) => {
    return te(`views.emergencyData.categories.${category.id}.title`)
        ? t(`views.emergencyData.categories.${category.id}.title`)
        : ""
  }

  const getCategorySubtitle = (category) => {
    return te(`views.emergencyData.categories.${category.id}.subtitle`)
        ? t(`views.emergencyData.categories.${category.id}.subtitle`)
        : ""
  }

  const handleSubmit = async (formData) => {
    const context = formPopup.context.value
    if(!context) return

    const cleanData = JSON.parse(JSON.stringify(formData))

    let result = null
    if(context.sectionId === "patient") {
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

    if(patientData.success) {
      patient.value = patientData.data
    }else {
      snackbar.open(patientData.code)
    }

    if (medicineData.success) medicines.value = medicineData.data
    if (allergyData.success) allergies.value = allergyData.data
    if (healthPlanData.success) healthPlans.value = healthPlanData.data
    if (doctorData.success) doctors.value = doctorData.data
    if (emergencyContactData.success) emergencyContacts.value = emergencyContactData.data
    if (caregiverData.success) caregivers.value = caregiverData.data
  })
</script>