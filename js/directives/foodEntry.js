// foodEntry.js
// component showing food name and quantity, allowing quantity to be modified

(function() {
    var app = angular.module('FoodEntry', []);
    app.directive('foodEntry', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                name: '=',
                quantity: '=',
                note: '=',
                onplus: '&',
                onminus: '&',
                onnote: '&?'
            },
            templateUrl: 'templates/directives/foodEntry.html',
            link: function(scope, elem, attrs) {
                scope.$watch('showQuantity', function(val) {
                    if (val && !scope.quantity)
                        scope.onplus();
                });

                scope.clicked = function() {
                    if (scope.onnote)
                        scope.showMiddleStep = true;
                    else
                        scope.showQuantity = true;
                };

            }
        };
    });
})();
