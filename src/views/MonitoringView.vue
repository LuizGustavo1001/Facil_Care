<template>
  <div class="view">
    <template v-if="currentItem">
      <AppHeader
          :title="$t(`views.${itemType}.headerTitle`)"
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
  import { useI18n } from "vue-i18n"
  import { computed } from "vue"
  import { useRoute } from "vue-router"

  import { useNavigation } from "../composables/useNavigation.js"
  import { icons } from "../assets/icons/icons.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/common/AppFooter.vue"

  import * as projectConfig from "../locales/projectConfig.js"
  import SnackBar from "../components/common/SnackBar.vue";

  const { t } = useI18n()
  const route = useRoute()

  // Composables
  const { handleReturn } = useNavigation()

  // Functions

  // Retrieve page data
  const itemType = computed(() => route.params.type)
  const currentItem = computed(() => {
    const id = itemType.value + 'View'
    return projectConfig[id] || null
  })

  // Return button label
  const getItemTitle = (id) => {
    return t(`views.${itemType.value}.items.${id}.title`)
  }
</script>