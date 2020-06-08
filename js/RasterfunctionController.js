define([
  'dojo/_base/declare',
  "dojo/Evented",
  './LayerListController'
], function (declare, Evented, LayerListController) {
  'use strict';

  return declare(Evented, {
    mapUtils: null,
    objectId1: null,
    objectId2: null,

    rasterfunctionName: null,

    /* Form values */
    date1: null,
    date2: null,
    method: null,
    translation: null,
    vegIndex: null,
    soil: null,
    radnorm: null,
    nirBand: null,
    redBand: null,
    constructor: function (mapUtils) {
      this.mapUtils = mapUtils;
    },
    init: function () {
      this._configureParameterForm();
    },

    setObjectId1: function (val) {
      this.objectId1 = val;
    },

    setObjectId2: function (val) {
      this.objectId2 = val;
    },

    setDateValue1: function (utcTimestamp) {
      this.date1 = new Date(utcTimestamp);
      this._updateDateInput('date1Input', this.date1);
    },

    setDateValue2: function (utcTimestamp) {
      this.date2 = new Date(utcTimestamp);
      this._updateDateInput('date2Input', this.date2);
    },

    updateAnalysisRasterFunction: function () {
      this.setResultLayerHelpText();
      //var soil = this.soil ? this.soil.toString() : null;
      var rasterfunctionName = LayerListController.getSelectedAnalysisRasterfunction();
      this.mapUtils.updateRasterFunction(rasterfunctionName, this.objectId1, this.objectId2, this.method, this.translation, this.vegIndex, this.soil, this.radnorm, this.nirBand, this.redBand);
    },

    _updateDateInput: function (inputId, date) {
      var _this = this;
      $('#' + inputId).val(_this._dateAsString(new Date(date)));
    },

    _dateAsString: function (date) {
      return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
        '-' + date.getDate().toString().padStart(2, 0);
    },

    _queryFeatures: function (date) {
      var extent = this.mapUtils.getExtent();
      return this.mapUtils.queryFeaturesByDate(date, extent);
    },

    _configureParameterForm: function () {
      var _this = this;
      $("#methodSelect").change(function () {
        _this.method = $(this).val();
        _this.updateAnalysisRasterFunction();
      });
      $("#translationSelect")
        .change(function () {
          _this.translation = $(this).val();
          _this.updateAnalysisRasterFunction();
        });
      $("#vegIndexSelect")
        .change(function () {
          _this.vegIndex = $(this).val();
          _this.updateAnalysisRasterFunction();
        });
      $("#soilSelect")
        .change(function () {
          _this.soil = parseFloat($(this).val());
          _this.updateAnalysisRasterFunction();
        });
      $("#randnormSelect")
        .change(function () {
          _this.radnorm = $(this).val();
          _this.updateAnalysisRasterFunction();
        });
      $("#nirBandInput")
        .change(function () {
          _this.nirBand = $(this).val();
          _this.updateAnalysisRasterFunction();
        });
      $("#redBandInput")
        .change(function () {
          _this.redBand = $(this).val();
          _this.updateAnalysisRasterFunction();
        });
    },

    setResultLayerHelpText: function () {
      if (this.date1 == null && this.date2 == null) {
        LayerListController.setResultLayerHelpText('salmon', 'Inga datum valda');
        return;
      }
      if (this.date1 !== null && this.date2 === null) {
        LayerListController.setResultLayerHelpText('salmon', 'Endast ett datum valt');
      }
      if (this.date1 === null && this.date2 !== null) {
        LayerListController.setResultLayerHelpText('salmon', 'Endast ett datum valt');
      }
      if (this.date1 && this.date2) {
        LayerListController.setResultLayerHelpText('grey', this._dateAsString(this.date1) + ' - ' + this._dateAsString(this.date2));
      }
    },

    isValidDate: function (d) {
      return d instanceof Date && !isNaN(d);
    }

  });
});
