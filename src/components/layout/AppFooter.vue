<template>
  <footer class="footer flex flex-column gap-05">
    <div v-if="currentPage">
      <template v-for="btn in currentPage.buttons" :key="btn.id">
        <ActionButton
            tag="router"
            :to="btn.link"
            :leftIcon="btn.leftIcon"
            padding="md"
            :rightIcon="btn.rightIcon || icons['chevron-right']"
            :title="t(`footer.${props.page}.buttons.${btn.id}.title`)"
            style="border-radius: var(--radius-2xl)"
        />
      </template>
    </div>

    <p class="brand text-muted-lighter">Facil Care - 2026</p>
  </footer>
</template>

<style scoped>
  .footer{
    position: fixed;
    bottom: 0;
    width: 100%;

    padding: var(--spacing-sm);
    background: var(--color-bg-primary);
    box-shadow: 0 0 3px 3px var(--color-shadow-subtle);

    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  }
  .footer .brand{
    text-align: center;
    font-size: var(--text-body-sm);
    font-weight: var(--bolder-weight);
  }
</style>

<script setup>
  import { computed } from "vue"
  import { icons } from "../../assets/icons/icons.js"
  import { footers } from "../../locales/projectConfig.js"

  import { useI18n } from "vue-i18n"

  import ActionButton from "../buttons/ActionButton.vue"

  // COMPOSABLES
  const { t } = useI18n()

  // PROPS
  const props = defineProps({
    page: {
      type: String,
      default: "home"
    }
  })

  // COMPUTED PROPERTIES
  const currentPage = computed(() => {
    const pageExists = footers.find(footer => footer.id === props.page)

    return pageExists ? footers.find(footer => footer.id === props.page) : null
  })
</script>