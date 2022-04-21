<script>
import { Radar, mixins } from "vue-chartjs";

export default {
  extends: Radar,
  mixins: [mixins.reactiveProp],
  props: ["options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
