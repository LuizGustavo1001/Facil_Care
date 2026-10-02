<template>
  <div class="view regular">
    <SnackBar
        v-if="isWarningActive"
        :message="warning.message"
        :type="warning.type || undefined"
        @click="clearWarning"
    />

    <AppOverlay />

    <AppSidebar
        ref="sidebarRef"
        :patientData="patient"
        :class="{ active: isSidebarActive }"
    />

    <AppHeader
        toggleBtnRef="toggleBtnRef"
        @sidebar-toggle="toggleSidebar"
    >
      {{ $t('utils.hello') }}, <strong>{{ patient.name }}</strong>!
    </AppHeader>

    <main class="main regular gap-1">
      <section class="main-section regular gap-15">
        <p class="text-muted">{{ $t("views.home.subtitle") }}:</p>

        <nav class="home-nav flex flex-column gap-1">
          <ActionButtonAlt
            v-for="btn in homeView.buttons"
            :key="btn.id"
            tag="router"
            :to="btn.route"
            :leftIcon="btn.icon"
            leftIconSize="30px"
            :rightIcon="icons['chevron-right']"
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
  import { icons } from "../assets/icons/icons.js"

  import { useWarning } from "../composables/useWarning.js"
  import { useSidebar } from "../composables/useSidebar.js"

  import AppHeader from "../components/AppHeader.vue"
  import AppSidebar from "../components/AppSidebar.vue"
  import AppOverlay from "../components/AppOverlay.vue"
  import AppFooter from "../components/AppFooter.vue"
  import SnackBar from "../components/common/SnackBar.vue"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"

  import PatientController from "../controllers/PatientController.js"

  // COMPOSABLES
  const { isSidebarActive, sidebarRef, toggleBtnRef, toggleSidebar } = useSidebar()
  const { warning, getWarning, isWarningActive, clearWarning } = useWarning()

  // CONTROLLERS
  const patientController = new PatientController()
  const patient = ref({})

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    const result = await patientController.getPatient()

    // Update frontend patient data
    if(result.success){
      patient.value = result.data
    }else{
      getWarning(result.code)
    }
  })
</script>