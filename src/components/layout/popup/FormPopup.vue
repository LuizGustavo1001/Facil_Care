<template>
  <AppPopup class="form-popup" :isOpen="isOpen" :popupRef="popupRef">
    <template #header>
      <h2>
        {{ t(`formPopupTemplates.${template.id}.header.title`) }}
      </h2>
    </template>

    <template #main>
      <form
          class="main-form flex flex-column gap-1"
          @submit.prevent="handleSubmit"
      >
        <div class="form-inputs flex flex-column gap-05">
          <component
              v-for="input in template.main.inputs" :key="input.id || input.name"
              :is="getInputComponent(input.tag)"
              v-bind="getInputProps(input)"
          />
        </div>

        <div class="popup-bts flex flex-column gap-05">
          <ActionButton
              v-for="btn in template.main.buttons" :key="btn.id"
              v-bind="getBtnProps(btn)"
              :aria-disabled="form.isSubmitting"
          />
        </div>
      </form>
    </template>
  </AppPopup>
</template>

<style scoped>
  .form-popup h2{
    font-size: var(--text-heading-lg);
  }
</style>

<script setup>
  import { useForm } from "../../../composables/useForm.js"
  import { useI18n } from "vue-i18n"

  import AppPopup from "./AppPopup.vue"
  import ActionButton from "../../buttons/ActionButton.vue"
  import Input from "../../forms/Input.vue"
  import TextArea from "../../forms/TextArea.vue"
  import SelectInput from "../../forms/SelectInput.vue"

  // COMPOSABLES
  const { t, tm, te } = useI18n()
  const form = useForm()

  //PROPS
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
    }
  })

  // EMITS
  const emit = defineEmits(["submitForm"])

  // FUNCTIONS
  // Submits the form data to the parent
  const handleSubmit = (event) => {
    const data = form.extractData(event)

    emit("submitForm", data)
  }

  // Returns the component associated with an input tag
  const getInputComponent = (tag) => {
    switch (tag) {
      case "input":
        return Input

      case "textarea":
        return TextArea

      case "select":
        return SelectInput

      default:
          return null
    }
  }

  // Returns the props required by an input component
  const getInputProps = (input) => {
    const labelKey = `formPopupTemplates.${props.template.id}.main.inputs.${input.id}.label`

    const currentValue = props.inputValue ? props.inputValue[input.name] : null

    switch(input.tag){
      case "input":
        return {
          label: te(labelKey) ? t(labelKey) : "",
          for: input.for,
          name: input.name,
          inputType: input.inputType,
          autoCapitalize: input.autoCapitalize ?? null,
          autofocus: true,
          step: input.step ?? null,
          min: input.min ?? null,
          max: input.max ?? null,
          modelValue: currentValue
        }

      case "select":
        return {
          label: te(labelKey) ? t(labelKey) : "",
          for: input.for,
          name: input.name,
          options: getSelectOptions(input),
          modelValue: currentValue
        }

      case "textarea":
        return {
          label: te(labelKey) ? t(labelKey) : "",
          for: input.for,
          name: input.name,
          modelValue: currentValue
        }

      default:
        return {}
    }
  }

  // Returns "select input" options based in translate data
  const getSelectOptions = (input) => {
    return tm(`formPopupTemplates.${props.template.id}.main.inputs.${input.id}.options`) ?? null
  }

  // Form button props
  const getBtnProps = (btn) => {
    const key = `formPopupTemplates.${props.template.id}.main.buttons.${btn.id}.label`

    return {
      title: te(key) ? t(key) : "",
      padding: "md",
      alignCenter: true,
      tag: btn.tag ?? "button",
      type: btn.type ?? "submit"
    }
  }
</script>