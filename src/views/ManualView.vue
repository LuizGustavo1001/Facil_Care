<template>
  <div class="view">
    <AppHeader
        :title="$t(`views.userManual.headerTitle`)"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />
  </div>
</template>

<style scoped>

</style>

<script setup>
  import {icons} from "../assets/icons/icons.js"
  import AppHeader from "../components/common/AppHeader.vue"
  import {useNavigation} from "../composables/useNavigation.js"

  // Composables
  const { handleReturn } = useNavigation()
</script>