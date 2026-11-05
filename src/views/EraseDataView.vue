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
      <section v-if="!gotReset" class="main-section center text-center align-center gap-15">
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

        <p>{{ t(`views.eraseData.sections.erase.successDelete`) }}!</p>

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

<script setup>
  import { computed, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { PAGES } from "../constants/sysPages.js"
  import { pages } from "../locales/projectConfig.js"
  import { BUTTON_COLORS } from "../constants/btnColors.js"

  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useI18n } from "vue-i18n"
  import { useConfirmPopup } from "../composables/useConfirmPopup.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import Icon from "../components/icons/Icon.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import ConfirmPopup from "../components/layout/popup/ConfirmPopup.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"

  import DatabaseController from "../controllers/DatabaseController.js"

  // COMPOSABLES
  const { t, tm, te } = useI18n()
  const confirmPopup = useConfirmPopup()
  const navigation = useNavigation()
  const utils = useUtils()
  const snackbar = useSnackbar()

  // STATES
  const gotReset = ref(false)

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed(() => snackbar.isActive.value)
  const isConfirmOpen = computed(() => confirmPopup.isOpen.value)
  const confirmTitle = computed(() => confirmPopup.title.value)
  const confirmMessage = computed(() => confirmPopup.message.value)

  // CONTROLLERS
  const databaseController = new DatabaseController()

  // FUNCTIONS
  const handleClick = async () => {
    const titleKey = `confirmPopupTemplates.resetData.title`

    let title = ""

    if(te(titleKey)) {
      title = t(titleKey) + "?"
    }

    confirmPopup.open(title, null, () => resetData())
  }

  const resetData = async () => {
    const result = await databaseController.resetAllData()

    if(result.success){
      gotReset.value = true
      snackbar.open(result.code)
    }
  }
</script>