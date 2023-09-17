<script setup lang="ts">
import { logEvent } from 'histoire/client';
import { confirm } from './confirm';

async function showDefaultConfirm() {
  logEvent('confirm', [
    await confirm(
      'Well known, famous actress, who is currently on hiatus. Because her life had always revolved around her work in entertainment, she remains isolated at school.',
      { title: 'Confirm Message' },
    ),
  ]);
}

async function showDangerConfirm() {
  logEvent('confirm', [
    await confirm(
      'Well known, famous actress, who is currently on hiatus. Because her life had always revolved around her work in entertainment, she remains isolated at school.',
      { danger: true, title: 'Confirm Message' },
    ),
  ]);
}
</script>

<template>
  <Story>
    <Variant title="Default">
      <button type="button" @click="showDefaultConfirm">Confirm</button>
    </Variant>
    <Variant title="Danger">
      <button type="button" @click="showDangerConfirm">Confirm</button>
    </Variant>
  </Story>
</template>
