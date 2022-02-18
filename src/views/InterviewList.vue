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
          :to="{ path: '/createInterview' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="plus" /> Create interview</router-link
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
      <open-interviews />
    </div>
    <div class="col-sm-6">
      <closed-interviews />
    </div>
  </div>
</template>

<script>
import OpenInterviews from "@/components/OpenInterviews.vue";
import ClosedInterviews from "@/components/ClosedInterviews.vue";
export default {
  name: "InterviewListView",
  components: {
    OpenInterviews,
    ClosedInterviews,
  },
  props: {
    meetingList: {
      type: Array,
    },
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
