<template>
  <div class="view regular">
    <!-- Export Data View -->
    <AppHeader :title="utils.getPageTitle(currentBackupCategory as string)" />

    <main class="main regular">
      <section class="main-section regular gap-1">
        <!-- View Main Title -->
        <div class="section-title-container">
          <p class="section-description text-muted">{{ utils.getTranslate(`views.${PAGES.EXPORT}.subtitle`) }}:</p>
        </div>

        <!-- Export Options -->
        <div class="buttons-wrapper" v-if="backupButtons.length">
            <ActionButtonColorful
                v-for="button in backupButtons"
                :key="button.id"

                :tag="BUTTON_TAGS.ROUTER"
                :to="button.href"
                :color="button.color"

                :title="getButtonTranslation(button.id, 'title')"
                :description="getButtonTranslation(button.id, 'description')"

                :leftIcon="button.iconLine"
                leftIconSize="25px"

                :rightIcon="icons['chevron-right']"
            />
        </div>
      </section>
    </main>

    <AppFooter page="dataManagement" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  import { computed } from "vue"

  import { icons } from "../assets/icons/icons"
  import { PAGES } from "../constants/sysPages"
  import { BUTTON_TAGS } from "../constants/components/appButtons"
  import { dataManagementView } from "../locales/projectConfig"

  import { useUtils } from "../composables/useUtils"
  import { useRoute } from "vue-router"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"

  // COMPOSABLES
  const utils = useUtils()
  const route = useRoute()

  // INTERFACES & TYPES
  type BackupCategory = keyof typeof dataManagementView.categories
  type ButtonTranslation = "title" | "description"

  // COMPUTED
  const currentBackupCategory = computed<BackupCategory | null>(() => {
    const category = route.params.category

    if (typeof category !== "string" || !Object.hasOwn(dataManagementView.categories, category)) return null

    return category as BackupCategory
  })

  const backupButtons = computed(() => {
    if (!currentBackupCategory.value) return []
    return dataManagementView.categories[currentBackupCategory.value].buttons
  })

  // FUNCTIONS
  const getButtonTranslation = (buttonId: string, translation: ButtonTranslation): string => {
    const key = `views.${PAGES.DATA_MANAGEMENT}.categories.${currentBackupCategory.value}.buttons.${buttonId}.${translation}`

    return utils.getTranslate(key)
  }
</script>
