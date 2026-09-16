<template>
  <div class="view">
    <template
        v-if="$te(`utils.${currentItem}.title`)"
    >
      <AppHeader
          :title="$t(`utils.${currentItem}.title`)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="handleReturn"
      />

      <main>
        <section></section>
      </main>

      <AppFooter :page="currentItem" />
    </template>

    <template v-else>
      <AppFallback/>
    </template>
  </div>
</template>

<style scoped>

</style>

<script setup>
  import { computed } from "vue"
  import { useRoute } from "vue-router"

  import { icons } from "../assets/icons/icons.js"
  import { useNavigation } from "../composables/useNavigation.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFallback from "./AppFallback.vue"
  import AppFooter from "../components/common/AppFooter.vue"

  const route = useRoute()

  // retrieve page data
  const currentItem = computed(() => {
    return route.params.itemId || null
  })

  // Composables
  const { handleReturn } = useNavigation()
</script>