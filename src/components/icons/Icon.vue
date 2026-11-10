<template>
  <i
      class="icon-wrapper icon"
      :style="[props.padding !== 'none' ? `padding: var(--spacing-${props.padding})` : '']"
      v-html="props.icon"
      :class="[computedBgColor]"
  />
</template>

<style scoped>
  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: fit-content;

    transition: all 0.2s ease;
  }

  .icon-wrapper :deep(svg) {
    width: v-bind(size);
    height: v-bind(size);
    display: block;
  }

  /* VARIANTS */
  .icon-wrapper.yellow {
    background-color: var(--color-bg-yellow);
    color: var(--color-text-yellow);
  }
  .icon-wrapper.red {
    background-color: var(--color-bg-red);
    color: var(--color-text-red);
  }
  .icon-wrapper.blue {
    background-color: var(--color-bg-blue);
    color: var(--color-text-blue);
  }
  .icon-wrapper.green {
    background-color: var(--color-bg-green);
    color: var(--color-text-green);
  }
  .icon-wrapper.orange {
    background-color: var(--color-bg-orange);
    color: var(--color-text-orange);
  }
  .icon-wrapper.purple {
    background-color: var(--color-bg-purple);
    color: var(--color-text-purple);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import { BUTTON_COLORS } from "../../constants/buttonComponent"

  import type { PaddingSize } from "../../types/paddingSizes"
  import type { ButtonColor } from "../../types/buttonComponent"

  // TYPES & INTERFACES
  interface Props {
    icon: string
    padding?: PaddingSize | string
    size?: string
    bgColor?: ButtonColor | string
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    padding: "none",
    size: "20px",
    bgColor: "transparent",
  })

  // Defines the icon and the icon background color set
  const computedBgColor = computed<ButtonColor | string>(() => {
    if(!Object.values(BUTTON_COLORS).includes(props.bgColor as ButtonColor)) {
      return "transparent"
    }

    return props.bgColor as ButtonColor
  })
</script>