<template>
  <div class="view regular">
    <template v-if="pageExists">
      <AppHeader
          :title="utils.getPageTitle(currentCategory)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="navigation.handleReturn"
      />

      <main class="main regular">
        <section class="main-section regular gap-15">
          <p class="text-muted">{{ t(`views.${currentCategory}.subtitle`) }}:</p>

          <ul class="flex flex-column gap-1">
            <li
                v-for="item in currentTemplate.items"
                :key="item.id"
            >
              <ActionButtonAlt
                  tag="router"
                  :to="item.link"
                  :color="item.color"
                  :title="getItemTitle(item.id)"
                  :leftIcon="item.icon"
                  leftIconSize="30px"
                  :rightIcon="icons['chevron-right']"
              />
            </li>
          </ul>
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

  import { MONITORING_PAGES } from "../locales/projectConfig.js"

  import { useRoute } from "vue-router"
  import { useI18n } from "vue-i18n"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import ActionButtonAlt from "../components/buttons/ActionButtonAlt.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/layout/AppFooter.vue"

  import { monitoringViews } from "../locales/projectConfig.js"

  // COMPOSABLES
  const { t } = useI18n()
  const route = useRoute()
  const navigation = useNavigation()
  const utils = useUtils()

  // COMPUTED PROPERTIES
  // Retrieve page data
  const currentCategory = computed(() => route.params.category)

  const currentTemplate = computed(() => {
    const id = currentCategory.value

    return monitoringViews[id] || null
  })

  // Verify if monitoring page exists
  const pageExists = computed(() => {
    const rawId = currentCategory.value

    if(!rawId) return null

    return MONITORING_PAGES.includes(rawId)
  })

  // FUNCTIONS
  // Returns button label
  const getItemTitle = (id) => {
    return t(`views.monitoring.${currentCategory.value}.items.${id}.title`)
  }
</script>