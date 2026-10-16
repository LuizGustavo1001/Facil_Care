<template>
  <div class="view regular">
    <template v-if="pageExists">
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

      <ConfirmPopup
          :isOpen="isConfirmOpen"
          :popupRef="confirmPopup.popupRef"
          :title="confirmTitle"
          :message="confirmMessage"
          @cancel="confirmPopup.close"
          @confirm="confirmPopup.handleConfirm"
      />

      <AppHeader
          :title="utils.getPageTitle(currentCategory)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="navigation.handleReturn"
      />

      <main class="main regular gap-2">
        <section v-if="currentCategory === 'medicines'">
          <ActionButtonAlt
            tag="router"
            :to="`/manage/${PAGES.MEDICINE_REGISTRIES}`"
            :title="t('utils.viewAdministered') ?? ''"
            :leftIcon="icons['medicine-bottle-fill']"
          />
        </section>

        <section v-if="formattedData.length > 0" class="main-section regular gap-1">
          <div class="section-title-container">
            <h2 class="section-title text-muted">{{ getSectionTitle(currentCategory) }}</h2>
          </div>

          <ul class="list flex flex-column gap-1">
            <li v-for="item in formattedData" :key="item.id" class="flex align-center gap-05">
              <ActionButton
                  tag="button"
                  :rightIcon="icons['pencil-line']"
                  :title="item.title"
                  :description="item.description"
                  variant="subtle"
                  padding="lg"
                  class="width-full"
                  @click.stop="handleButtonAction(item, $event)"
              />

              <IconBtn
                  :icon="icons['delete-bin-line']"
                  variant="destructive"
                  @click.stop="handleDelete(item)"
              />
            </li>
          </ul>
        </section>

        <NotFoundCard v-else class="main-section center"/>
      </main>
      <AppFooter :page="String(currentCategory)" />
    </template>

    <template v-else>
      <AppFallback />
    </template>
  </div>
</template>

<style scoped></style>

<script setup>
  import { computed, onMounted, ref, watch } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { formPopupTemplates } from "../locales/projectConfig.js"
  import { MANAGE_PAGES, PAGES } from "../composables/usePages.js"

  import { useRoute } from "vue-router"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useI18n } from "vue-i18n"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useForm } from "../composables/useForm.js"
  import { useDate } from "../composables/useDate.js"
  import { useConfirmPopup } from "../composables/useConfirmPopup.js"
  import { useFormPopup } from "../composables/useFormPopup.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"
  import NotFoundCard from "../components/feedback/NotFoundCard.vue"
  import IconBtn from "../components/buttons/IconBtn.vue"
  import FormPopup from "../components/layout/popup/FormPopup.vue"
  import ConfirmPopup from "../components/layout/popup/ConfirmPopup.vue"
  import ActionButtonAlt from "../components/buttons/ActionButtonAlt.vue"

  import PatientController from "../controllers/PatientController.js"
  import MedicinesController from "../controllers/MedicinesController.js"
  import MedicineRegistriesController from "../controllers/MedicineRegistriesController.js"

  // COMPOSABLES
  const { t, te } = useI18n()
  const route = useRoute()
  const form = useForm()
  const navigation = useNavigation()
  const utils = useUtils()
  const snackbar = useSnackbar()
  const date = useDate()
  const confirmPopup = useConfirmPopup()
  const formPopup = useFormPopup()

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed(() => snackbar.isActive.value)

  const isFormOpen = computed(() => formPopup.isOpen.value)
  const formTemplate = computed(() => formPopup.template.value)
  const formValues = computed(() => formPopup.values.value)

  const isConfirmOpen = computed(() => confirmPopup.isOpen.value)
  const confirmTitle = computed(() => confirmPopup.title.value)
  const confirmMessage = computed(() => confirmPopup.message.value)

  // Retrieve page data
  const currentCategory = computed(() => route.params.category)

  // CONTROLLERS
  const patientController = new PatientController()
  const medicineController = new MedicinesController()
  const medicineRegistrieController = new MedicineRegistriesController()

  const patient = ref(null)
  const medicines = ref([])
  const formattedData = ref([])
  const medicineRegistries = ref([])

  // Verify if selected manage page exists
  const pageExists = computed(() => {
    const rawId = currentCategory.value

    if(!rawId) return null

    return MANAGE_PAGES.includes(rawId)
  })

  // FUNCTIONS
  const fillSection = () => {
    // Clears old formattedData
    formattedData.value = []

    const data = {
      ...patient.value,
      medicines: medicines.value,
      medicineRegistries: medicineRegistries.value
    }

    switch(currentCategory.value){
      case PAGES.CAREGIVERS:
        for(const caregiver of data.caregivers ?? []){
          formattedData.value.push({
            id: caregiver.caregiverId,
            title: caregiver.name,
            description: getDescription([
              caregiver.phone,
              date.getFormatted(caregiver.startDate, false)
            ])
          })
        }
        break
      case PAGES.DOCTORS:
        for(const doctor of data.doctors ?? []){
          formattedData.value.push({
            id: doctor.doctorId,
            title: doctor.name,
            description: getDescription([
               utils.getOptionTranslate(`speciality.${doctor.speciality}`),
              doctor.phone
            ])
          })
        }
        break
      case PAGES.ALLERGIES:
        for(const allergy of data.allergies ?? []){
          formattedData.value.push({
            id: allergy.allergyId,
            title: allergy.name,
          })
        }
        break
      case PAGES.MEDICINES:
        for(const medicine of data.medicines ?? []){
          formattedData.value.push({
            id: medicine._id,
            title: medicine.name
                + (
                    medicine.routeAdmin
                      ? ` (${ utils.getOptionTranslate(`routeAdmin.${medicine.routeAdmin}`) })`
                      : ""
                ),
            description: getDescription([medicine.observations])
          })
        }
        break
      case PAGES.MEDICINE_REGISTRIES:
        for(const registry of data.medicineRegistries ?? []){
          formattedData.value.push({
            id: registry._id,
            title: registry.medicationName + " (" + registry.medicationDosage + ")",
            description: getDescription([registry.observations, registry.caregiverName])
          })
        }
        break
      case PAGES.HEALTH_PLANS:
        for(const plan of data.healthPlans ?? []){
          formattedData.value.push({
            id: plan.planId,
            title: plan.name
          })
        }
        break
      case PAGES.EMERGENCY_CONTACTS:
        for(const contact of data.emergencyContacts ?? []) {
          formattedData.value.push({
            id: contact.contactId,
            title: contact.name,
            description: getDescription([
              utils.getOptionTranslate(`kinship.${contact.kinship}`),
              contact.phone
            ])
          })
        }
        break
    }
  }

  const getDescription = (parts) => {
    return parts.filter(Boolean).join(" • ")
  }

  const getSectionTitle = (currentCategory) => {
    const key = `views.${currentCategory}.sections.registers.title`
    return te(key)
        ? t(key)
        : ""
  }

  const handleDelete = (item) => {
    const title = t(`confirmPopupTemplates.deleteConfirm.title`, { item: item.title }) + "?"
    confirmPopup.open(title, null, () => handleDeleteConfirmed(item))
  }

  const handleDeleteConfirmed = async (item) => {
    let result = null

    if(currentCategory.value === PAGES.MEDICINES){
      result = await medicineController.removeById(item.id)
    }else if(currentCategory.value === PAGES.MEDICINE_REGISTRIES){
      result = await medicineRegistrieController.removeById(item.id)
    }else{ // Any other sections within "patient"
      let idKey = null

      switch(currentCategory.value){
        case PAGES.CAREGIVERS:
          idKey = "caregiverId"
              break
        case PAGES.DOCTORS:
          idKey = "doctorId"
              break
        case PAGES.ALLERGIES:
          idKey = "allergyId"
              break
        case PAGES.HEALTH_PLANS:
          idKey = "planId"
              break
        case PAGES.EMERGENCY_CONTACTS:
          idKey = "contactId"
              break
      }

      result = await patientController.removePatientSectionItem(currentCategory.value, item.id, idKey)
    }

    if(!result) return

    if(result.success){
      await updateData(currentCategory.value, result.data)
    }

    snackbar.open(result.code)
  }

  // Handle form submit
  const handleSubmit = async (formData) => {
    const context = formPopup.context.value
    if (!context) return

    let result = null
    const { sectionId, currentCategory, idKey } = context

    if(sectionId === PAGES.MEDICINES){
      result = await form.executeDBSubmit(() => medicineController.updateMedicineData(formData, currentCategory))
    }else if(sectionId === PAGES.MEDICINE_REGISTRIES){
      result = await form.executeDBSubmit(() => medicineRegistrieController.updateData(formData, currentCategory))
    }else{ // Data within patient data
      const cleanData = JSON.parse(JSON.stringify(formData))

      result = await form.executeDBSubmit(() => patientController.updatePatientSectionItem(sectionId, currentCategory, idKey, cleanData))
    }

    if(result && result.success){
      await updateData(sectionId, result.data)

      snackbar.open(result.code)
      formPopup.close()
    }else if(result){
      snackbar.open(result.code)
    }
  }

  const updateData = async (sectionId, updatedData) => {
    if(sectionId === PAGES.MEDICINES){
      medicines.value = updatedData
    }else if(PAGES.MEDICINE_REGISTRIES){
      medicineRegistries.value = updatedData
    }else{ // Any other sections (allergies, doctors, caregivers, etc)
      patient.value = updatedData
    }
  }

  /**
   * - Triggers the current event target (Prevents the popup from closing unexpectedly)
   * - Defines the database data source
   * - Defines the template data (`popupTemplate`) to be displayed in the popup
   * - Defines the popup context (`sectionId` and `fieldId`) needed to access the corret database table and attribute. Example: `sectionId` = "patient" and `fieldId` = "birthDate"
   *
   * @param { Object } button
   * @param { Event } event
   **/
  const handleButtonAction = (button, event) => {
    formPopup.triggerRef.value = event.currentTarget

    const popupTemplate = formPopupTemplates.find(item => item.id === currentCategory.value) ?? null

    let dataSource = null
    let idKey = "_id"

    if(currentCategory.value === PAGES.MEDICINES) {
      dataSource = medicines.value
    }else if(currentCategory.value === PAGES.MEDICINE_REGISTRIES){
      dataSource = medicineRegistries.value
    }else if(currentCategory.value === PAGES.CAREGIVERS){
      dataSource = patient.value?.caregivers
      idKey = "caregiverId"
    }else if(currentCategory.value === PAGES.DOCTORS){
      dataSource = patient.value?.doctors
      idKey = "doctorId"
    }else if(currentCategory.value === PAGES.ALLERGIES){
      dataSource = patient.value?.allergies
      idKey = "allergyId"
    }else if(currentCategory.value === PAGES.HEALTH_PLANS){
      dataSource = patient.value?.healthPlans
      idKey = "planId"
    }else if(currentCategory.value === PAGES.EMERGENCY_CONTACTS){
      dataSource = patient.value?.emergencyContacts
      idKey = "contactId"
    }else{
      dataSource = []
    }

    // defining the current item selected within the collection
    const currentItem = dataSource.find(item => item[idKey] === button.id)

    const currentInputValues = form.getInputValue(currentItem, popupTemplate, idKey)

    const context = { sectionId: currentCategory.value, fieldId: button.id, currentCategory: currentInputValues[idKey], idKey: idKey }

    formPopup.open(popupTemplate, currentInputValues, context)
  }

  // WATCHES
  // If updates -> refill section
  watch([patient, medicines, medicineRegistries, currentCategory], () => {
    fillSection()
  }, { deep: true })

  // MOUNTED || UNMOUNTED
  onMounted(async() => {
    const patientResult = await patientController.getPatient()

    if(patientResult.success){
      patient.value = patientResult.data
    }else{
      snackbar.open(patientResult.code)
    }

    const medicinesResult = await medicineController.getAll()
    if(medicinesResult.success){
      medicines.value = medicinesResult.data
    }else{
      snackbar.open(medicinesResult.code)
    }

    const medicineRegistriesResult = await medicineRegistrieController.getAll()
    if(medicineRegistriesResult.success){
      medicineRegistries.value = medicineRegistriesResult.data
    }else{
      snackbar.open(medicineRegistriesResult.code)
    }
  })
</script>
