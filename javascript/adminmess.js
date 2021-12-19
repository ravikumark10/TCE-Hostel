
    var app=angular.module("hms", [])
      app.controller("breakfast", function (mess,$http) {
        var breakfast=this;
          $http.get('/breakfast').then(function(data){
          breakfast.food=data.data;
        });
        
        breakfast.value=false;
        breakfast.change=function(){
          breakfast.value=mess.show(breakfast.value);
        }      
        
      })
     app.controller("lunch", function (mess,$http) {
        var lunch=this;
        $http.get('/lunch').then(function(data){
          lunch.food=data.data;
        });
        
        lunch.value=false;
        lunch.change=function(x){
          lunch.value=mess.show(lunch.value);
          
        }
      })
      app.controller("dinner", function (mess,$http) {
        var dinner=this;
        $http.get('/dinner').then(function(data){
          dinner.food=data.data;
        });

        dinner.value=false;
        dinner.change=function(){
          dinner.value=mess.show(dinner.value);
        }
      })

      app.service('mess',function(){
          var service=this;
          service.show=function(value){
            value=!value;
            return value;
          };
      })


  

 