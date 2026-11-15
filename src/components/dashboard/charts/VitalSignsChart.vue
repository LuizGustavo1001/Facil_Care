<template>
  <div class="chart-container width-full">
    <Line
        v-if="parsedRecords.length"
        :key="chartKey"
        :data="chartData"
        :options="chartOptions"
    />

    <p v-else>{{ utils.getTranslate(`charts.${PAGES.VITAL_SIGNS}.fallback`) }}</p>
  </div>
</template>

<style scoped>
  .chart-container {
    height: 320px;
  }
</style>

<script setup lang="ts">
  import { computed, ref, watch } from "vue"
  import {
    Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title,
    type ChartData,
    type ChartOptions
  } from "chart.js"
  import { Line } from "vue-chartjs"

  import { PAGES } from "../../../constants/sysPages"
  import { charts } from "../../../locales/projectConfig"
  import { TRANSLATABLE_ITEMS } from "../../../constants/sysUnits"
  import type { TranslatableUnitItem } from "../../../types/sysUnits"

  import { useUtils } from "../../../composables/useUtils"
  import { useDate } from "../../../composables/useDate"
  import { useUnitSystem } from "../../../composables/useUnitSystem"
  import { currentLanguage } from "../../../composables/useLanguage"

  import type { MonitoringRecord } from "../../../views/MonitoringOverview.vue"

  ChartJS.register(
      LineController,
      LineElement,
      PointElement,
      CategoryScale,
      LinearScale,
      Tooltip,
      Legend,
      Title
  )

  // TYPES & INTERFACES
  export interface ParsedRecord {
    dateTime: string
    values: Record<string, number>
  }

  interface Props {
    type: string
    records?: MonitoringRecord[]
  }

  // COMPOSABLES
  const date = useDate()
  const unit = useUnitSystem()
  const utils = useUtils()

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), ({
    records: () => []
  }))

  // VARIABLES
  const parsedRecords = ref<ParsedRecord[]>([])
  const chartData = ref<ChartData<'line'>>({ labels: [], datasets: [] })
  const chartKey = ref<number>(0)

  // COMPUTED PROPERTIES
  const currentUnit = computed<string>(() => unit.getUnit(props.type))

  const chartOptions = computed<ChartOptions<'line'>>(() => ({
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: 'index'
    },

    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: context => `${context.dataset.label}: ${context.parsed.y} ${currentUnit.value}`
        }
      }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: utils.getTranslate(`charts.${PAGES.VITAL_SIGNS}.${props.type}.x_axis`)
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: `${utils.getTranslate(`charts.${PAGES.VITAL_SIGNS}.${props.type}.y_axis`)} (${currentUnit.value})`
        }
      }
    }
  }))


  // FUNCTIONS

  // Parses 'X/Y' to `{ systolic: X, diastolic: Y }`
  function parseBloodPressure(value: unknown): Record<string, number> | null {
    if (typeof value !== 'string') return null

    const match = value.match(
        /^\s*(\d+(?:[.,]\d+)?)\s*\/\s*(\d+(?:[.,]\d+)?)\s*$/
    )

    if (!match) return null

    return {
      systolic: Number(match[1].replace(',', '.')),
      diastolic: Number(match[2].replace(',', '.'))
    }
  }

  // Normalize a record's value into named numeric series
  function normalizeValues(value: unknown): Record<string, number> {
    let parsedValue = value

    if(props.type === PAGES.BLOOD_PRESSURE) {
      parsedValue = parseBloodPressure(parsedValue)
    }

    const isTranslatable = (TRANSLATABLE_ITEMS as readonly string[]).includes(props.type)

    if(isTranslatable) {
      parsedValue = Number(unit.toImperial(props.type as TranslatableUnitItem, parsedValue as string | number))
    }

    if(typeof parsedValue === "number") return { value: parsedValue }

    if(typeof parsedValue === "string") return { value: Number(parsedValue) }

    if(parsedValue && typeof parsedValue === "object" && !Array.isArray(parsedValue)){
      return Object.fromEntries(
          Object.entries(parsedValue).filter(
              ([, item]) => typeof item === "number"
          )
      ) as Record<string, number>
    }

    return {}
  }

  function getDatasets(records: ParsedRecord[]) {
    const seriesKey = [
        ...new Set(
            records.flatMap(record => Object.keys(record.values))
        )
    ]

    return seriesKey.map((key, index) => ({
      label: utils.getTranslate(`charts.${PAGES.VITAL_SIGNS}.${props.type}.values.${key}`),
      data: records.map(record => record.values[key] ?? null),
      borderColor: charts.colors[index % charts.colors.length],
      backgroundColor: charts.colors[index % charts.colors.length],
      pointRadius: 4,
      tension: 0.25,
      spanGaps: false
    }))
  }

  // WATCHERS
  watch([() => props.records, () => props.type, currentLanguage], ([records, type]) => {
        const processed: ParsedRecord[] = records
            .filter(record => record.record === type)
            .map(record => ({
              dateTime: record.dateTime instanceof Date
                  ? record.dateTime.toISOString()
                  : String(record.dateTime),
              values: normalizeValues(record.value)
            }))
            .filter(record =>
                Object.keys(record.values).length > 0 &&
                !Number.isNaN(Date.parse(record.dateTime))
            )
            .sort(
                (a, b) =>
                    Date.parse(a.dateTime) - Date.parse(b.dateTime)
            )

        parsedRecords.value = processed

        chartData.value = {
          labels: processed.map(record =>
              date.getFormatted(record.dateTime, true)
          ),
          datasets: getDatasets(processed)
        }

        chartKey.value++
      },
      {
        immediate: true,
        deep: true
      }
  )
</script>
