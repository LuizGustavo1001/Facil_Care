<template>
  <AppHeader
      :title="$t('views.vitalSigns.headerTitle')"
      :leftBtnIcon="icons['chevron-left']"
      @return-page="handleReturn"
  />

  <main>
    <section class="flex flex-column gap-1">
      <p class="text-muted">{{ t(`views.vitalSigns.subtitle`) }}:</p>

      <ul class="flex flex-column gap-1">
        <li
          v-for="item in vitalSignsView.items"
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
    <div>
      <template v-for="btn in vitalSignsView.footer.buttons" :key="btn.id">
        <ActionButton
            tag="router"
            :to="btn.link"
            :leftIcon="btn.leftIcon"
            padding="md"
            :rightIcon="btn.rightIcon || icons['chevron-right']"
            :title="$t(`views.vitalSigns.footer.buttons.${btn.id}.title`)"
        />
      </template>
    </div>

    <p class="brand text-muted-lighter">Facil Care - 2026</p>
  </footer>
</template>

<style scoped>

</style>

<script setup>
  import AppHeader from "../components/common/AppHeader.vue"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"

  import { icons } from "../assets/icons/icons.js"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useI18n } from "vue-i18n"
  import { vitalSignsView } from "../locales/projectConfig.js"
  import ActionButton from "../components/common/ActionButton.vue";

  const { t } = useI18n()

  // Composables
  const { handleReturn } = useNavigation()

  // Functions
  const getItemTitle = (itemId) => {
    return t(`views.vitalSigns.items.${itemId}.title`)
  }
</script>