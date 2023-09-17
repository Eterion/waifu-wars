<script setup lang="ts">
import BaseButton from './BaseButton.vue';
</script>

<template>
  <Story>
    <Variant title="Default">
      <BaseButton>Button</BaseButton>
    </Variant>
    <Variant title="Primary">
      <BaseButton primary>Button</BaseButton>
    </Variant>
    <Variant title="Danger">
      <BaseButton danger>Danger</BaseButton>
    </Variant>
  </Story>
</template>
