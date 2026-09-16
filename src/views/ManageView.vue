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

      <footer class="flex flex-column gap-05">
        <div>
          <template v-for="btn in currentItem.footer.buttons" :key="btn.id">
            <ActionButton
                tag="router"
                :to="btn.link"
                :leftIcon="btn.leftIcon"
                padding="md"
                :rightIcon="btn.rightIcon || icons['chevron-right']"
                :title="$t(`views.${itemId}.footer.buttons.${btn.id}.title`)"
            />
          </template>
        </div>

        <p class="brand text-muted-lighter">Facil Care - 2026</p>
      </footer>
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
