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
        <!--<router-link
          :to="{ path: '/InvitationInterview', params: { meetingList:'meetingList' } }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="plus" /> Send invitation</router-link
        >-->
        <button class="btn btn-secondary float-right" @click="sendInvitation()">
          <font-awesome-icon icon="plus" /> Send invitation
        </button>
      </div>
    </div>
    <div class="col-sm-6">
      <incoming-meetings :meetingList="meetingList" />
    </div>
    <div class="col-sm-6">
      <previous-meetings :meetingList="meetingList" />
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import IncomingMeetings from "@/components/IncomingMeetings.vue";
import PreviousMeetings from "../components/PreviousMeetings.vue";
export default {
  name: "MeetingListView",
  components: {
    NavigationBar,
    IncomingMeetings,
    PreviousMeetings,
  },
  data() {
    return {
      meetingList: [
        {
          date: "01-01-0001",
          startHour: "00:00",
          endHour: "00:00",
          name: "a",
          id: 1,
        },
        {
          date: "01-01-0002",
          startHour: "01:00",
          endHour: "00:00",
          name: "b",
          id: 2,
        },
        {
          date: "01-01-0003",
          startHour: "02:00",
          endHour: "00:00",
          name: "c",
          id: 3,
        },
        {
          date: "01-01-0004",
          startHour: "03:00",
          endHour: "00:00",
          name: "d",
          id: 4,
        },
        {
          date: "01-01-0005",
          startHour: "04:00",
          endHour: "00:00",
          name: "e",
          id: 5,
        },
        {
          date: "01-01-0006",
          startHour: "05:00",
          endHour: "00:00",
          name: "f",
          id: 6,
        },
        {
          date: "02-01-0001",
          startHour: "00:00",
          endHour: "00:00",
          name: "g",
          id: 7,
        },
        {
          date: "03-01-0001",
          startHour: "01:00",
          endHour: "00:00",
          name: "h",
          id: 8,
        },
        {
          date: "01-02-0001",
          startHour: "02:00",
          endHour: "00:00",
          name: "i",
          id: 9,
        },
        {
          date: "01-03-0001",
          startHour: "03:00",
          endHour: "00:00",
          name: "j",
          id: 10,
        },
        {
          date: "01-01-4001",
          startHour: "04:00",
          endHour: "05:00",
          name: "k",
          id: 11,
          description: "kkkkkkkk",
          numParticipants: 10,
          password: "kaka",
          videoGuest: true,
          videoHost: true,
          audioGuest: true,
          audioHost: true,
        },
        {
          date: "01-01-5001",
          startHour: "05:00",
          endHour: "00:00",
          name: "l",
          id: 12,
        },
        {
          date: "03-01-6001",
          startHour: "01:00",
          endHour: "00:00",
          name: "m",
          id: 13,
        },
        {
          date: "01-02-7001",
          startHour: "02:00",
          endHour: "00:00",
          name: "n",
          id: 14,
        },
        {
          date: "01-03-8001",
          startHour: "03:00",
          endHour: "00:00",
          name: "o",
          id: 15,
        },
        {
          date: "01-01-9001",
          startHour: "04:00",
          endHour: "00:00",
          name: "p",
          id: 16,
        },
        {
          date: "01-01-9901",
          startHour: "05:00",
          endHour: "00:00",
          name: "q",
          id: 17,
        },
        {
          date: "22-11-2021",
          startHour: "05:00",
          endHour: "00:00",
          name: "r",
          id: 18,
        },
        {
          date: "22-11-2021",
          startHour: "22:00",
          endHour: "00:00",
          name: "s",
          id: 19,
        },
        {
          date: "01-01-2022",
          startHour: "22:00",
          endHour: "00:00",
          name: "t",
          id: 20,
        },
      ],
    };
  },
  methods: {
    sendInvitation() {
      this.$router.push({
        name: "InvitationInterview",
        params: { meetingList: this.meetingList },
      });
    },
  },
};
</script>
