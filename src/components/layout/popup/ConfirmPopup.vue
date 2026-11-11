<template>
  <AppPopup class="confirm-popup" :isOpen="isOpen" :popupRef="popupRef">
    <!-- Confirm Popup -->

    <!-- Header -->
    <template #header>
      <h2> {{ title }} </h2>
    </template>

    <!-- Main Message -->
    <template v-if="message" #main>
      <div class="confirm-message">
        <p> {{ message }} </p>
      </div>
    </template>

    <!-- Buttons -->
    <template #footer>
      <div class="popup-btns gap-1">
        <ActionButton
          :title="cancelLabelText"
          padding="md"
          tag="button"
          type="button"
          variant="destructive"
          :alignCenter="true"
          @click="handleCancel"
        />

        <ActionButton
          :title="confirmLabelText"
          padding="md"
          tag="button"
          :alignCenter="true"
          @click="handleConfirm($event)"
        />
      </div>
    </template>
  </AppPopup>
</template>

<style scoped>
  .popup-btns {
    display: grid;
    grid-template-columns: auto 65%;
  }

  .confirm-popup h2 {
    font-size: var(--font-heading-2);
    font-weight: var(--bold-weight);
  }
</style>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { computed } from "vue"
  import type { Ref } from "vue"

  import AppPopup from "./AppPopup.vue"
  import ActionButton from "../../buttons/ActionButton.vue"
  import type { DOMReference } from "../../../types/formPopup"

  // TYPES & INTERFACES
  interface Props {
    isOpen: boolean
    title?: string
    message?: string | null
    confirmLabel?: string
    cancelLabel?: string
    popupRef: Ref<DOMReference>
  }

  // COMPOSABLES
  const { t } = useI18n()

  // PROPS DEFAULT VALUES
  const props = withDefaults(defineProps<Props>(), {
    title: "",
    message: null,
    confirmLabel: "",
    cancelLabel: ""
  })

  // EMITS
  const emit = defineEmits<{
    confirm: [event: MouseEvent]
    cancel: []
  }>()

  // FUNCTIONS
  const handleCancel = (): void => {
    emit("cancel")
  }

  const handleConfirm = (event: MouseEvent): void => {
    emit("confirm", event)
  }

  const confirmLabelText = computed(() => {
    return props.confirmLabel === ""
        ? t("utils.confirm") ?? ""
        : props.confirmLabel
  })

  const cancelLabelText = computed(() => {
    return props.cancelLabel === ""
        ? t("utils.cancel") ?? ""
        : props.cancelLabel
  })
</script>