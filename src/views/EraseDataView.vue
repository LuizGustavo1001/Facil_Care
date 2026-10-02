<template>
  <div class="view regular">
    <SnackBar
        v-if="isWarningActive"
        :message="warning.message"
        :type="warning.type || undefined"
        @click="clearWarning"
    />

    <AppHeader
        :title="getPageTitle(PAGES['ERASE'])"
        :leftBtnIcon="icons['chevron-left']"
        :hasNotifications="false"
        @return-page="handleReturn"
    />

    <main class="main regular">
      <section v-if="!isReset" class="main-section center text-center align-center gap-15">
        <div class="title flex flex-column gap-1">
          <h1>{{ $t(`views.eraseData.sections.erase.title`) }}</h1>
          <div class="description">
            <p v-for="(desc, index) in $tm('views.eraseData.sections.erase.regularSubtitles')" :key="index" class="text-muted">
              {{ desc }}.
            </p>

            <p v-for="(desc, index) in $tm('views.eraseData.sections.erase.destructiveSubtitles')" :key="index" class="text-destructive">
              {{ desc }}.
            </p>
          </div>
        </div>

        <ActionButton
            tag="button"
            :leftIcon="icons['warning-circle-fill']"
            :rightIcon="icons['chevron-right']"
            :title="$t('views.eraseData.sections.erase.buttons[0]')"
            padding="lg"
            variant="destructive"
            @click="handleDeleteData"
        />
      </section>

      <section v-else class="success-reset main-section center text-center align-center gap-15">
        <Icon :icon="icons['check-circle-line']" size="50px" padding="sm"/>

        <p>{{ t(`views.eraseData.sections.erase.successDelete`) }}!</p>

        <ActionButton
            tag="button"
            @click="handleReturn()"
            :title="$t(`utils.homePage`)"
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
  import { ref } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useWarning } from "../composables/useWarning.js"
  import { useI18n } from "vue-i18n"

  import AppHeader from "../components/AppHeader.vue"
  import AppFooter from "../components/AppFooter.vue"
  import ActionButton from "../components/common/ActionButton.vue"
  import Icon from "../components/common/Icon.vue"
  import SnackBar from "../components/common/SnackBar.vue"

  import DatabaseController from "../controllers/DatabaseController.js"

  // COMPOSABLES
  const { t } = useI18n()
  const { handleReturn } = useNavigation()
  const { getPageTitle, PAGES } = useUtils()
  const { getWarning, isWarningActive, warning, clearWarning } = useWarning()

  // VARIABLES
  const isReset = ref(false)

  // CONTROLLERS
  const databaseController = new DatabaseController()

  // FUNCTIONS
  const handleDeleteData = async () => {
    const confirmDelete = confirm(t(`views.eraseData.sections.erase.confirmDelete`) + "?")
    if(!confirmDelete) return

    const result = await databaseController.resetAllData()

    if(result.success){
      isReset.value = true
      getWarning(result.code)
    }
  }
</script>