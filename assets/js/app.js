+(function () {

  var app = angular.module('colorz', ['ui.router']);

  app.config(['$stateProvider', '$urlRouterProvider', angularRoutes]);


  function angularRoutes ($stateProvider, $urlRouterProvider) {
    // Define front-end angular routes.

    $urlRouterProvider.otherwise("/public");

    $stateProvider

    .state('public', {
      url: "/public",
      controller: 'PublicCtrl',
      template: JST['assets/templates/public.html']()
    });

  }

})();