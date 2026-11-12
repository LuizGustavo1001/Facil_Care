<template>
  <header
      class="app-header flex justify-center align-center gap-05 sticky"
      :class="[
          computedType,
          computedVariant
        ]"
  >
    <!-- App Header -->
    <div class="flex align-center gap-05 flex-grow-1">
      <!-- Left Icon -->
      <!-- 1. Return Button -->
      <template v-if="computedType === HEADER_TYPES.DEFAULT">
        <IconBtn
            :icon="icons['chevron-left']"
            size="25px"
            variant="subtle"
            @click="navigation.handleReturn"
        />
      </template>

      <!-- 2. Page Icon -->
      <template v-if="computedType === HEADER_TYPES['NO_BUTTON']">
        <Icon
          :icon="props.leftIcon"
          size="25px"
        />
      </template>

      <!-- Page Title -->
      <p class="title flex-grow-1 truncate-single">
        <slot>
          <strong>{{ props.title }}</strong>
        </slot>
      </p>
    </div>

    <!-- Notifications Menu -->
    <div class="relative">
      <IconBtn
          v-if="hasNotifications"
          :tag="BUTTON_TAGS.BUTTON"
          :icon="icons['notification-line']"
          size="25px"
          :variant="computedVariant === 'transparent'
            ? ICON_BTN_VARIANTS.SUBTLE
            : ICON_BTN_VARIANTS.TRANSPARENT
          "
          @click="toggleNotifications"
      />

      <NotificationsMenu
        :isOpen="isNotificationsOpen"
        @close="isNotificationsOpen = false"
      />
    </div>
  </header>
</template>

<style scoped>
  .app-header {
    top: 0;
    padding: var(--spacing-md);

    border-radius: 0 0 var(--radius-lg) var(--radius-lg);

    z-index: 1;
  }

  .app-header p {
    font-size: var(--font-heading-3);
  }

  /* VARIANTS */
  /* 1. Transparent */
  .app-header.transparent {
    background: transparent;
    color: var(--color-text-inverse);
  }

  /* 2. Subtle */
  .app-header.subtle {
    background: var(--color-bg-primary);
    box-shadow: 0 0 3px 3px var(--color-shadow-subtle);
  }
</style>

<script setup lang="ts">
  import { computed, ref } from "vue"
  import { icons } from "../../assets/icons/icons.js"

  import { useNavigation } from "../../composables/useNavigation"

  import IconBtn from "../buttons/IconBtn.vue"
  import NotificationsMenu from "./NotificationsMenu.vue"
  import Icon from "../icons/Icon.vue"

  import type { AppHeaderType, AppHeaderVariant } from "../../types/components/appHeader"

  import { HEADER_TYPES, HEADER_VARIANTS } from "../../constants/components/appHeader"
  import { BUTTON_TAGS } from "../../constants/components/buttons"
  import { ICON_BTN_VARIANTS } from "../../constants/components/buttons"

  // TYPES & INTERFACES
  interface Props {
    title?: string
    leftIcon?: string
    type?: AppHeaderType
    hasNotifications?: boolean
    variant?: AppHeaderVariant
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    leftIcon: "",
    type: HEADER_TYPES.DEFAULT,
    hasNotifications: false,
    variant: HEADER_VARIANTS.SUBTLE,
  })

  // COMPOSABLES
  const navigation = useNavigation()

  // REF PROPERTIES
  const isNotificationsOpen = ref<boolean>(false)

  // FUNCTIONS
  const toggleNotifications = (): void => {
    isNotificationsOpen.value = !isNotificationsOpen.value
  }

  const computedType = computed<AppHeaderType>(() => {
    return Object.values(HEADER_TYPES).includes(props.type)
        ? props.type
        : HEADER_TYPES.DEFAULT
  })

  const computedVariant = computed<AppHeaderVariant>(() => {
    return Object.values(HEADER_VARIANTS).includes(props.variant)
        ? props.variant
        : HEADER_VARIANTS.SUBTLE
  })

  /*
    <!-- Simple title -->
    <AppHeader title="Dashboard" />

    <!-- Greeting with bold username -->
    <AppHeader>
      {{ $t('greetings.hello') }}, <strong>{{ username }}</strong>!
    </AppHeader>
  */

  /*
    <AppHeader
        toggleBtnRef="toggleBtnRef"
        :hasNotifications="true"
        @sidebarToggle="sidebar.toggle"
    >
      {{ t('utils.hello') }}, <strong>{{ patient.name }}</strong>!
    </AppHeader>
  */
</script>