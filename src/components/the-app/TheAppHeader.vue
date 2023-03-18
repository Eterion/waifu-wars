<script setup lang="ts">
import TheAppNav from './TheAppNav.vue';
import TheAppSocial from './TheAppSocial.vue';
</script>

<template>
  <Teleport to="body">
    <header :class="$style.el">
      <div :class="$style.content">
        <div>
          <RouterLink to="/" :class="$style.title">
            Waifu Wars
            <span :class="$style.beta">beta</span>
          </RouterLink>
        </div>
        <div :class="$style.nav">
          <TheAppNav />
          <span :class="$style.divider" />
          <TheAppSocial />
        </div>
      </div>
    </header>
  </Teleport>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.el {
  background-color: var(--foreground);
  border-bottom: 1px solid var(--border);
  box-sizing: content-box;
  height: var(--app-header-height);
  position: fixed 0 0 false 0;
}

.content {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: false auto;
  max-width: var(--app-max-width);
  padding: false 36px;
}

.title {
  color: inherit;
  display: inline-block;
  font-size: 1.25rem;
  font-weight: semibold;
  text-decoration: none;
}

.beta {
  background-color: $oc-orange-6;
  border-radius: 20px;
  color: $oc-white;
  display: inline-block;
  font-size: 0.75rem;
  font-weight: normal;
  padding: 1px 6px;
  vertical-align: top;
}

.nav {
  align-items: center;
  align-self: stretch;
  column-gap: 24px;
  display: flex;
}

.divider {
  background-color: var(--border-light);
  border-radius: 1px;
  display: block;
  height: 50%;
  width: 1px;
}
</style>
