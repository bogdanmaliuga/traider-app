(function() {
    angular.module('TraiderApp')
        .controller('IngredientsListController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;
            vm.newIngredient = {};
            
            vm.newIngredient.measuringUnit = 'кг';
            vm.units = ['кг', 'л', 'шт'];
            vm.writeOffList = [true, false];
            vm.newIngredient.writeOff = true;
            


            $http.get('/api/menu/get_ingridients').then(function(res) {
                vm.ingredientsList = res.data;
            });

            vm.add = function() {
                $http.post('/api/menu/ingridients', vm.newIngredient).then(function(res) {

                });
            }


        }]);
}());
