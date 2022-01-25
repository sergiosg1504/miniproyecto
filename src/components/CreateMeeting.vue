<template>
  <div class="form-container technologiesStyle">
    <form action class="form" @submit.prevent="handleCreate">
      <div class="col-sm-12">
        <div class="col-sm-6">
          <div class="form-group">
            <label>Name</label>
            <input
              class="form-input"
              type="text"
              id="name"
              v-validate="'required'"
              data-vv-name="name"
              v-model="newMeeting.name"
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
                  data-vv-name="password"
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

      <div class="col-sm-12">
        <div class="col-sm-2" />
        <div class="col-sm-2">
          <div class="form-group">
            <label>Date</label>
            <input
              class="form-input"
              type="date"
              id="date"
              v-validate="'required'"
              data-vv-name="date"
              v-model="newMeeting.date"
            />
          </div>
        </div>
        <div class="col-sm-2" />
        <div class="col-sm-2">
          <div class="form-group">
            <label>Hour</label>
            <input
              class="form-input"
              type="time"
              id="hour"
              data-vv-name="hour"
              v-model="newMeeting.hour"
              name="hour"
            />
          </div>
        </div>
        <div class="col-sm-2" />
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
              dense
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
              dense
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
  </div>
</template>

<script>
import { Encrypt } from "@/logic/aes.js";
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);
export default {
  data: () => ({
    newMeeting: {
      nombre: "Mi reunión",
      description: "",
      password: "",
      date: "",
      hour: "",
      videoHost: true,
      videoGuest: true,
    },
    auxpassword: "",
    passwordVisibility: false,
    date: new Date(),
    datePC: { date: "", hour: "" },
  }),
  mounted() {
    if (this.date.getMonth() + 1 < 10) {
      this.datePC.date =
        this.date.getDate() +
        "-0" +
        (this.date.getMonth() + 1) +
        "-" +
        this.date.getFullYear();
    } else {
      this.datePC.date =
        this.date.getDate() +
        "-" +
        (this.date.getMonth() + 1) +
        "-" +
        this.date.getFullYear();
    }
    this.newMeeting.hour = this.datePC.hour =
      this.date.getHours() + ":" + this.date.getMinutes();
    this.newMeeting.date =
      this.datePC.date.substring(6, 10) +
      "-" +
      this.datePC.date.substring(3, 5) +
      "-" +
      this.datePC.date.substring(0, 2);
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
      if (this.datePC.date !== this.newMeeting.date) {
        this.newMeeting.date =
          this.newMeeting.date.substring(8, 10) +
          "-" +
          this.newMeeting.date.substring(5, 7) +
          "-" +
          this.newMeeting.date.substring(0, 4);
      }
      this.newMeeting.password = Encrypt(this.auxpassword);
      console.log(this.newMeeting.name);
      console.log(this.newMeeting.description);
      console.log(this.newMeeting.password);
      console.log(this.newMeeting.date);
      console.log(this.newMeeting.hour);
      console.log(this.newMeeting.videoAnfitrion);
      console.log(this.newMeeting.videoParticipante);
      // LLamada a API para crear reunion
    },
    click_Cancell() {
      this.newMeeting.nombre = "";
      this.newMeeting.description = "";
      this.newMeeting.date = this.datePC.date;
      this.newMeeting.hour = this.datePC.hour;
      this.videoAnfitrion = true;
      this.videoParticipante = true;
      this.$router.push({ name: "MeetingList" });
    },
  },
};
</script>

<style lang="scss" scoped>
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
