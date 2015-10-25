(function() {
    var app = angular.module('RMT', ['Services']);
    app.controller('RMTCtrl', ['$scope', 'order', function($scope, order) {
        var food = { 
            name: "Pizza",
            price: 7.1
        };
        order.addFood({
            food: food,
            quantity: 2
        });
        $scope.order = order.getContent();
    }]);
})();