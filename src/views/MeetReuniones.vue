<template>
  <div>
    <navigation-bar />
    <div v-if="!programarReunion">
      <h1 class="header">REUNIONES</h1>
      <div>
        <v-app>
          <v-card>
            <v-tabs background-color="#4cc4ec" dark>
              <v-tab @click="click_Proximos">Próximos</v-tab>
              <v-tab @click="click_Anterior">Anterior</v-tab>
              <v-tab @click="click_SalaPersonal">Sala personal</v-tab>
            </v-tabs>
            <div v-if="menu === 0">
              <h1>Próximos</h1>
            </div>
            <div v-if="menu === 1">
              <h1>Anterior</h1>
            </div>
            <h1 class="h1_reunion">
              <button class="boton_reunion" @click="click_ProgramarReunion">
                Programar Reunion
              </button>
            </h1>
            <div v-if="menu !== 2">
              <div class="filt">
                <form>
                  <p>Filtro por fecha</p>
                  <input class="filter" type="date" v-model="filtroFecha" />
                </form>
              </div>
              <table>
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Nombre</th>
                </tr>
                <tr v-for="(item, i) in arrayFiltrado" :key="i">
                  <td>{{ item.fecha }}</td>
                  <td>{{ item.hora }}</td>
                  <td>{{ item.nombre }}</td>

                  <v-menu transition="slide-y-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="#4cc4ec"
                        class="ma-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <p class="whitea">Mas informacion</p>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="n in 3" :key="n" link>
                        <v-list-item-title
                          v-if="n === 1"
                          @click="click_irASala"
                          v-text="`Acceder a la sala`"
                        />
                        <v-list-item-title
                          v-if="n === 2"
                          @click="click_eliminar(item)"
                          v-text="`Eliminar`"
                        />
                        <v-list-item-title
                          v-if="n === 3"
                          @click="click_datos(item)"
                          v-text="`Datos de la reunion`"
                        />
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </tr>
              </table>
            </div>
            <div class="sala" v-if="menu === 2">
              <h1>Sala personal</h1>
              <p class="sp">Topic:</p>
              <p class="sp">Meet ID:</p>
              <p class="sp">
                Security: <span>Password: ****** </span>
                <span>Waiting room ✅</span>
              </p>
              <p class="sp">Invite link: <a>ssdd</a></p>
              <button class="boton">Start</button>
            </div>
          </v-card>
        </v-app>
      </div>
    </div>
    <div v-if="programarReunion">
      <button class="volver" @click="click_ProgramarReunion">
        🡰 Volver a las reuniones
      </button>
      <p class="header2">Programar Reunion</p>
      <div class="container">
        <div class="item">
          <p class="gris">Nombre</p>
        </div>
        <div class="item">
          <input v-model="nuevaReunion.nombre" class="form-input" />
        </div>
      </div>
      <div class="container">
        <div class="item">
          <p class="gris">Descripcion</p>
        </div>
        <div class="item">
          <input v-model="nuevaReunion.descripcion" class="form-input" />
        </div>
      </div>
      <div class="container">
        <div class="item">
          <p class="gris">Contraseña</p>
        </div>
        <div class="item">
          <input
            v-model="auxpassword"
            class="form-input"
            type="password"
            id="password"
          />
        </div>
      </div>
      <div class="container">
        <div class="item">
          <p class="gris">Cuándo</p>
        </div>
        <div class="item">
          <input v-model="nuevaReunion.fecha" class="form-input" type="date" />
        </div>
        <div class="item">
          <input v-model="nuevaReunion.hora" class="form-input" type="time" />
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
                v-model="nuevaReunion.videoAnfitrion"
                checked
                value="true"
              />
              Encendido<br /><br />
              <input
                type="radio"
                name="videoAnfitrion"
                v-model="nuevaReunion.videoAnfitrion"
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
                v-model="nuevaReunion.videoParticipante"
                checked
                value="true"
              />
              Encendido<br /><br />
              <input
                type="radio"
                name="videoParticipante"
                v-model="nuevaReunion.videoParticipante"
                value="false"
              />
              Apagado<br />
            </p>
          </form>
        </div>
      </div>
      <div class="container">
        <div class="item">
          <button class="boton" @click="click_CrearReunion">Guardar</button>
        </div>
        <div class="item">
          <button class="boton" @click="click_Cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import { Encrypt } from "@/logic/aes.js";
export default {
  components: {
    NavigationBar,
  },
  data: () => ({
    menu: 0,
    programarReunion: false,
    texto: "",
    auxpassword: "",
    nuevaReunion: {
      nombre: "Mi reunión",
      descripcion: "",
      password: "",
      fecha: "",
      hora: "",
      videoAnfitrion: true,
      videoParticipante: true,
    },
    ahora: new Date(),
    fechaPC: { fecha: "", hora: "" },
    PCFormat: { fecha: "", hora: "" },
    arrayFiltrado: [],
    result: [
      { fecha: "01-01-0001", hora: "00:00", nombre: "a" },
      { fecha: "01-01-0002", hora: "01:00", nombre: "b" },
      { fecha: "01-01-0003", hora: "02:00", nombre: "c" },
      { fecha: "01-01-0004", hora: "03:00", nombre: "d" },
      { fecha: "01-01-0005", hora: "04:00", nombre: "e" },
      { fecha: "01-01-0006", hora: "05:00", nombre: "f" },
      { fecha: "02-01-0001", hora: "00:00", nombre: "g" },
      { fecha: "03-01-0001", hora: "01:00", nombre: "h" },
      { fecha: "01-02-0001", hora: "02:00", nombre: "i" },
      { fecha: "01-03-0001", hora: "03:00", nombre: "j" },
      { fecha: "01-01-4001", hora: "04:00", nombre: "k" },
      { fecha: "01-01-5001", hora: "05:00", nombre: "l" },
      { fecha: "03-01-6001", hora: "01:00", nombre: "m" },
      { fecha: "01-02-7001", hora: "02:00", nombre: "n" },
      { fecha: "01-03-8001", hora: "03:00", nombre: "o" },
      { fecha: "01-01-9001", hora: "04:00", nombre: "p" },
      { fecha: "01-01-9901", hora: "05:00", nombre: "q" },
      { fecha: "22-11-2021", hora: "05:00", nombre: "r" },
      { fecha: "22-11-2021", hora: "22:00", nombre: "s" },
      { fecha: "01-01-2022", hora: "22:00", nombre: "t" },
    ],
    resultFiltradoHoraPC: [],
  }),
  methods: {
    click_ProgramarReunion() {
      if (this.programarReunion === false) {
        this.programarReunion = true;
      } else {
        this.programarReunion = false;
      }
    },
    click_Proximos() {
      this.menu = 0;
      this.resultFiltradoHoraPC = [];
      for (var i = 0; i < this.result.length; i++) {
        var fechaFormat =
          this.result[i].fecha.substring(6, 10) +
          this.result[i].fecha.substring(3, 5) +
          this.result[i].fecha.substring(0, 2);
        var horaFormat =
          this.result[i].hora.substring(0, 2) +
          this.result[i].hora.substring(3, 5);
        if (parseInt(fechaFormat, 10) >= parseInt(this.PCFormat.fecha, 10)) {
          if (
            parseInt(fechaFormat, 10) === parseInt(this.PCFormat.fecha, 10) &&
            parseInt(horaFormat, 10) < parseInt(this.PCFormat.hora, 10)
          ) {
            continue;
          }
          this.resultFiltradoHoraPC = this.resultFiltradoHoraPC.concat(
            this.result[i]
          );
        }
      }
      this.arrayFiltrado = this.resultFiltradoHoraPC;
    },
    click_Anterior() {
      this.menu = 1;
      this.resultFiltradoHoraPC = [];
      for (var i = 0; i < this.result.length; i++) {
        var fechaFormat =
          this.result[i].fecha.substring(6, 10) +
          this.result[i].fecha.substring(3, 5) +
          this.result[i].fecha.substring(0, 2);
        var horaFormat =
          this.result[i].hora.substring(0, 2) +
          this.result[i].hora.substring(3, 5);
        if (parseInt(fechaFormat, 10) <= parseInt(this.PCFormat.fecha, 10)) {
          if (
            parseInt(fechaFormat, 10) === parseInt(this.PCFormat.fecha, 10) &&
            parseInt(horaFormat, 10) > parseInt(this.PCFormat.hora)
          ) {
            continue;
          }
          this.resultFiltradoHoraPC = this.resultFiltradoHoraPC.concat(
            this.result[i]
          );
        }
      }
      this.arrayFiltrado = this.resultFiltradoHoraPC;
    },
    click_SalaPersonal() {
      this.menu = 2;
    },
    click_irASala() {
      console.log("Yendo a la sala");
    },
    click_eliminar(item) {
      var i = this.result.indexOf(item);
      if (i !== -1) {
        this.result.splice(i, 1);
      }
      if (this.menu === 0) this.click_Proximos();
      if (this.menu === 1) this.click_Anterior();
    },
    click_datos(item) {
      console.log(item.nombre);
      console.log(item.descripcion);
      console.log(item.password);
      console.log(item.fecha);
      console.log(item.hora);
      console.log(item.videoAnfitrion);
      console.log(item.videoParticipante);
    },
    click_CrearReunion() {
      if (this.fechaPC.fecha !== this.nuevaReunion.fecha) {
        this.nuevaReunion.fecha =
          this.nuevaReunion.fecha.substring(8, 10) +
          "-" +
          this.nuevaReunion.fecha.substring(5, 7) +
          "-" +
          this.nuevaReunion.fecha.substring(0, 4);
      }
      this.nuevaReunion.password = Encrypt(this.auxpassword);
      console.log(this.nuevaReunion.nombre);
      console.log(this.nuevaReunion.descripcion);
      console.log(this.nuevaReunion.password);
      console.log(this.nuevaReunion.fecha);
      console.log(this.nuevaReunion.hora);
      console.log(this.nuevaReunion.videoAnfitrion);
      console.log(this.nuevaReunion.videoParticipante);

      // Guardar los datos como sea
    },
    click_Cancelar() {
      this.nuevaReunion.nombre = "Mi reunión";
      this.nuevaReunion.descripcion = "";
      this.nuevaReunion.fecha = this.fechaPC.fecha;
      this.nuevaReunion.hora = this.fechaPC.hora;
      this.videoAnfitrion = true;
      this.videoParticipante = true;
      this.click_ProgramarReunion();
    },
    sortFechaHora(result) {
      result.sort(function (a, b) {
        if (a.fecha.substring(6, 10) < b.fecha.substring(6, 10)) {
          return -1;
        } else if (a.fecha.substring(6, 10) > b.fecha.substring(6, 10)) {
          return 1;
        } else {
          if (a.fecha.substring(3, 5) < b.fecha.substring(3, 5)) {
            return -1;
          } else if (a.fecha.substring(3, 5) > b.fecha.substring(3, 5)) {
            return 1;
          } else {
            if (a.fecha.substring(0, 2) < b.fecha.substring(0, 2)) {
              return -1;
            } else if (a.fecha.substring(0, 2) > b.fecha.substring(0, 2)) {
              return 1;
            } else {
              if (a.hora < b.hora) {
                return -1;
              } else if (a.hora > b.hora) {
                return 1;
              } else {
                return 0;
              }
            }
          }
        }
      });
      return result;
    },
  },
  computed: {
    filtroFecha: {
      get() {
        return (
          this.texto.substring(6, 10) +
          "-" +
          this.texto.substring(3, 5) +
          "-" +
          this.texto.substring(0, 2)
        );
      },
      set(value) {
        value =
          value.substring(8, 10) +
          "-" +
          value.substring(5, 7) +
          "-" +
          value.substring(0, 4);
        console.log(value);
        this.arrayFiltrado = this.resultFiltradoHoraPC.filter(
          (item) => item.fecha.indexOf(value) !== -1
        );
        this.texto = value;
      },
    },
  },
  created() {
    this.texto =
      this.nuevaReunion.fecha =
      this.fechaPC.fecha =
        this.ahora.getDate() +
        "-" +
        (this.ahora.getMonth() + 1) +
        "-" +
        this.ahora.getFullYear();
    this.nuevaReunion.hora = this.fechaPC.hora =
      this.ahora.getHours() + ":" + this.ahora.getMinutes();
    this.result = this.sortFechaHora(this.result);
    this.PCFormat.fecha =
      this.fechaPC.fecha.substring(6, 10) +
      this.fechaPC.fecha.substring(3, 5) +
      this.fechaPC.fecha.substring(0, 2);
    this.PCFormat.hora =
      this.fechaPC.hora.substring(0, 2) + this.fechaPC.hora.substring(3, 5);
    this.click_Proximos();
    this.arrayFiltrado = this.resultFiltradoHoraPC;
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
th {
  padding-inline: 70px;
}
h1 {
  text-align: center;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.filt {
  position: absolute;
  text-align: center;
  margin: 40px;
  background: white;
  height: 150px;
  width: 250px;
  border-radius: 5px;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);
  font-weight: bold;
}
.filter {
  margin: 20px 20px 20px 20px;
  border: none;
  border-radius: 10px;
  height: 28px;
  background: lightgrey;
  font-size: 18px;
}
table {
  margin: 0 auto;
  background: white;
  border-radius: 5px;
  box-shadow: 0 3px 5px 2px rgba(0, 0, 0, 0.3);
  border-collapse: collapse;
}
tr {
  text-align: center;
  border: solid;
  border-width: 1px 0;
  height: 50px;
  border-color: rgb(238, 238, 238);
}
tr:first-child {
  border-top: none;
}
tr:last-child {
  border-bottom: none;
}
.whitea {
  background: transparent;
  color: white;
}
.volver {
  margin: 20px;
  text-decoration-line: underline;
  color: blue;
}
.header2 {
  margin: 20px;
  font-weight: bold;
  font-size: 20px;
}
.container {
  margin: 20px;
  overflow: hidden;
}
.item {
  width: 100px;
  margin: 0 60px 0 0;
  float: left;
}
.gris {
  margin: 6px 0 0 0;
  color: gray;
}
.boton {
  background: #4cc4ec;
  text-align: center;
  width: 100px;
  height: 40px;
  color: white;
  border-radius: 5px;
}
.h1_reunion {
  font-size: 16px;
  margin: 20px 0 20px;
  font-weight: normal;
}
.boton_reunion {
  height: 30px;
  width: 200px;
  border-radius: 5px;
  background: #4cc4ec;
  color: white;
}
.sp {
  margin: 20px;
}
</style>
