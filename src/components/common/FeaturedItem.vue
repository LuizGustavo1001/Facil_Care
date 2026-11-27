<template>
  <component
      :is="buttonServices.getComponentTag(props.tag)"
      :type="isButton ? 'button' : undefined"
      :to="isRouterLink ? to : undefined"
      :href="!isButton ? (to || undefined) : undefined"
      :target="!isButton ? parsedTarget : undefined"
      :rel="!isButton && parsedTarget === '_blank' ? 'noopener noreferrer' : undefined"
      class="featured-item flex flex-column gap-03 align-center cursor-pointer active-border width-fit"
  >
    <ShapedBgIcon :icon="props.icon" :size="props.iconSize" />

    <span class="semi-bold-weight text-center text">{{ label }}</span>
  </component>
</template>

<style scoped>
  .featured-item {
    transition: all 0.2s ease;
    color: inherit;

    border-radius: var(--radius-sm);
  }

  .featured-item .text {
    font-size: var(--font-label-sm);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"

  import { icons } from "../../assets/icons/icons"
  import { BUTTON_TAGS } from "../../constants/components/appButtons"

  import type { ButtonTag } from "../../types/components/appButtons"
  import type { ComponentSize } from "../../types/spacing"

  import { useButtons } from "../../composables/components/useButtons"

  import ShapedBgIcon from "../icons/ShapedBgIcon.vue"

  // COMPOSABLES
  const buttonServices = useButtons()

  // TYPES & INTERFACES
  interface Props {
    tag?: ButtonTag
    icon: string
    label: string
    target?: string
    to?: string
    iconSize?: ComponentSize
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
  const parsedTarget = computed<string>(() => buttonServices.getTarget(props.target))
</script>