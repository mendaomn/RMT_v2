// foodList.js

(function() {
    var app = angular.module('Food', ['Services']);
    app.controller('FoodCtrl', ['$scope', 'menu', function($scope, menu) {
        $scope.foodList = menu.getFoodList($scope.appstate.section);

        // addFood: function(args) {
        //             var obj = {
        //                 food: args.food,
        //                 quantity: args.quantity,
        //                 note: args.note || undefined
        //             };

        $scope.orderFood = function(food) {
            console.log(food);
            $scope.appstate.order.addFood({
                food: food,
                quantity: 1
            });
        };

        $scope.reduceFood = function(food) {
            console.log("Would like to reduce ", food);
            food.name = "left";
        }
    }]);
})();