<template>
  <div class="view regular">
    <!-- Import Data View -->
    <Snackbar
        :isActive="isSnackbarOpen"
        :message="snackbar.data.message"
        :type="snackbar.data.type || undefined"
        @click="snackbar.clear"
    />

    <AppHeader :title="utils.getPageTitle(PAGES['IMPORT'])" />

    <main class="main regular">
      <!-- Import Via P2P -->
      <section v-if="route.query.peerId" class="main-section center card">
        <h2 v-if="peerStatus !== 'error' && peerStatus !== 'done'">{{ t(`views.import.categories.importing.title`) }}...</h2>

        <!-- Status: Connecting -->
        <div v-if="peerStatus === 'connecting'" class="status-box">
          <div class="spinner"></div>
          <Badge
              :text="`${getActionLabel('importing', 'finding')}...`"
              :color="BUTTON_COLORS.YELLOW"
              spacing="xs"
          />
        </div>

        <!-- Status: Tranferring -->
        <div v-if="peerStatus === 'transferring'" class="status-box">
          <div class="spinner"></div>
          <Badge
              :text="`${getActionLabel('importing', 'receiving')}...`"
              :color="BUTTON_COLORS.BLUE"
              spacing="xs"
          />
        </div>

        <!-- Status: Done -->
        <div v-if="peerStatus === 'done'" class="status-box">
          <Icon :icon="icons['user-smile-fill']" size="50px" :bgColor="BUTTON_COLORS.GREEN" padding="sm" style="border-radius: var(--radius-md)"  />
          <p>{{ getActionLabel('importing', 'done') }}!</p>

          <ActionButton
              tag="button"
              padding="lg"
              :title="t(`utils.back`)"
              @click="navigation.handleReturn"
          />
        </div>

        <!-- P2P Errors -->
        <div v-else-if="peerStatus === 'error'" class="card">
          <p class="error-message"> {{ peerError }} </p>

          <ActionButton
              tag="button"
              padding="lg"
              :title="t(`utils.back`)"
              @click="navigation.handleReturn"
          />
        </div>
      </section>

      <!-- Import Via Local File (JSON) -->
      <section v-else class="main-section center card">
        <!-- Import Completed -->
        <template v-if="importDone">
          <div class="flex flex-column align-center gap-1">
            <Icon :icon="icons['user-smile-fill']" size="50px" padding="sm" :bgColor="BUTTON_COLORS.GREEN" style="border-radius: var(--radius-md)" />
            <p>{{ getActionLabel('importing', 'done')}}!</p>

            <ActionButton
                tag="button"
                padding="lg"
                :title="t(`utils.back`)"
                @click="navigation.handleReturn"
            />
          </div>
        </template>

        <!-- Select Backup File Section -->
        <template v-else>
          <Icon
              :icon="icons['qr-scan-fill']"
              size="40px"
              padding="sm"
              :bgColor="BUTTON_COLORS.YELLOW"
              style="border-radius: var(--radius-md)"
          />

          <div class="section-title-container flex flex-column gap-05">
            <h2 class="section-title">{{ getCategoryTitle('localFile').title }}</h2>
            <p class="section-description text-muted">{{ getCategoryTitle('localFile').subtitle }}.</p>
          </div>

          <!-- Hidden File Input -->
          <input
              ref="fileInput"
              type="file"
              accept=".json,application/json"
              style="display: none"
              @change="handleFileSelect"
          />

          <!-- Trigger to File Input -->
          <ActionButton
              tag="button"
              padding="md"
              :title="isDexieImporting
                ? getActionLabel('localFile', 'restoring')
                : getActionLabel('localFile', 'selectFile')"
              :leftIcon="isDexieImporting
                ? ''
                : icons['folder-open-fill']"
              :aria-disabled="isDexieImporting"
              @click="triggerFileInput"
          />

          <!-- Errors -->
          <p v-if="dexieError" class="error-message"> {{ dexieError }} </p>
        </template>
      </section>
    </main>

    <AppFooter page="import" />
  </div>
</template>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }

  .section-title-container {
    text-align: center;
  }

  .status-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
  }

  .success-import p {
    font-weight: var(--bold-weight);
  }
  .success-import .icon-wrapper {
    background: var(--green-400);
    border-radius: var(--radius-xl);
  }
</style>

<script setup>
  import { computed, onMounted, ref, watch } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { PAGES } from "../constants/sysPages.js"
  import { BUTTON_COLORS } from "../constants/btnColors.js"

  import { useRoute } from "vue-router"
  import { useUtils } from "../composables/useUtils.js"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useDexieBackup } from "../composables/useDexieBackup.js"
  import { usePeerSync } from "../composables/usePeerSync.js"
  import { useI18n } from "vue-i18n"
  import { useNavigation } from "../composables/useNavigation.js"

  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import Icon from "../components/icons/Icon.vue"
  import ActionButton from "../components/buttons/ActionButton.vue"
  import Badge from "../components/common/Badge.vue"

  // COMPOSABLES
  const { t, te } = useI18n()
  const route = useRoute()
  const utils = useUtils()
  const snackbar = useSnackbar()
  const dexieBackup = useDexieBackup()
  const p2p = usePeerSync()
  const navigation = useNavigation()

  // STATES
  const fileInput = ref(null)
  const importDone = ref(false)

  // COMPUTED PROPERTIES
  const peerStatus = computed(() => p2p.peerStatus.value)
  const peerError = computed(() => p2p.peerError.value)
  const isDexieImporting = computed(() => dexieBackup.isImporting.value)
  const dexieError = computed(() => dexieBackup.error.value)
  const isSnackbarOpen = computed(() => snackbar.isActive.value)

  // FUNCTIONS
  const getActionLabel = (category, action) => {
    const key = `views.${PAGES.IMPORT}.categories.${category}.badges.${action}`

    return te(key) ? t(key) : ""
  }

  const getCategoryTitle = (category) => {
    const key = `views.import.categories.${category}`

    return {
      title: te(`${key}.title`) ? t(`${key}.title`) : "",
      subtitle: te(`${key}.subtitle`) ? t(`${key}.subtitle`) : "",
    }
  }

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
    if(hostPeerId) {
      p2p.connectToHostAndImport(hostPeerId)
    }
  })

  // WATCHERS
  watch([dexieBackup.error, p2p.peerError], ([newBackupError, newPeerError]) => {
    if (newBackupError) snackbar.open(newBackupError)

    if (newPeerError) snackbar.open(newPeerError)
  })
</script>
