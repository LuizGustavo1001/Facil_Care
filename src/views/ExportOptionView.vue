<template>
  <div class="view regular">
    <!-- Export Data Options View -->
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppHeader :title="utils.getPageTitle(PAGES['EXPORT'])" />

    <main class="main regular">
      <!-- Export Via QR Code -->
      <section
        v-if="currentExportType === 'qrCode'"
        class="main-section regular gap-1"
      >
        <!-- QR Code Export Explanation -->
        <div v-if="peerStatus !== 'done'" class="section-title-container flex flex-column gap-03">
          <div class="flex gap-03">
            <Icon :icon="icons['qr-code-fill']" size="25px" />

            <h1 class="section-title">{{ getSubTypeTitle() }}</h1>
          </div>

          <p
              v-for="(text, index) of getSubTypeDescription().regulars"
              :key="index"
              class="section-description text-muted"
          >
            {{ text }}.
          </p>

          <p
            v-for="(text, index) of getSubTypeDescription().destructives"
            :key="index"
            class="section-description text-destructive"
          >
            {{ text }}.
          </p>
       </div>

        <!-- QR Code Hero -->
        <div class="section-hero flex-grow-1 flex flex-column gap-03 justify-center align-center text-center">
          <!-- Generate Button/Restart -->
          <div v-if="peerStatus === 'idle'" class="actions">
            <ActionButton
                :tag="BUTTON_TAGS.BUTTON"
                :variant="ACTION_BUTTON_VARIANTS.BRAND"
                :padding="PADDING_SIZE.MEDIUM"
                :leftIcon="icons['qr-code-fill']"
                :title="getActionLabel('generate')"
                @click="handleStartP2PSession"
            />
          </div>

          <div>
            <!-- Status: Waiting Conection -->
            <div v-if="peerStatus === 'waiting'" class="qr-wrapper flex flex-column gap-1 align-center">
              <div v-if="isQRCodeGenerating" class="loading"> {{ getActionLabel('generating') }}...</div>

              <template v-else-if="qrCodeURL">
                <img :src="qrCodeURL" alt="QR Code" class="qr-image">
                <p class="status-badge waiting">{{ getActionLabel('awaiting') }}...</p>
              </template>

              <ActionButton
                  :tag="BUTTON_TAGS.BUTTON"
                  :padding="PADDING_SIZE.MEDIUM"
                  :variant="ACTION_BUTTON_VARIANTS.SUBTLE"
                  :leftIcon="icons['indeterminate-circle-fill']"
                  :title="getActionLabel('cancel')"
                  @click="handleCancelP2P"
              />
            </div>

            <!-- Status: Transferring -->
            <div v-if="peerStatus === 'transferring'" class="status-wrapper">
              <div class="spinner" />
              <p class="status-badge transferring">{{ getActionLabel('connectionEstablished') }}...</p>
            </div>

            <!-- Status: Done -->
            <div v-if="peerStatus === 'done'" class="status-wrapper">
              <Icon :icon="icons['user-smile-fill']" size="50px" :bgColor="BUTTON_COLORS.GREEN" padding="sm" style="border-radius: var(--radius-md)" />
              <p>{{ getActionLabel('done') }}!</p>

              <ActionButton
                  :tag="BUTTON_TAGS.BUTTON"
                  :variant="ACTION_BUTTON_VARIANTS.SUBTLE"
                  :padding="PADDING_SIZE.LARGE"
                  :title="utils.getTranslate('utils.back')"
                  @click="navigation.handleReturn"
              />
            </div>

            <!-- P2P Errors -->
            <div v-if="qrCodeError || peerError" class="error-message">
              {{ qrCodeError || peerError }}.
            </div>
          </div>
        </div>
      </section>

      <!-- Export Via Backup File (JSON) -->
      <section
        v-else-if="currentExportType === 'json'"
        class="main-section center text-center align-center gap-1"
      >
        <!-- Backup File Export Explanation -->
        <div class="section-title-container flex flex-column gap-05 align-center">
          <Icon
              :icon="icons['file-fill']"
              size="40px"
              :padding="PADDING_SIZE.SMALL"
              :bgColor="BUTTON_COLORS.YELLOW"
              style="border-radius: var(--radius-md)"
          />

          <h1 class="section-title">{{ getSubTypeTitle() }}</h1>

          <div class="flex flex-column gap-03">
            <p
                v-for="(text, index) of getSubTypeDescription().regulars"
                :key="index"
                class="section-description text-muted"
            >
              {{ text }}.
            </p>

            <p
                v-for="(text, index) of getSubTypeDescription().destructives"
                :key="index"
                class="section-description text-destructive"
            >
              {{ text }}.
            </p>
          </div>
        </div>

        <div class="section-hero">
          <ActionButton
              :tag="BUTTON_TAGS.BUTTON"
              :padding="PADDING_SIZE.MEDIUM"
              :title="isDexieExporting
                ? getActionLabel('exporting')
                : getActionLabel('download')"
              :leftIcon="isDexieExporting
                ? ''
                : icons['download']"
              :aria-disabled="isDexieExporting"
              @click="handleDownloadJSON"
          />

          <!-- Errors -->
          <p v-if="dexieError" class="error-message"> {{ dexieError }}.</p>
        </div>
      </section>
    </main>

    <AppFooter page="export" />
  </div>
</template>

<style scoped>
  .status-badge {
    font-size: var(--font-caption);
    padding: var(--spacing-sm);
    border-radius: var(--radius-2xl);
    font-weight: var(--bolder-weight);
  }

  .status-badge.waiting {
    background: var(--color-bg-yellow);
    color: var(--color-text-yellow);
  }
  .status-badge.transferring {
    background: var(--color-bg-blue);
    color: var(--color-text-blue);
  }
  .status-badge.success {
    background: var(--color-bg-green);
    color: var(--color-text-green);
  }

  .status-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
  }
</style>

<script setup lang="ts">
  import { computed, watch } from "vue"
  import { icons } from "../assets/icons/icons"

  import { useDexieBackup } from "../composables/useDexieBackup"
  import { useRoute } from "vue-router"
  import { useSnackbar } from "../composables/useSnackbar"
  import { useQRCode } from "../composables/useQRCode"
  import { usePeerSync } from "../composables/usePeerSync"
  import { useI18n } from "vue-i18n"
  import { useUtils } from "../composables/useUtils"
  import { useNavigation } from "../composables/useNavigation"

  import { PAGES } from "../constants/sysPages"
  import { BUTTON_COLORS } from "../constants/components/buttons"
  import { ACTION_BUTTON_VARIANTS, BUTTON_TAGS } from "../constants/components/buttons"
  import { PADDING_SIZE } from "../constants/paddindSizes"

  import type { WarningCode } from "../types/components/snackbar"
  import type { QRCodeError, QRCodeURL } from "../types/qrCode"
  import type { PeerStatus, PeerSyncError } from "../types/peerSync"
  import type { DexieError } from "../types/dexie"

  import AppHeader from "../components/layout/AppHeader.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import Icon from "../components/icons/Icon.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"

  // COMPOSABLES
  const { tm } = useI18n()
  const utils = useUtils()
  const snackbar = useSnackbar()
  const qrCode = useQRCode()
  const p2p = usePeerSync()
  const route = useRoute()
  const dexieBackup = useDexieBackup()
  const navigation = useNavigation()

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)

  const isQRCodeGenerating = computed<boolean>(() => qrCode.isGenerating.value)
  const qrCodeError = computed<QRCodeError>(() => qrCode.error.value)
  const qrCodeURL = computed<QRCodeURL>(() => qrCode.URL.value)

  const peerStatus = computed<PeerStatus>(() => p2p.peerStatus.value)
  const peerError = computed<PeerSyncError>(() => p2p.peerError.value)

  const isDexieExporting = computed<boolean>(() => dexieBackup.isExporting.value)
  const dexieError = computed<DexieError>(() => dexieBackup.error.value)

  // COMPUTED PROPERTIES
  const currentExportType = computed<string | null>(() => {
    const category = route.params.type

    if (typeof category !== "string") return null

    return category !== "string" ? category : null
  })

  // FUNCTIONS
  // Returns selected export option title
  const getSubTypeTitle = (): string => {
    const key = `views.${PAGES.EXPORT}.categories.${currentExportType.value}.title`

    return utils.getTranslate(key)
  }

  // Returns selected export option description
  const getSubTypeDescription = ():  Record<string, any> => {
    const regularKeys = `views.${PAGES.EXPORT}.categories.${currentExportType.value}.regularSubtitles`
    const destructiveKeys = `views.${PAGES.EXPORT}.categories.${currentExportType.value}.destructiveSubtitles`

    const regulars = tm(regularKeys)
    const destructives = tm(destructiveKeys)

    return {
      regulars,
      destructives,
    }
  }

  // Returns the current translated export status
  const getActionLabel = (action: string): string => {
    const key = `views.${PAGES.EXPORT}.categories.${currentExportType.value}.badges.${action}`

    return utils.getTranslate(key)
  }

  // Starts P2P session and generate QR Code
  const handleStartP2PSession = async (): Promise<void> => {
    try {
      qrCode.clear()
      const id = await p2p.startHostSession()
      const importURL = `${window.location.origin}/backup/import?peerId=${id}`

      await qrCode.generate(importURL)
    } catch(err) {
      console.error('Error starting P2P:', err);
    }
  }

  // Cancels active P2P session
  const handleCancelP2P = (): void => {
    p2p.closeSession()
    qrCode.clear()
  }

  // Handles manual JSON file download
  const handleDownloadJSON = async(): Promise<void> => {
    const exportSuccess = await dexieBackup.exportToJSON()

    if(exportSuccess) {
      snackbar.open("exportJSONSuccess" as WarningCode)
    }
  }

  // WATCHERS
  watch([qrCode.error, p2p.peerError], ([newQrCodeError, newPeerError]) => {
    if (newQrCodeError) snackbar.open(newQrCodeError as WarningCode)

    if (newPeerError) snackbar.open(newPeerError as WarningCode)
  })
</script>