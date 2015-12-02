// orderRecap.js

(function() {
    var app = angular.module('OrderRecap', ['Services']);
    app.controller('OrderCtrl', ['$scope', function($scope) {
        $scope.orderContent = $scope.appstate.order.getContent();

        $scope.removeFood = function(orderItem) {
            console.log(orderItem, "removing!");
            $scope.appstate.order.removeItem(orderItem);
        };

        $scope.orderFood = function(orderItem) {
            $scope.appstate.order.addFood({
                food: orderItem.food,
                quantity: 1
            });
        };

        $scope.reduceFood = function(orderItem) {
            $scope.appstate.order.reduceFood(orderItem.food);
        };

        $scope.showNote = function(orderItem) {
            console.log("Please add note :D", orderItem.food.name, orderItem.quantity);
        };
    }]);
})();
