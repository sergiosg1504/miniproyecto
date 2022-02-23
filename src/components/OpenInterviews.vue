<template>
  <div v-bind:class="{ 'table-container': !home, 'col-sm-12': home }">
    <h4>Open interviews</h4>
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
        <b-button
          v-b-tooltip.hover
          title="Close the interview"
          @click="click_closeInterview(data.item)"
          ><font-awesome-icon icon="ban"
        /></b-button>
        <!--<b-button v-b-tooltip.hover title="Edit" @click="click_edit(data.item)"
          ><font-awesome-icon icon="edit" />
        </b-button>-->
      </template>
      <template #row-details="data">
        <div class="col-sm-12 card profile-card">
          <p>Interview name:</p>
          <p>{{ data.item.name }}</p>
          <p>Questions list:</p>
          <div v-for="(interview, i) in interviews" :key="i">
            <div v-if="interview.id === data.item.id">
              <div v-for="(q, j) in interviewsInfo[i]" :key="j">
                <div v-for="(question, k) in q.questions" :key="k">
                  {{ question.title }}
                </div>
              </div>
            </div>
          </div>
          <p>Candidates invited:</p>
          <div v-for="(candidates, a) in interviews" :key="a">
            <div v-if="candidates.id === data.item.id">
              <div v-for="(c, b) in interviewsInfo[a]" :key="b">
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
  GET_ID,
  GET_INTER_INFO,
  ARCHIVE_POS,
  DELETE_POS,
} from "../graphql/queries/me/interviews";
export default {
  name: "OpenInterviews",
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
      if (aux.data.positions[i].archived == null) {
        this.interviews.push(aux.data.positions[i]);
        const aux2 = await this.$apollo.query({
          query: GET_INTER_INFO,
          variables: { position: aux.data.positions[i].id },
        });
        this.interviewsInfo.push(aux2.data.interviews);
      }
    }
    //console.log(this.interviewsInfo);
    //console.log(this.interviewsInfo[2].);
    /*this.interviewsInfo[0].forEach(a => {
      console.log('1  ' + a.candidate.name);
    });
    this.interviewsInfo[1].forEach(a => {
      console.log('2  ' +a.candidate.name);
    });
    this.interviewsInfo[2].forEach(a => {
      console.log('3  '+a.candidate.name);
    });*/
    /*this.interviewsInfo[0].forEach(a => {
     a.forEach(b => {
       console.log('1  for : ' + b.questions.title);
     });
      //console.log('1  '+a.questions.title);
    });*/
    this.interviewsInfo[2].forEach((a) => {
      a.questions.forEach((b) => {
        console.log(b.title);
      });
      //console.log('2  '+a.questions[0].title);
    });
    /*this.interviewsInfo[2].forEach(a => {
      console.log('3  '+a.questions);
    });*/
  },
  methods: {
    click_closeInterview(interview) {
      this.$apollo
        .mutate({
          mutation: ARCHIVE_POS,
          variables: {
            positionId: interview.id,
            archive: true,
          },
        })
        .then(() => {
          alert("Position closed successfully");
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(interview.id);
    },
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
