<template>
  <component
      :is="componentTag"
      :type="isButton ? 'button' : undefined"
      :to="isRouterLink ? to : undefined"
      :href="!isButton ? (to || undefined) : undefined"
      :target="!isButton ? target : undefined"
      :rel="!isButton && target === '_blank' ? 'noopener noreferrer' : undefined"
      :class="[colorVariant, variantClass]"
      class="action-btn-colorful flex justify-between gap-1 active-border"
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
    padding: var(--spacing-sm);

    border: 3px solid transparent;

    text-align: start;
    cursor: pointer;
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
    font-weight: var(--bold-weight);
    color: var(--color-text-primary);
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
  .action-btn-colorful.purple:hover{
    border-color: var(--color-bg-purple);
  }
</style>

<script setup>
  import { computed } from "vue"
  import { RouterLink } from "vue-router"

  import Icon from "../icons/Icon.vue"
  import { BUTTON_COLORS } from "../../constants/btnColors.js"

  // STATIC VARIABLES
  const VARIANTS = ["subtle", "primary"]
  const DEFAULT_VARIANT = "subtle"

  // PROPS
  const props = defineProps({
    tag: {
      type: String,
      default: 'a'
    },
    leftIcon: {
      type: String,
      default: null
    },
    leftIconSize: {
      type: String,
      default: "20px"
    },
    rightIcon: {
      type: String,
      default: null
    },
    rightIconSize: {
      type: String,
      default: "23px"
    },
    to: {
      type: String,
      default: "#"
    },
    target: {
      type: String,
      default: 'external'
    },
    variant: {
      type: String,
      default: "subtle"
    },
    color: {
      type: String,
      default: 'blue'
    },
    title: String,
    description: String
  })

  // COMPUTED PROPERTIES
  // avoid invalid variant classes
  const variantClass = computed(() => {
    return VARIANTS.includes(props.variant) ? props.variant : DEFAULT_VARIANT
  })

  const isButton = computed(() => props.tag === 'button')

  const isRouterLink = computed(() => props.tag === "router")

  const componentTag = computed(() => {
    // 1. Tag == RouterLink (Internal Link)
    if(isRouterLink.value){
      return RouterLink
    }

    // 2. Other Tag
    return props.tag
  })

  // avoid invalid color variant
  const colorVariant = computed(() => {
    return Object.values(BUTTON_COLORS).includes(props.color) ? props.color : BUTTON_COLORS.BLUE
  })
</script>