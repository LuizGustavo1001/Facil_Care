<template>
  <component
    is="button"
    class="chips flex gap-03 align-center cursor-pointer"
    :class="[
        variantClass,
        { active: props.isActive }
    ]"
    :style="[utils.getPaddingStyle(props.padding)]"
  >
    <Icon v-if="props.icon" :icon="props.icon" size="15px" />

    <span>{{ props.label }}</span>
  </component>
</template>

<style scoped>
  .chips {
    min-width: fit-content;

    font-size: var(--font-body-sm);
    font-weight: var(--bold-weight);
    border-radius: var(--radius-xs);
    border: none;

    transition: all 0.2s ease;
  }

  /* VARIANTS */
  /* 1. wBorder */
  .chips.wBorder {
    background: transparent;
    border: 2px solid var(--color-border-default-subtle);
  }
  .chips.wBorder:hover,
  .chips.wBorder.active,
  .chips.wBorder:focus {
    background: var(--color-bg-hover);
    border-color: transparent;
  }
  /* 2. Transparent */
  .chips.transparent {
    background: transparent;
  }
  .chips.transparent:hover,
  .chips.transparent.active,
  .chips.transparent:focus {
    background: var(--color-bg-hover);
  }
  /* 3. Subtle */
  .chips.subtle {
    background: var(--color-bg-subtle);
  }
  .chips.subtle:hover,
  .chips.subtle.active,
  .chips.subtle:focus {
    background: var(--color-bg-hover);
  }
  /* 4. Primary */
  .chips.primary {
    background: var(--color-bg-primary);
  }
  .chips.primary:hover,
  .chips.primary.active,
  .chips.primary:focus {
    background: var(--color-bg-hover);
  }
  /* 5. Brand */
  .chips.brand {
    background: var(--color-bg-brand);
    color: var(--color-text-inverse);
  }
  .chips.brand:hover,
  .chips.brand.active,
  .chips.brand:focus {
    background: var(--color-bg-brand-hover);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import Icon from "../icons/Icon.vue"

  import type { PaddingSize } from "../../types/paddingSizes"
  import type { ChipsVariant } from "../../types/components/buttons"

  import { PADDING_SIZE } from "../../constants/paddindSizes"
  import { CHIPS_VARIANTS } from "../../constants/components/buttons"

  import { useUtils } from "../../composables/useUtils"

  // COMPOSABLES
  const utils = useUtils()

  // TYPES & INTERFACES
  interface Props {
    icon?: string
    label: string
    variant?: ChipsVariant
    padding?: PaddingSize
    isActive: boolean
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    padding: PADDING_SIZE.EXTRA_SMALL_1,
    variant: CHIPS_VARIANTS.W_BORDER,
    isActive: false
  })

  // COMPUTED PROPERTIES
  const variantClass = computed<ChipsVariant>(() => {
    return Object.values(CHIPS_VARIANTS).includes(props.variant)
        ? props.variant
        : CHIPS_VARIANTS.W_BORDER
  })
</script>