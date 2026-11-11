<template>
  <nav class="main-navigation-bar flex gap-15 align-center justify-center fixed">
    <!-- Main Navigation Bar -->
    <RouterLink
        v-for="item in mainNavigationBar"
        :key="item.id"
        :to="item.href"
        :class="[{ active: isItemActive(item.id) }]"
        class="nav-item flex align-center"
    >
      <div class="wrapper flex align-center justify-center">
        <Icon
          :icon="
            isItemActive(item.id)
                ? item.iconActive
                : item.icon
          "
          size="20px"
        />
      </div>

      <p
          v-if="item?.hasText"
          class="label bolder-weight"
      >
        {{ getItemTitle(item) }}
      </p>
    </RouterLink>
  </nav>
</template>

<style scoped>
  .main-navigation-bar {
    bottom: 0;
    padding: var(--spacing-sm);

    background: var(--color-bg-primary);

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
  .nav-item:hover {
    color: var(--color-text-brand);
  }

  /* MOBILE */
  @media(max-width: 768px) {
    .main-navigation-bar {
      width: 100%;
      padding: var(--spacing-xs) var(--spacing-xl) var(--spacing-xs) var(--spacing-xl);
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
      padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs) var(--spacing-md);
      border-radius: var(--radius-full);
    }

    .nav-item.active .wrapper,
    .nav-item:hover .wrapper {
      background-color: var(--color-bg-subtle);
    }
  }

  /* TABLET & DESKTOP */
  @media(min-width: 768px) {
    .main-navigation-bar {
      width: 100%;
      font-size: var(--font-button-description);
    }

    .nav-item {
      padding: var(--spacing-sm);
      flex-direction: row;
      gap: 0.5em;

      border-radius: var(--radius-xs);
    }
    .nav-item.active,
    .nav-item:hover {
      background-color: var(--color-bg-subtle);
    }
  }

  @media(min-width: 1024px) {
    .main-navigation-bar {
      left: 50%;
      bottom: 1em;
      transform: translateX(-50%);

      padding: var(--spacing-xs);
      width: fit-content;
      gap: 1em;

      border-radius: var(--radius-full);
      border: 1px solid var(--color-border-default-subtle);
    }

    .nav-item {
      border-radius: var(--radius-full);
    }
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import { mainNavigationBar } from "../../locales/projectConfig"
  import { useI18n } from "vue-i18n"
  import Icon from "../icons/Icon.vue"

  // TYPES & INTERFACES
  interface Props { activeItem?: string | null }

  interface NavItem {
      id: string
      icon: string
      iconActive: string
      href: string
      hasText: boolean
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), { activeItem: null })

  // COMPOSABLES
  const { t, te } = useI18n()

  // COMPUTED PROPERTIES
  const computedActiveItem = computed<string | null>(() => {
    return props.activeItem
        ?? mainNavigationBar.home.id
        ?? null
  })

  const getItemTitle = (item: NavItem): string => {
    const key = `mainNavigationBar.${item.id}.title`

    return te(key)
        ? t(key)
        : ""
  }

  const isItemActive = (itemId: string): boolean => {
    return itemId === computedActiveItem.value
  }
</script>