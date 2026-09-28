<template>
  <div class="view">
    <SnackBar
        v-if="warning.message !== ''"
        :message="warning.message"
        :type="warning.type || undefined"
    />

    <AppHeader
        :title="getPageTitle(PAGES['EXPORT'])"
        :leftBtnIcon="icons['chevron-left']"
        @return-page="handleReturn"
    />

    <main class="flex flex-column flex-grow-1">
      <section class="export-container flex flex-column align-center gap-1 flex-grow-1">
        <p class="text-muted">{{ $t(`views.export.subtitle`) }}: </p>

        <nav class="tab-selector align-center">
          <ActionButtonAlt
            :class="{ active: activeTab === 'qr' }"
            tag="button"
            :leftIcon="icons['qr-code-line']"
            color="blue"
            :title="$t(`views.export.sections.tabSelector.qrCode.title`)"
            @click="activeTab = 'qr'"
          />

          <ActionButtonAlt
            :class="{ active: activeTab === 'json' }"
            tag="button"
            :leftIcon="icons['file-line']"
            color="yellow"
            :title="$t(`views.export.sections.tabSelector.json.title`)"
            @click="activeTab = 'json'"
          />
        </nav>

        <!-- 1. QR Code (P2P) -->
        <div v-if="activeTab === 'qr'" class="card">
          <div class="title flex flex-column gap-05">
            <h2>{{ $t(`views.export.sections.cardQR.title`) }}</h2>

            <span class="description flex flex-column">
              <span v-for="(desc, index) in $tm('views.export.sections.cardQR.regularSubtitles')" :key="index" class="text-muted">
                {{ desc }}.
              </span>

              <span v-for="(desc, index) in $tm('views.export.sections.cardQR.destructiveSubtitles')" :key="index" class="text-destructive">
                {{ desc }}.
              </span>
            </span>
          </div>

          <!-- Generate Button/Restart -->
          <div v-if="peerStatus === 'idle'" class="actions">
            <ActionButton
                tag="button"
                :title="$t('views.export.sections.cardQR.actions[0]')"
                variant="highlight"
                padding="md"
                @click="handleStartP2PSession"
            />
          </div>

          <div class="flex-grow-1">
            <!-- Status: Waiting Conection -->
            <div v-if="peerStatus === 'waiting' || isGenerating" class="qr-wrapper flex flex-column gap-1 align-center">
              <div v-if="isGenerating" class="loading"> {{ $t('views.export.sections.cardQR.actions[1]') }}...</div>
              <template v-else-if="qrDataURL">
                <img :src="qrDataURL" alt="QR Code" class="qr-image">
                <p class="status-badge waiting">{{ $t('views.export.sections.cardQR.actions[2]') }}...</p>
              </template>

              <ActionButton
                  tag="button"
                  :title="$t('views.export.sections.cardQR.actions[3]')"
                  variant="subtle"
                  padding="md"
                  @click="handleCancelP2P"
              />
            </div>

            <!-- Status: Transferring -->
            <div v-if="peerStatus === 'transferring'" class="status-wrapper">
              <div class="spinner"></div>
              <p class="status-badge transferring">{{ $t('views.export.sections.cardQR.actions[4]') }}...</p>
            </div>

            <!-- Status: Done -->
            <div v-if="peerStatus === 'done'" class="status-wrapper">
              <p class="status-badge success">{{ $t('views.export.sections.cardQR.actions[5]') }}!</p>

              <ActionButton
                  tag="button"
                  :title="$t('views.export.sections.cardQR.actions[6]')"
                  variant="subtle"
                  padding="md"
                  @click="handleStartP2PSession()"
              />
            </div>

            <!-- Errors -->
            <div v-if="qrCodeError || peerError" class="error-message">
              {{ qrCodeError || peerError }}.
            </div>
          </div>
        </div>

        <!-- 2. JSON File (Offline) -->
        <div v-if="activeTab === 'json'" class="card">
          <div class="title flex flex-column gap-05">
            <h2>{{ $t(`views.export.sections.cardJSON.title`) }}</h2>

            <span class="title-description">
              <span v-for="(desc, index) in $tm('views.export.sections.cardJSON.regularSubtitles')" :key="index" class="text-muted">
                {{ desc }}.
              </span>
            </span>
          </div>

          <ActionButton
              tag="button"
              :title="isExporting
                ? $t('views.export.sections.cardJSON.actions[0]')
                : $t('views.export.sections.cardJSON.actions[1]')"
              :leftIcon="isExporting ? '' : icons['download']"
              padding="md"
              :aria-disabled="isExporting"
              @click="handleDownloadJSON"
          />

          <p v-if="backupError" class="error-message"> {{ backupError }}.</p>
        </div>
      </section>
    </main>

    <AppFooter page="export" />
  </div>
</template>

<style scoped>
  .tab-selector{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;

    margin: 0 auto;

    box-shadow: 0 0 2px 2px var(--color-shadow-subtle);
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);

    max-width: 600px;
  }

  .card{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    flex-grow: 1;
  }

  .status-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
  }

  .card .title{
    text-align: center;
  }

  .card .title h2{
    font-size: var(--text-heading-xl);
  }
  .card .title .description span{
    font-size: var(--text-body-lg);
  }

</style>

<script setup>
  import { ref, watch } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import SnackBar from "../components/common/SnackBar.vue"
  import AppHeader from "../components/AppHeader.vue"
  import AppFooter from "../components/AppFooter.vue"
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue"
  import ActionButton from "../components/common/ActionButton.vue"

  import { useUtils } from "../composables/useUtils.js"
  import { useNavigation } from "../composables/useNavigation.js"
  import { useWarning } from "../composables/useWarning.js"
  import { useDexieBackup } from "../composables/useDexieBackup.js"
  import { useQRCode } from "../composables/useQRCode.js"
  import { usePeerSync } from "../composables/usePeerSync.js"

  // COMPOSABLES
  const { getPageTitle, PAGES } = useUtils()
  const { handleReturn } = useNavigation()
  const { warning, getWarning } = useWarning()
  const { isExporting, backupError, exportToJSON } = useDexieBackup()
  const { isGenerating, qrDataURL, qrCodeError, generateQRCode, clearQRCode } = useQRCode()
  const { peerStatus, peerError, startHostSession, closeSession } = usePeerSync()

  // VARIABLES
  const activeTab = ref('qr') // 'qr' or 'json'

  // FUNCTIONS
  /**
  * Start P2P session and generate QR Code
  **/
  const handleStartP2PSession = async () => {
    try{
      clearQRCode()
      const id = await startHostSession()
      const importURL = `${window.location.origin}/backup/import?peerId=${id}`

      await generateQRCode(importURL)
    }catch(err){
      console.error('Error starting P2P:', err);
    }
  }

  /**
   * Cancel active P2P session
   **/
  const handleCancelP2P = () => {
    closeSession()
    clearQRCode()
  }

  /**
   * Manual JSON file download
   **/
  const handleDownloadJSON = async() => {
    const exportSuccess = await exportToJSON()

    if(exportSuccess){
      getWarning("exportJSONSuccess")
    }
  }

  // WATCHERS
  watch([qrCodeError, peerError], ([newQrCodeError, newPeerError]) => {
    if (newQrCodeError) getWarning(newQrCodeError)

    if (newPeerError) getWarning(newPeerError)
  })
</script>
