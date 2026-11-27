<template>
  <transition name="prompt-transition" mode="out-in">
    <div
        v-if="isPromptVisible"
        class="update-prompt flex flex-column gap-1"
        role="status"
        aria-live="polite"
        aria-labelledby="update-title"
    >
      <template v-if="needRefresh && !isUpdateDelayed">
        <!-- New Version Available -->
      <div>
        <h2 id="update-title" class="truncate-single">{{ getTranslate("newVersion", "title") }}</h2>
        <p class="truncate-multi text-muted subtitle">{{ getTranslate("newVersion", "description") }}</p>
      </div>
        <div class="actions">
          <ActionButton
            :tag="BUTTON_TAGS.BUTTON"
            :title="utils.getTranslate('utils.later')"
            :variant="ACTION_BUTTON_VARIANTS.SUBTLE"
            @click="delayUpdate"
          />

          <ActionButton
              :tag="BUTTON_TAGS.BUTTON"
              :title="utils.getTranslate('utils.updateNow')"
              @click="updateApplication"
          />
        </div>
      </template>

      <template v-else>
        <!-- Updated With Success -->
        <div>
          <h2 id="update-title">{{ getTranslate("upToDate", "title") }}!</h2>
          <p class="subtitle">{{ getTranslate("upToDate", "description") }}.</p>
        </div>

         <ActionButton
            :tag="BUTTON_TAGS.BUTTON"
            :title="utils.getTranslate(`utils.understood`)"
            @click="closePrompt"
            class="width-fit"
            style="align-self: flex-end;"
          />
      </template>

    </div>
  </transition>
</template>

<style scoped>
  .update-prompt {
    position: fixed;
    bottom: var(--spacing-md);
    left: 50%;
    transform: translateX(-50%);

    width: min(90%, 420px);
    padding: var(--spacing-lg);

    background: var(--color-bg-primary);
    border-radius: var(--radius-lg);

    box-shadow: 0 0 4px 5px var(--color-shadow-subtle);
    z-index: 10;
  }

  .update-prompt .subtitle {
    font-size: var(--font-body-sm);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-sm);
  }

  .prompt-transition-enter-active,
  .prompt-transition-leave-active {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .prompt-transition-enter-from,
  .prompt-transition-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(80%);
  }
</style>

<script setup lang="ts">
  import { computed, ref } from "vue"
  import { useRegisterSW } from 'virtual:pwa-register/vue'
  import { useUtils } from "../../composables/useUtils"

  import { ACTION_BUTTON_VARIANTS, BUTTON_TAGS } from "../../constants/components/appButtons"
  import ActionButton from "../buttons/ActionButton.vue"

  // INTERFACES & TYPES
  type TranslateTag = "title" | "description"
  type CategoryType = "newVersion" | "upToDate"

  // COMPOSABLES
  const utils = useUtils()

  // STATES
  const isUpdateDelayed = ref<boolean>(sessionStorage.getItem("delayUpdate") === "true")

  // PWA REGISTRATION
  const {
    offlineReady,
    needRefresh,
    updateServiceWorker
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if(!registration) return

      // Verifies new version for each hour
      window.setInterval(() => {
        registration.update()
      }, 60 * 60 * 1000)
    },

    onRegisterError(error) {
      console.error('PWA registration error:', error)
    }
  })

  // COMPUTED
  const isPromptVisible = computed(() => {
    return (
        offlineReady.value ||
        (needRefresh.value && !isUpdateDelayed.value)
    )
  })

  // FUNCTIONS
  const getTranslate = (category: CategoryType, item: TranslateTag): string => {
    const key = `pwaUpdate.${category}.${item}`
    return utils.getTranslate(key)
  }

  // Fecha a mensagem sem atualizar
  const closePrompt = (): void => {
    offlineReady.value = false
  }

  const delayUpdate = (): void => {
    isUpdateDelayed.value = true
    sessionStorage.setItem("delayUpdate", "true")
  }

  // Atualiza a aplicação
  const updateApplication = async (): Promise<void> => {
    await updateServiceWorker(true)
  }
</script>
