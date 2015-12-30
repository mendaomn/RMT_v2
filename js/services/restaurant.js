// Restaurant.js
// restaurant.js - mantains rooms and tables (modifies menu)
(function() {
    var app = angular.module('Restaurant', []);
    app.factory('restaurant', ['$http', function($http) {
        var rooms = [];
        var count = 0;

        $http.get('/assets/restaurant/rooms.json').then(function(data) {
            initRooms(data.data);
        });

        function initRooms(roomsArray) {
            console.log(roomsArray);
            roomsArray.forEach(function(room, roomIndex){
                var obj = {
                    id: roomIndex,
                    tables: []
                };
                for (var i = 0; i < room.tables; i++){
                    obj.tables.push({
                        id: i
                    });
                }
                rooms.push(obj);
            });
            console.log(rooms);
        }


        return {
            getRooms: function() {
                return rooms;
            },
            getTables: function(room) {
                console.log("Getting tables for room", room);
                var pos = rooms.indexOf(room);
                if (pos != -1)
                    return rooms[pos].tables;
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
    }]);
})();
