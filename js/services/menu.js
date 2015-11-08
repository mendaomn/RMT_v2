// Menu.js
// menu.js - exposes sections, food, drinks
(function() {
    var app = angular.module('Menu', []);
    app.factory('menu', ['$http', function($http) {
        var menu = {},
            hasParsed = loadFromFile('assets/menu/menu_parsable.csv');

        function loadFromFile(file) {
            var that = this;
            var promise = new Promise(function(resolve, reject) {
                Papa.parse(file, {
                    download: true,
                    complete: function(results) {
                        var currSection;
                        $.each(results.data, function(index, line) {
                            var i, len = line.length;
                            // Do something weird
                            for (i = 0; i < len; i++)
                                line[i] && line.push(line[i]);
                            line.splice(0, len);
                            if (line.length === 0) { // Line is not empty
                                return;
                            }
                            if (line.length == 1) { // Line contains a section name
                                currSection = line[0];
                                menu[currSection] = [];
                            } else { // Line contains a food description
                                var food = {
                                    name: line[0],
                                    price: parseFloat(line[1].replace(/,/,'.'))
                                };
                                menu[currSection].push(food);
                            }
                        });
                        resolve(menu);
                    }
                });
            });
            return promise;
        }
        return {
            getSections: function() {
                return hasParsed.then(function(menu) {
                    return Object.getOwnPropertyNames(menu);
                });
            },
            getFoodList: function(sectionName) {
                return menu[sectionName];
            }
        };
    }]);
})();