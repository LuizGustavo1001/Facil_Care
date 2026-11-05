<template>
  <div
      class="badge flex gap-05 align-center"
      :class="[computedColor]"
      :style="computedPadding"
  >
    <Icon v-if="props.icon" :icon="props.icon" size="15px" />
    <p class="flex-grow-1">{{ props.text }}</p>
  </div>
</template>

<style scoped>
  .badge {
    border-radius: var(--radius-lg);
  }

  /* VARIANTS */
  /* 1. Blue */
  .badge.blue {
    background: var(--color-bg-blue);
    color: var(--color-text-blue);
  }
  /* 2. Red */
  .badge.red {
    background: var(--color-bg-red);
    color: var(--color-text-red);
  }
  /* 3. Green */
  .badge.green {
    background: var(--color-bg-green);
    color: var(--color-text-green);
  }
  /* 4. Yellow */
  .badge.yellow {
    background: var(--color-bg-yellow);
    color: var(--color-text-yellow);
  }
  /* 5. Purple */
  .badge.purple {
    background: var(--color-bg-purple);
    color: var(--color-text-purple);
  }
  /* 6. Orange */
  .badge.orange {
    background: var(--color-bg-orange);
    color: var(--color-text-orange);
  }
</style>

<script setup>
  import { computed } from "vue"
  import { BUTTON_COLORS } from "../../constants/btnColors.js"
  import Icon from "../icons/Icon.vue"

  const props = defineProps({
    spacing: {
      type: String,
      default: '2xs',
      validator: (value) => ["2xs", "xs", "sm", "md", "lg"].includes(value)
    },
    text: {
      type: String,
      required: true,
      default: ""
    },
    color: {
      type: String,
      default: "blue"
    },
    icon: {
      type: String,
      default: null
    }
  })

  const computedColor = computed(() => {
    if(!Object.values(BUTTON_COLORS).includes(props.color)) {
      return BUTTON_COLORS.BLUE
    }

    return props.color
  })

  const computedPadding = computed(() => `padding: var(--spacing-${props.spacing})`)
</script>