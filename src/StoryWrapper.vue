<template>
  <div :class="$style.el">
    <slot />
  </div>
</template>

<style module lang="scss">
.el {
  font-family: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans',
    Arial, sans-serif;
  font-size: 100%;
  line-height: 1.6;
  padding: 24px;
}
</style>
