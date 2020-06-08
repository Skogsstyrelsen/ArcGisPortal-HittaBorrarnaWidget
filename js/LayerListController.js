define([], function () {

  function toggleLayerCheckbox(checkBoxId, checked) {
    $("#" + checkBoxId).prop('checked', checked);
  }

  function toggleLayerLoader(loaderId, visible) {
    var loader = $('#' + loaderId);
    visible ? loader.addClass('active') : loader.removeClass('active');
  }

  function onCheckboxChange(checkBoxId, callback) {
    $("#" + checkBoxId).change(
      function () {
        callback($(this).is(':checked'));
      });
  }

  function setLayerTitle(elementId, text) {
    $('#' + elementId).html(text);
  }

  function configureAnalysisRasterfunctions(rasterfunctions, changeHandler) {
    var select = $("<select></select>").attr("id", "analysisRasterfunctionSelect").attr("name", "analysisRasterfunctionSelect");
    $.each(rasterfunctions, function (index, json) {
      if (json.useAsDefault) {
        select.append($("<option></option>").attr("value", json.name).attr('selected', 'selected').text(json.displayName));
      } else {
        select.append($("<option></option>").attr("value", json.name).text(json.displayName));
      }
    });
    $('#analysisRasterfunctionsSelectCell').html(select);
    if (changeHandler) {
      select.on('change', function () {
        changeHandler($(this).val());
      });
    }

  }

  function configureDisplayRasterfunctions(rasterfunctions, changeHandler) {
    var select = $("<select></select>").attr("id", "displayRasterfunctionSelect").attr("name", "displayRasterfunctionSelect");
    $.each(rasterfunctions, function (index, json) {
      if (json.useAsDefault) {
        select.append($("<option></option>").attr("value", json.name).attr('selected', 'selected').text(json.displayName));
      } else {
        select.append($("<option></option>").attr("value", json.name).text(json.displayName));
      }
    });
    $('#displayRasterfunctionsSelectCell').html(select);
    if (changeHandler) {
      select.on('change', function () {
        changeHandler($(this).val());
      });
    }
  }

  function getSelectedAnalysisRasterfunction() {
    return $("#analysisRasterfunctionSelect").val();
  }

  function setResultLayerHelpText(color, text) {
    c = color || 'salmon';
    $('#resultLayerHelpText').css('color', c).text(text);
  }

  return {
    toggleLayerLoader: toggleLayerLoader,
    toggleLayerCheckbox: toggleLayerCheckbox,
    onCheckboxChange: onCheckboxChange,
    setLayerTitle: setLayerTitle,
    configureAnalysisRasterfunctions: configureAnalysisRasterfunctions,
    configureDisplayRasterfunctions: configureDisplayRasterfunctions,
    getSelectedAnalysisRasterfunction: getSelectedAnalysisRasterfunction,
    setResultLayerHelpText: setResultLayerHelpText
  };
});
