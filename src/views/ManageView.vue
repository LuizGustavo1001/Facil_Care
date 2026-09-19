<template>
  <div class="view">
    <template v-if="currentItem">
      <SnackBar
          v-if="patientController.state.message"
          :message="patientController.state.message"
      />

      <AppHeader
          :title="$t(`views.${itemId}.headerTitle`)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="handleReturn"
      />

      <main>
        <section class="flex flex-column gap-1">
          <h2 class="section-title text-muted">{{ $t(`views.${itemId}.sections.registers.title`) }}</h2>

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
  import { useRoute } from "vue-router"
  import { computed, onMounted, ref } from "vue"

  import { icons } from "../assets/icons/icons.js"
  import { useNavigation } from "../composables/useNavigation.js"
  import { footers } from "../locales/projectConfig.js"

  import * as projectConfig from "../locales/projectConfig.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import ActionButton from "../components/common/ActionButton.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import SnackBar from "../components/common/SnackBar.vue"

  import db from "../database/db.js"
  import PatientController from "../controllers/PatientController.js"

  const route = useRoute()

  // Retrieve page data
  const footerMap = computed(() => new Map(footers.map(item => [item.id, item])))
  const itemId = computed(() => route.params.itemId)
  const currentItem = computed(() => {
    const rawId = itemId.value
    if(!rawId) return null

    const id = `${rawId}View`

    return projectConfig[id] ?? footerMap.value.get(itemId.value) ?? null
  })

  // Composables
  const { handleReturn } = useNavigation()

  // Functions
  const patientController = new PatientController(db)

  const formattedData = ref([])

  onMounted(async() => {
    const patient = await patientController.getPatient()

    if(patient){
      switch(itemId.value){
        case "caregivers": // Object
          for(const caregiver of patient.caregivers ?? []){
            const descriptionParts = [caregiver.phone, caregiver.startDate]

            formattedData.value.push({
              id: caregiver._id,
              title: caregiver.name,
              description: descriptionParts.join(" • ")
            })
          }
          break
        case "doctors": // Object
          for(const doctor of patient.doctors ?? []){
            const descriptionParts = [doctor.speciality, doctor.phone]

            formattedData.value.push({
              id: doctor._id,
              title: doctor.name,
              description: descriptionParts.join(" • ")
            })
          }
          break
        case "allergies": // Array
          for(let i = 0; i < patient.allergies.length; i++){
            formattedData.value.push({
              id: i,
              title: patient.allergies[i]
            })
          }
          break
        case "medicines": // Object
          // development...
          break
      }
    }
  })
</script>
