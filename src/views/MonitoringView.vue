<template>
  <div class="view regular">
    <!-- Monitoring View -->
    <template v-if="pageExists">
      <AppHeader :title="utils.getPageTitle(currentCategory)"/>

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

<script setup>
  import { computed } from "vue"
  import { icons } from "../assets/icons/icons.js"
  import { monitoringViews } from "../locales/projectConfig.js"

  import { MONITORING_PAGES } from "../constants/sysPages.js"

  import { useRoute } from "vue-router"
  import { useI18n } from "vue-i18n"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/layout/AppFooter.vue"

  // COMPOSABLES
  const { t, te } = useI18n()
  const route = useRoute()
  const utils = useUtils()

  // COMPUTED PROPERTIES
  // Retrieve page data
  const currentCategory = computed(() => route.params.category)

  // current template from "projectConfig"
  const currentTemplate = computed(() => {
    const id = currentCategory.value

    return monitoringViews[id] || null
  })

  // Verifies if monitoring page exists
  const pageExists = computed(() => {
    const rawId = currentCategory.value

    if(!rawId) return null

    return MONITORING_PAGES.includes(rawId)
  })

  // FUNCTIONS
  // Returns button label
  const getItemTitle = (id) => {
    const key = `views.monitoring.${currentCategory.value}.items.${id}.title`

    return te(key) ? t(key) : ""
  }

  const getPageSubtitle = () => {
    const key = `views.monitoring.${currentCategory.value}.subtitle`

    return te(key) ? t(key) : ""
  }
</script>