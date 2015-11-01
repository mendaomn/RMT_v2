(function() {
    var app = angular.module('RMT', ['Services', 'Controllers']);
    app.controller('RMTCtrl', ['$scope', 'waiter', 'menu', function($scope, waiter, menu) {
        $scope.appstate = {
            room: 0,
            currentView: 'table-selection'
        };

        menu.getSections().then(function(sections) {
            var foodList = menu.getFoodList(sections[2]);
            console.log(foodList);
        });

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
    
    app.controller('TablesCtrl', ['$scope', 'restaurant', function($scope, restaurant) {
        var rooms = [];
        for (var j = 0; j < 3; j += 1) {
            var room = {};
            room.id = j;
            room.tables = [];
            for (var i = 0; i < 5; i += 1) {
                room.tables.push({
                    id: i
                });
            }
            rooms.push(room);
        }
        $scope.selectTable = function(table) {
            $scope.appstate.table = table;
            $scope.appstate.currentView = 'sections';
        };
        $scope.rooms = rooms;
        $scope.tables = rooms[0].tables;
    }]);
})();