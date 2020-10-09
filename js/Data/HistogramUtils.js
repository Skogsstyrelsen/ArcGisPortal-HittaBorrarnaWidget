define([
  "dojo/_base/declare",
], function () {


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
    for (var ii = 0; ii < dataAttributeMapping.length; ii++) {
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
    getLabel: getLabel,
    getLabels: getLabels,
    getAttributeName: getAttributeName,
    getAttributeNames: getAttributeNames,
    getMapping: getMapping
  };


});
