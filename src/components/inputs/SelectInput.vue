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

<script setup lang="ts">
  import { computed } from "vue"
  import { useI18n } from "vue-i18n"

  // OPTIONS
  defineOptions({
    inheritAttrs: false
  })

  // TYPES & INTERFACES
  export interface SelectOptionObj {
    placeholder?: string | number
    label?: string | number
    value: string | number
  }

  export type SelectOptionPrimitive = string | number
  export type SelectOptionItem = SelectOptionObj | SelectOptionPrimitive

  interface Props {
    label?: string
    for?: string
    name?: string
    options?: SelectOptionItem[] | Record<string, string | number>
  }

  interface NormalizedOption {
    label: string | number
    value: string | number
  }

  // MODEL
  const model = defineModel<string | number>({
    default: "",
  })

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    options: () => []
  })

  // COMPOSABLES
  const { t } = useI18n()

  // COMPUTED PROPERTIES
  const computedId = computed<string | undefined>(() => {
    return props.for || (props.name ? `input-${props.name}` : undefined)
  })

  // Normalize Objects and Arrays [{ label, value }]
  const normalizedOptions = computed<NormalizedOption[]>(() => {
    if (Array.isArray(props.options)) {
      return props.options.map(opt => {
        if (typeof opt === 'object' && opt !== null) {
          return {
            label: opt.placeholder ?? opt.label ?? opt.value,
            value: opt.value
          }
        }

        // String or number
        return {
          label: opt,
          value: opt
        }
      })
    }

    // Object Record (key: value)
    if (props.options && typeof props.options === 'object') {
      return Object.entries(props.options).map(([value, label]) => ({
        label,
        value
      }))
    }

    return []
  })
</script>