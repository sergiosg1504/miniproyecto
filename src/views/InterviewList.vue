<template>
  <div class="col-sm-12">
    <div class="secondNavbar">
      <div class="links-container">
        <router-link
          :to="{ path: '/meetingList' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to meetings</router-link
        >
        <b-button v-b-modal.modal-1 class="btn btn-secondary float-right"
          ><font-awesome-icon icon="plus" /> Add key</b-button
        >
        <b-modal id="modal-1" title="BootstrapVue">
          API key:
          <input
            class="form-input aux"
            type="text"
            v-model="key"
            placeholder="Introduce your API-key"
          />
          <br />
          <button class="btn btn-primary" @click="saveKey">Guardar</button>
        </b-modal>
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
import apollo from "@/graphql/apollo.js";

export default {
  name: "InterviewListView",
  components: {
    OpenInterviews,
    ClosedInterviews,
  },
  data: () => ({
    key: "f380c52f-e7fe-4e5d-b04e-f84d544b9584",
  }),
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
    saveKey() {
      apollo.getKey(this.key);
    },
  },
};
</script>
