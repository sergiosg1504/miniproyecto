<template>
  <div class="col-sm-12 main-container">
  <div class="secondNavbar">
      <div class="links-container">
        <router-link
          :to="{ path: '/meetingList' }"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to meetings</router-link
        >
        <router-link
          :to="{ path: '/InvitationInterview'}"
          class="btn btn-secondary float-right"
          ><font-awesome-icon icon="arrow-left" /> Back to Interview</router-link
        >
      </div>
    </div>
    <h4>Calendar</h4>
    <div class="form-container technologiesStyle">
    
    <vue-cal 
    :events="events" 
    :time-from="8 * 60" 
    :time-to="21 * 60" 
    :hideTitleBar="false" 
    :disable-views="['years', 'year']" 
    hide-weekends
    active-view="week"
    locale="es"
    />

    <vue-cal 
    xsmall
    hide-view-selector
    :time="false"
    active-view="month"
    :disable-views="['week']"
    style="width: 270px;height: 300px"
    />
  </div>
</div>
</template>

<script>
import VueCal from "vue-cal";
import 'vue-cal/dist/i18n/es.js' // This is to put the calendar on english
import 'vue-cal/dist/i18n/zh-cn.js'
import "vue-cal/dist/vuecal.css";



export default {
  name: "Calendar",
  components: {
    "vue-cal": VueCal,
    
  },
  data: () => ({events:[{start: '2022-02-09 14:00',
      end: '2022-02-09 15:00',
      title: 'Need to go shopping',
      class: 'leisure'}]}
  
),
  methods: {
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
.vuecal__menu, .vuecal__cell-events-count {background-color: #4FC0E8 !important;}
.vuecal__title-bar {background-color: #4FC0E8 !important;}
.vuecal__cell--today, .vuecal__cell--current {background-color: #000000 !important;}
.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}
/* Cells and buttons get highlighted when an event is dragged over it. */
.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}
// Display events on month view

vue-cal{
  background-color: #4FC0E8 !important;
}
</style>
