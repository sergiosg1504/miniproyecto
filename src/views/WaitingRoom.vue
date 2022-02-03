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
          <span v-if="!isVideoON"
            ><font-awesome-icon class="fa-2x" icon="video"
          /></span>
          <span v-else
            ><font-awesome-icon class="fa-2x" icon="video-slash"
          /></span>
        </button>
        <button class="btn" @click="toggleAudio">
          <span v-if="!isAudioON"
            ><font-awesome-icon class="fa-2x" icon="volume-up"
          /></span>
          <span v-else
            ><font-awesome-icon class="fa-2x" icon="volume-mute"
          /></span>
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
  created() {
    console.log(this.meeting);
    this.isVideoON = this.meeting.videoHost;
    this.isAudioON = this.meeting.audioHost;
    if (this.isVideoON) this.createElement();
    else if (this.isAudioON) this.createElement();
  },
  methods: {
    joinNow() {
      console.log("Yendo a jitsi");
    },
    toggleVideo() {
      if (this.isVideoON) {
        this.isVideoON = false;
        this.stopStream();
      } else {
        this.isVideoON = true;
        this.createElement();
      }
    },
    toggleAudio() {
      if (this.isAudioON) {
        this.isAudioON = false;
        this.stopStream();
      } else {
        this.isAudioON = true;
        this.createElement();
      }
    },
    createElement() {
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
    stopStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      if (this.isVideoON) this.createElement();
      else if (this.isAudioON) this.createElement();
    },
  },
};
</script>

<style scoped>
.camera-box {
  float: left;
  width: 65%;
  height: 90%;
  display: grid;
  place-content: center;
}
.information {
  width: 25%;
  height: 40%;
  display: grid;
}
.title {
  padding: 300px 0px 0px 0px;
  font-size: 30px;
  font-weight: bold;
}
</style>
