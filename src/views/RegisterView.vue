<template>
  <div class="view">
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

    <footer class="flex flex-column gap-05">
      <div>
        <template v-for="btn in homeView.footer.buttons" :key="btn.id">
          <ActionButton
              tag="router"
              :to="btn.link"
              :leftIcon="btn.leftIcon"
              padding="md"
              :rightIcon="btn.rightIcon || icons['chevron-right']"
              :title="$t(`views.home.footer.buttons.${btn.id}.title`)"
          />
        </template>
      </div>

      <p class="brand text-muted-lighter">Facil Care - 2026</p>
    </footer>
  </div>
</template>

<style scoped>

</style>

<script setup>
  import {icons} from "../assets/icons/icons.js"
  import AppHeader from "../components/common/AppHeader.vue"
  import { useNavigation } from "../composables/useNavigation.js"
  import {homeView} from "../locales/projectConfig.js";
  import ActionButton from "../components/common/ActionButton.vue";
  import Input from "../components/common/Input.vue";

  // Composables
  const { handleReturn } = useNavigation()
</script>