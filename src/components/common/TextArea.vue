<template>
  <div class="input-wrapper flex flex-column width-full">
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
        class="custom-textarea width-full"
        v-bind="$attrs"
    ></textarea>
  </div>
</template>

<style scoped>
  .input-wrapper{
    gap: 0.3em;
  }

  .custom-textarea{
    font-family: inherit;
    font-size: var(--text-body-md);
    font-weight: 500;

    padding: var(--padding-lg);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-default);

    resize: vertical;
    min-height: 80px;

    transition: all 0.2s ease;
  }

  .custom-textarea:focus {
    color: var(--color-text-focus, inherit);
    border-color: var(--color-border-focus, #3b82f6);
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
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

  // make sure that input ID match each other
  const computedId = computed(() => {
    return props.id || (props.name ? `input-${props.name}` : undefined)
  })
</script>