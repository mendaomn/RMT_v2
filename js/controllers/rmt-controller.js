(function() {
    var app = angular.module('RMT', ['Services', 'Controllers', 'Directives', 'ngTouch']);
    app.controller('RMTCtrl', ['$scope', 'waiter', 'menu', function($scope, waiter, menu) {
        $scope.appstate = (function() {
            var viewsHistory = [];
            return {
                currentView: 'table-selection',
                canGoBack: false,
                setView: function(view) {
                    if (this.currentView !== view) {
                        viewsHistory.push(this.currentView);
                        this.currentView = view;
                        this.canGoBack = true;
                    }
                },
                goBack: function() {
                    if (viewsHistory.length) {
                        this.currentView = viewsHistory.pop();
                        if (viewsHistory.length === 0) {
                            this.canGoBack = false;
                        }
                    }
                }
            };
        })();
    }]);

    app.controller('TablesCtrl', ['$scope', 'restaurant', 'waiter', function($scope, restaurant, waiter) {
        $scope.selectRoom = function(room) {
            $scope.appstate.room = room;
            $scope.tables = restaurant.getTables(room);
        };
        $scope.selectTable = function(table) {
            $scope.appstate.table = table;
            $scope.appstate.order = waiter.createOrder(table);
            $scope.appstate.setView('sections');
        };
        $scope.rooms = restaurant.getRooms();
        $scope.appstate.room = $scope.rooms[0];
        $scope.tables = restaurant.getTables($scope.appstate.room);
    }]);
})();
