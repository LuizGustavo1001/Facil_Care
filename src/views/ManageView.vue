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
                  :tag="BUTTON_TAGS.BUTTON"
                  :rightIcon="icons['pencil-line']"
                  rightIconSize="23px"
                  :title="item.title"
                  :description="item.description"
                  :variant="ACTION_BUTTON_VARIANTS.SUBTLE"
                  :borderRadius="BORDER_RADIUS.MEDIUM"
                  class="width-full"
                  @click.stop="handleButtonAction(item, $event)"
              />

              <!-- Delete Registry Icon -->
              <IconBtn
                  :icon="icons['delete-bin-line']"
                  size="25px"
                  :variant="ICON_BTN_VARIANTS.DESTRUCTIVE"
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
  import { icons } from "../assets/icons/icons"
  import { formTemplates } from "../locales/projectConfig"

  import { MANAGE_PAGES, PAGES } from "../constants/sysPages"
  import { FORM_TYPES } from "../constants/components/appForms"
  import {
    ACTION_BUTTON_VARIANTS,
    BUTTON_TAGS,
    ICON_BTN_VARIANTS
  } from "../constants/components/appButtons"
  import { BORDER_RADIUS } from "../constants/spacing"

  import type { WarningCode } from "../types/components/snackbar"
  import type { FormValues } from "../types/components/appForm"
  import type { ManagePageType } from "../types/sysPages"
  import type { ConfirmPopupTitle, ConfirmPopupMessage, FormContext } from "../types/components/appPopup"

  import { useRoute } from "vue-router"
  import { useUtils } from "../composables/useUtils"
  import { useI18n } from "vue-i18n"
  import { useSnackbar } from "../composables/components/useSnackbar"
  import { useForm } from "../composables/components/useForm"
  import { useDate } from "../composables/useDate"
  import { useConfirmPopup } from "../composables/components/useConfirmPopup"
  import { useFormPopup } from "../composables/components/useFormPopup"

  import MedicineController from "../controllers/MedicineController"
  import CaregiverController from "../controllers/CaregiverController"
  import HealthPlanController from "../controllers/HealthPlanController"
  import DoctorController from "../controllers/DoctorController"
  import AllergyController from "../controllers/AllergyController"
  import EmergencyContactController from "../controllers/EmergencyContactController"

  import type { ICaregiver } from "../interfaces/ICaregiver"
  import type { IHealthPlan } from "../interfaces/IHealthPlan"
  import type { IDoctor } from "../interfaces/IDoctor"
  import type { IAllergy } from "../interfaces/IAllergy"
  import type { IEmergencyContact } from "../interfaces/IEmergencyContact"
  import type { IMedicine } from "../interfaces/IMedicine"
  import type { FormPopupTemplate } from "../interfaces/IForm"

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

  // TYPES & INTERFACES
  interface FormattedItem {
    id: number | undefined
    title: string
    description?: string
  }

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
  const caregivers = ref<ICaregiver[]>([])
  const healthPlans = ref<IHealthPlan[]>([])
  const doctors = ref<IDoctor[]>([])
  const allergies = ref<IAllergy[]>([])
  const emergencyContacts = ref<IEmergencyContact[]>([])
  const medicines = ref<IMedicine[]>([])
  const medicinesList = ref([])

  const categoryConfig = {
    [PAGES.MEDICINES]: {
      controller: medicineController,
      setData: (data: IMedicine[]) => medicines.value = data
    },
    [PAGES.CAREGIVERS]: {
      controller: caregiverController,
      setData: (data: ICaregiver[]) => caregivers.value = data
    },
    [PAGES.DOCTORS]: {
      controller: doctorController,
      setData: (data: IDoctor[]) => doctors.value = data
    },
    [PAGES.EMERGENCY_CONTACTS]: {
      controller: emergencyContactController,
      setData: (data: IEmergencyContact[]) => emergencyContacts.value = data
    },
    [PAGES.ALLERGIES]: {
      controller: allergyController,
      setData: (data: IAllergy[]) => allergies.value = data
    },
    [PAGES.HEALTH_PLANS]: {
      controller: healthPlanController,
      setData: (data: IHealthPlan[]) => healthPlans.value = data
    }
  }

  type CategoryKey = keyof typeof categoryConfig

  // Returns the configuration for the selected category
  const getCategoryConfig = (category: string | null) => {
    if (!category || !(category in categoryConfig)) return null

    return categoryConfig[category as CategoryKey]
  }

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
    switch(currentCategory.value) {
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
    const config = getCategoryConfig(category)

    if(!config) return

    const result = await config.controller.getAll()

    if(!result?.success) {
      snackbar.open((result?.code || "DBError") as WarningCode)
      return
    }

    config.setData(result.data as never)
  }

  // Returns joined description
  const getDescription = (parts: (string | number | undefined | null)[]): string => {
    return parts.filter(Boolean).join(" • ")
  }

  // Returns the joined times sorted
  const joinTimes = (parts: string[] = []): string => {
    const sortedParts = date.sortTimes(parts)

    return sortedParts
        .map(
            time => date.getNumericHour(
                date.timeToDate(time)
            )
        )
        .join(", ")
  }

  // Returns the translated current category title
  const getCategoryTitle = (currentCategory: string): string => {
    const key = `views.${currentCategory}.categories.registers.title`
    return utils.getTranslate(key)
  }

  // Opens the confirmation popup to delete an item
  const handleDelete = (item: FormattedItem): void => {
    const title = t(`confirmPopupTemplates.deleteConfirm.title`, { item: item.title }) + "?"
    confirmPopup.open(title, null, () => handleDeleteConfirmed(item))
  }

  // Executes the database query to delete an item
  const handleDeleteConfirmed = async (item: FormattedItem): Promise<void> => {
    const config = getCategoryConfig(currentCategory.value)

    if(!config || item.id === undefined) return

    const result = await config.controller.delete(item.id)

    if(!result) return

    if(!result.success) {
      snackbar.open((result.code || "DBError") as WarningCode)
      return
    }

    const newData = await config.controller.getAll()

    if(!newData?.success) {
      snackbar.open((newData?.code || "DBError") as WarningCode)
      return
    }

    if(result.success) {
      config.setData(newData.data as never)
      snackbar.open((result.code || "DBError") as WarningCode)
    }
  }

  // Executes the database update query for the selected item
  const handleSubmit = async (formData: Record<string, unknown>) => {
    const context = formPopup.context.value as FormContext | null

    if(!context || !context.itemId) return

    const config = getCategoryConfig(currentCategory.value)

    if(!config) return

    const itemId = context.itemId as number
    const cleanData = JSON.parse(JSON.stringify(formData))

    const result = await config.controller.update(itemId, cleanData)

    if(!result) return

    if(!result.success) {
      snackbar.open((result.code || "DBError") as WarningCode)
      return
    }

    const newData = await config.controller.getAll()

    if(!newData?.success) {
      snackbar.open((newData?.code || "DBError") as WarningCode)
      return
    }

    if(result.success) {
      config.setData(newData.data as never)
      snackbar.open((result.code || "DBError") as WarningCode)
    }

    formPopup.close()
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

    const config = getCategoryConfig(currentCategory.value)

    if(!config || button.id === undefined) return

    let result = await config.controller.getById(button.id)

    if(!result?.success || !result.data) {
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
