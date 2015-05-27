+(function () {

  var app = angular.module('colorz', ['ui.router']);

  app.config(['$stateProvider', '$urlRouterProvider', angularRoutes]);


  function angularRoutes ($stateProvider, $urlRouterProvider) {
    // Define front-end angular routes.

    $urlRouterProvider.otherwise("/");

    $stateProvider

    .state('public', {
      url: "/",
      controller: 'PublicCtrl',
      template: JST['assets/templates/public.html']()
    });

  }

})();