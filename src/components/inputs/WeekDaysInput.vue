<template>
  <fieldset class="week-days-input flex flex-column gap-03">
    <!-- Week Days Input -->
    <p
      v-if="label"
      class="input-label text-muted"
    >
      {{ label }}
    </p>

    <div class="week-days-wrapper flex gap-05">
      <div
          v-for="day in weekDays"
          :key="day.value"
          class="week-day-button flex align-center justify-center"
          :class="{ active: isSelected(day.value) }"
          @click="toggleDayBtn(day.value)"
      >
        {{ getDayLabel(day.value) }}
      </div>
    </div>

    <!-- Selected days for FormData -->
    <input
        v-for="day in model"
        :key="day"
        type="hidden"
        :name="`${name}[]`"
        :value="day"
    >
  </fieldset>
</template>

<style scoped>
  .week-days-input {
    border: none;
  }

  .input-label {
    font-size: var(--font-label-md);
  }

  .week-day-button {
    width: 35px;
    height: 35px;

    border: 2px solid var(--color-border-default);
    border-radius: var(--radius-full);

    cursor: pointer;

    transition: all 0.2s ease;
  }
  .week-day-button.active,
  .week-day-button:hover {
    background: var(--color-bg-blue);
    border-color:transparent;
  }
</style>

<script setup>
  import { weekDays } from "../../locales/projectConfig.js"
  import { formatedLanguage } from "../../composables/useDate.js"

  // MODEL
  const model = defineModel({
    type: Array,
    default: () => []
  })

  // PROPS
  const props = defineProps({
    label: String,
    name: String
  })

  // FUNCTIONS
  const getDayLabel = (dayNumber) => {
    // 05/01/2025 it's a sunday
    const date = new Date(2025, 0, 5 + dayNumber)

    return date.toLocaleString(formatedLanguage, {
      weekday: "narrow"
    })
  }

  const isSelected = (dayValue) => {
    return model.value.includes(dayValue)
  }

  function toggleDayBtn(day) {
    if(isSelected(day)) {
      model.value = model.value.filter(item => item !== day)
      return
    }

    model.value = [...model.value, day].sort((a, b) => a - b)
  }
</script>
