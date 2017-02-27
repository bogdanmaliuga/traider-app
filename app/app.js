(function() {
    angular.module('TraiderApp', ['ui.router'])
        .config(function($stateProvider) {
            $stateProvider
                .state('signUp', {
                    url: "/signup",
                    templateUrl: "app/views/singup.html",
                    controller: "SignupController"
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
                    controller: "IngredientsListController",
                    controllerAs: "ingredients"
                })
                .state('menu.editIngredient',{
                    url: '/ingredients/editingredient/:ingredientId',
                    templateUrl: "app/views/menu/edit-ingredient.html",
                    controller: "EditIngredientController",
                    controllerAs: "editIngredient"
                })

        });
}());
