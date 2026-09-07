<template>
  <span class="flex gap-1">
    <IconBtnAlt
        :icon="icons['menu-left']"
        tag="button"
    />

    <Icon :icon="icons.add" :have-padding="true" size="35px" />
  </span>

  <span class="flex gap-1">
    <IconBtn :icon="icons['logo-fill']" variant="highlight" padding="lg"/>
    <IconBtn :icon="icons['first-aid-fill']" variant="transparent"/>
    <IconBtn :icon="icons['logo-fill-colorful']" variant="border" padding="sm"/>
    <IconBtn :icon="icons.zzz" variant="bg-clr"/>
  </span>

  <span class="flex gap-1">
    <Input
      label="Nome de Usuário"
      id="inputName"
      inputType="text"
      name="name"
      v-model="inputTest"
    />

    <SelectInput
      label="Opções"
      id="optionsSelect"
      name="options"
      :options="{ SP: 'São Paulo', RJ: 'Rio de Janeiro', MG: 'Minas Gerais' }"
      v-model="selectTest"
    />

    <TextArea
      label="Observações"
      id="textArea"
      name="textArea123"
      v-model="textAreaTest"
      placeholder="Exemplo: Paciente comendo normalmente"
    />
  </span>

  <p> {{ inputTest }}</p>
  <p> {{ selectTest }}</p>

  <span class="flex gap-1 flex-column">
    <SnackBar>
      <template #message>
        Lorem ipsum dolor sit amet, consec
      </template>
    </SnackBar>

    <SnackBar variant="error">
      <template #message>
        Lorem ipsum dolor sit amet, consec
      </template>
    </SnackBar>

    <SnackBar variant="warning">
      <template #message>
        Lorem ipsum dolor sit amet, consec
      </template>
    </SnackBar>

    <SnackBar variant="info">
      <template #message>
        Lorem ipsum dolor sit amet, consec
      </template>
    </SnackBar>
  </span>

  <span class="flex gap-1 flex-column">
    <ActionButtonAlt tag="button" :leftIcon="icons['cake-line']" :rightIcon="icons['chevron-right']">
        <template #title>
          Data de Nascimento
        </template>

      <template #description>
        19/03/1953 (73 anos)
      </template>
    </ActionButtonAlt>

    <ActionButtonAlt tag="button" :leftIcon="icons['cake-line']" :rightIcon="icons['chevron-right']" color="orange">
        <template #title>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur beatae corporis delectus dignissimos, ea eligendi incidunt itaque reiciendis veniam. Aspernatur autem fuga laudantium, mollitia odit recusandae voluptate voluptatibus voluptatum?
        </template>

      <template #description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam dolorum eaque, eius eos et eveniet fugit labore neque nihil, obcaecati praesentium repellendus suscipit, tempore totam? Beatae illum iste magni?
      </template>
    </ActionButtonAlt>

    <ActionButtonAlt tag="button" :leftIcon="icons['cake-line']" :rightIcon="icons['chevron-right']" color="red">
        <template #title>
          Data de Nascimento
        </template>

      <template #description>
        19/03/1953 (73 anos)
      </template>
    </ActionButtonAlt>

    <ActionButtonAlt tag="button" :leftIcon="icons['cake-line']" :rightIcon="icons['chevron-right']" color="green">
        <template #title>
          Data de Nascimento
        </template>

      <template #description>
        19/03/1953 (73 anos)
      </template>
    </ActionButtonAlt>
  </span>

  <ActionButton tag="button" :leftIcon="icons['capsule-line']" :rightIcon="icons['chevron-right']" right-icon-size="20px" padding="lg"  variant="highlight">
    <template #title>
      Marina Souza
    </template>

    <template #description>
      <span class="info-item">Telefone: (DD) 9XXXX-XXXX</span>
      <span class="info-item">Desde: 15/01/2026</span>
    </template>
  </ActionButton>

  <ActionButton tag="button" :leftIcon="icons['capsule-line']" :rightIcon="icons['chevron-right']" right-icon-size="20px" padding="lg" variant="transparent">
    <template #title>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, ipsam, libero! A, assumenda doloremque minus modi nam nisi nobis quaerat quasi qui reprehenderit! Aut dicta ducimus ea harum. Minima, vero?
    </template>

    <template #description>
      <span class="info-item">Telefone: (DD) 9XXXX-XXXX</span>
      <span class="info-item">Desde: 15/01/2026</span>
    </template>
  </ActionButton>

  <ActionButton tag="button" :leftIcon="icons['capsule-line']" :rightIcon="icons['chevron-right']" right-icon-size="20px" padding="lg" variant="subtle">
    <template #title>
      Marina Souza
    </template>

    <template #description>
      <span class="info-item">Telefone: (DD) 9XXXX-XXXX</span>
      <span class="info-item">Desde: 15/01/2026</span>
    </template>
  </ActionButton>

  <ActionButton tag="button" :leftIcon="icons['capsule-line']" :rightIcon="icons['chevron-right']" right-icon-size="20px" padding="lg" variant="destructive">
    <template #title>
      Marina Souza
    </template>

    <template #description>
      <span class="info-item">Telefone: (DD) 9XXXX-XXXX</span>
      <span class="info-item">Desde: 15/01/2026</span>
    </template>
  </ActionButton>

  <h1>{{ test.test_value }}</h1>
  <p>{{ $t("ptbr_test.a") }}</p>
</template>

<style scoped>

</style>

<script setup>
  import { icons } from "../assets/icons/icons.js"
  import IconBtnAlt from "../components/common/IconBtnAlt.vue"
  import Icon from "../components/common/Icon.vue"

  import { test } from "../locales/projectConfig.js"
  import ActionButton from "../components/common/ActionButton.vue";
  import IconBtn from "../components/common/IconBtn.vue";
  import ActionButtonAlt from "../components/common/ActionButtonAlt.vue";
  import SnackBar from "../components/common/SnackBar.vue";
  import Input from "../components/common/Input.vue";
  import {ref} from "vue";
  import SelectInput from "../components/common/SelectInput.vue";
  import TextArea from "../components/common/TextArea.vue";

  const inputTest = ref('')
  const selectTest = ref('')
  const textAreaTest = ref('')
</script>