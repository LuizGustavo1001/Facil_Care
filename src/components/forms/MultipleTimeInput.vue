<template>
  <div class="input-wrapper flex flex-column gap-05">
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
          class="default-input-attr active-border flex-grow-1"
          @input="updateTime(index, $event.target.value)"
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
          title="Adicionar Horário"
          padding="xs"
          type="button"
          class="add-time-btn"
          style="width: fit-content"
          @click.stop="addTime"
      />
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
  import { computed } from "vue"
  import { icons } from "../../assets/icons/icons.js"
  import { useDate } from "../../composables/useDate.js"

  import IconBtn from "../buttons/IconBtn.vue"
  import ActionButton from "../buttons/ActionButton.vue"

  // COMPOSABLES
  const date = useDate()

  defineOptions({
    inheritAttrs: false
  })

  // MODEL
  const model = defineModel({
    type: Array,
    default: () => [""]
  })

  // PROPS
  const props = defineProps({
    label: String,
    for: String,
    name: String,
    readonly: {
      type: Boolean,
      default: false
    }
  })

  // COMPUTED
  const computedId = computed(() => {
    return props.for || (props.name ? `input-${props.name}` : undefined)
  })

  // Keep at least one input visible
  const timeValues = computed(() => {
    return model.value.length ? model.value : [""]
  })

  // METHODS
  function updateTime(index, value){
    const updatedTimes = [...timeValues.value]
    updatedTimes[index] = value

    model.value = updatedTimes
  }

  function addTime(){
    model.value = [...timeValues.value, date.getTime()]
  }

  function removeTime(index){
    if(timeValues.value.length <= 1){
      model.value = [""]
      return
    }

    model.value = timeValues.value.filter((_, i) => i !== index)
  }
</script>
