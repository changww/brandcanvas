var app = angular.module('send', [])
  .controller('SendController', ['$scope', '$http', function($scope, $http) {
       console.log("Controler Running"); 
    $scope.name = '';
    $scope.email = '';
    
    $scope.sendServer = function(){
      console.log("this posts to server", $scope.name, $scope.email);
     // console.log($http);
      $http.post('/api/subscribe',{name:$scope.name, email:$scope.email});

      return true;
      
      // .then(
      //   function(results){
      //   console.log("success send", results.data.apiResult);
      // },function(error){
      //   console.log("there was an error", error);
      // });

      
    }
   
    
    
}]);