(function() {
  angular.module('TraiderApp')
    .controller('AccessController', ['$scope', '$state', '$http', 'Notification', function($scope, $state, $http, Notification) {
      var vm = this;
      vm.roles = ["Системний адміністратор", "Бугалтер", "Бармен", "Офіціант"];
      vm.users = [];
      $http.get('/api/users').then(function(res) {
        vm.users = res.data;
        console.log(res.data);
      });

      vm.update=function (a,b) {
        console.log(a);
        console.log(b);
        if(a=="Системний адміністратор"){
          vm.roleID=1;
        }
        else if(a=="Бугалтер"){
          vm.roleID=2;
        }
        else if(a=="Бармен"){
          vm.roleID=3;
        }
        else if(a=="Офіціант"){
          vm.roleID=4;
        }
        var body={
          role_code:vm.roleID,
          role:a
        }
        $http.post('/api/users/'+b,body).then(function(res) {
          if(res.status==200){
              Notification({ message: "Доступ оновлено" }, 'success');
          }
        })
      }
      // console.log($rootScope);


    }]);
}());
