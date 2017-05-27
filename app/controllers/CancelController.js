(function() {
    angular.module('TraiderApp')
        .controller('CancelController', ['$scope', '$state', '$http', 'Notification','$uibModalInstance','body', function($scope, $state, $http, Notification,$uibModalInstance, body) {
            var vm = this;
            console.log(body);
            vm.closeModal = function() {
            $uibModalInstance.dismiss('cancel');
        	};
            vm.cancelingOrder = function(reason) {
                body.comment = reason;
                $http.post('/api/update_order', body).then(function(res) {
                    console.log(res);
                    Notification({ message: "Замовлення скасовано" }, 'success');
                    vm.closeModal();
                    $state.go('order');


                });
            }


        }]);
}());
