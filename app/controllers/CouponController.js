(function() {
    angular.module('TraiderApp')
        .controller('CouponController', ['$scope', '$state', '$http', 'Notification', function($scope, $state, $http, Notification) {
            var vm = this;
            vm.sale = 0;
            vm.code = "";
            getCoupons();
            vm.addCoupon = function() {
                vm.nowSale=1 - vm.sale / 100;
                var body = {
                    code: vm.code,
                    sale: vm.nowSale
                }
                $http.post('/api/coupon',body).then(function(res) {
                    getCoupons();
                    console.log(res)
                });
            }
            function getCoupons() {
                $http.get('/api/coupons').then(function(res) {

                     vm.couponList=res.data;
                });
            }




        }]);
}());
