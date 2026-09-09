<template>
  <i
      class="icon-wrapper"
      :style="paddingStyle"
      v-html="props.icon"
  />
</template>

<style scoped>
  .icon-wrapper{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: fit-content;

    transition: all 0.2s ease;
  }

  .icon-wrapper :deep(svg){
    width: v-bind(size);
    height: v-bind(size);
    display: block;
  }
</style>

<script setup>
  import { computed } from "vue"

  const props = defineProps({
    icon: {
      type: String,
      required: true
    },
    padding: {
      type: String,
      default: 'none',
      validator: (value) => ["none", "2xs", "xs", "sm", "md"].includes(value)
    },
    size: {
      type: String,
      default: "20px"
    }
  })

  const paddingStyle = computed(() => props.padding !== "none" ? `padding: var(--spacing-${props.padding})` : undefined)
</script>