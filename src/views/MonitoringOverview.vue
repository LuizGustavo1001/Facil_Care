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

      <AppHeader :title="utils.getPageTitle(currentMonitoring as string)" />

      <main class="main regular gap-2">
        <!-- Days Interval Filter -->
        <ul class="filter-list flex align-center gap-05 overflow-auto">
          <li
              v-for="filter in charts.filters"
              :key="filter.id"
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
                :type="currentMonitoring as string"
                :records="filteredMonitoringData as MonitoringRecord[]"
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

      <AppFooter :page="currentMonitoring as string" />
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

<script setup lang="ts">
  import { computed, ref, watch } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { charts } from "../locales/projectConfig"

  import { useRoute } from "vue-router"
  import { useI18n } from "vue-i18n"
  import { useDate } from "../composables/useDate"
  import { useUtils } from "../composables/useUtils"
  import { useSnackbar } from "../composables/useSnackbar"
  import { useConfirmPopup } from "../composables/useConfirmPopup"
  import { useUnitSystem } from "../composables/useUnitSystem"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFallback from "./AppFallback.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import NotFoundCard from "../components/feedback/NotFoundCard.vue"
  import IconBtn from "../components/buttons/IconBtn.vue"
  import ConfirmPopup from "../components/layout/popup/ConfirmPopup.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"
  import VitalSignsChart from "../components/dashboard/charts/VitalSignsChart.vue"

  import VitalSignController from "../controllers/VitalSignController"
  import FollowUpController from "../controllers/FollowUpController"
  import CaregiverController from "../controllers/CaregiverController"

  import type { FollowUp } from "../interfaces/FollowUp"
  import type { VitalSign } from "../interfaces/VitalSign"

  import { PAGES, VITAL_SIGNS_PAGES, FOLLOW_UPS_PAGES } from "../constants/sysPages"

  import type { WarningCode } from "../types/snackbar"
  import type { TranslatableUnitItem }  from "../types/sysUnits"
  import type { FollowUpType, VitalSignType } from "../types/sysPages"
  import type { ConfirmPopupMessage, ConfirmPopupTitle } from "../types/confirmPopup"

  // TYPES & INTERFACES
  export type MonitoringRecord = VitalSign | FollowUp

  interface FormattedMonitoringItem {
    id: number | undefined
    value: string
    description: (string | null | undefined)[]
    type: string
    originalRecord: MonitoringRecord
  }

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
  const activeFilterDays = ref<number | null>(charts.filters[2].days)
  const filteredMonitoringData = ref<MonitoringRecord[]>([])
  const formattedData = ref<FormattedMonitoringItem[]>([])

  const refreshKey = ref<number>(0)

  let fetchRequestId: number = 0
  let formatRequestId: number = 0

  // COMPUTED PROPERTIES
  const currentCategory = computed<string | null>(() => {
    const category = route.params.category

    if (typeof category !== "string") return null

    return category !== "string" ? category : null
  })

  const currentMonitoring = computed<string | null>(() => {
    const category = route.params.monitoring

    if (typeof category !== "string") return null

    return category !== "string" ? category : null
  })

  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)

  const isConfirmOpen = computed<boolean>(() => confirmPopup.isOpen.value)
  const confirmTitle = computed<ConfirmPopupTitle>(() => confirmPopup.title.value)
  const confirmMessage = computed<ConfirmPopupMessage>(() => confirmPopup.message.value)

  // VALIDATION
  const pageExists = (): boolean => {
    if(currentCategory.value === PAGES['FOLLOW_UPS']) {
      return FOLLOW_UPS_PAGES.includes(currentMonitoring.value as FollowUpType)
    }

    if(currentCategory.value === PAGES['VITAL_SIGNS']) {
      return VITAL_SIGNS_PAGES.includes(currentMonitoring.value as VitalSignType)
    }

    return false
  }

  // DATA FETCHING
  const getMonitoringRecords = async () => {
    const days = activeFilterDays.value as number

    switch (currentCategory.value) {
      case PAGES.FOLLOW_UPS:
        return days === null
            ? followUpsController.getByField(currentMonitoring.value as FollowUpType)
            : followUpsController.getByFieldAndDate(
                currentMonitoring.value as FollowUpType,
                getLimitDate()
            )

      case PAGES.VITAL_SIGNS:
        return days === null
            ? vitalSignsController.getByField(currentMonitoring.value as VitalSignType)
            : vitalSignsController.getByFieldAndDate(
                currentMonitoring.value as VitalSignType,
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

    const days = activeFilterDays.value as number

    limitDate.setDate(limitDate.getDate() - (days ?? 0))
    limitDate.setHours(0, 0, 0, 0)

    return limitDate
  }

  const loadMonitoringData = async (): Promise<void> => {
    const requestId = ++fetchRequestId

    if(!pageExists()) {
      filteredMonitoringData.value = []
      return
    }

    try {
      const result = await getMonitoringRecords()

      // Ignore outdated requests
      if(requestId !== fetchRequestId) return

      if(result?.success && Array.isArray(result.data)) {
        filteredMonitoringData.value = result.data as MonitoringRecord[]
      } else {
        filteredMonitoringData.value = []
        snackbar.open(result?.code as WarningCode)
      }
    } catch (err) {
      if (requestId !== fetchRequestId) return

      filteredMonitoringData.value = []
      console.error("Error loading monitoring records:", err)
    }
  }

  // DATA FORMATTING
  const formatMonitoringRecord = async (item: MonitoringRecord): Promise<FormattedMonitoringItem> => {
    const formattedDate = item.dateTime
        ? date.getNumericDateTime(new Date(item.dateTime))
        : null

    const parsedValue = unit.getTranslatedUnit(item.record as TranslatableUnitItem, item.value)

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
        "observations" in item && item?.observations || null
      ],
      type: item.record,
      originalRecord: { ...item }
    }
  }

  const setFormattedData = async (records: MonitoringRecord[]): Promise<void> => {
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
  // Opens the confirm popup to delete an item
  const handleDelete = (item: FormattedMonitoringItem): void => {
    const itemCategory = currentCategory.value === PAGES.VITAL_SIGNS
        ? t("utils.vitalSign")
        : t("utils.followUp")

    const title = t("confirmPopupTemplates.deleteConfirm.title", { item: itemCategory.toLocaleLowerCase() }) + "?"

    confirmPopup.open(title, null, () => handleDeleteConfirmed(item))
  }

  // Executes the database query to delete an item
  const handleDeleteConfirmed = async (item: FormattedMonitoringItem): Promise<void> => {
    let result

    const itemId = item.id as number

    switch (currentCategory.value) {
      case PAGES.VITAL_SIGNS:
        result = await vitalSignsController.delete(itemId)
        break

      case PAGES.FOLLOW_UPS:
        result = await followUpsController.delete(itemId)
        break
    }

    if (!result) return

    snackbar.open(result.code as WarningCode)

    if (result.success) {
      // Trigger a new query using the currently selected filter
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