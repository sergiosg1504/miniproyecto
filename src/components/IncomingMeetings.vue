<template>
  <div v-bind:class="{ 'table-container': !home, 'col-sm-12': home }">
    <h4>Incoming meetings</h4>
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
          v-model="filterIncoming"
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
      :items="arrayIncomingSearch"
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
          @click="click_gotoRoom"
          ><font-awesome-icon icon="video" />
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Show information"
          @click="click_data(data.item)"
          ><font-awesome-icon icon="info-circle" />
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Delete element"
          @click="click_delete(data.item)"
          ><font-awesome-icon icon="trash" />
        </b-button>
      </template>
      <!--<template #row-details="data">
        <div
          class="col-sm-12 card profile-card"
          v-for="(item, index) in data.arrayIncomingSearch"
        >
          <p>Nombre {{ data.item.nombre }}</p>
        </div>
      </template>-->
    </b-table>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "IncomingMeetings",
  components: {
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
      perPage: 10,
      pageOptions: this.$paginationOptions,
      currentPage: 1,
      selectedId: null,
      // mis variables
      showDetails: false,
      date: new Date(),
      datePC: { date: "", hour: "" },
      PCFormat: { date: "", hour: "" },
      inputProximos: "",
      arrayIncoming: [],
      arrayIncomingSearch: [],
      meetingSorted: [],
      // datos
      meetings: [
        { date: "01-01-0001", hour: "00:00", name: "a" },
        { date: "01-01-0002", hour: "01:00", name: "b" },
        { date: "01-01-0003", hour: "02:00", name: "c" },
        { date: "01-01-0004", hour: "03:00", name: "d" },
        { date: "01-01-0005", hour: "04:00", name: "e" },
        { date: "01-01-0006", hour: "05:00", name: "f" },
        { date: "02-01-0001", hour: "00:00", name: "g" },
        { date: "03-01-0001", hour: "01:00", name: "h" },
        { date: "01-02-0001", hour: "02:00", name: "i" },
        { date: "01-03-0001", hour: "03:00", name: "j" },
        { date: "01-01-4001", hour: "04:00", name: "k" },
        { date: "01-01-5001", hour: "05:00", name: "l" },
        { date: "03-01-6001", hour: "01:00", name: "m" },
        { date: "01-02-7001", hour: "02:00", name: "n" },
        { date: "01-03-8001", hour: "03:00", name: "o" },
        { date: "01-01-9001", hour: "04:00", name: "p" },
        { date: "01-01-9901", hour: "05:00", name: "q" },
        { date: "22-11-2021", hour: "05:00", name: "r" },
        { date: "22-11-2021", hour: "22:00", name: "s" },
        { date: "01-01-2022", hour: "22:00", name: "t" },
      ],
      rows: this.rows_total,
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
    this.meetingSorted = this.sortDateHour(this.meetings);
    this.calculateIncAndPrev();
    this.arrayIncomingSearch = this.arrayIncoming;
  },
  computed: {
    rows_total() {
      return this.users.length;
    },
    filterIncoming: {
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
        if (value.length === 0) {
          this.arrayIncomingSearch = this.arrayIncoming;
        } else {
          value =
            value.substring(8, 10) +
            "-" +
            value.substring(5, 7) +
            "-" +
            value.substring(0, 4);
          this.arrayIncomingSearch = this.arrayIncoming.filter(
            (item) => item.date.indexOf(value) !== -1
          );
        }
        this.inputProximos = value;
      },
    },
  },
  methods: {
    // mis metodos
    calculateIncAndPrev() {
      this.arrayIncoming = [];
      for (var i = 0; i < this.meetingSorted.length; i++) {
        var dateFormat =
          this.meetingSorted[i].date.substring(6, 10) +
          this.meetingSorted[i].date.substring(3, 5) +
          this.meetingSorted[i].date.substring(0, 2);
        var hourFormat =
          this.meetingSorted[i].hour.substring(0, 2) +
          this.meetingSorted[i].hour.substring(3, 5);
        if (
          parseInt(dateFormat, 10) > parseInt(this.PCFormat.date, 10) ||
          (parseInt(dateFormat, 10) === parseInt(this.PCFormat.date, 10) &&
            parseInt(hourFormat, 10) >= parseInt(this.PCFormat.hour, 10))
        ) {
          this.arrayIncoming = this.arrayIncoming.concat(this.meetingSorted[i]);
        }
      }
    },
    click_gotoRoom() {
      console.log("Yendo a la sala");
    },
    click_delete(item) {
      console.log("eliminar");
      if (confirm("Estas seguro de que quieres eliminar la reunión")) {
        // llamada a la API
        let index = this.meetingSorted.findIndex(
          (element) => element.name === item.name
        );
        this.meetingSorted.splice(index, 1);
      }
    },
    click_data(item) {
      if (this.howDetails) this.showDetails = false;
      else this.showDetails = true;
      console.log(item);
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
</style>
