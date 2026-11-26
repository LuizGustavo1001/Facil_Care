<template>
  <component
    is="button"
    class="chips flex gap-03 align-center cursor-pointer active-border bold-weight"
    :class="[
        variantClass,
        { active: props.isActive }
    ]"
    :style="[props.padding]"
  >
    <Icon v-if="props.icon" :icon="props.icon" size="15px" />
    <span class="flex-grow-1">{{ props.label }}</span>
  </component>
</template>

<style scoped>
  .chips {
    text-wrap: nowrap;

    font-size: var(--font-body-sm);
    border-radius: var(--radius-full);
    border: none;

    color: var(--color-text-primary-muted);

    transition: all 0.2s ease;
  }

  /* VARIANTS */
  /* 1. wBorder */
  .chips.wBorder {
    background: transparent;
    border: 2px solid var(--color-border-default);
  }
  .chips.wBorder:hover,
  .chips.wBorder:focus {
    background: var(--color-bg-hover);
    border-color: transparent;
  }
  .chips.wBorder.active {
    background: var(--color-bg-blue);
    color: var(--color-text-blue);
    border-color: transparent;
  }

  /* 2. Transparent */
  .chips.transparent {
    background: transparent;
  }
  .chips.transparent:hover,
  .chips.transparent:focus {
    background: var(--color-bg-subtle);
  }
  .chips.transparent.active {
    background: var(--color-bg-hover);
  }

  /* 3. Subtle */
  .chips.subtle {
    background: var(--color-bg-subtle);
  }
  .chips.subtle:hover,
  .chips.subtle:focus {
    background: var(--color-bg-primary);
  }
  .chips.subtle.active {
    background: var(--color-bg-hover);
  }

  /* 4. Primary */
  .chips.primary {
    background: var(--color-bg-primary);
  }
  .chips.primary:hover,
  .chips.primary:focus {
    background: var(--color-bg-subtle);
  }
  .chips.primary.active {
    background: var(--color-bg-hover);
  }

  /* 5. Brand */
  .chips.brand {
    background: var(--color-bg-brand);
    color: var(--color-text-inverse);
  }
  .chips.brand:hover,
  .chips.brand:focus {
    background: var(--color-bg-blue);
  }
  .chips.brand.active {
    background: var(--color-bg-brand-hover);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import type { ButtonPadding, ChipsVariant } from "../../types/components/appButtons"
  import { BUTTON_PADDING, CHIPS_VARIANTS } from "../../constants/components/appButtons"
  import Icon from "../icons/Icon.vue"

  // TYPES & INTERFACES
  interface Props {
    icon?: string
    label: string

    variant?: ChipsVariant
    padding?: ButtonPadding

    isActive: boolean
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    padding: () => BUTTON_PADDING.SMALL,
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