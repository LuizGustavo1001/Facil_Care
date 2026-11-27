<template>
  <div class="view regular">
    <!-- Import Data Options View -->
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppHeader :title="utils.getPageTitle(currentImportType as string)" />

    <main class="main regular">
      <!-- 1. IMPORT VIA P2P -->
      <section v-if="route.query.peerId" class="main-section center card">
        <h2 v-if="peerStatus !== 'error' && peerStatus !== 'done'">
          {{ utils.getTranslate(`views.import.categories.${PAGES.IMPORT_P2P}.title`) }}...
        </h2>

        <!-- Status: Connecting -->
        <div v-if="peerStatus === 'connecting'" class="status-box">
          <div class="spinner" />
          <Badge
              :text="`${getActionLabel(PAGES.IMPORT_P2P, 'finding')}...`"
              :color="BUTTON_COLORS.YELLOW"
          />
        </div>

        <!-- Status: Tranferring -->
        <div v-if="peerStatus === 'transferring'" class="status-box">
          <div class="spinner"></div>
          <Badge
              :text="`${getActionLabel(PAGES.IMPORT_P2P, 'receiving')}...`"
              :color="BUTTON_COLORS.BLUE"
          />
        </div>

        <!-- Status: Done -->
        <div v-if="peerStatus === 'done'" class="status-box">
          <ShapedBgIcon :icon="icons['user-smile-fill']" size="50px" :color="BUTTON_COLORS.GREEN" />
          <p>{{ getActionLabel(PAGES.IMPORT_P2P, 'done') }}!</p>

          <ActionButton
              :tag="BUTTON_TAGS.BUTTON"
              :padding="BUTTON_PADDING.LARGE"
              :title="utils.getTranslate(`utils.back`)"
              @click="navigation.handleReturn"
          />
        </div>

        <!-- P2P Errors -->
        <div v-else-if="peerStatus === 'error'" class="card">
          <p class="error-message"> {{ peerError }} </p>

          <ActionButton
              :tag="BUTTON_TAGS.BUTTON"
              :padding="BUTTON_PADDING.LARGE"
              :title="utils.getTranslate(`utils.back`)"
              @click="navigation.handleReturn"
          />
        </div>
      </section>

      <!-- 2. IMPORT SCANNING THE QR CODE -->
      <section
          v-if="currentImportType === PAGES.IMPORT_QR_CODE"
          class="main-section center text-center align-center gap-1"
      >
        <!-- QR Code Scanner -->
        <ShapedBgIcon
            :icon="icons['qr-code-fill']"
            size="50px"
            :color="BUTTON_COLORS.BLUE"
        />

        <div class="section-title-container flex flex-column gap-05">
          <h1>{{ getCategoryTitle(PAGES.IMPORT_QR_CODE).title }}</h1>
          <p class="section-description text-muted">{{ getCategoryTitle(PAGES.IMPORT_QR_CODE).subtitle }}.</p>
        </div>

        <div v-if="isQrScannerOpen" class="qr-scanner relative overflow-hidden width-full">
          <video
              ref="qrVideo"
              autoplay
              muted
              playsinline
          />
        </div>

        <ActionButton
            v-if="!isQrScannerOpen"
            :tag="BUTTON_TAGS.BUTTON"
            :padding="BUTTON_PADDING.LARGE"
            :title="getActionLabel(PAGES.IMPORT_QR_CODE, 'readQRCode')"
            :leftIcon="icons['qr-code-fill']"
            @click="openQRScanner"
            style="margin: 0 auto"
        />

        <Badge v-if="qrScannerError" :color="BUTTON_COLORS.RED" :text="getActionLabel(PAGES.IMPORT_QR_CODE, qrScannerError)"/>

        <ActionButton
            v-if="isQrScannerOpen"
            :tag="BUTTON_TAGS.BUTTON"
            :padding="BUTTON_PADDING.LARGE"
            :title="utils.getTranslate(`utils.cancel`)"
            @click="closeQrScanner"
        />
      </section>

      <!-- 3. IMPORT VIA LOCAL FILE (Fallback too) -->
      <section v-else class="main-section center text-center align-center gap-1">
        <ShapedBgIcon
            :icon="pages[PAGES.IMPORT].iconLine"
            size="50px"
            :color="BUTTON_COLORS.YELLOW"
        />

        <div class="section-title-container flex flex-column gap-05">
          <h1>{{ getCategoryTitle(PAGES.IMPORT_FILE).title }}</h1>
          <p class="section-description text-muted">
            {{ getCategoryTitle(PAGES.IMPORT_FILE).subtitle }}.
          </p>
        </div>

        <!-- Hidden File Input -->
        <input
            ref="fileInput"
            type="file"
            accept=".json,application/json"
            style="display: none"
            @change="handleFileSelect"
        />

        <ActionButton
            :tag="BUTTON_TAGS.BUTTON"
            :padding="BUTTON_PADDING.LARGE"
            :title="isDexieImporting
                    ? getActionLabel(PAGES.IMPORT_FILE, 'restoring')
                    : getActionLabel(PAGES.IMPORT_FILE, 'selectFile')"
            :leftIcon="isDexieImporting
                    ? ''
                    : icons['folder-open-fill']"
            :aria-disabled="isDexieImporting"
            @click="triggerFileInput"
            style="margin: 0 auto"
        />

        <p v-if="dexieError" class="error-message">
          {{ dexieError }}
        </p>
      </section>
    </main>

    <AppFooter page="export" />
  </div>
</template>

<style scoped>
  .qr-scanner {
    max-width: 400px;
    aspect-ratio: 1;

    border-radius: var(--radius-lg);

    background: var(--color-bg-subtle);
  }

  .qr-scanner video {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }
</style>

<script setup lang="ts">
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue"
  import { icons } from "../assets/icons/icons"

  import { useDexieBackup } from "../composables/useDexieBackup"
  import { useRoute } from "vue-router"
  import { useSnackbar } from "../composables/components/useSnackbar"
  import { usePeerSync } from "../composables/usePeerSync"
  import { useUtils } from "../composables/useUtils"
  import { useNavigation } from "../composables/useNavigation"

  import { PAGES } from "../constants/sysPages"
  import { BUTTON_COLORS, BUTTON_PADDING } from "../constants/components/appButtons"
  import { BUTTON_TAGS } from "../constants/components/appButtons"
  import { pages } from "../locales/projectConfig"

  import type { WarningCode } from "../types/components/snackbar"
  import type { PeerSyncError } from "../types/peerSync"
  import type { DexieError } from "../types/dexie"
  import { BrowserQRCodeReader, type IScannerControls } from "@zxing/browser"

  import AppHeader from "../components/layout/AppHeader.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import Badge from "../components/common/Badge.vue"
  import ShapedBgIcon from "../components/icons/ShapedBgIcon.vue"

  // COMPOSABLES
  const utils = useUtils()
  const snackbar = useSnackbar()
  const p2p = usePeerSync()
  const route = useRoute()
  const dexieBackup = useDexieBackup()
  const navigation = useNavigation()

  // STATES
  const fileInput = ref<HTMLElement | null>(null)
  const importDone = ref<boolean>(false)

  const qrVideo = ref<HTMLVideoElement | null>(null)
  const isQrScannerOpen = ref<boolean>(false)
  const qrScannerError = ref<string>("")

  const qrReader = new BrowserQRCodeReader()

  let scannerControls: IScannerControls | null = null

  // COMPUTED
  const peerStatus = computed<string>(() => p2p.peerStatus.value)
  const peerError = computed<PeerSyncError>(() => p2p.peerError.value)

  const isDexieImporting = computed<boolean>(() => dexieBackup.isImporting.value)
  const dexieError = computed<DexieError>(() => dexieBackup.error.value)

  const isSnackbarOpen = computed<boolean>(() => snackbar.isActive.value)

  const currentImportType = computed<string | null>(() => {
    const category = route.params.type

    if (typeof category !== "string") return null

    return category !== "string" ? category : null
  })

  // FUNCTIONS
  // Returns the current translated import status
  const getActionLabel = (category: string, action: string): string => {
    const key = `views.${PAGES.IMPORT}.categories.${category}.badges.${action}`

    return utils.getTranslate(key)
  }

  // Returns the translated title of the selected import way (title & subtitle)
  const getCategoryTitle = (category: string): Record<string, string> => {
    const key = `views.import.categories.${category}`

    return {
      title: utils.getTranslate(`${key}.title`),
      subtitle: utils.getTranslate(`${key}.subtitle`),
    }
  }

  // Handles manual import (.json file via input)
  const handleFileSelect = async (event: Event): Promise<void> => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if(!file) return

    const success = await dexieBackup.importFromJSON(file)
    importDone.value = success

    if(success) {
      snackbar.open('JSONImportSuccess' as WarningCode)
    }
  }

  // Triggers manually the file input
  const triggerFileInput = () => {
    fileInput.value?.click()
  }

  // Opens the QR Code reader
  const openQRScanner = async (): Promise<void> => {
    isQrScannerOpen.value = true
    qrScannerError.value = ""

    // Wait for the video element to render
    await nextTick()

    if(!qrVideo.value) return

    try {
      scannerControls = await qrReader.decodeFromConstraints(
          {
            video: {
              facingMode: { ideal: "environment" }
            }
          },
          qrVideo.value,
          (result) => {
            if (!result) return

            handleQrCode(result.getText())
          }
      )
    } catch (err) {
      console.error("QR Scanner Error:", err)

      if (err instanceof Error) {
        console.error({
          name: err.name,
          message: err.message,
          secureContext: window.isSecureContext,
          mediaDevices: !!navigator.mediaDevices
        })
      }

      qrScannerError.value = "UnavailableDeviceCamera"
    }
  }

  // Handles the scanned QR Code
  const handleQrCode = (content: string): void => {
    try {
      const url = new URL(content)

      // Validate the expected import route
      if(url.pathname.replace(/\/$/, "") !== "/import") {
        throw new Error("InvalidQrCode")
      }

      const peerId = url.searchParams.get("peerId")

      if(!peerId) {
        throw new Error("PeerIdNotFound")
      }

      closeQrScanner()

      // Starts P2P connection
      p2p.connectToHostAndImport(peerId)
    } catch(err) {
      console.error("Invalid QR Code:", err)

      qrScannerError.value = "InvalidQrCode"
    }
  }

  // Stops the camera and closes the reader
  const closeQrScanner = (): void => {
    scannerControls?.stop()
    scannerControls = null

    isQrScannerOpen.value = false
  }


  // MOUNTED || ONMOUNTED
  onMounted(() => {
    // Automaticly connects to emitter peerId via URL
    const hostPeerId = route.query.peerId

    if(hostPeerId && typeof hostPeerId === "string") {
      p2p.connectToHostAndImport(hostPeerId)
    }
  })

  // Releases camera resources when leaving the page
  onUnmounted(() => {
    closeQrScanner()
  })

  // WATCHERS
  watch([dexieBackup.error, p2p.peerError], ([newBackupError, newPeerError]) => {
    if(newBackupError) snackbar.open(newBackupError as WarningCode)

    if(newPeerError) snackbar.open(newPeerError as WarningCode)
  })
</script>