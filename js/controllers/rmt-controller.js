(function() {

  var app = angular.module( "RMT", [ "Services", "Controllers", "Directives",
    "templates", "ngTouch", "ngStorage"
  ]);

  app.run([ "$rootScope", "$sessionStorage", "restaurant", "waiter",

    function( $rootScope, $sessionStorage, restaurant, waiter ) {

      $rootScope.$on( "$locationChangeStart", function( event ) {

        var busytablesIDs;

        // Provide default fallback for storage
        $sessionStorage.$default({
          orders: []
        });

        // Gather the ids of all the busy tables
        busytablesIDs = $sessionStorage.orders.reduce(function( ids, order ) {
          return ids.concat( order.tablesArray.map( getter( "id" ) ) );
        }, []);

        // Load both orders and tables into the app
        waiter.loadExistingOrders( $sessionStorage.orders );
        restaurant.setBusyTables( busytablesIDs );

        // No idea what this is for, it should be tested
        event.preventDefault();

      });
    }

  ]);

  app.controller( "RMTCtrl", [ "$scope", "restaurant", "waiter", "menu", "$sessionStorage",

    function( $scope, restaurant, waiter, menu, $sessionStorage ) {

      $scope.appstate = (function() {
        var viewsHistory = [];
        return {
          currentView: "table-selection",
          canGoBack: false,
          setView: function( view ) {
            if ( this.currentView !== view ) {
              viewsHistory.push( this.currentView );
              this.currentView = view;
              this.canGoBack = true;
            }
          },
          goBack: function() {
            if ( viewsHistory.length ) {
              this.currentView = viewsHistory.pop();
              if ( viewsHistory.length === 0 ) {
                this.canGoBack = false;
              }
            }
          }
        };
      })();

    }
  ]);

  app.controller( "TablesCtrl", [ "$scope", "restaurant", "waiter",

    function( $scope, restaurant, waiter ) {

      function setTables( room ) {
        restaurant.getTables( room ).then(function( tables ) {
          $scope.tables = tables;
        });
      }

      restaurant.getRooms().then(function( rooms ) {
        $scope.rooms = rooms;
        $scope.appstate.room = rooms[ 0 ];
        setTables( $scope.appstate.room );
      });

      // Handlers
      $scope.selectRoom = function( room ) {
        $scope.appstate.room = room;
        setTables( $scope.appstate.room );
      };

      $scope.selectTable = function( table ) {
        $scope.appstate.table = table;
        $scope.appstate.order = waiter.getOrder( table );
        $scope.appstate.setView( "food-or-drinks" );
      };

      $scope.activeOrdersCount = function() {
        if ( $scope.tables && $scope.tables.length ) {
          return $scope.tables.filter( getter( "busy" ) ).length;
        }
      };

    }
  ]);

  // utils
  function getter( name ) {
    return function( obj ) {
      return obj[ name ];
    };
  }

})();
