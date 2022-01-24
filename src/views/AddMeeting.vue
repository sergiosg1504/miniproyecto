<template>
  <div class="col-sm-12 main-container">
    <div class="secondNavbar">
      <div class="links-container">
        <router-link
          :to="{ path: '/home' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to modules</router-link
        >
        <router-link
          :to="{ path: '/reuniones' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to
          reuniones</router-link
        >
      </div>
    </div>
    <h4>Programar Reunion</h4>
    <div class="container">
      <div class="item">
        <p class="gris">Nombre</p>
      </div>
      <div class="item2">
        <input v-model="newMeeting.nombre" class="form-input" />
      </div>
    </div>
    <div class="container">
      <div class="item">
        <p class="gris">Description</p>
      </div>
      <div class="item2">
        <input v-model="newMeeting.description" class="form-input" />
      </div>
    </div>
    <div class="container">
      <div class="item">
        <p class="gris">Contraseña</p>
      </div>
      <div class="item2">
        <input
          v-model="auxpassword"
          class="form-input"
          type="password"
          id="password"
          name="input_password"
        />
      </div>
      <div class="item5">
        <button @click="changePasswordVisibility()">
          <font-awesome-icon v-if="passwordVisibility" icon="eye" />
          <font-awesome-icon v-if="!passwordVisibility" icon="eye-slash" />
        </button>
      </div>
    </div>
    <div class="container">
      <div class="item">
        <p class="gris">Date</p>
      </div>
      <div class="item3">
        <input v-model="newMeeting.date" class="form-input" type="date" />
      </div>
      <div class="item4">
        <input v-model="newMeeting.hour" class="form-input" type="time" />
      </div>
    </div>
    <div class="container">
      <div class="item">
        <p class="gris">Video anfitrión</p>
      </div>
      <div class="item">
        <form target="_blank">
          <p>
            <input
              type="radio"
              name="videoAnfitrion"
              v-model="newMeeting.videoAnfitrion"
              checked
              value="true"
            />
            Encendido<br /><br />
            <input
              type="radio"
              name="videoAnfitrion"
              v-model="newMeeting.videoAnfitrion"
              value="false"
            />
            Apagado<br />
          </p>
        </form>
      </div>
    </div>
    <div class="container">
      <div class="item">
        <p class="gris">Video participante</p>
      </div>
      <div class="item">
        <form target="_blank">
          <p>
            <input
              type="radio"
              name="videoParticipante"
              v-model="newMeeting.videoParticipante"
              checked
              value="true"
            />
            Encendido<br /><br />
            <input
              type="radio"
              name="videoParticipante"
              v-model="newMeeting.videoParticipante"
              value="false"
            />
            Apagado<br />
          </p>
        </form>
      </div>
    </div>
    <div class="container">
      <div class="item">
        <button class="boton" @click="click_CreateMeeting">
          <font-awesome-icon icon="check-circle" />
          Guardar
        </button>
      </div>
      <div class="item">
        <button class="boton" @click="click_Cancell">
          <font-awesome-icon icon="times-circle" />
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Encrypt } from "@/logic/aes.js";
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
  }),
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
    click_CreateMeeting() {
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
      this.newMeeting.nombre = "Mi reunión";
      this.newMeeting.description = "";
      this.newMeeting.date = this.datePC.date;
      this.newMeeting.hour = this.datePC.hour;
      this.videoAnfitrion = true;
      this.videoParticipante = true;
      this.click_ProgramarReunion();
    },
  },
};
</script>

<style scoped>
/* Otros estilos */
.grid-container {
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: 15% 15% 70%;
  justify-content: space-between;
}
.container {
  margin: 20px;
  overflow: hidden;
}
.item {
  width: 120px;
  margin: 0 60px 0 0;
  float: left;
}
.item2,
.item3,
.item4 {
  float: left;
  border: 1px solid;
  border-radius: 4px;
}
.item2 {
  width: 172px;
}
.item3 {
  width: 170px;
  margin: 0 40px 0 0;
}
.item4 {
  width: 80px;
}
.item5 {
  float: left;
  margin: 0 10px 0;
}
</style>
