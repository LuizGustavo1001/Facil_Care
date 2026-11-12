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
          :padding="PADDING_SIZE.MEDIUM"
          :tag="BUTTON_TAGS.BUTTON"
          type="button"
          variant="destructive"
          :alignCenter="true"
          @click="handleCancel"
        />

        <ActionButton
          :title="confirmLabelText"
          :padding="PADDING_SIZE.MEDIUM"
          :tag="BUTTON_TAGS.BUTTON"
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
  import { computed } from "vue"
  import type { Ref } from "vue"
  import { useUtils } from "../../../composables/useUtils"

  import type { DOMReference } from "../../../types/components/formPopup"

  import { PADDING_SIZE } from "../../../constants/paddindSizes"
  import { BUTTON_TAGS } from "../../../constants/components/buttons"

  import AppPopup from "./AppPopup.vue"
  import ActionButton from "../../buttons/ActionButton.vue"

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
  const utils = useUtils()

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
        ? utils.getTranslate("utils.confirm")
        : props.confirmLabel
  })

  const cancelLabelText = computed(() => {
    return props.cancelLabel === ""
        ? utils.getTranslate("utils.cancel")
        : props.cancelLabel
  })
</script>