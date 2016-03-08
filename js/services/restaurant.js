// Restaurant.js
// restaurant.js - mantains rooms and tables (modifies menu)
(function() {
  var app = angular.module( "Restaurant", [ "ngStorage" ]);

  app.factory( "restaurant", [ "$http", "$sessionStorage", "waiter",

    function( $http, $sessionStorage, waiter ) {
      var rooms = [];

      var isReady = $http.get( "/assets/restaurant/rooms.json" ).then(function( data ) {
        initRooms( data.data );
      });

      function initRooms( roomsArray ) {

        roomsArray.forEach(function( room, roomIndex ) {
          var obj = {
            name: room.name,
            id: roomIndex,
            tables: []
          };
          for ( var i = 0; i < room.tables; i++ ) {
            var newId = room.prefix + i;
            obj.tables.push({
              id: newId,
              roomid: room.name,
              busy: waiter.isTableIDBusy( newId )
            });
          }
          rooms.push( obj );
        });

      }

      return {
        getRooms: function() {
          return isReady.then(function() {
            return rooms;
          });
        },
        getTables: function( room ) {
          return isReady.then(function() {
            var pos = rooms.indexOf( room );
            if ( pos != -1 ) {
              return rooms[ pos ].tables;
            }
          });
        },
        setBusyTables: function( ids ) {
          isReady.then(function() {
            rooms.forEach(function( room ) {
              room.tables = room.tables.map(function( table ) {
                table.busy = ids.indexOf( table.id ) !== -1 ? true : false;
                return table;
              });
            });
          });
        }
      };
      // room = {
      //  id: Integer,
      //  tables: Array
      // }
      // table = {
      //  id: Integer,
      //  busy: Boolean
      // }
    }
  ]);
})();
