<template>
  <div id = "app">
    <HeaderCom />
    <JumbotronL />
    <CheckPt @picture-taken="imageSrc=$envent" />
    <FooterA />
    <img :src="imageSrc" />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderCom from "./components/Headercom.vue";
import JumbotronL from "./components/JumbotronL.vue";
import CheckPt from "./components/CheckPt.vue";
import FooterA from "./components/FooterA.vue";

export default {
  name: 'App',
  components: {
    HeaderCom,
    JumbotronL,
    CheckPt,
    FooterA,
  },
  data(){
    return{
      ImageSrc: null
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
