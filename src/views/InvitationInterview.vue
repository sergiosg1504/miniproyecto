<template>
  <div class="col-sm-12 main-container">
    <div class="secondNavbar">
      <div class="links-container">
        <router-link
          :to="{ path: '/interviewList' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to
          interviews</router-link
        >
        <router-link
          :to="{ path: '/createInterview' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="plus" /> Create an Interview</router-link
        >
      </div>
    </div>
    <h4>Send interview</h4>
    <invitation-interview />
  </div>
</template>

<script>
import InvitationInterview from "../components/InvitationInterview.vue";

export default {
  name: "InvitationInterviewView",
  components: {
    InvitationInterview,
  },
};
</script>

<style scoped>
#app > .bg-white .main-container {
  max-width: 100%;
  float: none;
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 0px !important;
}
a {
  color: inherit;
  text-decoration: none !important;
}
a:hover {
  color: inherit;
  text-decoration: none !important;
  cursor: pointer;
}
</style>
