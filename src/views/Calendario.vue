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
        class="vuecal--blue-theme"
        today-button
        events-on-month-view
        style="height: 820px"
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
  data() {
    return {
      selectedEvent: {},
      showDialog: false,
      events: [
        {
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
        },
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
    this.altura = screen.height - 200;
    this.anchura = screen.width - 40;
  },
};
</script>

<style scoped lang="scss">
.vuecal__cell-events-count {
  width: 18px;
  height: 2px;
  color: transparent;
}

/* Dot indicator */
.vuecal__cell-events-count {
  width: 4px;
  min-width: 0;
  height: 4px;
  padding: 0;
  color: transparent;
}

/* Cell background indicator */
/* Green-theme. */
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #4fc0e8 !important;
}
.vuecal__title-bar {
  background-color: #4fc0e8 !important;
}
.vuecal__cell--today,
.vuecal__cell--current {
  background-color: #000000 !important;
}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgba(235, 255, 245, 0.4);
}
.vuecal__cell--selected:before {
  border-color: rgba(66, 185, 131, 0.5);
}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgba(195, 255, 225, 0.5);
}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgba(136, 236, 191, 0.25);
}
// Display events on month view

vue-cal {
  background-color: #4fc0e8 !important;
}

// Para que se vean los eventos en el mes
.vuecal--month-view .vuecal__cell {
  height: 80px;
}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal--month-view .vuecal__cell-date {
  padding: 4px;
}
.vuecal--month-view .vuecal__no-event {
  display: none;
}

// estilo lunch
.vuecal__event.lunch {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #f2f2f2 10px,
    #f2f2f2 20px
  ); /* IE 10+ */
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vuecal__event.lunch .vuecal__event-time {
  display: none;
  align-items: center;
}
</style>
