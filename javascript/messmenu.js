!(function () {
    angular.module("hms", [])
      .controller("controller1", function ($scope,$http) {
   
        $http.get('/mess').then(function(data){
          $scope.food=data.data;
        });
      })
  })();
  

  