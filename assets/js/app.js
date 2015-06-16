+(function () {

  var app = angular.module('colorz', ['ui.router', 'wu.masonry']);

  app.config(['$stateProvider', '$urlRouterProvider', angularRoutes]);


  function angularRoutes ($stateProvider, $urlRouterProvider) {
    // Define front-end angular routes.

    $urlRouterProvider.otherwise("/");

    $stateProvider

    .state('public', {
      url: "/",
      controller: 'PublicCtrl',
      template: JST['assets/templates/public.html']()
    })

    .state('admin', {
      url: "/admin",
      controller: 'AdminCtrl',
      template: JST['assets/templates/admin.html']()
    })

    .state('hashtag', {
      url: "/hashtag",
      controller: 'HashtagCtrl',
      template: JST['assets/templates/hashtag.html']()
    });

  }

})();