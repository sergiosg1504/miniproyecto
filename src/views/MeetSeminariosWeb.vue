<template>
  <div>
    <div><navigation-bar /></div>
    <div class="text">
      <p><br /><br />What is Webinar?</p>
      <p>
        Zoom Video Webinars allow you to easily conduct large online events with
        video, audio and screen sharing for up to 100 video participants and
        10,000 attendees
        <br />The features in Webinar are tailored for managing large audiences
        with branding, registration, host controls, polls, question & answer,
        raise hand, chat, recording and reporting <br />Monetize your webinars
        with our Paypal integration (via Zapier)
      </p>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  components: { NavigationBar },
};
</script>

<style scoped>
.text {
  margin: 10px 20px;
  list-style-type: circle;
}
</style>
