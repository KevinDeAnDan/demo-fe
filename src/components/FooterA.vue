<template>
   <div class="card-footer text-body-secondary container-fluid border-top shadow-sm ">
    <button class="btn btn-primary position-absolute bottom-0 start-50 translate-middle" type="submit">Hoàn thành</button>
  </div>
</template>
  
<script>
export default {
  name: 'FooterA',
 
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-footer{
    background-color: #ffffff;
    position:fixed;
    bottom:0;
    height: 70px;
    /* z-index: 2;
    position: relative; */
  }
  button{
  border-radius: 25px;
  }
</style>
