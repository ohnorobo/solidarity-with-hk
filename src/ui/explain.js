define(function(require, exports, module) {
  'use strict';
  var flight = require('flight');
  var Handlebars = require('handlebars');
  var $ = require('jquery');
  var templates = {
    input: Handlebars.compile('While Hong Kongers\' are fighting for democracy peacefully with their persistence and ambitious spirit, they are not alone: Check out the events happening in <strong>{{count}} cities</strong> around the world echoing this Umbrella Movement!'),
  };
  module.exports = flight.component(function info() {
    this.defaultAttrs({
      "closeSelector": ".close",
      "explanationSelector": ".explanation"
    });

    this.configureExplain = function(ev, config) {
      this.explainConfig = config.properties;
    };

    this.displayCount = function(ev, facetData) {
      var count = (facetData && facetData.Title && facetData.Title.length) || 0;
      this.select('explanationSelector').html(
        templates.input({count: count})
      );
    };

    this.hide = function() {
      this.$node.hide();
    };

    this.after('initialize', function() {
      this.on(document, 'config', this.configureExplain);
      this.on(document, 'dataFacets', this.displayCount);
      this.on(this.select('closeSelector'), 'click', this.hide);
    });
  });
});