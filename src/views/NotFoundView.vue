<template>
  <div :class="$style.el">
    <div :class="$style.content">
      <h1 :class="$style.title">404</h1>
      <p>Looks like we can't find the page you're looking for.</p>
      <div><RouterLink to="/">Go Home</RouterLink></div>
    </div>
  </div>
</template>

<style module lang="scss">
.el {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 64px;
}

.content {
  max-width: 860px;
  text-align: center;
}

.title {
  font-family: Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium',
    'Nimbus Sans Narrow', sans-serif-condensed, sans-serif;
  font-size: 4rem;
  line-height: 1;
  margin-bottom: 6px;
}
</style>
