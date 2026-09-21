<template>
  <div class="view">
    <template v-if="$te(`utils.${currentItem}.title`)">
      <SnackBar
          v-if="monitorignController.state.message"
          :message="monitorignController.state.message"
      />

      <AppHeader
          :title="$t(`utils.${currentItem}.title`)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="handleReturn"
      />

      <main>
        <section>
          <ul
              v-if="formattedData.length > 0"
              class="list flex flex-column gap-1"
          >
            <li
                v-for="item in formattedData"
                :key="item._id"
            >
              <ActionButton
                  tag="button"
                  :rightIcon="icons['pencil-line']"
                  :title="item.value"
                  :description="item.description"
                  variant="subtle"
                  padding="lg"
                  class="width-full"
                  style="border-radius: var(--radius-sm)"
              />
            </li>
          </ul>

          <div v-else>
            <p>Nenhum monitoramento encontrado...</p>
          </div>

        </section>
      </main>

      <AppFooter :page="currentItem" />
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
  import { computed, onMounted, ref } from "vue"
  import { useRoute } from "vue-router"

  import { icons } from "../assets/icons/icons.js"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useAge } from "../composables/useAge.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFallback from "./AppFallback.vue"
  import SnackBar from "../components/common/SnackBar.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import ActionButton from "../components/common/ActionButton.vue"

  import db from "../database/db.js"
  import PatientRecordController from "../controllers/PatientRecordController.js"

  const route = useRoute()

  // Returns selected monitoring type
  const currentType = computed(() => {
    return route.params.type || null
  })

  // Returns selected monitoring type item
  const currentItem = computed(() => {
    return route.params.itemId || null
  })

  // Composables
  const { handleReturn } = useNavigation()
  const { getFormattedDate } = useAge()

  // Functions
  const monitorignController = new PatientRecordController(db, currentType.value)
  const monitoringData = ref([])

  const formattedData = ref([])

  onMounted(async () => {
    const result = await monitorignController.getByType(currentItem.value)

    if(result.length > 0){
      Object.assign(monitoringData.value, result)
    }

    // Formatting result
    for(const item of result){
      const formattedDate = item.dateTime ? getFormattedDate(new Date(item.dateTime)) : null

      const descriptionParts = [item.caregiverName, formattedDate].filter(Boolean)

      const hasUnit = item.unit
      const unitText = hasUnit ? item.unit : ''

      formattedData.value.push({
        id: item.id,
        value: `${item.value}${unitText ? ` ${unitText}` : ''}`.trim(),
        description: descriptionParts.join(' • '),
        observation: item.observation || ''
      })
    }
  })
</script>