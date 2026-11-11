<template>
  <div class="view regular">
    <!-- Erase Data View -->
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppOverlay />

    <ConfirmPopup
        :isOpen="isConfirmOpen"
        :popupRef="confirmPopup.popupRef"
        :title="confirmTitle"
        :message="confirmMessage"
        @cancel="confirmPopup.close"
        @confirm="confirmPopup.handleConfirm"
    />

    <AppHeader :title="utils.getPageTitle(PAGES['ERASE'])" />

    <main class="main regular">
      <!-- Reset Confirmation Section -->
      <section v-if="!dataGotReset" class="main-section center text-center align-center gap-15">
        <Icon
            :icon="pages[PAGES.ERASE].iconFill"
            size="40px"
            padding="xs"
            :bgColor="pages[PAGES.ERASE].color"
            style="border-radius: var(--radius-md)"
        />

        <div class="section-title-container flex flex-column gap-05">
          <h2 class="section-title">{{ t(`views.eraseData.categories.erase.title`)}}</h2>
          <div class="section-description flex flex-column gap-03">
            <p v-for="(desc, index) in tm('views.eraseData.categories.erase.regularSubtitles')" :key="index" class="text-muted">
              {{ desc }}.
            </p>

            <p v-for="(desc, index) in tm('views.eraseData.categories.erase.destructiveSubtitles')" :key="index" class="text-destructive">
              {{ desc }}.
            </p>
          </div>
        </div>

        <ActionButton
            tag="button"
            :leftIcon="icons['warning-circle-fill']"
            :title="t('views.eraseData.categories.erase.buttons[0]')"
            padding="md"
            variant="destructive"
            @click.stop="handleClick"
        />
      </section>

      <!-- Reset Successfully Section -->
      <section v-else class="success-reset main-section center text-center align-center gap-15">
        <Icon
            :icon="icons['user-smile-line']"
            size="50px"
            padding="xs"
            :bgColor="BUTTON_COLORS.GREEN"
            style="border-radius: var(--radius-sm)"
        />

        <p>{{ t(`views.eraseData.categories.erase.successDelete`) }}!</p>

        <ActionButton
            tag="button"
            @click="navigation.handleReturn"
            :title="t(`utils.homePage`)"
            padding="md"
        />
      </section>
    </main>

    <AppFooter page="eraseData" />
  </div>
</template>

<style scoped>
  .success-reset p {
    font-weight: var(--bold-weight);
  }

  .section-title-container .section-title {
    font-size: var(--font-heading-1);
  }
</style>

<script setup lang="ts">
  import { computed, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { pages } from "../locales/projectConfig"

  import { useI18n } from "vue-i18n"
  import { useNavigation } from "../composables/useNavigation"
  import { useUtils } from "../composables/useUtils"
  import { useSnackbar } from "../composables/useSnackbar"
  import { useConfirmPopup } from "../composables/useConfirmPopup"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import Icon from "../components/icons/Icon.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import ConfirmPopup from "../components/layout/popup/ConfirmPopup.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"

  import DatabaseController from "../controllers/DatabaseController"

  import type { WarningCode } from "../types/snackbar"
  import { BUTTON_COLORS } from "../constants/buttonComponent"
  import { PAGES } from "../constants/sysPages"

  // COMPOSABLES
  const { t, tm } = useI18n()
  const confirmPopup = useConfirmPopup()
  const navigation = useNavigation()
  const utils = useUtils()
  const snackbar = useSnackbar()

  // STATES
  const dataGotReset = ref<boolean>(false)

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)
  const isConfirmOpen = computed<boolean>(() => confirmPopup.isOpen.value)
  const confirmTitle = computed<string | undefined>(() => confirmPopup.title.value)
  const confirmMessage = computed<string | null>(() => confirmPopup.message.value)

  // CONTROLLERS
  const databaseController = new DatabaseController()

  // FUNCTIONS
  const handleClick = async (): Promise<void> => {
    const titleKey = `confirmPopupTemplates.resetData.title`

    let title = utils.getTranslate(titleKey) + "?"

    confirmPopup.open(title, null, () => resetData())
  }

  const resetData = async (): Promise<void> => {
    const result = await databaseController.resetAllData()

    if(result.success) {
      dataGotReset.value = true
    }

    if(result.code) {
      snackbar.open(result.code as WarningCode)
    }
  }
</script>