<template>
  <i class="icon-wrapper" v-html="props.icon" />
</template>

<style scoped>
  .icon-wrapper{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: fit-content;

    padding: v-bind(resolvedPadding);
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
    havePadding: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: '0.5em'
    },
    size: {
      type: String,
      default: "20px"
    }
  })

  const resolvedPadding = computed(() => props.havePadding ? props.padding : 0)
</script>