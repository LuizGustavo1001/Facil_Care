<template>
  <div class="view">
    <template v-if="pageExists(currentType)">

      <SnackBar
          v-if="warning.message !== ''"
          :message="warning.message"
          :type="warning.type || undefined"
      />

      <AppHeader
          :title="getPageTitle(currentItem)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="handleReturn"
      />

      <main>
        <section>
          <ul
              v-if="formattedData.length > 0"
              class="list flex flex-column gap-1 overflow-hidden"
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
            <p>{{ $t(`warningMessages.NoMonitoring.title`) }}...</p>
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
  }
</style>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { useRoute } from "vue-router"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useAge } from "../composables/useAge.js"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFallback from "./AppFallback.vue"
  import SnackBar from "../components/common/SnackBar.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import ActionButton from "../components/common/ActionButton.vue"

  import db from "../database/db.js"
  import VitalSignsController from "../controllers/VitalSignsController.js"
  import FollowUpsController from "../controllers/FollowUpsController.js"
  import {useWarning} from "../composables/useWarning.js";


  // Composables
  const route = useRoute()
  const { getWarning, warning } = useWarning()
  const { handleReturn } = useNavigation()
  const { getFormattedDate } = useAge()
  const { getPageTitle, PAGES, MONITORING_VITAL_SIGNS_PAGES, MONITORING_FOLLOW_UPS_PAGES } = useUtils()

  // Functions
  // Returns selected monitoring type
  const currentType = computed(() => {
    return route.params.type || null
  })

  // Returns selected monitoring type item
  const currentItem = computed(() => {
    return route.params.itemId || null
  })

  // Verify if selected monitoring overview page exists
  const pageExists = () => {
    if(currentType.value === PAGES['FOLLOW_UPS']){
      return MONITORING_FOLLOW_UPS_PAGES.includes(currentItem.value)
    }

    if(currentType.value === PAGES['VITAL_SIGN']){
      return MONITORING_VITAL_SIGNS_PAGES.includes(currentItem.value)
    }

    return false
  }

  const vitalSignsController = new VitalSignsController(db)
  const followUpsController = new FollowUpsController(db)

  const monitoringData = ref([])
  const formattedData = ref([])

  onMounted(async () => {
    let result = []

    switch(currentType.value){
      case PAGES['FOLLOW_UPS']:
        result = await followUpsController.getByType(currentItem.value)
        break
      case PAGES['VITAL_SIGN']:
        result = await vitalSignsController.getByType(currentItem.value)
        break
    }

    if(result.success){
      monitoringData.value = result.data
    }else{
      getWarning(result.code)
    }

    // Formatting result
    for(const item of result.data){
      const formattedDate = item.dateTime ? getFormattedDate(new Date(item.dateTime)) : null
      const descriptionParts = [item.caregiverName, formattedDate].filter(Boolean)
      const unitText = item.unit ? item.unit : ''

      formattedData.value.push({
        id: item.id,
        value: `${item.value}${unitText ? ` ${unitText}` : ''}`.trim(),
        description: descriptionParts.join(' • '),
        observation: item.observation || ''
      })
    }
  })
</script>