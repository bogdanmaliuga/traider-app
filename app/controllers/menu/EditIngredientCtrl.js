(function() {
    angular.module('TraiderApp')
        .controller('EditIngredientController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;
            vm.units = ['кг', 'л', 'шт'];
            vm.writeOffList = [true, false];
            vm.res = {};
            var body = {
                id: $state.params.ingredientId
            }
            $http.post('/api/menu/getingredient', body).then(function(res) {

                vm.res = res.data[0]

            });


        }]);
}());
