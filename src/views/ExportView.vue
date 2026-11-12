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
          <p class="section-description text-muted">{{ utils.getTranslate(`views.${PAGES.EXPORT}.subtitle`) }}:</p>
        </div>

        <!-- Export Options -->
        <div class="buttons-wrapper">
          <template
              v-for="button in exportView.categories.buttons"
              :key="button.id"
          >
            <ActionButtonColorful
                :tag="BUTTON_TAGS.ROUTER"
                :to="button.href"
                :title="getButtonTitle(button.id)"
                :description="getButtonDescription(button.id)"
                :leftIcon="button.icon"
                leftIconSize="25px"
                :rightIcon="icons['chevron-right']"
                :color="button?.color"
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

<script setup lang="ts">
  import { icons } from "../assets/icons/icons.js"
  import { PAGES } from "../constants/sysPages"
  import { BUTTON_TAGS } from "../constants/components/buttons"
  import { exportView } from "../locales/projectConfig"

  import { useUtils } from "../composables/useUtils"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"

  // COMPOSABLES
  const utils = useUtils()

  // FUNCTIONS
  const getButtonTitle = (buttonId: string): string => {
    const key = `views.${PAGES.EXPORT}.categories.${buttonId}.title`
    return utils.getTranslate(key)
  }

  const getButtonDescription = (buttonId: string): string => {
    const key = `views.${PAGES.EXPORT}.categories.${buttonId}.description`
    return utils.getTranslate(key)
  }
</script>
