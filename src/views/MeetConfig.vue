<template>
  <div id="app">
    <navigation-bar />
    <h1 class="header">CONFIGURACIÓN</h1>
    <div class="topnav">
      <v-app id="inspire">
        <v-card>
          <v-tabs background-color="#4cc4ec" dark>
            <v-tab @click="setMeet">Reunión</v-tab>
            <v-tab @click="setRec">Grabación</v-tab>
            <v-tab @click="setAudio">Audioconferencia</v-tab>
            <v-tab @click="setDisp">Dispositivos de colaboracón</v-tab>
          </v-tabs>
          <div class="col-sm-12 main-container">
            <div class="topnav-element" v-if="content === 1">
              <a href="/home" class="btn btn-secondary float-right">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-left"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="svg-inline--fa fa-arrow-left fa-w-14"
                >
                  <path
                    fill="currentColor"
                    d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
                    class=""
                  />
                </svg>
                Back to modules
              </a>
              <h4>Reunión</h4>
              <p class="titulo_op">
                Requerir que todas las reuniones estén protegidas con una opción
                de seguridad
              </p>
              <p class="align-left">
                Requerir que todas las reuniones estén protegidas con una de las
                siguientes opciones de seguridad: un código de acceso, sala de
                espera o "Solo los usuarios autentificados pueden unirse a
                reuniones". Si no hay ninguna opción de seguridad habilitada, se
                protegerá todas las reuniones con una sala de espera.
                <v-switch
                  v-model="op1"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>

              <p class="titulo_op">Sala de espera</p>
              <p class="align-left">
                Cuando los participantes se unan a una reunión, colocarlos en
                una sala de espera y solicitar al anfitrión que los admita
                individualmente. Habilitar la sala de espera automáticamente
                desactiva la configuración que permite a los participantes
                unirse antes que el anfitrión.
                <v-switch
                  v-model="op2"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>

              <p class="titulo_op">Video del anfitrión</p>
              <p class="align-left">
                Comenzar reuniones con el video del anfitrión encendido
                <v-switch
                  v-model="op3"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>

              <p class="titulo_op">Video de los participantes</p>
              <p class="align-left">
                Comenzar reuniones con el video de los participantes encendido.
                Estos pueden cambiarlo durante la reunión.
                <v-switch
                  v-model="op4"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>

              <p class="titulo_op">Chat</p>
              <p class="align-left">
                Permitir que los participantes envien mensajes por el chat
                <v-switch
                  v-model="op9"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
                <span v-if="op9 === true">
                  <br /><br />
                  <input class="check" type="checkbox" v-model="check" />
                  <label>
                    Permitir a los usuarios guardar chats de la reunion</label
                  >
                  <br /><br />
                  <div v-if="check === true">
                    <input type="radio" name="chat" v-model="radio" value="1" />
                    <label> Todos</label>
                    <tr />
                    <input type="radio" name="chat" v-model="radio" value="2" />
                    <label> Solo anfitriones</label>
                  </div>
                </span>
              </p>
              <p class="titulo_op">Auto guardado de del chat</p>
              <p class="align-left">
                Guarde automaticamente todos los chats de la reunion para que
                los anfitriones no tengan que guardar manualmente el texto del
                chat de que comience la reunion.
                <v-switch
                  v-model="op11"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>
            </div>
            <div class="topnav-element" v-if="content === 2">
              <a href="/home" class="btn btn-secondary float-right">
                Back to modules
              </a>
              <h4>Grabación</h4>
              <p class="titulo_op">Grabación local</p>
              <p class="align-left">
                Permitir que los anfitriones y participantes graben la reunión
                en un archivo local
                <v-switch
                  v-model="op5"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>
              <p class="titulo_op">Grabación automatica</p>
              <p class="align-left">
                Grabar reuniones automáticamente cuando comienzan
                <v-switch
                  v-model="op6"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>
              <p class="titulo_op">
                Permitir el intercambio de la grabación en la nube
              </p>
              <p class="align-left">
                Se generará un enlace para compartir la grabación tras la
                reunión. Los usuarios con permiso para ver pueden acceder a la
                grabación en la nube mediante este enlace.
                <v-switch
                  v-model="op7"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>
              <p class="titulo_op">Control de acceso a la IP</p>
              <p class="align-left">
                Permitir el acceso a la grabacion en la nube solo desde rangos
                de direcciones IP especificos.
                <v-switch
                  v-model="op10"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>
            </div>
            <div class="topnav-element" v-if="content === 3">
              <a href="/home" class="btn btn-secondary float-right">
                <icon icon="arrow-left" />
                Back to modules
              </a>
              <h4>Audioconferencia</h4>
              <p class="titulo_op">
                Mostrar enlace de números internacionales en el e-mail de
                invitación
              </p>
              <p class="align-left">
                Mostrar el enlace de los números de discado por defecto
                internacional de Zoom en las invitaciones por e-mail
                <v-switch
                  v-model="op8"
                  inset
                  color="#4cc4ec"
                  dense
                  style="float: right"
                />
              </p>
            </div>
            <div class="topnav-element" v-if="content === 4">
              <a href="/home" class="btn btn-secondary float-right">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-left"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="svg-inline--fa fa-arrow-left fa-w-14"
                >
                  <path
                    fill="currentColor"
                    d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
                    class=""
                  />
                </svg>
                Back to modules
              </a>
              <h4>Dispositivos de colaboración</h4>
              <p class="align-left">
                You have no collaboration devices configured on your account.
              </p>
            </div>
          </div>
        </v-card>
      </v-app>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);
import NavigationBar from "../components/NavigationBar.vue";

export default {
  components: { NavigationBar },
  data: () => ({
    content: 1,
    op1: false,
    op2: true,
    op3: true,
    op4: false,
    op5: true,
    op6: false,
    op7: false,
    op8: true,
    op9: true,
    op10: false,
    op11: false,
    check: true,
    radio: 0,
    NavigationBarvalor: 1,
  }),
  methods: {
    setMeet() {
      this.content = 1;
      console.log(this.content);
    },
    setRec() {
      this.content = 2;
      console.log(this.content);
    },
    setAudio() {
      this.content = 3;
      console.log(this.content);
    },
    setDisp() {
      this.content = 4;
      console.log(this.content);
    },
  },
};
</script>

<style scoped>
/* Estilos de progradum*/
#app {
  font-family: Myriad Pro Regular, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f2f2f2;
  height: 100vh;
}
#app > .bg-white .main-container {
  max-width: 100%;
  float: none;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 0.7rem;
}
.col-sm-12 {
  flex: 0 0 auto;
  width: 100%;
}
.col-sm-12 {
  position: relative;
  overflow: hidden;
}
#app h4 {
  text-align: left;
  border-bottom: 5px solid;
  padding-bottom: 10px;
  margin-bottom: 35px;
}
h4,
.h4 {
  font-size: calc(1.275rem + 0.3vw);
}
h6,
.h6,
h5,
.h5,
h4,
.h4,
h3,
.h3,
h2,
.h2,
h1,
.h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #13283b;
  text-align: left;
  font-weight: bold !important;
}
.align-left {
  text-align: left !important;
  color: #212529;
}
.btn-secondary:hover {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
}
.btn:hover {
  color: #212529;
}
.btn:hover,
a:hover {
  opacity: 0.8;
}
a:hover {
  color: #0a58ca;
}
a:hover {
  cursor: pointer;
}
.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.float-right {
  float: right;
}
.btn-secondary {
  color: #62c4e4 !important;
  background-color: transparent !important;
  border-color: transparent !important;
  font-weight: bold !important;
}
a {
  color: #0d6efd;
  text-decoration: underline;
}
svg:not(:root).svg-inline--fa {
  overflow: visible;
}
.svg-inline--fa.fa-w-18 {
  width: 1.125em;
}
.svg-inline--fa {
  color: #62c4e4 !important;
}
.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
img,
svg {
  vertical-align: middle;
}
*,
::before,
::after {
  box-sizing: border-box;
}

/* Otros estilos */
p {
  width: 80%;
}
header {
  font-size: calc(1.275rem + 0.3vw);
  font-weight: bolder;
  margin: 20px;
  margin-top: 0;
  line-height: 1.2;
  color: #13283b;
}
.titulo_op {
  float: left;
  font-weight: bold;
  text-align: left;
  color: #2c3e50 !important;
}
/* Estilos de navegacion*/
.header {
  font-size: calc(1.275rem + 0.3vw);
  padding: 20px;
  text-align: center;
  background: white;
  color: #4cc4ec;
}
.topnav-element {
  margin: 0 40px;
}
</style>
