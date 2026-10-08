<template>
  <div class="view regular">
    <AppHeader
        :title="utils.getPageTitle(PAGES['PREFERENCES'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="navigation.handleReturn"
    />

    <main class="main regular gap-2">
      <section
          v-for="section in preferencesView.sections"
          :key="section.id"
          class="main-section regular gap-15"
      >
        <h2 class="section-title text-muted">{{ getSectionTitle(section) }}</h2>

        <ul class="flex flex-column gap-1">
          <li v-for="item in section.items" :key="item.id" >
            <SelectInput
                :model-value="getCurrentEventValue(item)"
                v-bind="getInputProps(section, item)"
                @change="handleSelect(item.event, $event)"
            >
              <option
                  v-for="option in item.options" :key="option.id"
                  :value="option.id"
              >
                {{ getOptionLabel(item, option) }}
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
  import { icons } from "../assets/icons/icons.js"
  import { preferencesView } from "../locales/projectConfig.js"
  import { PAGES } from "../composables/usePages.js"

  import { useNavigation } from "../composables/useNavigation.js"
  import { useLanguage } from "../composables/useLanguage.js"
  import { useTheme } from "../composables/useTheme.js"
  import { useI18n } from "vue-i18n"
  import { useUtils } from "../composables/useUtils.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import SelectInput from "../components/forms/SelectInput.vue"

  // COMPOSABLES
  const { t, te, locale } = useI18n()
  const utils = useUtils()
  const navigation = useNavigation()
  const language = useLanguage()
  const theme = useTheme()

  // FUNCTIONS
  const getCurrentEventValue = (item) => {
    if(item.event === "toggle-theme"){
      return theme.currentPreference.value
    }
    if(item.event === "toggle-language"){
      return locale.value
    }

    return item.for
  }

  const handleSelect = (eventType, event) => {
    const selectedValue = event.target
        ? event.target.value
        : event

    switch(eventType){
      case "toggle-theme":
        theme.initToggleTheme(selectedValue)
        break
      case "toggle-language":
        language.initLanguage(selectedValue)
        break
    }
  }

  const getInputProps = (section, item) => {
    return {
      label: t(`views.preferences.sections.${section.id}.items.${item.id}.title`),
      name: item.name
    }
  }

  const getSectionTitle = (section) => {
    return te(`views.preferences.sections.${section.id}.title`) ? t(`views.preferences.sections.${section.id}.title`) : ""
  }

  const getOptionLabel = (item, option) => {
    return te(`utils.${item.id}.${option.id}.label`) ? t(`utils.${item.id}.${option.id}.label`) : ""
  }
</script>