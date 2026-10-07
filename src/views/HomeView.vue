<template>
  <div class="view regular">
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppOverlay />

    <AppSidebar
        :ref="sidebar.sidebarRef"
        :patientData="patient"
        :class="{ active: isSidebarOpen }"
    />

    <AppHeader
        toggleBtnRef="toggleBtnRef"
        @sidebar-toggle="sidebar.toggle"
    >
      {{ t('utils.hello') }}, <strong>{{ patient.name }}</strong>!
    </AppHeader>

    <main class="main regular gap-1">
      <section class="main-section regular gap-15">
        <p class="text-muted">{{ t("views.home.subtitle") }}:</p>

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
            :title="t(`views.home.buttons.${btn.id}.title`)"
            :description="t(`views.home.buttons.${btn.id}.description`)"
          />
        </nav>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped></style>

<script setup>
  import { computed, onMounted, ref } from "vue"

  import { homeView } from "../locales/projectConfig.js"
  import { icons } from "../assets/icons/icons.js"

  import { useI18n } from "vue-i18n"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useSidebar } from "../composables/useSidebar.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppSidebar from "../components/layout/AppSidebar.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import ActionButtonAlt from "../components/buttons/ActionButtonAlt.vue"

  import PatientController from "../controllers/PatientController.js"

  // COMPOSABLES
  const { t } = useI18n()
  const sidebar = useSidebar()
  const snackbar = useSnackbar()

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed(() => snackbar.isActive.value)
  const isSidebarOpen = computed(() => sidebar.isActive.value)

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
      snackbar.open(result.code)
    }
  })
</script>