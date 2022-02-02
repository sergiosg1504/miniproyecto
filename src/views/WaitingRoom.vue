<template>
  <div id="app" class="web-camera-container">
    <div class="secondNavbar">
      <div class="links-container">
        <router-link
          :to="{ path: '/meetingList' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to meetings</router-link
        >
      </div>
    </div>
    <h4>Waiting Room</h4>

    <div
      v-if="isCameraOpen"
      v-show="!isLoading"
      class="camera-box"
      :class="{ flash: isShotPhoto }"
    >
      <video
        v-show="!isPhotoTaken"
        ref="camera"
        :width="800"
        :height="700"
        autoplay
      />
      <div>
        <button
          type="button"
          :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }"
          @click="toggleCamera"
        >
          <span v-if="!isCameraOpen">Open Camera</span>
          <span v-else>Close Camera</span>
        </button>
      </div>
    </div>

    <div class="information">
      <div class="title">
        <p align="center">{{ meeting.name }}</p>
      </div>
      <div class="body">
        <p align="center">{{ meeting.description }}</p>
        <button class="btn btn-primary form-submit" @click="joinNow()">
          Join now
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitingRoom",
  components: {},
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
    };
  },
  props: {
    meeting: {
      type: Object,
      //required: true,
    },
  },
  methods: {
    joinNow() {
      console.log("Yendo a jitsi");
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },
    createCameraElement() {
      this.isLoading = true;
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.isLoading = false;
          this.$refs.camera.srcObject = stream;
        })
        .catch((error) => {
          this.isLoading = false;
          alert("May the browser didn't support or there is some errors.");
          console.log(error);
        });
    },
    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    },
  },
  mounted() {
    this.toggleCamera();
    console.log(this.meeting);
  },
};
</script>

<style scoped>
.web-camera-container {
  overflow: hidden;
  width: 100%;
}
.camera-box {
  float: left;
  width: 65%;
  height: 100%;
  display: grid;
  place-content: center;
  .camera-shutter {
    opacity: 0;
    background-color: #fff;
    &.flash {
      opacity: 1;
    }
  }
}
.information {
  float: right;
  width: 30%;
  height: 40%;
  display: grid;
  bottom: 0;
}
.title {
  padding: 300px 0px 0px 0px;
  font-size: 30px;
  font-weight: bold;
  bottom: 0;
}

.camera-loading {
  overflow: hidden;
  height: 100%;
  position: absolute;
  width: 100%;
  min-height: 150px;
  margin: 3rem 0 0 -1.2rem;
  ul {
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 999999;
    margin: 0;
  }
  .loader-circle {
    display: block;
    height: 14px;
    margin: 0 auto;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    position: absolute;
    width: 100%;
    padding: 0;
    li {
      display: block;
      float: left;
      width: 10px;
      height: 10px;
      line-height: 10px;
      padding: 0;
      position: relative;
      margin: 0 0 0 4px;
      background: #999;
      animation: preload 1s infinite;
      top: -50%;
      border-radius: 100%;
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
}

@keyframes preload {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>
