<template>
  <div class="view regular">
    <Snackbar
        :isActive="isWarningActive"
        :message="warning.message"
        :type="warning.type || undefined"
        @click="clearWarning"
    />

    <AppHeader
        :title="getPageTitle(PAGES['IMPORT'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main class="main regular">
      <!-- 1. Import via P2P -->
      <section v-if="route.query.peerId" class="main-section center card">
        <h2 v-if="peerStatus !== 'error'">{{ $t(`views.import.sections.importing.title`) }}...</h2>

        <!-- Status: Connecting -->
        <div v-if="peerStatus === 'connecting'" class="status-box">
          <div class="spinner"></div>
          <p>{{ $t(`views.import.sections.importing.actions[0]`) }}...</p>
        </div>

        <!-- Status: Tranferring -->
        <div v-if="peerStatus === 'transferring'" class="status-box">
          <div class="spinner"></div>
          <p>{{ $t(`views.import.sections.importing.actions[1]`) }}...</p>
        </div>

        <!-- Status: Done -->
        <div v-if="peerStatus === 'done'" class="status-box success-import">
          <Icon :icon="icons['check-circle-line']" size="50px" />

          <p>{{ $t(`views.import.sections.importing.actions[2]`) }}!</p>

          <ActionButton
              tag="button"
              padding="lg"
              :title="$t(`utils.homePage`)"
              @click="handleReturn()"
          />
        </div>

        <!-- Status: Error -->
        <div v-else-if="peerStatus === 'error'" class="card">
          <p class="error-message"> {{ peerError }} </p>

          <ActionButton
              tag="button"
              padding="lg"
              :title="$t(`utils.homePage`)"
              @click="handleReturn()"
          />
        </div>
      </section>

      <!-- 2. Import via local file (JSON) -->
      <section v-else class="main-section center card">
        <template v-if="importDone">
          <div class="success-import flex flex-column align-center gap-1">
            <Icon :icon="icons['check-circle-line']" size="50px" padding="sm"/>

            <p>Dados do paciente importados com sucesso!</p>

            <ActionButton
                tag="button"
                padding="lg"
                :title="$t(`utils.homePage`)"
                @click="handleReturn()"
            />
          </div>
        </template>

        <template v-else>
          <div class="title flex flex-column gap-05">
            <h2>{{ $t(`views.import.sections.localFile.title`) }}</h2>
            <p>{{ $t(`views.import.sections.localFile.subtitle`) }}</p>
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
              :title="isImporting
              ? $t(`views.import.sections.localFile.actions[0]`)
              : $t(`views.import.sections.localFile.actions[1]`)"
              :leftIcon="isImporting ? '' : icons['click-line']"
              :aria-disabled="isImporting"
              @click="triggerFileInput"
          />

          <p v-if="backupError" class="error-message"> {{ backupError }} </p>
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
  import { onMounted, ref, watch } from "vue"
  import { icons } from "../assets/icons/icons.js"

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

  // COMPOSABLES
  const route = useRoute()
  const { getPageTitle, PAGES } = useUtils()
  const { handleReturn } = useNavigation()
  const { warning, getWarning, isWarningActive, clearWarning } = useSnackbar()
  const { isImporting, backupError, importFromJSON } = useDexieBackup()
  const { peerStatus, peerError, connectToHostAndImport } = usePeerSync()

  // VARIABLES
  const fileInput = ref(null)
  const importDone = ref(false)

  // FUNCTIONS
  // Manual Import (.json file via input)
  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]

    if(!file) return

    importDone.value = await importFromJSON(file)
    getWarning('JSONImportSuccess')
  }

  const triggerFileInput = () => {
    fileInput.value?.click()
  }

  // MOUNTED || ONMOUNTED
  onMounted(() => {
    // Automaticly connects to emitter peerId via URL
    const hostPeerId = route.query.peerId
    if(hostPeerId){
      connectToHostAndImport(hostPeerId)
    }
  })

  // WATCHERS
  watch([backupError, peerError], ([newBackupError, newPeerError]) => {
    if (newBackupError) getWarning(newBackupError)

    if (newPeerError) getWarning(newPeerError)
  })
</script>
