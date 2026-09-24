<template>
  <div class="view">
    <AppHeader
        :title="getPageTitle(PAGES['PREFERENCES'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main>
      <section
          v-for="section in preferencesView.sections"
          :key="section.id"
          class="flex flex-column gap-1"
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
  import { useNavigation } from "../composables/useNavigation.js"
  import { useLanguage } from "../composables/useLanguage.js"
  import { useTheme } from "../composables/useTheme.js"
  import { useI18n } from "vue-i18n"
  import { useUtils } from "../composables/useUtils.js"
  import { preferencesView } from "../locales/projectConfig.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import SelectInput from "../components/common/SelectInput.vue"

  // Composables
  const { handleReturn } = useNavigation()
  const { initLanguage } = useLanguage()
  const { getPageTitle, PAGES } = useUtils()
  const { toggleTheme, currentTheme } = useTheme()
  const { t, te, locale } = useI18n()

  // Functions
  const getCurrentEventValue = (item) => {
    if(item.event === "toggle-theme"){
      return currentTheme.value
    }
    if(item.event === "toggle-language"){
      return locale.value
    }

    return item.for
  }

  const handleSelect = (eventType, event) => {
    const selectedValue = event.target ? event.target.value : event

    switch(eventType){
      case "toggle-theme":
        toggleTheme(selectedValue)
        break
      case "toggle-language":
        initLanguage(selectedValue)
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