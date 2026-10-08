<template>
  <div class="view regular">
    <AppHeader
        :title="utils.getPageTitle(PAGES['TERMS'])"
        :leftBtnIcon="icons['chevron-left']"
        :hasNotifications="false"
        @return-page="navigation.handleReturn"
    />

    <main class="main regular gap-1">
      <section class="main-section regular gap-2">
        <div
            v-for="sec in termsView.sections"
            :key="sec.id"
            class="item flex flex-column gap-1"
        >
          <div class="title flex align-center gap-05">
            <Icon v-if="sec.icon" :icon="sec.icon" size="25px" />
            <h1>{{ t(`views.${PAGES.TERMS}.sections.${sec.id}.title`) }}</h1>
          </div>

          <ul class="content flex flex-column gap-03 overflow-hidden">
            <li v-for="(item, index) in tm(`views.${PAGES.TERMS}.sections.${sec.id}.contents`)" :key="index">
              <h2>{{ item.title }}</h2>

              <div class="flex flex-column gap-03">
                <p
                  v-for="(subtitle, index) in item.regularSubtitles"
                  :key="index"
                  class="description text-muted"
                >
                  {{ subtitle }}.
                </p>
              </div>

              <div class="flex flex-column gap-03">
                <p
                  v-for="(subtitle, index) in item.destructiveSubtitles"
                  :key="index"
                  class="description"
                >
                  {{ subtitle }}.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>

    <AppFooter page="terms" />
  </div>
</template>

<style scoped>
  .item h1{
    font-size: var(--text-heading-xl);
    font-weight: var(--bold-weight);
  }

  .item h2{
    font-size: var(--text-heading-lg);
    font-weight: var(--bold-weight);
  }

  .item .description{
    font-size: var(--text-body-lg);
  }

  .content{
    border-radius: var(--radius-md);
  }

  .content li{
    background: var(--color-bg-subtle);
    padding: var(--spacing-md);
  }

</style>

<script setup>
  import { icons } from "../assets/icons/icons.js"
  import { termsView } from "../locales/projectConfig.js"
  import { PAGES } from "../composables/usePages.js"

  import { useI18n } from "vue-i18n"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import Icon from "../components/icons/Icon.vue"

  // COMPOSABLES
  const navigation = useNavigation()
  const utils = useUtils()
  const { t, tm } = useI18n()
</script>