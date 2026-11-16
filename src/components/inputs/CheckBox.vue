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
    display: grid;
    place-content: center;

    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;

    font: inherit;

    width: 23px;
    height: 23px;

    border: 3px solid var(--color-border-default);
    border-radius: var(--radius-xs);

    cursor: pointer;
  }

  .check-box::before {
    content: "";

    width: 11px;
    height: 11px;

    transform: scale(0);

    background: var(--color-text-blue);

    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);

    transition: 120ms transform ease-in-out;
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