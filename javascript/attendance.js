!(function () {
  angular
    .module("hms", [])
    .controller("controller1", function ($scope) {
      $scope.attendance = [
        { Date: "18-Sep-2021", Status: "Present" },
        { Date: "19-Sep-2021", Status: "Present" },
        { Date: "20-Sep-2021", Status: "Absent" },
        { Date: "21-Sep-2021", Status: "Absent" },
        { Date: "22-Sep-2021", Status: "Present" },
        { Date: "23-Sep-2021", Status: "Present" },
        { Date: "24-Sep-2021", Status: "Present" },
        { Date: "25-Sep-2021", Status: "Present" },
        { Date: "26-Sep-2021", Status: "Present" },
      ];
      $scope.student1 = { Name: "Harish", Dept: "IT", Block: "A", Room: "A1" };
    })
    .directive("student", function () {
      return {
        template:
          "Name:{{student1.Name}} Dept:{{student1.Dept}} Block:{{student1.Block}} Room:{{student1.Room}}" +
          "<br><br>",
      };
    })
    .filter("myDate", function ($filter) {
      var angularDateFilter = $filter("date");
      return function (theDate) {
        return angularDateFilter(theDate, "dd-MMM-yyyy");
      };
    });
})();

function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
