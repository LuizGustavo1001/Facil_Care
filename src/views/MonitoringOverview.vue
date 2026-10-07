<template>
  <div class="view regular">
    <template v-if="pageExists(currentCategory)">
      <AppOverlay />

      <ConfirmPopup
          :isOpen="isConfirmOpen"
          :popupRef="confirmPopup.popupRef"
          :title="confirmTitle"
          :message="confirmMessage"
          @cancel="confirmPopup.close"
          @confirm="confirmPopup.handleConfirm"
      />

      <Snackbar
          :isActive="isSnackbarOpen"
          :message="snackbar.data.message"
          :type="snackbar.data.type || undefined"
          @click="snackbar.clear"
      />

      <AppHeader
          :title="utils.getPageTitle(currentType)"
          :leftBtnIcon="icons['chevron-left']"
          @return-page="navigation.handleReturn"
      />

      <main class="main regular gap-2">
        <section class="main-section regular gap-1">
          <ul v-if="formattedData.length > 0" class="list flex flex-column gap-1">
            <li v-for="item in formattedData" :key="item._id" class="flex align-center gap-05">

              <div class="item-info flex flex-column gap-03 flex-grow-1">
                <h2>{{ item.value }}</h2>
                <p class="text-muted">{{ item.description }}</p>
              </div>

              <IconBtn
                  :icon="icons['delete-bin-line']"
                  variant="destructive"
                  @click.stop="handleDelete(item)"
              />
            </li>
          </ul>

          <NotFoundCard v-else class="main-section center"/>
        </section>
      </main>

      <AppFooter :page="currentType" />
    </template>

    <template v-else>
      <AppFallback />
    </template>
  </div>
</template>

<style scoped>
  .item-info{
    padding: var(--spacing-lg);
    background: var(--color-bg-subtle);

    border-radius: var(--radius-lg);
  }

  .item-info h2{
    font-size: var(--text-heading-md);
    font-weight: var(--bold-weight);
  }
  .item-info p{
    font-size: var(--text-body-md);
    font-weight: var(--medium-weight);
  }
</style>

<script setup>
  import { computed, onMounted, ref } from "vue"
  import { icons } from "../assets/icons/icons.js"

  import { PAGES, VITAL_SIGNS_PAGES, FOLLOW_UPS_PAGES } from "../locales/projectConfig.js"

  import { useRoute } from "vue-router"
  import { useI18n } from "vue-i18n"

  import { useNavigation } from "../composables/useNavigation.js"
  import { useDate } from "../composables/useDate.js"
  import { useUtils } from "../composables/useUtils.js"
  import { useSnackbar } from "../composables/useSnackbar.js"
  import { useConfirmPopup } from "../composables/useConfirmPopup.js"

  import AppHeader from "../components/layout/AppHeader.vue"
  import AppFallback from "./AppFallback.vue"
  import Snackbar from "../components/feedback/Snackbar.vue"
  import AppFooter from "../components/layout/AppFooter.vue"
  import NotFoundCard from "../components/feedback/NotFoundCard.vue"
  import IconBtn from "../components/buttons/IconBtn.vue"
  import ConfirmPopup from "../components/layout/popup/ConfirmPopup.vue"
  import AppOverlay from "../components/layout/AppOverlay.vue"

  import VitalSignsController from "../controllers/VitalSignsController.js"
  import FollowUpsController from "../controllers/FollowUpsController.js"

  // COMPOSABLES
  const { t } = useI18n()
  const route = useRoute()
  const confirmPopup = useConfirmPopup()
  const snackbar = useSnackbar()
  const navigation = useNavigation()
  const date = useDate()
  const utils = useUtils()

  // COMPUTED PROPERTIES
  const isSnackbarOpen = computed(() => snackbar.isActive.value)

  const isConfirmOpen = computed(() => confirmPopup.isOpen.value)
  const confirmTitle = computed(() => confirmPopup.title.value)
  const confirmMessage = computed(() => confirmPopup.message.value)

  // Returns selected monitoring type (Vital Sign or Follow Up)
  const currentCategory = computed(() => {
    return route.params.category || null
  })

  // Returns selected monitoring type item
  const currentType = computed(() => {
    return route.params.type || null
  })

  // FUNCTIONS
  // Verify if selected monitoring overview page exists
  const pageExists = () => {
    if(currentCategory.value === PAGES['FOLLOW_UPS']){
      return FOLLOW_UPS_PAGES.includes(currentType.value)
    }

    if(currentCategory.value === PAGES['VITAL_SIGN']){
      return VITAL_SIGNS_PAGES.includes(currentType.value)
    }

    return false
  }

  const handleDelete = async (item) => {
    const titleSlot = computed(() => {
      return currentCategory.value === "vitalSigns" ? t(`utils.vitalSign`) : t(`utils.followUp`)
    })

    const title = t(`confirmPopupTemplates.deleteConfirm.title`, { item: titleSlot.value.toLowerCase() }) + "?"
    confirmPopup.open(title, null, () => handleDeleteConfirmed(item))
  }

  const handleDeleteConfirmed = async (item) => {
    let result = null

    if(currentCategory.value === "vitalSigns"){
      result = await vitalSignsController.removeRecordById(item.id, currentType.value)
    }else if(currentCategory.value === "followUps"){
      result = await followUpsController.removeRecordById(item.id, currentType.value)
    }

    if(result && result.success){
      monitoringData.value = result.data

      // Formatting result
      setFormattedData(result.data)

      snackbar.open(result.code)
    }else if(result){
      snackbar.open(result.code)
    }
  }

  /**
   * Formats the database data into information to be displayed on the screen
   *
   * @param { Object | Array } result - Database query result
   **/
  const setFormattedData = (result) => {
    formattedData.value = []

    for(const item of result){
      const formattedDate = item.dateTime ? date.getFormatted(new Date(item.dateTime)) : null
      const descriptionParts = [item.caregiverName, formattedDate].filter(Boolean)
      const unitText = item.unit ? item.unit : ''

      formattedData.value.push({
        id: item._id,
        value: `${item.value}${unitText ? ` ${unitText}` : ''}`.trim(),
        description: descriptionParts.join(' • '),
        observation: item.observation || '',
        type: item.record
      })
    }
  }

  // CONTROLLERS
  const vitalSignsController = new VitalSignsController()
  const followUpsController = new FollowUpsController()

  const monitoringData = ref([])
  const formattedData = ref([])

  // MOUNTED || UNMOUNTED
  onMounted(async () => {
    let result = []

    switch(currentCategory.value){
      case PAGES['FOLLOW_UPS']:
        result = await followUpsController.getByField(currentType.value)
        break
      case PAGES['VITAL_SIGN']:
        result = await vitalSignsController.getByField(currentType.value)
        break
    }

    if (result.success) {
      monitoringData.value = result.data
    } else {
      snackbar.open(result.code)
    }

    // Formatting result
    setFormattedData(result.data)
  })
</script>