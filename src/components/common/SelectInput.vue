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
      class="cursor-pointer default-input-attr"
    >
      <option value="" disabled selected hidden>Selecione uma opção...</option>

      <template v-if="isObject(options)">
        <option
            v-for="(label, value) in options"
            :key="value"
            :value="value" >
          {{ label }}
        </option>
      </template>
    </select>
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
    name: String,
    options: {
      type: [Array, Object],
      default: () => ({})
    }
  })

  // make sure that input ID match each other
  const computedId = computed(() => {
    return props.id || (props.name ? `input-${props.name}` : undefined)
  })

  // verify if the option is object
  const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val)
</script>
