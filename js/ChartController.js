define([
  "dojo/_base/declare",
  "dojo/Evented",
  "./Data/HistogramService",
  "./Data/HistogramUtils",
  "./UIComponents/UIColumnChart",
  "dojo/on",
  "dojo/domReady!"
], function (declare, Evented, HistogramService, HistogramUtils, UIColumnChart) {

  return declare(Evented, {
    chartId: null,
    attributeSelectId: null,
    chart: null,
    mapUtils: null,
    config: null,
    attributeSelect: null,
    loaderId: null,

    constructor: function (config, mapUtils, chartId, attributeSelectId, loaderId) {
      this.chartId = chartId;
      this.attributeSelectId = attributeSelectId;
      this.mapUtils = mapUtils;
      this.config = config;
      this.loaderId = loaderId;
    },

    init: function (histogramSummary) {
      this.createChart(histogramSummary);
      this.createAttributeSelect();
    },

    setActive: function (utcTimestamp) {
      this.isActive = true;
      this.chart.redraw(true);
    },

    setInactive: function () {
      this.isActive = false;
    },

    onMapExtentChanged: function () {
      var _this = this;
      this.toggleChartLoader(true);
      this._getIndexRutor()
        .then(function (data) {
          _this.chart.setData(data);
          _this.chart.redraw(true);
          _this.toggleChartLoader(false);
        }, function (err) {
          _this.toggleChartLoader(false);
          console.error(err);
        });
    },

    createChart: function (data) {
      var _this = this;
      this.chart = new UIColumnChart(this.chartId, data);
      this.chart.init();
      this.chart.on("date-selected", function (val) {
        var selected = Object.assign({}, val);
        //selected.datum = selected.datum + "Z";

        _this.emit('date-selected', selected);
      });
    },

    createAttributeSelect: function () {
      var _this = this;
      var options = HistogramUtils.getMapping();
      var select = $("<select></select>").attr("name", "attributeSelect");
      $.each(options, function (index, option) {
        select.append($("<option></option>").attr("value", option.value).text(option.label));
      });
      $('#' + this.attributeSelectId).html(select);
      _this.attributeSelect = select;
      _this.attributeSelect.change(function () {
        _this.chart.setDataAttribute($(this).val());
        _this.chart.redraw(true);
      });

    },

    _getIndexRutor: function () {

      var _this = this;
      var wkt = _this.mapUtils.getMapExtentAsWktPolygon();
      return HistogramService.getIndexRutor(_this.config.HistogramApi, wkt, null, null);
    },

    toggleChartLoader: function (visible) {
      var loader = $('#' + this.loaderId);
      visible ? loader.addClass('active') : loader.removeClass('active');
    }
  });

});
