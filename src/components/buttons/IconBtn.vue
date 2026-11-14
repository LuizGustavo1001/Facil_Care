<template>
  <component
      :is="buttonServices.getComponentTag(props.tag)"
      :type="isButton ? 'button' : undefined"
      :to="isRouterLink ? to : undefined"
      :href="!isButton ? (to || undefined) : undefined"
      :target="!isButton ? parsedTarget : undefined"
      :rel="!isButton && parsedTarget === '_blank' ? 'noopener noreferrer' : undefined"
      class="icon-btn active-border"
      :class="variantClass"
      :style="utils.getPaddingStyle(props.padding)"
  >
    <Icon :icon="icon" :size="size" />
  </component>
</template>

<style scoped>
  .icon-btn {
    display: inline-flex;

    height: fit-content;

    border-radius: var(--radius-md);
    border: none;

    cursor: pointer;
    transition: 0.2s ease-out;
  }
  .icon-btn:active {
    transform: scale(0.9);
  }

  /* VARIANTS */
  /* 1. Brand */
  .icon-btn.brand {
    background: var(--color-bg-brand);
    color: var(--color-text-inverse-subtle);
  }
  .icon-btn.brand:hover {
    background: var(--color-bg-brand-hover);
  }

  /* 2. Transparent */
  .icon-btn.transparent {
    background: transparent;
    color: var(--color-text-primary-muted);
  }
  .icon-btn.transparent:hover {
    background: var(--color-bg-subtle);
  }

  /* 3. Transparent Border */
  .icon-btn.border {
    background: transparent;
    color: var(--color-text-primary-muted);
    border: 2px solid var(--color-border-default);
  }
  .icon-btn.border:hover {
    background: var(--color-bg-hover);
  }

  /* 4. Background Color */
  .icon-btn.wBorder {
    background: var(--color-bg-primary);
    color: var(--color-text-primary-muted);
  }
  .icon-btn.wBorder:hover {
    background: var(--color-bg-hover);
  }

  /* 5. Subtle */
  .icon-btn.subtle {
    background: var(--color-bg-subtle);
    color: var(--color-text-primary-muted);

    border: 2px solid transparent;
  }
  .icon-btn.subtle:hover {
    border-color: var(--color-border-default);
  }

  /* 6. Destructive */
  .icon-btn.destructive {
    background: var(--color-bg-red);
    color: var(--color-text-red);
  }
  .icon-btn.destructive:hover {
    background: var(--color-bg-red-hover);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"

  import type { PaddingSize } from "../../types/paddingSizes"
  import type { ButtonTag } from "../../types/components/buttons"
  import type { IconBtnVariant } from "../../types/components/buttons"

  import { BUTTON_TAGS, ICON_BTN_VARIANTS } from "../../constants/components/buttons"
  import { PADDING_SIZE } from "../../constants/paddindSizes"

  import Icon from "../icons/Icon.vue"
  import { useUtils } from "../../composables/useUtils"
  import { useButtons } from "../../composables/components/useButtons"

  // COMPOSABLES
  const utils = useUtils()
  const buttonServices = useButtons()

  // TYPES & INTERFACES
  interface IconButtonProps {
    tag?: ButtonTag
    icon: string
    to?: string
    target?: string
    size?: string
    padding?: PaddingSize
    variant?: IconBtnVariant
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<IconButtonProps>(), {
    tag: BUTTON_TAGS.BUTTON,
    to: "#",
    target: "",
    size: "30px",
    padding: PADDING_SIZE.EXTRA_SMALL_1,
    variant: ICON_BTN_VARIANTS.BRAND
  })

  // COMPUTED PROPERTIES
  const isButton = computed<boolean>(() => buttonServices.isButton(props.tag))
  const isRouterLink = computed<boolean>(() => buttonServices.isRouterLink(props.tag))
  const parsedTarget = buttonServices.getTarget(props.target)

  const variantClass = computed<IconBtnVariant>(() => {
    return Object.values(ICON_BTN_VARIANTS).includes(props.variant)
        ? props.variant
        : ICON_BTN_VARIANTS.BRAND
  })
</script>
