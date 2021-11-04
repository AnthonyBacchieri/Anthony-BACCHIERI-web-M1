<template>
  <div id="app">
    <md-menu md-direction="bottom-start" :mdCloseOnClick="true">
      <md-button md-menu-trigger>Navigation</md-button>

      <md-menu-content>
        <md-menu-item> <router-link to="/">Liste des restaurants</router-link></md-menu-item>
        <md-menu-item> <router-link to="/restaurants/">Détail</router-link></md-menu-item>
      </md-menu-content>
    </md-menu>
    <router-view> </router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  
}
</style>
