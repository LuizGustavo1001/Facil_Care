<template>
  <component
      :is="componentTag"
      :type="isButton ? 'button' : undefined"
      :to="isRouterLink ? to : undefined"
      :href="!isButton ? (to || undefined) : undefined"
      :target="!isButton ? target : undefined"
      :rel="!isButton && target === '_blank' ? 'noopener noreferrer' : undefined"
      class="action-btn-alt flex justify-between gap-1 active-border"
      :class="colorVariant"
  >
    <span class="flex gap-05 align-center">
        <span v-if="leftIcon" class="left-icon-wrapper">
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

    padding:  var(--spacing-2xs) var(--spacing-xs) var(--spacing-2xs) var(--spacing-2xs);
    border-radius: var(--radius-lg);

    background: var(--color-bg-subtle);

    text-align: start;

    font-family: inherit;
    cursor: pointer;
    transition: 0.2s ease-out;
  }
  .action-btn-alt:hover{
    box-shadow: 0 0 5px 5px var(--alpha-black-05);
  }
  .action-btn-alt .right-icon{
    color: var(--color-text-primary-muted);
  }

  .action-btn-alt .left-icon-wrapper{
    padding: 1.25rem 0.75rem;
    border-radius: var(--radius-lg);

    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-content .btn-content-title{
    font-size: var(--text-heading-md);
    font-weight: var(--bold-weight);
    color: var(--color-text-primary);
  }

  .btn-content .btn-content-description{
    font-size: var(--text-body-lg);
    font-weight: var(--bold-weight);
  }

  /* COLOR VARIANTS */
  /* 1. Blue */
  .action-btn-alt.blue .left-icon-wrapper{
    background-color: var(--color-bg-blue);
    color: var(--color-text-blue);
  }
  .action-btn-alt.blue:hover{
    border-color: var(--color-bg-blue);
  }

  /* 2. Orange */
  .action-btn-alt.orange .left-icon-wrapper{
    background-color: var(--color-bg-orange);
    color: var(--color-text-orange);
  }
  .action-btn-alt.orange:hover{
    border-color: var(--color-bg-orange);
  }

  /* 3. Red */
  .action-btn-alt.red .left-icon-wrapper{
    background-color: var(--color-bg-red);
    color: var(--color-text-red);
  }
  .action-btn-alt.red:hover{
    border-color: var(--color-bg-red);
  }

  /* 4. Green */
  .action-btn-alt.green .left-icon-wrapper{
    background-color: var(--color-bg-green);
    color: var(--color-text-green);
  }
  .action-btn-alt.green:hover{
    border-color: var(--color-bg-green);
  }

  /* 5. Yellow */
  .action-btn-alt.yellow .left-icon-wrapper{
    background-color: var(--color-bg-yellow);
    color: var(--color-text-yellow);
  }
  .action-btn-alt.yellow:hover{
    border-color: var(--color-bg-yellow);
  }

  /* 6. Purple */
  .action-btn-alt.purple .left-icon-wrapper{
    background-color: var(--color-bg-purple);
    color: var(--color-text-purple);
  }
  .action-btn-alt.purple:hover{
    border-color: var(--color-bg-purple);
  }

</style>

<script setup>
  import { computed } from "vue"
  import { RouterLink } from "vue-router"

  import Icon from "./Icon.vue"

  const COLORS_LIST = ["blue", "orange", "red", "green", "purple", "yellow"]
  const DEFAULT_COLOR = "blue"

  const props = defineProps({
    tag: {
      type: String,
      default: 'a'
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
    to: {
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
      validator: (value) => ["blue", "orange", "red", "green", "purple", "yellow"].includes(value)
    },
    title: String,
    description: String
  })

  const isButton = computed(() => props.tag === 'button')

  const isRouterLink = computed(() => props.tag === "router")

  const componentTag = computed(() => {
    // 1. Tag == RouterLink (Internal Link)
    if(isRouterLink.value){
      return RouterLink
    }

    // 2. Other Tag
    return props.tag
  })

  // avoid invalid color variant
  const colorVariant = computed(() => {
    return COLORS_LIST.includes(props.color) ? props.color : DEFAULT_COLOR
  })
</script>