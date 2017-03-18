(function() {
    angular.module('TraiderApp')
        .controller('IngredientsListController', ['$scope', '$state', '$http', 'Upload', function($scope, $state, $http, Upload) {
            var vm = this;
            
            $http.get('/api/menu/get_ingridients').then(function(res) {
                vm.ingredientsList = res.data;
            });



        }]);
}());
