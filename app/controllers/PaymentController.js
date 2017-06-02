(function() {
    angular.module('TraiderApp')
        .directive("myCurrentTime", function(dateFilter) {
            return function(scope, element, attrs) {
                var format;

                scope.$watch(attrs.myCurrentTime, function(value) {
                    format = value;
                    updateTime();
                });

                function updateTime() {
                    var dt = dateFilter(new Date(), format);
                    element.text(dt);
                }

                function updateLater() {
                    setTimeout(function() {
                        updateTime(); // update DOM
                        updateLater(); // schedule another update
                    }, 1000);
                }

                updateLater();
            }
        })

    .controller('PaymentController', ['$scope', '$state', '$uibModal', 'Notification', '$http', '$stateParams', function($scope, $state, $uibModal, Notification, $http, $stateParams) {
        var vm = this;
        $scope.format = 'M/d/yy h:mm:ss a';
        vm.listProducts = [];
        vm.totalOrderPrice = 0;
        vm.isNow = false;
        vm.currentLists = [];
        vm.sale = 1;
        getCurrentOrder();

        $http.get('/api/menu/get_ingridients').then(function(res) {
            vm.bar = res.data;
        });
        $http.get('/api/menu/product').then(function(res) {
            vm.products = res.data;
        });
        $http.get('/api/menu/class').then(function(res) {
            vm.classList = res.data;
        });

        function getCurrentOrder(argument) {
            $http.post('/api/getorder', {
                tableId: $stateParams.tableId
            }).then(function(res) {


                if (res.data) {
                    vm.listProducts = res.data.items;
                    vm.totalOrderPrice = res.data.totalPrice;
                    vm.id = res.data._id;
                    vm.isNow = res.data.isNow;
                    console.log(res.data.sale);
                    vm.sale = res.data.sale;
                } else {
                    vm.listProducts = [];
                    vm.id = null;
                    vm.totalOrderPrice = 0;
                    vm.isNow = false;
                    vm.sale = 1;
                }


            });
        }

        vm.openClassModal = function(index) {
            if (vm.listProducts['' + index + ''].class) {
                vm.currentLists = vm.listProducts['' + index + ''].class;
            }

            return $uibModal.open({
                animation: true,
                templateUrl: 'app/views/class-modal.html',
                controller: 'ClassiferController',
                controllerAs: 'vm',
                windowClass: 'class-modal',
                resolve: {
                    body: function() {
                        return vm.classList;
                    },
                    current: function() {
                        return vm.currentLists;
                    }

                }
            }).result.then(function(selectedItem) {

                vm.listProducts['' + index + '']['class'] = selectedItem;



            });
        }
        vm.caclTotalPrice = function(arr) {
            vm.totalOrderPrice = 0;
            angular.forEach(arr, function(val, key) {
                vm.totalOrderPrice += val.countForBuy * val.lastPrice

            })
        }
        vm.addToList = function(bar) {
            bar['countForBuy']=1
            if (vm.listProducts.length == 0) {
                vm.listProducts.push(bar);
                
            } else {
                vm.check = false;
                angular.forEach(vm.listProducts, function(val, key) {

                    if (val._id == bar._id) {
                        vm.check = true;
                    }

                });
                if (!vm.check) {
                    vm.listProducts.push(bar);
                }

            }



        }
        vm.removeFromList = function(index) {
            console.log(index);
            vm.listProducts.splice(index, 1);
            vm.caclTotalPrice(vm.listProducts);
        }
        vm.makeOrder = function(argument) {
            console.log(vm.sale);

            if (vm.id) {

                var body = {
                    date: new Date(),
                    id: vm.id,
                    items: vm.listProducts,
                    table: $stateParams.tableId,
                    isNow: true,
                    totalPrice: vm.totalOrderPrice,
                    comment: null,
                    isCancel: false,
                    sale: vm.sale


                }
                $http.post('/api/update_order', body).then(function(res) {

                    Notification({ message: res.data.message }, 'success');
                    getCurrentOrder();

                });

            } else {


                var body = {
                    date: new Date(),

                    items: vm.listProducts,
                    table: $stateParams.tableId,
                    isNow: true,
                    isCancel: false,
                    totalPrice: vm.totalOrderPrice,
                    comment: null,
                    sale: vm.sale


                }
                $http.post('/api/order', body).then(function(res) {

                    Notification({ message: res.data.message }, 'success');
                    getCurrentOrder();

                });
            }

        }
        vm.finishOrder = function() {
            var body = {
                date: new Date(),
                id: vm.id,
                items: vm.listProducts,
                table: $stateParams.tableId,
                isNow: false,
                isCancel: false,
                totalPrice: vm.totalOrderPrice,
                comment: null,
                sale: vm.sale


            }
            $http.post('/api/update_order', body).then(function(res) {

                Notification({ message: "Замовлення закрито" }, 'success');
                $state.go('order');

            });

        }
        vm.makeSale = function() {
            $http.get('/api/coupon/' + vm.code).then(function(res) {


                vm.sale = res.data.sale;


                vm.makeOrder();

            });
        }
        vm.cancelOrder = function() {
            var body = {
                date: new Date(),
                id: vm.id,
                items: vm.listProducts,
                table: $stateParams.tableId,
                isNow: false,
                isCancel: true,
                totalPrice: vm.totalOrderPrice,
                comment: "dasd",
                sale: vm.sale


            }
            return $uibModal.open({
                animation: true,
                templateUrl: 'app/views/cancel-modal.html',
                controller: 'CancelController',
                controllerAs: 'vm',
                windowClass: 'cancel-modal',
                resolve: {
                    body: body

                }
            });
            // $http.post('/api/update_order', body).then(function(res) {
            //     console.log(res);
            //     Notification({ message: "Замовлення скасовано" }, 'success');
            //     $state.go('order');

            // });
        }


    }]);
}());
