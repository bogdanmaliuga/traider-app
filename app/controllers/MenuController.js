(function() {
    angular.module('TraiderApp')
        .controller('menuController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;

            $scope.shouldBeActive = function() {

                return $state.includes('menu.addIngredient');
            }

        }])
        .controller('AddProcuctController', ['$scope', '$state', '$http', 'Upload', function($scope, $state, $http, Upload) {

            var vm = this;
            vm.newProduct = [];
            vm.date = new Date();
            vm.summary = 0;


            $http.get('/api/menu/get_ingridients').then(function(res) {
                vm.ingredients = res.data;
			});

           
            vm.calculateProcent=function(s,index){
            	console.log(s);
            }

            vm.newProduct.push({
                ingredient: {},
                brutto: 1,
                netto: 1,
                procent: 1
            });

            vm.addNew = function() {
                vm.newProduct.push({
                    ingredient: {},
                    brutto: 1,
                    netto: 1,
                    procent: 1
                })
            }
            
            vm.remove = function(index) {
                vm.newSupply.splice(index, 1);
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
                            netto: 1312,
                            ingredients: ["das", "dasd"],
                            weight: 123,
                            cost: 1124,
                            imgUrl: vm.img



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

        }]);
}());
