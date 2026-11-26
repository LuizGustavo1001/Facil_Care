<template>
  <div class="not-found-card flex flex-column align-center justify-center gap-1">
    <!-- Not Found Card -->
    <Icon
      :icon="currentIcon"
      :size="currentSize"
    />

    <h3 class="text-center">{{ currentText }}</h3>
  </div>
</template>

<style scoped>
  .icon, p {
    color: var(--color-text-primary-muted);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import { icons } from "../../assets/icons/icons"
  import { useUtils } from "../../composables/useUtils"

  import Icon from "../icons/Icon.vue"

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