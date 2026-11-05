<template>
  <div class="view regular">
    <!-- System Services View -->
    <AppHeader
        :title="utils.getPageTitle(PAGES['SERVICES'])"
        :leftIcon="icons['service-fill']"
        :hasNotifications="true"
        type="noButton"
    />

    <main class="main regular gap-1">
      <!-- Categories List -->
      <section class="main-section regular gap-1">
        <div
          v-for="category in servicesView"
          :key="category.id"
          class="flex flex-column gap-05"
        >
          <!-- Category -->
          <h2 class="category-title text-uppercase"> {{ getCategoryTitle(category) }} </h2>

          <div class="buttons-wrapper">
            <template
                v-for="button in category.buttons"
                :key="button.id"
            >
              <!-- Category Router Item -->
              <ActionButtonColorful
                tag="router"
                :to="button.href"
                :title="getButtonTitle(button)"
                :leftIcon="button.iconFill"
                leftIconSize="25px"
                :rightIcon="icons['chevron-right']"
                :color="button?.color ?? null"
              />
            </template>
          </div>
        </div>
      </section>
    </main>

    <NavigationBar
        :items="mainNavigationBar"
        :activeItem="mainNavigationBar[PAGES.SERVICES].id"
    />
  </div>
</template>

<style scoped>
  .category-title {
    font-size: var(--font-body-md);
    color: var(--color-text-primary-muted);
  }
</style>

<script setup>
  import { PAGES } from "../constants/sysPages.js"
  import { icons } from "../assets/icons/icons.js"
  import { mainNavigationBar, servicesView } from "../locales/projectConfig.js"

  import { useUtils } from "../composables/useUtils.js"
  import { useI18n } from "vue-i18n"

  import NavigationBar from "../components/layout/NavigationBar.vue"
  import AppHeader from "../components/layout/AppHeader.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"

  // COMPOSABLES
  const { t, te } = useI18n()
  const utils = useUtils()

  // FUNCTIONS
  const getButtonTitle = (button) => {
    const key = `pageTitle.${button?.id}`

    return te(key) ? t(key) : ""
  }

  const getCategoryTitle = (category) => {
    const key = `views.${PAGES.SERVICES}.${category.id}.title`

    return te(key) ? t(key) : ""
  }
</script>