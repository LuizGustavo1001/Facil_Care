<template>
  <div class="input-wrapper flex flex-column" style="gap: var(--spacing-3xs)">
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
        class="default-input-attr"
    >
  </div>
</template>

<style scoped>
</style>

<script setup>
  import {computed} from "vue"

  defineOptions({
    inheritAttrs: false
  })

  const model = defineModel({ type: [String, Number], default: "" })

  const props = defineProps({
    label: String,
    id: String,
    inputType: {
      type: String,
      default: "text"
    },
    name: String
  })

  // make sure that input ID match each other
  const computedId = computed(() => {
    return props.id || (props.name ? `input-${props.name}` : undefined)
  })
</script>
