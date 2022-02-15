<template>
  <v-app class="col-sm-12 main-container">
    <div class="secondNavbar">
      <div class="links-container">
        <router-link
          :to="{ path: '/meetingList' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to meetings</router-link
        >
        <router-link
          :to="{ path: '/InvitationInterview' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to
          Interview</router-link
        >
      </div>
    </div>
    <h4>Calendar</h4>
    <div class="form-container technologiesStyle">
      <vue-cal
        ref="vuecal"
        :events="events"
        :on-event-click="onEventClick"
        :time-from="8 * 60"
        :time-to="21 * 60"
        :hideTitleBar="false"
        :disable-views="['years', 'year']"
        hide-weekends
        active-view="week"
        locale="es"
        today-button
        events-on-month-view
      />
      <v-dialog v-model="showDialog">
        <v-card>
          <v-card-title>
            <span>{{ selectedEvent.title }}</span>
            <v-spacer />
            <strong>{{
              selectedEvent.start && selectedEvent.start.format("DD/MM/YYYY")
            }}</strong>
          </v-card-title>
          <v-card-text>
            <strong>Event details:</strong>
            <p v-html="selectedEvent.contentFull" />
            <ul>
              <li>
                Event starts at:
                {{ selectedEvent.start && selectedEvent.start.formatTime() }}
              </li>
              <li>
                Event ends at:
                {{ selectedEvent.end && selectedEvent.end.formatTime() }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/i18n/es.js"; // This is to put the calendar on english
import "vue-cal/dist/i18n/zh-cn.js";
import "vue-cal/dist/vuecal.css";

export default {
  name: "Calendar",
  components: {
    "vue-cal": VueCal,
  },
  props: {
    meetingList: {
      type: Array,
    },
  },
  data() {
    return {
      meetings: "",
      selectedEvent: {},
      showDialog: false,
      events: [
        /*{
          start: "2022-02-10 14:00",
          end: "2022-02-10 18:00",
          title: "Interview name",
          content: "uwu",
          contentFull: "contentFull",
          class: "leisure",
        },
        {
          start: "2022-02-09 12:00",
          end: "2022-02-09 14:00",
          title: "LUNCH",
          class: "lunch",
          background: true,
        },

        {
          start: "2022-02-09 10:00",
          end: "2022-02-09 11:00",
          title: "Interview name 2",
          content: "Do I need to tell how many holes?",
          contentFull: "Okay.<br>It will be a 18 hole golf course.",
          class: "sport",
        },*/
      ],
    };
  },
  methods: {
    onEventClick(event, e) {
      this.selectedEvent = event;
      this.showDialog = true;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
  },
  created() {
    let temp = {
      start: "",
      end: "",
      title: "",
    }
    let aux
    let vector = []
    this.meetings = this.meetingList
    //console.log(this.meetingList);
    this.altura = screen.height - 200;
    this.anchura = screen.width - 40;
     
    //console.log(this.meetings);
    for (let i = 0; i<this.meetings.length;i++)
    {
      temp.start=""
      temp.end=""
      temp.title=""
      //console.log(temp);
      //temp.start=this.meetings[i].date
      //console.log(temp);
      aux = this.meetings[i].date
      this.meetings[i].date = aux.substring(6, 10) + "-" + aux.substring(3, 5) + "-" + aux.substring(0, 2);
      //console.log(this.meetings[i].date);
      temp.start = this.meetings[i].date + " " + this.meetings[i].startHour
      temp.end = this.meetings[i].date + " " + this.meetings[i].endHour
      temp.title = this.meetings[i].name

      //console.log(i);
      //console.log(temp);
     
      vector.push(temp)
      console.log(temp);
      //console.log(vector);
      //console.log(this.events); // por alguna razon incluso en la primera iteracion se rellena todo entero xd mirar mañana*/
    }
    //console.log(vector);
    //console.log(this.events);
    /*this.meetings.forEach(meet =>{
        let aux2 = meet.date
        /*console.log("Incoming date "+ meet.date);
       
        meet.date =
        aux2.substring(6, 10) +
        "-" +
        aux2.substring(3, 5) +
        "-" +
        aux2.substring(0, 2);
      //console.log('Date after filter: ' + meet.date);

      aux.start = meet.date + " " + meet.startHour
      aux.end = meet.date + " " + meet.endHour
      aux.title = meet.name

      //console.log(aux.end);
      //console.log(aux.start);

      this.events.push(aux)
    })
    console.log(this.events);*/
  },
};
</script>

<style  lang="scss" scoped>
 .container {
  height: 700px;
}
.vuecal__title-bar{background-color: rebeccapurple;}
/* You can easily set a different style for each split of your days. */
.vuecal__cell-split.f1 {
  background-color: rgba(0, 0, 0, 0.5);
}
.vuecal__cell-split.f2 {
  background-color: rgba(253, 0, 211, 0.5);
}
.vuecal__cell-split.f3 {
  background-color: rgba(15, 255, 143, 0.5);
}
.vuecal__cell-split.f4 {
  background-color: rgb(255, 234, 0);
}
.vuecal__cell-split .split-label {
  color: rgb(255, 0, 0);
  font-size: 26px;
}
/* Different color for different event types. */
.vuecal__event.leisure {
  background-color: rgb(253, 156, 66);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event {
  cursor: pointer;
  background: #77a5e1;
  border: black 2px solid;
}
.vuecal__event-title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  background: #528be1;
  border-bottom: black 1px dashed;
}
.vuecal__event-time {
  padding-top: 10px;
  color: white;
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.vuecal__event-content {
  color: white;
  font-style: italic;
}
.button-wrap{
  text-align: center;
  padding-bottom: 2%;
}
.button {
  background: #528be1;
  font-size: 80%;
}
.wrap-input {
  display: block;
  width: 100%;
  font-size: 16px;
  line-height: 16px * 2;
  margin-bottom: 16px * 2;
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 1);
  background: #ffffff;
  min-width: 250px;
  padding-left: 5px;
  outline: none;
  color: rgba(0, 0, 0, 1);
}
.form__field{
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #91C9FF;
  outline: 0;
  font-size: 1.3rem;
  color: #000000;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}
.form__label {
  font-size: 18px;
}
button{
  margin-top: 20px;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 20px;
}
.form{
  @media (min-width: 1800px){
    margin-left: 25%;
    width: 50%;
  }
    margin-top: 2%;
    margin-bottom: 2%;
    background: #ffffff;
    padding: 50px 100px;
    border: 2px solid rgb(222, 207, 207);
    box-shadow: 15px 15px 1px #41a2e8, 15px 15px 1px 2px rgba(0,0,0,1)
  }
.wrap-button{
  display: block;
  margin: 0 auto;
  line-height: 16px * 2;
  padding: 0 20px;
  background: #91C9FF;
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0,0,0,1);
  box-shadow: 3px 3px 1px #2b81f5, 3px 3px 1px 1px rgba(0,0,0,1);
  text-decoration: none;
  color: black !important;
  margin-bottom: 3%;
}
.wrap-router-link{
  display: table;
  margin: 0 auto;
  line-height: 16px * 2;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.63);
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0,0,0,1);
  box-shadow: 3px 3px 1px rgba(255, 255, 255, 0.75), 3px 3px 1px 1px rgba(0,0,0,1);
  text-decoration: none;
  color: white !important;
  text-align: center;
}
  
</style>
