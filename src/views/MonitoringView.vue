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
          <p class="text-muted">{{ t(`views.${itemId}.subtitle`) }}:</p>

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


      <AppFooter :page="itemId" />
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
      <AppFallback />
    </template>
  </div>
</template>

<style scoped>

</style>

<script setup>
  import { useI18n } from "vue-i18n"
  import { computed } from "vue"
  import { useRoute } from "vue-router"

  import { useNavigation } from "../composables/useNavigation.js"
  import { icons } from "../assets/icons/icons.js"

  import ActionButton from "../components/common/ActionButton.vue"
  import AppHeader from "../components/common/AppHeader.vue"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/common/AppFooter.vue"

  import * as projectConfig from "../locales/projectConfig.js"

  const { t } = useI18n()
  const route = useRoute()

  // Composables
  const { handleReturn } = useNavigation()

  // Functions
  // retrieve page data
  const itemId = computed(() => route.params.itemId)

  const currentItem = computed(() => {
    const id = itemId.value + 'View'
    return projectConfig[id] || null
  })

  // return button label
  const getItemTitle = (id) => {
    return t(`views.${itemId.value}.items.${id}.title`)
  }
</script>