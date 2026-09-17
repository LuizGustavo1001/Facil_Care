<template>
  <header class="flex justify-center align-center gap-05">
    <div class="flex align-center gap-05 flex-grow-1">

      <template v-if="leftBtnIcon === icons['menu-left']">
        <IconBtnAlt id="sidebar-toggle-btn" :icon="leftBtnIcon" size="25px" @click.stop="$emit('sidebar-toggle')"/>
      </template>

      <template v-else>
        <IconBtnAlt :icon="leftBtnIcon" size="25px" @click="$emit('return-page')"/>
      </template>

      <p class="title flex-grow-1 truncate-single">
        <slot><strong>{{ props.title }}</strong></slot>
      </p>
    </div>

    <IconBtn :icon="icons['notification-line']" size="25px" variant="transparent" />
  </header>
</template>

<style scoped>
  header{
    position: sticky;
    top: 0;
    padding: var(--spacing-md);
    background: var(--color-bg-primary);

    border-radius: 0 0 var(--radius-xl) var(--radius-xl);
    box-shadow: 0 0 4px 5px var(--color-shadow-subtle);

    z-index: 1;
  }

  header p{
    font-size: var(--text-heading-md);
  }
</style>

<script setup>
  import { icons } from "../../assets/icons/icons.js"

  import IconBtnAlt from "./IconBtnAlt.vue"
  import IconBtn from "./IconBtn.vue"

  const props = defineProps({
    title: String,
    leftBtnIcon: {
      type: String,
      default: icons["menu-left"]
    }
  })

  /*
    <!-- Simple title -->
    <AppHeader title="Dashboard" />

    <!-- Greeting with bold username -->
    <AppHeader>
      {{ $t('greetings.hello') }}, <strong>{{ username }}</strong>!
    </AppHeader>
  */
</script>