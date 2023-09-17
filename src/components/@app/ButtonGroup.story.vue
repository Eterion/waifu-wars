<script setup lang="ts">
import BaseButton from '../@base/button/BaseButton.vue';
import ButtonGroup from './ButtonGroup.vue';
</script>

<template>
  <Story>
    <ButtonGroup>
      <BaseButton primary>Save</BaseButton>
      <BaseButton>Cancel</BaseButton>
    </ButtonGroup>
  </Story>
</template>
