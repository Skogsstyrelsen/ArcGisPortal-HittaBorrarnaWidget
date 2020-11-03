define([
  "dojo/_base/declare",
  "dojo/dom",
  "dojo/Evented",
  "../Data/HistogramUtils",
  "https://www.gstatic.com/charts/loader.js",
  "dojo/domReady!"
], function (declare, dom, Evented, HistogramUtils) {

  return declare([Evented], {
    CHART: null,
    data: null,
    rawData: null,
    elementId: null,
    fillColor: "#133292",
    strokeColor: "#133292",
    dataAttribute: "summaBraData",
    selectedItem: null,

    constructor: function (elementId, data) {
      var _this = this;
      _this.elementId = elementId;
      _this.rawData = data;
      this.getData.bind(this);
      this.drawChart.bind(this);
    },

    init: function () {
      google.charts.load('current', {
        packages: ['corechart']
      });
      google.charts.setOnLoadCallback(this.drawChart.bind(this));
      this._createResetHandler();
    },

    setDataAttribute: function (value) {
      this.dataAttribute = value;
    },

    drawChart: function (rows) {
      var _this = this;
      var cssClassNames = {
        'selectedTableRow': 'selectedColumn'
      };


      var displayName = HistogramUtils.getLabel(this.dataAttribute);
      this.data = new google.visualization.DataTable();
      this.data.addColumn('date', 'Datum');
      this.data.addColumn('number', displayName);
      this.data.addColumn({
        type: 'string',
        role: 'style'
      });

      if (!rows) {
        rows = this.getData(null, null);
      }
      this.data.addRows(rows);



      var options = {
        title: displayName + " / datum",
        legend: {
          position: 'none'
        },
        bar: {
          groupWidth: '60%'
        },
        hAxis: {
          title: 'Datum',
          format: 'yy/M/d'
        },
        vAxis: {
          title: displayName
        },
        explorer: {
          actions: ['dragToZoom'],
          axis: 'horizontal',
          keepInBounds: true,
          maxZoomIn: 100
        },
        tooltip: {
          isHtml: true
        },
        cssClassNames: cssClassNames
      };

      var chart = new google.visualization.ColumnChart(dom.byId(_this.elementId));
      chart.draw(this.data, options);
      _this.CHART = chart;
      google.visualization.events.addListener(chart, 'select', _this.selectHandler.bind(_this));
    },

    selectHandler: function (e) {
      var _this = this;
      var value = _this.CHART.getSelection()[0];
      var date = _this.data.getValue(value.row, 0);
      this.selectedItem = _this.rawData.slice().filter(function (x) {
        return new Date(x.datum).getTime() === new Date(date).getTime();
      })[0];
      _this.redraw(true);
      _this.emit("date-selected", Object.assign({}, _this.selectedItem));
    },

    _createResetHandler: function () {
      var _this = this;
      document.getElementById(_this.elementId).addEventListener('contextmenu', function () {
        _this.redraw(false);
      });
    },

    getChartBounds: function () {
      var chart = this.CHART;
      var chartLayout = chart.getChartLayoutInterface();
      var chartBounds = chartLayout.getChartAreaBoundingBox();
      return {
        x: {
          min: chartLayout.getHAxisValue(chartBounds.left),
          max: chartLayout.getHAxisValue(chartBounds.width + chartBounds.left)
        },
        y: {
          min: chartLayout.getVAxisValue(chartBounds.top),
          max: chartLayout.getVAxisValue(chartBounds.height + chartBounds.top)
        }
      };
    },

    getData: function (from, to) {
      var _this = this;
      var filteredData = [];
      if (from instanceof Date && to instanceof Date) {
        filteredData = _this.rawData.slice().filter(function (x) {
          var datum = new Date(x.datum);
          return (datum.getTime() >= from.getTime() && datum.getTime() <= to.getTime());
        });
      } else {
        filteredData = _this.rawData.slice();
      }

      return filteredData.map(function (x) {
        var color = 'color: gray';
        if (_this.selectedItem && _this.selectedItem.datum === x.datum) {
          color = 'color:salmon';
        }
        return [new Date(x.datum), x[_this.dataAttribute], color];
      });

    },

    setData: function (data) {
      this.rawData = data;
    },

    redraw: function (preserveZoom) {
      var rows = null;
      if (preserveZoom) {
        var bounds = this.getChartBounds();
        rows = this.getData(bounds.x.min, bounds.x.max);
      }
      this.drawChart(rows);
    }



  });




});