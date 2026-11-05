<template>
  <header
      class="app-header flex justify-center align-center gap-05 sticky"
      :class="HEADER_TYPES[computedType] ?? undefined"
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
          variant="transparent"
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
    background: var(--color-bg-primary);

    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    box-shadow: 0 0 3px 3px var(--color-shadow-subtle);

    z-index: 1;
  }

  .app-header p {
    font-size: var(--font-heading-3);
  }
</style>

<script setup>
  import { computed, ref } from "vue"
  import { icons } from "../../assets/icons/icons.js"

  import { useNavigation } from "../../composables/useNavigation.js"

  import IconBtn from "../buttons/IconBtn.vue"
  import NotificationsMenu from "./NotificationsMenu.vue"
  import Icon from "../icons/Icon.vue"

  // CONSTANTS
  const HEADER_TYPES = {
    default: "default",
    noButton: "noButton"
  }

  // COMPOSABLES
  const navigation = useNavigation()

  // PROPS
  const props = defineProps({
    title: String,
    leftIcon: {
      type: String,
      default: icons["logo-fill-colorful"]
    },
    type: {
      type: String,
      default: null
    },
    hasNotifications: {
      type: Boolean,
      default: false
    },
    toggleBtnRef: String
  })

  // REF PROPERTIES
  const isNotificationsOpen = ref(false)

  // FUNCTIONS
  const toggleNotifications = () => {
    isNotificationsOpen.value = !isNotificationsOpen.value
  }

  const computedType = computed(() => {
    if(!Object.values(HEADER_TYPES).includes(props.type)) {
      return HEADER_TYPES.default
    }

    return props.type
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