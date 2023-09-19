<template>
  <div :class="$style.el">
    <slot />
  </div>
</template>

<style module lang="scss">
.el {
  background-color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-light);
  display: inline-flex;
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas,
    'DejaVu Sans Mono', monospace;
  font-size: 0.8125rem;
  padding: 3px 8px;
}
</style>
