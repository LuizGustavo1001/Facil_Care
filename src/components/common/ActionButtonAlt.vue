<template>
  <component
      :is="tag"
      :type="isButton ? 'button' : undefined"
      :href="!isButton ? (link || undefined) : undefined"
      :target="!isButton ? target : undefined"
      :rel="!isButton && target === '_blank' ? 'noopener noreferrer' : undefined"
      class="action-btn-alt flex justify-between gap-1"
      :class="colorVariant"
  >
    <span class="flex gap-05 align-center">
        <span class="left-icon-wrapper">
          <Icon
              v-if="leftIcon"
              :icon="leftIcon"
              :size="leftIconSize"
              class="left-icon"
          />
        </span>

        <span class="btn-content flex flex-column justify-between gap-05 flex-grow-1">
          <span class="btn-content-title truncate-single">
            <slot name="title">{{ title }}</slot>
          </span>

          <span
              v-if="description || $slots.description"
              class="btn-content-description flex flex-column text-muted truncate-multi"
          >
            <slot name="description">{{ description }}</slot>
          </span>
      </span>
    </span>

    <Icon
        v-if="rightIcon"
        :icon="rightIcon"
        :size="rightIconSize"
        class="right-icon"
    />
  </component>
</template>

<style scoped>
  .action-btn-alt{
    border: 1px solid transparent;

    padding: 4px 8px 4px 4px;
    border-radius: var(--radius-lg);

    background: var(--color-bg-subtle);

    text-align: start;

    cursor: pointer;
    transition: 0.2s ease-out;
  }
  .action-btn-alt:active, .action-btn-alt:focus{
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    outline: none;
  }

  .action-btn-alt .left-icon-wrapper{
    padding: 1.5rem 0.75rem;

    border-radius: var(--radius-lg);
  }

  .btn-content .btn-content-title{
    font-size: var(--text-body-lg);
    color: var(--color-text-primary);
  }

  .btn-content .btn-content-description{
    font-size: var(--text-body-sm);
  }

  /* COLOR VARIANTS */

  /* 1. Blue */
  .action-btn-alt.blue .left-icon-wrapper{
    background-color: var(--blue-100);
    color: var(--blue-500);
  }
  .action-btn-alt.blue:hover{
    border-color: var(--blue-500);
  }

  /* 2. Orange */
  .action-btn-alt.orange .left-icon-wrapper{
    background-color: var(--orange-200);
    color: var(--orange-500);
  }
  .action-btn-alt.orange:hover{
    border-color: var(--orange-500);
  }

  /* 3. Red */
  .action-btn-alt.red .left-icon-wrapper{
    background-color: var(--red-200);
    color: var(--red-500);
  }
  .action-btn-alt.red:hover{
    border-color: var(--red-500);
  }

  /* 4. Green */
  .action-btn-alt.green .left-icon-wrapper{
    background-color: var(--green-100);
    color: var(--green-500);
  }
  .action-btn-alt.green:hover{
    border-color: var(--green-500);
  }
</style>

<script setup>
  import { computed } from "vue"
  import Icon from "./Icon.vue"

  const COLORS_LIST = ["blue", "orange", "red", "green"]
  const DEFAULT_COLOR = "blue"

  const props = defineProps({
    tag: {
      type: String,
      default: 'a',
    },
    leftIcon: {
      type: String,
      default: null
    },
    leftIconSize: {
      type: String,
      default: "25px"
    },
    rightIcon: {
      type: String,
      default: null
    },
    rightIconSize: {
      type: String,
      default: "25px"
    },
    link: {
      type: String,
      default: "#"
    },
    target: {
      type: String,
      default: 'external'
    },
    color: {
      type: String,
      default: 'blue',
      validator: (value) => ["blue", "orange", "red", "green"].includes(value)
    },
    title: String,
    description: String
  })

  const isButton = computed(() => props.tag === 'button')

  // avoid invalid color variant
  const colorVariant = computed(() => {
    return COLORS_LIST.includes(props.color) ? props.color : DEFAULT_COLOR
  })
</script>