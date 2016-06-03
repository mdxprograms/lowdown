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

    template: _.template($('#search-template').html()),

    initialize: function() {
      this.render();
    },

    events: {
      'submit .search-form': 'searchSub'
    },

    render: function() {
      this.$el.html(this.template);
    },

    searchSub: function(e) {
      e.preventDefault();
      this.input = $('.search input[type=text]');
      this.submit = $('.search input[type=submit]');

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
      this.$el.empty();

      $.getJSON(this.url, function(data) {
        $.each(data.data.children, function(i, post) {
          var image = 'http://core0.staticworld.net/images/article/2012/11/reddit_log-100011890-large.jpg';
          if (!_.isNull(post.data.media)) {
            image = post.data.media.oembed.thumbnail_url;
          }

          self.$el.append(self.template({
            post: post.data,
            image: image
          }));
        });
      });

      return this;
    }
  });

  //router
  App.router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'reddit': 'reddit',
      'reddit/:sub': 'redditSub'
    }
  });

  router = new App.router();

  router.on('route:home', function() {
    var homeView = new App.views.HomeView();
  });

  router.on('route:reddit', function() {
    $('#reddit').html('');
    var search = new App.views.SearchView();
  })

  router.on('route:redditSub', function(sub) {
    var redditView = new App.views.RedditView(sub);
    var search = new App.views.SearchView();
  });

  // init app
  Backbone.history.start();
}());
