
    angular.module("hms", [])

    .controller("discuss2",function(disfactory){
     var reply=this;
     var disfactory1=disfactory();
     reply.text=disfactory1.getText();
   })
   .controller("discuss1",function(disfactory){
     var post=this;
     var disfactory2 = disfactory();
     post.text=disfactory2.getText();
     post.name='You';
     post.msg="";
     post.show=false
  
     post.getKeys=function(event){
       if(event.which===13)
         post.addText();
     }
     post.addText=function(){
       post.text=disfactory2.addText(post.name,post.msg);
       post.msg="";
       post.show=true;
     }
   })

   .factory('disfactory',function(){
       var factory=function(){
         return new disservice();
       };
       return factory;
   })

   function disservice(){
     var service=this;
     var text=[];
     service.addText=function(name,inputtext){
       var comment={Name:name,Post:inputtext}
       text.push(comment);
       return text;
     };
     service.getText=function(){
       return text;
     };
   }

 
 