<template>
  <div id="app">
    <div v-for="(g, index) in gets" v-bind:key="index">
      <div
        class="d-flex justify-content-between align-items-center p-2 m-2 rounded-2 slide-down"
        :class="{ activeRed: activeIndex === index && activeRadio[index] === 0, activeBlue: activeIndex === index && activeRadio[index] !== 0}"
        type="button"
        data-bs-toggle="collapse"
        aria-expanded="false"
        aria-controls="collapseExample"
        @click="toggleCollapse(g.index)"
      >
        <span class="textSum">{{ g.index }}. {{ g.summary }}</span>
        <img
          class="icon-chat"
          src="https://img.icons8.com/color/48/speech-bubble-with-dots.png"
        />
        <img
          class="icon-img"
          src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-image-web-flaticons-flat-flat-icons-2.png"
        />
      </div>
      <div :class="['collapse', { show: expandedIndex === g.index }]">
        <div v-for="(p, pIndex) in selectRadios" :key="pIndex">
          <input type="radio" :id="'radio-' + index + '-' + pIndex" name="fav_language" value="p.name" :checked="activeRadio[index] === pIndex" @change="handleRadioChange(index, pIndex)"/>
          <label :for="'radio-' + index + '-' + pIndex" @change="changeColor(p.index)" >{{
            p.name
          }}</label>
        </div>
        <div class="camera-box">
          <div class="camera-box-icon">
            <img
              style="height: 80px"
              v-if="isCameraOpen"
              src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
              class="button-img camera-shoot"
              @click="capture"
            />
            <div class="camera-button">
              <button
                type="button"
                class="button is-rounded cam-button"
                @click="toggleCamera"
              >
                <span v-if="!isCameraOpen"
                  ><img
                    style="height: 80px"
                    class="button-img"
                    src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png"
                /></span>
                <span v-else
                  ><img
                    style="height: 45px"
                    class="button-img"
                    src="https://img.icons8.com/material-outlined/50/000000/cancel.png"
                /></span>
              </button>
            </div>
          </div>
          <div style="height: 200px">
            <div v-if="isCameraOpen" class="camera-canvas">
              <video
                ref="camera"
                :width="canvasWidth"
                :height="canvasHeight"
                autoplay
              ></video>
              <canvas
                v-show="false"
                id="photoTaken"
                ref="canvas"
                :width="canvasWidth"
                :height="canvasHeight"
              ></canvas>
            </div>
          </div>
          <vue-picture-swipe :items="items"></vue-picture-swipe>
        </div>
        <div class="px-2">
          <input
            type="text"
            ng-model="inputText"
            class="form-control"
            placeholder="Ghi chú"
          />
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
window.axios = axios;
import VuePictureSwipe from "vue-picture-swipe";
export default {
  components: {
    VuePictureSwipe,
  },
  name: "JumbotronL",
  data() {
    return {
      isCameraOpen: false,
      expandedIndex: null,
      canvasHeight: 300,
      canvasWidth: 250,
      activeIndex: -1,
      activeRadio: [],
      selectRadios: [
        {
          id: 1,
          name: "OK",
        },
        {
          id: 2,
          name: "NOK",
        },
      ],
      gets: [],
      items: [],
    };
  },
  methods: {
    toggleCollapse(index) {
      if (this.expandedIndex === index) {
        this.expandedIndex = null;
      } else {
        this.expandedIndex = index;
      }
    },
    handleRadioChange(parentIndex, radioIndex) {
      this.activeIndex = parentIndex;
      this.activeRadio[parentIndex] = radioIndex;
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.startCameraStream();
      }
    },
    startCameraStream() {
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream;
        })
        .catch((error) => {
          alert("Browser doesn't support or there is some errors." + error);
        });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    },

    capture() {
      const FLASH_TIMEOUT = 50;
      let self = this;
      setTimeout(() => {
        const context = self.$refs.canvas.getContext("2d");
        context.drawImage(
          self.$refs.camera,
          0,
          0,
          self.canvasWidth,
          self.canvasHeight
        );
        const dataUrl = self.$refs.canvas
          .toDataURL("image/jpeg")
          .replace("image/jpeg", "image/octet-stream");
        self.addToPhotoGallery(dataUrl);
        self.uploadPhoto(dataUrl);
        self.isCameraOpen = false;
        self.stopCameraStream();
      }, FLASH_TIMEOUT);
    },

    addToPhotoGallery(dataURI) {
      this.items.push({
        src: dataURI,
        thumbnail: dataURI,
        w: this.canvasWidth,
        h: this.canvasHeight,
        alt: "some numbers on a grey background", // optional alt attribute for thumbnail image
      });
    },
    uploadPhoto(dataURL) {
      let uniquePictureName = this.generateCapturePhotoName();
      let capturedPhotoFile = this.dataURLtoFile(
        dataURL,
        uniquePictureName + ".jpg"
      );
      let formData = new FormData();
      formData.append("file", capturedPhotoFile);
      // Upload image api
      // axios.post('http://your-url-upload', formData).then(response => {
      //   console.log(response)
      // })
    },

    generateCapturePhotoName() {
      return Math.random().toString(36).substring(2, 15);
    },

    dataURLtoFile(dataURL, filename) {
      let arr = dataURL.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  },

  mounted() {
    axios
      .get(
        "https://api.giobonglan.com/api/checklist/get-current-time-checklist-station"
      )
      .then((Response) => (this.gets = Response.data));
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.activeRed {
  background-color: rgb(197, 59, 0);
}

.activeBlue {
  background-color: rgb(28, 93, 234);
}
</style>