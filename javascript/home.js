

var home=angular.module("hms",[])
home.controller('homeController',function($scope){
    $scope.announcement=true;
    $scope.admissions=false;
    $scope.events=false;
    $scope.no=1;
    $scope.btn1=false;
    $scope.btns=false;
    $scope.change=function(x){
        if (x==1 && $scope.announcement==false){
            $scope.admissions=false;
            $scope.events=false;
            $scope.announcement=true;
        }
        else if(x==2 && $scope.admissions==false){
            $scope.announcement=false;
            $scope.events=false;
            $scope.admissions=true;
        }
        else if(x==3 && $scope.events==false){
            $scope.announcement=false;
            $scope.admissions=false;
            $scope.events=true;
        }    
        }
    $scope.changeImg=function(x){
        $scope.no+=x;
        if ($scope.no==4){
            $scope.no=1;
        }
        else if($scope.no==0){
            $scope.no=3;
        }
        
    }
    $scope.hovering=function(){
        $scope.btns=true;

    }
    $scope.leaving=function(){
        $scope.btns=false;

    }
    
    
        
});


