<template>
  <component
    :is="tag"
    :type="isButton ? 'button' : undefined"
    :href="!isButton ? (link || undefined) : undefined"
    :target="!isButton ? parsedTarget : undefined"
    :rel="!isButton && parsedTarget === '_blank' ? 'noopener noreferrer' : undefined"
    class="action-btn flex justify-between align-center gap-1"
    :class="variantClass"
    :style="paddingStyle"
  >
    <span class="flex align-center gap-05">
      <Icon
          v-if="leftIcon"
          :icon="leftIcon"
          :size="leftIconSize"
          class="left-icon"
      />

      <span class="btn-content flex flex-column flex-grow-1">
        <span class="btn-content-title truncate-multi">
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
  .action-btn{
    text-align: start;

    border-radius: var(--radius-md);
    border: none;

    cursor: pointer;
    transition: 0.2s ease-out;
  }

  .action-btn:active{
    transform: scale(0.98);
  }
  .action-btn:active, .action-btn:active, .action-btn:focus-visible{
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    outline: none;
  }

  .btn-content .btn-content-title{
    font-size: var(--text-body-lg);
  }

  .btn-content .btn-content-description{
    font-weight: 600;
    font-size: var(--text-body-sm);
  }

  /* VARIANTS */

  /* 1. Transparent */
  .action-btn.transparent{
    background: transparent;
    color: inherit;
  }
  .action-btn.transparent:hover{
    background: var(--color-bg-hover);
  }

  /* 2. Subtle */
  .action-btn.subtle{
    border: 1px solid transparent;
    background: var(--color-bg-subtle);
  }
  .action-btn.subtle:hover{
    border-color: var(--color-border-brand);
  }

  /* 3. Destructive */
  .action-btn.destructive{
    color: var(--red-500);
    background: var(--red-100);
  }
  .action-btn.destructive:hover{
    background: var(--red-300);
  }
  .action-btn.destructive .btn-content-description{
    color: var(--red-500);
  }

  /* 4. Highlight */
  .action-btn.highlight{
    background: var(--color-bg-brand);
    color: var(--color-text-inverse);
  }
  .action-btn.highlight:hover{
    background: var(--color-bg-brand-hover);
  }

  .action-btn.highlight .btn-content-description{
    color: var(--color-text-inverse-muted);
  }
</style>

<script setup>
  import { computed } from "vue"
  import Icon from "./Icon.vue"

  const VARIANTS = ["highlight", "subtle", "destructive", "transparent"]
  const DEFAULT_VARIANT = "highlight"

  const props = defineProps({
    tag: {
      type: String,
      default: 'a',
    },
    leftIcon: {
      type: String,
      default: null
    },
    leftIconSize: {
      type: String,
      default: "25px"
    },
    rightIcon: {
      type: String,
      default: null
    },
    rightIconSize: {
      type: String,
      default: "25px"
    },
    link: {
      type: String,
      default: "#"
    },
    target: {
      type: String,
      default: '_self'
    },
    padding: {
      type: String,
      default: 'xs',
      validator: (value) => ["2xs", "xs", "sm", "md"].includes(value)
    },
    variant: {
      type: String,
      default: "md",
      validator: (value) => ["highlight", "subtle", "destructive", "transparent"].includes(value)
    },
    title: String,
    description: String
  })

  // avoid invalid variant classes
  const variantClass = computed(() => {
    return VARIANTS.includes(props.variant) ? props.variant : DEFAULT_VARIANT
  })

  const isButton = computed(() => props.tag === "button")

  const parsedTarget = computed(() => props.target === "external" ? "_blank" : props.target)

  const paddingStyle = computed(() => `padding: var(--spacing-${props.padding})`)
</script>