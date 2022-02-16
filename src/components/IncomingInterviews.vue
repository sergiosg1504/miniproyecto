<template>
  <div v-bind:class="{ 'table-container': !home, 'col-sm-12': home }">
    <h4>Incoming interviews</h4>
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
          v-model="filter"
          type="search"
        ></b-form-input>
      </div>
    </div>

    <b-table
      ref="analysesTable"
      id="incomingMeetings"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="headers"
      :items="interviews"
      :filter="filter"
      responsive="sm"
      v-bind:class="{ clickable: clickable }"
    >
      <template #cell(name)="data">
        {{ data.item.name }}
      </template>
      <template #cell(options)="">
        <!--<b-button
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
        </b-button>-->
      </template>
      <!--<template #row-details="data">
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
      </template>-->
    </b-table>
  </div>
</template>

<script>
//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { GET_ID } from "../graphql/queries/me/interviews";
export default {
  name: "IncomingInterviews",
  components: {
    //FontAwesomeIcon,
  },
  data() {
    return {
      headers: [
        { key: "name", sortable: true, label: "Name" },
        { key: "options", label: "Options" },
      ],
      perPage: 10,
      pageOptions: this.$paginationOptions,
      currentPage: 1,
      clickable: true,
      filter: null,
      // mis variables
      interviews: [],
      rows: this.rows_total,
    };
  },
  props: {
    home: Boolean,
  },
  computed: {
    rows_total() {
      return this.users.length;
    },
  },
  async created() {
    const aux = await this.$apollo.query({ query: GET_ID });
    let i;
    for (i = 0; i < aux.data.positions.length; i++) {
      if (aux.data.positions[i].archived == null)
        this.interviews.push(aux.data.positions[i]);
    }
    /*for (let i = 0; i < this.interviewList.length; i++) {
      console.log(this.interviewList[i].name);
    }*/
    // separar la interviewList entre previousInterviewList e incomingInterviewList
    // de momento mando todo a incoming para ver si va xd porque no se va a poder separar
    /*this.incomingInterviewList = this.interviewList;
    console.log("incoming interview de la lista vista");
    for (let i = 0; i < this.incomingInterviewList.length; i++) {
      console.log(this.incomingInterviewList[i].name);
    }*/
  },
  methods: {},
};
</script>
