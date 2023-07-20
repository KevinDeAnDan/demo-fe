<template>
  <div class="row gx-5">
    <div class="col">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1"> OK </label></div>
  <div class="col">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
  <label class="form-check-label" for="flexRadioDefault2"> NOK </label></div>
</div>
  <div>
    <video ref="video" @camplay="initCanvas()"> Stream </video>
    <button> Take picture</button>
    <canvas ref="canvas" style="display: none;" />
  </div>
  <input>
</template>

<script>
export default {
  name: 'CheckPt',
  mounted(){
    this.canvas = this.$refs.canvas
    this.video = this.$refs.video
    this.startCapture()
  },
  methods: {
    startCapture(){
      navigator.mediaDevices.getUserMedia({video:true, audio:false}).then(stream =>{
        this.video.srcObject = stream
        this.video.play()
      }).catch(error =>{
        console.log(error)
      })
    },
    takePicture(){
      let context = this.canvas.getContext('2d')
      context.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight)
      this.$emit('picture-taken', this.canvas.toDataURL('image/png'))
    },
    initCanvas(){
      this.canvas.setAttribute('width:', this.video.videoWidth)
      this.canvas.setAttribute('height', this.video.videoHeight)
    }
  },
  data(){
    return{
      imageSrc: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .checkRadio{
    margin: 5 0;
  }
  video{
    height: 200px;
    width: 200px;
    margin-left: 40%;
  }

</style>
