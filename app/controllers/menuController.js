(function() {
    angular.module('TraiderApp')
        .controller('menuController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;

            $scope.shouldBeActive = function() { 

			  return $state.includes('menu.addIngredient');
			}

        }]);
}());
