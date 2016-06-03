/*jslint nomen: true*/
/*globals Backbone, $, _, console*/
(function () {
  'use strict';

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

  //views
  App.views.HomeView = Backbone.View.extend({
    el: $('#reddit'),

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html('asdfasdfa');
      return this;
    }
  });

  App.views.RedditView = Backbone.View.extend({
    el: $('#reddit'),

    template: _.template($('#reddit-template').html()),

    initialize: function (sub) {
      this.url = 'http://www.reddit.com/r/' + sub + '.json';
      this.render();
    },

    render: function () {
      var self = this;

      $.getJSON(
        this.url,
        function (data) {
          $.each(data.data.children,
            function (i, post) {
              self.$el.append(self.template({
                post: post.data
              }));
            });
        }
      );

      return this;
    }
  });

  //router
  App.router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'reddit/:sub': 'reddit'
    }
  });

  router = new App.router();

  router.on('route:home', function () {
    var homeView = new App.views.HomeView();
  });

  router.on('route:reddit', function (sub) {
    var redditView = new App.views.RedditView(sub);
  });

  // init app
  Backbone.history.start({
    pushState: true
  });
}());