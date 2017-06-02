(function() {
    angular.module('TraiderApp', ['ui.router', 'ngFileUpload', 'ui-notification', 'ngStorage','ui.bootstrap','ngSanitize','ngCsv','ngJsonExportExcel'])
        .run(function($rootScope, AuthService, $state) {
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
                
                if (toState.authenticate && toState.name !== 'login' && !AuthService.isLoggedIn()) {
                   
                    event.preventDefault();
                    $state.transitionTo('login');
                }
            });
        })
        .config(function($httpProvider,$locationProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
            
        })
        .config(function($stateProvider) {

            $stateProvider
                .state('home', {
                    
                    url: '/home',
                    templateUrl: "app/views/home.html",
                    controller:"HomeController"
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: "app/views/signup.html",
                    controller:'SignUpController'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: "app/views/signin.html",
                    controller: "LoginController"
                })
                .state('menu', {
                    url: '/menu',
                    templateUrl: "app/views/menu.html",
                    controller: "menuController",
                    controllerAs: "menus",
                    authenticate: true

                })
                .state('order',{
                    url: '/order',
                    templateUrl: "app/views/order.html",
                    controller: "OrderController",
                    controllerAs: "vm",
                    authenticate: true
                })
                .state('payment',{
                    url: '/payment/:tableId',
                    templateUrl: "app/views/payment.html",
                    controller: "PaymentController",
                    controllerAs: "vm",
                    authenticate: true
                })
                .state('menu.product', {
                    url: '/products',
                    templateUrl: "app/views/menu/product-list.html",
                    controller: "menuController",
                    controllerAs: "vm",
                    authenticate: true

                })
                .state('menu.act', {
                    url: '/products/act',
                    templateUrl: "app/views/menu/act-list.html",
                    controller: "ActMenuController",
                    controllerAs: "vm",
                    authenticate: true

                })
                 .state('menu.addProduct', {
                    url: '/products/add_product',
                    templateUrl: "app/views/menu/add-product.html",
                    controller: "AddProcuctController",
                    controllerAs: "vm",
                    authenticate: true

                })
                .state('menu.ingredients', {
                    url: '/ingredients',
                    templateUrl: "app/views/menu/ingredients.html",
                    controller: "IngredientsListController",
                    controllerAs: "ingredients",
                    authenticate: true

                })
                .state('menu.addIngredient', {
                    url: '/ingredients/addingredient',
                    templateUrl: "app/views/menu/add-ingredient.html",
                    controller: "AddIngredientController",
                    controllerAs: "newIngredient",
                    authenticate: true

                })
                .state('menu.editIngredient', {
                    url: '/ingredients/editingredient/:ingredientId',
                    templateUrl: "app/views/menu/edit-ingredient.html",
                    controller: "EditIngredientController",
                    controllerAs: "editIngredient",
                    authenticate: true

                })
                .state('storage', {
                    url: '/storage',
                    templateUrl: "app/views/storage.html",
                    controller: "StorageController",
                    controllerAs: "storage",
                    authenticate: true

                })
                .state('storage.supply', {
                    url: '/supply',
                    templateUrl: "app/views/storage/supply.html",
                    controller: "SupplyController",
                    controllerAs: "supply",
                    authenticate: true

                })
                .state('storage.addSupply', {
                    url: '/supply/addsupply',
                    templateUrl: "app/views/storage/add-supply.html",
                    controller: "AddSupplyController",
                    controllerAs: "supply",
                    authenticate: true

                })
                .state('storage.providers', {
                    url: '/providers',
                    templateUrl: "app/views/storage/providers.html",
                    controller: "ProviderController",
                    controllerAs: "provider",
                    authenticate: true

                })
                .state('storage.addProvider', {
                    url: '/providers/addprovider',
                    templateUrl: "app/views/storage/add-provider.html",
                    controller: "AddProviderController",
                    controllerAs: "provider",
                    authenticate: true

                })

                .state('storage.remains', {
                    url: '/remains',
                    templateUrl: 'app/views/storage/remains.html',
                    controller: 'RemainsController',
                    controllerAs: 'remains',
                    authenticate: true


                })
                .state('menu.сoupon', {
                    url: '/coupon',
                    templateUrl: 'app/views/menu/coupon.html',
                    controller: 'CouponController',
                    controllerAs: 'vm',
                    authenticate: true


                })
                .state('menu.class', {
                    url: '/class',
                    templateUrl: 'app/views/menu/class.html',
                    controller: 'ClassController',
                    controllerAs: 'vm',
                    authenticate: true


                });




        })
        .config(function(NotificationProvider) {
            NotificationProvider.setOptions({
                delay: 10000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top'
            });
        });
}());
