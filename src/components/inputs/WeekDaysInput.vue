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
      <ActionButton
        v-for="day in weekDays"
        :key="day.value"
        tag="button"
        class="week-day-button"
        :align-center="true"
        :title="getDayLabel(day.value)"
        :class="{ active: isSelected(day.value) }"
        variant="subtle"
        @click="toggleDayBtn(day.value)"
      />
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
  }
  .week-day-button.active {
    background: var(--color-bg-blue);
  }
</style>

<script setup>
  import { weekDays } from "../../locales/projectConfig.js"
  import { formatedLanguage } from "../../composables/useDate.js"

  import ActionButton from "../buttons/ActionButton.vue"

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
