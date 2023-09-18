<script setup lang="ts">
import { logEvent } from 'histoire/client';
import BaseButton from './BaseButton.vue';
</script>

<template>
  <Story>
    <Variant title="Default">
      <BaseButton @click="logEvent('click', $event)">Button</BaseButton>
    </Variant>
    <Variant title="Primary">
      <BaseButton primary @click="logEvent('click', $event)">Button</BaseButton>
    </Variant>
    <Variant title="Danger">
      <BaseButton danger @click="logEvent('click', $event)">Danger</BaseButton>
    </Variant>
  </Story>
</template>
