// orderRecap.js

(function() {
    var app = angular.module('OrderRecap', ['Services']);
    app.controller('OrderCtrl', ['$scope', function($scope) {
        // Init $scope to hold the current order
        $scope.orderContent = $scope.appstate.order.getContent();

        // Handler: removes item from order
        $scope.removeFood = function(orderItem) {
            console.log(orderItem, "removing!");
            $scope.appstate.order.removeItem(orderItem);
        };

        // Handler: adds 1 to item's quantity
        $scope.orderFood = function(orderItem) {
            $scope.appstate.order.addFood({
                food: orderItem.food,
                quantity: 1
            });
        };

        // Handler: reduces by 1 from item's quantity
        $scope.reduceFood = function(orderItem) {
            $scope.appstate.order.reduceFood(orderItem.food);
        };

        // Handler: shows note taker or something
        $scope.showNote = function(orderItem) {
            // Create the note's environment in the $scope  
            $scope.note = {
                visible: true,
                item: orderItem
            };

            console.log("Please add note :D", orderItem.food.name, orderItem.quantity);
        };

        // Save note content to the order's item
        // It should do more
        $scope.saveNote = function(){
            $scope.note.item.note = $scope.note.text;
        };

    }]);
})();
