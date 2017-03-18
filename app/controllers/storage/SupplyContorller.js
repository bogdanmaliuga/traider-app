(function() {
    angular.module('TraiderApp')
        .controller('SupplyController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;
            $http.get('/api/supply').then(function(res) {
                vm.supplys = res.data;

            });
          	

        }]);
}());
