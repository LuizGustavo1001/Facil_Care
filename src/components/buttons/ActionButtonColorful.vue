<template>
  <component
      :is="buttonServices.getComponentTag(props.tag)"
      :type="isButton ? 'button' : undefined"
      :to="isRouterLink ? to : undefined"
      :href="!isButton ? (to || undefined) : undefined"
      :target="!isButton ? parsedTarget : undefined"
      :rel="
        !isButton && parsedTarget === '_blank'
            ? 'noopener noreferrer'
            : undefined
      "
      :class="[
          buttonServices.getColorVariant(props.color),
          variantClass
      ]"
      class="action-btn-colorful flex justify-between gap-1 active-border cursor-pointer"
  >
    <span class="flex gap-05 align-center">
        <span v-if="leftIcon" class="left-icon-wrapper">
          <Icon
              v-if="leftIcon"
              :icon="leftIcon"
              :size="leftIconSize"
              class="left-icon"
          />
        </span>

        <span class="btn-content flex flex-column justify-between gap-05 flex-grow-1">
          <span class="btn-content-title truncate-multi">
            <slot name="title">{{ title }}</slot>
          </span>

          <span
              v-if="description || $slots.description"
              class="btn-content-description flex flex-column text-muted truncate-single"
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
  .action-btn-colorful {
    padding: var(--spacing-xs);

    border: 3px solid transparent;

    text-align: start;
    transition: 0.2s ease-out;
  }

  .action-btn-colorful .right-icon {
    color: var(--color-text-primary-muted);
  }

  .action-btn-colorful .left-icon-wrapper {
    padding: var(--spacing-sm);
    border-radius: var(--radius-full);

    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-content .btn-content-title {
    font-size: var(--font-button-title);
    font-weight: var(--semi-bold-weight);
    color: var(--color-text-btn-primary);
  }

  .btn-content .btn-content-description {
    font-size: var(--font-button-description);
    font-weight: var(--medium-weight);
  }

  /* VARIANTS */
  /* 1. Subtle */
  .action-btn-colorful.subtle {
    background: var(--color-bg-subtle);
  }
  /* 2. Primary */
  .action-btn-colorful.primary{
    background: var(--color-bg-primary);
  }

  /* COLOR VARIANTS */
  /* 1. Blue */
  .action-btn-colorful.blue .left-icon-wrapper {
    background-color: var(--color-bg-blue);
    color: var(--color-text-blue);
  }
  .action-btn-colorful.blue:hover {
    border-color: var(--color-bg-blue);
  }

  /* 2. Orange */
  .action-btn-colorful.orange .left-icon-wrapper {
    background-color: var(--color-bg-orange);
    color: var(--color-text-orange);
  }
  .action-btn-colorful.orange:hover {
    border-color: var(--color-bg-orange);
  }

  /* 3. Red */
  .action-btn-colorful.red .left-icon-wrapper {
    background-color: var(--color-bg-red);
    color: var(--color-text-red);
  }
  .action-btn-colorful.red:hover {
    border-color: var(--color-bg-red);
  }

  /* 4. Green */
  .action-btn-colorful.green .left-icon-wrapper {
    background-color: var(--color-bg-green);
    color: var(--color-text-green);
  }
  .action-btn-colorful.green:hover {
    border-color: var(--color-bg-green);
  }

  /* 5. Yellow */
  .action-btn-colorful.yellow .left-icon-wrapper {
    background-color: var(--color-bg-yellow);
    color: var(--color-text-yellow);
  }
  .action-btn-colorful.yellow:hover {
    border-color: var(--color-bg-yellow);
  }

  /* 6. Purple */
  .action-btn-colorful.purple .left-icon-wrapper {
    background-color: var(--color-bg-purple);
    color: var(--color-text-purple);
  }
  .action-btn-colorful.purple:hover {
    border-color: var(--color-bg-purple);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import { ACTION_BUTTON_COLORFUL_VARIANTS, BUTTON_COLORS, BUTTON_TAGS } from "../../constants/components/appButtons"

  import type { ActionBtnColorfulVariant, ButtonColor, ButtonTag } from "../../types/components/appButtons"

  import { useButtons } from "../../composables/components/useButtons"

  import Icon from "../icons/Icon.vue"

  // COMPOSABLES
  const buttonServices = useButtons()

  // TYPES & INTERFACES
  interface ActionButtonColorfulProps {
    tag?: ButtonTag
    variant?: ActionBtnColorfulVariant
    color?: ButtonColor

    leftIcon?: string | null
    leftIconSize?: string

    rightIcon?: string | null
    rightIconSize?: string

    to?: string
    target?: string

    title?: string | null
    description?: string | null
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<ActionButtonColorfulProps>(), {
    tag: BUTTON_TAGS.BUTTON,
    variant: ACTION_BUTTON_COLORFUL_VARIANTS.SUBTLE,
    color: BUTTON_COLORS.BLUE,

    leftIcon: null,
    leftIconSize: "23px",

    rightIcon: null,
    rightIconSize: "20px",

    to: "#",
    target: "",

    title: null,
    description: null
  })

  // COMPUTED PROPERTIES
  const isButton = computed<boolean>(() => buttonServices.isButton(props.tag))
  const isRouterLink = computed<boolean>(() => buttonServices.isRouterLink(props.tag))
  const parsedTarget = buttonServices.getTarget(props.target)

  const variantClass = computed<ActionBtnColorfulVariant>(() => {
    return Object.values(ACTION_BUTTON_COLORFUL_VARIANTS).includes(props.variant)
        ? props.variant
        : ACTION_BUTTON_COLORFUL_VARIANTS.SUBTLE
  })
</script>