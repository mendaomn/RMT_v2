// orderRecap.js

(function() {
    var app = angular.module('OrderRecap', ['Services']);
    app.controller('OrderCtrl', ['$scope', function($scope) {
        $scope.orderContent = $scope.appstate.order.getContent();

        $scope.removeFood = function(orderItem) {
            console.log(orderItem, "removing!");
            $scope.appstate.order.removeItem(orderItem);
            $scope.orderContent = $scope.appstate.order.getContent();
        };
    }]);
})();