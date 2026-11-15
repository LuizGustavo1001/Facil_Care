<template>
  <footer class="footer flex flex-column gap-05 fixed width-full">
    <!-- App Footer -->
    <div v-if="currentPage">
      <template v-for="btn in currentPage.buttons" :key="btn.id">
        <ActionButton
            tag="router"
            :to="btn.link"
            :leftIcon="btn.leftIcon"
            :padding="PADDING_SIZE.MEDIUM"
            :rightIcon="btn?.rightIcon || icons['chevron-right']"
            :title="utils.getTranslate(`footer.${props.page}.buttons.${btn.id}.title`)"
            style="border-radius: var(--radius-2xl)"
        />
      </template>
    </div>

    <p class="brand text-muted">Facil Care - 2026</p>
  </footer>
</template>

<style scoped>
  .footer {
    bottom: 0;

    padding: var(--spacing-sm);
    background: var(--color-bg-primary);
    box-shadow: 0 0 3px 3px var(--color-shadow-subtle);

    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  }
  .footer .brand {
    text-align: center;
    font-size: var(--font-caption);
    font-weight: var(--bolder-weight);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import { icons } from "../../assets/icons/icons.js"
  import { footers } from "../../locales/projectConfig"

  import { PAGES } from "../../constants/sysPages"
  import { PADDING_SIZE } from "../../constants/paddindSizes"

  import { useUtils } from "../../composables/useUtils"

  import ActionButton from "../buttons/ActionButton.vue"

  // TYPES & INTERFACES
  interface FooterButton {
    id: string
    leftIcon: string
    rightIcon?: string
    link: string
  }

  interface FooterPage {
    id: string
    buttons: FooterButton[]
  }

  interface Props {
    page?: string
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    page: PAGES.HOME
  })

  // COMPOSABLES
  const utils = useUtils()

  // COMPUTED PROPERTIES
  const currentPage = computed<FooterPage | null>(() => {
    const foundPage = (footers as FooterPage[]).find(footer => footer.id === props.page)

    return foundPage || null
  })
</script>