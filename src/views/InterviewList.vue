<template>
  <div class="col-sm-12">
    <div class="secondNavbar">
      <div class="links-container">
        <router-link
          :to="{ path: '/meetingList' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to meetings</router-link
        >
        <router-link
          :to="{ path: '/invitationInterview' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="plus" /> Send invitation</router-link
        >
        <button class="btn btn-secondary float-right" @click="goToCalendar()">
          <font-awesome-icon icon="plus" /> Calendar
        </button>
      </div>
    </div>
    <div class="col-sm-6">
      <incoming-interviews :interviewList="incomingInterviewList" />
    </div>
    <!--<div class="col-sm-6">
      <previous-interviews :interviewList="previousInterviewList" />
    </div>-->
  </div>
</template>

<script>
import IncomingInterviews from "@/components/IncomingInterviews.vue";
//import PreviousInterviews from "../components/PreviousInterviews.vue";
import { GET_ID } from "../graphql/queries/me/interviews";
export default {
  name: "InterviewListView",
  components: {
    IncomingInterviews,
    //PreviousInterviews,
  },
  props: {
    meetingList: {
      type: Array,
    },
  },
  data() {
    return {
      interviewList: [],
      incomingInterviewList: [],
      previousInterviewList: [],
    };
  },
  async created() {
    const aux = await this.$apollo.query({ query: GET_ID });
    let i;
    for (i = 0; i < aux.data.positions.length; i++) {
      if (aux.data.positions[i].archived == null)
        this.interviewList.push(aux.data.positions[i]);
    }
    /*for(let i=0; i<this.interviewList.length; i++){
        console.log(this.interviewList[i].name);
    }*/
    // separar la interviewList entre previousInterviewList e incomingInterviewList
    // de momento mando todo a incoming para ver si va xd porque no se va a poder separar
    this.incomingInterviewList = this.interviewList;
    console.log("incoming interview de la lista vista");
    for (let i = 0; i < this.incomingInterviewList.length; i++) {
      console.log(this.incomingInterviewList[i].name);
    }
  },
  methods: {
    goToCalendar() {
      this.$router.push({
        name: "Calendario",
        params: { meetingList: this.meetingList },
      });
    },
  },
};
</script>
