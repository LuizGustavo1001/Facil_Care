<template>
  <AppPopup
      class="form-popup"
      :isOpen="isOpen"
      :popupRef="popupRef"
  >
    <!-- Form Popup -->

    <!-- Header -->
    <template #header>
      <h2>
        {{ getPopupTitle() }}
      </h2>
    </template>

    <!-- Form -->
    <template #main>
      <form
          class="main-form flex flex-column gap-1"
          @submit.prevent="handleSubmit"
      >
        <div class="form-inputs flex flex-column gap-05">
          <component
              v-for="input in template.main?.inputs"
              :key="input.id || input.name"
              :is="form.getInputComponent(input.tag)"
              v-bind="form.getInputProps(input, popupConfig, template.id, inputValue, dynamicData)"
          />
        </div>

        <!-- Submit Form Button -->
        <div
            v-if="popupConfig.showSubmit"
            class="popup-bts flex flex-column gap-05"
        >
          <ActionButton
              v-for="btn in getButtons()"
              :key="btn.id"
              v-bind="form.getBtnProps(btn, type)"
              :aria-disabled="form.isSubmitting.value"
              type="submit"
              style="min-width: 150px; align-self: flex-end;"
          />
        </div>
      </form>
    </template>
  </AppPopup>
</template>

<style scoped>
  .form-popup h2 {
    font-size: var(--font-heading-2);
    font-weight: var(--bold-weight);
  }
</style>

<script setup lang="ts">
  import { computed } from "vue"
  import type { Ref } from "vue"

  import { popupTypes } from "../../../locales/projectConfig"

  import { useForm } from "../../../composables/useForm"
  import { useUtils } from "../../../composables/useUtils"

  import AppPopup from "./AppPopup.vue"
  import ActionButton from "../../buttons/ActionButton.vue"

  import type { FormRegularTemplate } from "../../../interfaces/Form"
  import type { FormButton } from "../../../interfaces/Form"

  import { FORM_TYPES } from "../../../constants/components/form"

  import type { DOMReference } from "../../../types/components/formPopup"
  import type { FormType } from "../../../types/components/genericForm"

  // TYPES & INTERFACES
  interface Props {
    template: FormRegularTemplate & { main?: { buttons?: FormButton[], inputs?: any[] } }
    inputValue?: Record<string, unknown> | null
    isOpen: boolean
    popupRef: Ref<DOMReference>
    type?: FormType
    dynamicData?: Record<string, unknown>
  }

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    inputValue: null,
    type: FORM_TYPES.EDIT,
    dynamicData: () => ({}),
    popupRef: undefined
  })

  // EMITS
  const emit = defineEmits<{
    submitForm: [data: Record<string, unknown>]
  }>()

  // COMPOSABLES
  const form = useForm()
  const utils = useUtils()

  // COMPUTED PROPERTIES

  // Returns current popupConfig based on the selected popup type
  const popupConfig = computed(() => popupTypes[props.type as keyof typeof popupTypes] || {})

  // FUNCTIONS
  const getPopupTitle = (): string => {
    const typeKey = `formPopupTypes.${props.type}.title`

    const templateKey = `formTemplates.${props.template.id}.header.title`

    const type = utils.getTranslate(typeKey)
    const template = utils.getTranslate(templateKey)

    return `${type} ${template}`
  }

  // Returns the form buttons based on the selected template, verifing if there's submit button
  const getButtons = (): FormButton[] => {
    if(!popupConfig.value.showSubmit) return []

    return props.template.main?.buttons ?? []
  }

  // Emits the form submit
  const handleSubmit = (event: Event): void => {
    const formElement = event.currentTarget as HTMLFormElement

    if(!formElement.checkValidity()) {
      formElement.reportValidity()
      return
    }

    if (popupConfig.value.readOnly) return

    const data = form.extractData(event as SubmitEvent, props.template)
    emit("submitForm", data as Record<string, unknown>)
  }
</script>