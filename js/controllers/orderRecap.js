// orderRecap.js

(function() {
    var app = angular.module('OrderRecap', ['Services']);
    app.controller('OrderCtrl', ['$scope', 'waiter', function($scope, waiter) {
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
                menuType: orderItem.menuType,
                quantity: 1,
                note: orderItem.note
            });
        };

        // Handler: reduces by 1 from item's quantity
        $scope.reduceFood = function(orderItem) {
            $scope.appstate.order.reduceQuantity(orderItem);
        };

        // Handler: shows note taker or something
        $scope.showNote = function(orderItem) {
            // Create the note's environment in the $scope  
            $scope.note = {
                visible: true,
                item: orderItem,
                text: orderItem.note
            };

            console.log("Please add note :D", orderItem.food.name, orderItem.quantity);
        };

        // Handler: send to Kitchen
        $scope.sendToKitchen = function(order){
            waiter.sendOrder(order);
        };

        // Handler: send invoice to cashier
        $scope.sendInvoice = function(order){
            waiter.sendInvoice(order);
        };

        // Save note content to the order's item
        // It should do more
        $scope.saveNote = function(note) {
            console.log(note);
            // Add note to order's item
            $scope.appstate.order.addNote(note.item, note.text);

            // debugging purpose
            console.log($scope.appstate.order.getContent());
        };

    }]);
})();
