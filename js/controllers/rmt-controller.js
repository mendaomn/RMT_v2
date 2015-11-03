(function() {
    var app = angular.module('RMT', ['Services', 'Controllers']);
    app.controller('RMTCtrl', ['$scope', 'waiter', 'menu', function($scope, waiter, menu) {
        $scope.appstate = (function() {
            var viewsHistory = [];
            return {
                currentView: 'table-selection',
                room: {},
                setView: function(view) {
                    viewsHistory.push(this.currentView);
                    this.currentView = view;
                },
                goBack: function() {
                    if (viewsHistory.length)
                        this.currentView = viewsHistory.pop();
                }
            }
        })();
    }]);

    app.controller('TablesCtrl', ['$scope', 'restaurant', function($scope, restaurant) {
        $scope.selectRoom = function(room) {
            $scope.appstate.room = room;
            $scope.tables = restaurant.getTables(room);
        };
        $scope.selectTable = function(table) {
            $scope.appstate.table = table;
            $scope.appstate.setView('sections');
        };
        $scope.rooms = restaurant.getRooms();
        $scope.tables = restaurant.getTables($scope.appstate.room);
    }]);
})();