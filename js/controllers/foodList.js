// foodList.js

( function() {
    var app = angular.module( 'Food', [ 'Services' ] );
    app.controller( 'FoodCtrl', [ '$scope', 'menu', function( $scope, menu ) {
        // Init local scope
        $scope.modal = {
            visible: false,
            data: {
                food: {}
            }
        };

        menu.getFoodList( $scope.appstate.menuType, $scope.appstate.section )
            .then( function( foodList ) {
                $scope.foodList = foodList;
            } );

        menu.getQuickNotes( $scope.appstate.section )
            .then( function( quickNotes ) {
                $scope.quickNotes = quickNotes.map( function( quickNoteText ) {
                    return {
                        selected: false,
                        text: quickNoteText
                    };
                } );
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

        $scope.showModal = function( food ) {
            $scope.modal.visible = true;
            $scope.modal.data.food = food;
        };

        $scope.hideModal = function() {
            var orderItem,
                noteText;

            // Create note's text by concatanating selected quick notes
            noteText = $scope.quickNotes.filter( function( note ) {
                return note.selected;
            } ).map( function( note ) {
                return note.text;
            } ).join( ', ' );

            // Get order's item corresponding to given food and add the notes to it
            orderItem = $scope.appstate.order.getItem( { food: $scope.modal.data.food } );
            $scope.appstate.order.addNote( orderItem, noteText );
            
            // Dismiss modal
            $scope.modal.visible = false;
        };

    } ] );

} )();
