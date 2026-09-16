<template>
  <div class="input-wrapper flex flex-column" style="gap: var(--spacing-3xs)">
    <label
        v-if="label"
        :for="computedId"
        class="text-muted"
    >
      {{ label }}
    </label>

    <select
        :id="computedId"
        v-model="model"
        :name="name"
        v-bind="$attrs"
        class="cursor-pointer default-input-attr active-border"
    >
      <option value="" disabled hidden>Selecione uma opção...</option>

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
  </div>
</template>

<script setup>
import { computed } from "vue"

defineOptions({
  inheritAttrs: false
})

const model = defineModel({ type: [String, Number], default: "" })

const props = defineProps({
  label: String,
  for: String,
  name: String,
  options: {
    type: [Array, Object],
    default: () => ([])
  }
})

const computedId = computed(() => {
  return props.id || (props.name ? `input-${props.name}` : undefined)
})

// Normaliza tanto Objetos quanto Arrays em um formato padrão: [{ label, value }]
const normalizedOptions = computed(() => {
  if (Array.isArray(props.options)) {
    return props.options.map(opt => {
      if (typeof opt === 'object' && opt !== null) {
        return { label: opt.label ?? opt.text ?? opt.value, value: opt.value }
      }
      return { label: opt, value: opt }
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