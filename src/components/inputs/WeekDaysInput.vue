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
      <button
          v-for="day in weekDaysFormat"
          :key="day.value"
          class="week-day-button flex align-center justify-center semi-bold-weight active-border"
          type="button"
          :class="{ active: isSelected(day.value) }"
          @click="toggleDayBtn(day.value)"
      >
        {{ date.getDayLabel(day.value, "narrow") }}
      </button>
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
    display: inline-flex;
    align-content: center;
    justify-content: center;

    width: 35px;
    height: 35px;

    color: var(--color-text-primary-muted);

    background: none;
    border: 2px solid var(--color-border-default);
    border-radius: var(--radius-full);

    cursor: pointer;

    transition: all 0.2s ease;
  }
  .week-day-button.active,
  .week-day-button:hover {
    background: var(--color-bg-blue);
    color: var(--color-text-blue);
    border-color: transparent;
  }

  .week-day-button:hover {
    background: var(--color-bg-hover);
  }
</style>

<script setup lang="ts">
  import { weekDaysFormat } from "../../locales/projectConfig"
  import { useDate } from "../../composables/useDate"

  // COMPOSABLES
  const date = useDate()

  // OPTIONS
  defineOptions({
    inheritAttrs: false
  })

  // MODEL
  const model = defineModel<number[]>({ default: () => [] })

  // TYPES & INTERFACES
  interface WeekDaysInputProps {
    label?: string
    name?: string
  }

  // PROPS
  const props = defineProps<WeekDaysInputProps>()

  // FUNCTIONS
  const isSelected = (dayValue: number): boolean => {
    return model.value.includes(dayValue)
  }

  function toggleDayBtn(day: number): void {
    if(isSelected(day)) {
      model.value = model.value.filter(item => item !== day)
      return
    }

    model.value = [...model.value, day].sort((a, b) => a - b)
  }
</script>
