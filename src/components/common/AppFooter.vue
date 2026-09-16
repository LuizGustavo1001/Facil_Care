<template>
  <footer class="flex flex-column gap-05">
    <div v-if="currentPage && currentPage.footer && currentPage.footer.buttons">
      <template v-for="btn in currentPage.footer.buttons" :key="btn.id">
        <ActionButton
            tag="router"
            :to="btn.link"
            :leftIcon="btn.leftIcon"
            padding="md"
            :rightIcon="btn.rightIcon || icons['chevron-right']"
            :title="$t(`views.${pageValue}.footer.buttons.${btn.id}.title`)"
        />
      </template>
    </div>

    <p class="brand text-muted-lighter">Facil Care - 2026</p>
  </footer>
</template>

<style scoped>

</style>

<script setup>
  import { icons } from "../../assets/icons/icons.js"
  import ActionButton from "./ActionButton.vue"
  import { computed } from "vue"
  import * as projectConfig from "../../locales/projectConfig.js"

  const props = defineProps({
    page: {
      type: String,
      default: "home",
    }
  })

  const pageValue = computed(() => props.page)
  const currentPage = computed(() => {
    const id = props.page + 'View'

    return projectConfig[id] || null
  })

  const pageExists = computed(() => {
    !!(currentPage && currentPage.footer && currentPage.footer.buttons)
  })
</script>