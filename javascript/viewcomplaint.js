
angular.module('complaint',[])
.controller('view',function($scope,$http){
    $http.get('/comp').then(function(data){
        $scope.comp=data.data;
    })
    
    $scope.name="hi";
});


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
