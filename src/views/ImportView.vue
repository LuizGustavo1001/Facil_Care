<template>
  <div class="view regular">
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppHeader
        :title="utils.getPageTitle(PAGES['IMPORT'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="navigation.handleReturn"
    />

    <main class="main regular">
      <!-- 1. Import via P2P -->
      <section v-if="route.query.peerId" class="main-section center card">
        <h2 v-if="peerStatus !== 'error'">{{ t(`views.import.sections.importing.title`) }}...</h2>

        <!-- Status: Connecting -->
        <div v-if="peerStatus === 'connecting'" class="status-box">
          <div class="spinner"></div>
          <p>{{ t(`views.import.sections.importing.actions[0]`) }}...</p>
        </div>

        <!-- Status: Tranferring -->
        <div v-if="peerStatus === 'transferring'" class="status-box">
          <div class="spinner"></div>
          <p>{{ t(`views.import.sections.importing.actions[1]`) }}...</p>
        </div>

        <!-- Status: Done -->
        <div v-if="peerStatus === 'done'" class="status-box success-import">
          <Icon :icon="icons['check-circle-line']" size="50px" />

          <p>{{ t(`views.import.sections.importing.actions[2]`) }}!</p>

          <ActionButton
              tag="button"
              padding="lg"
              :title="t(`utils.homePage`)"
              @click="navigation.handleReturn"
          />
        </div>

        <!-- Status: Error -->
        <div v-else-if="peerStatus === 'error'" class="card">
          <p class="error-message"> {{ peerError }} </p>

          <ActionButton
              tag="button"
              padding="lg"
              :title="t(`utils.homePage`)"
              @click="navigation.handleReturn"
          />
        </div>
      </section>

      <!-- 2. Import via local file (JSON) -->
      <section v-else class="main-section center card">
        <template v-if="importDone">
          <div class="success-import flex flex-column align-center gap-1">
            <Icon :icon="icons['check-circle-line']" size="50px" padding="sm"/>

            <p>{{ t(`views.import.sections.importing.actions[2]`) }}!</p>

            <ActionButton
                tag="button"
                padding="lg"
                :title="t(`utils.homePage`)"
                @click="navigation.handleReturn"
            />
          </div>
        </template>

        <template v-else>
          <div class="title flex flex-column gap-05">
            <h2>{{ t(`views.import.sections.localFile.title`) }}</h2>
            <p>{{ t(`views.import.sections.localFile.subtitle`) }}</p>
          </div>

          <input
              ref="fileInput"
              type="file"
              accept=".json,application/json"
              style="display: none"
              @change="handleFileSelect"
          />

          <ActionButton
              tag="button"
              padding="lg"
              :title="isDexieImporting
                ? t(`views.import.sections.localFile.actions[0]`)
                : t(`views.import.sections.localFile.actions[1]`)"
              :leftIcon="isDexieImporting
                ? ''
                : icons['click-line']"
              :aria-disabled="isDexieImporting"
              @click="triggerFileInput"
          />

          <p v-if="dexieError" class="error-message"> {{ dexieError }} </p>
        </template>
      </section>
    </main>

    <AppFooter page="import" />
  </div>
</template>

<style scoped>
  .card{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }

  .card .title{
    text-align: center;
  }

  .status-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
  }

  .success-import p {
    font-size: var(--text-heading-md);
    font-weight: var(--bold-weight);
  }
  .success-import .icon-wrapper{
    background: var(--green-400);
    border-radius: var(--radius-xl);
  }
</style>

<script setup>
  import {computed, onMounted, ref, watch} from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { PAGES } from "../composables/usePages.js"

  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import Icon from "../components/icons/Icon.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"

  import { useRoute } from "vue-router"
  import { useUtils } from "../composables/useUtils.js"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useDexieBackup } from "../composables/useDexieBackup.js"
  import { usePeerSync } from "../composables/usePeerSync.js"
  import { useI18n } from "vue-i18n"

  // COMPOSABLES
  const { t } = useI18n()
  const route = useRoute()
  const utils = useUtils()
  const navigation = useNavigation()
  const snackbar = useSnackbar()
  const dexieBackup = useDexieBackup()
  const p2p = usePeerSync()

  // VARIABLES
  const fileInput = ref(null)
  const importDone = ref(false)

  // COMPUTED PROPERTIES
  const peerStatus = computed(() => p2p.peerStatus.value)
  const peerError = computed(() => p2p.peerError.value)
  const isDexieImporting = computed(() => dexieBackup.isImporting.value)
  const dexieError = computed(() => dexieBackup.error.value)
  const isSnackbarOpen = computed(() => snackbar.isActive.value)

  // FUNCTIONS
  // Manual Import (.json file via input)
  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]

    if(!file) return

    importDone.value = await dexieBackup.importFromJSON(file)
    snackbar.open('JSONImportSuccess')
  }

  const triggerFileInput = () => {
    fileInput.value?.click()
  }

  // MOUNTED || ONMOUNTED
  onMounted(() => {
    // Automaticly connects to emitter peerId via URL
    const hostPeerId = route.query.peerId
    if(hostPeerId){
      p2p.connectToHostAndImport(hostPeerId)
    }
  })

  // WATCHERS
  watch([dexieBackup.error, p2p.peerError], ([newBackupError, newPeerError]) => {
    if (newBackupError) snackbar.open(newBackupError)

    if (newPeerError) snackbar.open(newPeerError)
  })
</script>
