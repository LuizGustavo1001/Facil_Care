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

<script setup lang="ts">
  import { computed } from "vue"

  // OPTIONS
  defineOptions({
    inheritAttrs: false
  })

  // MODEL
  const model = defineModel<string | number>({ default: "" })

  // TYPES & INTERFACES
  interface Props {
    label?: string
    id?: string
    name?: string
    rows?: string // number of lines within textarea
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    rows: "2"
  })

  // COMPUTED PROPERTIES
  const computedId = computed<string | undefined>(() => {
    return props.id || (props.name ? `input-${props.name}` : undefined)
  })
</script>