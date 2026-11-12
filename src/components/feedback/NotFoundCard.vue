<template>
  <div class="not-found-card flex flex-column align-center justify-center gap-1">
    <!-- Not Found Card -->
    <Icon
      :icon="currentIcon"
      :size="currentSize"
    />

    <p class="text-center">{{ currentText }}</p>
  </div>
</template>

<style scoped>
  .icon, p {
    color: var(--color-text-primary-muted);
  }

  p {
    font-size: var(--font-heading-3);
    font-weight: var(--bolder-weight);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import { icons } from "../../assets/icons/icons.js"

  import Icon from "../icons/Icon.vue"
  import { useUtils } from "../../composables/useUtils"

  // CONSTANTS
  const iconsMap: Record<string, string> = {
    item: icons['item-not-found'],
    notification: icons['no-notifications'],
    noMedicinesToday: icons['user-smile-line']
  }

  const sizesMap: Record<string, string> = {
    small: "50px",
    medium: "150px",
    large: "200px",
    xl: "300px"
  }

  // TYPES & INTERFACES
  type Size = typeof sizesMap[keyof typeof sizesMap]
  type CardIcon = typeof iconsMap[keyof typeof iconsMap]

  interface Props {
    type?: string
    size?: Size | string
  }

  // COMPOSABLES
  const utils = useUtils()

  // PROPS
  const props = withDefaults(defineProps<Props>(), {
    type: "item",
    size: ""
  })

  // COMPUTED PROPERTIES
  const currentIcon = computed<CardIcon>(() => iconsMap[props.type])
  const currentSize = computed<Size>(() => sizesMap[props.size] ?? sizesMap.large)

  const currentText = computed<string>(() => {
    const key = `utils.notFoundCard.${props.type}`
    return utils.getTranslate(key)
  })
</script>