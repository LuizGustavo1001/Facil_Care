<template>
  <AppPopup
      class="form-popup"
      :isOpen="isOpen"
      :popupRef="popupRef"
  >
    <template #header>
      <h2>
        {{ getPopupTitle() }}
      </h2>
    </template>

    <template #main>
      <form
          class="main-form flex flex-column gap-05"
          @submit.prevent="handleSubmit"
      >
        <div class="form-inputs flex flex-column gap-05">
          <component
              v-for="input in template.main.inputs"
              :key="input.id || input.name"
              :is="form.getInputComponent(input.tag)"
              v-bind="form.getInputProps(input, popupConfig, template.id, inputValue, dynamicData)"
          />
        </div>

        <div
            v-if="popupConfig.showSubmit"
            class="popup-bts flex flex-column gap-05"
        >
          <ActionButton
              v-for="btn in getButtons()"
              :key="btn.id"
              v-bind="form.getBtnProps(btn, type)"
              :aria-disabled="form.isSubmitting.value"
          />
        </div>
      </form>
    </template>
  </AppPopup>
</template>

<style scoped>
  .form-popup h2{
    font-size: var(--font-heading-2);
  }
</style>

<script setup>
  import { computed } from "vue"

  import { useForm } from "../../../composables/useForm.js"
  import { useI18n } from "vue-i18n"

  import { FORM_TYPES } from "../../../composables/useForm.js"
  import { popupTypes } from "../../../locales/projectConfig.js"

  import AppPopup from "./AppPopup.vue"
  import ActionButton from "../../buttons/ActionButton.vue"

  // COMPOSABLES
  const { t, te } = useI18n()
  const form = useForm()

  // PROPS
  const props = defineProps({
    template: {
      type: Object,
      required: true
    },
    inputValue: {
      type: Object,
      default: null
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    popupRef: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: FORM_TYPES.EDIT,
      validator: (value) => Object.values(FORM_TYPES).includes(value)
    },
    dynamicData: {
      type: Object,
      default: () => ({})
    }
  })

  // EMITS
  const emit = defineEmits(["submitForm"])

  // FUNCTIONS
  const getPopupTitle = () => {
    const typeKey = `formPopupTypes.${props.type}.title` // type label

    const templateKey = `formTemplates.${props.template.id}.header.title`

    const type = te(typeKey) ? t(typeKey) : ""
    const template = te(templateKey) ? t(templateKey) : ""

    return `${type} ${template}`
  }

  // Returns the form buttons based on the selected template, verifing if there's submit button
  const getButtons = () => {
    if(!popupConfig.value.showSubmit) return []

    return props.template.main.buttons ?? []
  }

  // Returns current popupConfig based on the selected popup type
  const popupConfig = computed(() => popupTypes[props.type])

  // Emits the form submit
  const handleSubmit = (event) => {
    const formElement = event.currentTarget

    if(!formElement.checkValidity()){
      formElement.checkValidity()
      return
    }

    if (popupConfig.value.readOnly) return

    const data = form.extractData(event)
    emit("submitForm", data)
  }
</script>