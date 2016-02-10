// rmtModal.js
// component representing a barebone modal

( function() {
    var app = angular.module( 'RMTModal', [] );
    app.directive( 'rmtModal', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                rmtModalTitle: '=',
                rmtModalOnclose: '&',
            },
            templateUrl: 'directives/rmtModal.html',
            link: function( scope, elem, attrs ) {

            }
        };
    } );
} )();
