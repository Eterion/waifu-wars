<script setup lang="ts">
import { logEvent } from 'histoire/client';
import { alert } from './alert';

async function showDefaultAlert() {
  logEvent(
    'close',
    await alert(
      'Well known, famous actress, who is currently on hiatus. Because her life had always revolved around her work in entertainment, she remains isolated at school.',
      { title: 'Alert Message' },
    ),
  );
}

async function showDangerAlert() {
  logEvent(
    'close',
    await alert(
      'Well known, famous actress, who is currently on hiatus. Because her life had always revolved around her work in entertainment, she remains isolated at school.',
      { danger: true, title: 'Alert Message' },
    ),
  );
}
</script>

<template>
  <Story>
    <Variant title="Default">
      <button type="button" @click="showDefaultAlert">Alert</button>
    </Variant>
    <Variant title="Danger">
      <button type="button" @click="showDangerAlert">Alert</button>
    </Variant>
  </Story>
</template>
