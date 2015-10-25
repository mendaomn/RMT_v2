// Restaurant.js
// restaurant.js - mantains rooms and tables (modifies menu)
(function() {
    var app = angular.module('Restaurant', []);
    app.factory('restaurant', function() {
        var rooms = [];
        return {
            getRooms: function() {
                return rooms;
            },
            getTables: function(room) {
                var pos = rooms.indexOf(room);
                return rooms[pos].tables;
            }
        };
        // room = {
        // 	id: Integer,
        // 	tables: []
        // }
        // table = {
        // 	id: Integer
        // }
    });
})();