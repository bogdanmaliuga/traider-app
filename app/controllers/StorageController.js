(function() {
    angular.module('TraiderApp')
        .controller('StorageController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;

            $scope.shouldBeActive = function() { 

			  return $state.includes('menu.addIngredient');
			}

        }]);
}());
