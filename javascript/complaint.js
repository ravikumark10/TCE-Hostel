!function(){
  "use strict";
      angular.module('eventApp', [])
      .controller('eventController', eventController);
      function eventController($scope) {
          $scope.total=50;
          $scope.msg_num=0;
          $scope.length=function(msg){
            $scope.msg_num=msg.length;
            if($scope.msg_num==$scope.total){
                $scope.res="Maximum size reached";
            }
          }
      }
}();