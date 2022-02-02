<template>
  <div class="col-sm-12">
    <div class="secondNavbar">
      <navigation-bar></navigation-bar>
    </div>
    <div class="secondNavbar">
      <div class="links-container">
        <router-link
          :to="{ path: '/home' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to modules</router-link
        >
        <router-link
          :to="{ path: '/createMeeting' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="plus" /> Add meeting</router-link
        >
        <router-link
          :to="{ path: '/createInterview' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="plus" /> Add interview</router-link
        >
      </div>
    </div>
    <div class="col-sm-6">
      <incoming-meetings />
    </div>
    <div class="col-sm-6">
      <previous-meetings />
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import IncomingMeetings from "@/components/IncomingMeetings.vue";
import PreviousMeetings from "../components/PreviousMeetings.vue";
export default {
  components: {
    NavigationBar,
    IncomingMeetings,
    PreviousMeetings,
  },
};
</script>
