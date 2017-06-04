angular
  .module('TraiderApp')
  .controller('InvertController', InvertController);

function InvertController($http,$filter) {
  var vm = this;
  vm.today=new Date();
  vm.today=$filter('date')(vm.today, "dd-MM-yyyy");



  $http.get('/api/menu/get_ingridients').then(function(res) {
    vm.remains = res.data;
    angular.forEach(vm.remains, function(val, key) {
      val['ew']=0;
      val['res']=val.count-0;
    })

  });
}
