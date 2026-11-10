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
          <h2 class="category-title text-uppercase"> {{ getCategoryTitle(category.id) }} </h2>

          <div class="buttons-wrapper">
            <template
                v-for="button in category.buttons"
                :key="button.id"
            >
              <!-- Category Router Item -->
              <ActionButtonColorful
                tag="router"
                :to="button.href"
                :title="getButtonTitle(button.id)"
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

<script setup lang="ts">
  import { PAGES } from "../constants/sysPages"
  import { icons } from "../assets/icons/icons.js"
  import { mainNavigationBar, servicesView } from "../locales/projectConfig"

  import { useUtils } from "../composables/useUtils"

  import NavigationBar from "../components/layout/NavigationBar.vue"
  import AppHeader from "../components/layout/AppHeader.vue"
  import ActionButtonColorful from "../components/buttons/ActionButtonColorful.vue"

  // COMPOSABLES
  const utils = useUtils()

  // FUNCTIONS
  const getButtonTitle = (buttonId: string): string => {
    const key = `pageTitle.${buttonId}`
    return utils.getTranslate(key)
  }

  const getCategoryTitle = (categoryId: string): string => {
    const key = `views.${PAGES.SERVICES}.${categoryId}.title`
    return utils.getTranslate(key)
  }
</script>