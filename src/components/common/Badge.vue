<template>
  <div
      class="badge flex gap-05 align-center semi-bold-weight"
      :class="[computedColor]"
      :style="props.spacing"
  >
    <Icon v-if="props.icon" :icon="props.icon" class="flex-shrink" size="20px" />
    <p class="flex-grow-1">{{ props.text }}</p>
  </div>
</template>

<style scoped>
  .badge {
    border-radius: var(--radius-lg);
    font-size: var(--font-body-sm);
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
  import { BUTTON_COLORS, BUTTON_PADDING } from "../../constants/components/appButtons"
  import type { ButtonColor, ButtonPadding } from "../../types/components/appButtons"
  import Icon from "../icons/Icon.vue"

  // TYPES & INTERFACES
  interface Props {
    text: string
    color?: ButtonColor
    spacing?: ButtonPadding
    icon?: string | null
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    text: "",
    color: BUTTON_COLORS.BLUE,
    spacing: () => BUTTON_PADDING.EXTRA_SMALL,
    icon: null
  })

  // COMPUTED PROPERTIES
  const computedColor = computed(() => {
    if(!Object.values(BUTTON_COLORS).includes(props.color)) {
      return BUTTON_COLORS.BLUE
    }

    return props.color
  })
</script>