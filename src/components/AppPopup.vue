<template>
  <div class="popup fixed flex flex-column gap-1" role="dialog" aria-modal="true">

    <!-- Popup Header -->
    <header
        v-if="$te(`popupTemplates.${props.template.id}.header.title`) || $slots.header"
        class="popup-header"
    >
      <slot name="header">
        <h2> {{ $t(`popupTemplates.${props.template.id}.header.title`) }} </h2>
      </slot>
    </header>

    <!-- Popup Main -->
    <div v-if="$slots.main || template.main" class="popup-main flex flex-column gap-1">

      <!-- 1. Form Main -->
      <template v-if="template.main.type === 'form'">
        <form class="main-form flex flex-column gap-1" @submit.prevent="handleSubmit">
          <div class="form-inputs flex flex-column gap-5">
            <component
                v-for="input in template.main.inputs"
                :key="input.id || input.name"
                :is="getImputComponent(input.tag)"
                v-bind="getInputProps(input)"
            >
            </component>
          </div>

          <!-- Form Buttons -->
          <div class="popup-btns flex flex-column gap-05">
            <ActionButton
                  v-for="btn in template.main.buttons" :key="btn.id"
                  v-bind="getBtnProps(btn)"
                  type="submit"
                  :aria-disabled="isSubmitting"
              />
          </div>
        </form>
      </template>

      <!-- 2. Text Main -->
      <template v-else>
        <div class="main-text">
          <p v-for="text in template.main" :key="text">
            {{ text }}.
          </p>
        </div>
      </template>
    </div>

    <!-- Popup Form Footer -->
    <footer v-if="$slots.footer || template.footer">
      <slot name="footer"></slot>
    </footer>

  </div>
</template>

<style scoped>
  .popup{
    z-index: 10;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 400px;
    max-width: 90dvw;

    padding: var(--spacing-md);
    border-radius: var(--radius-xl);
    background: var(--color-bg-primary);
    box-shadow: 0 0 2px 4px var(--color-shadow-subtle);
  }
</style>

<script setup>
  import SelectInput from "./common/SelectInput.vue"
  import Input from "./common/Input.vue"
  import Textarea from "./common/TextArea.vue"
  import ActionButton from "./common/ActionButton.vue"

  import { useI18n } from "vue-i18n"
  import { useForm } from "../composables/useForm.js"

  const { extractFormData, isSubmitting } = useForm()
  const { t, te } = useI18n()

  const props = defineProps({
    template: {
      type: Object
    },
    inputValue: {
      type: Object
    }
  })

  const emit = defineEmits(['submitForm'])

  /* Delegate database update to the views */
  const handleSubmit = (event) => {
    const data = extractFormData(event)
    emit('submitForm', data)
  }

  const getImputComponent = (inputTag) => {
    switch (inputTag) {
      case "input":
        return Input
      case "textarea":
        return Textarea
      case "select":
        return SelectInput
    }
  }

  const getInputProps = (input) => {
    const labelKey = `popupTemplates.${props.template.id}.main.inputs.${input.id}.label`

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
          options: input.options,
          modelValue: currentValue
        }
      case "textarea":
        return {
          label: te(labelKey) ? t(labelKey) : "",
          for: input.for,
          name: input.name,
          modelValue: currentValue
        }
    }
  }

  const getBtnProps = (btn) => {
    const key = `popupTemplates.${props.template.id}.footer.buttons.${btn.id}.label`

    return {
      title: te(key) ? t(key) : "",
      padding: "md",
      alignCenter: true,
      tag: btn.tag ?? "button"
    }
  }
</script>