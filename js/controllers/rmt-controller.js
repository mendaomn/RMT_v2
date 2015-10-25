(function() {
    var app = angular.module('RMT', ['Services']);
    app.controller('RMTCtrl', ['$scope', 'waiter', function($scope, waiter) {
        var o1 = waiter.createOrder();
        var o2 = waiter.createOrder();
        var food1 = {
            name: "Pizza",
            price: 7.1
        };
        var food2 = {
            name: "Minestrone",
            price: 4
        };
        o1.addFood({
            food: food1,
            quantity: 2,
            note: "No pom"
        });
        o2.addFood({
            food: food2,
            quantity: 1
        });
        waiter.sendOrder(o1);
        waiter.sendOrder(o2);
    }]);
})();