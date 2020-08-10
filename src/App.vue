<template>
  <div id="app">
    <div id="nav" style="color: #42b983; font-weight: bold; font-size: 120%">
      <router-link to="/"></router-link>MLB Pitchers' Analysis
    </div>
    <router-view/>
  </div>
</template>

<!-- When you add batters page, this will be a reference.
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Pichters</router-link> |
      <router-link to="/batters">Batters</router-link>
    </div>
    <router-view/>
  </div>
</template>
-->

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
