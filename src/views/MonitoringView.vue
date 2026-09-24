<template>
  <div class="view">
    <template v-if="pageExists">
      <AppHeader
          :title="getPageTitle(itemType)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="handleReturn"
      />

      <main>
        <section class="flex flex-column gap-1">
          <p class="text-muted">{{ t(`views.${itemType}.subtitle`) }}:</p>

          <ul class="flex flex-column gap-1">
            <li
                v-for="item in currentItem.items"
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

      <AppFooter :page="String(itemType)" />
    </template>

    <template v-else>
      <AppFallback />
    </template>
  </div>
</template>

<style scoped></style>

<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"
  import { useI18n } from "vue-i18n"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"
  import { icons } from "../assets/icons/icons.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/common/AppFooter.vue"

  import * as projectConfig from "../locales/projectConfig.js"

  // Composables
  const { handleReturn } = useNavigation()
  const { getPageTitle, MONITORING_PAGES } = useUtils()
  const route = useRoute()
  const { t } = useI18n()

  // Functions
  // Retrieve page data
  const itemType = computed(() => route.params.type)

  const currentItem = computed(() => {
    const id = itemType.value + 'View'
    return projectConfig[id] || null
  })

  // Verify if monitoring page exists
  const pageExists = computed(() => {
    const rawId = itemType.value

    if(!rawId) return null

    return MONITORING_PAGES.includes(rawId)
  })

  // Returns button label
  const getItemTitle = (id) => {
    return t(`views.${itemType.value}.items.${id}.title`)
  }
</script>