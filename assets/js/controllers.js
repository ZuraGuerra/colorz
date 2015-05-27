+(function () {


  angular.module('colorz').
    controller('PublicCtrl', ['$scope', PublicCtrl]);


  function PublicCtrl ($scope) {


    $scope.message = "TE AMO";

  }

})();