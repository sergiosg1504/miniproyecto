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
              v-model="newMeeting.name"
              required
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
                  <font-awesome-icon v-else icon="eye-slash" />
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
              v-model="newMeeting.description"
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
              v-model="newMeeting.numParticipants"
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
              v-model="newMeeting.date"
            />
          </div>
        </div>
        <div class="col-sm-4">
          <div class="form-group">
            <label>Start hour</label>
            <input
              class="form-input"
              type="time"
              id="startHour"
              data-vv-name="hour"
              v-model="newMeeting.startHour"
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
              id="endHour"
              data-vv-name="hour"
              v-model="newMeeting.endHour"
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
              v-model="newMeeting.videoGuest"
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
              v-model="newMeeting.videoHost"
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
              v-model="newMeeting.audioGuest"
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
              v-model="newMeeting.audioHost"
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
              value="Create"
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
  data: () => ({
    newMeeting: {
      nombre: "Mi reunión",
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
    if (this.date.getMonth() + 1 < 10 && this.date.getDate() < 10) {
      this.datePC.date =
        this.date.getFullYear() +
        "-0" +
        (this.date.getMonth() + 1) +
        "-0" +
        this.date.getDate();
    } else if (this.date.getMonth() + 1 < 10 && this.date.getDate() > 10) {
      this.datePC.date =
        this.date.getFullYear() +
        "-0" +
        (this.date.getMonth() + 1) +
        "-" +
        this.date.getDate();
    } else if (this.date.getMonth() + 1 > 10 && this.date.getDate() < 10) {
      this.datePC.date =
        this.date.getFullYear() +
        "-" +
        (this.date.getMonth() + 1) +
        "-0" +
        this.date.getDate();
    } else {
      this.datePC.date =
        this.date.getFullYear() +
        "-" +
        (this.date.getMonth() + 1) +
        "-" +
        this.date.getDate();
    }
    this.newMeeting.date = this.datePC.date;
    if (this.date.getHours() < 10) {
      this.newMeeting.startHour = "0" + this.date.getHours() + ":";
    } else {
      this.newMeeting.startHour = this.date.getHours() + ":";
    }
    if (this.date.getMinutes() < 10) {
      this.newMeeting.startHour += "0" + this.date.getMinutes();
    } else {
      this.newMeeting.startHour += this.date.getMinutes();
    }
    this.newMeeting.endHour = this.newMeeting.startHour;
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
    handleCreate() {
      let aux = this.newMeeting.date;
      
      this.newMeeting.date = 
       aux.substring(8, 10) +
        "-" +
        aux.substring(5, 7) +
        "-" +
        aux.substring(0, 4);
      this.newMeeting.password = Encrypt(this.auxpassword);
      console.log(this.newMeeting);
      /*console.log(this.newMeeting.name);
      console.log(this.newMeeting.description);
      console.log(this.newMeeting.password);
      console.log(this.newMeeting.date);
      console.log(this.newMeeting.endDate);
      console.log(this.newMeeting.endHour);
      console.log(this.newMeeting.numParticipants);
      console.log(this.newMeeting.videoHost);
      console.log(this.newMeeting.videoGuest);
      console.log(this.newMeeting.audioHost);
      console.log(this.newMeeting.audioGuest);*/
      // LLamada a API para crear reunion
    },
    click_Cancell() {
      this.newMeeting.nombre = "";
      this.newMeeting.description = "";
      this.newMeeting.date = this.datePC.date;
      this.newMeeting.startHour = this.newMeeting.endHour = this.datePC.hour;
      this.newMeeting.numParticipants = null;
      this.videoHost = true;
      this.videoGuest = true;
      this.audioHost = true;
      this.audioGuest = true;
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
