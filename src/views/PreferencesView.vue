<template>
  <div class="view">
    <AppHeader
        :title="$t('views.preferences.headerTitle')"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main>
      <section
          v-for="section in preferencesView.sections"
          :key="section.id"
          class="flex flex-column gap-1"
      >
        <h2 class="section-title text-muted">{{ $t(`views.preferences.sections.${section.id}.title`) }}</h2>

        <ul class="flex flex-column gap-1">
          <li
              v-for="item in section.items"
              :key="item.id"
          >
            <SelectInput
                :label="$t(`views.preferences.sections.${section.id}.items.${item.id}.title`)"
                :name="item.name"
                :for="item.for"
            >
              <option
                  v-for="option in item.options"
                  :key="option.id"
                  :value="option.id"
              >
                {{ $t(`utils.${item.id}.${option.id}.label`) }}
              </option>
            </SelectInput>
          </li>
        </ul>
      </section>
    </main>

    <AppFooter page="preferences" />
  </div>

</template>

<style scoped>

</style>

<script setup>
  import { icons } from "../assets/icons/icons.js";
  import { useNavigation } from "../composables/useNavigation.js"
  import { preferencesView } from "../locales/projectConfig.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import SelectInput from "../components/common/SelectInput.vue"

  // Composables
  const { handleReturn } = useNavigation()
</script>