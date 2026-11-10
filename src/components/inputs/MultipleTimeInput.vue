<template>
  <div class="input-wrapper flex flex-column gap-05">
    <!-- Multiple Time Input -->
    <label
        v-if="label"
        :for="computedId"
        class="input-label text-muted"
    >
      {{ label }}
    </label>

    <div class="flex flex-column gap-05">
      <div
        v-for="(time, index) in timeValues"
        :key="index"
        class="time-input-row flex align-center justify-center gap-05"
      >
        <input
          :id="index === 0
            ? computedId
            : `${computedId}-${index}`"
          :name="`${name || 'time'}[]`"
          type="time"
          :value="time"
          v-bind="$attrs"
          :readonly="readonly"
          class="alt-input-attr active-border flex-grow-1"
          @input="updateTime(index, ($event.target as HTMLInputElement).value)"
        >

        <IconBtn
            v-if="timeValues.length > 1 && !readonly"
            tag="button"
            :icon="icons['delete-bin-fill']"
            variant="destructive"
            size="20px"
            type="button"
            class="remove-time-btn"
            @click.stop="removeTime(index)"
        />
      </div>

      <ActionButton
          v-if="!readonly"
          tag="button"
          variant="subtle"
          :description="t(`utils.addSchedule`)"
          padding="xs"
          type="button"
          class="add-time-btn"
          style="width: fit-content; align-self: flex-end"
          @click.stop="addTime"
      />
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  import { computed } from "vue"
  import { icons } from "../../assets/icons/icons.js"

  import { useI18n } from "vue-i18n"
  import { useDate } from "../../composables/useDate"

  import IconBtn from "../buttons/IconBtn.vue"
  import ActionButton from "../buttons/ActionButton.vue"

  // OPTIONS
  defineOptions({
    inheritAttrs: false
  })

  // TYPES & INTERFACES
  interface Props {
    label?: string
    for?: string
    name?: string
    readonly?: boolean
  }

  // MODEL
  const model = defineModel<string[]>({
    default: () => [""]
  })

  // COMPOSABLES
  const { t } = useI18n()
  const date = useDate()

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    readonly: false
  })

  // COMPUTED
  const computedId = computed<string | undefined>(() => {
    return props.for || (props.name ? `input-${props.name}` : undefined)
  })

  // Keep at least one input visible
  const timeValues = computed<string[]>(() => {
    return model.value.length ? model.value : [""]
  })

  // METHODS
  function updateTime(index: number, value: string): void {
    const updatedTimes = [...timeValues.value]
    updatedTimes[index] = value

    model.value = updatedTimes
  }

  function addTime(): void {
    model.value = [...timeValues.value, date.getNumericHour()]
  }

  function removeTime(index: number): void {
    if(timeValues.value.length <= 1){
      model.value = [""]
      return
    }

    model.value = timeValues.value.filter((_, i) => i !== index)
  }
</script>
