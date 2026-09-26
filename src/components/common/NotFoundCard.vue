<template>
  <div class="not-found-card flex flex-column align-center justify-center gap-1">
    <Icon
      :icon="currentIcon"
      size="300px"
    />
    <p>Nenhuma nova notificação encontrada...</p>
  </div>
</template>

<style scoped>
  .icon, p{
    color: var(--color-text-primary-muted);
  }
  p{
    font-size: var(--text-heading-lg);
    font-weight: var(--bolder-weight);
  }
</style>

<script setup>
  import { computed } from "vue"
  import { icons } from "../../assets/icons/icons.js"

  import Icon from "./Icon.vue"

  // STATIC VARIABLES
  const iconsMap = {
    "item": icons['item-not-found'],
    "notification": icons['no-notifications'],
  }

  // PROPS
  const props = defineProps({
    type: {
      type: String,
      default: "item"
    }
  })

  // COMPUTED PROPERTIES
  const currentIcon = computed(() => iconsMap[props.type])
</script>