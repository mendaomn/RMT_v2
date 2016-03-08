// Waiter.js
// waiter.js - creates, modifies and deletes orders
(function() {

  var app = angular.module( "Waiter", [ "Order", "RmtAPI", "ngStorage" ]);
  app.factory( "waiter", [ "orderGenerator", "rmtAPI", "$sessionStorage",

    function( orderGenerator, rmtAPI, $sessionStorage ) {

      var orders = $sessionStorage.orders;

      function getter( name ) {
        return function( obj ) {
          return obj[ name ];
        };
      }

      function deleteOrder( order ) {
        var pos = $sessionStorage.orders.indexOf( order );
        $sessionStorage.orders.splice( pos, 1 );
      }

      return {
        createOrder: function( tablesArray ) {
          var newOrder = orderGenerator.createOrder( tablesArray );
          // Delete old orders and free their tables
          tablesArray.forEach(function( table ) {
            var order = this.getOrder( table );
            if ( order ) {
              order.tablesArray.forEach(function( _table ) {
                _table.busy = false;
              });
              deleteOrder( order );
            }
            table.busy = true;
          }.bind( this ) );

          $sessionStorage.orders.push( newOrder );
          return newOrder;
        },
        loadExistingOrders: function( orders ) {
          orders.forEach(function( order ) {
            var newOrder;

            newOrder = this.createOrder( order.tablesArray );
            newOrder.content = order.content;
            newOrder.date = order.date;

          }.bind( this ) );
        },
        getOrder: function( table ) {
          var order = $sessionStorage.orders.find(function( order ) {
            return order.tablesArray.find(function( _table ) {
              return table.id === _table.id;
            });
          });
          return order;
        },
        isTableIDBusy: function( tableId ) {
          var busytables = $sessionStorage.orders
            .map( getter( "tablesArray" ) )
            .map(function( array ) {
              return array.map( getter( "id" ) );
            });

          var found = busytables.find(function( ids ) {
            return ids.find(function( id ) {
              return id === tableId;
            });
          });

          return found && found.length ? true : false;
        },
        sendOrder: function( order ) {
          var payload = {
            room: order.room,
            table: order.tablesArray.map(function( table ) {
              return table.id;
            }).join( " + " ),
            order: order.getContent().filter( order.toBeSent )
          };
          console.log( "Sending", payload );
          rmtAPI.sendOrder( payload ).then(function() {});
          payload.order.map( order.setSent );

        },
        sendInvoice: function( order ) {
          var payload = {
            room: order.room,
            table: order.tablesArray.map(function( table ) {
              return table.id;
            }).join( " + " ),
            date: order.date,
            order: order.getContent(),
            total: order.getTotal()
          };
          console.log( "Sending invoice", payload );
          rmtAPI.sendInvoice( payload ).then(function() {});
        }
      };
    }
  ]);

})();
