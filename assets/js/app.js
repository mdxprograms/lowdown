/*jslint nomen: true*/
/*globals Backbone, $, _, console*/
(function () {
  'use strict';

  $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.crossDomain = {
      crossDomain: true
    };
    options.xhrFields = {
      withCredentials: true
    };
  });

  var App = {
      models: {},
      collections: {},
      views: {},
      router: {}
    },
    router = {};

  //models
  App.models.item = Backbone.Model.extend({});

  //collections
  App.collections.endpoint = Backbone.Collection.extend({});

  //views
  App.views.AppView = Backbone.View.extend({
    el: $('#app'),

    template: _.template($('#app-template').html()),

    initialize: function () {
      this.render();
    },

    render: function () {
      var data = new App.collections.endpoint(),
        self = this;

      data.url = 'https://reddit.com/r/deathmetal/.json';

      data.fetch({
        success: function (items) {
          console.log(items);
          self.$el.html(self.template({
            items: items
          }));
        }
      });

      return this;
    }
  });

  //router
  App.router = Backbone.Router.extend({
    routes: {
      '': 'home'
    }
  });

  router = new App.router();

  router.on('route:home', function () {
    var appView = new App.views.AppView();
  });

  // init app
  Backbone.history.start();
}());
