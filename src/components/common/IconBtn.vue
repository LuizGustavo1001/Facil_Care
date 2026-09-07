<template>
  <component
      :is="tag"
      :type="isButton ? 'button' : undefined"
      :href="!isButton ? (link || undefined) : undefined"
      :target="!isButton ? target : undefined"
      :rel="!isButton && target === '_blank' ? 'noopener noreferrer' : undefined"
      class="icon-btn"
      :class="variantValue"
  >
    <Icon :icon="icon" :size="size"/>
  </component>
</template>

<style scoped>
  .icon-btn{
    display: inline-flex;

    height: fit-content;

    padding: v-bind(paddingValue);
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
      default: '' // sm, md, lg, xl and xl2
    },
    variant: {
      type: String,
      default: 'highlight'
    }
  })

  const isButton = computed(() => props.tag === 'button')

  let paddingValue = ''
  switch(props.padding){
    case 'sm':
      paddingValue = '4px'
      break
    case 'md':
      paddingValue = '8px'
      break
    case 'lg':
      paddingValue = '12px'
      break
    case 'xl':
      paddingValue = '16px'
      break
    case 'xl2':
      paddingValue = '24px'
      break
    default:
      paddingValue = '8px'
  }

  const variantList = ["highlight", "border", "bg-clr", "transparent"]
  let variantValue = props.variant

  if(! variantList.includes(props.variant)){
    variantValue = "highlight"
  }
</script>
