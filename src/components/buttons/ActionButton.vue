<template>
  <component
    :is="componentTag"
    :type="isButton ? 'button' : undefined"
    :to="isRouterLink ? to : undefined"
    :href="!isButton ? (to || undefined) : undefined"
    :target="!isButton ? parsedTarget : undefined"
    :rel="!isButton && parsedTarget === '_blank' ? 'noopener noreferrer' : undefined"
    :class="[variantClass]"
    :style="[paddingStyle, computedBorderRadius]"
    class="action-btn flex justify-between align-center gap-03 active-border"
  >
    <span class="flex align-center gap-05 width-full">
      <Icon
          v-if="leftIcon"
          :icon="leftIcon"
          :size="leftIconSize"
          class="left-icon"
      />

      <span class="btn-content flex flex-column flex-grow-1 gap-03">
        <span
            v-if="title || $slots.title"
            class="btn-content-title truncate-multi width-full"
        >
          <slot name="title">{{ title }}</slot>
        </span>

        <span
            v-if="description || $slots.description"
            class="btn-content-description flex flex-column text-muted"
        >
          <slot name="description">{{ description }}</slot>
        </span>
      </span>
    </span>

    <Icon
        v-if="rightIcon"
        :icon="rightIcon"
        :size="rightIconSize"
        class="right-icon"
    />
  </component>
</template>

<style scoped>
  .action-btn {
    text-align: v-bind(textAlign);

    border: none;

    cursor: pointer;
    transition: 0.2s ease-out;
  }

  .btn-content .btn-content-title {
    font-size: var(--font-button-title);
    font-weight: var(--bold-weight);
  }

  .btn-content .btn-content-description {
    font-size: var(--font-button-description);
    font-weight: var(--medium-weight);
  }

  /* VARIANTS */
  /* 1. Transparent */
  .action-btn.transparent {
    background: transparent;
    color: inherit;
  }
  .action-btn.transparent:hover {
    background: var(--color-bg-hover);
  }

  /* 2. Subtle */
  .action-btn.subtle {
    border: 1px solid transparent;
    background: var(--color-bg-subtle);
    color: inherit;
  }
  .action-btn.subtle:hover {
    background: var(--color-bg-hover);
  }

  /* 3. Destructive */
  .action-btn.destructive {
    color: var(--color-text-red);
    background: var(--color-bg-red);
  }
  .action-btn.destructive:hover {
    background: var(--color-bg-red-hover);
  }
  .action-btn.destructive .btn-content-description {
    color: var(--red-500);
  }

  /* 4. Brand */
  .action-btn.brand {
    background: var(--color-bg-brand);
    color: var(--color-text-inverse);
  }
  .action-btn.brand:hover {
    background: var(--color-bg-brand-hover);
  }

  .action-btn.brand .btn-content-description {
    color: var(--color-text-inverse-muted);
  }

  /* 5. Primary */
  .action-btn.primary {
    background: var(--color-bg-primary);
    color: inherit;
  }
  .action-btn.primary:hover {
    background: var(--color-bg-hover);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import type { Component } from "vue"
  import { RouterLink } from "vue-router"

  import type { ActionBtnVariant, ButtonTag } from "../../types/components/buttons"
  import type { PaddingSize } from "../../types/paddingSizes"

  import { ACTION_BUTTON_VARIANTS, BUTTON_TAGS } from "../../constants/components/buttons"
  import { PADDING_SIZE } from "../../constants/paddindSizes"

  import Icon from "../icons/Icon.vue"

  // STATIC VARIABLES
  const DEFAULT_VARIANT: ActionBtnVariant = ACTION_BUTTON_VARIANTS.BRAND

  // TYPES & INTERFACES
  export interface ActionButtonProps {
    tag?: ButtonTag
    leftIcon?: string | null
    leftIconSize?: string
    rightIcon?: string | null
    rightIconSize?: string
    to?: string
    target?: string
    padding?: PaddingSize
    variant?: ActionBtnVariant
    alignCenter?: boolean
    hasBorderRadius?: boolean
    title?: string | null
    description?: string | null
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<ActionButtonProps>(), {
    tag: BUTTON_TAGS.LINK,
    leftIcon: null,
    leftIconSize: '25px',
    rightIcon: null,
    rightIconSize: '25px',
    to: '#',
    target: "_self",
    padding: PADDING_SIZE.EXTRA_SMALL_1,
    variant: ACTION_BUTTON_VARIANTS.BRAND,
    alignCenter: false,
    hasBorderRadius: true,
    title: null,
    description: null
  })

  // COMPUTED PROPERTIES
  const isButton = computed<boolean>(() => props.tag === BUTTON_TAGS.BUTTON)
  const isRouterLink = computed<boolean>(() => props.tag === BUTTON_TAGS.ROUTER)
  const paddingStyle = computed<string>(() => `padding: var(--spacing-${props.padding})`)

  const variantClass = computed<ActionBtnVariant>(() => {
    return Object.values(ACTION_BUTTON_VARIANTS).includes(props.variant)
        ? props.variant
        : DEFAULT_VARIANT
  })

  const componentTag = computed<ButtonTag | Component>(() => {
    // 1. Tag == RouterLink (Internal Link)
    if(isRouterLink.value) {
      return RouterLink as Component
    }

    // 2. Other Tag
    return props.tag
  })

  const parsedTarget = computed<string>(() => {
    return props.target === "external"
        ? "_blank"
        : props.target
  })

  const textAlign = computed<string>(() => {
    return props.alignCenter
        ? 'center'
        : 'start'
  })

  const computedBorderRadius = computed<string>(() =>{
    return props.hasBorderRadius
        ? "border-radius: var(--radius-2xl)"
        : ""
  })
</script>