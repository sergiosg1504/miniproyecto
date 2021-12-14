<template>
  <div id="#app">
    <navigation-bar />
    <div class="col-md-12 bg-white full-height full-width">
      <div class="col-sm-12 main-container" v-if="!programarReunion">
        <div class="col-sm-6">
          <!--proximos-->
          <div class="table-container">
            <h4>Proximos</h4>
            <div class="row">
              <div class="col-sm-3">
                <ul
                  class="pagination b-pagination"
                  role="menubar"
                  aria-disabled="false"
                  aria-label="Pagination"
                >
                  <li
                    class="page-item disabled"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <span
                      class="page-link"
                      role="menuitem"
                      aria-label="Go to first page"
                      aria-controls="usersAnalyses"
                      aria-disabled="true"
                      >«</span
                    >
                  </li>
                  <li
                    class="page-item disabled"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <span
                      class="page-link"
                      role="menuitem"
                      aria-label="Go to previous page"
                      aria-controls="usersAnalyses"
                      aria-disabled="true"
                      >‹</span
                    >
                  </li>
                  <li class="page-item disabled" role="presentation">
                    <button
                      class="page-link"
                      role="menuitemradio"
                      type="button"
                      aria-controls="usersAnalyses"
                      aria-label="Go to page 1"
                      aria-checked="true"
                      aria-posinset="1"
                      aria-setsize="1"
                      tabindex="0"
                    >
                      1
                    </button>
                  </li>
                  <li
                    class="page-item disabled"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <span
                      class="page-link"
                      role="menuitem"
                      aria-label="Go to first page"
                      aria-controls="usersAnalyses"
                      aria-disabled="true"
                      >›</span
                    >
                  </li>
                  <li
                    class="page-item disabled"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <span
                      class="page-link"
                      role="menuitem"
                      aria-label="Go to previous page"
                      aria-controls="usersAnalyses"
                      aria-disabled="true"
                      >»</span
                    >
                  </li>
                </ul>
              </div>
              <div class="col-sm-4">
                <select
                  id="__BVID__34"
                  class="numPerPage paginationSelectorTable custom-select"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="9007199254740991">Show all</option>
                </select>
              </div>
              <div class="col-sm-5">
                <input
                  v-model="filtroProximos"
                  id="filter-input"
                  class="form-control"
                  type="date"
                  placeholder="Type to search"
                />
              </div>
            </div>
            <div class="table-responsive-sm">
              <table
                id="meetingAnalyses"
                class="table b-table"
                role="table"
                aria-busy="false"
                aria-colcount="3"
              >
                <thead class="" role="rowgroup">
                  <tr class="" role="row">
                    <th
                      class=""
                      role="columnheader"
                      scope="col"
                      tabindex="0"
                      aria-colindex="1"
                      aria-sort="ascending"
                    >
                      <div>Fecha</div>
                      <span class="sr-only">(Click to sort Descending)</span>
                    </th>
                    <th
                      class=""
                      role="columnheader"
                      scope="col"
                      tabindex="0"
                      aria-colindex="1"
                      aria-sort="ascending"
                    >
                      <div>Hora</div>
                      <span class="sr-only">(Click to sort Descending)</span>
                    </th>
                    <th
                      class=""
                      role="columnheader"
                      scope="col"
                      tabindex="0"
                      aria-colindex="1"
                      aria-sort="ascending"
                    >
                      <div>Nombre</div>
                      <span class="sr-only">(Click to sort Descending)</span>
                    </th>
                    <th
                      class=""
                      role="columnheader"
                      scope="col"
                      tabindex="0"
                      aria-colindex="1"
                      aria-sort="ascending"
                    >
                      <div>Options</div>
                      <span class="sr-only">(Click to sort Descending)</span>
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  <tr
                    class=""
                    role="row"
                    aria-rowindex="1"
                    v-for="(item, i) in arrayProximosBusqueda"
                    :key="i"
                  >
                    <td class="" aria-colindex="1" role="cell">
                      {{ item.fecha }}
                    </td>
                    <td class="" aria-colindex="2" role="cell">
                      {{ item.hora }}
                    </td>
                    <td class="" aria-colindex="3" role="cell">
                      {{ item.nombre }}
                    </td>
                    <td class="" aria-colindex="4" role="cell">
                      <button
                        class="btn btn-secondary"
                        @click="click_irASala"
                        title="Acceder a la sala"
                        type="button"
                      >
                        <icon icon="video" />
                      </button>
                      <button
                        class="btn btn-secondary"
                        @click="click_eliminar(item)"
                        title="Eliminar"
                        type="button"
                      >
                        <icon icon="trash" />
                      </button>
                      <button
                        class="btn btn-secondary"
                        @click="click_datos(item)"
                        title="Datos de la reunión"
                        type="button"
                      >
                        <icon icon="info-circle" />
                      </button>
                    </td>
                  </tr>
                </tbody>
                <!--event-->
              </table>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <!--anteriores-->
          <div class="links-container">
            <a class="btn btn-secondary float-right" href="/home">
              <icon icon="arrow-left" />
              Back to modules
            </a>
            <a
              class="btn btn-secondary float-right"
              @click="click_ProgramarReunion"
            >
              <icon icon="plus" />
              Add reunion
            </a>
          </div>
          <div class="table-container">
            <h4>Anteriores</h4>
            <div class="row">
              <div class="col-sm-3">
                <ul
                  class="pagination b-pagination"
                  role="menubar"
                  aria-disabled="false"
                  aria-label="Pagination"
                >
                  <li
                    class="page-item disabled"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <span
                      class="page-link"
                      role="menuitem"
                      aria-label="Go to first page"
                      aria-controls="usersAnalyses"
                      aria-disabled="true"
                      >«</span
                    >
                  </li>
                  <li
                    class="page-item disabled"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <span
                      class="page-link"
                      role="menuitem"
                      aria-label="Go to previous page"
                      aria-controls="usersAnalyses"
                      aria-disabled="true"
                      >‹</span
                    >
                  </li>
                  <li class="page-item disabled" role="presentation">
                    <button
                      class="page-link"
                      role="menuitemradio"
                      type="button"
                      aria-controls="usersAnalyses"
                      aria-label="Go to page 1"
                      aria-checked="true"
                      aria-posinset="1"
                      aria-setsize="1"
                      tabindex="0"
                    >
                      1
                    </button>
                  </li>
                  <li
                    class="page-item disabled"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <span
                      class="page-link"
                      role="menuitem"
                      aria-label="Go to first page"
                      aria-controls="usersAnalyses"
                      aria-disabled="true"
                      >›</span
                    >
                  </li>
                  <li
                    class="page-item disabled"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <span
                      class="page-link"
                      role="menuitem"
                      aria-label="Go to previous page"
                      aria-controls="usersAnalyses"
                      aria-disabled="true"
                      >»</span
                    >
                  </li>
                </ul>
              </div>
              <div class="col-sm-4">
                <select
                  id="__BVID__49"
                  class="numPerPage paginationSelectorTable custom-select"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="9007199254740991">Show all</option>
                </select>
              </div>
              <div class="col-sm-5">
                <input
                  v-model="filtroAnteriores"
                  id="filter-input"
                  class="form-control"
                  type="date"
                  placeholder="Type to search"
                />
              </div>
            </div>
            <div class="table-responsive-sm clickable">
              <table
                id="meetingAnalyses"
                class="table b-table"
                role="table"
                aria-busy="false"
                aria-colcount="3"
              >
                <thead class="" role="rowgroup">
                  <tr class="" role="row">
                    <th
                      class=""
                      role="columnheader"
                      scope="col"
                      tabindex="0"
                      aria-colindex="1"
                      aria-sort="ascending"
                    >
                      <div>Fecha</div>
                      <span class="sr-only">(Click to sort Descending)</span>
                    </th>
                    <th
                      class=""
                      role="columnheader"
                      scope="col"
                      tabindex="0"
                      aria-colindex="1"
                      aria-sort="ascending"
                    >
                      <div>Hora</div>
                      <span class="sr-only">(Click to sort Descending)</span>
                    </th>
                    <th
                      class=""
                      role="columnheader"
                      scope="col"
                      tabindex="0"
                      aria-colindex="1"
                      aria-sort="ascending"
                    >
                      <div>Nombre</div>
                      <span class="sr-only">(Click to sort Descending)</span>
                    </th>
                    <th
                      class=""
                      role="columnheader"
                      scope="col"
                      tabindex="0"
                      aria-colindex="1"
                      aria-sort="ascending"
                    >
                      <div>Options</div>
                      <span class="sr-only">(Click to sort Descending)</span>
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  <tr
                    class=""
                    role="row"
                    aria-rowindex="1"
                    v-for="(item, i) in arrayAnterioresBusqueda"
                    :key="i"
                  >
                    <td class="" aria-colindex="1" role="cell">
                      {{ item.fecha }}
                    </td>
                    <td class="" aria-colindex="2" role="cell">
                      {{ item.hora }}
                    </td>
                    <td class="" aria-colindex="3" role="cell">
                      {{ item.nombre }}
                    </td>
                    <td class="" aria-colindex="4" role="cell">
                      <button
                        class="btn btn-secondary"
                        @click="click_irASala"
                        title="Acceder a la sala"
                        type="button"
                      >
                        <icon icon="video" />
                      </button>
                      <button
                        class="btn btn-secondary"
                        @click="click_eliminar(item)"
                        title="Eliminar"
                        type="button"
                      >
                        <icon icon="trash" />
                      </button>
                      <button
                        class="btn btn-secondary"
                        @click="click_datos(item)"
                        title="Datos de la reunión"
                        type="button"
                      >
                        <icon icon="info-circle" />
                      </button>
                    </td>
                  </tr>
                </tbody>
                <!--event-->
              </table>
            </div>
          </div>
        </div>
      </div>
      <!--crear reunion-->
      <div class="col-sm-12 main-container" v-if="programarReunion">
        <a class="btn btn-secondary float-right" href="/home">
          <icon icon="arrow-left" />
          Back to modules
        </a>
        <a
          class="btn btn-secondary float-right"
          @click="click_ProgramarReunion"
        >
          <icon icon="arrow-left" />
          Back to reuniones
        </a>
        <h4>Programar Reunion</h4>
        <div class="container">
          <div class="item">
            <p class="gris">Nombre</p>
          </div>
          <div class="item2">
            <input v-model="nuevaReunion.nombre" class="form-input" />
          </div>
        </div>
        <div class="container">
          <div class="item">
            <p class="gris">Descripcion</p>
          </div>
          <div class="item2">
            <input v-model="nuevaReunion.descripcion" class="form-input" />
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
            />
          </div>
        </div>
        <div class="container">
          <div class="item">
            <p class="gris">Fecha</p>
          </div>
          <div class="item3">
            <input
              v-model="nuevaReunion.fecha"
              class="form-input"
              type="date"
            />
          </div>
          <div class="item4">
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
            <button class="boton" @click="click_CrearReunion">
              <icon icon="check-circle" />
              Guardar
            </button>
          </div>
          <div class="item">
            <button class="boton" @click="click_Cancelar">
              <icon icon="times-circle"></icon>
              Cancelar
            </button>
          </div>
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
    programarReunion: false,
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
  }),
  methods: {
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
      let confirmacion = confirm("Estas seguro de que quieres eliminar ");
      if (confirmacion === true) {
        // llamada a la API
        let index = this.reunionesOrdenado.findIndex(
          (element) => element.nombre === item.nombre
        );
        console.log(index);
        console.log(this.reunionesOrdenado[index].nombre);
        this.reunionesOrdenado.splice(index, 1);
        console.log(this.reunionesOrdenado[index].nombre);
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
  computed: {
    filtroProximos: {
      get() {
        return (
          this.inputProximos.substring(6, 10) +
          "-" +
          this.inputProximos.substring(3, 5) +
          "-" +
          this.inputProximos.substring(0, 2)
        );
      },
      set(value) {
        console.log(value);
        if (value === this.empty) {
          console.log("empty");
          this.arrayProximosBusqueda = this.arrayProximos;
        } else {
          console.log("miau");
          value =
            value.substring(8, 10) +
            "-" +
            value.substring(5, 7) +
            "-" +
            value.substring(0, 4);
          console.log(value);
          this.arrayProximosBusqueda = this.arrayProximos.filter(
            (item) => item.fecha.indexOf(value) !== -1
          );
          this.inputProximos = value;
        }
      },
    },
    filtroAnteriores: {
      get() {
        return (
          this.inputAnteriores.substring(6, 10) +
          "-" +
          this.inputAnteriores.substring(3, 5) +
          "-" +
          this.inputAnteriores.substring(0, 2)
        );
      },
      set(value) {
        console.log(value);
        if (value === this.empty) {
          this.arrayAnterioresBusqueda = this.arrayAnteriores;
        } else {
          value =
            value.substring(8, 10) +
            "-" +
            value.substring(5, 7) +
            "-" +
            value.substring(0, 4);
          this.arrayAnterioresBusqueda = this.arrayAnteriores.filter(
            (item) => item.fecha.indexOf(value) !== -1
          );
          this.inputAnteriores = value;
        }
      },
    },
  },
  created() {
    this.inputProximos =
      this.texto =
      this.nuevaReunion.fecha =
      this.fechaPC.fecha =
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
#app > .bg-white {
  padding-left: 0px;
}
#app > .bg-white .main-container {
  max-width: 100%;
  float: none;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 0.7rem;
}
#app .logged-navbar.collapsed-sidebar ~ .bg-white {
  padding-left: 85px;
}
#app h4 {
  font-weight: 900;
  text-align: left;
  border-bottom: 5px solid;
  padding-bottom: 10px;
  margin-bottom: 35px;
}
.full-height {
  height: 100%;
}
.full-width {
  width: 100%;
}
.main-container {
  position: relative;
  overflow: hidden;
  float: right;
  width: 100%;
}
legend.col-form-label {
  float: left;
  text-align: left;
  font-weight: bold;
  color: #000;
}
.table-container {
  margin: 0;
  max-width: 100%;
}
.form-row {
  position: relative;
  overflow: hidden;
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
[type="search"] {
  outline-offset: -2px;
  -webkit-appearance: textfield;
}
/*Responsive*/

@media (min-width: 576px) {
  .col-sm-6,
  .col-sm-4,
  .col-sm-10,
  .col-sm-2,
  .col-sm-3 {
    float: left;
  }
  .col-sm-12 {
    position: relative;
    overflow: hidden;
  }
}
.col-sm-6 {
  padding: 20px;
}
.col-sm-2 {
  flex: 0 0 auto;
  width: 16.6666666667%;
}
.col-sm-7 {
  flex: 0 0 auto;
  width: 58.3333333333%;
}
.col-sm-3 {
  flex: 0 0 auto;
  width: 25%;
}
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
}
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
}
.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) / 2);
  padding-left: calc(var(--bs-gutter-x) / 2);
  margin-top: var(--bs-gutter-y);
}
.chart-container .col-sm-6 {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 50%;
  float: left;
}
.chart-container .col-sm-6 div:first-of-type {
  width: 100%;
  max-width: 65%;
  margin: 0 auto;
  float: none;
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
.custom-control {
  position: relative;
  overflow: hidden;
  float: left;
}
.custom-control input[type="radio"] {
  width: 15px;
  float: left;
  margin-top: 5px;
  margin-right: 5px;
}
.custom-radio {
  width: 10%;
  float: left;
}
.custom-checkbox {
  margin-right: 15px;
}
.page-item.active .page-link {
  color: #fff !important;
  background-color: #2c3e50 !important;
  border-color: #2c3e50 !important;
}
.pagination {
  display: flex;
  padding-left: 0;
  list-style: none;
}
.paginationSelectorTable {
  float: left;
  height: 67%;
}
.page-item:first-child .page-link {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
}
.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
.page-item.active .page-link {
  color: #fff !important;
  background-color: #2c3e50 !important;
  border-color: #2c3e50 !important;
}
.page-item:not(:first-child) .page-link {
  margin-left: -1px;
}
.page-link {
  padding: 0.375rem 0.75rem;
}
.page-link {
  position: relative;
  display: block;
  color: #0d6efd;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-top-color: rgb(222, 226, 230);
  border-right-color: rgb(222, 226, 230);
  border-bottom-color: rgb(222, 226, 230);
  border-left-color: rgb(222, 226, 230);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.page-link {
  color: #2c3e50 !important;
}
.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.table {
  --bs-table-bg: transparent;
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: #212529;
  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
  --bs-table-active-color: #212529;
  --bs-table-active-bg: rgba(0, 0, 0, 0.1);
  --bs-table-hover-color: #212529;
  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  vertical-align: top;
  border-color: #dee2e6;
}
.table > thead {
  vertical-align: bottom;
}
.table.b-table > thead > tr > [aria-sort]:not(.b-table-sort-icon-left),
.table.b-table > tfoot > tr > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(0.75rem / 2) center;
  padding-right: calc(0.75rem + 0.65em);
}
.table.b-table > thead > tr > [aria-sort="ascending"],
.table.b-table > tfoot > tr > [aria-sort="ascending"] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' d='M51 1l25 23 24 22H1l25-22z'/%3e%3cpath fill='black' opacity='.3' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e");
}
.table.b-table > thead > tr > [aria-sort],
.table.b-table > tfoot > tr > [aria-sort] {
  cursor: pointer;
  background-image: none;
  background-repeat: no-repeat;
  background-size: 0.65em 1em;
}
.table-responsive-sm .table td {
  padding: 3px;
}
.table > tbody {
  vertical-align: inherit;
}
.table > :not(:last-child) > :last-child > * {
  border-bottom-color: currentColor;
}
.table > :not(caption) > * > * {
  padding: 0.5rem 0.5rem;
  padding-right: 0.5rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: 1px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}
.table th {
  color: #2c3e50 !important;
}
.table-responsive-sm {
  webkit-box-shadow: 3px 3px 9px -2px rgb(0 0 0 / 18%);
  -moz-box-shadow: 3px 3px 9px -2px rgba(0, 0, 0, 0.18);
  box-shadow: 3px 3px 9px -2px rgb(0 0 0 / 18%);
  border-radius: 30px;
  padding: 30px;
  border: 1px solid rgb(0 0 0 / 3%);
  padding-bottom: 5px;
  padding-top: 20px;
}
.table-responsive-sm tbody tr:last-child td {
  border: 0 !important;
}
.table-responsive-sm thead th {
  border-bottom: 3px solid #dee2e6 !important;
}
.table-responsive-sm .table td {
  padding: 3px;
}
table.table td {
  vertical-align: middle;
  text-align: left;
}
table.table .html_container p {
  margin-top: 1px !important;
  margin-bottom: 1px !important;
}
table.table .tags-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 50%;
  margin: 0 auto;
}
.analysis-profile-container table.table {
  width: 100%;
  max-width: 97%;
  margin: 0 auto;
  margin-bottom: 2%;
}
table.table ul.inline-tags {
  margin-bottom: 0% !important;
}
.clickable table.table tr:hover {
  opacity: 0.9;
  cursor: pointer;
}
.b-table-sticky-header,
.table-responsive,
[class*="table-responsive-"] {
  margin-bottom: 1rem;
}
.b-table-sticky-header > .table,
.table-responsive > .table,
[class*="table-responsive-"] > .table {
  margin-bottom: 0;
}
table {
  caption-side: bottom;
  border-collapse: collapse;
}
thead,
tbody,
tfoot,
tr,
td,
th {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}
th {
  text-align: inherit;
  text-align: -webkit-match-parent;
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
.links-container {
  width: 100%;
  position: absolute;
  z-index: 1;
  overflow: hidden;
  right: 0;
  margin-right: 27px;
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
.btn:hover {
  color: #212529;
}
.btn:hover,
a:hover {
  opacity: 0.8;
}
.btn:focus {
  box-shadow: none !important;
}
.btn-primary {
  color: #fff !important;
  background-color: #62c4e4 !important;
  border-color: #62c4e4 !important;
  border-radius: 12px !important;
  min-width: 120px;

  text-transform: uppercase;
  font-weight: bold !important;

  -webkit-box-shadow: 3px 3px 9px -2px rgb(0 0 0 / 18%);
  -moz-box-shadow: 3px 3px 9px -2px rgba(0, 0, 0, 0.18);
  box-shadow: 3px 3px 9px -2px rgb(0 0 0 / 18%);
}
.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
.btn-secondary:hover {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
}
.btn-secondary {
  color: #62c4e4 !important;
  background-color: transparent !important;
  border-color: transparent !important;
  font-weight: bold !important;
}
button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}
select {
  word-wrap: normal;
}
button,
select {
  text-transform: none;
}
input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
button:not(:disabled),
[type="button"]:not(:disabled),
[type="reset"]:not(:disabled),
[type="submit"]:not(:disabled) {
  cursor: pointer;
}
button {
  border-radius: 0;
}
a {
  color: #0d6efd;
  text-decoration: underline;
}
a:hover {
  color: #0a58ca;
}
a:hover {
  cursor: pointer;
}
.float-right {
  float: right;
}
ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}
ol,
ul {
  padding-left: 2rem;
}
ul li {
  list-style: none;
}
*,
::before,
::after {
  box-sizing: border-box;
}

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
  width: 100px;
  margin: 0 60px 0 0;
  float: left;
}
.item2 {
  width: 172px;
  float: left;
  border: 2px solid;
  border-radius: 4px;
}
.item3 {
  width: 126px;
  margin: 0 40px 0 0;
  float: left;
  border: 2px solid;
  border-radius: 4px;
}
.item4 {
  width: 72px;
  float: left;
  border: 2px solid;
  border-radius: 4px;
}
</style>
