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

  import AppHeader from "../components/AppHeader.vue"
  import AppSidebar from "../components/AppSidebar.vue"
  import AppOverlay from "../components/AppOverlay.vue"
  import AppFooter from "../components/AppFooter.vue"
  import SnackBar from "../components/common/SnackBar.vue"

  import PatientController from "../controllers/PatientController.js"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"

  // COMPOSABLES
  const {
    overlayIsActive,
    sidebarIsActive,
    handleSidebarToggle
  } = useSidebar()
  const { warning, getWarning } = useWarning()

  // CONTROLLERS
  const patientController = new PatientController()
  const patient = ref({})

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    const result = await patientController.getPatient()

    // Update frontend patient data
    if(result.success){
      Object.assign(patient.value, result.data)
    }else{
      getWarning(result.code)
    }
  })
</script>