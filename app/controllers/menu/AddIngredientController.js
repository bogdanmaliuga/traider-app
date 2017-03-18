(function() {
    angular.module('TraiderApp')
        .controller('AddIngredientController', ['$scope', '$state', '$http', 'Upload', '$window', function($scope, $state, $http, Upload, $window) {
            var vm = this;
            vm.newIngredient = {};
            vm.file = {};
            vm.measuringUnit = 'кг';
            vm.units = ['кг', 'л', 'шт'];
            




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
                        var body={
                            name:vm.name,
                            measuringUnit:vm.measuringUnit,
                            writeOff:vm.writeOff,
                            img:vm.img,
                            price:[0],
                            count:0,
                            lastPrice:0,
                            is_used:false
                            
                        }
                        $http.post('/api/menu/ingridients', body).then(function(res) {
                            console.log(res);
                           
                        });
                        $state.go('menu.ingredients');
                    } else {

                    }
                }, function(resp) {
                    console.log(resp);

                }, function(evt) {
                    console.log(evt);
                });
            };


        }]);
}());
