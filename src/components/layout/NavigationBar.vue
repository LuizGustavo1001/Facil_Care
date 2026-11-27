<template>
  <nav class="main-navigation-bar flex gap-15 align-center justify-center fixed overflow-scroll">
    <!-- Main Navigation Bar -->
    <RouterLink
        v-for="item in mainNavigationBar"
        :key="item.id"
        :to="item.href"
        :class="[{ active: isItemActive(item.id) }]"
        class="nav-item flex align-center active-border tap-highlight"
    >
      <div class="wrapper flex align-center justify-center">
        <Icon
          :icon="
            isItemActive(item.id)
                ? item.iconFill
                : item.iconLine
          "
          size="20px"
        />
      </div>

      <p
          v-if="getItemTitle(item.id)"
          class="label medium-weight"
      >
        {{ getItemTitle(item.id) }}
      </p>
    </RouterLink>
  </nav>
</template>

<style scoped>
  .main-navigation-bar {
    bottom: 0.5em;
    left: 0.25em;

    padding: var(--spacing-md);
    width: 100%;

    background: var(--color-bg-subtle);

    box-shadow: 0 0 5px 3px var(--color-shadow-subtle);
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;

    z-index: 4;
  }

  .nav-item {
    color: var(--color-text-primary-muted);
    transition: all 0.2s ease;
  }
  .nav-item .wrapper {
    transition: all 0.2s ease;
  }

  .nav-item.active,
  .nav-item:hover,
  .nav-item:focus,
  .nav-item:active {
    color: var(--color-text-blue);
  }

  .highContrast .nav-item.active,
  .highContrast .nav-item:hover,
  .highContrast .nav-item:focus,
  .highContrast .nav-item:active {
    color: var(--white);
  }

  /* MOBILE */
  @media(max-width: 768px) {
    .main-navigation-bar {
      padding: var(--spacing-xs) var(--spacing-xl);
      justify-content: space-between;
      font-size: var(--font-caption);
    }

    .nav-item {
      flex-direction: column;
      min-width: 60px;
      text-align: center;

      gap: 0.2em;
    }
    .nav-item .wrapper {
      padding: var(--spacing-xs) var(--spacing-lg);
      border-radius: var(--radius-full);
    }

    .nav-item.active .wrapper,
    .nav-item:active .wrapper {
      background: var(--color-bg-primary);
    }

    .nav-item:hover .wrapper,
    .nav-item:focus .wrapper {
      background: var(--color-bg-hover);
    }
  }

  /* TABLET & DESKTOP */
  @media(min-width: 768px) {
    .main-navigation-bar {
      font-size: var(--font-button-description);
    }

    .nav-item {
      padding: var(--spacing-sm) var(--spacing-md);
      flex-direction: row;
      gap: 0.5em;

      border-radius: var(--radius-full);
    }

    .nav-item.active,
    .nav-item:active  {
      background: var(--color-bg-primary);
    }

    .nav-item:hover,
    .nav-item:focus {
      background: var(--color-bg-hover);
    }
  }

  @media(min-width: 1024px) {
    .main-navigation-bar {
      left: 50%;
      bottom: 1.5em;
      transform: translateX(-50%);

      padding: var(--spacing-xs);
      width: fit-content;
      gap: 0.3em;

      border-radius: var(--radius-full);
      box-shadow: none;
    }
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import { mainNavigationBar } from "../../locales/projectConfig"
  import { useUtils } from "../../composables/useUtils"

  import Icon from "../icons/Icon.vue"

  // TYPES & INTERFACES
  interface Props {
    activeItem?: string | null | undefined
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), { activeItem: null })

  // COMPOSABLES
  const utils = useUtils()

  // COMPUTED PROPERTIES
  const computedActiveItem = computed<string | null>(() => {
    return props.activeItem
        ?? mainNavigationBar[0].id
        ?? null
  })

  // FUNCTIONS
  const getItemTitle = (itemId: string): string => {
    const key = `mainNavigationBar.${itemId}.title`
    return utils.getTranslate(key)
  }

  const isItemActive = (itemId: string): boolean => {
    return itemId === computedActiveItem.value
  }
</script>