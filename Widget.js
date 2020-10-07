define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    "esri/geometry/Extent",
    "./js/Data/HistogramService",
    './js/MapUtils',
    './js/ChartController',
    './js/LayerListController',
    './js/RasterfunctionController',
    './js/auth/authController',

    "https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.2.5/js/calcite-web.min.js",
    "jimu/loaderplugins/jquery-loader!https://code.jquery.com/jquery-3.3.1.min.js",
    'xstyle/css!https://s3-us-west-1.amazonaws.com/patterns.esri.com/files/calcite-web/1.2.5/css/calcite-web.min.css',
    'xstyle/css!./css/grid/grid.css',
    "dojo/domReady!"
  ],
  function (
    declare,
    BaseWidget,
    Extent,
    HistogramService,
    MapUtils,
    ChartController,
    LayerListController,
    RasterfunctionController,
    AuthController,

    Calcite,
    $) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget], {

      // Custom widget code goes here

      baseClass: 'arc-gis-portal-hitta-borrarna-widget',


      EXTENT: null,
      MAPUTILS: null,
      chartController1: null,
      chartController2: null,
      rasterfunctionController: null,
      CONFIG: null,

      postCreate: function () {
        this.inherited(arguments);

      },

      startup: function () {
        var _this = this;
        _this.toggleWidgetLoader(true);
        try {
          this.setup();
          this.configureEsriMap(this.map);
          if (this.CONFIG.HistogramApi.auth.enabled) {
            AuthController.registerAuthentication(this.CONFIG.HistogramApi);
          }
          LayerListController.configureAnalysisRasterfunctions(this.CONFIG.analysisRasterFunctions, this.updateAnalysisRasterfunction.bind(_this));
          LayerListController.configureDisplayRasterfunctions(this.CONFIG.DisplayRasterFunctions, _this.updateDisplayRasterfunction.bind(_this));
          var extentPolygon = this.MAPUTILS.getMapExtentAsWktPolygon();
          HistogramService.getIndexRutor(this.CONFIG.HistogramApi, extentPolygon, null, null)
            .then(function (jsonResp) {
              _this.toggleWidgetLoader(false);
              _this.rasterfunctionController = new RasterfunctionController(_this.MAPUTILS);
              _this.rasterfunctionController.init();

              _this.chartController1 = new ChartController(_this.CONFIG, _this.MAPUTILS, "chart1", "histogramAttributeSelect1", "chartLoader1");
              _this.chartController1.init(jsonResp);
              _this.chartController1.on('date-selected', function (val) {
                _this.setErrorMessage(null);
                _this.queryFeatures(new Date(val.datum))
                  .then(function (res) {
                    if (res && res.features.length > 0) {
                      var feature = res.features[0];
                      if (feature.hasOwnProperty('attributes') && feature.attributes.hasOwnProperty('OBJECTID') && feature.attributes.hasOwnProperty('ImageDate')) {
                        _this.OBJECTID1 = feature.attributes.OBJECTID;
                        _this.TIME1 = feature.attributes.ImageDate;
                        _this.MAPUTILS.setMapTime(_this.TIME1);
                        _this.rasterfunctionController.setDateValue1(_this.TIME1);
                        _this.rasterfunctionController.setObjectId1(_this.OBJECTID1);
                        _this.rasterfunctionController.updateAnalysisRasterFunction(_this.OBJECTID1, _this.OBJECTID2);
                      } else {
                        _this.setErrorMessage("Fel, kunde inte hämta bilder för angivet datum");
                      }
                    } else {
                      _this.setErrorMessage("Fel, kunde inte hämta bilder för angivet datum");
                    }
                  }, function (err) {
                    _this.toggleWidgetLoader(false);
                    _this.setErrorMessage(err);
                  });

              });

              _this.chartController2 = new ChartController(_this.CONFIG, _this.MAPUTILS, "chart2", "histogramAttributeSelect2", "chartLoader2");
              _this.chartController2.init(jsonResp);
              _this.chartController2.on('date-selected', function (val) {
                _this.setErrorMessage(null);
                _this.queryFeatures(new Date(val.datum))
                  .then(function (res) {
                    if (res && res.features.length > 0) {
                      var feature = res.features[0];
                      if (feature.hasOwnProperty('attributes') && feature.attributes.hasOwnProperty('OBJECTID') && feature.attributes.hasOwnProperty('ImageDate')) {
                        _this.OBJECTID2 = feature.attributes.OBJECTID;
                        _this.TIME2 = feature.attributes.ImageDate;
                        _this.MAPUTILS.setMapTime(_this.TIME2);
                        _this.rasterfunctionController.setDateValue2(_this.TIME2);
                        _this.rasterfunctionController.setObjectId2(_this.OBJECTID2);
                        _this.rasterfunctionController.updateAnalysisRasterFunction(_this.OBJECTID1, _this.OBJECTID2);
                      } else {
                        _this.setErrorMessage("Fel, kunde inte hämta bilder för angivet datum");
                      }

                    } else {
                      _this.setErrorMessage("Fel, kunde inte hämta bilder för angivet datum");
                    }
                  }, function (err) {
                    _this.toggleWidgetLoader(false);
                    _this.setErrorMessage(err);
                  });

              });




              _this.MAPUTILS.addExtentListener(function (extent) {
                _this.chartController1.onMapExtentChanged();
                _this.chartController2.onMapExtentChanged();
              });

              _this.MAPUTILS.addInputLayerUpdateStartListener(function () {
                _this.setErrorMessage(null);
                LayerListController.toggleLayerLoader("sentinelLayerLoader", true);
              });
              _this.MAPUTILS.addInputLayerUpdateEndListener(function (err) {
                _this.setErrorMessage(null);
                if (err.error) {
                  _this.setErrorMessage(err.error);
                }
                LayerListController.toggleLayerLoader("sentinelLayerLoader", false);
              });
              _this.MAPUTILS.addResultLayerUpdateStartListener(function () {
                _this.setErrorMessage(null);
                LayerListController.toggleLayerLoader("resultLayerLoader", true);
              });
              _this.MAPUTILS.addResultLayerUpdateEndListener(function (err) {
                _this.setErrorMessage(null);
                if (err.error) {
                  _this.setErrorMessage(err.error);
                }
                LayerListController.toggleLayerLoader("resultLayerLoader", false);
              });



              LayerListController.onCheckboxChange('sentinelLayerCheckbox', function (checked) {
                _this.MAPUTILS.setInputLayerVisibility(checked);
              });
              LayerListController.onCheckboxChange('resultLayerCheckbox', function (checked) {

                _this.MAPUTILS.setResultLayerVisibility(checked);
                if (checked) {
                  _this.rasterfunctionController.updateAnalysisRasterFunction();
                }
              });

              Calcite.bus.on('tabs:active', function (options) {
                switch (options.active.id) {
                  case "histogramTab1":
                    _this.chartController1.setActive();
                    if (_this.TIME1) {
                      _this.MAPUTILS.setMapTime(_this.TIME1);
                    }
                    _this.chartController2.setInactive();
                    LayerListController.setLayerTitle("inputLayerText", "Sentinel 220 (Före bild)");
                    break;
                  case "histogramTab2":
                    _this.chartController2.setActive(_this.TIME2);
                    if (_this.TIME2) {
                      _this.MAPUTILS.setMapTime(_this.TIME2);
                    }
                    _this.chartController1.setInactive();
                    LayerListController.setLayerTitle("inputLayerText", "Sentinel 220 (Efter bild)");
                    break;

                  default:
                    break;
                }
              });


            }, function (err) {
              _this.toggleWidgetLoader(false);
              _this.setErrorMessage(err);
            });
          this.inherited(arguments);
        } catch (error) {
          _this.toggleWidgetLoader(false);
          console.error(error);
          _this.setErrorMessage(error);
        }
      },

      setup: function () {
        Calcite.init();
        this.CONFIG = this.config;
        this.testAreaBtn();
      },

      setErrorMessage: function (text) {
        if (text) {
          $("#errorAlert").addClass('is-active');
          $("#errorMessage").text(text);
        } else {
          $("#errorMessage").text("");
          $("#errorAlert").removeClass('is-active');

        }
      },

      toggleWidgetLoader: function (show) {
        show ? $("#appLoader").addClass('is-active') : $("#appLoader").removeClass('is-active');
      },

      configureEsriMap: function (esriMap) {
        var defaultRasterFunction = null;
        var candidates = this.CONFIG.DisplayRasterFunctions;
        for (var index = 0; index < candidates.length; index++) {
          if (candidates[index].useAsDefault) {
            defaultRasterFunction = candidates[index];
          }
        }
        this.MAPUTILS = new MapUtils(esriMap);
        this.MAPUTILS.initialize(this.CONFIG.ResultLayer.url, this.CONFIG.InputLayer.url, defaultRasterFunction.name);
        LayerListController.toggleLayerCheckbox("sentinelLayerCheckbox", false);
      },

      updateDisplayRasterfunction: function (functionName) {
        this.MAPUTILS.updateDisplayRasterFunction(functionName);
      },

      updateAnalysisRasterfunction: function (functionName) {

      },

      testAreaBtn: function () {
        var _this = this;
        $("#testareabtn").click(function () {
          var extent = {
            spatialReference: {
              wkid: 3006
            },
            xmax: 560539.009455138,
            xmin: 559516.9278327262,
            ymax: 6434930.689679525,
            ymin: 6433957.753980354,
          };
          _this.map.setExtent(new Extent(extent));
        });
      },

      queryFeatures: function (date) {
        var extent = this.MAPUTILS.getExtent();
        return this.MAPUTILS.queryFeaturesByDate(date, extent);
      },




    });

  });
