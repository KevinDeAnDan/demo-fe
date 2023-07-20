<template>
  <nav class="navbar container-fluid border-bottom shadow-sm  " style="height: 150px; background-color: rgba(15,60,117,1)">
    <div class="position-absolute top-5 start-50 translate-middle text-white" style="width: 350px;">
     <a>Vương Ngọc Hải, Báo cáo trạm - Tháng 4</a>
    </div>
  <!-- As a heading -->
    <select  class="position-absolute bottom-0 start-50 translate-middle mb-3" aria-label=".form-select-sm example" style="width: 340px; height: 30px">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
</nav>
</template>

<script>
export default {
  name: "HeaderCom",
  compatConfig: { MODE: 3 }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  position: sticky;
  top: 0;
}
a{
  size: 10px
}
</style>
