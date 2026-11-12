<template>
  <div class="view regular">
    <!-- About the System View -->
    <AppHeader :title="utils.getPageTitle(PAGES['ABOUT'])" />

    <main class="main regular justify-center flex-grow-1">
      <section class="hero buttons-wrapper">
        <!-- App Info -->
        <div class="card flex flex-column align-center justify-center gap-05">
          <Icon :icon="icons['logo-colorful-bg']" size="125px" />

          <div class="text-center brand-text flex flex-column gap-05">
            <h1>FacilCare</h1>
            <Badge :text="`v${aboutView.version}`" />
          </div>
        </div>

        <!-- Developers Credits -->
        <div class="card credits flex flex-column gap-05 text-center">
          <p>{{ utils.getTranslate(`utils.developedBy`) }} <strong>Luiz Gustavo de Almeida Lopes</strong></p>
        </div>

        <!-- Developers Social Media -->
        <div class="card">
          <ul class="social-media-list flex flex-column gap-05">
            <li
                v-for="item in aboutView.social"
                :key="item.id"
            >
              <ActionButton
                  :tag="BUTTON_TAGS.LINK"
                  :to="item.href"
                  target="_blank"
                  :variant="ACTION_BUTTON_VARIANTS.PRIMARY"
                  :title="item.name ?? ''"
                  :leftIcon="item.iconFill"
                  :rightIcon="icons['external-link']"
                  rightIconSize="20px"
                  style="border-radius: var(--radius-sm)"
              />
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
  .hero {
    width: 90dvw;
    max-width: 500px;
    margin: 0 auto;
  }

  .card {
    background: var(--color-bg-subtle);
    padding: var(--spacing-md);
  }

  .brand-text h1{
    font-size: var(--font-heading-1);
  }

  .credits p {
    font-size: var(--font-body-sm);
  }
</style>

<script setup lang="ts">
  import { PAGES } from "../constants/sysPages"
  import { icons } from "../assets/icons/icons.js"
  import { aboutView } from "../locales/projectConfig"

  import { useUtils } from "../composables/useUtils"

  import AppHeader from "../components/layout/AppHeader.vue"
  import Icon from "../components/icons/Icon.vue"
  import Badge from "../components/common/Badge.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import { ACTION_BUTTON_VARIANTS, BUTTON_TAGS } from "../constants/components/buttons"

  // COMPOSABLES
  const utils = useUtils()
</script>