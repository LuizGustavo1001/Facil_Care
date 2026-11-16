<template>
  <input
      class="check-box flex-shrink active-border"
      type="checkbox"
      :checked="props.modelValue"
      @change="handleChange"
  >
</template>

<style scoped>
  .check-box {
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    margin: 0;
    font: inherit;

    width: 1.5em;
    height: 1.5em;

    border: 0.2em solid var(--color-border-default);
    border-radius: var(--radius-xs);
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;

    cursor: pointer;
  }

  .check-box::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    background: var(--color-text-primary);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--color-shadow-subtle);

    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  .check-box:checked::before {
    transform: scale(1);
  }
</style>

<script setup lang="ts">
  const props = defineProps<{
    modelValue?: boolean
  }>()

  const emit = defineEmits<{
    change: [checked: boolean]
  }>()

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit("change", target.checked)
  }
</script>