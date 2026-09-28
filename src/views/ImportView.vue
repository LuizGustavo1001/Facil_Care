<template>
  <div class="view">
    <SnackBar
        v-if="warning.message !== ''"
        :message="warning.message"
        :type="warning.type || undefined"
    />

    <AppHeader
        :title="getPageTitle(PAGES['IMPORT'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main>
      <section class="import-container">
        <!-- Import via P2P -->
        <div v-if="route.query.peerId" class="card">
          <h2>{{ $t(`views.import.sections.importing.title`) }}...</h2>

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
          <div v-if="peerStatus === 'done'" class="status-box success">
            <Icon :icon="icons['check-circle-line']"/>
            <p>{{ $t(`views.import.sections.importing.actions[2]`) }}!</p>

            <ActionButton
              tag="router"
              to="/"
              :title="$t(`views.import.sections.importing.actions[3]`)"
              padding="md"
            />
          </div>

          <!-- Status: Error -->
          <div v-else-if="peerStatus === 'done'" class="card">
            <p class="error-message"> {{ peerError }} </p>
            <ActionButton
              tag="router"
              to="/"
              :title="$t(`views.import.sections.importing.actions[3]`)"
              padding="md"
            />
          </div>
        </div>

        <!-- Import via JSON local file -->
        <div v-else class="card">
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
            :title="isImporting
              ? $t(`views.import.sections.localFile.actions[0]`)
              : $t(`views.import.sections.localFile.actions[1]`)"
            :leftIcon="isImporting ? '' : icons['click-line']"
            :aria-disabled="isImporting"
            padding="md"
            @click="triggerFileInput"
          />

          <p v-if="backupError" class="error-message"> {{ backupError }} </p>
        </div>
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
</style>

<script setup>
  import { onMounted, ref, watch } from "vue"
  import { useRoute } from "vue-router"
  import { icons } from "../assets/icons/icons.js"

  import SnackBar from "../components/common/SnackBar.vue"
  import AppHeader from "../components/AppHeader.vue"
  import AppFooter from "../components/AppFooter.vue"
  import Icon from "../components/common/Icon.vue"
  import ActionButton from "../components/common/ActionButton.vue"

  import { useUtils } from "../composables/useUtils.js"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useWarning } from "../composables/useWarning.js"
  import { useDexieBackup } from "../composables/useDexieBackup.js"
  import { usePeerSync } from "../composables/usePeerSync.js"

  // COMPOSABLES
  const route = useRoute()
  const { getPageTitle, PAGES } = useUtils()
  const { handleReturn } = useNavigation()
  const { warning, getWarning } = useWarning()
  const { isImporting, backupError, importFromJSON } = useDexieBackup()
  const { peerStatus, peerError, connectToHostAndImport } = usePeerSync()

  // VARIABLES
  const fileInput = ref(null)

  // FUNCTIONS
  /**
   * Manual Import (.json file via input)
   **/
  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0]

    if(!file) return

    await importFromJSON(file)
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
