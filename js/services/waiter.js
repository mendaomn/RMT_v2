// Waiter.js
// waiter.js - creates, modifies and deletes orders
(function() {
    var app = angular.module('Waiter', ['Order', 'RmtAPI']);
    app.factory('waiter', ['orderGenerator', 'rmtAPI', function(orderGenerator, rmtAPI) {
        var orders = [];

        function getter(name) {
            return function(obj) {
                return obj[name];
            };
        }

        function deleteOrder(order) {
            var pos = orders.indexOf(order);
            orders.splice(pos, 1);
        }

        return {
            createOrder: function(tablesArray) {
                var newOrder = orderGenerator.createOrder(tablesArray);
                // Delete old orders and free their tables
                tablesArray.forEach(function(table) {
                    var order = this.getOrder(table);
                    if (order) {
                        order.tablesArray.forEach(function(_table) {
                            _table.busy = false;
                        });
                        deleteOrder(order);
                    }
                    table.busy = true;
                }.bind(this));
                orders.push(newOrder);
                return newOrder;
            },
            getOrder: function(table) {
                return orders.find(function(order) {
                    return order.tablesArray.indexOf(table) != -1;
                });
            },
            sendOrder: function(order) {
                var payload = {
                    room: order.room,
                    table: order.tablesArray.map(function(table) {
                        return table.id;
                    }).join(' + '),
                    order: order.getContent()
                };
                console.log("Sending", payload);
                rmtAPI.sendOrder(payload).then(function() {});
            },
            sendInvoice: function(order) {
                var payload = {
                    room: order.room,
                    table: order.tablesArray.map(function(table) {
                        return table.id;
                    }).join(' + '),
                    order: order.getContent(),
                    total: order.getTotal()
                };
                console.log("Sending invoice", payload);
                rmtAPI.sendInvoice(payload).then(function() {});
            }
        };
    }]);
})();
