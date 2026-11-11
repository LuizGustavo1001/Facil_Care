<template>
  <div
      class="badge flex gap-05 align-center"
      :class="[computedColor]"
      :style="computedPadding"
  >
    <Icon v-if="props.icon" :icon="props.icon" class="flex-shrink" size="20px" />
    <p class="flex-grow-1">{{ props.text }}</p>
  </div>
</template>

<style scoped>
  .badge {
    border-radius: var(--radius-lg);
  }

  /* VARIANTS */
  /* 1. Blue */
  .badge.blue {
    background: var(--color-bg-blue);
    color: var(--color-text-blue);
  }
  /* 2. Red */
  .badge.red {
    background: var(--color-bg-red);
    color: var(--color-text-red);
  }
  /* 3. Green */
  .badge.green {
    background: var(--color-bg-green);
    color: var(--color-text-green);
  }
  /* 4. Yellow */
  .badge.yellow {
    background: var(--color-bg-yellow);
    color: var(--color-text-yellow);
  }
  /* 5. Purple */
  .badge.purple {
    background: var(--color-bg-purple);
    color: var(--color-text-purple);
  }
  /* 6. Orange */
  .badge.orange {
    background: var(--color-bg-orange);
    color: var(--color-text-orange);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import { BUTTON_COLORS } from "../../constants/buttonComponent"
  import { PADDING_SIZE } from "../../constants/paddindSizes"

  import type { ButtonColor } from "../../types/buttonComponent"
  import type { PaddingSize } from "../../types/paddingSizes"

  import Icon from "../icons/Icon.vue"

  // TYPES & INTERFACES
  interface Props {
    text: string
    color?: ButtonColor | string
    spacing?: PaddingSize | string
    icon?: string | null
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    text: "",
    color: BUTTON_COLORS.BLUE,
    spacing: PADDING_SIZE.EXTRA_SMALL_2,
    icon: null
  })

  const computedColor = computed(() => {
    if(!Object.values(BUTTON_COLORS).includes(props.color as ButtonColor)) {
      return BUTTON_COLORS.BLUE
    }

    return props.color
  })

  const computedPadding = computed(() => `padding: var(--spacing-${props.spacing})`)
</script>