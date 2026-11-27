<template>
  <div
      class="shaped-bg-icon width-fit relative"
      :class="[computedColor]"
  >
    <Icon :icon="icons['bg-shape']" class="absolute icon-bg" :size="bgIconSize" />
    <Icon :icon="props.icon" class="featured-icon" :size="featuredIconSize" />
  </div>
</template>

<style scoped>
  .shaped-bg-icon {
    display: inline-flex;
    justify-content: center;

    width: v-bind(bgIconSize);
    height: v-bind(bgIconSize);

    margin: 0 auto;
  }

  .icon-bg {
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    z-index: -1;
  }

  /* VARIANTS */
  /* 1. YELLOW */
  .shaped-bg-icon.yellow .icon-bg {
    color: var(--color-bg-yellow);
  }
  .shaped-bg-icon.yellow .featured-icon {
    color: var(--color-text-yellow);
  }

  /* 2. BLUE */
  .shaped-bg-icon.blue .icon-bg {
    color: var(--color-bg-blue);
  }
  .shaped-bg-icon.blue .featured-icon {
    color: var(--color-text-blue);
  }

  /* 3. RED */
  .shaped-bg-icon.red .icon-bg {
    color: var(--color-bg-red);
  }
  .shaped-bg-icon.red .featured-icon {
    color: var(--color-text-red);
  }

  /* 4. GREEN */
  .shaped-bg-icon.green .icon-bg {
    color: var(--color-bg-green);
  }
  .shaped-bg-icon.green .featured-icon {
    color: var(--color-text-green);
  }

  /* 5. ORANGE */
  .shaped-bg-icon.orange .icon-bg {
    color: var(--color-bg-orange);
  }
  .shaped-bg-icon.orange .featured-icon {
    color: var(--color-text-orange);
  }

  /* 5. PURPLE */
  .shaped-bg-icon.purple .icon-bg {
    color: var(--color-bg-purple);
  }
  .shaped-bg-icon.purple .featured-icon {
    color: var(--color-text-purple);
  }

  /* 6. SUBTLE */
  .shaped-bg-icon.subtle .icon-bg {
    color: var(--color-bg-subtle);
  }
  .shaped-bg-icon.subtle:hover .icon-bg {
    color: var(--color-bg-hover);
  }
  .shaped-bg-icon.subtle .featured-icon {
    color: var(--color-text-btn-primary-subtle);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"

  import { icons } from "../../assets/icons/icons"
  import { SHAPED_BG_ICON_VARIANTS } from "../../constants/components/appButtons"

  import type { ComponentSize } from "../../types/spacing"
  import type { ShapedBgIconVariant } from "../../types/components/appButtons"

  import Icon from "./Icon.vue"

  // TYPES & INTERFACES
  interface Props {
    icon: string,
    size?: ComponentSize
    color?: ShapedBgIconVariant
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    size: "45px",
    color: SHAPED_BG_ICON_VARIANTS.SUBTLE
  })

  // COMPUTED
  const formattedSize = computed(() => {
    const stringLength: number = props.size.length
    return props.size.slice(0, stringLength - 2)
  })

  const sizeUnit = computed(() => {
    const stringLength: number = props.size.length
    return props.size.slice(stringLength - 2)
  })

  const featuredIconSize = computed(() => {
    return formattedSize.value + sizeUnit.value
  })

  const bgIconSize = computed(() => {
    return Number(Number(formattedSize.value) + 24) + sizeUnit.value
  })

  const computedColor = computed<ShapedBgIconVariant>(() => {
    return Object.values(SHAPED_BG_ICON_VARIANTS).includes(props.color)
        ? props.color
        : SHAPED_BG_ICON_VARIANTS.SUBTLE
  })
</script>