define([
  "dojo/_base/declare",
  "dojo/request",
  "dojo/request/registry",
  "dojo/Deferred"
], function (declare, request, registry, Deferred) {

  function getIndexRutor(histogramConfig, wktPolygon, startDate, endDate) {
    var baseUrl = histogramConfig.url;
    baseUrl = baseUrl.replace(/\/?$/, '/');
    var url = baseUrl + 'Raster/Scl/HistogramDateSummary';
    var query = {};
    if (wktPolygon) {
      query.extent = wktPolygon;
    }
    if (wktPolygon && startDate && endDate && startDate instanceof Date && endDate instanceof Date) {
      query = {
        extent: wktPolygon,
        minDatum: startDate.toUTCString(),
        maxDatum: endDate.toUTCString()
      };
    }
    return registry.get(url, {
      handleAs: "json",
      query: query,
    });
  }

  function getDates(histogramConfig, wktPolygon) {
    var deffered = new Deferred();
    var url = histogramConfig.url + 'Raster/Scl/HistogramDateSummary';
    var query = {};
    if (wktPolygon) {
      query.extent = wktPolygon;
    }

    request(url, {
      handleAs: "json",
      query: query
    }).then(function (jsonResp) {
        var dates = jsonResp.map(function (x) {
          return new Date(x.datum);
        }).sort(function (a, b) {
          return new Date(a) - new Date(b);
        });
        deffered.resolve(dates);
      },
      function (err) {
        deffered.reject(err);
      });

    return deffered.promise;
  }

  dataAttributeMapping = [{
      label: 'Summa bra data',
      value: 'sumBraData'
    },
    {
      label: 'Antal indexrutor',
      value: 'antalIndexrutor'
    },
    {
      label: 'Max indexrutor',
      value: 'maxAntalIndexrutor'
    },
    {
      label: 'Medel bra data',
      value: 'avgBraData'
    },
    {
      label: 'Täckning',
      value: 'coverage'
    }
  ];

  function getLabel(attrName) {
    for (var ii = 0; ii < this.dataAttributeMapping.length; ii++) {
      var attr = dataAttributeMapping[ii];
      if (attr.value === attrName) {
        return attr.label;
      }
    }
  }

  function getAttributeName(label) {
    for (var ii = 0; ii < dataAttributeMapping.length; ii++) {
      var attr = dataAttributeMapping[ii];
      if (attr.label === label) {
        return attr.value;
      }
    }
  }

  function getLabels() {
    return dataAttributeMapping.map(function (e) {
      return e.label;
    });
  }

  function getAttributeNames() {
    return dataAttributeMapping.map(function (e) {
      return e.value;
    });
  }

  function getMapping() {
    return dataAttributeMapping;
  }

  return {
    getIndexRutor: getIndexRutor,
    getDates: getDates,
    getLabel: getLabel,
    getLabels: getLabels,
    getAttributeName: getAttributeName,
    getAttributeNames: getAttributeNames,
    getMapping: getMapping
  };
});
