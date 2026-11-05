<template>
  <fieldset class="default-input-wrapper">
    <!-- Text Area Input -->
    <legend
        v-if="label"
        class="input-label text-muted"
    >
      {{ label }}
    </legend>

    <textarea
        :id="computedId"
        v-model="model"
        :name="name"
        :rows="rows"
        class="custom-textarea width-full default-input-attr active-border"
        v-bind="$attrs"
    />
  </fieldset>
</template>

<style scoped>
  .custom-textarea {
    resize: vertical;
    min-height: 80px;
  }

  .input-label {
    font-size: var(--font-label-md);
    padding-inline: var(--spacing-sm);
    margin-left: var(--spacing-sm);
  }
</style>

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
    id: String,
    name: String,
    rows: { // initial visible lines amount
      type: String,
      default: "2"
    }
  })

  // COMPUTED PROPERTIES
  const computedId = computed(() => {
    return props.id || (props.name ? `input-${props.name}` : undefined)
  })
</script>