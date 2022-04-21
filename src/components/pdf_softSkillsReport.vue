<template>
  <div>
    <button @click="generateReport()">hola</button>
    <div>
      <VueHtml2pdf
        :show-layout="false"
        :float-layout="false"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        :pdf-quality="2"
        :manual-pagination="false"
        ref="html2Pdf"
        filename="softSkillsReport"
        html-to-pdf-options="htmlToPdfOptions"
        @beforeDownload="beforeDownload($event)"
      >
        <section slot="pdf-content">
          <!-- empieza -->
          <img
            class="header-progradum-logo"
            src="data:image/png;base64,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"
            width="200"
          />
          <p class="pdf-title">Soft Skills Report</p>
          <table class="header-table">
            <tr class="header-table-tr">
              <td class="header-table-td-left">Date</td>
              <td class="header-table-td-right">
                <p class="header-table-td-right-p">{{ date }}</p>
              </td>
            </tr>
            <tr class="header-table-tr">
              <td class="header-table-td-left">Company</td>
              <td class="header-table-td-right">
                <p class="header-table-td-right-p">{{ company }}</p>
              </td>
            </tr>
            <tr class="header-table-tr">
              <td class="header-table-td-left">Requested by</td>
              <td class="header-table-td-right">
                <p class="header-table-td-right-p">{{ requested }}</p>
              </td>
            </tr>
            <tr class="header-table-tr">
              <td class="header-table-td-left">Asessed by</td>
              <td class="header-table-td-right">
                <p class="header-table-td-right-p">
                  {{ assesed }}
                </p>
              </td>
            </tr>
            <tr class="header-table-tr">
              <td class="header-table-td-left">Evaluator / Area</td>
              <td class="header-table-td-right">
                <p class="header-table-td-right-p">
                  {{ evaluator }}
                </p>
              </td>
            </tr>
          </table>

          <div class="containter-assessment-spider-title">
            <div class="div-assessment-results">
              <div class="div-title">
                <li class="orange-dot"></li>
                <p class="title">ASSESSMENT RESULTS</p>
              </div>
            </div>
            <div class="div-spider-diagram">
              <div class="div-title div-title-spider-diagram">
                <li class="orange-dot"></li>
                <p class="title">SPIDER DIAGRAM</p>
              </div>
            </div>
          </div>
          <div class="container-assessment-spider">
            <!--img class="img-stat" src="../assets/stats.png" height="180" /-->
            <table>
              <tr>
                <td>
                  <div class="assessment">
                    <table class="assessment">
                      <tr>
                        <td class="result-title">HR</td>
                        <td class="result-title">Area manager</td>
                        <td class="result-title">Pair</td>
                        <td class="result-title">Collaborator</td>
                      </tr>
                      <tr>
                        <td class="result">{{ averageHR }}</td>
                        <td class="result">{{ averageAreaManager }}</td>
                        <td class="result">{{ averagePair }}</td>
                        <td class="result">{{ averageCollaborator }}</td>
                      </tr>
                      <tr>
                        <td class="result-title">Out of 10</td>
                        <td class="result-title">Out of 10</td>
                        <td class="result-title">Out of 10</td>
                        <td class="result-title">Out of 10</td>
                      </tr>
                    </table>
                    <hr />
                    <table class="table-average">
                      <tr>
                        <td class="result-title result-title-average">
                          Weighted average
                        </td>
                        <td class="average">
                          <p class="result-average">{{ average }}</p>
                          <p class="result-title">Out of 10</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
                <td class="spider-td">
                  <!--<img class="img-stat" src="../assets/spider.png" />-->
                  <radar-chart
                    :chart-data="radarChartData"
                    :options="radarChartOptions"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="container-conclusions">
            <div class="div-title">
              <li class="orange-dot"></li>
              <p class="title">CONCLUSIONS</p>
            </div>
            <p class="conclusions-content">
              Lorem ipsum dolor sit amet consectetur adipiscing elit pharetra,
              accumsan ultrices egestas facilisi urna aptent suspendisse a,
              morbi tincidunt consequat parturient nam duis tempus. Aliquam
              primis nunc placerat vehicula interdum commodo sem, nascetur leo
              fringilla pellentesque pulvinar nisl habitant ligula, rutrum urna
              tincidunt sodales aptent platea. Cubilia commodo eu interdum at ac
              morbi sollicitudin dictumst lectus, tristique auctor tempor quam
              metus pharetra ligula gravida.
            </p>
          </div>
          <div class="container-quantitative">
            <div class="div-title">
              <li class="orange-dot"></li>
              <p class="title">QUANTITATIVE ASSESSMENT PER EVALUATOR</p>
            </div>
          </div>
          <table class="quantitative-table">
            <tr class="quantitative-table-tr">
              <td class="table-title">Group of competences</td>
              <td class="table-title">Competences</td>
              <td class="table-title">Required profiles</td>
              <td class="table-title">HR</td>
              <td class="table-title">Area Manager</td>
              <td class="table-title">Pair</td>
              <td class="table-title">Collaborator</td>
            </tr>
            <tr>
              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>
              <td>
                <hr />
              </td>
            </tr>
            <template v-for="group in competences">
              <tr
                class="quantitative-table-tr"
                v-for="(competence, j) in group"
                :key="j"
              >
                <td class="quantitative-table-td" v-if="j === 0">
                  <p class="quantitative-table-td-p-blue">
                    Group {{ competence.group }} competences
                  </p>
                </td>
                <td class="quantitative-table-td" v-else-if="j === 1">
                  <div class="quantitative-table-td-div">
                    <p class="quantitative-table-td-p-gray">Included</p>
                  </div>
                </td>
                <td class="quantitative-table-td" v-else-if="j === 2">
                  <div class="quantitative-table-td-div">
                    <p class="quantitative-table-td-p-gray">Not included</p>
                  </div>
                </td>
                <td class="quantitative-table-td" v-else></td>
                <td class="quantitative-table-td">
                  <p class="quantitative-table-td-p-light-blue">
                    Competence {{ competence.competence }}
                  </p>
                </td>
                <td class="quantitative-table-td">
                  <p class="quantitative-table-td-p-dark-blue">
                    {{ competence.required_profile }}
                  </p>
                </td>
                <td class="quantitative-table-td">
                  <p class="quantitative-table-td-p-black">
                    {{ competence.hr }}
                  </p>
                </td>
                <td class="quantitative-table-td">
                  <p class="quantitative-table-td-p-black">
                    {{ competence.area_manager }}
                  </p>
                </td>
                <td class="quantitative-table-td">
                  <p class="quantitative-table-td-p-black">
                    {{ competence.pair }}
                  </p>
                </td>
                <td class="quantitative-table-td">
                  <p class="quantitative-table-td-p-black">
                    {{ competence.collaborator }}
                  </p>
                </td>
              </tr>
              <tr :key="group">
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
              </tr>
            </template>
          </table>
          <div class="container-qualitative">
            <div class="div-title">
              <li class="orange-dot"></li>
              <p class="title">QUALITATIVE ASSESSMENT PER EVALUATOR</p>
            </div>
          </div>
          <hr class="special-hr" />
          <table class="qualitative-table">
            <template v-for="group in competences2">
              <template v-for="competence in group">
                <tr class="qualitative-table-tr" :key="competence">
                  <td
                    class="qualitative-table-td"
                    v-if="firstInGroup(competence)"
                  >
                    <p class="qualitative-table-td-p-blue">
                      Group {{ competence.group }}
                    </p>
                  </td>
                  <td class="qualitative-table-td" v-else>
                    <p class="qualitative-table-td-p-blue"></p>
                  </td>
                  <td class="qualitative-table-td">
                    <p class="qualitative-table-td-p-light-blue">
                      Competence {{ competence.competence }}
                    </p>
                  </td>
                  <td class="qualitative-table-td"></td>
                  <td class="qualitative-table-td"></td>
                </tr>
                <tr class="qualitative-table-tr" :key="competence">
                  <td class="qualitative-table-td"></td>
                  <td class="qualitative-table-td">
                    <p class="qualitative-table-td-p-dark-blue">HR</p>
                  </td>
                  <td class="qualitative-table-td">
                    <p class="qualitative-table-td-p-text">
                      {{ competence.hr }}
                    </p>
                  </td>
                  <td class="qualitative-table-td"></td>
                </tr>
                <tr class="qualitative-table-tr" :key="competence">
                  <td class="qualitative-table-td"></td>
                  <td class="qualitative-table-td">
                    <p class="qualitative-table-td-p-dark-blue">Area manager</p>
                  </td>
                  <td class="qualitative-table-td">
                    <p class="qualitative-table-td-p-text">
                      {{ competence.area_manager }}
                    </p>
                  </td>
                  <td class="qualitative-table-td"></td>
                </tr>
                <tr class="qualitative-table-tr" :key="competence">
                  <td class="qualitative-table-td"></td>
                  <td class="qualitative-table-td">
                    <p class="qualitative-table-td-p-dark-blue">Pair</p>
                  </td>
                  <td class="qualitative-table-td">
                    <p class="qualitative-table-td-p-text">
                      {{ competence.pair }}
                    </p>
                  </td>
                  <td class="qualitative-table-td"></td>
                </tr>
                <tr class="qualitative-table-tr" :key="competence">
                  <td class="qualitative-table-td"></td>
                  <td class="qualitative-table-td">
                    <p class="qualitative-table-td-p-dark-blue">Collaborator</p>
                  </td>
                  <td class="qualitative-table-td">
                    <p class="qualitative-table-td-p-text">
                      {{ competence.collaborator }}
                    </p>
                  </td>
                  <td class="qualitative-table-td"></td>
                </tr>
              </template>
              <tr :key="group">
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
                <td>
                  <hr />
                </td>
              </tr>
            </template>
          </table>
          <!-- acaba -->
        </section>
      </VueHtml2pdf>
    </div>
    <div>
      <button @click="loadCards">Load Cards</button>
      <radar-chart :chart-data="radarChartData" :options="radarChartOptions" />
    </div>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
import RadarChart from "../components/RadarChart.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    msg: String,
  },
  components: {
    VueHtml2pdf,
    RadarChart,
  },
  data() {
    return {
      date: "08 / 02 / 2022",
      company: "Progradum",
      requested: "Administrator",
      assesed: "HR / Area manager / Pair / Collaborator",
      evaluator: "María Sánchez / Sales Department",
      averageHR: 7.02,
      averageAreaManager: 7.98,
      averagePair: 8.97,
      average: 7.88,
      averageCollaborator: 8.63,
      htmlToPdfOptions: {
        margin: [40, 20, 60, 20],
        enableLinks: false,
        html2canvas: {
          scale: 1,
          useCORS: true,
        },
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      },
      radarChartOptions: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                display: false,
                min: 0,
                max: 10,
              },
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
      progradumLogoBase64:
        "data:image/png;base64,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",
      progradumLetter:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAADPCAYAAABSgYVfAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAthJREFUeNrs3cFNAkEUgGEw3vHGlQ7cDqADKQErkBK0ArECoYO1AqECsQOu3NYK1rdhjQcPOruoEL4vmeBBDXn4Z4dBQrcsyw6Q7swIQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD7RwbgRpxqvtLG6yI7irRaxJPuwXHjXxHIoqnOGR3NdNxD6KgNYeNts20vRivURAE6MQD8081ttNxEMDNxFQHuvCKMRDuqtYywhoYBTiId1lrHUElBmFeEjnIEE8tOQgQTy04CBBPLRQHSRMjUE8IB4QD4gH+OC/qv9JPux3m/5sfTK27Oxe8MSVh4TwqvfojGI9mYZ4aBBQrHF8uTAN8dDM3AjEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeGhqvNoO4mZmEv/Dp2EfbzhZZ/eJ2D3TEA+fYYy++ZYqnHuTEg9fPRuB5zwgHkA8IB72am0E4iHNW6zrfNjPjSKN0zbhjCIcVx1XHhK8xhoIRzykWdRXnMIobNv4uYeIZmoM4iFNdTAwNwbx4GDAcx5+/WAgE454SLOqrzgbo7BtOxV3e/gdRUTjjXLiOS3xR39rCrZtIB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEAwfBp2Gnm8daGgPdsixNAWzbQDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD/yxdwEGAMqeZTX9gaNEAAAAAElFTkSuQmCC",
      competences: {
        1: [
          {
            group: "I",
            competence: "A",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "B",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "C",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "n",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
        ],
        2: [
          {
            group: "II",
            competence: "A",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "B",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "C",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "n",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
        ],
        3: [
          {
            group: "III",
            competence: "A",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "B",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "C",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "n",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
        ],
        4: [
          {
            group: "n",
            competence: "A",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "B",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "C",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
          {
            competence: "n",
            required_profile: "Level n",
            hr: "Level n",
            area_manager: "Level n",
            pair: "Level n",
            collaborator: "Level n",
          },
        ],
      },
      competences2: {
        1: [
          {
            group: "I",
            competence: "A",
            hr: "Text describing the level for the assessed competence",
            area_manager:
              "Text describing the level for the assessed competence",
            pair: "Text describing the level for the assessed competence",
            collaborator:
              "Text describing the level for the assessed competence",
          },
          {
            competence: "D",
            hr: "Text describing the level for the assessed competence",
            area_manager:
              "Text describing the level for the assessed competence",
            pair: "Text describing the level for the assessed competence",
            collaborator:
              "Text describing the level for the assessed competence",
          },
          {
            competence: "F",
            hr: "Text describing the level for the assessed competence",
            area_manager:
              "Text describing the level for the assessed competence",
            pair: "Text describing the level for the assessed competence",
            collaborator:
              "Text describing the level for the assessed competence",
          },
        ],
        2: [
          {
            group: "II",
            competence: "B",
            hr: "Text describing the level for the assessed competence",
            area_manager:
              "Text describing the level for the assessed competence",
            pair: "Text describing the level for the assessed competence",
            collaborator:
              "Text describing the level for the assessed competence",
          },
          {
            competence: "C",
            hr: "Text describing the level for the assessed competence",
            area_manager:
              "Text describing the level for the assessed competence",
            pair: "Text describing the level for the assessed competence",
            collaborator:
              "Text describing the level for the assessed competence",
          },
          {
            competence: "D",
            hr: "Text describing the level for the assessed competence",
            area_manager:
              "Text describing the level for the assessed competence",
            pair: "Text describing the level for the assessed competence",
            collaborator:
              "Text describing the level for the assessed competence",
          },
        ],
        3: [
          {
            group: "III",
            competence: "C",
            hr: "Text describing the level for the assessed competence",
            area_manager:
              "Text describing the level for the assessed competence",
            pair: "Text describing the level for the assessed competence",
            collaborator:
              "Text describing the level for the assessed competence sdkfafkjdsfkldsafñkadsfkadsfñlsdfkldsfkladsflñdsafkldsafkladslñfkadsklfadskfladsjklfadsñflk",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["getCards"]),
    radarChartData() {
      return {
        labels: this.getCards.map((card) => card.title),
        datasets: [
          {
            label: "Importance",
            backgroundColor: "rgb(54, 162, 235, 0.75)",
            data: this.getCards.map((card) => card.importance),
          },
          {
            label: "Effectiveness",
            backgroundColor: "rgb(75, 192, 192, 0.75)",
            data: this.getCards.map((card) => card.effectiveness),
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions(["loadCards"]),
    firstInGroup(competence) {
      if (competence.group !== undefined) return 1;
      else return 0;
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    async beforeDownload({ html2pdf, options, pdfContent }) {
      await html2pdf()
        .set(options)
        .from(pdfContent)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(12);
            pdf.setTextColor(150);
            pdf.text(
              i + "/" + totalPages,
              pdf.internal.pageSize.getWidth() * 0.9,
              pdf.internal.pageSize.getHeight() - 10
            );
          }
        })
        .save();
    },
  },
};
</script>

<style scoped>
* {
  margin-left: 40px;
}
hr {
  width: 90%;
}

.header-progradum-logo {
  margin-top: 80px;
  margin-left: 24px;
}
.pdf-title {
  font-weight: bold;
}
.header-table {
  position: relative;
  background: #62c4e4;
  border-collapse: "separate";
  border-spacing: 0 15px;
  width: 600px;
  border-radius: 8px;
}
.header-table-tr {
}
.header-table-tr:nth-of-type(5) td {
  padding-bottom: 12px;
}
.header-table-tr:nth-of-type(1) td {
  padding-top: 12px;
}
.header-table-td-left {
  text-align: right;
}
.header-table-td-right {
  display: inline-block;
  text-align: left;
  padding-top: 4px;
  padding-bottom: 4px;
  width: 80%;
}
.header-table-td-right-p {
  background-color: #ffffff;
  color: #000000;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  width: 100%;
}

.div-title {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}
.div-title-spider-diagram {
  margin-left: 0px;
}
.orange-dot {
  margin-left: 20px;
  color: orange;
}
.title {
  position: relative;
  display: inline-block;
  margin: 0px;
  font-weight: bold;
}
.containter-assessment-spider-title {
  margin-left: 0px;
  display: flex;
  margin-top: 10px;
  height: 50px;
}
.container-assessment-spider {
  margin-top: 5px;
  margin-left: 0px;
  display: flex;
  width: 800px;
}
.spider-td {
  padding-left: 70px;
}
.div-assessment-results {
  margin-left: 0px;
  width: 46%;
  margin: 0px;
}
.div-spider-diagram {
  margin-left: 0px;
  width: 50%;
  margin: 0px;
}
.assessment {
  margin-left: 0px;
}
.result {
  font-weight: bold;
  text-align: center;
  font-size: 140%;
  margin-right: 5px;
  width: 25%;
}
.result-title {
  font-size: 14px;
  text-align: center;
}
.average {
  background-color: #edeeed;
  border-radius: 8px;
  padding: 4px;
  border-left: 20px;
  width: 90px;
}
.result-average {
  font-weight: bold;
  text-align: center;
  font-size: 180%;
  margin-right: 5px;
}
.result-title-average {
  width: 20px;
  font-weight: bold;
  padding-right: 20px;
}
.table-average {
  margin-left: 40px;
}
.canvas-stat {
  margin-left: 0px;
  width: 60%;
}
.container-conclusions {
  margin-left: 0px;
  text-align: left;
}
.conclusions-content {
  margin-top: 10px;
  font-size: 12px;
  text-overflow: ellipsis;
  width: 600px;
  background-color: #edeeed;
  border-radius: 4px;
  padding-left: 4px;
}

.container-quantitative {
  margin-left: 0px;
}
table.quantitative-table {
  table-layout: fixed;
} /*Setting the table width is important!*/
table.quantitative-table td {
  overflow: hidden;
} /*Hide text outside the cell.*/
table.quantitative-table td:nth-of-type(1) {
  width: 160px;
} /*Setting the width of column 1.*/
table.quantitative-table td:nth-of-type(2) {
  width: 100px;
} /*Setting the width of column 2.*/
table.quantitative-table td:nth-of-type(3) {
  width: 65px;
} /*Setting the width of column 3.*/
table.quantitative-table td:nth-of-type(4) {
  width: 65px;
} /*Setting the width of column 4.*/
table.quantitative-table td:nth-of-type(5) {
  width: 65px;
} /*Setting the width of column 5.*/
table.quantitative-table td:nth-of-type(6) {
  width: 65px;
} /*Setting the width of column 6.*/
table.quantitative-table td:nth-of-type(7) {
  width: 80px;
} /*Setting the width of column 7.*/
.table-title {
  font-weight: bold;
  font-size: 13px;
  text-align: center;
}

.quantitative-table {
  margin-bottom: 40px;
}
.quantitative-table-tr {
  height: 25px;
}
.quantitative-table-td {
  font-size: 12px;
  text-align: center;
}

.quantitative-table-td-div {
  text-align: left;
  width: 80%;
  margin-left: 20px;
}
.quantitative-table-td-p-gray {
  color: #b4b5b4;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  border: 1px #b4b5b4 solid;
  width: 100%;
}
.quantitative-table-td-p-blue {
  font-weight: bold;
  background-color: #45bbd8;
  color: black;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  width: 80%;
}
.quantitative-table-td-p-light-blue {
  background-color: #91d1d5;
  color: black;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
}
.quantitative-table-td-p-dark-blue {
  background-color: #206c87;
  color: white;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
}
.quantitative-table-td-p-black {
  background-color: #0f1e2b;
  color: white;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
}

.container-qualitative {
  margin-bottom: 10px;
  margin-left: 0px;
}
.qualitative-table {
  margin-left: 70px;
  margin-right: 65px;
  width: 100%;
  table-layout: fixed;
}
.qualitative-table-tr {
  height: 25px;
}
.qualitative-table-td {
  overflow: auto;
  font-size: 12px;
  text-align: left;
}
table.qualitative-table td:nth-child(1) {
  width: 10%;
}
table.qualitative-table td:nth-child(2) {
  width: 15%;
}
table.qualitative-table td:nth-child(3) {
  width: 50%;
}
table.qualitative-table td:nth-child(4) {
  width: 25%;
}
.qualitative-table-td-p-blue {
  background-color: #45bbd8;
  color: black;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  width: 60px;
}
.qualitative-table-td-p-light-blue {
  background-color: #91d1d5;
  color: black;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  width: 100px;
}
.qualitative-table-td-p-dark-blue {
  background-color: #206c87;
  color: white;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  width: 100px;
}
.qualitative-table-td-p-text {
  border: #206c87 1px solid;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  width: 100%;
}
hr {
  border: 0.5px solid black;
  margin-left: 0px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
}
.special-hr {
  border: 0.5px solid black;
  margin-left: 40px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 600px;
}
</style>
