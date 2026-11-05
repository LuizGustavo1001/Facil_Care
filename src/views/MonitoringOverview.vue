<template>
  <div class="view regular">
    <!-- Monitoring Overview -->
    <!-- Here you can manage a specific Follow Ups and Vital Signs monitoring, like body temperature, or sleep quality -->
    <template v-if="pageExists()">
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

      <AppHeader :title="utils.getPageTitle(currentMonitoring)" />

      <main class="main regular gap-2">
        <!-- Days Interval Filter -->
        <ul class="filter-list flex align-center gap-05 overflow-auto">
          <li
              v-for="filter in charts.filters"
              :key="filter.label"
              class="filter-item capitalize-words"
              :class="{
                    active: activeFilterDays === filter.days
                  }"
              @click="activeFilterDays = filter.days"
          >
            {{ t(`charts.filters.${filter.id}.title`) }}
          </li>

          <li>({{ filteredMonitoringData.length }} {{ t(`utils.measurements`) }})</li>
        </ul>

        <template v-if="formattedData.length > 0">
          <!-- Chart Section -->
          <section v-if="currentCategory === PAGES.VITAL_SIGNS" class="chart-section flex flex-column gap-1">
            <VitalSignsChart
                :type="currentMonitoring"
                :records="filteredMonitoringData"
            />
          </section>

          <!-- Monitoring Item List Section -->
          <section class="main-section regular gap-1">
            <ul class="buttons-wrapper overflow-hidden">
              <li v-for="item in formattedData" :key="item.id" class="flex align-center gap-05">
                <div class="item-info flex flex-column gap-03 flex-grow-1">
                  <h2>{{ item.value }}</h2>

                  <template v-for="(text, index) in item.description" :key="index">
                    <p v-if="text" class="text-muted"> {{ text }}</p>
                  </template>
                </div>

                <IconBtn
                    :icon="icons['delete-bin-line']"
                    variant="destructive"
                    size="25px"
                    @click.stop="handleDelete(item)"
                />
              </li>
            </ul>
          </section>
        </template>

        <!-- FallBack Section -->
        <NotFoundCard v-else class="main-section center"/>
      </main>

      <AppFooter :page="currentMonitoring" />
    </template>

    <template v-else>
      <AppFallback />
    </template>
  </div>
</template>

<style scoped>
  .item-info {
    padding: var(--spacing-md);
    background: var(--color-bg-subtle);
    border-radius: var(--radius-xs);
  }

  .item-info h2 {
    font-size: var(--font-body-md);
    font-weight: var(--bold-weight);
  }
  .item-info p {
    font-size: var(--font-body-sm);
    font-weight: var(--medium-weight);
  }

  .filter-list .filter-item {
    padding: var(--spacing-xs);
    min-width: fit-content;

    border: 2px solid var(--color-border-default);

    font-size: var(--font-body-sm);
    font-weight: var(--medium-weight);
    border-radius: var(--radius-xs);

    cursor: pointer;
    transition: all 0.2s ease;
  }
  .filter-list .filter-item:hover,
  .filter-list .filter-item:focus,
  .filter-list .filter-item.active {
    background: var(--color-bg-hover);
    border-color: transparent;
  }
</style>

<script setup>
  import { computed, ref, watch } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { PAGES, VITAL_SIGNS_PAGES, FOLLOW_UPS_PAGES } from "../constants/sysPages.js"
  import { charts } from "../locales/projectConfig.js"

  import { useRoute } from "vue-router"
  import { useI18n } from "vue-i18n"
  import { useDate } from "../composables/useDate.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useConfirmPopup } from "../composables/useConfirmPopup.js"
  import { useUnitSystem } from "../composables/useUnitSystem.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFallback from "./AppFallback.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import NotFoundCard from "../components/feedback/NotFoundCard.vue"
  import IconBtn from "../components/buttons/IconBtn.vue"
  import ConfirmPopup from "../components/layout/popup/ConfirmPopup.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"
  import VitalSignsChart from "../components/dashboard/charts/VitalSignsChart.vue"

  import VitalSignController from "../controllers/VitalSignController.js"
  import FollowUpController from "../controllers/FollowUpController.js"
  import CaregiverController from "../controllers/CaregiverController.js"

  // COMPOSABLES
  const { t } = useI18n()
  const route = useRoute()
  const confirmPopup = useConfirmPopup()
  const snackbar = useSnackbar()
  const date = useDate()
  const utils = useUtils()
  const unit = useUnitSystem()

  // CONTROLLERS
  const caregiverController = new CaregiverController()
  const vitalSignsController = new VitalSignController()
  const followUpsController = new FollowUpController()

  // STATES
  const activeFilterDays = ref(charts.filters[2].days)
  const filteredMonitoringData = ref([])
  const formattedData = ref([])

  const refreshKey = ref(0)

  let fetchRequestId = 0
  let formatRequestId = 0

  // COMPUTED PROPERTIES
  const currentCategory = computed(() => route.params.category || null)
  const currentMonitoring = computed(() => route.params.monitoring || null)

  const isSnackbarOpen = computed(() => snackbar.isActive.value)
  const isConfirmOpen = computed(() => confirmPopup.isOpen.value)
  const confirmTitle = computed(() => confirmPopup.title.value)
  const confirmMessage = computed(() => confirmPopup.message.value)

  // VALIDATION
  const pageExists = () => {
    if(currentCategory.value === PAGES['FOLLOW_UPS']){
      return FOLLOW_UPS_PAGES.includes(currentMonitoring.value)
    }

    if(currentCategory.value === PAGES['VITAL_SIGNS']){
      return VITAL_SIGNS_PAGES.includes(currentMonitoring.value)
    }

    return false
  }

  // DATA FETCHING
  const getMonitoringRecords = async () => {
    switch (currentCategory.value) {
      case PAGES.FOLLOW_UPS:
        return activeFilterDays.value === null
            ? followUpsController.getByField(currentMonitoring.value)
            : followUpsController.getByFieldAndDate(
                currentMonitoring.value,
                getLimitDate()
            )

      case PAGES.VITAL_SIGNS:
        return activeFilterDays.value === null
            ? vitalSignsController.getByField(currentMonitoring.value)
            : vitalSignsController.getByFieldAndDate(
                currentMonitoring.value,
                getLimitDate()
            )

      default:
        return null
    }
  }

  /*
   * Returns the mininum date base in the active day filter.
   * ex: new Date(today - 7 days).
   **/
  const getLimitDate = () => {
    const limitDate = new Date()

    limitDate.setDate(limitDate.getDate() - activeFilterDays.value)

    limitDate.setHours(0, 0, 0, 0)

    return limitDate
  }

  const loadMonitoringData = async () => {
    const requestId = ++fetchRequestId

    if(!pageExists()) {
      filteredMonitoringData.value = []
      return
    }

    try {
      const result = await getMonitoringRecords()

      // ignore outdated requests
      if(requestId !== fetchRequestId) return

      if(result?.success && Array.isArray(result.data)) {
        filteredMonitoringData.value = result.data
      } else {
        filteredMonitoringData.value = []
        snackbar.open(result?.code)
      }
    } catch (err) {
      if (requestId !== fetchRequestId) return

      filteredMonitoringData.value = []
      console.error("Error loading monitoring records:", err)
    }
  }

  // DATA FORMATTING
  const formatMonitoringRecord = async (item) => {
    const formattedDate = item.dateTime
        ? date.getNumericDateTime(new Date(item.dateTime))
        : null

    const parsedValue = unit.getTranslatedUnit(item.record, item.value)

    const description = []

    if(item.caregiverId) {
      const caregiver = await caregiverController.getById(Number(item.caregiverId))

      if(caregiver?.data?.name) {
        description.push(caregiver.data.name)
      }
    }

    if(formattedDate) {
      description.push(formattedDate)
    }

    return {
      id: item._id,
      value: [
        parsedValue.value,
        parsedValue.unit
      ].filter(Boolean).join(" "),
      description: [
        description.join(" • "),
        item.observations || null
      ],
      type: item.record,
      originalRecord: { ...item }
    }
  }

  const setFormattedData = async (records) => {
    const requestId = ++formatRequestId

    const result = await Promise.all(
        records.map(formatMonitoringRecord)
    )

    // Prevent an older formatting operation from replacing newer data.
    if (requestId === formatRequestId) {
      formattedData.value = result
    }
  }

  // DELETE
  const handleDelete = (item) => {
    const itemCategory = currentCategory.value === PAGES.VITAL_SIGNS
        ? t("utils.vitalSign")
        : t("utils.followUp")

    const title = t("confirmPopupTemplates.deleteConfirm.title", { item: itemCategory.toLocaleLowerCase() }) + "?"

    confirmPopup.open(title, null, () => handleDeleteConfirmed(item))
  }

  const handleDeleteConfirmed = async (item) => {
    let result

    switch (currentCategory.value) {
      case PAGES.VITAL_SIGNS:
        result = await vitalSignsController.delete(
            item.id,
            currentMonitoring.value
        )
        break

      case PAGES.FOLLOW_UPS:
        result = await followUpsController.delete(
            item.id,
            currentMonitoring.value
        )
        break
    }

    if (!result) return

    snackbar.open(result.code)

    if (result.success) {
      // Trigger a new query using the currently selected filter.
      refreshKey.value++
    }
  }

  // WATCHERS
  watch(
      [currentCategory, currentMonitoring, activeFilterDays, refreshKey],
      loadMonitoringData,
      { immediate: true }
  )

  watch(
      filteredMonitoringData,
      setFormattedData,
      { immediate: true }
  )
</script>