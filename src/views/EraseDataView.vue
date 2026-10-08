<template>
  <div class="view regular">
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

    <AppHeader
        :title="utils.getPageTitle(PAGES['ERASE'])"
        :leftBtnIcon="icons['chevron-left']"
        :hasNotifications="false"
        @return-page="navigation.handleReturn"
    />

    <main class="main regular">
      <section v-if="!gotReset" class="main-section center text-center align-center gap-15">
        <div class="title flex flex-column gap-1">
          <h1>{{ t(`views.eraseData.sections.erase.title`) }}</h1>
          <div class="description">
            <p v-for="(desc, index) in tm('views.eraseData.sections.erase.regularSubtitles')" :key="index" class="text-muted">
              {{ desc }}.
            </p>

            <p v-for="(desc, index) in tm('views.eraseData.sections.erase.destructiveSubtitles')" :key="index" class="text-destructive">
              {{ desc }}.
            </p>
          </div>
        </div>

        <ActionButton
            tag="button"
            :leftIcon="icons['warning-circle-fill']"
            :rightIcon="icons['chevron-right']"
            :title="t('views.eraseData.sections.erase.buttons[0]')"
            padding="lg"
            variant="destructive"
            @click.stop="handleClick"
        />
      </section>

      <section v-else class="success-reset main-section center text-center align-center gap-15">
        <Icon :icon="icons['check-circle-line']" size="50px" padding="sm"/>

        <p>{{ t(`views.eraseData.sections.erase.successDelete`) }}!</p>

        <ActionButton
            tag="button"
            @click="navigation.handleReturn"
            :title="t(`utils.homePage`)"
            padding="lg"
        />
      </section>
    </main>

    <AppFooter page="eraseData" />
  </div>
</template>

<style scoped>
  .success-reset p {
    font-size: var(--text-heading-md);
    font-weight: var(--bold-weight);
  }
  .success-reset .icon-wrapper{
    background: var(--green-400);
    border-radius: var(--radius-xl);
  }

  .main-section .title h1{
    font-size: var(--text-heading-2xl);
  }
  .main-section .title .description{
    font-size: var(--text-body-lg);
  }
</style>

<script setup>
  import { computed, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { PAGES } from "../composables/usePages.js"

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
  const { t, tm } = useI18n()
  const confirmPopup = useConfirmPopup()
  const navigation = useNavigation()
  const utils = useUtils()
  const snackbar = useSnackbar()

  // VARIABLES
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
    const title = t(`confirmPopupTemplates.resetData.title`) + "?"

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