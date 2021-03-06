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
            $scope.appstate.setView('food-or-drinks');
        }

        // Assign to $scope
        $scope.neworder = neworder;
        $scope.confirmTables = confirmTables;

        // Listeners
        $scope.$watch('neworder.room', setTables);

        // Init
        restaurant.getRooms().then(function(rooms) {
            $scope.rooms = rooms;
            $scope.neworder.room = $scope.rooms[0];
            setTables($scope.neworder.room);
        });

        // utils
        function assigner(obj) {
            return function(data) {
                obj = data;
            };
        }

        function setTables(room) {
            restaurant.getTables(room).then(function(tables) {
                $scope.tables = tables;
            });
        }

    }]);
})();
