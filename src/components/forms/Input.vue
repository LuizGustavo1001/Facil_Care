<template>
  <div class="input-wrapper flex flex-column gap-05">
    <label
        v-if="label"
        :for="computedId"
        class="input-label text-muted"
    >
      {{ label }}
    </label>

    <input
        :id="computedId"
        v-model="formattedModel"
        :type="inputType"
        :name="name"
        v-bind="$attrs"
        class="default-input-attr active-border"
    >
  </div>
</template>

<style scoped>
  .input-label{
    font-size: var(--font-label-md);
  }
</style>

<script setup>
  import { computed } from "vue"
  import { useUtils } from "../../composables/useUtils.js"
  import { useDate } from "../../composables/useDate.js"

  // MODEL
  defineOptions({
    inheritAttrs: false
  })

  const model = defineModel({
    type: [String, Number],
    default: ""
  })

  // PROPS
  const props = defineProps({
    label: String,
    for: String,
    inputType: {
      type: String,
      default: "text"
    },
    name: String
  })

  // COMPOSABLES
  const utils = useUtils()
  const date = useDate()

  // COMPUTED PROPERTIES
  // Make sure that input ID matches label Id
  const computedId = computed(() => {
    return props.for || (props.name ? `input-${props.name}` : undefined)
  })

  // V-model interceptor - format input value
  const formattedModel = computed( {
    get(){
      const value = model.value ?? ""

      if(props.inputType === "datetime-local" && value){
        return date.formatToDateTimeLocal(value)
      }

      if(props.inputType === "date"){
        return String(value).split("T")[0]
      }

      if(props.inputType === "tel"){
        return utils.formatPhone(value)
      }

      return value
    },
    set(newValue){
      if(props.inputType === "datetime-local" || props.inputType === "date"){
        model.value = newValue
            ? model.value = newValue ? new Date(newValue).toISOString() : ""
            : ""

        return
      }

      /*
      if(props.inputType === 'date'){ // Store date + time
        model.value = newValue
            ? `${newValue}T00:00:00.000Z`
            : ""
        return
      }
       */

      if(props.inputType === "tel"){ // Store only phone digits
        model.value = String(newValue ?? "")
            .replace(/\D/g, "")

        return
      }

      model.value = newValue
    }
  })
</script>
