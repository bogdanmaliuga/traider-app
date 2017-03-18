(function() {
    angular.module('TraiderApp')
        .controller('EditIngredientController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;
            vm.units = ['кг', 'л', 'шт'];

            vm.res = {};
            var body = {
                id: $state.params.ingredientId
            }

            $http.post('/api/menu/getingredient', body).then(function(res) {

                vm.res = res.data[0]

            });
            vm.update = function(argument) {
                $http.post('/api/ingredient/update', vm.res).then(function(res) {

                });
            }


        }]);
}());
