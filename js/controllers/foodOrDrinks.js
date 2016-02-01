// foodOrDrinks.js

( function() {
    var app = angular.module( 'FoodOrDrinks', [] );
    app.controller( 'FoodOrDrinksCtrl', [ '$scope', function( $scope ) {
        $scope.selectMenu = function( type ) {
            $scope.appstate.menuType = type;
            $scope.appstate.setView( 'sections' );
        };
    } ] );
} )();
