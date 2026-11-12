<template>
  <transition name="fade" mode="out-in">
    <!-- Notifications Menu -->
    <div v-if="isOpen" class="notifications-menu absolute overflow-auto flex flex-column gap-1">
      <div class="notifications-header flex align-center justify-between">
        <h1>{{ utils.getTranslate("notifications.title") }}</h1>

        <!-- Mark Every INotification as Read Button -->
        <IconBtn
            v-if="hasNotifications"
            :icon="icons['double-check']"
            @click="handleMarkAllAsRead"
            :variant="ICON_BTN_VARIANTS.PRIMARY"
            size="25px"
        />
      </div>

      <!-- Notifications List -->
      <ul v-if="hasNotifications" class="notifications-list flex flex-column gap-1">
        <li
            v-for="notification in notifications"
            :key="notification._id"
        >
          <button
              class="notification flex align-center gap-05"
              @click="handleNotificationStatus(notification)"
          >

            <VerticalLine v-if="!notification.read" />

          <span class="notification-text flex flex-column">
            <span class="title truncate-single">{{ notification.title }}</span>
            <span class="description text-muted">{{ notification.description }}</span>
          </span>
          </button>
        </li>
      </ul>

      <!-- FallBack -->
      <div v-else class="empty-state">
        <NotFoundCard type="notification" size="small" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .notifications-menu {
    top: calc(100% + 8px);
    right: 0;

    width: 350px;
    max-width: 80dvw;
    max-height: 420px;

    background: var(--color-bg-subtle);
    border-radius: var(--radius-md);
    box-shadow: 0 0 4px 2px var(--color-shadow-subtle);

    padding: var(--spacing-sm);
    z-index: 10;
  }

  .notifications-header {
    border-bottom: 1px solid var(--color-border-default);
    padding-bottom: var(--spacing-2xs);
  }
  .notifications-header h1 {
    font-size: var(--font-heading-2);
  }

  .notifications-list {
    max-height: 300px;
  }

  .notification {
    width: 100%;

    font-family: inherit;
    color: inherit;

    background: var(--color-bg-primary);
    border: none;
    padding: var(--spacing-xs);
    border-radius: var(--radius-xs);

    cursor: pointer;
    transition: 0.2s ease-out;
  }
  .notification:hover {
    background: var(--color-bg-hover);
  }

  .notification-text .title {
    font-size: var(--font-body-md);
    font-weight: var(--bolder-weight);
    text-align: start;
  }
  .notification-text .description {
    font-size: var(--font-body-sm);
    font-weight: var(--medium-weight);
    text-align: start;
  }
</style>

<script setup lang="ts">
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../../assets/icons/icons.js"
  import { useUtils } from "../../composables/useUtils"

  import NotificationController from "../../controllers/NotificationController"

  import type { INotification } from "../../interfaces/INotification"

  import { ICON_BTN_VARIANTS } from "../../constants/components/buttons"

  import NotFoundCard from "../feedback/NotFoundCard.vue"
  import VerticalLine from "../common/VerticalLine.vue"
  import IconBtn from "../buttons/IconBtn.vue"


  // TYPES & INTERFACES
  interface Props {
    isOpen: boolean
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    isOpen: true,
  })

  // COMPOSABLES
  const utils = useUtils()

  // CONTROLLERS
  const notificationController = new NotificationController()
  const notifications = ref<INotification[]>([])

  // COMPUTED PROPERTIES
  const hasNotifications = computed(() => {
    return notifications.value.length > 0
  })

  // FUNCTIONS
  const fetchNotifications = async (): Promise<void> => {
    const result = await notificationController.getAll()
    if (result.success && result.data) {
      notifications.value = result.data
    }
  }

  const handleNotificationStatus = async (notification: INotification): Promise<void> => {
    if(notification.read) return

    const result = await notificationController.markAsRead(notification._id)

    if(result.success) {
      await fetchNotifications()
    }
  }

  const handleMarkAllAsRead = async () => {
    if(!hasNotifications.value) return

    const result = await notificationController.markAllAsRead()

    if(result.success) {
      await fetchNotifications()
    }
  }

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    await fetchNotifications()
  })
</script>