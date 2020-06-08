define([
  'dojo/_base/declare',
], function (declare) {
  return declare(null, {

    /* Denna används inte tills vidare */
    mapUtils: null,
    constructor: function (mapUtils) {
      this.mapUtils = mapUtils;
    },
    configureDownloadForm: function () {
      var _this = this;
      $("#downloadBtn").click(function () {
        _this.onDownload();
      });
    },

    getDownloadFormat: function () {
      return $("#downloadFormatSelect").val();
    },

    onDownload: function () {
      $("#downloadLink").html();
      $("#downloadErrorMessage").removeClass('is-active');
      try {
        var format = this.getDownloadFormat();
        this.mapUtils.exportResultLayer(format, function (mapImage) {
          var href = mapImage.href;
          if (href) {
            var _link = $("<a download>Klicka här för att ladda ner</a>").attr("href", href).attr("target", "_blank").attr("class", "icon-ui-check-mark")
            $("#downloadLink").html(_link);
          } else {
            throw new Error("Fel vid nedladdning");
          }
        });

      } catch (error) {
        $("#downloadErrorMessage").addClass('is-active').html(error.message);
      }
    }
  });


});
