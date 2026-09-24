<template>
  <div class="view">
    <SnackBar
        v-if="warning.message !== ''"
        :message="warning.message"
        :type="warning.type || undefined"
    />

    <AppOverlay :class="{ active: overlayIsActive }" />

    <AppSidebar
        :patientData="patient"
        :class="{ active: sidebarIsActive }"
    />

    <AppHeader v-if="!patientController.state.loading" @sidebar-toggle="handleSidebarToggle">
      {{ $t('greetings.hello') }}, <strong>{{ patient.name }}</strong>!
    </AppHeader>

    <main class="flex flex-column gap-15 relative flex-grow-1">
      <section class="flex flex-column gap-1">
        <p class="text-muted">{{ $t("views.home.subtitle") }}:</p>

        <nav class="home-nav flex flex-column gap-1">
          <router-link
              v-for="btn in homeView.buttons"
              :key="btn.id"
              :to="btn.route"
              class="home-card flex justify-between align-center gap-05 active-border"
              :class="btn.color"
          >
            <div class="flex flex-column flex-grow-1" style="gap: var(--spacing-3xs)">
              <h1 class="truncate-multi">{{ $t(`views.home.buttons.${btn.id}.title`) }}</h1>
              <p class="truncate-multi muted">{{ $t(`views.home.buttons.${btn.id}.description`) }}</p>
            </div>

            <Icon :icon="btn.icon" class="muted" size="35px"/>
          </router-link>
        </nav>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
  .home-nav{
    border-radius: var(--radius-md);
    padding: var(--spacing-sm);

    background: var(--color-bg-subtle);
  }

  .home-card{
    color: inherit;
    padding: var(--spacing-lg);

    border-radius: var(--radius-md);
    border: 1px solid transparent;

    transition: 0.2s ease-out;
  }
  .home-card:active, .home-card:focus-visible{
    transform: scale(0.98);
  }

  .home-card h1{
    font-size: var(--text-heading-sm);
    text-transform: uppercase;
  }
  .home-card p{
    font-size: var(--text-body-md);
    font-weight: 500;
  }

  .home-card .muted{
    opacity: 0.75;
  }

  /* VARIANT */
  /* 1. Red */
  .home-card.red{
    background: var(--color-bg-red);
    color: var(--color-text-red);
  }
  .home-card.red:hover{
    border-color: var(--color-text-red);
  }

  /* 2. Orange */
  .home-card.orange{
    background: var(--color-bg-orange);
    color: var(--color-text-orange);
  }
  .home-card.orange:hover{
    border-color: var(--color-text-orange);
  }

  /* 3. Blue */
  .home-card.blue{
    background: var(--color-bg-blue);
    color: var(--color-text-blue);
  }
  .home-card.blue:hover{
    border-color: var(--color-text-blue);
  }

  /* 4. Green */
  .home-card.green{
    background: var(--color-bg-green);
    color: var(--color-text-green);
  }
  .home-card.green:hover{
    border-color: var(--color-text-green);
  }

  /* 5. Yellow */
  .home-card.yellow{
    background: var(--color-bg-yellow);
    color: var(--color-text-yellow);
  }
  .home-card.yellow:hover{
    border-color: var(--color-text-yellow);
  }

  /* 6. Purple */
  .home-card.purple{
    background: var(--color-bg-purple);
    color: var(--color-text-purple);
  }
  .home-card.purple:hover{
    border-color: var(--color-text-purple);
  }
</style>

<script setup>
  import { onMounted, ref } from "vue"

  import { homeView } from "../locales/projectConfig.js"
  import { useSidebar } from "../composables/useSidebar.js"
  import { useWarning } from "../composables/useWarning.js"

  import AppHeader from "../components/common/AppHeader.vue"
  import Icon from "../components/common/Icon.vue"
  import AppSidebar from "../components/common/AppSidebar.vue"
  import AppOverlay from "../components/common/AppOverlay.vue"
  import AppFooter from "../components/common/AppFooter.vue"
  import SnackBar from "../components/common/SnackBar.vue"

  import PatientController from "../controllers/PatientController.js"
  import db from "../database/db.js"

  // Composables
  const {
    overlayIsActive,
    sidebarIsActive,
    handleSidebarToggle
  } = useSidebar()
  const { warning, getWarning } = useWarning()

  // Functions
  const patientController = new PatientController(db)
  const patient = ref({})

  onMounted(async() => {
    const result = await patientController.getPatient()

    // Update frontend patient data
    if(result.success){
      Object.assign(patient.value, result.data)
    }else{
      getWarning(result.code)
    }
  })
</script>