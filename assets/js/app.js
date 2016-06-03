/*jslint nomen: true*/
/*globals Backbone, $, _, console*/
(function() {
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
  App.views.SearchView = Backbone.View.extend({
    el: $('.search'),

    initialize: function() {
      this.input = $('.search input[type=text]');
      this.submit = $('.search input[type=submit]');
    },

    events: {
      'submit .search-form': 'searchSub'
    },

    searchSub: function(e) {
      e.preventDefault();
      router.navigate('#/reddit/' + this.input.val(), {
        trigger: true
      });
    }
  });

  App.views.HomeView = Backbone.View.extend({
    el: $('#reddit'),

    initialize: function() {
      this.render();
    },

    render: function() {
      return this;
    }
  });

  App.views.RedditView = Backbone.View.extend({
    el: $('#reddit'),

    template: _.template($('#reddit-template').html()),

    initialize: function(sub) {
      this.url = 'https://www.reddit.com/r/' + sub + '.json';
      this.render();
    },

    render: function() {
      var self = this;
      this.$el.empty().hide().fadeIn();

      $.getJSON(
        this.url,
        function(data) {
          $.each(data.data.children,
            function(i, post) {
              self.$el.append(self.template({
                post: post.data
              }));
            });
        }
      );

      var search = new App.views.SearchView();

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

  router.on('route:home', function() {
    var homeView = new App.views.HomeView();
  });

  router.on('route:reddit', function(sub) {
    var redditView = new App.views.RedditView(sub);
  });

  // init app
  Backbone.history.start();
}());
