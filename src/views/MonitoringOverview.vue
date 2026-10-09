<template>
  <div class="view regular">
    <template v-if="pageExists(currentCategory)">
      <AppOverlay />

      <ConfirmPopup
          :isOpen="isConfirmOpen"
          :popupRef="confirmPopup.popupRef"
          :title="confirmTitle"
          :message="confirmMessage"
          @cancel="confirmPopup.close"
          @confirm="confirmPopup.handleConfirm"
      />

      <Snackbar
          :isActive="isSnackbarOpen"
          :message="snackbar.data.message"
          :type="snackbar.data.type || undefined"
          @click="snackbar.clear"
      />

      <AppHeader
          :title="utils.getPageTitle(currentType)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="navigation.handleReturn"
      />

      <main class="main regular gap-2">
        <template v-if="formattedData.length > 0">

          <!-- Chart Section -->
          <section v-if="currentCategory === PAGES.VITAL_SIGNS" class="chart-section flex flex-column gap-1">
            <ul class="filter-list flex align-center gap-05 overflow-auto">
              <li
                  v-for="filter in charts.filters"
                  :key="filter.label"
                  class="filter-item"
                  :class="{
                    active: activeFilterDays === filter.days
                  }"
                  @click="activeFilterDays = filter.days"
              >
                {{ t(`charts.filters.${filter.id}.title`) }}
              </li>

              <li>({{ filteredMonitoringData.length }} {{ t(`utils.measurements`) }})</li>
            </ul>

            <VitalSignsChart
                :type="currentType"
                :records="filteredMonitoringData"
            />
          </section>

          <!-- Monitoring Item List Section -->
          <section class="main-section regular gap-1">
            <ul class="list flex flex-column gap-1">
              <li v-for="item in formattedData" :key="item._id" class="flex align-center gap-05">

                <div class="item-info flex flex-column gap-03 flex-grow-1">
                  <h2>{{ item.value }}</h2>

                  <template v-for="(text, index) in item.description" :key="index">
                    <p v-if="text" class="text-muted"> {{ text }}</p>
                  </template >
                </div>

                <IconBtn
                    :icon="icons['delete-bin-line']"
                    variant="destructive"
                    @click.stop="handleDelete(item)"
                />
              </li>
            </ul>
          </section>
        </template>

        <NotFoundCard v-else class="main-section center"/>
      </main>

      <AppFooter :page="currentType" />
    </template>

    <template v-else>
      <AppFallback />
    </template>
  </div>
</template>

<style scoped>
  .item-info{
    padding: var(--spacing-lg);
    background: var(--color-bg-subtle);

    border-radius: var(--radius-lg);
  }

  .item-info h2{
    font-size: var(--text-heading-md);
    font-weight: var(--bold-weight);
  }
  .item-info p{
    font-size: var(--text-body-md);
    font-weight: var(--medium-weight);
  }

  .filter-list .filter-item{
    padding: var(--spacing-sm);
    background: var(--color-bg-subtle);
    border: 1px solid var(--color-border-default);
    font-size: var(--text-body-md);
    font-weight: var(--bold-weight);

    min-width: fit-content;

    border-radius: var(--radius-sm);

    cursor: pointer;
    transition: all 0.2s ease;
  }
  .filter-list .filter-item:hover, .filter-list .filter-item:focus, .filter-list .filter-item.active{
    background: var(--color-bg-hover);
  }
</style>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { PAGES, VITAL_SIGNS_PAGES, FOLLOW_UPS_PAGES } from "../composables/usePages.js"
  import { charts } from "../locales/projectConfig.js"

  import { useRoute } from "vue-router"
  import { useI18n } from "vue-i18n"

  import { useNavigation } from "../composables/useNavigation.js"
  import { useDate } from "../composables/useDate.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useConfirmPopup } from "../composables/useConfirmPopup.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFallback from "./AppFallback.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import NotFoundCard from "../components/feedback/NotFoundCard.vue"
  import IconBtn from "../components/buttons/IconBtn.vue"
  import ConfirmPopup from "../components/layout/popup/ConfirmPopup.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"
  import VitalSignsChart from "../components/dashboard/charts/VitalSignsChart.vue"

  import VitalSignsController from "../controllers/VitalSignsController.js"
  import FollowUpsController from "../controllers/FollowUpsController.js"

  // COMPOSABLES
  const { t } = useI18n()
  const route = useRoute()
  const confirmPopup = useConfirmPopup()
  const snackbar = useSnackbar()
  const navigation = useNavigation()
  const date = useDate()
  const utils = useUtils()

  // COMPUTED PROPERTIES
  const activeFilterDays = ref(7)

  const isSnackbarOpen = computed(() => snackbar.isActive.value)

  const isConfirmOpen = computed(() => confirmPopup.isOpen.value)
  const confirmTitle = computed(() => confirmPopup.title.value)
  const confirmMessage = computed(() => confirmPopup.message.value)

  // Returns selected monitoring type (Vital Sign or Follow Up)
  const currentCategory = computed(() => {
    return route.params.category || null
  })

  // Returns selected monitoring type item
  const currentType = computed(() => {
    return route.params.type || null
  })

  const filteredMonitoringData = computed(() => {
    if(activeFilterDays.value === null) { // all data
      return monitoringData.value
    }

    // min date
    const limitDate = new Date()
    limitDate.setDate(limitDate.getDate() - activeFilterDays.value)
    const limitTimestamp = limitDate.getTime()

    return monitoringData.value.filter(record => {
      const recordTimestamp = new Date(record.dateTime).getTime()

      // return only the registries within the interval
      return recordTimestamp >= limitTimestamp
    })
  })

  // FUNCTIONS
  // Verify if selected monitoring overview page exists
  const pageExists = () => {
    if(currentCategory.value === PAGES['FOLLOW_UPS']){
      return FOLLOW_UPS_PAGES.includes(currentType.value)
    }

    if(currentCategory.value === PAGES['VITAL_SIGNS']){
      return VITAL_SIGNS_PAGES.includes(currentType.value)
    }

    return false
  }

  const handleDelete = async (item) => {
    const titleSlot = computed(() => {
      return currentCategory.value === "vitalSigns" ? t(`utils.vitalSign`) : t(`utils.followUp`)
    })

    const title = t(`confirmPopupTemplates.deleteConfirm.title`, { item: titleSlot.value.toLowerCase() }) + "?"
    confirmPopup.open(title, null, () => handleDeleteConfirmed(item))
  }

  const handleDeleteConfirmed = async (item) => {
    let result = null

    if(currentCategory.value === "vitalSigns"){
      result = await vitalSignsController.removeRecordById(item.id, currentType.value)
    }else if(currentCategory.value === "followUps"){
      result = await followUpsController.removeRecordById(item.id, currentType.value)
    }

    if(result && result.success){
      monitoringData.value = result.data

      // Formatting result
      setFormattedData(result.data)

      snackbar.open(result.code)
    }else if(result){
      snackbar.open(result.code)
    }
  }

  /**
   * Formats the database data into information to be displayed on the screen
   *
   * @param { Object | Array } result - Database query result
   **/
  const setFormattedData = (result) => {
    formattedData.value = []

    for(const item of result){
      const formattedDate = item.dateTime ? date.getFormatted(new Date(item.dateTime)) : null
      const unit = utils.getMeasurementUnit(item.record)
      const subTitleParts = [item.caregiverName, formattedDate].filter(Boolean)

      formattedData.value.push({
        id: item._id,
        value: `${item.value}${unit ? ` ${unit}` : ''} `.trim(),
        description: [
          subTitleParts.join(' • '),
          item.observation || null
        ],
        type: item.record
      })
    }
  }

  // CONTROLLERS
  const vitalSignsController = new VitalSignsController()
  const followUpsController = new FollowUpsController()

  const monitoringData = ref([])
  const formattedData = ref([])

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    let result = []

    switch(currentCategory.value){
      case PAGES['FOLLOW_UPS']:
        result = await followUpsController.getByField(currentType.value)
        break
      case PAGES['VITAL_SIGNS']:
        result = await vitalSignsController.getByField(currentType.value)
        break
    }

    if (result.success) {
      monitoringData.value = result.data
    } else {
      snackbar.open(result.code)
    }

    // Formatting result
    setFormattedData(result.data)
  })
</script>