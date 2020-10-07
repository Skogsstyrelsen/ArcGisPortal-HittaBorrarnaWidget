define([
  'dojo/_base/declare',
  "dojo/Deferred",
  'esri/geometry/Polygon',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/layers/RasterFunction',
  'esri/layers/ImageServiceParameters',
  'esri/layers/ArcGISImageServiceLayer',
  'esri/TimeExtent',
  './utils'
], function (
  declare,
  Deferred,
  Polygon,
  Query,
  QueryTask,
  RasterFunction,
  ImageServiceParameters,
  ArcGISImageServiceLayer,
  TimeExtent,
  utils
) {

  return declare(null, {

    resultLayer: null,
    inputLayer: null,
    esriMap: null,
    rasterFunction: null,

    constructor: function (esriMap) {
      this.esriMap = esriMap;
    },

    initialize: function (resultLayerUrl, inputLayerURL, defaultRasterFunction) {
      this.inputLayer = new ArcGISImageServiceLayer(inputLayerURL, {
        id: utils.getId(),
        visible: false,
        imageServiceParameters: this.getDefaultImageServiceParameters(defaultRasterFunction)
      });
      this.resultLayer = new ArcGISImageServiceLayer(resultLayerUrl, {
        id: utils.getId(),
        visible: false
      });



      this.esriMap.addLayer(this.inputLayer, 1);
      this.esriMap.addLayer(this.resultLayer, 2);
      this.inputLayer.title = 'DifferensanalysInput';
      this.resultLayer.title = 'DifferensanalysResult';

    },

    getMapExtentAsWktPolygon: function () {
      var extent = this.esriMap.extent;
      var polygon = Polygon.fromExtent(extent);
      var wkt = "POLYGON (";
      polygon.rings.forEach(function (ring, ringIdx) {
        var part = "(";
        ring.forEach(function (coord, coordIdx) {
          part = part.concat(coord[0], " ", coord[1]);
          if (coordIdx < ring.length - 1) {
            part = part.concat(", ");
          }
        });
        wkt = wkt.concat(part, ")");
        if (ringIdx < polygon.rings.length - 1) {
          wkt = wkt.concat(", ");
        }
      });
      return wkt.concat(")");
    },

    addExtentListener: function (callback) {
      var _this = this;
      _this.esriMap.on('extent-change', function (evt) {
        callback(evt.extent);
      });
    },

    setResultLayerVisibility: function (visible) {
      this.resultLayer.setVisibility(visible);
    },

    setInputLayerVisibility: function (visible) {
      this.inputLayer.setVisibility(visible);
    },

    queryFeaturesByDate: function (date, extent) {
      var _this = this;
      var deferred = new Deferred();
      var date1 = new Date(date.getTime());
      var date2 = new Date(date.getTime());
      var query = new Query();
      var queryTask = new QueryTask(_this.inputLayer.url);
      query.returnGeometry = false;
      query.where = "ImageDate=Date" + "'" + _this._dateAsString(date1) + "'";
      query.geometry = extent;
      query.outFields = ['OBJECTID', 'ImageDate'];

      queryTask.execute(query,
        function (res) {
          deferred.resolve(res);
        },
        function (err) {
          deferred.reject(err);
        });
      return deferred.promise;
    },

    setMapTime: function (utcTimestamp) {
      var _this = this;
      var date1 = new Date(utcTimestamp);
      var date2 = new Date(utcTimestamp);

      _this.esriMap.setTimeExtent(new TimeExtent(date1, date2));
    },

    getZoomLevel: function () {
      return this.esriMap.getZoom();
    },

    updateRasterFunction: function (name, objectId1, objectId2, method, translation, vegIndex, soil, radnorm, nirBand, redBand) {
      var _this = this;
      var n = name || 'SKS_Barkborre';
      var _method = method || 'colormap';
      if (n && objectId1 !== null && objectId2 !== null && _this.resultLayer.visible) {
        var rasterFunction = new RasterFunction();
        rasterFunction.functionName = n;
        rasterFunction.outputPixelType = 'UNKNOWN';
        rasterFunction.arguments = {
          first: ''.concat('$', objectId1),
          last: ''.concat('$', objectId2),
        };
        rasterFunction.arguments.method = _method;
        if (translation) {
          rasterFunction.arguments.translation = translation;
        }
        if (vegIndex) {
          rasterFunction.arguments.vegindex = vegIndex;
        }
        if (soil) {
          rasterFunction.arguments.soil = soil;
        }
        if (radnorm) {
          rasterFunction.arguments.radnorm = radnorm;
        }
        if (nirBand) {
          rasterFunction.arguments.nir = nirBand;
        }
        if (redBand) {
          rasterFunction.arguments.red = redBand;
        }

        rasterFunction.variableName = 'Raster';
        _this.resultLayer.setRenderingRule(rasterFunction, true);
        _this.rasterFunction = rasterFunction;
        _this.resultLayer.refresh();
      }

    },

    updateDisplayRasterFunction: function (name) {
      var _this = this;
      var n = name || 'SKS_RGB';
      if (_this.inputLayer.visible) {
        var rasterFunction = new RasterFunction();
        rasterFunction.functionName = n;
        _this.inputLayer.setRenderingRule(rasterFunction, true);
        _this.inputLayer.refresh();
      }

    },

    setResultOpacity: function (op) {
      this.resultLayer.setOpacity(op);
    },

    getDefaultImageServiceParameters: function (rasterFunctionName) {
      var params = new ImageServiceParameters();
      var rasterFunc = new RasterFunction();
      rasterFunc.functionName = rasterFunctionName;
      params.renderingRule = rasterFunc;
      return params;
    },

    getExtent: function () {
      return this.esriMap.extent;
    },


    addInputLayerUpdateEndListener: function (callback) {
      this.inputLayer.on('update-end', function (err) {
        callback(err);
      });
    },

    addResultLayerUpdateEndListener: function (callback) {
      this.resultLayer.on('update-end', function (err) {
        callback(err);
      });
    },

    addInputLayerUpdateStartListener: function (callback) {
      this.inputLayer.on('update-start', function (err) {
        callback(err);
      });
    },

    addResultLayerUpdateStartListener: function (callback) {
      this.resultLayer.on('update-start', function (err) {
        callback(err);
      });
    },

    addResultLayerErrorListener: function (callback) {
      this.resultLayer.on('error', function (err) {
        callback(err);
      });
    },

    addInputLayerErrorListener: function (callback) {
      this.resultLayer.on('error', function (err) {
        callback(err);
      });
    },

    exportResultLayer: function (format, callback) {
      //används ej
      if (this.rasterFunction != null) {
        var params = new ImageServiceParameters();
        params.format = format;
        extent = this.esriMap.extent;
        params.extent = extent;
        renderingRule = this.rasterFunction;
        return this.resultLayer.exportMapImage(params, function (mapImage) {
          callback(mapImage);
        });
      } else {
        throw new Error("Fel, kontrollera att två datum är valda och att lagret är aktiverat");
      }


    },

    _dateAsString: function (date) {
      return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
        '-' + date.getDate().toString().padStart(2, 0);
    },

  });

});
