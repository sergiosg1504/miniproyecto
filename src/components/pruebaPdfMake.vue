<template>
  <div class="main">
    <input type="button" value="Save as PDF" @click="saveReportOfAllToPDF()" />

    <h1>In accumsan velit in orci tempor</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem quam,
      sodales ac volutpat sed, vestibulum id quam. Sed quis arcu non elit
      fringilla mattis. Sed auctor mi sed efficitur vehicula. Sed bibendum odio
      urna, quis lobortis dui luctus ac. Duis eu lacus sodales arcu tincidunt
      ultrices viverra a risus. Vivamus justo massa, malesuada quis pellentesque
      ut, placerat in massa. Nunc bibendum diam justo, in consequat ipsum
      fringilla ac. Praesent porta nibh ac arcu viverra, at scelerisque neque
      venenatis. Donec aliquam lorem non ultrices ultrices. Aliquam efficitur
      eros quis tortor condimentum, id pellentesque metus iaculis. Aenean at
      consequat neque, a posuere lectus. In eu libero magna. Pellentesque
      molestie tellus nec nisi molestie, eu dignissim lacus tristique. Sed
      tellus nulla, suscipit a velit non, mattis dictum metus. Curabitur mi mi,
      convallis nec libero quis, venenatis vestibulum ante.
    </p>
    <h2>Aliquam lacinia justo</h2>
    <div id="chartdiv" class="chart"></div>

    <h2>Phasellus suscipit in diam a interdum</h2>
    <table>
      <tr>
        <th>USA</th>
        <th>Japan</th>
        <th>France</th>
        <th>Mexico</th>
      </tr>
      <tr>
        <td>2500</td>
        <td>1900</td>
        <td>2200</td>
        <td>1200</td>
      </tr>
      <tr>
        <td>800</td>
        <td>1200</td>
        <td>990</td>
        <td>708</td>
      </tr>
      <tr>
        <td>2100</td>
        <td>2150</td>
        <td>900</td>
        <td>1260</td>
      </tr>
    </table>

    <h2>Duis sed efficitur mauris</h2>
    <div>
      <div class="col">
        <div id="chartdiv2" class="chart"></div>
      </div>
      <div class="col">
        <div id="chartdiv3" class="chart"></div>
      </div>
    </div>

    <br />
    <h2>Aliquam semper lacinia</h2>
    <div id="chartdiv4" class="chart"></div>
    <p>
      Maecenas congue leo vel tortor faucibus, non semper odio viverra. In ac
      libero rutrum libero elementum blandit vel in orci. Donec sit amet nisl ac
      eros mollis molestie. Curabitur ut urna vitae turpis bibendum malesuada
      sit amet imperdiet orci. Etiam pulvinar quam at lorem pellentesque congue.
      Integer sed odio enim. Maecenas eu nulla justo. Sed quis enim in est
      sodales facilisis non sed erat. Aenean vel ornare urna. Praesent viverra
      volutpat ex a aliquet.
    </p>

    <p>
      Fusce sed quam pharetra, ornare ligula id, maximus risus. Integer
      dignissim risus in placerat mattis. Fusce malesuada dui ut lectus
      ultricies, et sollicitudin nisl placerat. In dignissim elit in pretium
      lobortis. Fusce ornare enim at metus laoreet, ut convallis elit lacinia.
      Maecenas pharetra aliquet mi. Nulla orci nunc, egestas id nisi ut,
      volutpat sollicitudin mi.
    </p>
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

    //createSeries("value", "Series #1");
    //createSeries("value2", "Series #2");
    //createSeries("value3", "Series #3");

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
      //const currentDate = "08/02/2022";
      //const companyName = "Progradum S.L.";
      //const userName = "luisbm";

      const graphContent = this.graphContent;
      const documentTitle = "prueba.pdf";

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
        };

        /*doc.content.push(
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: 285,
                h: 130,
                r: 5,
                lineColor: "black",
              },
            ],
          },
          {
            style: "tableExample",
            table: {
              headerRows: 1,
              body: [
                [
                  { text: "Header 1", style: "tableHeader" },
                  { text: "Header 2", style: "tableHeader" },
                  { text: "Header 3", style: "tableHeader" },
                ],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
              ],
              layout: "headerLineOnly",
              absolutePosition: { x: 45, y: 50 },
            },
          }
        );*/

        //TITLE OF REPORT
        doc.content.unshift({
          image: progradumLogoBase64,
          fit: [119, 54],
        });
        /*doc.content.push({
          text: "CVs Analysed Reports",
          fontSize: 10,
          margin: [0, 0, 0, 15],
        });
        doc.content.push({
          text: "Date: " + currentDate,
          fontSize: 11,
          margin: [0, 0, 0, 15],
        });
        doc.content.push({
          text: "Company: " + companyName,
          fontSize: 11,
          margin: [0, 0, 0, 15],
        });
        doc.content.push({
          text: "Downloaded by: " + userName,
          fontSize: 11,
          margin: [0, 0, 0, 15],
        });

        /*doc.content.push(
          {
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: 285,
                h: 130,
                r: 5,
                lineColor: "pink",
              },
            ],
          },
          {
            style: "tableExample",
            table: {
              headerRows: 1,
              body: [
                [
                  { text: "Header 1", style: "tableHeader" },
                  { text: "Header 2", style: "tableHeader" },
                  { text: "Header 3", style: "tableHeader" },
                ],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
                ["Sample value 1", "Sample value 2", "Sample value 3"],
              ],
            },
            layout: "headerLineOnly",
            absolutePosition: { x: 45, y: 50 },
          }
        );*/

        doc.content.push(
          {
            absolutePosition: { x: 25, y: 57 },
            canvas: [
              {
                type: "rect",
                x: 0,
                y: 0,
                w: 540,
                h: 95,
                r: 10,
                color: "#62c4e4",
              },
            ],
          },
          {
            table: {
              heights: [0, "auto", 0, "auto", 0, "auto", 0],
              widths: [0, 130, 355, 4],
              body: [
                [
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.1,
                  },
                ],
                [
                  {
                    border: [false, false, false, false],
                    text: " ",
                    fontSize: 0.1,
                  },
                  {
                    border: [false, false, false, false],
                    text: "Date",
                    alignment: "right",
                    margin: [0, 3, 0, 0],
                  },
                  {
                    border: [false, false, false, false],
                    canvas: [
                      {
                        type: "rect",
                        x: -3,
                        y: 0,
                        w: 350,
                        h: 17,
                        r: 5,
                        color: "#ffffff",
                      },
                    ],
                  },
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                ],
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
                [
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                  {
                    border: [false, false, false, false],

                    text: "Company",
                    alignment: "right",
                  },
                  {
                    border: [false, false, false, false],
                    canvas: [
                      {
                        type: "rect",
                        x: -3,
                        y: 0,
                        w: 350,
                        h: 17,
                        r: 5,
                        color: "#ffffff",
                      },
                    ],
                  },
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                ],
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
                [
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                  {
                    border: [false, false, false, false],

                    text: "Requested by",
                    alignment: "right",
                  },
                  {
                    border: [false, false, false, false],
                    canvas: [
                      {
                        type: "rect",
                        x: -3,
                        y: 0,
                        w: 350,
                        h: 17,
                        r: 5,
                        color: "#ffffff",
                      },
                    ],
                  },
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                ],
                [
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                  {
                    border: [false, false, false, false],

                    text: " ",
                    fontSize: 0.1,
                  },
                ],
              ],
            },
          }
        );

        /* GRAPH CONTENT */
        graphContent.forEach((content, index) => {
          if (res[index] != null) {
            // Title
            doc.content.push({
              text: content.title,
              fontSize: 20,
              bold: true,
              margin: [0, 20, 0, 15],
            });

            // Image of graph
            // res contains the result of promise an array with the graphs in image format
            // res[0] => image of chart1
            // res[1] => image of chart2
            // ..
            doc.content.push({
              image: res[index],
              width: 530,
            });
          }
        });

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
  },
};
</script>

<style type="text/css">
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

input {
  font-size: 17px;
  padding: 10px 20px;
  float: right;
  margin: 15px 0 0 15px;
}

.chart {
  width: 100%;
  height: 250px;
  border: 1px solid #eee;
}

#chartdiv4 {
  float: left;
  margin: 0 20px 20px 0;
  width: 30%;
}

.main {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  margin-top: 2em;
  clear: both;
}

br {
  clear: both;
}

table {
  width: 100%;
  border: 1px solid #eee;
  border-collapse: collapse;
}

table td,
table th {
  border: 1px solid #eee;
  padding: 5px;
}

.col {
  width: 50%;
  float: left;
}
</style>
