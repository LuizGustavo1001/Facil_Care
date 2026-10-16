<template>
  <div class="input-wrapper flex flex-column gap-05">
    <label
        v-if="label"
        :for="computedId"
        class="text-muted"
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

<style scoped></style>

<script setup>
import { computed } from "vue"

  // MODEL
  defineOptions({
    inheritAttrs: false
  })

  const model = defineModel({ type: [String, Number], default: "" })

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

  // COMPUTED PROPERTIES
  // Make sure that input ID matches label Id
  const computedId = computed(() => {
    return props.for || (props.name ? `input-${props.name}` : undefined)
  })

  // V-model interceptor - format input value
  const formattedModel = computed( {
    get(){
      if(props.inputType === 'date'){ // returns the date
        return model.value.split('T')[0]
      }

      return model.value
    },
    set(newValue){
      if(props.inputType === 'date' && newValue){
        model.value = `${newValue}T00:00:00.000Z`
      }else{
        model.value = newValue
      }
    }
  })
</script>
