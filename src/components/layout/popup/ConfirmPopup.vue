<template>
  <AppPopup class="confirm-popup" :isOpen="isOpen" :popupRef="popupRef">
    <template #header>
      <h2> {{ title }} </h2>
    </template>

    <template v-if="message" #main>
      <div class="confirm-message">
        <p> {{ message }} </p>
      </div>
    </template>

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
  .popup-btns{
    display: grid;
    grid-template-columns: auto 65%;
  }

  .confirm-popup h2{
    font-size: var(--text-heading-lg);
  }
</style>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { computed } from "vue"

  import AppPopup from "./AppPopup.vue"
  import ActionButton from "../../buttons/ActionButton.vue"

  const { t } = useI18n()

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: null
    },
    confirmLabel: {
      type: String,
      default: ""
    },
    cancelLabel: {
      type: String,
      default: ""
    },
    popupRef: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(["confirm", "cancel"])

  const handleCancel = () => {
    emit("cancel")
  }

  const handleConfirm = (event) => {
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