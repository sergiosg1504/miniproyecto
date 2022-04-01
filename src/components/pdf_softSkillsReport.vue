<template>
  <div>
    <button @click="generateReport()">hola</button>
    <div>
      <VueHtml2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="softSkillsReport"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="80%"
        ref="html2Pdf"
        margin="[20,30,20,30]"
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
              <td class="header-table-td-right">08 / 02 / 2022</td>
            </tr>
            <tr class="header-table-tr">
              <td class="header-table-td-left">Company</td>
              <td class="header-table-td-right">Progradum</td>
            </tr>
            <tr class="header-table-tr">
              <td class="header-table-td-left">Requested by</td>
              <td class="header-table-td-right">Administrator</td>
            </tr>
            <tr class="header-table-tr">
              <td class="header-table-td-left">Asessed by</td>
              <td class="header-table-td-right">
                HR / Area manager / Pair / Collaborator
              </td>
            </tr>
            <tr class="header-table-tr">
              <td class="header-table-td-left">Evaluator / Area</td>
              <td class="header-table-td-right">
                María Sánchez / Sales Department
              </td>
            </tr>
          </table>

          <div class="containter-assessment-spider">
            <div class="div-assessment-results">
              <p class="title">ASSESSMENT RESULTS</p>
            </div>
            <div class="div-spider-diagram">
              <p class="title">SPIDER DIAGRAM</p>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAADPCAYAAABSgYVfAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAthJREFUeNrs3cFNAkEUgGEw3vHGlQ7cDqADKQErkBK0ArECoYO1AqECsQOu3NYK1rdhjQcPOruoEL4vmeBBDXn4Z4dBQrcsyw6Q7swIQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD7RwbgRpxqvtLG6yI7irRaxJPuwXHjXxHIoqnOGR3NdNxD6KgNYeNts20vRivURAE6MQD8081ttNxEMDNxFQHuvCKMRDuqtYywhoYBTiId1lrHUElBmFeEjnIEE8tOQgQTy04CBBPLRQHSRMjUE8IB4QD4gH+OC/qv9JPux3m/5sfTK27Oxe8MSVh4TwqvfojGI9mYZ4aBBQrHF8uTAN8dDM3AjEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeGhqvNoO4mZmEv/Dp2EfbzhZZ/eJ2D3TEA+fYYy++ZYqnHuTEg9fPRuB5zwgHkA8IB72am0E4iHNW6zrfNjPjSKN0zbhjCIcVx1XHhK8xhoIRzykWdRXnMIobNv4uYeIZmoM4iFNdTAwNwbx4GDAcx5+/WAgE454SLOqrzgbo7BtOxV3e/gdRUTjjXLiOS3xR39rCrZtIB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEAwfBp2Gnm8daGgPdsixNAWzbQDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD/yxdwEGAMqeZTX9gaNEAAAAAElFTkSuQmCC"
                height="100"
              />
            </div>
          </div>
          <p class="title">CONCLUSIONS</p>
          <p class="conclusions-content">
            Lorem ipsum dolor sit amet consectetur adipiscing elit pharetra,
            accumsan ultrices egestas facilisi urna aptent suspendisse a, morbi
            tincidunt consequat parturient nam duis tempus. Aliquam primis nunc
            placerat vehicula interdum commodo sem, nascetur leo fringilla
            pellentesque pulvinar nisl habitant ligula, rutrum urna tincidunt
            sodales aptent platea. Cubilia commodo eu interdum at ac morbi
            sollicitudin dictumst lectus, tristique auctor tempor quam metus
            pharetra ligula gravida.
          </p>
          <p class="title">ASSESSMENT RESULTS</p>
          <p class="title">QUANTITATIVE ASSESSMENT PER EVALUATOR</p>
          <table class="quantitative-table">
            <thead>
              <tr>
                <th>Group of competences</th>
                <th>Competences</th>
                <th>Required profiles</th>
                <th>HR</th>
                <th>Area Manager</th>
                <th>Pair</th>
                <th>Collaborator</th>
              </tr>
            </thead>
            <tbody>
              <hr />
              <div v-for="(group, i) in competences" :key="i">
                <tr v-for="(competence, j) in group" :key="j">
                  <td>Group {{ i }} competences</td>
                  <td>Competence {{ competence.competence }}</td>
                  <td>{{ competence.required_profile }}</td>
                  <td>{{ competence.hr }}</td>
                  <td>{{ competence.area_manager }}</td>
                  <td>{{ competence.pair }}</td>
                  <td>{{ competence.collaborator }}</td>
                </tr>
                <hr />
              </div>
            </tbody>
          </table>

          <!-- acaba -->
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
      progradumLogoBase64:
        "data:image/png;base64,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",
      progradumLetter:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAADPCAYAAABSgYVfAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAthJREFUeNrs3cFNAkEUgGEw3vHGlQ7cDqADKQErkBK0ArECoYO1AqECsQOu3NYK1rdhjQcPOruoEL4vmeBBDXn4Z4dBQrcsyw6Q7swIQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD7RwbgRpxqvtLG6yI7irRaxJPuwXHjXxHIoqnOGR3NdNxD6KgNYeNts20vRivURAE6MQD8081ttNxEMDNxFQHuvCKMRDuqtYywhoYBTiId1lrHUElBmFeEjnIEE8tOQgQTy04CBBPLRQHSRMjUE8IB4QD4gH+OC/qv9JPux3m/5sfTK27Oxe8MSVh4TwqvfojGI9mYZ4aBBQrHF8uTAN8dDM3AjEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeGhqvNoO4mZmEv/Dp2EfbzhZZ/eJ2D3TEA+fYYy++ZYqnHuTEg9fPRuB5zwgHkA8IB72am0E4iHNW6zrfNjPjSKN0zbhjCIcVx1XHhK8xhoIRzykWdRXnMIobNv4uYeIZmoM4iFNdTAwNwbx4GDAcx5+/WAgE454SLOqrzgbo7BtOxV3e/gdRUTjjXLiOS3xR39rCrZtIB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEAwfBp2Gnm8daGgPdsixNAWzbQDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD/yxdwEGAMqeZTX9gaNEAAAAAElFTkSuQmCC",
      competences: {
        1: [
          {
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
          console.log(totalPages);
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(40);
            pdf.setTextColor(300);
            pdf.text(
              "Page " + i + " of " + totalPages,
              pdf.internal.pageSize.getWidth() * 0.88,
              pdf.internal.pageSize.getHeight() - 0.3
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

.header-progradum-logo {
}
.pdf-title {
}
.header-table {
  background: #62c4e4;
  width: 500px;
  border-radius: 10px;
}
.header-table-tr {
}
.header-table-td-left {
  text-align: right;
  padding: 4px 10px;
}
.header-table-td-right {
  text-align: left;
  background: #ffffff;
  padding: 4px 10px;
}
.title {
}
.containter-assessment-spider {
  display: flex;
}
.div-assessment-results {
}
.div-spider-diagram {
}
.conclusions-content {
}
.quantitative-table {
}
</style>
