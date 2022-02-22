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
        <!--<b-button v-b-tooltip.hover title="Edit" @click="click_edit(data.item)"
          ><font-awesome-icon icon="edit" />
        </b-button>-->
      </template>
      <template #row-details="data">
        <div class="col-sm-12 card profile-card">
          <p>Interview name:</p>
          <p>{{ data.item.name }}</p>
          <!-- no se si tiene sentido xq los invitados se van al cerrar la position -->
          <div v-for="(inter, i) in interviews" :key="i">
            <div v-if="inter.id === data.item.id">
              <p>Candidates invited:</p>
              <div v-for="(c, j) in interviewsInfo[i]" :key="j">
                {{ c.candidate.name }}, {{ c.candidate.email }}
              </div>
            </div>
          </div>
          <b-button
            v-b-tooltip.hover
            title="Delete interview"
            @click="click_delete(data.item)"
            ><font-awesome-icon icon="trash" />
          </b-button>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  DELETE_POS,
  GET_ID,
  GET_INTER_INFO,
} from "../graphql/queries/me/interviews";
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
      if (aux.data.positions[i].archived != null) {
        this.interviews.push(aux.data.positions[i]);
        const aux2 = await this.$apollo.query({
          query: GET_INTER_INFO,
          variables: { position: aux.data.positions[i].id },
        });
        this.interviewsInfo.push(aux2.data.interviews);
      }
    }
  },
  methods: {
    click_delete(interview) {
      this.$apollo
        .mutate({
          mutation: DELETE_POS,
          variables: {
            positionId: interview.id,
          },
        })
        .then(() => {
          alert("Position deleted successfully");
          console.log("nice");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
