<template>
  <div id = "app">
    <HeaderCom />
    <JumbotronL />
    <FooterA />

  </div>
</template>

<script>
// @ is an alias to /src
import HeaderCom from "./components/Headercom.vue";
import JumbotronL from "./components/JumbotronL.vue";
import FooterA from "./components/FooterA.vue";

export default {
  name: 'App',
  components: {
    HeaderCom,
    JumbotronL,
    FooterA,
  },
  data(){
    return{

    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
