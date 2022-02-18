<template>
  <div v-bind:class="{ 'table-container': !home, 'col-sm-12': home }">
    <h4>Closed interviews</h4>
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
      <template #cell(options)="data">
        <b-button
          v-b-tooltip.hover
          title="Show interview information"
          v-if="!data.detailsShowing"
          @click="data.toggleDetails"
          ><font-awesome-icon icon="eye" />
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Hide interivew information"
          v-else
          @click="data.toggleDetails"
          ><font-awesome-icon icon="eye-slash" />
        </b-button>
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
      <template #row-details="data">
        <div class="col-sm-12 card profile-card">
          <div v-for="(c, i) in data.item.candidates" :key="i">
            {{ c.candidate.name }}, {{ c.candidate.email }}
          </div>
          <p></p>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { GET_ID, GET_INTER_INFO } from "../graphql/queries/me/interviews";
export default {
  name: "ClosedInterviews",
  components: {
    FontAwesomeIcon,
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
      interviewsInfo: [],
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
  async mounted() {
    const aux = await this.$apollo.query({ query: GET_ID });
    let i;
    for (i = 0; i < aux.data.positions.length; i++) {
      if (aux.data.positions[i].archived != null)
        this.interviews.push(aux.data.positions[i]);
    }
    for (i = 0; i < aux.data.positions.length; i++) {
      if (aux.data.positions[i].archived != null) {
        this.interviewsInfo[i] = await this.$apollo.query({
          query: GET_INTER_INFO,
          variables: { position: aux.data.positions[i].id },
        });
      }
    }
  },
  methods: {},
};
</script>
