<template>
    <!-- Medicine List -->
    <ul
        v-if="props.medicineList.length > 0"
        class="medicine-list buttons-wrapper overflow-auto"
        key="medicine-list"
    >
      <!-- Medicine Item -->
      <li
          v-for="medicine in props.medicineList"
          :key="`${medicine.medicineId}-${medicine.scheduledWeekDay}-${medicine.scheduledTime}`"
          class="flex gap-05 align-center medicine"
      >
        <div class="flex-grow-1 flex align-center gap-05">
          <CheckBox
              :modelValue="!!medicine.administeredAt"
              @change="handleCheckEvent(medicine.medicineId, medicine.scheduledWeekDay, medicine.scheduledTime)"
          />

          <div class="flex flex-column">
            <p class="truncate-single">
              <span class="bold-weight">{{ medicine.name }}</span>
              <span class="capitalize-words medium-weight">
                ({{ utils.getRouteAdminLabel(medicine.routeAdmin) }})
              </span>
            </p>

            <p class="text-muted truncate-single">{{ medicine.observations }}</p>
          </div>
        </div>

        <Badge
            :text="medicine.scheduledTime"
            class="flex-shrink"
            :color="utils.getBadgeColor(medicine.scheduledTime)"
        />
      </li>
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
    font-size: var(--font-button-description);
  }
</style>

<script setup lang="ts">
  import type { FormattedMedicine } from "../../interfaces/IMedicine"
  import { useUtils } from "../../composables/useUtils"

  import WeeklyMedicineScheduleController from "../../controllers/WeeklyMedicineScheduleController"

  import Badge from "../common/Badge.vue"
  import NotFoundCard from "../feedback/NotFoundCard.vue"
  import CheckBox from "../inputs/CheckBox.vue"

  // COMPOSABLES
  const utils = useUtils()

  // CONTROLLERS
  const weeklyScheduleController = new WeeklyMedicineScheduleController()

  // TYPES & INTERFACES
  interface Props {
    medicineList: FormattedMedicine[]
  }

  // PROPS
  const props = defineProps<Props>()

  const handleCheckEvent = async (medicineId: number, scheduledWeekDay: number, scheduledTime: string): Promise<void> => {
    await weeklyScheduleController.toggleAdministration(medicineId, scheduledWeekDay, scheduledTime)
  }
</script>