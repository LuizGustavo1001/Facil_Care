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
          <ActionButtonAlt
            v-for="btn in homeView.buttons"
            :key="btn.id"
            tag="router"
            :to="btn.route"
            :leftIcon="btn.icon"
            leftIconSize="30px"
            :color="btn.color"
            :title="$t(`views.home.buttons.${btn.id}.title`)"
            :description="$t(`views.home.buttons.${btn.id}.description`)"
          />
          <!--
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
          -->
        </nav>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped></style>

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
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue";

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