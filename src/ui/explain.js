define(function(require, exports, module) {
  'use strict';
  var flight = require('flight');
  var $ = require('jquery');
  module.exports = flight.component(function info() {
    this.defaultAttrs({
      "closeSelector": ".close"
    });

    this.configureExplain = function(ev, config) {
      this.explainConfig = config.properties;
    };

    this.hide = function() {
      this.$node.hide();
    };

    this.after('initialize', function() {
      this.on(document, 'config', this.configureExplain);
      this.on(this.select('closeSelector'), 'click', this.hide);
    });
  });
});