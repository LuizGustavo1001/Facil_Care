<template>
  <component
      :is="tag"
      :type="isButton ? 'button' : undefined"
      :href="!isButton ? (link || undefined) : undefined"
      :target="!isButton ? target : undefined"
      :rel="!isButton && target === '_blank' ? 'noopener noreferrer' : undefined"
      class="icon-btn"
      :class="[variantClass, paddingClass]"
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

  /* 1. Highlight */
  .icon-btn.highlight{
    background: var(--color-bg-highlight);
    color: var(--color-text-highlight);
  }
  .icon-btn.highlight:hover{
    background: var(--color-border-focus);
  }

  /* 2. Transparent */
  .icon-btn.transparent{
    background: transparent;
    color: var(--color-text-muted);
  }
  .icon-btn.transparent:hover{
    background: var(--color-bg-hover);
  }

  /* 3. Transparent Border */
  .icon-btn.border{
    background: transparent;
    color: var(--color-text-muted);
    border: 1px solid var(--color-border-default);
  }
  .icon-btn.border:hover{
    background: var(--color-bg-hover);
  }

  /* 4. Background Color */
  .icon-btn.bg-clr{
    background: var(--color-bg-primary);
    color: var(--color-text-muted);
  }
  .icon-btn.bg-clr:hover{
    background: var(--color-bg-hover);
  }

</style>

<script setup>
  import { computed } from "vue"
  import Icon from "./Icon.vue";

  const VARIANTS = ["highlight", "border", "bg-clr", "transparent"]
  const DEFAULT_VARIANT = "highlight"

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
      default: 'md',
      validator: (value) => ["sm", "md", "lg", "xl", "xl2"].includes(value)
    },
    variant: {
      type: String,
      default: 'highlight',
      validator: (value) => ["highlight", "border", "bg-clr", "transparent"].includes(value)
    }
  })

  const isButton = computed(() => props.tag === 'button')

  const paddingClass = computed(() => `component--padding-${props.padding}`) // format padding class
  const variantClass = computed(() => {
    return VARIANTS.includes(props.variant) ? props.variant : DEFAULT_VARIANT
  })

</script>
