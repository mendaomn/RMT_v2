// foodList.js

(function() {
    var app = angular.module('Food', ['Services']);
    app.controller('FoodCtrl', ['$scope', 'menu', function($scope, menu) {
        $scope.foodList = menu.getFoodList($scope.appstate.section);

        $scope.selectSection = function(section) {
            $scope.appstate.section = section;
        };
    }]);
})();