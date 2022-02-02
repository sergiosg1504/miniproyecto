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
    <h4>Update meeting</h4>
    <update-meeting :meeting="meeting" />
  </div>
</template>

<script>
import UpdateMeeting from "@/components/UpdateMeeting.vue";

export default {
  name: "UpdateMeetingView",
  components: {
    UpdateMeeting,
  },
  props: {
    meeting: {
      type: Object,
      required: true,
    },
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
