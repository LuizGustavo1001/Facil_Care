<template>
  <div class="view regular">
    <!-- Manage View -->
    <!--
      Here you can manage patient's:
        - Doctors
        - Caregivers
        - Medicines
        - Allergies
        - Health Plans
        - Emergency Contacts
    -->
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
          :dynamicData="dynamicData"
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
          :title="utils.getPageTitle(currentCategory as string)"
      />

      <main class="main regular gap-2">
        <!-- Registries List -->
        <section v-if="formattedData.length > 0" class="main-section regular gap-1">
          <div class="section-title-container">
            <h2 class="section-title text-muted">{{ getCategoryTitle(currentCategory as string) }}</h2>
          </div>

          <ul class="list buttons-wrapper">
            <li v-for="item in formattedData" :key="item.id" class="flex align-center gap-05">
              <ActionButton
                  tag="button"
                  :rightIcon="icons['pencil-line']"
                  rightIconSize="23px"
                  :title="item.title"
                  :description="item.description"
                  variant="subtle"
                  padding="md"
                  class="width-full"
                  @click.stop="handleButtonAction(item, $event)"
                  :hasBorderRadius="false"
                  style="border-radius: var(--radius-xs)"
              />

              <!-- Delete Registry Icon -->
              <IconBtn
                  :icon="icons['delete-bin-line']"
                  size="25px"
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

<script setup lang="ts">
  import { computed, ref, watch } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { formTemplates } from "../locales/projectConfig"

  import { MANAGE_PAGES, PAGES } from "../constants/sysPages"
  import { FORM_TYPES } from "../constants/form"

  import type { WarningCode } from "../types/snackbar"
  import type { FormContext } from "../types/formPopup"
  import type { FormValues } from "../types/genericForm"
  import type { ManagePageType } from "../types/sysPages"
  import type { ConfirmPopupTitle, ConfirmPopupMessage } from "../types/confirmPopup"

  import { useRoute } from "vue-router"
  import { useUtils } from "../composables/useUtils"
  import { useI18n } from "vue-i18n"
  import { useSnackbar } from "../composables/useSnackbar"
  import { useForm } from "../composables/useForm"
  import { useDate } from "../composables/useDate"
  import { useConfirmPopup } from "../composables/useConfirmPopup"
  import { useFormPopup } from "../composables/useFormPopup"

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

  import MedicineController from "../controllers/MedicineController"
  import CaregiverController from "../controllers/CaregiverController"
  import HealthPlanController from "../controllers/HealthPlanController"
  import DoctorController from "../controllers/DoctorController"
  import AllergyController from "../controllers/AllergyController"
  import EmergencyContactController from "../controllers/EmergencyContactController"

  import type { Caregiver } from "../interfaces/Caregiver"
  import type { HealthPlan } from "../interfaces/HealthPlan"
  import type { Doctor } from "../interfaces/Doctor"
  import type { Allergy } from "../interfaces/Allergy"
  import type { EmergencyContact } from "../interfaces/EmergencyContact"
  import type { Medicine } from "../interfaces/Medicine"
  import type { FormPopupTemplate } from "../interfaces/Form"

  // TYPES & INTERFACES
  interface FormattedItem {
    id: number | undefined
    title: string
    description?: string
  }

  type UpdatedData = Medicine | HealthPlan | Allergy | Caregiver | Doctor | EmergencyContact | Medicine[] | HealthPlan[] | Allergy[] | Caregiver[] | Doctor[] | EmergencyContact[]

  // COMPOSABLES
  const { t } = useI18n()
  const route = useRoute()
  const form = useForm()
  const utils = useUtils()
  const snackbar = useSnackbar()
  const date = useDate()
  const confirmPopup = useConfirmPopup()
  const formPopup = useFormPopup()

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)

  const isFormOpen = computed<boolean>(() => formPopup.isOpen.value)
  const formTemplate = computed(() => formPopup.template.value as FormPopupTemplate)
  const formValues = computed(() => formPopup.values.value as FormValues)

  const isConfirmOpen = computed<boolean>(() => confirmPopup.isOpen.value)
  const confirmTitle = computed<ConfirmPopupTitle>(() => confirmPopup.title.value)
  const confirmMessage = computed<ConfirmPopupMessage>(() => confirmPopup.message.value)

  const currentCategory = computed<string | null>(() => {
    const category = route.params.category

    if (typeof category !== "string") return null

    return category !== "string" ? category : null
  })

  // CONTROLLERS
  const medicineController = new MedicineController()
  const caregiverController = new CaregiverController()
  const healthPlanController = new HealthPlanController()
  const doctorController = new DoctorController()
  const allergyController = new AllergyController()
  const emergencyContactController = new EmergencyContactController()

  // STATES
  const caregivers = ref<Caregiver[]>([])
  const healthPlans = ref<HealthPlan[]>([])
  const doctors = ref<Doctor[]>([])
  const allergies = ref<Allergy[]>([])
  const emergencyContacts = ref<EmergencyContact[]>([])
  const medicines = ref<Medicine[]>([])
  const medicinesList = ref([])

  // COMPUTED PROPERTIES
  const dynamicData = computed(() => ({
    medicines: medicinesList.value
  }))

  // Verify if selected manage page exists
  const pageExists = computed<boolean>(() => {
    const rawId = currentCategory.value

    if(!rawId) return false

    return MANAGE_PAGES.includes(rawId as ManagePageType)
  })

  // Formatting each category item data
  const formattedData = computed<FormattedItem[]>( () => {
    switch (currentCategory.value) {
      case PAGES.CAREGIVERS:
        return caregivers.value.map(caregiver => ({
          id: caregiver._id,
          title: caregiver.name,
          description: getDescription([
              caregiver.phone,
              date.getFormatted(caregiver.startDate, false)
          ])
        }))

      case PAGES.DOCTORS:
        return doctors.value.map(doctor => ({
          id: doctor._id,
          title: doctor.name,
          description: getDescription([
              utils.getOptionTranslate("speciality", `${doctor.speciality}`),
              doctor.phone
          ])
        }))

      case PAGES.ALLERGIES:
        return allergies.value.map(allergy => ({
          id: allergy._id,
          title: allergy.name
        }))

      case PAGES.MEDICINES:
        return medicines.value.map(medicine => ({
          id: medicine._id,
          title: medicine.name
              + (medicine.routeAdmin ? ` (${utils.getOptionTranslate("routeAdmin", `${medicine.routeAdmin}`)})` : ""
          ),
          description: getDescription([
              medicine.observations,
            joinTimes(medicine.administrationTimes)
          ])
        }))

      case PAGES.HEALTH_PLANS:
        return healthPlans.value.map(plan => ({
          id: plan._id,
          title: plan.name
        }))

      case PAGES.EMERGENCY_CONTACTS:
        return emergencyContacts.value.map(contact => ({
          id: contact._id,
          title: contact.name,
          description: getDescription([
            utils.getOptionTranslate(
                "kinship",
                `${contact.kinship}`
            ),
            contact.phone
          ])
        }))
      default:
        return []
    }
  })

  // FUNCTIONS
  // Loads the selected category data from database
  const loadCategoryData = async (category: string) => {
    let result = null

    switch(category) {
      case PAGES.MEDICINES:
        result = await medicineController.getAll()
        break
      case PAGES.CAREGIVERS:
        result = await caregiverController.getAll()
        break
      case PAGES.DOCTORS:
        result = await doctorController.getAll()
        break
      case PAGES.EMERGENCY_CONTACTS:
        result = await emergencyContactController.getAll()
        break
      case PAGES.ALLERGIES:
        result = await allergyController.getAll()
        break
      case PAGES.HEALTH_PLANS:
        result = await healthPlanController.getAll()
        break
      default:
        return
    }

    if (!result?.success) {
      snackbar.open((result?.code || "DBError") as WarningCode)
      return
    }

    await updateData(category as string, result.data as UpdatedData)
  }

  // Returns joined description
  const getDescription = (parts: (string | number | undefined | null)[]): string => {
    return parts.filter(Boolean).join(" • ")
  }

  // Returns the joined times sorted
  const joinTimes = (parts: string[] = []): string => {
    return parts
        .filter(Boolean)
        .sort((a, b) => {
          const [hourA, minuteA] = a.split(":").map(Number)
          const [hourB, minuteB] = b.split(":").map(Number)

          return (hourA * 60 + minuteA) - (hourB * 60 + minuteB)
        })
        .map(time => date.getNumericHour(date.timeToDate(time)))
        .join(", ")
  }

  // Returns the translated current category title
  const getCategoryTitle = (currentCategory: string): string => {
    const key = `views.${currentCategory}.categories.registers.title`

    return utils.getTranslate(key)
  }

  // Opens the confirm popup to delete an item
  const handleDelete = (item: FormattedItem): void => {
    const title = t(`confirmPopupTemplates.deleteConfirm.title`, { item: item.title }) + "?"
    confirmPopup.open(title, null, () => handleDeleteConfirmed(item))
  }

  // Executes the database query to delete an item
  const handleDeleteConfirmed = async (item: FormattedItem): Promise<void> => {
    let result = null

    const itemId: number = item.id as number

    switch(currentCategory.value){
      case PAGES.MEDICINES:
        result = await medicineController.delete(itemId)
        break
      case PAGES.CAREGIVERS:
        result = await caregiverController.delete(itemId)
        break
      case PAGES.DOCTORS:
        result = await doctorController.delete(itemId)
        break
      case PAGES.EMERGENCY_CONTACTS:
        result = await emergencyContactController.delete(itemId)
        break
      case PAGES.ALLERGIES:
        result = await allergyController.delete(itemId)
        break
      case PAGES.HEALTH_PLANS:
        result = await healthPlanController.delete(itemId)
        break
    }

    if(!result) return

    if(result && result.success) {
      await updateData(currentCategory.value as string, result.data as UpdatedData)
    }

    snackbar.open((result.code || "DBError") as WarningCode)
  }

  // Executes the database update query for the selected item
  const handleSubmit = async (formData: Record<string, unknown>) => {
    const context = formPopup.context.value as FormContext | null
    if (!context || !context.itemId) return

    const itemId = context.itemId as number
    let result = null

    const cleanData = JSON.parse(JSON.stringify(formData))

    switch(currentCategory.value){
      case PAGES.MEDICINES:
        result = await form.executeDBSubmit(() => medicineController.update(itemId, cleanData))
        break
      case PAGES.CAREGIVERS:
        result = await form.executeDBSubmit(() => caregiverController.update(itemId, cleanData))
        break
      case PAGES.DOCTORS:
        result = await form.executeDBSubmit(() => doctorController.update(itemId, cleanData))
        break
      case PAGES.EMERGENCY_CONTACTS:
        result = await form.executeDBSubmit(() => emergencyContactController.update(itemId, cleanData))
        break
      case PAGES.ALLERGIES:
        result = await form.executeDBSubmit(() => allergyController.update(itemId, cleanData))
        break
      case PAGES.HEALTH_PLANS:
        result = await form.executeDBSubmit(() => healthPlanController.update(itemId, cleanData))
        break
    }

    if(!result) return

    if(result && result.success) {
      await updateData(currentCategory.value as string, result.data as UpdatedData)

      formPopup.close()
    }

    snackbar.open((result.code || "DBError") as WarningCode)
  }

  const updateData = async (categoryId: string, updatedData: UpdatedData) => {
    switch(categoryId) {
      case PAGES.MEDICINES:
        medicines.value = updatedData as Medicine[]
        break
      case PAGES.CAREGIVERS:
        caregivers.value = updatedData as Caregiver[]
        break
      case PAGES.DOCTORS:
        doctors.value = updatedData as Doctor[]
        break
      case PAGES.EMERGENCY_CONTACTS:
        emergencyContacts.value = updatedData as EmergencyContact[]
        break
      case PAGES.ALLERGIES:
        allergies.value = updatedData as Allergy[]
        break
      case PAGES.HEALTH_PLANS:
        healthPlans.value = updatedData as HealthPlan[]
        break
    }
  }

  /**
   * - Triggers the current event target (Prevents the popup from closing unexpectedly)
   * - Defines the database data source
   * - Defines the template data (`popupTemplate`) to be displayed in the popup
   * - Defines the popup context (`sectionId` and `fieldId`) needed to access the corret database table and attribute. Example: `categoryId` = "patient" and `fieldId` = "birthDate"
   **/
  const handleButtonAction = async (button: FormattedItem, event: Event) => {
    formPopup.triggerRef.value = event.currentTarget as HTMLElement
    const popupTemplate = formTemplates.find(item => item.id === currentCategory.value) ?? null

    if(!popupTemplate) {
      snackbar.open("ItemNotFound" as WarningCode)
      return
    }

    let result = null

    const btnId = button.id as number

    switch(currentCategory.value) {
      case PAGES.MEDICINES:
        result = await medicineController.getById(btnId)
        break
      case PAGES.CAREGIVERS:
        result = await caregiverController.getById(btnId)
        break
      case PAGES.DOCTORS:
        result = await doctorController.getById(btnId)
        break
      case PAGES.EMERGENCY_CONTACTS:
        result = await emergencyContactController.getById(btnId)
        break
      case PAGES.ALLERGIES:
        result = await allergyController.getById(btnId)
        break
      case PAGES.HEALTH_PLANS:
        result = await healthPlanController.getById(btnId)
        break
      default:
        return
    }

    if (!result?.success || !result.data) {
      snackbar.open((result?.code || "DBError") as WarningCode)
      return
    }

    const currentItem = result.data

    const currentInputValues = form.getInputValue(
        currentItem as any,
        popupTemplate as FormPopupTemplate,
        "_id"
    )

    const context = {
      sectionId: currentCategory.value,
      itemId: currentItem._id,
      fieldId: button.id,
      idKey: "_id"
    }

    formPopup.open(
        popupTemplate,
        currentInputValues as FormValues,
        context,
        FORM_TYPES.EDIT
    )
  }

  // Dynamic category data loading
  watch(
      currentCategory,
      async (category) => {
        if (!category || !pageExists.value) return

        await loadCategoryData(category)
      },
      { immediate: true }
  )
</script>
