<script setup lang="ts">
import NetworkError from './NetworkError.vue';
</script>

<template>
  <Story>
    <NetworkError
      :error="{
        clientErrors: [],
        extraInfo: null,
        graphQLErrors: [],
        message: 'An unknown error occured.',
        name: 'Network Error',
        networkError: null,
        protocolErrors: [],
      }" />
  </Story>
</template>
