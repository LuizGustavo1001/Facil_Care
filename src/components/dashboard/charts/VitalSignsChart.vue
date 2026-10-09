<template>
  <div class="chart-container">
    <Line v-if="parsedRecords.length" :key="chartKey" :data="chartData" :options="chartOptions" />

    <p v-else>{{ t(`charts.${PAGES.VITAL_SIGNS}.fallback`) }}</p>
  </div>
</template>

<style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: 320px;
  }
</style>

<script setup>
  import { computed, ref, watch } from "vue"
  import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js"
  import { Line } from "vue-chartjs"

  import { PAGES } from "../../../composables/usePages.js"
  import { charts } from "../../../locales/projectConfig.js"

  import { useI18n } from "vue-i18n"
  import { useUtils } from "../../../composables/useUtils.js"
  import { useDate } from "../../../composables/useDate.js"

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

  // COMPOSABLES
  const { t, locale } = useI18n()
  const utils = useUtils()
  const date = useDate()

  // PROPS
  const props = defineProps({
    type: {
      type: String,
      required: true
    },
    records: {
      type: Array,
      default: () => []
    }
  })

  const parsedRecords = ref([])
  const chartData = ref({ labels: [], datasets: [] })
  const chartKey = ref(0)

  const unit = computed(() => utils.getMeasurementUnit(props.type))

  const chartOptions = {
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
          label: context => `${context.dataset.label}: ${context.parsed.y} ${unit.value}`
        }
      }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: t(`charts.${PAGES.VITAL_SIGNS}.${props.type}.x_axis`)
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: `${t(`charts.${PAGES.VITAL_SIGNS}.${props.type}.y_axis`)} (${unit.value})`
        }
      }
    }
  }

  // Normalize a record's value into named numeric series
  function normalizeValues(value) {
    if(props.type === PAGES.BLOOD_PRESSURE){
      value = parseBloodPressure(value)
    }

    if (typeof value === "number") return { value }

    if(typeof value === "string") return { value: Number(value) }

    if(value && typeof value === "object" && !Array.isArray(value)){
      return Object.fromEntries(
          Object.entries(value).filter(
              ([, item]) =>typeof item === "number"
          )
      )
    }

    return {}
  }

  // Parses X/Y to [X, Y]
  function parseBloodPressure(value) {
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

  function getDatasets(records){
    const seriesKey = [
        ...new Set(
            records.flatMap(record => Object.keys(record.values))
        )
    ]

    return seriesKey.map((key, index) => ({
      label: t(`charts.${PAGES.VITAL_SIGNS}.${props.type}.values.${key}`),
      data: records.map(record => record.values[key] ?? null),
      borderColor: charts.colors[index % charts.colors.length],
      backgroundColor: charts.colors[index % charts.colors.length],
      pointRadius: 4,
      tension: 0.25,
      spanGaps: false
    }))
  }

  watch([() => props.records, () => props.type, locale], ([records, type]) => {
      const processed = records
          .filter(record => record.record === type)
          .map(record => ({
            dateTime: record.dateTime,
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