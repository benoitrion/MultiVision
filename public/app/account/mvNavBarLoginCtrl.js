angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http) {
  $scope.signin = function(username, password) {
    console.log("I'm not done yet");
    console.log(username, password);
    $http.post('/login', {usrname:username, password:password}).then(function (response) {
      console.log(response.data.success);
      if(response.data.success) {
        console.log('logged in!');
      } else {
        console.log('failed to log in!');
      }
    })
  }
});
