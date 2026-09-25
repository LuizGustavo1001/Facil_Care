<template>
  <aside id="sidebar" class="flex flex-column gap-1 absolute overflow-auto fixed">
    <div class="brand-info flex gap-05 align-center">
      <Icon
          :icon="icons['logo-fill-colorful']"
          size="35px"
      />

      <h1 class="flex-grow-1 truncate-single">Facil Care</h1>
    </div>

    <div class="horizontal-line"></div>

    <div
        v-if="sidebar"
        class="sidebar-list flex flex-column gap-05 justify-between flex-grow-1"
    >
      <div class="flex-grow-1 flex flex-column gap-1">
        <section
            v-for="sec in sidebar.section"
            :key="sec.id"
            class="sidebar-list-item flex flex-column gap-05"
        >
          <h2 class="text-muted">{{ $t(`sidebar.sections.${sec.id}.title`) }}</h2>
          <nav>
            <router-link
                v-for="item in sec.items"
                :to="item.route"
                :key="item.id"
                class="sidebar-item flex align-center gap-05"
            >
              <Icon
                  v-if="item.icon"
                  :icon="item.icon"
                  size="25px"
              />

              <p class="truncate-single">{{ getSidebarItemTitle(sec, item) }}</p>
            </router-link>
          </nav>
        </section>
      </div>

      <!-- Delete Account Data Button -->
      <ActionButton
          v-if="patientData"
          tag="router"
          to="/erase"
          :leftIcon="icons['delete-bin-line']"
          variant="destructive"
          :title="$t(`utils.deleteAccount`)"
          padding="sm"
          class="btn"
      />
    </div>

    <div
        v-if="patientData"
        class="patient-info flex gap-05 align-center"
    >
      <Icon :icon="icons['user-smile-fill']" size="30px"></Icon>

      <div class="flex flex-column">
        <h1>{{ patientData.name }}</h1>
        <p>{{ age }} {{ $t("utils.years")}} • {{ patientData.bloodType }}</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
  #sidebar{
    z-index: 10;
    background: var(--color-bg-subtle);

    padding: var(--spacing-md);
    margin-inline: 0.5em;
    top: 0.5em;

    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border-default);

    height: calc(100dvh - 1em);
    width: 350px;
    max-width: 60dvw;

    transform: translateX(-120%);
    transition: transform 0.25s ease-out;
  }
  #sidebar.active{
    transform: translateX(0);
  }

  body.dark #sidebar{
    background: var(--color-bg-primary);
  }

  .brand-info h1{
    font-size: var(--text-heading-md);
  }

  .sidebar-list-item h2{
    font-size: var(--text-body-lg);
    text-transform: uppercase;
  }

  .sidebar-item{
    padding: var(--spacing-sm);
    color: inherit;
    border-radius: var(--radius-md);
    transition: 0.2s all;
  }
  .sidebar-item:hover{
    background: var(--color-bg-hover);
  }

  .sidebar-item .icon{
    color: var(--color-text-primary-muted)
  }
  .sidebar-item p{
    font-weight: var(--bold-weight);
    font-size: var(--text-heading-sm);
  }

  .patient-info{
    padding: var(--spacing-sm);
    border: 2px solid var(--color-border-default);
    border-radius: var(--radius-md);
  }
  .patient-info h1{
    font-size: var(--text-body-lg);
  }
  .patient-info p{
    font-size: var(--text-body-md);
  }
</style>

<script setup>
  import { computed } from "vue"
  import { sidebar } from "../../locales/projectConfig.js"
  import { icons } from "../../assets/icons/icons.js"
  import { useAge } from "../../composables/useAge.js"
  import { useI18n } from "vue-i18n"

  import ActionButton from "./ActionButton.vue"
  import Icon from "./Icon.vue"

  const props = defineProps({
    patientData: Object
  })

  const { t, te } = useI18n()

  const age = computed(() => {
    const { getAge } = useAge()
    return getAge(new Date(props.patientData.birthDate))
  })

  const getSidebarItemTitle = (section, item) => {
    const key = `sidebar.sections.${section.id}.items.${item.id}.title`

    return te(key) ? t(key) : ""
  }
</script>