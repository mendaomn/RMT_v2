// foodList.js

( function() {
    var app = angular.module( 'Food', [ 'Services' ] );
    app.controller( 'FoodCtrl', [ '$scope', 'menu', function( $scope, menu ) {
        menu.getFoodList( $scope.appstate.menuType, $scope.appstate.section )
            .then( function( foodList ) {
                $scope.foodList = foodList;
            } );

        // addFood: function(args) {
        //             var obj = {
        //                 food: args.food,
        //                 quantity: args.quantity,
        //                 note: args.note || undefined
        //             };

        $scope.orderFood = function( food ) {
            $scope.appstate.order.addFood( {
                menuType: $scope.appstate.menuType,
                food: food,
                quantity: 1
            } );
        };

        $scope.reduceFood = function( food ) {
            var orderItem = $scope.appstate.order.getItem( {
                food: food
            } );

            $scope.appstate.order.reduceQuantity( orderItem );
        };
    } ] );
} )();
