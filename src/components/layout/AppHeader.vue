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
      <template v-if="computedType === HEADER_TYPES.default">
        <IconBtn
            :icon="icons['chevron-left']"
            size="25px"
            variant="subtle"
            @click="navigation.handleReturn"
        />
      </template>

      <!-- 2. Page Icon -->
      <template v-if="computedType === HEADER_TYPES.noButton">
        <Icon
          :icon="leftIcon"
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
          tag="button"
          :icon="icons['notification-line']"
          size="25px"
          :variant="computedVariant === 'transparent' ? 'subtle' : 'transparent'"
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

  // CONSTANTS
  const HEADER_TYPES: Record<string, string> = {
    default: "default",
    noButton: "noButton"
  }
  const HEADER_VARIANTS: string[] = ["subtle", "transparent"]

  // TYPES & INTERFACES
  type HeaderType = typeof HEADER_TYPES[keyof typeof HEADER_TYPES]
  type HeaderVariant = typeof HEADER_VARIANTS[number]

  interface Props {
    title?: string
    leftIcon?: string
    type?: HeaderType | string
    hasNotifications?: boolean
    variant?: HeaderVariant | string
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    leftIcon: icons["logo-fill-colorful"],
    type: "",
    hasNotifications: false,
    variant: ""
  })

  // COMPOSABLES
  const navigation = useNavigation()

  // REF PROPERTIES
  const isNotificationsOpen = ref<boolean>(false)

  // FUNCTIONS
  const toggleNotifications = (): void => {
    isNotificationsOpen.value = !isNotificationsOpen.value
  }

  const computedType = computed<HeaderType>(() => {
    if(!Object.values(HEADER_TYPES).includes(props.type)) {
      return HEADER_TYPES.default
    }

    return HEADER_TYPES[props.type]
  })

  const computedVariant = computed<HeaderVariant>(() => {
    if(!HEADER_VARIANTS.includes(props.variant)) {
      return HEADER_VARIANTS[0]
    }

    return props.variant
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