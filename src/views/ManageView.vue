<template>
  <div class="view regular">
    <template v-if="pageExists">
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
          :title="getPageTitle(itemId)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="handleReturn"
      />

      <main class="main regular gap-2">
        <section class="main-section regular gap-1">
          <h2 class="section-title text-muted">{{ getSectionTitle(itemId) }}</h2>

          <ul
              v-if="formattedData.length > 0"
              class="list flex flex-column gap-1"
          >
            <li v-for="item in formattedData" :key="item.id" class="flex align-center gap-1">
              <ActionButton
                  tag="button"
                  :rightIcon="icons['pencil-line']"
                  :title="item.title"
                  :description="item.description"
                  variant="subtle"
                  padding="lg"
                  class="width-full"
                  @click="handleButtonAction(item, $event)"
                  style="border-radius: var(--radius-sm)"
              />

              <IconBtn
                  :icon="icons['delete-bin-line']"
                  variant="destructive"
                  @click="handleDelete(itemId, item)"
              />
            </li>
          </ul>

          <div v-else>
            <p><NotFoundCard type="item" size="large"/></p>
          </div>
        </section>
      </main>

      <AppFooter :page="String(itemId)" />
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
  import { popupTemplates } from "../locales/projectConfig.js"

  import { useRoute } from "vue-router"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useI18n } from "vue-i18n"
  import { useWarning } from "../composables/useWarning.js"
  import { usePopup } from "../composables/usePopup.js"
  import { useForm } from "../composables/useForm.js"
  import { useDate } from "../composables/useDate.js"

  import AppHeader from "../components/AppHeader.vue"
  import ActionButton from "../components/common/ActionButton.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/AppFooter.vue"
  import SnackBar from "../components/common/SnackBar.vue"
  import AppPopup from "../components/AppPopup.vue"
  import AppOverlay from "../components/AppOverlay.vue"
  import NotFoundCard from "../components/common/NotFoundCard.vue"
  import IconBtn from "../components/common/IconBtn.vue"

  import PatientController from "../controllers/PatientController.js"
  import MedicinesController from "../controllers/MedicinesController.js"

  // COMPOSABLES
  const route = useRoute()
  const { t, te } = useI18n()
  const { handleReturn } = useNavigation()
  const { getPageTitle, MANAGE_PAGES } = useUtils()
  const { warning, getWarning, clearWarning, isWarningActive } = useWarning()
  const { isPopupOpen, fillPopup, popupTemplate, closePopup, popupRef, triggerRef, popupValues, popupContext } = usePopup()
  const { getInputValue, executeDBSubmit } = useForm()
  const { getFormattedDate } = useDate()

  // COMPUTED PROPERTIES
  // Retrieve page data
  const itemId = computed(() => route.params.itemId)

  // CONTROLLERS
  const patientController = new PatientController()
  const medicineController = new MedicinesController()

  const patient = ref(null)
  const medicines = ref([])
  const formattedData = ref([])

  // Verify if selected manage page exists
  const pageExists = computed(() => {
    const rawId = itemId.value

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

    switch(itemId.value){
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
                medicine.routeAdmin
            ])
          })
        }
        break
    }
  }

  const getDescription = (parts) => {
    return parts.filter(Boolean).join(" • ")
  }

  const getSectionTitle = (itemId) => {
    return te(`views.${itemId}.sections.registers.title`) ? t(`views.${itemId}.sections.registers.title`) : ""
  }

  const handleDelete = async (sectionId, data) => {
    const confirmDelete = confirm("Tem certeza que deseja remover este item?")
    if (!confirmDelete) return
  }

  // Handle form submit
  const handleSubmit = async (formData) => {
    const context = popupContext.value
    if (!context) return

    let result = null
    const { sectionId, itemId, idKey } = context

    if(sectionId === "medicines"){
      result = await executeDBSubmit(() => medicineController.updateMedicineData(formData, itemId))
    }else{ // Data within patient data
      const currentArray = patient.value[sectionId] || []

      const updatedArray = currentArray.map(item => item[idKey] === itemId ? { ...item, ...formData } : item)

      const newData = {
        [sectionId]: updatedArray
      }

      result = await executeDBSubmit(() => patientController.updatePatient(newData))
    }

    if(result && result.success){
      closePopup()
      getWarning(result.code)
      await updateData(sectionId, result.data)
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
    triggerRef.value = event.currentTarget

    const popupTemplate = popupTemplates.find(item => item.id === itemId.value) ?? null

    let dataSource = null
    let idKey = "_id"

    if(itemId.value === "medicines") {
      dataSource = medicines.value
      idKey = "_id"
    }else if(itemId.value === "caregivers"){
      dataSource = patient.value?.caregivers
      idKey = "caregiverId"
    }else if(itemId.value === "doctors"){
      dataSource = patient.value?.doctors
      idKey = "doctorId"
    }else if(itemId.value === "allergies"){
      dataSource = patient.value?.allergies
      idKey = "allergyId"
    }

    const currentInputValues = getInputValue(dataSource, popupTemplate, idKey)
    const currentData = currentInputValues[0] || {}

    const context = { sectionId: itemId.value, fieldId: button.id, itemId: currentData[idKey], idKey: idKey }

    fillPopup(popupTemplate, currentInputValues[0], context)
  }

  // WATCHES
  // If updates -> refill section
  watch([patient, medicines, itemId], () => {
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
