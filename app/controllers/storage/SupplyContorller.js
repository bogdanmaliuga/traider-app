(function() {
    angular.module('TraiderApp')
        .controller('SupplyController', ['$scope', '$state', '$http', function($scope, $state, $http) {
            var vm = this;
            $http.get('/api/supply').then(function(res) {
                vm.supplys = res.data;

            });
          	vm.showDetails=function(index,ingredients){
          		console.log(index);
          		vm.toggle=index;
          		vm.details=[];
          		angular.forEach(ingredients,function (val,key) {
          			vm.details.push({
          				name:val.ingredient.name,
          				unit:val.ingredient.measuringUnit,
          				price:val.price,
          				count:val.count

          			})
          			
          		});
          		
          		$('#item'+index).after($('#toggle')).show('slow');
          	}

        }]);
}());
