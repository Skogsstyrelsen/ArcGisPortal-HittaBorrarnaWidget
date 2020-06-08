define([
  "dojo/_base/declare",
], function (declare) {
  return declare(null, {

    dataAttributeMapping: [{
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
    ],

    getLabel: function (attrName) {
      for (var ii = 0; ii < this.dataAttributeMapping.length; ii++) {
        var attr = this.dataAttributeMapping[ii];
        if (attr.value === attrName) {
          return attr.label;
        }
      }
    },

    getAttributeName: function (label) {
      for (var ii = 0; ii < this.dataAttributeMapping.length; ii++) {
        var attr = this.dataAttributeMapping[ii];
        if (attr.label === label) {
          return attr.value;
        }
      }
    },

    getLabels: function () {
      return this.dataAttributeMapping.map(function (e) {
        return e.label;
      });
    },

    getAttributeNames: function () {
      return this.dataAttributeMapping.map(function (e) {
        return e.value;
      });
    },

    getMapping: function () {
      return this.dataAttributeMapping;
    }





  });

});
