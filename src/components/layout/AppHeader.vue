<template>
  <header class="flex justify-center align-center gap-05">
    <div class="flex align-center gap-05 flex-grow-1">

      <template v-if="leftBtnIcon === icons['menu-left']">
        <IconBtn
            :ref="toggleBtnRef"
            :icon="leftBtnIcon"
            size="25px"
            variant="subtle"
            @click.stop="$emit('sidebar-toggle')"
        />
      </template>

      <template v-else>
        <IconBtn
            :icon="leftBtnIcon"
            size="25px"
            variant="subtle"
            @click="$emit('return-page')"
        />
      </template>

      <p class="title flex-grow-1 truncate-single">
        <slot><strong>{{ props.title }}</strong></slot>
      </p>
    </div>

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
  header{
    position: sticky;
    top: 0;
    padding: var(--spacing-md);
    background: var(--color-bg-primary);

    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    box-shadow: 0 0 3px 3px var(--color-shadow-subtle);

    z-index: 1;
  }

  header p{
    font-size: var(--text-heading-md);
  }
</style>

<script setup>
  import { ref } from "vue"

  import { icons } from "../../assets/icons/icons.js"

  import IconBtn from "../buttons/IconBtn.vue"
  import NotificationsMenu from "./NotificationsMenu.vue"

  // PROPS
  const props = defineProps({
    title: String,
    leftBtnIcon: {
      type: String,
      default: icons["menu-left"]
    },
    hasNotifications: {
      type: Boolean,
      default: true
    },
    toggleBtnRef: String
  })

  // REF PROPERTIES
  const isNotificationsOpen = ref(false)

  // FUNCTIONS
  const toggleNotifications = () => {
    isNotificationsOpen.value = !isNotificationsOpen.value
  }

  /*
    <!-- Simple title -->
    <AppHeader title="Dashboard" />

    <!-- Greeting with bold username -->
    <AppHeader>
      {{ $t('greetings.hello') }}, <strong>{{ username }}</strong>!
    </AppHeader>
  */
</script>