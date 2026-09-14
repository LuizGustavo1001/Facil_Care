<template>
  <component
      :is="tag"
      :type="isButton ? 'button' : undefined"
      :href="!isButton ? (link || undefined) : undefined"
      :target="!isButton ? target : undefined"
      :rel="!isButton && target === '_blank' ? 'noopener noreferrer' : undefined"
      class="icon-btn-alt outline-layer relative flex-shrink overflow-hidden cursor-pointer"
    >
    <Icon
        class="inline-layer"
        :icon="props.icon"
        padding="xs"
        :size="size"
    />
  </component>
</template>

<style scoped>
.icon-btn-alt{
  color: var(--color-text-primary-muted);
}

.outline-layer, .inline-layer{
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.outline-layer{
  padding: 3px;
  box-shadow: inset -2px -4px 10px var(--color-shadow-default);
}

.outline-layer:active .inline-layer{
  transform: scale(0.9);
}
</style>

<script setup>
  import { computed } from "vue"
  import Icon from "./Icon.vue"

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
    }
  })

  const isButton = computed(() => props.tag === 'button')
</script>
