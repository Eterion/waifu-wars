<template>
  <ul :class="$style.el">
    <li>
      <RouterLink to="/about" :class="$style.link">About</RouterLink>
    </li>
  </ul>
</template>

<style module lang="scss">
.el {
  align-items: center;
  column-gap: 24px;
  display: flex;
  font-size: 0.9375rem;
  list-style: none;
  padding: 0;
}

.link {
  color: var(--text);
  text-decoration: none;

  &:hover,
  &:global(.router-link-exact-active) {
    color: var(--primary-text);
  }
}
</style>
