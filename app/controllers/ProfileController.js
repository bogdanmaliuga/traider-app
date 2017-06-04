angular
    .module('TraiderApp')
    .controller('ProfileController', ProfileController);

function ProfileController($http,Storage) {
  var vm=this;
  vm.name=Storage.getUsername();


  $http.get('/api/user/'+vm.name).then(function(res) {
    vm.user=res.data;
  });
}
