<template>
  <div class="input-wrapper flex flex-column">
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
      class="cursor-pointer"
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
  .input-wrapper{
    gap: 0.3em;
  }

  .input-wrapper select{
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border-default);
    background: transparent;

    padding: var(--padding-lg);
    font-size: var(--text-body-md);
    font-weight: 500;

    transition: all 0.2s ease;
  }
  .input-wrapper select:focus {
    color: var(--color-text-focus);
    border-color: var(--color-border-focus);
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
