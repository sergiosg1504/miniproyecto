<template>
  <div v-bind:class="{ 'table-container': !home, 'col-sm-12': home }">
    <h4>Previous meetings</h4>
    <div class="row">
      <div class="col-sm-3">
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
      <div class="col-sm-5">
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
      v-bind:class="{ clickable: clickable }"
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
          title="Go to meeting room"
          @click="click_irASala"
          ><font-awesome-icon icon="video" />
        </b-button>
      </template>
      <template #row-details="data">
        <div class="col-sm-12 card profile-card">
          <p>
            Name: {{ data.item.name }}<br />Description:
            {{ data.item.descripcion }}<br />Number of participants:
            {{ data.item.numParticipants }}<br />
            <b-button
              v-b-tooltip.hover
              title="Delete element"
              @click="click_delete(data.item)"
              ><font-awesome-icon icon="trash" />
            </b-button>
          </p>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "PreviousMeetings",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      headers: [
        { key: "date", sortable: true, label: "Date" },
        { key: "hour", label: "Hour" },
        { key: "name", sortable: true, label: "Name" },
        { key: "options", label: "Options" },
      ],
      flagInfo: false,
      perPage: 10,
      pageOptions: this.$paginationOptions,
      currentPage: 1,
      clickable: true,
      // mis variables
      date: new Date(),
      datePC: { date: "", hour: "" },
      PCFormat: { date: "", hour: "" },
      inputPrevious: "",
      arrayPrevious: [],
      arrayPreviousSearch: [],
      meetingsSorted: [],
      // datos
      meetings: [
        {
          index: 1,
          date: "01-01-0001",
          hour: "00:00",
          name: "a",
          numParticipants: 10,
        },
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
    };
  },
  props: {
    home: Boolean,
  },
  mounted() {
    if (this.date.getDate() < 10 && this.date.getMonth() + 1 < 10) {
      this.datePC.date =
        "0" +
        this.date.getDate() +
        "-0" +
        (this.date.getMonth() + 1) +
        "-" +
        this.date.getFullYear();
    } else if (this.date.getDate() >= 10 && this.date.getMonth() + 1 < 10) {
      this.datePC.date =
        this.date.getDate() +
        "-0" +
        (this.date.getMonth() + 1) +
        "-" +
        this.date.getFullYear();
    } else if (this.date.getDate() < 10 && this.date.getMonth() + 1 >= 10) {
      this.datePC.date =
        "0" +
        this.date.getDate() +
        "-" +
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
    click_delete(item) {
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
