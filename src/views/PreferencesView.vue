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
          <h2 class="section-title text-muted">{{ getCategoryTitle(category.id) }}</h2>
        </div>

        <ul class="flex flex-column gap-1">
          <!-- Category Item -->
          <li v-for="item in category.items" :key="item.id" >
            <SelectInput
                :modelValue="getCurrentEventValue(item)"
                v-bind="getInputProps(category.id, item)"
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

    <AppFooter :page="PAGES.PREFERENCES" />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
  import { LANGUAGE_OPTIONS, preferencesView, THEME_OPTIONS, UNITS_OPTIONS } from "../locales/projectConfig"

  import { useLanguage } from "../composables/useLanguage"
  import { useUnitSystem } from "../composables/useUnitSystem"
  import { useTheme } from "../composables/useTheme"
  import { useUtils } from "../composables/useUtils"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import SelectInput from "../components/inputs/SelectInput.vue"

  import type { SysLanguage } from "../types/sysLanguages"
  import type { SysTheme } from "../types/sysThemes"
  import type { UnitSystem } from "../types/sysUnits"
  import { PAGES } from "../constants/sysPages"

  // TYPES & INTERFACES
  type Preference =
      | typeof THEME_OPTIONS[number]["id"]
      | typeof LANGUAGE_OPTIONS[number]["id"]
      | typeof UNITS_OPTIONS[number]["id"]

  interface PreferenceOption {
    id: Preference
  }

  interface PreferenceItem {
    id: string
    name: string
    for: string
    event: string
    options: PreferenceOption[]
  }

  // COMPOSABLES
  const utils = useUtils()
  const language = useLanguage()
  const theme = useTheme()
  const unit = useUnitSystem()

  // FUNCTIONS
  const getCurrentEventValue = (item: PreferenceItem): string => {
    switch(item.event) {
      case "toggle-theme":
        return theme.currentPreference.value

      case "toggle-language":
        return language.currentLanguage.value

      case "toggle-unit":
        return unit.currentUnit.value

      default:
        return item.for
    }
  }

  const handleSelect = (eventType: string, event: Event | string): void => {
    const selectedValue = typeof event === "string"
        ? event
        : event.target instanceof HTMLSelectElement
            ? event.target.value
            : null

    if (selectedValue === null) return

    switch(eventType) {
      case "toggle-theme":
        theme.initToggleTheme(selectedValue as SysTheme)
        break

      case "toggle-language":
        language.initLanguage(selectedValue as SysLanguage)
        break

      case "toggle-unit":
        unit.initUnitSystem(selectedValue as UnitSystem)
        break
    }
  }

  const getInputProps = (categoryId: string, item: PreferenceItem): Record<string, string> => {
    const key = `views.preferences.categories.${categoryId}.items.${item.id}.title`

    return {
      label: utils.getTranslate(key),
      name: item.name
    }
  }

  const getCategoryTitle = (categoryId: string): string => {
    const key = `views.preferences.categories.${categoryId}.title`

    return utils.getTranslate(key)
  }
</script>