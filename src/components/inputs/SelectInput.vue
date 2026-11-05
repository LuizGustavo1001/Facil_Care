<template>
  <fieldset class="default-input-wrapper">
    <!-- Select Input -->
    <legend
        v-if="label"
        class="input-label text-muted"
    >
      {{ label }}
    </legend>
    <select
        :id="computedId"
        v-model="model"
        :name="name"
        v-bind="$attrs"
        class="cursor-pointer default-input-attr"
    >
      <!-- 1. Default Option -->
      <option value="" disabled hidden>
        {{t(`utils.selectOption`)}}...
      </option>

      <!-- 2. Specific Option(s) -->
      <slot>
        <!-- Fallback: render via Prop if slot not specified -->
        <template v-if="normalizedOptions.length">
          <option
              v-for="opt in normalizedOptions"
              :key="opt.value"
              :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </template>
      </slot>
    </select>
  </fieldset>

</template>

<style scoped>
  .input-label {
    font-size: var(--font-label-md);
    padding-inline: var(--spacing-sm);
    margin-left: var(--spacing-sm);
  }
</style>

<script setup>
  import { computed } from "vue"
  import { useI18n } from "vue-i18n"

  const { t } = useI18n()

  // MODEL
  defineOptions({
    inheritAttrs: false
  })

  const model = defineModel({ type: [String, Number], default: "" })

  // PROPS
  const props = defineProps({
    label: String,
    for: String,
    name: String,
    options: {
      type: [Array, Object],
      default: () => ([])
    }
  })

  // COMPUTED PROPERTIES
  const computedId = computed(() => {
    return props.id || (props.name ? `input-${props.name}` : undefined)
  })

  // Normalize Objects and Arrays [{ label, value }]
  const normalizedOptions = computed(() => {
    if (Array.isArray(props.options)) {
      return props.options.map(opt => {
        if (typeof opt === 'object' && opt !== null) {
          return {
            label: opt.placeholder,
            value: opt.value
          }
        }

        return {
          label: opt,
          value: opt
        }
      })
    }

    if (props.options && typeof props.options === 'object') {
      return Object.entries(props.options).map(([value, label]) => ({
        label,
        value
      }))
    }

    return []
  })
</script>