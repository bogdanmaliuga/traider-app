(function() {
    angular.module('TraiderApp', ['ui.router', 'ngFileUpload', 'ui-notification','ngStorage'])
        .config(function($stateProvider) {

            $stateProvider
                .state('signUp', {
                    url: "/signup",
                    templateUrl: "app/views/signup.html",
                    controller: "HomeController"
                })
                .state('menu', {

                    url: '/menu',
                    templateUrl: "app/views/menu.html",
                    controller: "menuController",
                    controllerAs: "menus"

                })
                .state('menu.product', {
                    url: '/products',
                    templateUrl: "app/views/menu/product-list.html",
                    controller: "menuController",
                    controllerAs: "menus"
                })
                .state('menu.ingredients', {
                    url: '/ingredients',
                    templateUrl: "app/views/menu/ingredients.html",
                    controller: "IngredientsListController",
                    controllerAs: "ingredients"
                })
                .state('menu.addIngredient', {
                    url: '/ingredients/addingredient',
                    templateUrl: "app/views/menu/add-ingredient.html",
                    controller: "AddIngredientController",
                    controllerAs: "newIngredient"
                })
                .state('menu.editIngredient', {
                    url: '/ingredients/editingredient/:ingredientId',
                    templateUrl: "app/views/menu/edit-ingredient.html",
                    controller: "EditIngredientController",
                    controllerAs: "editIngredient"
                })
                .state('storage', {
                    url: '/storage',
                    templateUrl: "app/views/storage.html",
                    controller: "StorageController",
                    controllerAs: "storage"
                })
                .state('storage.supply', {
                    url: '/supply',
                    templateUrl: "app/views/storage/supply.html",
                    controller: "SupplyController",
                    controllerAs: "supply"
                })
                .state('storage.addSupply', {
                    url: '/supply/addsupply',
                    templateUrl: "app/views/storage/add-supply.html",
                    controller: "AddSupplyController",
                    controllerAs: "supply"
                })
                .state('storage.providers', {
                    url: '/providers',
                    templateUrl: "app/views/storage/providers.html",
                    controller: "ProviderController",
                    controllerAs: "provider"
                })
                .state('storage.addProvider', {
                    url: '/providers/addprovider',
                    templateUrl: "app/views/storage/add-provider.html",
                    controller: "AddProviderController",
                    controllerAs: "provider"
                })
                .state('storage.remains',{
                    url:'/remains',
                    templateUrl:'app/views/storage/remains.html',
                    controller:'RemainsController',
                    controllerAs:'remains'

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
