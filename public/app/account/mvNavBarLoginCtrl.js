angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $htpp) {
  $scope.signin = function(username, password) {
    $http.post('/login', {usrname:username, password:password}).then(function () {
      if(response.data.success) {
        console.log('logged in!');
      } else {
        console.log('failed to log in!');
      }
    })
  }
});