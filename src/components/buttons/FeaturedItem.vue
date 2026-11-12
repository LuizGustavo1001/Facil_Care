<template>
  <component
      :is="componentTag"
      :type="isButton ? 'button' : undefined"
      :to="isRouterLink ? to : undefined"
      :href="!isButton ? (to || undefined) : undefined"
      :target="!isButton ? parsedTarget : undefined"
      :rel="!isButton && parsedTarget === '_blank' ? 'noopener noreferrer' : undefined"
      class="featured-item flex flex-column gap-05 align-center cursor-pointer"
  >
    <Icon :icon="props.icon" :size="props.iconSize" padding="sm" />

    <span class="bolder-weight text-center text">{{ label }}</span>
  </component>
</template>

<style scoped>
  .featured-item {
    width: fit-content;
    transition: all 0.2s ease;
    color: inherit;
  }
  .featured-item:hover {
    color: var(--color-text-brand);
  }

  .featured-item:hover .icon {
    background: var(--color-bg-hover);
  }

  .icon {
    background: var(--color-bg-subtle);
    border-radius: var(--radius-md);
    color: var(--color-text-primary-muted);
  }

  .featured-item .text {
    font-size: var(--font-caption);
  }
</style>

<script setup lang="ts">
  import { type Component, computed } from "vue"
  import { RouterLink } from "vue-router"

  import Icon from "../icons/Icon.vue"
  import { icons } from "../../assets/icons/icons"

  import { BUTTON_TAGS } from "../../constants/components/buttons"
  import type { ButtonTag } from "../../types/components/buttons"

  // TYPES & INTERFACES
  interface Props {
    tag?: ButtonTag
    icon: string
    label: string
    target?: string
    to?: string
    iconSize?: string
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    tag: BUTTON_TAGS.ROUTER,
    icon: icons["heart-pulse-fill"],
    label: "",
    target: "_self",
    iconSize: "27px",
    to: '#'
  })

  // COMPUTED PROPERTIES
  const isButton = computed<boolean>(() => props.tag === BUTTON_TAGS.BUTTON)
  const isRouterLink = computed<boolean>(() => props.tag === BUTTON_TAGS.ROUTER)
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
</script>