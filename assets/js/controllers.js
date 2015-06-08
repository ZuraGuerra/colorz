+(function () {


  angular.module('colorz').
    controller('PublicCtrl', ['$scope', '$http', PublicCtrl]);


  function PublicCtrl ($scope, $http) {

    $scope.hashtag = "browserDiscrimination";
    $scope.intro = "Users feeling discriminated right now."
    $scope.tweets = [];

    $http.get('/tweets/list').then(function (response) {
      console.log("Sails Backend responded: ", response);
      $scope.tweets = response.data.statuses;
    });

    io.socket.on('new_tweet', function (tweet) {
      console.log("OMG got a new tweet", tweet);
      $scope.$apply(function () {
        $scope.tweets.unshift(tweet);
      });
    });

  }

})();