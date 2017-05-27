(function() {
    angular.module('TraiderApp')
        .controller('OrderController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;

            vm.goToPaymentPage=function(table) {
            	$state.go('payment',{tableId:table});
            }

        }]);
}());
