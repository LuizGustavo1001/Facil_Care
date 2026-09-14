<template>
  <aside id="sidebar" class="flex flex-column gap-05 absolute overflow-auto">
    <div class="brand-info flex gap-05 align-center">
      <Icon :icon="icons['logo-fill-colorful']" size="35px"></Icon>

      <h1 class="flex-grow-1 truncate-single">Facil Care</h1>
    </div>

    <div class="horizontal-line"></div>

    <div
        v-if="sidebar"
        class="sidebar-list flex flex-column gap-05 justify-between flex-grow-1"
    >
      <div class="flex-grow-1 flex flex-column gap-1">
        <nav
            v-for="sec in sidebar.section"
            :key="sec.id"
            class="sidebar-list-item flex flex-column gap-05"
        >
          <h2 class="text-muted">{{ $t(`sidebar.sections.${sec.id}.title`) }}</h2>
          <ul>
            <li
                v-for="item in sec.items"
                :key="item.id"
                class="item"
            >
              <ActionButton
                  tag="router"
                  :leftIcon="item.icon"
                  variant="transparent"
                  :title="$t(`sidebar.sections.${sec.id}.items.${item.id}.title`)"
                  padding="sm"
                  class="truncate-single"
                  :to="item.route"
              />
            </li>
          </ul>
        </nav>
      </div>

      <ActionButton
          tag="button"
          :leftIcon="icons['delete-bin-line']"
          variant="destructive"
          title="Apagar Dados"
          padding="sm"
          class="btn"
      />
    </div>

    <div class="patient-info flex gap-05 align-center">
      <Icon :icon="icons['user-smile-fill']" size="30px"></Icon>

      <div class="flex flex-column">
        <h1>Antônio  Dias</h1>
        <p>73 anos •  O-</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
  aside{
    z-index: 10;
    background: var(--color-bg-primary);

    position: fixed;

    margin-inline: 0.5em;
    top: 0.5em;

    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border-default);

    padding: var(--spacing-md);

    height: calc(100dvh - 1em);
    width: 350px;
    max-width: 60dvw;

    transform: translateX(-120%);

    transition: transform 0.25s ease-out;
  }
  aside.active{
    transform: translateX(0);
  }

  .brand-info h1{
    font-size: var(--text-heading-md);
  }

  .sidebar-list-item h2{
    font-size: var(--text-body-lg);
    text-transform: uppercase;
  }

  .patient-info{
    padding: var(--spacing-sm);
    border: 1px solid var(--color-border-default);
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
  import Icon from "./common/Icon.vue"
  import {icons} from "../assets/icons/icons.js"
  import ActionButton from "./common/ActionButton.vue"

  import { sidebar } from "../locales/projectConfig.js"
</script>