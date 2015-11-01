// Waiter.js
// waiter.js - creates, modifies and deletes orders
(function() {
    var app = angular.module('Waiter', ['Order']);
    app.factory('waiter', ['orderGenerator', function(orderGenerator) {
        var orders = [];
        return {
            createOrder: function(table) {
                var newOrder = orderGenerator.createOrder();
                orders.push(newOrder);
                return newOrder;
            },
            deleteOrder: function(order) {
                var pos = orders.indexOf(order);
                orders.splice(pos, 1);
            },
            sendOrder: function(order) {
                var content = order.getContent();
                console.log("foods: ", order.getCount());
                console.log("list of foods: ", content);

            }
        };
    }]);
})();