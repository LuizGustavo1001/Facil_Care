<template>
  <div class="view regular">
    <!-- System Preferences View -->
    <AppHeader
        :title="utils.getPageTitle(PAGES['PREFERENCES'])"
    />

    <main class="main regular gap-2">
      <!-- Categories List -->
      <section
          v-for="category in preferencesView.categories"
          :key="category.id"
          class="main-section regular gap-1"
      >
        <!-- Category -->
        <div class="section-title-container">
          <h2 class="section-title text-muted">{{ getCategoryTitle(category) }}</h2>
        </div>

        <ul class="flex flex-column gap-1">
          <!-- Category Item -->
          <li v-for="item in category.items" :key="item.id" >
            <SelectInput
                :model-value="getCurrentEventValue(item)"
                v-bind="getInputProps(category, item)"
                @change="handleSelect(item.event, $event)"
            >
              <option
                  v-for="option in item.options" :key="option.id"
                  :value="option.id"
              >
                {{ utils.getOptionTranslate(item.id, option.id) }}
              </option>
            </SelectInput>
          </li>
        </ul>
      </section>
    </main>

    <AppFooter page="preferences" />
  </div>
</template>

<style scoped></style>

<script setup>
  import { preferencesView } from "../locales/projectConfig.js"
  import { PAGES } from "../constants/sysPages.js"

  import { useLanguage } from "../composables/useLanguage.js"
  import { useUnitSystem } from "../composables/useUnitSystem.js"
  import { useTheme } from "../composables/useTheme.js"
  import { useI18n } from "vue-i18n"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import SelectInput from "../components/inputs/SelectInput.vue"

  // COMPOSABLES
  const { t, te, locale } = useI18n()
  const utils = useUtils()
  const language = useLanguage()
  const theme = useTheme()
  const unit = useUnitSystem()

  // FUNCTIONS
  const getCurrentEventValue = (item) => {
    if(item.event === "toggle-theme") {
      return theme.currentPreference.value
    }
    if(item.event === "toggle-language") {
      return locale.value
    }
    if(item.event === "toggle-unit") {
      return unit.currentUnit.value
    }

    return item.for
  }

  const handleSelect = (eventType, event) => {
    const selectedValue = event.target
        ? event.target.value
        : event

    switch(eventType) {
      case "toggle-theme":
        theme.initToggleTheme(selectedValue)
        break
      case "toggle-language":
        language.initLanguage(selectedValue)
        break
      case "toggle-unit":
        unit.initUnitSystem(selectedValue)
        break
    }
  }

  const getInputProps = (category, item) => {
    const key = `views.preferences.categories.${category.id}.items.${item.id}.title`

    return {
      label: te(key) ? t(key) : "",
      name: item.name
    }
  }

  const getCategoryTitle = (category) => {
    const key = `views.preferences.categories.${category.id}.title`
    return te(key)
        ? t(key)
        : ""
  }
</script>