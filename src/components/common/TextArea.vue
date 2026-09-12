<template>
  <div class="input-wrapper flex flex-column width-full" style="gap: var(--spacing-3xs)">
    <label
        v-if="label"
        :for="computedId"
        class="text-muted"
    >
      {{ label }}
    </label>

    <textarea
        :id="computedId"
        v-model="model"
        :name="name"
        :rows="rows"
        class="custom-textarea width-full default-input-attr active-border"
        v-bind="$attrs"
    />
  </div>
</template>

<style scoped>
  .custom-textarea{
    resize: vertical;
    min-height: 80px;
  }
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
    name: String,
    rows: { // initial visible lines amount
      type: String,
      default: "2"
    }
  })

  const computedId = computed(() => {
    return props.id || (props.name ? `input-${props.name}` : undefined)
  })
</script>