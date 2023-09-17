<script setup lang="ts">
import { logEvent } from 'histoire/client';
import KeyButton from './KeyButton.vue';
</script>

<template>
  <Story>
    <KeyButton event-key="Esc" @click="logEvent('click', $event)">
      Close
    </KeyButton>
  </Story>
</template>
