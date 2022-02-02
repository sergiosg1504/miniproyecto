<template>
  <div class="col-sm-12 main-container">
    <div class="secondNavbar">
      <div class="links-container">
        <router-link
          :to="{ path: '/meetingList' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to meetings</router-link
        >
      </div>
    </div>
    <h4>Add interview</h4>
    <create-interview />
  </div>
</template>

<script>
import CreateInterview from "@/components/CreateInterview.vue";

export default {
  name: "CreateInterviewView",
  components: {
    CreateInterview,
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
</style>
