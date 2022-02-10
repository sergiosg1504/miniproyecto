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
        {{ data.item.startHour }}
      </template>
      <template #cell(endHour)="data">
        {{ data.item.endHour }}
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
          v-else
          @click="data.toggleDetails"
          ><font-awesome-icon icon="eye-slash" />
        </b-button>
        <b-button v-b-tooltip.hover title="Edit" @click="click_edit(data.item)"
          ><font-awesome-icon icon="edit" />
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Go to meeting room"
          @click="click_goToRoom(data.item)"
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
        { key: "startHour", label: "Start hour" },
        { key: "endHour", label: "End hour" },
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
      meetings: [],
      rows: this.rows_total,
    };
  },
  props: {
    home: Boolean,
    meetingList: {
      type: Array,
    },
  },
  mounted() {
    this.meetings = this.meetingList;
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
          this.meetingsSorted[i].startHour.substring(0, 2) +
          this.meetingsSorted[i].startHour.substring(3, 5);
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
    click_goToRoom(meet) {
      this.$router.push({ name: "WaitingRoom", params: { meeting: meet } });
      console.log("Yendo a la sala");
    },
    click_edit(meet) {
      this.$router.push({ name: "UpdateMeeting", params: { meeting: meet } });
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
      console.log(item.startHour);
      console.log(item.endHour);
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
