+(function () {


  angular.module('colorz').
    controller('PublicCtrl', ['$scope', '$http', PublicCtrl]).
    controller('AdminCtrl', ['$scope', '$http', '$state', 'AuthService', AdminCtrl]).
    controller('HashtagCtrl', ['$scope', '$http', 'AuthService', '$state', HashtagCtrl]).
    service('AuthService', AuthService).
    filter('linkURL', [linkURLFilter]).
    filter ('linkUser', [linkUserFilter]).
    filter ('linkHashtag', [linkHashtagFilter]).
    filter ('trustHTML', ['$sce', trustHTMLFilter]);

  function linkURLFilter () {
    return function (input) {

      return input.morphURL();

    }
  }

  function linkUserFilter () {
    return function (input) {

      return input.morphUser();

    }
  }

  function linkHashtagFilter () {
    return function (input) {

      return input.morphHashtag();

    }
  }

  function trustHTMLFilter ($sce) {
    return function (input) {

      return $sce.trustAsHtml(input);

    }
  }


  function PublicCtrl ($scope, $http) {

    $scope.tweets = [];

    $http.get('/tweets/list').then(function (response) {
      console.log("Sails Backend responded: ", response);
      $scope.tweets = response.data.statuses;
    });

    $http.get('/tweets/info').then(function (response) {
      console.log("Sails Backend responded: ", response);
      $scope.hashtag = response.data.hashtag;
      $scope.intro = response.data.intro;
      $scope.rules = response.data.rules;
    });


    io.socket.on('new_tweet', function (tweet) {
      console.log("OMG got a new tweet", tweet);


      $scope.$apply(function () {
        $scope.tweets.unshift(tweet);
      });
    });



  }


  function AdminCtrl ($scope, $http, $state, AuthService) {
    $scope.admin = "lel";
    $scope.login = function() {
      console.log("lalala ", $scope.email, $scope.password);

      var admin = {
        email: $scope.email,
        password: $scope.password
      }

      $http.post('/admin/login', admin)
        .then(function (response) {
          console.log("ok", response);
          if (response.data === "true") {
            AuthService.isAdmin = true;
            $state.go('hashtag');
          } else {
            alert("Access denied!!! PEEEW! PEEEW! PEEEW!");
            AuthService.isAdmin = false;
          }
        })

    }
  }

  function HashtagCtrl ($scope, $http, AuthService, $state) {
    $scope.admin = "lel";
    if (!AuthService.isAdmin) {
      $state.go('admin');
      return;
    }

    $http.get('/tweets/info').then(function (response) {
      console.log("Sails Backend responded: ", response);
      $scope.hashtag = response.data.hashtag;
      $scope.intro = response.data.intro;
      $scope.rules = response.data.rules;
    });


    $scope.setHashtag = function() {
      $http.post('/tweets/setHashtag', { hashtag: $scope.hashtag })
    }

    $scope.setIntro = function() {
      $http.post('/tweets/setIntro', { intro: $scope.intro })
    }
    
    $scope.setRules = function() {
      $http.post('/tweets/setRules', { rules: $scope.rules })
    }
    
  }

  function AuthService () {
    this.isAdmin = false;
  }

})();