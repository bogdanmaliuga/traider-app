(function() {
    angular.module('TraiderApp')
        .controller('ClassiferController', ['$scope', '$state', '$http', 'Notification', '$uibModalInstance', 'body','current', function($scope, $state, $http, Notification, $uibModalInstance, body,current) {
            var vm = this;
            console.log(body);
            vm.classList = body;
            console.log(current);
            vm.clases = current;
            vm.closeModal = function() {
                $uibModalInstance.dismiss('cancel');
            };
            vm.checkId =function(name) {
                if (vm.clases.indexOf(name) == -1) {
                   return false;

                } else {
                    return true;
                }
            }
            vm.addClass = function(name) {


                if (vm.clases.indexOf(name) == -1) {
                    vm.clases.push(name);
                    console.log(vm.clases.indexOf(name));

                } else {
                    console.log('delete');
                    console.log(vm.clases.indexOf(name));
                    vm.clases.splice(vm.clases.indexOf(name), 1);
                }



            }
            vm.save = function() {

                $uibModalInstance.close(vm.clases);
            }


        }]);
}());
