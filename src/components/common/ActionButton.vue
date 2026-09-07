<template>
  <component
    :is="tag"
    :type="isButton ? 'button' : undefined"
    :href="!isButton ? (link || undefined) : undefined"
    :target="!isButton ? target : undefined"
    :rel="!isButton && target === '_blank' ? 'noopener noreferrer' : undefined"
    class="action-btn flex justify-between align-center gap-1"
    :class="variantValue"
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
          <slot name="title" />
        </span>

        <span class="btn-content-description flex flex-column text-muted">
          <slot name="description" />
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
    padding: v-bind(paddingValue);

    text-align: start;

    border-radius: var(--radius-md);
    border: none;

    cursor: pointer;
    transition: 0.2s ease-out;
  }

  .action-btn:active{
    transform: scale(0.98);
  }

  .btn-content .btn-content-title{
    font-size: var(--text-heading-sm);
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
    border-color: var(--color-border-focus);
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
    background: var(--color-bg-highlight);
    color: var(--color-text-highlight);
  }
  .action-btn.highlight:hover{
    background: var(--color-border-focus);
  }

  .action-btn.highlight .btn-content-description{
    color: var(--color-text-subtle);
  }
</style>

<script setup>
  import { computed } from "vue"
  import Icon from "./Icon.vue"

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
      default: 'external'
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

    const variantList = ["highlight", "subtle", "destructive", "transparent"]
    let variantValue = props.variant

    if(! variantList.includes(props.variant)){
      variantValue = "highlight"
    }
</script>