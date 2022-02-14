<template>
  <v-app class="form-container technologiesStyle">
    <form action class="form" @submit.prevent="handleCreate">
      <div class="col-sm-12">
        <div class="col-sm-6">
          <div class="form-group">
            <label>Name</label>
            <input
              class="form-input aux"
              type="text"
              id="name"
              v-model="actualMeeting.name"
            />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label>Password</label>
            <div class="input-group">
              <div class="col-11">
                <input
                  class="form-input"
                  type="password"
                  id="password"
                  v-model="auxpassword"
                  name="input_password"
                />
              </div>
              <span class="input-group-btn">
                <button @click="changePasswordVisibility()">
                  <font-awesome-icon v-if="passwordVisibility" icon="eye" />
                  <font-awesome-icon v-else="" icon="eye-slash" />
                </button>
              </span>
              <div class="right"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="col-sm-10">
          <div class="form-group">
            <label>Description</label>
            <input
              class="form-input"
              type="text"
              id="descripion"
              data-vv-name="entity"
              v-model="actualMeeting.description"
            />
          </div>
        </div>
        <div class="col-sm-2">
          <div>
            <label class="input-label">Number of participants</label>
            <vue-numeric-input
              type="text"
              align="center"
              id="numParticipants"
              data-vv-name="entity"
              :min="2"
              :max="60"
              inline
              controls
              v-model="actualMeeting.numParticipants"
            ></vue-numeric-input>
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="col-sm-4">
          <div class="form-group">
            <label>Date</label>
            <input
              class="form-input"
              type="date"
              id="date"
              data-vv-name="date"
              v-model="actualMeeting.date"
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label>Start hour</label>
            <input
              class="form-input"
              type="time"
              id="hour"
              data-vv-name="hour"
              v-model="actualMeeting.startHour"
              name="hour"
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label>End hour</label>
            <input
              class="form-input"
              type="time"
              id="hour"
              data-vv-name="hour"
              v-model="actualMeeting.endHour"
              name="hour"
            />
          </div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="col-sm-2" />
        <div class="col-sm-2">
          <div class="form-group">
            <label>Guest video</label>
            <v-switch
              v-model="actualMeeting.videoGuest"
              inset
              color="#4cc4ec"
              style="float: right"
            />
          </div>
        </div>
        <div class="col-sm-2" />
        <div class="col-sm-2">
          <div class="form-group">
            <label>Host video</label>
            <v-switch
              v-model="actualMeeting.videoHost"
              inset
              color="#4cc4ec"
              style="float: right"
            />
          </div>
        </div>
        <div class="col-sm-2" />
      </div>

      <div class="col-sm-12">
        <div class="col-sm-2" />
        <div class="col-sm-2">
          <div class="form-group">
            <label>Guest audio</label>
            <v-switch
              v-model="actualMeeting.audioGuest"
              inset
              color="#4cc4ec"
              style="float: right"
            />
          </div>
        </div>
        <div class="col-sm-2" />
        <div class="col-sm-2">
          <div class="form-group">
            <label>Host audio</label>
            <v-switch
              v-model="actualMeeting.audioHost"
              inset
              color="#4cc4ec"
              style="float: right"
            />
          </div>
        </div>
        <div class="col-sm-2" />
      </div>

      <div class="form-group col-lg-4 align-item-center">
        <div class="col-sm-12">
          <div class="col-sm-6">
            <button
              class="btn btn-secondary btn-cancel"
              type="button"
              @click="click_Cancell"
            >
              <font-awesome-icon icon="ban" /> Cancel
            </button>
          </div>
          <div class="col-sm-6">
            <input
              class="btn btn-primary form-submit"
              type="submit"
              value="Update"
            />
          </div>
        </div>
      </div>
    </form>
  </v-app>
</template>

<script>
import VueNumericInput from "vue-numeric-input";
import { Encrypt } from "@/logic/aes.js";
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);
export default {
  components: {
    VueNumericInput,
  },
  props: {
    meeting: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    actualMeeting: {
      name: "",
      description: "",
      password: "",
      date: "",
      startHour: "",
      endHour: "",
      numParticipants: null,
      videoHost: true,
      videoGuest: true,
      audioHost: true,
      audioGuest: true,
    },
    auxpassword: "",
    passwordVisibility: false,
    date: new Date(),
    datePC: { date: "", hour: "" },
  }),
  mounted() {
    this.actualMeeting.name = this.meeting.name;
    this.actualMeeting.description = this.meeting.description;
    this.auxpassword = this.actualMeeting.password = this.meeting.password;
    this.actualMeeting.date =
      this.meeting.date.substring(6, 10) +
      "-" +
      this.meeting.date.substring(3, 5) +
      "-" +
      this.meeting.date.substring(0, 2);
    this.actualMeeting.startHour = this.meeting.startHour;
    this.actualMeeting.endHour = this.meeting.endHour;
    this.actualMeeting.numParticipants = this.meeting.numParticipants;
    this.actualMeeting.videoHost = this.meeting.videoHost;
    this.actualMeeting.videoGuest = this.meeting.videoGuest;
    this.actualMeeting.audioHost = this.meeting.audioHost;
    this.actualMeeting.audioGuest = this.meeting.audioGuest;
  },
  methods: {
    changePasswordVisibility() {
      var aux = document.getElementById("password");
      if (aux.type === "password") {
        aux.type = "text";
        this.passwordVisibility = false;
      } else {
        aux.type = "password";
        this.passwordVisibility = true;
      }
    },
    handleUpdate() {
      let aux = this.actualMeeting.date;
      this.actualMeeting.date =
        aux.substring(8, 10) +
        "-" +
        aux.substring(5, 7) +
        "-" +
        aux.substring(0, 4);
      this.actualMeeting.password = Encrypt(this.auxpassword);
      console.log(this.actualMeeting.name);
      console.log(this.actualMeeting.description);
      console.log(this.actualMeeting.password);
      console.log(this.actualMeeting.date);
      console.log(this.actualMeeting.startHour);
      console.log(this.actualMeeting.endHour);
      console.log(this.actualMeeting.numParticipants);
      console.log(this.actualMeeting.videoHost);
      console.log(this.actualMeeting.videoGuest);
      console.log(this.actualMeeting.audioHost);
      console.log(this.actualMeeting.audioGuest);
      // LLamada a API para modificar reunion
      this.$router.push({ name: "MeetingList" });
    },
    click_Cancell() {
      this.$router.push({ name: "MeetingList" });
    },
  },
};
</script>

<style lang="scss" scoped>
.input-label {
  font-weight: bold;
}
.aux {
  margin: 12px 0 0 0;
}
::v-deep {
  /* Basic editor styles */
  .ProseMirror {
    > * + * {
      margin-top: 0.75em;
    }

    code {
      background-color: rgba(#616161, 0.1);
      color: #616161;
    }
  }

  .content {
    padding: 1rem 0 0;

    h3 {
      margin: 1rem 0 0.5rem;
    }

    pre {
      border-radius: 5px;
      color: #333;
    }

    code {
      display: block;
      white-space: pre-wrap;
      font-size: 0.8rem;
      padding: 0.75rem 1rem;
      background-color: #e9ecef;
      color: #495057;
    }
  }
}
</style>
