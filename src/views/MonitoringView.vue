<template>
  <div class="view regular">
    <!-- Monitoring View -->
    <template v-if="pageExists">
      <AppHeader :title="utils.getPageTitle(currentCategory as string)"/>

      <main class="main regular">
        <!-- Page Title -->
        <section class="main-section regular gap-1">
          <div class="section-title-container">
            <p class="section-description text-muted">{{ getPageSubtitle() }}:</p>
          </div>

          <!-- Monitorings List -->
          <div class="flex flex-column gap-1 buttons-wrapper">
            <template
                v-for="item in currentTemplate.items"
                :key="item.id"
            >
              <ActionButtonColorful
                  tag="router"
                  :to="item.href"
                  :title="getItemTitle(item.id)"
                  :leftIcon="item.iconLine"
                  leftIconSize="25px"
                  :rightIcon="icons['chevron-right']"
                  :color="item.color"
              />
            </template>
          </div>
        </section>
      </main>

      <AppFooter :page="String(currentCategory)" />
    </template>

    <template v-else>
      <AppFallback />
    </template>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  import { computed } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { monitoringViews } from "../locales/projectConfig"

  import { MONITORING_PAGES } from "../constants/sysPages"

  import type { MonitoringPageType } from "../types/sysPages"

  import { useRoute } from "vue-router"
  import { useUtils } from "../composables/useUtils"

  import AppHeader from "../components/layout/AppHeader.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/layout/AppFooter.vue"

  // COMPOSABLES
  const route = useRoute()
  const utils = useUtils()

  // COMPUTED PROPERTIES
  // Returns page data
  const currentCategory = computed<MonitoringPageType | null>(() => {
    const category = route.params.category

    if (typeof category !== "string") return null

    return MONITORING_PAGES.find(page => page === category) ?? null
  })

  // Current template from "projectConfig"
  const currentTemplate = computed<any>(() => {
    const id = currentCategory.value

    if (!id) return null

    return monitoringViews[id] ?? null
  })

  const pageExists = computed<boolean>(() => {
    return currentTemplate.value !== null
  })

  // FUNCTIONS
  // Returns button label
  const getItemTitle = (id: string): string => {
    const key = `views.monitoring.${currentCategory.value}.items.${id}.title`

    return utils.getTranslate(key)
  }

  const getPageSubtitle = (): string => {
    const key = `views.monitoring.${currentCategory.value}.subtitle`

    return utils.getTranslate(key)
  }
</script>