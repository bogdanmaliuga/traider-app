(function() {
    angular.module('TraiderApp')
        .controller('ActMenuController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;
            $http.get('/api/menu/product').then(function(res) {

                vm.products = res.data;
            });
            vm.edit = function(id, price) {
                var body = {
                    id: id,
                    lastPrice: price
                }
                $http.put('/api/menu/product', body).then(function(res) {
                    console.log(res);
                });
            }
            $scope.shouldBeActive = function() {

                return $state.includes('menu.addIngredient');
            }

        }])
        .controller('menuController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;
            $scope.today = new Date();
            $http.get('/api/menu/product').then(function(res) {
                console.log(res.data);
                vm.products = res.data;
            });
            $scope.shouldBeActive = function() {

                return $state.includes('menu.addIngredient');
            }

        }])
        .controller('AddProcuctController', ['$scope', '$state', '$http', 'Upload', function($scope, $state, $http, Upload) {

            var vm = this;
            vm.newProduct = [];
            vm.date = new Date();
            vm.summaryPrice = 0;
            vm.weight = 0;



            $http.get('/api/menu/get_ingridients').then(function(res) {
                vm.ingredients = res.data;
            });


            vm.calculateProcent = function(s, index) {
                s.procent = 100 - (s.brutto / s.netto * 100);
                s.price = s.ingredient.lastPrice * s.brutto;
                vm.summaryPrice = 0;
                vm.weight = 0;
                angular.forEach(vm.newProduct, function(val, key) {
                    vm.summaryPrice += val.price;
                    vm.weight += val.netto;
                })
            }

            vm.newProduct.push({
                ingredient: {},
                brutto: 1,
                netto: 1,
                procent: 1,
                price: 1
            });

            vm.addNew = function() {
                vm.newProduct.push({
                    ingredient: {},
                    brutto: 1,
                    netto: 1,
                    procent: 1,
                    price: 1
                })
            }

            vm.remove = function(index) {
                vm.newProduct.splice(index, 1);
            }

            vm.add = function() {
                if (vm.upload_form.file.$valid && vm.file) {
                    vm.upload(vm.file);
                }
            }

            vm.upload = function(file) {
                Upload.upload({
                    url: '/api/upload',
                    data: { file: file }
                }).then(function(resp) {
                    if (resp.data.error_code === 0) {
                        vm.img = "/uploads/" + resp.data.filename;
                        var body = {
                            name: vm.name,
                            ingredients: vm.newProduct,
                            weight: vm.weight,
                            cost: vm.summaryPrice,
                            imgUrl: vm.img,
                            lastPrice: vm.summaryPrice



                        }
                        $http.post('/api/menu/product', body).then(function(res) {
                            console.log(res);

                        });
                        $state.go('menu.product');
                    } else {

                    }
                }, function(resp) {
                    console.log(resp);

                }, function(evt) {
                    console.log(evt);
                });
            };

            $scope.shouldBeActive = function() {

                return $state.includes('menu.addProduct');

            }

        }])
        .controller('ClassController', ['$scope', '$state', '$http', 'Upload', function($scope, $state, $http, Upload) {

            var vm = this;
            vm.newClass = "";
            vm.classList=[];
            getClass();
            vm.addNewClass = function() {
                var body = {
                    name: vm.newClass
                }
                $http.post('/api/menu/class', body).then(function(res) {
                    getClass();
                    vm.newClass="";
                });
            }
            vm.removeClass=function(id) {
                $http.delete('/api/menu/class/'+id).then(function(res) {
                   getClass();
                })
            }

            function getClass() {
                $http.get('/api/menu/class').then(function(res) {
                    vm.classList=res.data;
                });
            }

        }]);
}());
