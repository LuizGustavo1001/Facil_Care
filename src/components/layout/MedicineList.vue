<template>
    <!-- Medicine List -->
    <ul v-if="props.medicineList.length > 0" class="medicine-list buttons-wrapper overflow-auto" key="medicine-list">
      <template
          v-for="medicine in props.medicineList"
          :key="medicine._id"
      >
        <!-- Medicine Item -->
        <li
            v-for="medicineSchedule in medicine.administrationTimes"
            :key="medicine._id + medicineSchedule"
            class="flex gap-05 align-center medicine"
        >
          <div class="flex-grow-1">
            <p class="truncate-single">
              <span class="bold-weight">{{ medicine.name }}</span>
              <span class="capitalize-words medium-weight"> ({{ utils.getRouteAdminLabel(medicine.routeAdmin) }})</span>
            </p>

            <p class="text-muted truncate-single">{{ medicine.observations }}</p>
          </div>

          <Badge :text="medicineSchedule" class="flex-shrink" :color="utils.getBadgeColor(medicineSchedule)" />
        </li>
      </template>
    </ul>

    <!-- Fallback -->
    <NotFoundCard v-else key="no-medicines" type="noMedicinesToday" size="medium" />
</template>

<style scoped>
  .medicine-list {
    max-height: 600px;
  }

  .medicine-list .medicine {
    padding: var(--spacing-md);
    background: var(--color-bg-subtle);
  }
</style>

<script setup lang="ts">
  import type { Medicine } from "../../interfaces/Medicine"
  import { useUtils } from "../../composables/useUtils"

  import Badge from "../common/Badge.vue"
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