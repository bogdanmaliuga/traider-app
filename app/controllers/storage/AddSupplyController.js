(function() {
    angular.module('TraiderApp')
        .controller('AddSupplyController', ['$scope', '$state', '$http', 'Notification', function($scope, $state, $http, Notification) {
            var vm = this;
            vm.providers = [];
            vm.date = new Date();
            vm.comment = "";
            vm.hour = vm.date.getHours();
            vm.minute = vm.date.getMinutes();
            vm.newSupply = [];
            vm.summary = 0;

            vm.newSupply.push({
                ingredient: {},
                price: 1,
                count: 1,
                summary: 1
            })

            $http.get('/api/menu/get_ingridients').then(function(res) {
                vm.ingredients = res.data;

            });
            $http.get('/api/provider').then(function(res) {
                angular.forEach(res.data, function(val, key) {
                    vm.providers.push(val);
                })
                vm.provider = vm.providers[0];

            });


            vm.calculateSummary = function(s, index) {
                vm.summary = 0;
                vm.newSupply[index].summary = s.price * s.count;
                angular.forEach(vm.newSupply, function(val, key) {
                    vm.summary += val.summary
                })

            }
            vm.getIngredient = function(ingredient, index) {
                console.log(ingredient);
                // vm.newSupply[index].ingredient= ingredient;

                // vm.newSupply[index].measuringUnit = ingredient.measuringUnit;
                // vm.newSupply[index]["_id"] = ingredient._id;

            }
            vm.add = function() {
                vm.newSupply.push({
                    ingredient: {},
                    price: 1,
                    count: 1,
                    summary: 1
                })
            }
            vm.remove = function(index) {
                vm.newSupply.splice(index, 1);
            }
            vm.save = function() {

                angular.forEach(vm.newSupply, function(val, key) {
                    val.ingredient.price = val.ingredient.price.filter(function(val) {
                        return val !== 0;
                    });
                    val.ingredient.price.push(val.price);
                    val.ingredient.is_used = true;
                    val.ingredient.count += val.count;

                    if(val.ingredient.price.length<=1){
                        val.ingredient.lastPrice = val.price;
                    }
                    else if(val.ingredient.price.length==2){
                        val.ingredient.lastPrice = ((val.ingredient.price[0]+val.ingredient.price[1])/2).toFixed(2);
                    }
                    else if(val.ingredient.price.length>=3){
                        val.ingredient.lastPrice = ((val.ingredient.price[val.ingredient.price.length-1]+val.ingredient.price[val.ingredient.price.length-2]+val.ingredient.price[val.ingredient.price.length-3])/3).toFixed(2); 
                    }
                    


                });


                var body = {
                    provider: vm.provider,
                    date: vm.date,
                    comment: vm.comment,
                    ingredients: vm.newSupply,
                    summary: vm.summary
                }



                $http.post('/api/supply', body).then(function(res) {
                    console.log(res);
                    if (res.status == 200) {
                        Notification({ message: res.data }, 'success');
                        $state.go('storage.supply');
                    }

                });

            }



        }]);
}());
