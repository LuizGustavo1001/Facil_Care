<template>
  <AppHeader
      :title="$t('views.monitoring.headerTitle')"
      :leftBtnIcon="icons['chevron-left']"
      @return-page="handleReturn"
  />

  <main>
    <section class="flex flex-column gap-1">
      <p class="text-muted">{{ t(`views.monitoring.subtitle`) }}:</p>

      <ul class="flex flex-column gap-1">
        <li
            v-for="item in monitoringView.items"
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

  <footer class="flex flex-column gap-05">
    <p class="brand text-muted-lighter">Facil Care - 2026</p>
  </footer>
</template>

<style scoped>

</style>

<script setup>
import AppHeader from "../components/common/AppHeader.vue"
import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"

import { useNavigation } from "../composables/useNavigation.js"
import { useI18n } from "vue-i18n"
import { icons } from "../assets/icons/icons.js"
import { monitoringView } from "../locales/projectConfig.js"

const { t } = useI18n()

// Composables
const { handleReturn } = useNavigation()

// Functions
const getItemTitle = (itemId) => {
  return t(`views.monitoring.items.${itemId}.title`)
}
</script>