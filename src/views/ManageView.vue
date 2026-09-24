<template>
  <div class="view">
    <template v-if="pageExists">
      <SnackBar
          v-if="patientController.state.message"
          :message="patientController.state.message"
      />

      <AppHeader
          :title="getPageTitle(itemId)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="handleReturn"
      />

      <main>
        <section class="flex flex-column gap-1">
          <h2 class="section-title text-muted">{{ getSectionTitle(itemId) }}</h2>

          <ul
              v-if="formattedData.length > 0"
              class="list flex flex-column gap-1"
          >
            <li v-for="item in formattedData" :key="item.id">
              <ActionButton
                  tag="button"
                  :rightIcon="icons['pencil-line']"
                  :title="item.title"
                  :description="item.description"
                  variant="subtle"
                  padding="lg"
                  class="width-full"
                  style="border-radius: var(--radius-sm)"
              />
            </li>
          </ul>

          <div v-else>
            <p>Nenhum item encontrado para categoria selecionada...</p>
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

<style scoped>
  .list{
    border-radius: var(--radius-lg);
    overflow: hidden
  }
</style>

<script setup>
  import { computed, onMounted, ref, watch } from "vue"

  import { icons } from "../assets/icons/icons.js"
  import { footers } from "../locales/projectConfig.js"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useRoute } from "vue-router"
  import { useI18n } from "vue-i18n"

  import AppHeader from "../components/common/AppHeader.vue"
  import ActionButton from "../components/common/ActionButton.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import SnackBar from "../components/common/SnackBar.vue"

  import db from "../database/db.js"
  import PatientController from "../controllers/PatientController.js"
  import MedicinesController from "../controllers/MedicinesController.js"

  // Composables
  const route = useRoute()
  const { t, te } = useI18n()
  const { handleReturn } = useNavigation()
  const { getPageTitle, MANAGE_PAGES } = useUtils()

  // Functions
  // Retrieve page data
  const footerMap = computed(() => new Map(footers.map(item => [item.id, item])))
  const itemId = computed(() => route.params.itemId)

  // Verify if selected manage page exists
  const pageExists = computed(() => {
    const rawId = itemId.value

    if(!rawId) return null

    return MANAGE_PAGES.includes(rawId)
  })

  const patientController = new PatientController(db)
  const medicineController = new MedicinesController(db)

  const patient = ref(null)
  const medicines = ref([])
  const formattedData = ref([])

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
            id: caregiver.id,
            title: caregiver.name,
            description: getDescription([
              caregiver.phone,
              caregiver.startDate
            ])
          })
        }
        break
      case "doctors":
        for(const doctor of data.doctors ?? []){
          formattedData.value.push({
            id: doctor._id,
            title: doctor.name,
            description: getDescription([
              doctor.speciality,
              doctor.phone
            ])
          })
        }
        break
      case "allergies":
        for(const [i, allergy] of (data.allergies ?? []).entries()){
          formattedData.value.push({
            id: i,
            title: allergy
          })
        }
        break
      case "medicines":
        for(const medicine of data.medicines ?? []){
          formattedData.value.push({
            id: medicine._id,
            title: medicine.name
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

  // If updates -> refill section
  watch([patient, medicines, itemId], () => {
    fillSection()
  }, { deep: true })

  onMounted(async() => {
    patient.value = await patientController.getPatient()
    medicines.value = await medicineController.getAll()
  })
</script>
