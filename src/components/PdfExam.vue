<template>
  <div class="main">
    <input type="button" value="Save as PDF" @click="saveReportOfAllToPDF()" />
  </div>
</template>

<script>
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdFonts.pdfMake.vfs;

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
//import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default {
  name: "ReportsDownloader",
  data() {
    return {
      isDownloadLoading: false,
      graphContent: [
        { title: "Chart1" },
        { title: "Chart2" },
        { title: "Chart3" },
        { title: "Chart4" },
      ],
      chart: null,
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
    };
  },
  mounted() {
    /**
     * Chart 1
     */

    // Create chart instance
    this.chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    this.chart.data = [
      {
        date: new Date(2018, 0, 1),
        value: 450,
        value2: 362,
        value3: 699,
      },
      {
        date: new Date(2018, 0, 2),
        value: 269,
        value2: 450,
        value3: 841,
      },
      {
        date: new Date(2018, 0, 3),
        value: 700,
        value2: 358,
        value3: 699,
      },
      {
        date: new Date(2018, 0, 4),
        value: 490,
        value2: 367,
        value3: 500,
      },
      {
        date: new Date(2018, 0, 5),
        value: 500,
        value2: 485,
        value3: 369,
      },
      {
        date: new Date(2018, 0, 6),
        value: 550,
        value2: 354,
        value3: 250,
      },
      {
        date: new Date(2018, 0, 7),
        value: 420,
        value2: 350,
        value3: 600,
      },
    ];

    // Create axes
    var categoryAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 30;

    var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;

    // Create series

    this.createSeries("value", "Series #1");
    this.createSeries("value2", "Series #2");
    this.createSeries("value3", "Series #3");

    /**
     * Chart 2
     */

    // Create chart instance
    this.chart2 = am4core.create("chartdiv2", am4charts.XYChart);
    this.chart2.paddingBottom = 25;

    // Add data
    this.chart2.data = [
      {
        country: "USA",
        visits: 3025,
      },
      {
        country: "China",
        visits: 1882,
      },
      {
        country: "Japan",
        visits: 1809,
      },
      {
        country: "Germany",
        visits: 1322,
      },
      {
        country: "UK",
        visits: 1122,
      },
      {
        country: "France",
        visits: 1114,
      },
      {
        country: "India",
        visits: 984,
      },
    ];

    // Create axes
    categoryAxis = this.chart2.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.disabled = true;

    valueAxis = this.chart2.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;

    // Create series
    var series = this.chart2.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.columns.template.strokeWidth = 0;

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", (fill, target) => {
      return this.chart.colors.getIndex(target.dataItem.index);
    });

    /**
     * Chart 3
     */

    // Create chart instance
    this.chart3 = am4core.create("chartdiv3", am4charts.XYChart);
    this.chart3.paddingBottom = 25;

    // Add percent sign to all numbers
    this.chart3.numberFormatter.numberFormat = "#.3'%'";

    // Add data
    this.chart3.data = [
      {
        country: "USA",
        year2004: 3.5,
        year2005: 4.2,
      },
      {
        country: "UK",
        year2004: 1.7,
        year2005: 3.1,
      },
      {
        country: "Canada",
        year2004: 2.8,
        year2005: 2.9,
      },
      {
        country: "Japan",
        year2004: 2.6,
        year2005: 2.3,
      },
      {
        country: "France",
        year2004: 1.4,
        year2005: 2.1,
      },
      {
        country: "Brazil",
        year2004: 2.6,
        year2005: 4.9,
      },
    ];

    // Create axes
    categoryAxis = this.chart3.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.disabled = true;

    valueAxis = this.chart3.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;

    // Create series
    series = this.chart3.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "year2004";
    series.dataFields.categoryX = "country";
    series.clustered = false;

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;

    var series2 = this.chart3.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "year2005";
    series2.dataFields.categoryX = "country";
    series2.clustered = false;
    series2.columns.template.width = am4core.percent(50);

    series2.columns.template.column.cornerRadiusTopLeft = 6;
    series2.columns.template.column.cornerRadiusTopRight = 6;

    /**
     * Chart 4
     */

    // Create chart
    this.chart4 = am4core.create("chartdiv4", am4charts.PieChart);
    this.chart4.padding(0, 0, 0, 0);

    this.chart4.data = [
      {
        country: "Lithuania",
        value: 260,
      },
      {
        country: "Czech Republic",
        value: 230,
      },
      {
        country: "Ireland",
        value: 200,
      },
      {
        country: "Germany",
        value: 165,
      },
      {
        country: "Australia",
        value: 139,
      },
      {
        country: "Austria",
        value: 128,
      },
    ];

    series = this.chart4.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.radiusValue = "value";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 6;
    series.colors.step = 3;
    series.radius = am4core.percent(100);

    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;
  },

  methods: {
    createSeries(field, name) {
      var series = this.chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.name = name;
      series.tooltipText = "{dateX}: [b]{valueY}[/]";
      series.strokeWidth = 3;

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color("#fff");
      bullet.circle.strokeWidth = 3;
      bullet.circle.radius = 7;
    },

    saveReportOfAllToPDF() {
      this.isDownloadLoading = true; // Set spinner active

      // Get ref to charts (chart1, chart2, chart3, ...) in charts from view
      let chartImagesTmp = [
        this.chart.exporting.getImage("svg"),
        this.chart2.exporting.getImage("svg"),
        this.chart3.exporting.getImage("svg"),
        this.chart4.exporting.getImage("svg"),
      ];

      const progradumLogoBase64 =
        "data:image/png;base64,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";
      const progradumLetter =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAADPCAYAAABSgYVfAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAthJREFUeNrs3cFNAkEUgGEw3vHGlQ7cDqADKQErkBK0ArECoYO1AqECsQOu3NYK1rdhjQcPOruoEL4vmeBBDXn4Z4dBQrcsyw6Q7swIQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD4gHxAPiAfEA4gHxgHhAPCAeQDwgHhAPiAcQD7RwbgRpxqvtLG6yI7irRaxJPuwXHjXxHIoqnOGR3NdNxD6KgNYeNts20vRivURAE6MQD8081ttNxEMDNxFQHuvCKMRDuqtYywhoYBTiId1lrHUElBmFeEjnIEE8tOQgQTy04CBBPLRQHSRMjUE8IB4QD4gH+OC/qv9JPux3m/5sfTK27Oxe8MSVh4TwqvfojGI9mYZ4aBBQrHF8uTAN8dDM3AjEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeEA8IB5APCAeEA+IBxAPiAfEA+IB8QDiAfGAeGhqvNoO4mZmEv/Dp2EfbzhZZ/eJ2D3TEA+fYYy++ZYqnHuTEg9fPRuB5zwgHkA8IB72am0E4iHNW6zrfNjPjSKN0zbhjCIcVx1XHhK8xhoIRzykWdRXnMIobNv4uYeIZmoM4iFNdTAwNwbx4GDAcx5+/WAgE454SLOqrzgbo7BtOxV3e/gdRUTjjXLiOS3xR39rCrZtIB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEA+IB8YB4APGAeEA8IB5APCAeEA+IB8QDiAfEAwfBp2Gnm8daGgPdsixNAWzbQDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD4gHxAPiAcQD4gHxgHhAPIB4QDwgHhAPIB4QD/yxdwEGAMqeZTX9gaNEAAAAAElFTkSuQmCC";
      //"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMjA3LjAwMDAwMHB0IiBoZWlnaHQ9IjIwNy4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDIwNy4wMDAwMDAgMjA3LjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMjA3LjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPC9nPgo8L3N2Zz4K";
      const currentDate = "08/02/2022";
      const companyName = "Progradum S.L.";
      const userName = "luisbm";
      const areaName = "Progradum Tech.";

      const graphContent = this.graphContent;
      const documentTitle = "prueba.pdf";

      const graphName = "aaaaaaaaaaaaaaaaaaaaaaaaaa";

      const X_MARGIN = 42;
      const GRAPH_HEIGHT = 190;
      const date = this.styler(new Date().toLocaleString());
      console.log(date);
      /*pdfMake.fonts = {
        Myriad_Pro_Regular: {
          normail: "/public/fonts/MyriadPro-Regular.woff",
        },
      };*/

      // Load async conversion of charts into svg and create pdf
      // Promise means array of graphs have to wait to be converted into images (svg format)
      // YOU CANT USE this. inside Promise.all
      Promise.all(chartImagesTmp).then((res) => {
        // Create document template
        var doc = {
          pageSize: "A4",
          pageOrientation: "portrait",
          pageMargins: [30, 30, 30, 30],
          content: [],
          header: {
            image: progradumLogoBase64,
            fit: [150, 70],
            margin: [X_MARGIN - 10, 40, 0, 0],
          },
          footer: function (currentPage, pageCount) {
            return {
              columns: [
                {
                  text: "Exams Reports  |  " + date + " · Progradum · Examiner",
                  margin: [X_MARGIN, -10, 0, 0],
                  color: "grey",
                  fontSize: 10,
                },
                {
                  image: progradumLetter,
                  alignment: "right",
                  fit: [18, 18],
                  margin: [0, -3, -70, 0],
                },
                {
                  text: currentPage.toString() + "/" + pageCount,
                  alignment: "right",
                  color: "grey",
                  margin: [0, 0, 38, 0],
                  fontSize: 10,
                },
              ],
            };
          },
        };

        //TITLE OF REPORT
        doc.content.push({
          text: "Exam Reports",
          fontSize: 12,
          absolutePosition: { x: X_MARGIN, y: 83 },
        });
        doc.content.push(
          {
            absolutePosition: { x: X_MARGIN, y: 114 },
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: 512,
                h: 92,
                r: 5,
                color: "#62c4e4",
              },
            ],
          },
          {
            absolutePosition: { x: X_MARGIN, y: 116 },
            table: {
              widths: [0, 130, 355, 4],
              body: [
                //fila 1
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                ],
                // fila 2
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: "Date",
                    alignment: "right",
                    fontSize: 9,
                  },
                  {
                    border: [false, false, false, false],
                    canvas: [
                      {
                        type: "rect",
                        x: -3,
                        y: 0,
                        w: 320,
                        h: 11,
                        r: 3,
                        color: "#ffffff",
                      },
                    ],
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                ],
                // fila 3
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                ],
                // fila 4
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: "Company",
                    alignment: "right",
                    fontSize: 9,
                  },
                  {
                    border: [false, false, false, false],
                    canvas: [
                      {
                        type: "rect",
                        x: -3,
                        y: 0,
                        w: 320,
                        h: 11,
                        r: 3,
                        color: "#ffffff",
                      },
                    ],
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                ],
                // fila 5
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                ],
                // fila 6
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: "Requested by",
                    alignment: "right",
                    fontSize: 9,
                  },
                  {
                    border: [false, false, false, false],
                    canvas: [
                      {
                        type: "rect",
                        x: -3,
                        y: 0,
                        w: 320,
                        h: 11,
                        r: 3,
                        color: "#ffffff",
                      },
                    ],
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                ],
                // fila 7
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                ],
                // fila 8
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: "Area",
                    alignment: "right",
                    fontSize: 9,
                  },
                  {
                    border: [false, false, false, false],
                    canvas: [
                      {
                        type: "rect",
                        x: -3,
                        y: 0,
                        w: 320,
                        h: 11,
                        r: 3,
                        color: "#ffffff",
                      },
                    ],
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                ],
                // fila 9
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.01,
                  },
                ],
              ],
            },
          }
        );
        // Date
        doc.content.push({
          absolutePosition: { x: X_MARGIN + 158, y: 124 },
          text: currentDate,
          fontSize: 9,
        });
        // Company name
        doc.content.push({
          absolutePosition: { x: X_MARGIN + 158, y: 145 },
          text: companyName,
          fontSize: 9,
        });
        // User name
        doc.content.push({
          absolutePosition: { x: X_MARGIN + 158, y: 167 },
          text: userName,
          fontSize: 9,
        });
        // Area name
        doc.content.push({
          absolutePosition: { x: X_MARGIN + 158, y: 188 },
          text: areaName,
          fontSize: 9,
        });

        /* Adding the line separator */
        doc.content.push({
          absolutePosition: { x: X_MARGIN + 158, y: 200 },
          canvas: [
            {
              type: "line",
              x1: -157,
              y1: 20,
              x2: 355,
              y2: 20,
              lineWidth: 0.7,
              lineColor: "black",
            },
          ],
        });

        let index = 0; // contador del indice total
        let count = 0; // contador del indice por pagina
        // Primera pagina
        while (index < 3) {
          if (res[index] !== null) {
            // Title Dot
            doc.content.push({
              absolutePosition: { x: X_MARGIN + 158, y: 200 },
              canvas: [
                {
                  type: "ellipse",
                  x: -125,
                  y: 45 + GRAPH_HEIGHT * count,
                  r1: 1,
                  r2: 1,
                  color: "red",
                },
              ],
            });
            // Title
            doc.content.push({
              absolutePosition: {
                x: X_MARGIN + 50,
                y: 238 + GRAPH_HEIGHT * count,
              },
              text: graphContent[index].title,
              fontSize: 9,
              bold: true,
            });
            // Question
            doc.content.push({
              absolutePosition: {
                x: X_MARGIN + 50,
                y: 252 + GRAPH_HEIGHT * count,
              },
              text: "soy la pregunta",
              fontSize: 9,
              italics: true,
            });
            // Graph
            doc.content.push({
              absolutePosition: {
                x: X_MARGIN + 100,
                y: 270 + GRAPH_HEIGHT * count,
              },
              image: res[index],
              height: 115,
              width: 350, //540
            });
            // Graph name
            let xPos = 595 / 2 - graphName.length / 2 - 30;
            doc.content.push({
              absolutePosition: {
                x: xPos,
                y: 390 + GRAPH_HEIGHT * count,
              },
              text: graphName,
              fontSize: 7,
            });
            // Separator
            if (count === 2) {
              doc.content.push({
                absolutePosition: { x: X_MARGIN + 158, y: 200 },
                canvas: [
                  {
                    type: "line",
                    x1: -157,
                    y1: 210 + GRAPH_HEIGHT * count,
                    x2: 355,
                    y2: 210 + GRAPH_HEIGHT * count,
                    lineWidth: 0.7,
                    lineColor: "black",
                  },
                ],
                pageBreak: "after",
              });
            } else {
              doc.content.push({
                absolutePosition: { x: X_MARGIN + 158, y: 200 },
                canvas: [
                  {
                    type: "line",
                    x1: -157,
                    y1: 210 + GRAPH_HEIGHT * count,
                    x2: 355,
                    y2: 210 + GRAPH_HEIGHT * count,
                    lineWidth: 0.7,
                    lineColor: "black",
                  },
                ],
              });
            }
          }
          count++;
          index++;
        }
        let reps = 0;
        // Demas paginas
        count = 0;
        while (count < 4) {
          if (index < graphContent.length) {
            if (count === 0) {
              // logo 52.2
              // separador  108.4
              doc.content.push({
                absolutePosition: { x: X_MARGIN + 158, y: 0 },
                canvas: [
                  {
                    type: "line",
                    x1: -157,
                    y1: 108.4,
                    x2: 355,
                    y2: 108.4,
                    lineWidth: 0.7,
                    lineColor: "black",
                  },
                ],
              });
            }
            // Rula los cuatro graficos con sus separadores
            let base_Height = 269.9 * count;
            // Title Dot  108.4+32
            doc.content.push({
              absolutePosition: { x: X_MARGIN + 158, y: base_Height + 26.3 },
              canvas: [
                {
                  type: "ellipse",
                  x: -125,
                  y: 6,
                  r1: 1,
                  r2: 1,
                  color: "red",
                },
              ],
            });
            // Title
            doc.content.push({
              absolutePosition: {
                x: X_MARGIN + 50,
                y: base_Height + 26.3,
              },
              text: graphContent[index].title,
              fontSize: 9,
              bold: true,
            });
            // Question
            doc.content.push({
              absolutePosition: {
                x: X_MARGIN + 50,
                y: base_Height + 40.4,
              },
              text: "soy la pregunta",
              fontSize: 9,
              italics: true,
            });
            // Graph
            doc.content.push({
              absolutePosition: {
                x: X_MARGIN + 100,
                y: base_Height + 58.5,
              },
              image: res[index],
              height: 90,
              width: 350,
            });
            // Graph name
            let xPos = 595 / 2 - graphName.length / 2 - 30;
            doc.content.push({
              absolutePosition: {
                x: xPos,
                y: base_Height + 153.5,
              },
              text: graphName,
              fontSize: 7,
            });
            // Separator
            if (count === 3) {
              doc.content.push({
                absolutePosition: {
                  x: X_MARGIN + 158,
                  y: 274.9 * (count + 1),
                },
                canvas: [
                  {
                    type: "line",
                    x1: -157,
                    y1: 6,
                    x2: 355,
                    y2: 6,
                    lineWidth: 0.7,
                    lineColor: "black",
                  },
                ],
                pageBreak: "after",
              });
              count = 0;
              index++;
            } else {
              doc.content.push({
                absolutePosition: {
                  x: X_MARGIN + 158,
                  y: 274.9 * (count + 1),
                },
                canvas: [
                  {
                    type: "line",
                    x1: -157,
                    y1: 6,
                    x2: 355,
                    y2: 6,
                    lineWidth: 0.7,
                    lineColor: "black",
                  },
                ],
              });
              count++;
              index++;
            }
          } else {
            index = 0;
            reps++;
            if (reps === 3) break;
          }
        }

        if (res == null) console.log("borrar esto");

        // Download
        pdfMake.createPdf(doc).download(documentTitle);

        this.isDownloadLoading = false; // Set spinner active
      });
    },

    formatDate(date) {
      var dateHourSplitSpace = date.split(" ");

      var dateSplit = dateHourSplitSpace[0].split("-");
      if (dateSplit[0].length === 1) dateSplit[0] = "0" + dateSplit[0];
      if (dateSplit[1].length === 1) dateSplit[1] = "0" + dateSplit[1];

      var hourSplit = dateHourSplitSpace[1].split(":");
      if (hourSplit[0].length === 1) hourSplit[0] = "0" + hourSplit[0];
      if (hourSplit[1].length === 1) hourSplit[1] = "0" + hourSplit[1];
      if (hourSplit[2].length === 1) hourSplit[2] = "0" + hourSplit[2];

      return (
        dateSplit[0] +
        "-" +
        dateSplit[1] +
        "-" +
        dateSplit[2] +
        " " +
        hourSplit[0] +
        ":" +
        hourSplit[1] +
        ":" +
        hourSplit[2]
      );
    },
    styler(fecha) {
      var aux = fecha.split(",");
      return aux[0];
    },
  },
};
</script>
