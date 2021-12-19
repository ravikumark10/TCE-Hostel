    var room_numA1=["1","2","3","4","5","6","7","8","9","10"];
    var room_numA2=["11","12","13","14","15","16","17","18","19","20"];
    var room_numA3=["21","22","23","24","25","26","27","28","29","30"];
    angular.module("myApp",[])
    .controller("firstCtrl",firstCtrl)
    .controller("secondCtrl",secondCtrl);
    firstCtrl.$inject=['$scope'];
    secondCtrl.$inject=['$scope'];
    function firstCtrl($scope){
        $scope.display=false;
        $scope.changeblock=function(block){
            $scope.bl=block;
        }    
        $scope.changefloor=function(x){
            $scope.display=false;
            $scope.num=x;
            if($scope.num==0){
                $scope.room_num=room_numA1;
            }
            else if($scope.num==1){
                $scope.room_num=room_numA2;
            }
            else if($scope.num==2){
                $scope.room_num=room_numA3;
            }
        }
    }
    function secondCtrl($scope){
        $scope.display=false;
        $scope.showroom=function(x){
            $scope.display=true;
            $scope.btnval=x;
        }

    }