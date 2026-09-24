<template>
  <div class="view">
    <SnackBar
        v-if="warning.message !== ''"
        :message="warning.message"
        :type="warning.type || undefined"
    />

    <AppHeader
        title="Registrar Administração"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main>
      <section class="flex flex-column gap-1">
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
  import { useWarning } from "../composables/useWarning.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import Input from "../components/common/Input.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import SnackBar from "../components/common/SnackBar.vue"

  // Composables
  const { handleReturn } = useNavigation()
  const { warning, getWarning } = useWarning()
</script>