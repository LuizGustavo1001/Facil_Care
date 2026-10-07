<template>
  <div class="view regular">
    <template v-if="pageExists">
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

      <ConfirmPopup
          :isOpen="isConfirmOpen"
          :popupRef="confirmPopup.popupRef"
          :title="confirmTitle"
          :message="confirmMessage"
          @cancel="confirmPopup.close"
          @confirm="confirmPopup.handleConfirm"
      />

      <AppHeader
          :title="getPageTitle(currentCategory)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="handleReturn"
      />

      <main class="main regular gap-2">
        <section v-if="formattedData.length > 0" class="main-section regular gap-1">
          <h2 class="section-title text-muted">{{ getSectionTitle(currentCategory) }}</h2>

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

  import PatientController from "../controllers/PatientController.js"
  import MedicinesController from "../controllers/MedicinesController.js"

  // COMPOSABLES
  const route = useRoute()
  const form = useForm()
  const { t, te } = useI18n()
  const { handleReturn } = useNavigation()
  const { getPageTitle, MANAGE_PAGES } = useUtils()
  const { warning, getWarning, clearWarning, isWarningActive } = useSnackbar()
  const { getFormattedDate } = useDate()

  const confirmPopup = useConfirmPopup()
  const formPopup = useFormPopup()

  // COMPUTED PROPERTIES
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

  const patient = ref(null)
  const medicines = ref([])
  const formattedData = ref([])

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
      medicines: medicines.value
    }

    switch(currentCategory.value){
      case "caregivers":
        for(const caregiver of data.caregivers ?? []){
          formattedData.value.push({
            id: caregiver.caregiverId,
            title: caregiver.name,
            description: getDescription([
              caregiver.phone,
              getFormattedDate(caregiver.startDate, false)
            ])
          })
        }
        break
      case "doctors":
        for(const doctor of data.doctors ?? []){
          formattedData.value.push({
            id: doctor.doctorId,
            title: doctor.name,
            description: getDescription([
              doctor.speciality,
              doctor.phone
            ])
          })
        }
        break
      case "allergies":
        for(const allergy of data.allergies ?? []){
          formattedData.value.push({
            id: allergy.allergyId,
            title: allergy.name,
          })
        }
        break
      case "medicines":
        for(const medicine of data.medicines ?? []){
          formattedData.value.push({
            id: medicine._id,
            title: medicine.name,
            description: getDescription([
              getTranslatedText(medicine.routeAdmin)
            ])
          })
        }
        break
      case "healthPlans":
        for(const plan of data.healthPlans ?? []){
          formattedData.value.push({
            id: plan.planId,
            title: plan.name
          })
        }
        break
      case "emergencyContacts":
        for(const contact of data.emergencyContacts ?? []) {
          formattedData.value.push({
            id: contact.contactId,
            title: contact.name,
            description: getDescription([
                getTranslatedText(contact.kinship),
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
    return te(`views.${currentCategory}.sections.registers.title`) ? t(`views.${currentCategory}.sections.registers.title`) : ""
  }

  const handleDelete = (item) => {
    const title = t(`confirmPopupTemplates.deleteConfirm.title`, { item: item.title }) + "?"
    confirmPopup.open(title, null, () => handleDeleteConfirmed(item))
  }

  const handleDeleteConfirmed = async (item) => {
    let result = null

    if(currentCategory.value === "medicines"){
      result = await medicineController.removeById(item.id)
    }else{
      let idKey = null

      switch (currentCategory.value) {
        case "caregivers":
          idKey = "caregiverId"
              break
        case "doctors":
          idKey = "doctorId"
              break
        case "allergies":
          idKey = "allergyId"
              break
        case "healthPlans":
          idKey = "planId"
              break
        case "emergencyContacts":
          idKey = "contactId"
              break
      }

      result = await patientController.removePatientSectionItem(currentCategory.value, item.id, idKey)
    }

    if(result && result.success){
      await updateData(currentCategory.value, result.data)

      getWarning(result.code)
    }else if(result){
      getWarning(result.code)
    }
  }

  // Handle form submit
  const handleSubmit = async (formData) => {
    const context = formPopup.context.value
    if (!context) return

    let result = null
    const { sectionId, currentCategory, idKey } = context

    if(sectionId === "medicines"){
      result = await form.executeDBSubmit(() => medicineController.updateMedicineData(formData, currentCategory))
    }else{ // Data within patient data
      const cleanData = JSON.parse(JSON.stringify(formData))

      result = await form.executeDBSubmit(() => patientController.updatePatientSectionItem(sectionId, currentCategory, idKey, cleanData))
    }

    if(result && result.success){
      await updateData(sectionId, result.data)

      getWarning(result.code)
      formPopup.close()
    }else if(result){
      getWarning(result.code)
    }
  }

  const updateData = async (sectionId, updatedData) => {
    if(sectionId === "medicines"){
      medicines.value = updatedData
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

    if(currentCategory.value === "medicines") {
      dataSource = medicines.value
      idKey = "_id"
    }else if(currentCategory.value === "caregivers"){
      dataSource = patient.value?.caregivers
      idKey = "caregiverId"
    }else if(currentCategory.value === "doctors"){
      dataSource = patient.value?.doctors
      idKey = "doctorId"
    }else if(currentCategory.value === "allergies"){
      dataSource = patient.value?.allergies
      idKey = "allergyId"
    }else if(currentCategory.value === "healthPlans"){
      dataSource = patient.value?.healthPlans
      idKey = "planId"
    }else if(currentCategory.value === "emergencyContacts"){
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

  const getTranslatedText = (label) => {
    return t(`utils.${label}`) ?? ""
  }

  // WATCHES
  // If updates -> refill section
  watch([patient, medicines, currentCategory], () => {
    fillSection()
  }, { deep: true })

  // MOUNTED || UNMOUNTED
  onMounted(async() => {
    const patientResult = await patientController.getPatient()

    if(patientResult.success){
      patient.value = patientResult.data
    }else{
      getWarning(patientResult.code)
    }

    const medicinesResult = await medicineController.getAll()
    if(medicinesResult.success){
      medicines.value = medicinesResult.data
    }else{
      getWarning(medicinesResult.code)
    }
  })
</script>
