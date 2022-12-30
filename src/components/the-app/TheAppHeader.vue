<template>
  <header>
    <h1 :class="$style.title">
      Waifu Wars
      <span :class="$style.beta">Beta</span>
    </h1>
    <p>
      We all have our favorite waifus. And of course we can scientifically prove
      it by comparing them to inferior trash.
    </p>
  </header>
</template>

<style module lang="scss">
@use 'open-color/open-color' as *;

.title {
  font-size: 2rem;
  margin-bottom: 0.375rem;
}

.beta {
  background-color: transparent;
  border: 1px solid currentColor;
  border-radius: 21px;
  color: $oc-orange-6;
  font-size: 16px;
  font-weight: normal;
  padding: 6px 12px;
  vertical-align: middle;
}
</style>
