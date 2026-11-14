<template>
  <template v-if="medicineList.length > 0">
    <!-- Medicine List -->
    <ul class="medicine-list buttons-wrapper overflow-auto" style="max-height: 600px">
      <template
          v-for="medicine in medicineList"
          :key="medicine._id"
      >
        <!-- Medicine Item -->
        <li
            v-for="medicineSchedule in medicine.administrationTimes"
            :key="medicine._id + medicineSchedule"
            class="flex gap-05 align-center medicine"
        >
          <Badge :text="medicineSchedule" class="flex-shrink" :color="utils.getBadgeColor(medicineSchedule)" />

          <div class="flex-grow-1">
            <p class="truncate-single">
              <span class="bold-weight">{{ medicine.name }}</span>
              <span class="capitalize-words medium-weight"> ({{ utils.getRouteAdminLabel(medicine.routeAdmin) }})</span>
            </p>

            <p class="text-muted truncate-single">
              {{ medicine.observations }}
            </p>
          </div>
        </li>
      </template>
    </ul>

    <!-- Add New Medicine Button -->
    <ActionButton
        :tag="BUTTON_TAGS.ROUTER"
        :to="pages[PAGES.MEDICINES].href"
        :rightIcon="icons['add']"
        :title="utils.getTranslate(`views.${PAGES.HOME}.newMedicine`)"
        :padding="PADDING_SIZE.SMALL"
        :align-center="true"
        style="
          align-self: flex-end;
          width: fit-content;
        "
    />
  </template>

  <!-- Fallback -->
  <NotFoundCard v-else type="noMedicinesToday" size="medium" />
</template>

<style scoped>
  .medicine-list .medicine {
    padding: var(--spacing-md);
    background: var(--color-bg-subtle);
  }
</style>

<script setup lang="ts">
  import { BUTTON_TAGS } from "../../constants/components/buttons"
  import { PAGES } from "../../constants/sysPages"
  import { PADDING_SIZE } from "../../constants/paddindSizes"

  import { pages } from "../../locales/projectConfig"
  import { icons } from "../../assets/icons/icons"

  import type { Medicine } from "../../interfaces/Medicine"
  import { useUtils } from "../../composables/useUtils"

  import Badge from "../common/Badge.vue"
  import ActionButton from "../buttons/ActionButton.vue"
  import NotFoundCard from "../feedback/NotFoundCard.vue"

  // COMPOSABLES
  const utils = useUtils()

  // TYPES & INTERFACES
  interface Props {
    medicineList: Medicine[]
  }

  // PROPS
  const props = defineProps<Props>()
</script>