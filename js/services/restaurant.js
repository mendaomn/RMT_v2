// Restaurant.js
// restaurant.js - mantains rooms and tables (modifies menu)
(function() {
    var app = angular.module('Restaurant', []);
    app.factory('restaurant', function() {
        var rooms = [];
        var count = 0;
        for (var j = 0; j < 3; j += 1) {
            var room = {};
            room.id = j;
            room.tables = [];
            for (var i = 0; i < 5; i += 1) {
                room.tables.push({
                    id: count++
                });
            }
            rooms.push(room);
        }
        return {
            getRooms: function() {
                return rooms;
            },
            getTables: function(room) {
                var pos = rooms.indexOf(room);
                if (pos != -1)
                    return rooms[pos].tables;
            }
        };
        // room = {
        // 	id: Integer,
        // 	tables: Array
        // }
        // table = {
        // 	id: Integer,
        //  busy: Boolean
        // }
    });
})();