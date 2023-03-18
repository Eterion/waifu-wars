<template>
  <ul :class="$style.el">
    <li>
      <a href="" :class="$style.link" @click.prevent>Create</a>
    </li>
    <li>
      <a href="" :class="$style.link" @click.prevent>Share</a>
    </li>
    <li>
      <a href="" :class="$style.link" @click.prevent>About</a>
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
  &:hover {
    color: var(--primary-text);
  }
}
</style>
