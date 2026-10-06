<template>
  <div class="view regular">
    <Snackbar
        :isActive="isWarningActive"
        :message="warning.message"
        :type="warning.type || undefined"
        @click="clearWarning"
    />

    <AppHeader
        title="Registrar Administração"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main class="main regular gap-1">
      <section class="main-section regular gap-15">
        <p class="text-muted">Preencha os campos abaixo para registrar a administração de um medicamento:</p>

        <ul class="form flex flex-column gap-1">
          <Input
              label="Medicamento Administrado *"
              placeholder="Medicamento Administrado *"
          />
        </ul>
      </section>
    </main>

    <AppFooter page="register" />
  </div>
</template>

<style scoped></style>

<script setup>
  import { icons } from "../assets/icons/icons.js"

  import { useNavigation } from "../composables/useNavigation.js"
  import { useSnackbar } from "../composables/useSnackbar.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import Input from "../components/forms/Input.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"

  // COMPOSABLES
  const { handleReturn } = useNavigation()
  const { warning, getWarning, isWarningActive, clearWarning } = useSnackbar()
</script>