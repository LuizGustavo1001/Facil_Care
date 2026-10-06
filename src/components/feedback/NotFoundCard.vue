<template>
  <div class="not-found-card flex flex-column align-center justify-center gap-1">
    <Icon
      :icon="currentIcon"
      :size="currentSize"
    />
    <p>{{ currentText }}...</p>
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

  import { useI18n } from "vue-i18n"

  import Icon from "../icons/Icon.vue"

  // COMPOSABLES
  const { t, te } = useI18n()

  // STATIC VARIABLES
  const iconsMap = {
    "item": icons['item-not-found'],
    "notification": icons['no-notifications'],
  }

  const sizesMap = {
    "small": "50px",
    "medium": "150px",
    "large": "300px"
  }

  // PROPS
  const props = defineProps({
    type: {
      type: String,
      default: "item"
    },
    size: {
      type: String,
      default: "large",
      validator: (value) => ["small", "medium", "large"].includes(value)
    }
  })

  // COMPUTED PROPERTIES
  const currentIcon = computed(() => iconsMap[props.type])
  const currentText = computed(() => te(`utils.notFoundCard.${props.type}`) ? t(`utils.notFoundCard.${props.type}`) : "" )
  const currentSize = computed(() => sizesMap[props.size])
</script>