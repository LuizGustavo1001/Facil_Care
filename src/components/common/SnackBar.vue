<template>
  <div
      class="snackbar flex gap1 justify-between cursor-pointer"
      :class="variantClass"
      @click="$emit('close')"
  >
    <span class="flex gap-05 align-center flex-grow-1">
      <Icon
          :icon="leftIcon"
          size="25px"
      />

      <span class="snackbar-text flex-grow-1 weight-medium">
        <slot name="message">{{ message }}</slot>
      </span>
    </span>

    <Icon :icon="icons.close" class="right-icon" />
  </div>
</template>

<style scoped>
  .snackbar{
    padding: 1rem;

    width: 90dvw;
    max-width: 450px;

    border-radius: var(--radius-md);
    font-size: var(--text-body-md);

    animation: fade-in 0.5s ease-out forwards;
  }
  .snackbar:active{
    transform: scale(0.98);
  }

  .snackbar .right-icon{
    align-self: start;
  }

  /* VARIANTS */

  /* 1. success */
  .snackbar.success{
    background: var(--green-100);
    color: var(--green-500);
  }

  /* 2. error */
  .snackbar.error{
    background: var(--red-100);
    color: var(--red-500);
  }

  /* 3. warning */
  .snackbar.warning{
    background: var(--orange-100);
    color: var(--orange-500);
  }

  /* 4. info */
  .snackbar.info{
    background: var(--blue-100);
    color: var(--blue-500);
  }
</style>

<script setup>
  import { computed } from "vue"
  import Icon from "./Icon.vue"
  import { icons } from "../../assets/icons/icons.js"

  const INTERVAL = 5000
  const VARIANTS = ["success", "error", "warning", "info"]
  const DEFAULT_VARIANT = "success"

  const props = defineProps({
    variant: {
      type: String,
      default: "success",
      validator: (value) => ["success", "error", "warning", "info"].includes(value)
    },
    message: String
  })

  // close snackbar event
  const emit = defineEmits(["close"])

  const iconMap = {
    success: icons["checkbox-circle-fill"],
    error: icons["indeterminate-circle-fill"],
    warning: icons["warning-circle-fill"],
    info: icons["user-smile-fill"],
  }

  // interval to auto close snackbar
  setInterval(() => {
    emit("close")
  }, INTERVAL)

  // avoid invalid variant classes
  const variantClass = computed(() => {
    return VARIANTS.includes(props.variant) ? props.variant : DEFAULT_VARIANT
  })

  // return leftIcon value based in the selected variant class
  const leftIcon = computed(() => {
    return iconMap[variantClass.value]
  })
</script>