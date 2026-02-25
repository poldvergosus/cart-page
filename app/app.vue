<template>
  <div>
    <AppHeader />
    <NuxtPage />
  </div>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: rgb(255, 255, 255);
  color: #333;
  line-height: 1.5;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

img {
  max-width: 100%;
  display: block;
}
</style>