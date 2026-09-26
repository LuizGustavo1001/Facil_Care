<template>
  <!-- Notifications Menu -->
  <div class="notifications-menu absolute overflow-auto flex flex-column gap-1">
    <div class="notifications-header flex align-center justify-between">
      <h1>{{ $t("notifications.title") }}</h1>

      <button class="mark-as-read" @click="handleMarkAllAsRead">
        <span>{{ $t("notifications.markAsRead") }}</span>
      </button>
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
          <span
            v-if="!notification.read"
            class="vertical-line"
          />

          <span class="flex flex-column">
            <span class="title truncate-single">{{ notification.title }}</span>
            <span class="description text-muted">{{ notification.description }}</span>
          </span>
        </button>
      </li>
    </ul>

    <div v-else class="empty-state">Nenhuma notificação encontrada...</div>
  </div>
</template>

<style scoped>
  .notifications-menu{
    top: calc(100% + 8px);
    right: 0;

    width: 350px;
    max-width: 80dvw;
    max-height: 420px;

    background: var(--color-bg-primary);
    border-radius: var(--radius-md);
    box-shadow: 0 0 10px 5px var(--color-shadow-subtle);

    padding: var(--spacing-md);
    z-index: 10;
  }

  .notifications-header{
    border-bottom: 1px solid var(--color-border-default);
    padding-bottom: var(--spacing-2xs);
  }
  .notifications-header h1{
    font-size: var(--text-heading-lg);
  }

  .notifications-list{
    max-height: 300px;
  }

  .notification{
    width: 100%;

    font-family: inherit;
    color: inherit;

    background: var(--color-bg-subtle);
    border: none;
    padding: var(--spacing-xs);
    border-radius: var(--radius-md);

    cursor: pointer;
    transition: 0.2s ease-out;
  }
  .notification:hover{
    background: var(--color-bg-hover);
  }

  .notification .title{
    font-size: var(--text-heading-sm);
    font-weight: var(--bolder-weight);
    text-align: start;
  }
  .notification .description{
    font-weight: var(--medium-weight);
    font-size: var(--text-body-md);
    text-align: start;
  }

  .vertical-line{
    height: 25px;
    width: 5px;

    background: var(--color-border-brand);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
  }

  .mark-as-read{
    background: var(--color-bg-subtle);
    border: none;
    padding: var(--spacing-2xs);
    border-radius: var(--radius-sm);
    font-weight: var(--bold-weight);
    cursor: pointer;

    max-width: 100px;
    font-family: inherit;
    color: inherit;
  }
</style>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import NotificationsController from "../controllers/NotificationsController.js"

  // CONTROLLERS
  const notificationController = new NotificationsController()
  const notifications = ref([])

  // COMPUTED PROPERTIES
  const hasNotifications = computed(() => {
    return notifications.value.length > 0
  })

  // FUNCTIONS
  const handleNotificationStatus = async (notification) => {
    if(notification.read) return

    const result = await notificationController.markAsRead(notification._id)

    if(result.success){
      notifications.value = result.data
    }
  }

  const handleMarkAllAsRead = async () => {
    if(!hasNotifications.value) return

    const result = await notificationController.markAllAsRead()

    if(result.success){
      notifications.value = result.data
    }
  }

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    const result = await notificationController.getAll()

    // Update frontend notifications data
    if(result.success){
      notifications.value = result.data
    }
  })
</script>