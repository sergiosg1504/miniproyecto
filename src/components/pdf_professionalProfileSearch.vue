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
          <p class="pdf-title">Professional Profile Search</p>
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
              <td class="header-table-td-left">Area</td>
              <td class="header-table-td-right">
                <p class="header-table-td-right-p">{{ area }}</p>
              </td>
            </tr>
            <tr class="header-table-tr">
              <td class="header-table-td-left">Requested by</td>
              <td class="header-table-td-right">
                <p class="header-table-td-right-p">
                  {{ requested }}
                </p>
              </td>
            </tr>
          </table>

          <div class="container-filters">
            <div class="div-title">
              <li class="orange-dot"></li>
              <p class="title">
                APPLIED FILTERS DEPPENDING ON THE SECTION IN CV
              </p>
            </div>
            <div class="filters-content">
              <table class="filters-table">
                <tr class="filters-table-tr">
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-white">Name</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">{{ filters.name }}</p>
                  </td>
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Languages</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.languages }}
                    </p>
                  </td>
                </tr>
                <tr class="filters-table-tr">
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-white">Email</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">{{ filters.email }}</p>
                  </td>
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Keywords</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.keywords }}
                    </p>
                  </td>
                </tr>
                <tr class="filters-table-tr">
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-white">Phone numbers</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.phoneNumbers }}
                    </p>
                  </td>
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-white">Links</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">{{ filters.links }}</p>
                  </td>
                </tr>
                <tr class="filters-table-tr">
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Skills</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">{{ filters.skills }}</p>
                  </td>
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Education</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.education }}
                    </p>
                  </td>
                </tr>
                <tr class="filters-table-tr">
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Certifications</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.certifications }}
                    </p>
                  </td>
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Profile type</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.profileType }}
                    </p>
                  </td>
                </tr>
                <tr class="filters-table-tr">
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Description</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.description }}
                    </p>
                  </td>
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Profile progress</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.profileProgress }}
                    </p>
                  </td>
                </tr>
                <tr class="filters-table-tr">
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Experience time</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.experienceTime }}
                    </p>
                  </td>
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-white">Improvement</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.improvement }}
                    </p>
                  </td>
                </tr>
                <tr class="filters-table-tr">
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">Experience jobs</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.experienceJobs }}
                    </p>
                  </td>
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-white">CV Profile</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">
                      {{ filters.CVProfile }}
                    </p>
                  </td>
                </tr>
                <tr class="filters-table-tr">
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-white">Awards</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">{{ filters.awards }}</p>
                  </td>
                  <td class="filters-table-td-odd">
                    <p class="filters-table-td-p-blue">&nbsp;</p>
                  </td>
                  <td class="filters-table-td-even">
                    <p class="filters-table-td-p-gray">&nbsp;</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div class="container-results">
            <div class="div-title">
              <li class="orange-dot"></li>
              <p class="title">
                RESULTS FOUND&nbsp;&nbsp;&nbsp;{{
                  results.length
                }}&nbsp;&nbsp;&nbsp;Best scores on top
              </p>
            </div>
          </div>
          <div class="div-results" v-for="(result, i) in results" :key="i">
            <div class="div-result">
              <img class="result-image" :src="progradumLetter" />
              <div class="div-result-data">
                <div class="div-result-data-name-email">
                  <div class="div-result-data-name">
                    <p>{{ result.name }}</p>
                  </div>
                  <div class="div-result-data-email">
                    <span>{{ result.email }}</span>
                  </div>
                </div>
                <div class="div-result-data-topSkill">
                  <span>Top skill:</span>
                </div>
                <div class="div-result-data-otherSkills">
                  <span>Other important skills:</span>
                </div>
                <div class="div-result-data-topSoftSkill">
                  <span>Top soft skill:</span>
                </div>
              </div>
            </div>
          </div>
          <!-- acaba -->
          <!--<div style="margin-bottom: 15px">
            <div class="row">
              <div data-v-de19924e="" class="col-md-1">
                <img
                  src="https://images.app.goo.gl/iQocuDs1kvF9XQ766"
                  height="50em"
                  class="analysis-card-avatar--circle"
                />
              </div>
              <div data-v-de19924e="" class="col-md-3 profile-center-analysis">
                <h5 class="profile-name-title">JAVA</h5>
              </div>
              <div class="col-md-6">
                <div class="col-sm-12">
                  <div class="progress full-progress-bar">
                    <div
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow="25"
                      class="
                        progress-bar
                        trainee-progress-selected
                        progress-bar-striped progress-bar-animated
                      "
                      style="width: 25%"
                    ></div>
                    <div
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow="25"
                      class="
                        progress-bar
                        junior-progress-selected
                        progress-bar-striped progress-bar-animated
                      "
                      style="width: 25%"
                    ></div>
                    <div
                      role="progressbar"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow="7"
                      class="
                        progress-bar
                        middle-progress-selected
                        progress-bar-striped progress-bar-animated
                      "
                      style="width: 7.14%"
                    >
                      57.14 %
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-1 profile-center-analysis">
                <button
                  type="button"
                  class="btn btn-secondary expand-button not-collapsed"
                  aria-expanded="true"
                  aria-controls="toggleT-0"
                  control-id="ControlID-96"
                  style="overflow-anchor: none"
                >
                  <svg
                    aria-labelledby="svg-inline--fa-title-mEiPvYyBphql"
                    data-prefix="fas"
                    data-icon="chevron-down"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    id="iconShow-0"
                    class="trash-icon svg-inline--fa fa-chevron-down fa-w-14"
                    style="display: none"
                  >
                    <title id="svg-inline--fa-title-mEiPvYyBphql" class="">
                      Expand
                    </title>
                    <path
                      fill="currentColor"
                      d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      class=""
                    ></path>
                  </svg>
                  <svg
                    aria-labelledby="svg-inline--fa-title-0RDMWVYh2udF"
                    data-prefix="fas"
                    data-icon="chevron-up"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    id="iconNotShow-0"
                    class="trash-icon svg-inline--fa fa-chevron-up fa-w-14"
                    style="display: block"
                  >
                    <title id="svg-inline--fa-title-0RDMWVYh2udF" class="">
                      Contract
                    </title>
                    <path
                      fill="currentColor"
                      d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
                      class=""
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>-->
        </section>
      </VueHtml2pdf>
    </div>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";

export default {
  props: {
    msg: String,
  },
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      date: "28 / 02 / 2022",
      company: "Progradum",
      area: "Administrator",
      requested: "HR / Area manager / Pair / Collaborator",
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
      progradumLogoBase64:
        "data:image/png;base64,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",
      progradumLetter:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAADPCAYAAABSgYVfAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAthJREFUeNrs3cFNAkEUgGEw3vHGlQ7cDqADKQErkBK0ArECoYO1AqECsQOu3NYK1rdhjQcPOruoEL4vmeBBDXn4Z4dBQrcsyw6Q7swIQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD7RwbgRpxqvtLG6yI7irRaxJPuwXHjXxHIoqnOGR3NdNxD6KgNYeNts20vRivURAE6MQD8081ttNxEMDNxFQHuvCKMRDuqtYywhoYBTiId1lrHUElBmFeEjnIEE8tOQgQTy04CBBPLRQHSRMjUE8IB4QD4gH+OC/qv9JPux3m/5sfTK27Oxe8MSVh4TwqvfojGI9mYZ4aBBQrHF8uTAN8dDM3AjEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeGhqvNoO4mZmEv/Dp2EfbzhZZ/eJ2D3TEA+fYYy++ZYqnHuTEg9fPRuB5zwgHkA8IB72am0E4iHNW6zrfNjPjSKN0zbhjCIcVx1XHhK8xhoIRzykWdRXnMIobNv4uYeIZmoM4iFNdTAwNwbx4GDAcx5+/WAgE454SLOqrzgbo7BtOxV3e/gdRUTjjXLiOS3xR39rCrZtIB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEAwfBp2Gnm8daGgPdsixNAWzbQDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD/yxdwEGAMqeZTX9gaNEAAAAAElFTkSuQmCC",
      filters: {
        name: "a",
        languages: "a",
        email: "a",
        keywords: "a",
        phoneNumbers: "a",
        links: "a",
        skills: "a",
        education: "a",
        certifications: "a",
        profileType: "a",
        description: "a",
        profileProgress: "a",
        experienceTime: "a",
        improvement: "a",
        experienceJobs: "a",
        CVProfile: "a",
        awards: "a",
      },

      results: [
        {
          name: "Pablo Chamoso Santos",
          email: "chamoso88@hotmail.com",
          topSkill: "",
          otherSkills: "",
          topSoftSkill: "",
          picture: "",
        },
        {
          name: "Pablo Chamoso Santos",
          email: "chamoso88@hotmail.com",
          topSkill: "",
          otherSkills: "",
          topSoftSkill: "",
          picture: "",
        },
        {
          name: "Pablo Chamoso Santos",
          email: "chamoso88@hotmail.com",
          topSkill: "",
          otherSkills: "",
          topSoftSkill: "",
          picture: "",
        },
      ],
    };
  },
  methods: {
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
span,
p {
  margin-left: 10px;
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

.container-filters {
  margin-left: 0px;
  text-align: left;
}
.filters-content {
  margin-left: 0px;
}
.filters-table {
  width: 80%;
}
.filters-table-tr {
  height: 25px;
}
.filters-table-td-odd {
  font-size: 12px;
}
.filters-table-td-even {
  font-size: 12px;
}
.filters-table-td-p-gray {
  background-color: #f2f2f2;
  color: black;
  display: inline-block;
  border-radius: 4px;
  margin-right: 4px;
  padding-left: 4px;
  width: 90%;
}
.filters-table-td-p-white {
  border: #45bbd8 1px solid;
  background-color: white;
  color: black;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  width: 80%;
}
.filters-table-td-p-blue {
  background-color: #45bbd8;
  color: black;
  display: inline-block;
  border-radius: 4px;
  padding-right: 4px;
  padding-left: 4px;
  width: 80%;
}
table.filters-table {
  table-layout: fixed;
} /*Setting the table width is important!*/
table.filters-table td {
  overflow: hidden;
} /*Hide text outside the cell.*/
table.filters-table td:nth-child(1) {
  width: 22%;
}
table.filters-table td:nth-child(2) {
  width: 28%;
}
table.filters-table td:nth-child(3) {
  width: 22%;
}
table.filters-table td:nth-child(4) {
  width: 28%;
}

.container-results {
  margin-left: 0px;
}
.div-results {
  margin-left: 0px;
  margin-bottom: 10px;
  text-align: center;
}
.div-result {
  height: 100px;
  width: 60%;
  border: #c8d2c5 2px solid;
  border-radius: 8px;
  margin: 0px auto;
  display: flex;
  align-items: center;
}
.result-image {
  display: inline;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 25px;
  margin-right: 10px;
  object-fit: cover;
  object-position: right;
}
.div-result-data {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 0px;
}
.div-result-data-name-email {
  height: 25%;
  margin-left: 0px;
}
.div-result-data-name {
  font-size: 12px;
  float: left;
  margin-left: 0px;
}
.div-result-data-email {
  font-size: 10px;
  color: #c8d2c5;
  float: left;
}
.div-result-data-topSkill {
  font-size: 10px;
  height: 25%;
  margin-left: 0px;
}
.div-result-data-otherSkills {
  font-size: 10px;
  height: 25%;
  margin-left: 0px;
}
.div-result-data-topSoftSkill {
  font-size: 10px;
  height: 25%;
  margin-left: 0px;
}
</style>
