(function() {
    angular.module('TraiderApp')
        .controller('RemainsController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;
            vm.summary=0;
            $http.get('/api/menu/get_ingridients').then(function(res) {
                vm.remains=res.data;
                angular.forEach(vm.remains,function(val,ket) {
                	vm.summary+=val.lastPrice*val.count;
                })

            });

          	

        }]);
}());
