<template>
  <div class="table-container">
    <!--<div v-bind:class="{ 'table-container': !home, 'col-sm-12': home }">-->
    <h4>Incoming meetings</h4>
    <div class="row">
      <div class="col-sm-2">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="usersAnalyses"
        ></b-pagination>
      </div>
      <div class="col-sm-7">
        <b-form-select
          class="numPerPage paginationSelectorTable"
          v-model="perPage"
          :options="pageOptions"
        ></b-form-select>
      </div>
      <div class="col-sm-3">
        <b-form-input
          id="filter-input"
          v-model="filtroProximos"
          type="date"
          :placeholder="$t('others.search-placeholder-msg')"
        ></b-form-input>
      </div>
    </div>

    <b-table
      ref="analysesTable"
      id="usersAnalyses"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="headers"
      :items="users"
      :filter="filter"
      responsive="sm"
    >
      <template #cell(date)="data">
        {{ data.reuniones.fecha }}
      </template>
      <template #cell(hours)="data">
        {{ data.item.reuniones.hora }}
      </template>
      <template #cell(name)="data">
        {{ data.item.reuniones.nombre }}
      </template>
      <template #cell(options)="data">
        <b-button
          v-b-tooltip.hover
          title="Go to meeting room"
          v-if="!data.detailsShowing"
          @click="click_irASala"
          ><font-awesome-icon icon="video" />
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Show information"
          v-else
          @click="click_datos(item)"
          ><font-awesome-icon icon="info-circle" />
        </b-button>
      </template>
      <template #row-details="arrayAnterioresBusqueda">
        <div
          class="col-sm-12 card profile-card"
          v-for="(item, index) in arrayAnterioresBusqueda"
          v-bind:key="item.id"
        >
          <p>Hola {{ index }}</p>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { Encrypt } from "@/logic/aes.js";
export default {
  name: "IncomingMeetings",
  data() {
    return {
      headers: [
        { key: "date", sortable: true, label: "Date" },
        { key: "hour", sortable: true, label: "Hour" },
        { key: "name", sortable: true, label: "Name" },
        { key: "options", label: "Options" },
      ],
      perPage: 10,
      pageOptions: this.$paginationOptions,
      currentPage: 1,
      selectedId: null,
      // mis variables
      programarReunion: false,
      visibilidadPassword: true,
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
      empty: "",
      date: new Date(),
      fechaPC: { fecha: "", hora: "" },
      PCFormat: { fecha: "", hora: "" },
      inputProximos: "",
      inputAnteriores: "",
      arrayProximos: [],
      arrayProximosBusqueda: [],
      arrayAnteriores: [],
      arrayAnterioresBusqueda: [],
      reunionesOrdenado: [],
      // datos
      reuniones: [
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
    };
  },
  props: {
    home: Boolean,
  },
  created() {
    this.nuevaReunion.fecha = this.fechaPC.fecha =
      this.date.getDate() +
      "-" +
      (this.date.getMonth() + 1) +
      "-" +
      this.date.getFullYear();
    this.nuevaReunion.hora = this.fechaPC.hora =
      this.date.getHours() + ":" + this.date.getMinutes();
    this.PCFormat.fecha =
      this.fechaPC.fecha.substring(6, 10) +
      this.fechaPC.fecha.substring(3, 5) +
      this.fechaPC.fecha.substring(0, 2);
    this.PCFormat.hora =
      this.fechaPC.hora.substring(0, 2) + this.fechaPC.hora.substring(3, 5);
    this.reunionesOrdenado = this.sortFechaHora(this.reuniones);
    this.calculoProximosYAnteriores();
    this.arrayProximosBusqueda = this.arrayProximos;
    this.arrayAnterioresBusqueda = this.arrayAnteriores;
  },
  computed: {
    rows() {
      return this.users.length;
    },
  },
  methods: {
    onAnalysisSelected(id) {
      this.$router.push("/profile-analysis?id=" + id);
    },
    showSendModal(id) {
      this.selectedId = id;
      this.$refs["send-modal"].show();
    },
    close() {
      document.getElementById("message").style.display = "none";
    },
    // mis metodos
    cambioVisibilidadPassword() {
      var aux = document.getElementById("password");
      if (aux.type === "password") {
        aux.type = "text";
        this.visibilidadPassword = false;
      } else {
        aux.type = "password";
        this.visibilidadPassword = true;
      }
    },
    click_ProgramarReunion() {
      if (!this.programarReunion) {
        this.programarReunion = true;
      } else {
        this.programarReunion = false;
      }
    },
    calculoProximosYAnteriores() {
      this.arrayProximos = [];
      this.arrayAnteriores = [];
      for (var i = 0; i < this.reunionesOrdenado.length; i++) {
        var fechaFormat =
          this.reunionesOrdenado[i].fecha.substring(6, 10) +
          this.reunionesOrdenado[i].fecha.substring(3, 5) +
          this.reunionesOrdenado[i].fecha.substring(0, 2);
        var horaFormat =
          this.reunionesOrdenado[i].hora.substring(0, 2) +
          this.reunionesOrdenado[i].hora.substring(3, 5);
        if (parseInt(fechaFormat, 10) >= parseInt(this.PCFormat.fecha, 10)) {
          if (
            parseInt(fechaFormat, 10) === parseInt(this.PCFormat.fecha, 10) &&
            parseInt(horaFormat, 10) < parseInt(this.PCFormat.hora, 10)
          ) {
            this.arrayAnteriores = this.arrayAnteriores.concat(
              this.reunionesOrdenado[i]
            );
            continue;
          }
          this.arrayProximos = this.arrayProximos.concat(
            this.reunionesOrdenado[i]
          );
        } else {
          this.arrayAnteriores = this.arrayAnteriores.concat(
            this.reunionesOrdenado[i]
          );
        }
      }
    },
    click_irASala() {
      console.log("Yendo a la sala");
    },
    click_eliminar(item) {
      console.log("eliminar");
      if (confirm("Estas seguro de que quieres eliminar la reunión")) {
        // llamada a la API
        let index = this.reunionesOrdenado.findIndex(
          (element) => element.nombre === item.nombre
        );
        this.reunionesOrdenado.splice(index, 1);
      }
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
      // LLamada a API para crear reunion
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
    sortFechaHora(reuniones) {
      return reuniones.sort(function (a, b) {
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
    },
  },
};
</script>
