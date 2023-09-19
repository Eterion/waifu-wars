<script setup lang="ts">
import { logEvent } from 'histoire/client';
import KeyButton from './KeyButton.vue';
</script>

<template>
  <Story>
    <KeyButton event-key="Escape" @event="logEvent('event', $event)">
      Close
    </KeyButton>
  </Story>
</template>
