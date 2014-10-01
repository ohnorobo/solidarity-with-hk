define(function(require, exports) {
  'use strict';
  var Handlebars = require('handlebars'),
      _ = require('lodash');

  var templates = {
    url: Handlebars.compile('<a href="{{url}}" target="_blank"><h4 id="website">{{title}}<h4></a>'),
    image: Handlebars.compile('<img class="photo" src="{{url}}"/>'),
    title: Handlebars.compile('<div><h4>{{title}}</h4><div>{{{rendered}}}</div></div>'),
    list: Handlebars.compile('<ul> {{#list}} <li>{{{this}}}</li> {{/list}} </ul>'),
    directions: Handlebars.compile('<a href="http://maps.google.com/maps?q={{directions}}">{{title}}</a>'),
    simple: Handlebars.compile('{{text}}'),
    popup: Handlebars.compile('<div>{{#popup}}<div id="{{div_id}}">{{{rendered}}}</div>{{/popup}}</div>')
  };
  var formatters = {
    url: function(value, property) {
      var title = property.title || '[link]';
      return templates.url({title: title,
                            url: value});
    },

    title: function(value, property) {
      var t = property.title + ""; //force copy by value
      property.title = null;
      return templates.title({title: t,
                              rendered: format(value, property)});
    },

    list: function(value, property) {
      if (value.length === 0) {
        return '';
      } else if (value.length === 1) {
        return format(value[0], property);
      }
      return templates.list({
        list: _.map(value, function(x) {return format(x, property)} )
      });
    },

    image: function(value) {
      return templates.image({url: value});
    },

    simple: function(value) {
      return templates.simple({text: value}).replace(
          /\n/g, '<br>');
    },

    directions: function(value, property) {
      var title = property.title || "directions";
      return templates.directions({title: title,
                                   directions: value});
    }
  };

  function format(value, property) {
    property = property || {};
    var formatter;
    if (property.url) {
      formatter = 'url';
    } else if (property.directions) {
      formatter = 'directions';
    } else if (property.title) {
      formatter = 'title';
    } else if (_.isArray(value)) {
      formatter = 'list';
    } else if (property.image) {
      formatter = 'image';
    } else {
      formatter = 'simple';
    }
    // apply the discovered formatter to the data
    return formatters[formatter](value, property);
  }

  exports.popup = function(properties, feature) {
    var popup = [],
        rendered;
    _.each(properties, function(property) {

      var key;
      if (typeof property === "string") {
        key = property;
      } else if (typeof property === "object") {
        key = property.name;
      }

      var value = feature[key];
      if (value !== undefined) {
        rendered = format(value, property);
        if (rendered) {
          popup.push({
            div_id: key,
            rendered: rendered
          });
        }
      }
    });
    return templates.popup({popup: popup});
  };
});
