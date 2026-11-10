<template>
  <fieldset class="default-input-wrapper">
    <!-- Regular Input -->
    <legend
        v-if="label"
        class="input-label text-muted"
    >
      {{ label }}
    </legend>

    <input
      :id="computedId"
      v-model="formattedModel"
      :type="inputType"
      :name="name"
      v-bind="$attrs"
      class="default-input-attr"
    >
  </fieldset>

</template>

<style scoped>
  .input-label {
    font-size: var(--font-label-md);
    padding-inline: var(--spacing-sm);
    margin-left: var(--spacing-sm);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import { useUtils } from "../../composables/useUtils"
  import { useDate } from "../../composables/useDate"

  // OPTIONS
  defineOptions({
    inheritAttrs: false
  })

  // TYPES & INTERFACES
  interface InputProps {
    label?: string
    for?: string
    inputType?: string
    name?: string
  }

  // MODEL
  const model = defineModel<string | number>({
    default: ""
  })

  // PROPS
  const props = withDefaults(defineProps<InputProps>(), {
    inputType: "text"
  })

  // COMPOSABLES
  const utils = useUtils()
  const date = useDate()

  // COMPUTED PROPERTIES

  // Make sure that input ID matches label Id
  const computedId = computed<string | undefined>(() => {
    return props.for || (props.name ? `input-${props.name}` : undefined)
  })

  // V-model interceptor - format input value
  const formattedModel = computed( {
    get(): string | number {
      const value = model.value ?? ""

      if(props.inputType === "datetime-local" && value) {
        return date.getCurrentDateTimeLocal(new Date(value))
      }

      if(props.inputType === "date") {
        return String(value).split("T")[0]
      }

      if(props.inputType === "tel") {
        return utils.formatPhone(String(value))
      }

      return value
    },
    set(newValue: string | number) {
      if(props.inputType === "datetime-local" || props.inputType === "date"){
        model.value = newValue
            ? new Date(newValue).toISOString()
            : ""

        return
      }

      if(props.inputType === "tel"){ // Store only phone digits
        model.value = String(newValue ?? "").replace(/\D/g, "")
        return
      }

      model.value = newValue
    }
  })
</script>
