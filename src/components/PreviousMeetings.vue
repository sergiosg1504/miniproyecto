<template>
  <div v-bind:class="{ 'table-container': !home, 'col-sm-12': home }">
    <h4>Previous meetings</h4>
    <div class="row">
      <div class="col-sm-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="usersAnalyses"
        ></b-pagination>
      </div>
      <div class="col-sm-4">
        <b-form-select
          class="numPerPage paginationSelectorTable"
          v-model="perPage"
          :options="pageOptions"
        ></b-form-select>
      </div>
      <div class="col-sm-4">
        <b-form-input
          id="filter-input"
          v-model="filterPrevious"
          type="date"
        ></b-form-input>
      </div>
    </div>

    <b-table
      ref="analysesTable"
      id="incomingMeetings"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="headers"
      :items="arrayPreviousSearch"
      responsive="sm"
    >
      <template #cell(date)="data">
        {{ data.item.date }}
      </template>
      <template #cell(hour)="data">
        {{ data.item.hour }}
      </template>
      <template #cell(name)="data">
        {{ data.item.name }}
      </template>
      <template #cell(options)="data">
        <b-button
          v-b-tooltip.hover
          title="Go to meeting room"
          @click="click_irASala"
          ><font-awesome-icon icon="video" />
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Show meeting information"
          v-if="!data.detailsShowing"
          @click="data.toggleDetails"
          ><font-awesome-icon icon="eye" />
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Hide meeting information"
          v-else=""
          @click="data.toggleDetails"
          ><font-awesome-icon icon="eye-slash" />
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Delete element"
          @click="click_eliminar(data.item)"
          ><font-awesome-icon icon="trash" />
        </b-button>
      </template>
      <template #row-details="data">
        <div
          class="col-sm-12 card profile-card"
          v-for="item in data.item.results"
          v-bind:key="item.id"
        >
          <p>
            Analysis number
            <font-awesome-icon icon="trash" />
          </p>
        </div>
      </template>
    </b-table>
    <!--<p>PRUEBAS</p>
    <template>
        <vsa-list>
	        <vsa-item class="col-sm-12 card profile-card">
            <vsa-heading>
              <p>HEADER</p>
            </vsa-heading>
            <vsa-icon>
              <span class="open"><font-awesome-icon icon="video" /></span>
              <span class="close"><font-awesome-icon icon="trash" /></span>
            </vsa-icon>
            <vsa-content>
              <p> contentĀaaaaaaaaa</p>
            </vsa-content>
	        </vsa-item>
	      </vsa-list>
      </template>-->
  </div>
</template>

<script>
/*import {
		VsaList,
		VsaItem,
		VsaHeading,
		VsaContent,
		VsaIcon
	} from 'vue-simple-accordion'
	import 'vue-simple-accordion/dist/vue-simple-accordion.css'*/
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "PreviousMeetings",
  components: {
    /*VsaList,
			VsaItem,
			VsaHeading,
			VsaContent,
			VsaIcon,*/
    FontAwesomeIcon,
  },
  data() {
    return {
      headers: [
        { key: "date", sortable: true, label: "Date" },
        { key: "hour", sortable: true, label: "Hour" },
        { key: "name", sortable: true, label: "Name" },
        { key: "options", label: "Options" },
      ],
      flagInfo: false,
      perPage: 10,
      pageOptions: this.$paginationOptions,
      currentPage: 1,
      selectedId: null,
      clickable: true,
      // mis variables
      showDetails: false,
      date: new Date(),
      datePC: { date: "", hour: "" },
      PCFormat: { date: "", hour: "" },
      inputPrevious: "",
      arrayPrevious: [],
      arrayPreviousSearch: [],
      meetingsSorted: [],
      // datos
      meetings: [
        { index: 1, date: "01-01-0001", hour: "00:00", name: "a" },
        { index: 2, date: "01-01-0002", hour: "01:00", name: "b" },
        { index: 3, date: "01-01-0003", hour: "02:00", name: "c" },
        { index: 4, date: "01-01-0004", hour: "03:00", name: "d" },
        { index: 5, date: "01-01-0005", hour: "04:00", name: "e" },
        { index: 6, date: "01-01-0006", hour: "05:00", name: "f" },
        { index: 7, date: "02-01-0001", hour: "00:00", name: "g" },
        { index: 8, date: "03-01-0001", hour: "01:00", name: "h" },
        { index: 9, date: "01-02-0001", hour: "02:00", name: "i" },
        { index: 10, date: "01-03-0001", hour: "03:00", name: "j" },
        { index: 11, date: "01-01-4001", hour: "04:00", name: "k" },
        { index: 12, date: "01-01-5001", hour: "05:00", name: "l" },
        { index: 13, date: "03-01-6001", hour: "01:00", name: "m" },
        { index: 14, date: "01-02-7001", hour: "02:00", name: "n" },
        { index: 15, date: "01-03-8001", hour: "03:00", name: "o" },
        { index: 16, date: "01-01-9001", hour: "04:00", name: "p" },
        { index: 17, date: "01-01-9901", hour: "05:00", name: "q" },
        { index: 18, date: "22-11-2021", hour: "05:00", name: "r" },
        { index: 19, date: "22-11-2021", hour: "22:00", name: "s" },
        { index: 20, date: "01-01-2022", hour: "22:00", name: "t" },
      ],
      rows: this.rows_total,
      selectedAnalysis: null,
      selectedAnalysisIndex: null,
    };
  },
  props: {
    home: Boolean,
  },
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
    this.datePC.hour = this.date.getHours() + ":" + this.date.getMinutes();
    this.PCFormat.date =
      this.datePC.date.substring(6, 10) +
      this.datePC.date.substring(3, 5) +
      this.datePC.date.substring(0, 2);
    this.PCFormat.hour =
      this.datePC.hour.substring(0, 2) + this.datePC.hour.substring(3, 5);
    this.meetingsSorted = this.sortDateHour(this.meetings);
    this.calculateIncAndPrev();
    this.arrayPreviousSearch = this.arrayPrevious;
  },
  computed: {
    rows_total() {
      return this.users.length;
    },
    filterPrevious: {
      get() {
        return (
          this.inputPrevious.substring(6, 10) +
          "-" +
          this.inputPrevious.substring(3, 5) +
          "-" +
          this.inputPrevious.substring(0, 2)
        );
      },
      set(value) {
        if (value.length === 0) {
          this.arrayPreviousSearch = this.arrayPrevious;
        } else {
          value =
            value.substring(8, 10) +
            "-" +
            value.substring(5, 7) +
            "-" +
            value.substring(0, 4);
          this.arrayPreviousSearch = this.arrayPrevious.filter(
            (item) => item.date.indexOf(value) !== -1
          );
        }
        this.inputPrevious = value;
      },
    },
  },
  methods: {
    showDeleteModal(id, index) {
      this.selectedAnalysis = id;
      this.selectedAnalysisIndex = index;
      this.$refs["delete-modal"].show();
    },
    // mis metodos
    showInfo() {
      if (this.showInfo) {
        this.flagInfo = false;
        console.log("falgInfo");
        return true;
      } else {
        this.flagInfo = true;
        console.log("falgInfo");
        return false;
      }
    },
    calculateIncAndPrev() {
      this.arrayPrevious = [];
      for (var i = 0; i < this.meetingsSorted.length; i++) {
        var dateFormat =
          this.meetingsSorted[i].date.substring(6, 10) +
          this.meetingsSorted[i].date.substring(3, 5) +
          this.meetingsSorted[i].date.substring(0, 2);
        var hourFormat =
          this.meetingsSorted[i].hour.substring(0, 2) +
          this.meetingsSorted[i].hour.substring(3, 5);
        if (
          parseInt(dateFormat, 10) < parseInt(this.PCFormat.date, 10) ||
          (parseInt(dateFormat, 10) === parseInt(this.PCFormat.date, 10) &&
            parseInt(hourFormat, 10) < parseInt(this.PCFormat.hour, 10))
        ) {
          this.arrayPrevious = this.arrayPrevious.concat(
            this.meetingsSorted[i]
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
        let index = this.meetingsSorted.findIndex(
          (element) => element.name === item.name
        );
        this.meetingsSorted.splice(index, 1);
      }
    },
    click_datos(item) {
      if (this.showDetails) this.showDetails = false;
      else this.showDetails = true;
      console.log(item.name);
      console.log(item.descripcion);
      console.log(item.password);
      console.log(item.date);
      console.log(item.hour);
      console.log(item.videoHost);
      console.log(item.videoGuest);
    },
    sortDateHour(meetings) {
      return meetings.sort(function (a, b) {
        if (a.date.substring(6, 10) < b.date.substring(6, 10)) {
          return -1;
        } else if (a.date.substring(6, 10) > b.date.substring(6, 10)) {
          return 1;
        } else {
          if (a.date.substring(3, 5) < b.date.substring(3, 5)) {
            return -1;
          } else if (a.date.substring(3, 5) > b.date.substring(3, 5)) {
            return 1;
          } else {
            if (a.date.substring(0, 2) < b.date.substring(0, 2)) {
              return -1;
            } else if (a.date.substring(0, 2) > b.date.substring(0, 2)) {
              return 1;
            } else {
              if (a.hour < b.hour) {
                return -1;
              } else if (a.hour > b.hour) {
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

<style scoped>
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
  width: 126px;
  margin: 0 40px 0 0;
}
.item4 {
  width: 72px;
}
.item5 {
  float: left;
  margin: 0 10px 0;
}
/* borrar */
.vsa-item {
  .vsa-item__trigger__icon {
    .open {
      display: none;
    }

    .close {
      display: block;
    }
  }
  .open {
    display: block;
  }

  .close {
    display: none;
  }
}
.thicker {
  border: none;
  height: 2px !important;
  color: black;
  background-color: black;
}
.caret-off::before {
  display: none !important;
}
.caret-off::after {
  display: none !important;
}
.technology-name {
  margin-bottom: 15px !important;
}

.profile-name-div {
  margin-bottom: 5px !important;
}

.left-div {
  position: relative;
}

.profile-name-title {
  font-weight: bolder;
  font-size: 24px;
}

.profile-name {
  position: absolute;
  bottom: 0;
  margin-bottom: 0px !important;
}

.edit-button {
  float: right;
}

.cancel-button {
  float: center;
  margin-left: 5%;
}

.icon-profile {
  padding-right: 0px !important;
}

.title {
  margin-bottom: 0px !important;
}

.subtitle {
  margin-left: 15px;
}

.added-education,
.added-frameworks,
.added-programming-skills,
.added-other-skills,
.added-tools,
.added-certifications {
  margin-top: 1em;
  display: inline-block;
}

.divItems {
  text-align: left;
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 1em;
}

.vsa-list {
  --vsa-border-color: white !important;
  --vsa-highlight-color: #4fc0e8 !important;
}

.expand-button {
  margin-left: auto;
}

.btn-link {
  font-weight: 600 !important;
  color: #ffff !important;
}

.cancelColor {
  color: rgb(73, 71, 71) !important;
}

.buttons-to-copy {
  float: left;
}
</style>
