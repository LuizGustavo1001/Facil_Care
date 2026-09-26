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
  border: none;
  border-radius: var(--radius-lg);
}

.outline-layer{
  padding: 4px;
  box-shadow: inset 0px 0px 10px var(--color-shadow-strong);
}

.outline-layer:active .inline-layer{
  transform: scale(0.9);
}
</style>

<script setup>
  import { computed } from "vue"

  import Icon from "./Icon.vue"

  // PROPS
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

  // COMPUTED PROPERTIES
  const isButton = computed(() => props.tag === 'button')
</script>
