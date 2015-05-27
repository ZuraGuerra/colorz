+(function () {


  angular.module('colorz').
    controller('PublicCtrl', ['$scope', '$http', PublicCtrl]);


  function PublicCtrl ($scope, $http) {

    $scope.hashtag = "bot2bot";
    $scope.intro = "Lovely bots talking to each other."
    $scope.tweets = [];

    $http.get('/tweets/list').then(function (response) {
      console.log("Sails Backend responded: ", response);
      $scope.tweets = response.data;
    });

  }

})();