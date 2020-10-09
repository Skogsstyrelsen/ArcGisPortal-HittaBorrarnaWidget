define([
  "dojo/request/registry"
], function (registry) {

  function getIndexRutor(histogramConfig, wktPolygon) {
    var baseUrl = histogramConfig.url;
    baseUrl = baseUrl.replace(/\/?$/, '/');
    var url = baseUrl + 'Raster/Scl/HistogramDateSummary';
    var data = {};
    if (wktPolygon) {
      data.extent = wktPolygon;
      data = JSON.stringify(data);
    }
    return registry.post(url, {
      handleAs: "json",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    });
  }



  return {
    getIndexRutor: getIndexRutor
  };
});
