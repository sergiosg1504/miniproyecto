<template>
  <div>
    <navigation-bar />
    <h1 class="header">CONFIGURACIÓN</h1>
    <div class="topnav">
      <v-app id="inspire">
        <v-card>
          <v-tabs v-model="tab" background-color="#4cc4ec" dark>
            <v-tab @click="setMeet">Reunión </v-tab>
            <v-tab @click="setRec">Grabación </v-tab>
            <v-tab @click="setAudio">Audioconferencia </v-tab>
            <v-tab @click="setDisp">Dispositivos de colaboracón</v-tab>
          </v-tabs>
          <div class="reunion" v-if="content === 1">
            <header>Reuniones</header>
            <v-sheet>
              <p class="titulo_op">
                Requerir que todas las reuniones estén protegidas con una opción
                de seguridad
              </p>
              <p style="float: left">
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
              <p style="float: left">
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
              <p style="float: left">
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
              <p style="float: left">
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
              <p style="float: left">
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
                  <label
                    >Permitir a los usuarios guardar chats de la reunion</label
                  >
                  <br /><br />
                  <div v-if="check === true">
                    <input type="radio" name="chat" v-model="radio" value="1" />
                    <label
                      >Todos
                      <tr></tr
                    ></label>
                    <input type="radio" name="chat" v-model="radio" value="2" />
                    <label>Solo anfitriones</label>
                  </div>
                </span>
              </p>
              <p class="titulo_op">Auto guardado de del chat</p>
              <p style="float: left">
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
            </v-sheet>
          </div>
          <div class="rec" v-if="content === 2">
            <header>Grabación</header>
            <p class="titulo_op">Grabación local</p>
            <p style="float: left">
              Permitir que los anfitriones y participantes graben la reunión en
              un archivo local
              <v-switch
                v-model="op5"
                inset
                color="#4cc4ec"
                dense
                style="float: right"
              />
            </p>
            <p class="titulo_op">Grabación automatica</p>
            <p style="float: left">
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
            <p style="float: left">
              Se generará un enlace para compartir la grabación tras la reunión.
              Los usuarios con permiso para ver pueden acceder a la grabación en
              la nube mediante este enlace.
              <v-switch
                v-model="op7"
                inset
                color="#4cc4ec"
                dense
                style="float: right"
              />
            </p>
            <p class="titulo_op">Control de acceso a la IP</p>
            <p style="float: left">
              Permitir el acceso a la grabacion en la nube solo desde rangos de
              direcciones IP especificos.
              <v-switch
                v-model="op10"
                inset
                color="#4cc4ec"
                dense
                style="float: right"
              />
            </p>
          </div>
          <div class="audio" v-if="content === 3">
            <header>Audioconferencia</header>
            <p class="titulo_op">
              Mostrar enlace de números internacionales en el e-mail de
              invitación
            </p>
            <p style="float: left">
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
          <div class="disp" v-if="content === 4">
            <header>Dispositivos</header>
            <p>You have no collaboration devices configured on your account.</p>
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
.header {
  padding: 20px;
  text-align: center;
  background: white;
  color: #4cc4ec;
  font-size: 40px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
header {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
}

.titulo_op {
  font-weight: bold;
  margin: 20px 0 0 0;
}

.reunion {
  margin: 0 40px;
}

.rec {
  margin: 0 40px;
}

.audio {
  margin: 0 40px;
}

.disp {
  margin: 0 40px;
}

p {
  width: 600px;
}
</style>
