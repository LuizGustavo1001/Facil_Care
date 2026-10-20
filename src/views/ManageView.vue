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
  import { computed, ref, watch } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { formTemplates } from "../locales/projectConfig.js"
  import { MANAGE_PAGES, PAGES } from "../composables/usePages.js"

  import { useRoute } from "vue-router"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useI18n } from "vue-i18n"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { FORM_TYPES, useForm } from "../composables/useForm.js"
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

  import MedicineController from "../controllers/MedicineController.js"
  import MedicineRegistriesController from "../controllers/MedicineRegistriesController.js"
  import CaregiverController from "../controllers/CaregiverController.js"
  import HealthPlanController from "../controllers/HealthPlanController.js"
  import DoctorController from "../controllers/DoctorController.js"
  import AllergyController from "../controllers/AllergyController.js"
  import EmergencyContactController from "../controllers/EmergencyContactController.js"

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
  const medicineController = new MedicineController()
  const medicineRegistryController = new MedicineRegistriesController()
  const caregiverController = new CaregiverController()
  const healthPlanController = new HealthPlanController()
  const doctorController = new DoctorController()
  const allergyController = new AllergyController()
  const emergencyContactController = new EmergencyContactController()

  const caregivers = ref([])
  const healthPlans = ref([])
  const doctors = ref([])
  const allergies = ref([])
  const emergencyContacts = ref([])
  const medicines = ref([])
  const medicineRegistries = ref([])

  // Verify if selected manage page exists
  const pageExists = computed(() => {
    const rawId = currentCategory.value

    if(!rawId) return null

    return MANAGE_PAGES.includes(rawId)
  })

  // COMPUTED PROPERTIES
  const formattedData = computed(() => {
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
              utils.getOptionTranslate(`speciality.${doctor.speciality}`),
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
          title: medicine.name + (medicine.routeAdmin
              ? ` (${utils.getOptionTranslate(
                  `routeAdmin.${medicine.routeAdmin}`
              )})`
              : ""
          ),
          description: getDescription([medicine.observations])
        }))

      case PAGES.MEDICINE_REGISTRIES:
        return medicineRegistries.value.map(registry => ({
          id: registry._id,
          title: `${registry.medicationName} (${registry.medicationDosage})`,
          description: getDescription([
            registry.observations,
            registry.caregiverName
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
                `kinship.${contact.kinship}`
            ),
            contact.phone
          ])
        }))
      default:
        return []
    }
  })

  // FUNCTIONS
  const loadCategoryData = async (category) => {
    let result = null

    switch(category) {
      case PAGES.MEDICINES:
        result = await medicineController.getAll()
        break
      case PAGES.MEDICINE_REGISTRIES:
        result = await medicineRegistryController.getAll()
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
      snackbar.open(result?.code || "DBError")
      return
    }

    await updateData(category, result.data)
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

    switch(currentCategory.value){
      case PAGES.MEDICINES:
        result = await medicineController.delete(item.id)
        break
      case PAGES.MEDICINE_REGISTRIES:
        result = await medicineRegistryController.delete(item.id)
        break
      case PAGES.CAREGIVERS:
        result = await caregiverController.delete(item.id)
        break
      case PAGES.DOCTORS:
        result = await doctorController.delete(item.id)
        break
      case PAGES.EMERGENCY_CONTACTS:
        result = await emergencyContactController.delete(item.id)
        break
      case PAGES.ALLERGIES:
        result = await allergyController.delete(item.id)
        break
      case PAGES.HEALTH_PLANS:
        result = await healthPlanController.delete(item.id)
        break
    }

    if(!result) return

    if(result && result.success){
      await updateData(currentCategory.value, result.data)
    }

    snackbar.open(result.code || "DBError")
  }

  const handleSubmit = async (formData) => {
    const context = formPopup.context.value
    if (!context) return

    const { itemId } = context

    let result = null

    switch(currentCategory.value){
      case PAGES.MEDICINES:
        result = await form.executeDBSubmit(() => medicineController.update(itemId, formData))
        break
      case PAGES.MEDICINE_REGISTRIES:
        result = await form.executeDBSubmit(() => medicineRegistryController.update(itemId, formData))
        break
      case PAGES.CAREGIVERS:
        result = await form.executeDBSubmit(() => caregiverController.update(itemId, formData))
        break
      case PAGES.DOCTORS:
        result = await form.executeDBSubmit(() => doctorController.update(itemId, formData))
        break
      case PAGES.EMERGENCY_CONTACTS:
        result = await form.executeDBSubmit(() => emergencyContactController.update(itemId, formData))
        break
      case PAGES.ALLERGIES:
        result = await form.executeDBSubmit(() => allergyController.update(itemId, formData))
        break
      case PAGES.HEALTH_PLANS:
        result = await form.executeDBSubmit(() => healthPlanController.update(itemId, formData))
        break
    }

    if(!result) return

    if(result && result.success){
      await updateData(currentCategory.value, result.data)

      formPopup.close()
    }

    snackbar.open(result.code || "DBError")
  }

  const updateData = async (categoryId, updatedData) => {
    switch(categoryId){
      case PAGES.MEDICINES:
        medicines.value = updatedData
        break
      case PAGES.MEDICINE_REGISTRIES:
        medicineRegistries.value = updatedData
        break
      case PAGES.CAREGIVERS:
        caregivers.value = updatedData
        break
      case PAGES.DOCTORS:
        doctors.value = updatedData
        break
      case PAGES.EMERGENCY_CONTACTS:
        emergencyContacts.value = updatedData
        break
      case PAGES.ALLERGIES:
        allergies.value = updatedData
        break
      case PAGES.HEALTH_PLANS:
        healthPlans.value = updatedData
        break
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
  const handleButtonAction = async (button, event) => {
    formPopup.triggerRef.value = event.currentTarget

    const popupTemplate = formTemplates.find(item => item.id === currentCategory.value) ?? null
    if(!popupTemplate){
      snackbar.open("ItemNotFound")
      return
    }

    let result = null

    switch(currentCategory.value){
      case PAGES.MEDICINES:
        result = await medicineController.getById(button.id)
        break
      case PAGES.MEDICINE_REGISTRIES:
        result = await medicineRegistryController.getById(button.id)
        break
      case PAGES.CAREGIVERS:
        result = await caregiverController.getById(button.id)
        break
      case PAGES.DOCTORS:
        result = await doctorController.getById(button.id)
        break
      case PAGES.EMERGENCY_CONTACTS:
        result = await emergencyContactController.getById(button.id)
        break
      case PAGES.ALLERGIES:
        result = await allergyController.getById(button.id)
        break
      case PAGES.HEALTH_PLANS:
        result = await healthPlanController.getById(button.id)
        break
      default:
        return
    }

    if (!result?.success || !result.data) {
      snackbar.open(result?.code || "DBError")
      return
    }

    const currentItem = result.data

    const currentInputValues = form.getInputValue(
        currentItem,
        popupTemplate,
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
        currentInputValues,
        context,
        FORM_TYPES.EDIT
    )
  }

  // Dynamic category data loading
  watch(currentCategory, async (category) => {
    if(!category || !pageExists.value) return

    await loadCategoryData(category)
  }, { immediate: true })
</script>
