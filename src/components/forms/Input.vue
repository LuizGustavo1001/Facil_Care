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
        v-model="model"
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
</script>
