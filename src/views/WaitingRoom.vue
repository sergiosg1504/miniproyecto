<template>
  <div id="app">
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

    <div class="camera-box">
      <video ref="camera" :width="800" :height="700" autoplay />
      <div>
        <button class="btn" @click="toggleVideo">
          <span v-if="!isVideoON"><font-awesome-icon icon="video" /></span>
          <span v-else><font-awesome-icon icon="video-slash" /></span>
        </button>
        <button class="btn" @click="toggleAudio">
          <span v-if="!isAudioON"><font-awesome-icon icon="volume-up" /></span>
          <span v-else><font-awesome-icon icon="volume-mute" /></span>
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
  data() {
    return {
      isVideoON: false,
      isAudioON: false,
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
    toggleVideo() {
      if (this.isVideoON) {
        this.isVideoON = false;
        this.stopCameraStream();
      } else {
        this.isVideoON = true;
        this.createCameraElement();
      }
    },
    toggleAudio() {
      if (this.isAudioON) {
        this.isAudioON = false;
        this.createCameraElement();
      } else {
        this.isAudioON = true;
        this.createCameraElement();
      }
    },
    createCameraElement() {
      const constraints = (window.constraints = {
        audio: this.isAudioON,
        video: this.isVideoON,
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.$refs.camera.srcObject = stream;
        })
        .catch((error) => {
          alert("There is some errors");
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
};
</script>

<style scoped>
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
  width: 35%;
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
</style>
