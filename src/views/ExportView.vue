<template>
  <div class="view regular">
    <!-- Export Data View -->
    <AppHeader
        :title="utils.getPageTitle(PAGES['EXPORT'])"
    />

    <main class="main regular">
      <section class="main-section regular gap-1">
        <!-- View Main Title -->
        <div class="section-title-container">
          <p class="section-description text-muted">{{ t(`views.${PAGES.EXPORT}.subtitle`) }}:</p>
        </div>

        <!-- Export Options -->
        <div class="buttons-wrapper">
          <template
              v-for="button in exportView.categories.buttons"
              :key="button.id"
          >
            <ActionButtonColorful
                tag="router"
                :to="button.href"
                :title="getButtonTitle(button)"
                :description="getButtonDescription(button)"
                :leftIcon="button.icon"
                leftIconSize="25px"
                :rightIcon="icons['chevron-right']"
                :color="button?.color ?? null"
            />
          </template>
        </div>
      </section>
    </main>

    <AppFooter page="export" />
  </div>
</template>

<style scoped>
</style>

<script setup>
  import { icons } from "../assets/icons/icons.js"
  import { PAGES } from "../constants/sysPages.js"
  import { exportView } from "../locales/projectConfig.js"

  import { useI18n } from "vue-i18n"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"

  // COMPOSABLES
  const { t, te } = useI18n()
  const utils = useUtils()

  // FUNCTIONS
  const getButtonTitle = (button) => {
    const key = `views.${PAGES.EXPORT}.categories.${button.id}.title`

    return te(key) ? t(key) : t(key)
  }

  const getButtonDescription = (button) => {
    const key = `views.${PAGES.EXPORT}.categories.${button.id}.description`

    return te(key) ? t(key) : ""
  }
</script>
