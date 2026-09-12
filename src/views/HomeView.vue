<template>
  <AppOverlay :class="{ active: overlayIsActive }"/>

  <AppSidebar :class="{ active: sidebarIsActive }"/>

  <AppHeader @click="handleSidebarToggle">
    {{ $t('greetings.hello') }}, <strong>{{ username }}</strong>!
  </AppHeader>

  <main class="flex flex-column gap-15 relative flex-grow-1">
    <section class="flex flex-column gap-1">
      <p class="text-muted">{{ $t("views.home.subtitle") }}:</p>

      <nav class="home-nav flex flex-column gap-1">
        <a
            v-for="btn in homeView.buttons"
            :key="btn.id"
            :href="btn.route"
            class="home-card flex justify-between align-center gap-05 active-border"
            :class="btn.color"
        >
          <div class="flex flex-column flex-grow-1" style="gap: var(--spacing-3xs)">
            <h1 class="truncate-multi">{{ $t(`views.home.buttons.${btn.id}.title`) }}</h1>
            <p class="truncate-multi muted">{{ $t(`views.home.buttons.${btn.id}.description`) }}</p>
          </div>

          <Icon :icon="btn.icon" class="muted" size="35px"/>
        </a>
      </nav>
    </section>
  </main>

  <footer class="flex flex-column gap-05">
    <div>
      <template v-for="btn in homeView.footer.buttons" :key="btn.id">
        <ActionButton
            :leftIcon="btn.leftIcon"
            padding="md"
            :rightIcon="btn.rightIcon || icons['chevron-right']"
            :title="$t(`views.home.footer.buttons.${btn.id}.title`)"
        />
      </template>
    </div>

    <p class="brand text-muted-lighter">Facil Care - 2026</p>
  </footer>
</template>

<style scoped>
  .home-nav{
    border-radius: var(--radius-md);
  }

  .home-card{
    color: inherit;
    padding: var(--spacing-lg);

    border-radius: var(--radius-md);

    transition: 0.2s ease-out;
  }
  .home-card:active, .home-card:focus-visible{
    transform: scale(0.98);
  }

  .home-card h1{
    font-size: var(--text-heading-sm);
    text-transform: uppercase;
    overflow-wrap: anywhere;
  }
  .home-card p{
    font-size: var(--text-body-md);
    font-weight: 500;
  }

  .home-card .muted{
    opacity: 0.7;
  }

  /* VARIANT */
  /* 1. Red */
  .home-card.red{
    background: var(--red-100);
    color: var(--red-500);
  }

  /* 2. Orange */
  .home-card.orange{
    background: var(--orange-100);
    color: var(--orange-500);
  }

  /* 3. Blue */
  .home-card.blue{
    background: var(--blue-100);
    color: var(--blue-500);
  }

  /* 4. Green */
  .home-card.green{
    background: var(--green-100);
    color: var(--green-500);
  }

  /* 5. Yellow */
  .home-card.yellow{
    background: var(--yellow-100);
    color: var(--yellow-600);
  }

  /* 6. Purple */
  .home-card.purple{
    background: var(--purple-200);
    color: var(--purple-500);
  }
</style>

<script setup>
  import { onMounted, onUnmounted, ref } from "vue"

  import { icons } from "../assets/icons/icons.js"
  import { homeView } from "../locales/projectConfig.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import Icon from "../components/common/Icon.vue"
  import ActionButton from "../components/common/ActionButton.vue"
  import AppSidebar from "../components/AppSidebar.vue"
  import AppOverlay from "../components/common/AppOverlay.vue"

  const username = ref('Antônio Dias')

  /*
    Sidebar Toggle Logic
  */
  const overlayIsActive = ref(false)
  const sidebarIsActive = ref(false)

  const handleSidebarToggle = () => {
    sidebarIsActive.value = !sidebarIsActive.value
    overlayIsActive.value = sidebarIsActive.value
  }

  const handleClickOutside = (event) => {
    const clickedInsideSidebar = event.target.closest('#sidebar')

    if (sidebarIsActive.value && !clickedInsideSidebar) { // avoid function when clicking within the sidebar
      handleSidebarToggle()
    }
  }


  onMounted(() => {
    window.addEventListener("click", handleClickOutside)
  })

  onUnmounted(() => {
    window.removeEventListener("click", handleClickOutside)
  })
</script>