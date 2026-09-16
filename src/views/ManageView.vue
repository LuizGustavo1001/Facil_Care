<template>
  <div class="view">
    <template v-if="currentItem">
      <AppHeader
          :title="$t(`views.${itemId}.headerTitle`)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="handleReturn"
      />

      <main>
        <section class="flex flex-column gap-1">
          <h2 class="section-title text-muted">{{ $t(`views.${itemId}.sections.registers.title`) }}</h2>

          <ul class="flex flex-column gap-1">
            <li>
              <ActionButton
                  tag="button"
                  :rightIcon="icons['pencil-line']"
                  title="Metformina 850mg"
                  variant="subtle"
                  padding="lg"
                  class="width-full"
              />
            </li>
          </ul>
        </section>
      </main>

      <AppFooter :page="String(itemId)" />
    </template>

    <template v-else>
      <AppFallback/>
    </template>
  </div>
</template>

<style scoped>

</style>

<script setup>
import { useRoute } from "vue-router"
import { computed } from "vue"

import { icons } from "../assets/icons/icons.js"
import { useNavigation } from "../composables/useNavigation.js"

import * as projectConfig from "../locales/projectConfig.js"

import AppHeader from "../components/common/AppHeader.vue"
import ActionButton from "../components/common/ActionButton.vue"
import AppFallback from "./AppFallback.vue"
import AppFooter from "../components/common/AppFooter.vue";

const route = useRoute()

// retrieve page data
const itemId = computed(() => route.params.itemId)
const currentItem = computed(() => {
  const id = itemId.value + 'View'

  return projectConfig[id] || null
})

// Composables
const { handleReturn } = useNavigation()
</script>
