(function() {
    angular.module('TraiderApp')
        .controller('ProviderController', ['$scope', '$state', '$http', 'Notification', function($scope, $state, $http, Notification) {
            var vm = this;


            $http.get('/api/provider').then(function(res) {
                vm.providersList = res.data;
            });
            vm.delete = function(id) {

                $http.delete('/api/provider/' + id).then(function(res) {
                	if(res.status==200){
                		Notification({ message: res.data.message }, 'success');
                        $http.get('/api/provider').then(function(res) {
			                vm.providersList = res.data;
			            });
                	}
                });
            }

        }]);
}());
