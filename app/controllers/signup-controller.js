(function() {
    angular.module('TraiderApp')
        .controller('SignupController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            $scope.createUser = function() {
                console.log($scope.newUser);

                $http.post('/api/user/signup', $scope.newUser).then(function(res) {


                    })
                    .catch(function(res) {

                    })
                    .finally(function(res) {


                    });
                $http.get('/api/userList').then(function(res){
                	console.log(res);
                });
            }

        }]);
}());
