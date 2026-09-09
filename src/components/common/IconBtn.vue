<template>
  <component
      :is="tag"
      :type="isButton ? 'button' : undefined"
      :href="!isButton ? (link || undefined) : undefined"
      :target="!isButton ? target : undefined"
      :rel="!isButton && target === '_blank' ? 'noopener noreferrer' : undefined"
      class="icon-btn"
      :class="variantClass"
      :style="paddingStyle"
  >
    <Icon :icon="icon" :size="size"/>
  </component>
</template>

<style scoped>
  .icon-btn{
    display: inline-flex;

    height: fit-content;

    border-radius: var(--radius-md);
    border: none;

    cursor: pointer;
    transition: 0.2s ease-out;
  }
  .icon-btn:active{
    transform: scale(0.9);
  }

  /* VARIANTS */

  /* 1. Brand */
  .icon-btn.brand{
    background: var(--color-bg-brand);
    color: var(--color-text-inverse-subtle);
  }
  .icon-btn.brand:hover{
    background: var(--color-bg-brand-hover);
  }

  /* 2. Transparent */
  .icon-btn.transparent{
    background: transparent;
    color: var(--color-text-primary-muted);
  }
  .icon-btn.transparent:hover{
    background: var(--color-bg-hover);
  }

  /* 3. Transparent Border */
  .icon-btn.border{
    background: transparent;
    color: var(--color-text-primary-muted);
    border: 1px solid var(--color-border-default);
  }
  .icon-btn.border:hover{
    background: var(--color-bg-hover);
  }

  /* 4. Background Color */
  .icon-btn.bg-clr{
    background: var(--color-bg-primary);
    color: var(--color-text-primary-muted);
  }
  .icon-btn.bg-clr:hover{
    background: var(--color-bg-hover);
  }

</style>

<script setup>
  import { computed } from "vue"
  import Icon from "./Icon.vue";

  const VARIANTS = ["brand", "border", "bg-clr", "transparent"]
  const DEFAULT_VARIANT = "brand"

  const props = defineProps({
    tag: {
      type: String,
      default: 'button',
    },
    icon: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: "#"
    },
    target: {
      type: String,
      default: 'external'
    },
    size: {
      type: String,
      default: '30px'
    },
    padding: {
      type: String,
      default: 'xs',
      validator: (value) => ["2xs", "xs", "sm", "md"].includes(value)
    },
    variant: {
      type: String,
      default: 'brand',
      validator: (value) => ["brand", "border", "bg-clr", "transparent"].includes(value)
    }
  })

  const isButton = computed(() => props.tag === 'button')

  const paddingStyle = computed(() => `padding: var(--spacing-${props.padding})`)

  const variantClass = computed(() => {
    return VARIANTS.includes(props.variant) ? props.variant : DEFAULT_VARIANT
  })
</script>
