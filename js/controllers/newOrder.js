// newOrder.js

(function() {
    var app = angular.module('NewOrder', ['Services']);
    app.controller('NewOrderCtrl', ['$scope', 'restaurant', 'waiter', function($scope, restaurant, waiter) {
        var neworder = {
            room: {},
            tables: [],
            selectTable: function(table) {
                if (neworder.tables.indexOf(table) == -1) {
                    neworder.tables.push(table);
                } else {
                    neworder.tables.splice(neworder.tables.indexOf(table), 1);
                }
            },
            isSelected: function(table) {
                return neworder.tables.indexOf(table) != -1;
            }
        };

        // Handler
        function confirmTables(currentOrder) {
            console.log("Confirming order", currentOrder);
            $scope.appstate.room = currentOrder.room;
            //$scope.appstate.table = currentOrder.tables;
            $scope.appstate.order = waiter.createOrder(currentOrder.tables);
            $scope.appstate.setView('sections');
        }

        // Assign to $scope
        $scope.neworder = neworder;
        $scope.confirmTables = confirmTables;

        // Listeners
        $scope.$watch('neworder.room', function(room) {
            $scope.tables = restaurant.getTables(room);
        });

        // Init
        $scope.rooms = restaurant.getRooms();
        $scope.neworder.room = $scope.rooms[0];
        $scope.tables = restaurant.getTables($scope.neworder.room);
    }]);
})();
