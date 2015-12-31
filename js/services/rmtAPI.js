// rmtAPI.js
// rmtAPI.js - contacts the server
(function() {
    var app = angular.module('RmtAPI', []);
    app.factory('rmtAPI', ['$http', function($http) {
        
        function success() {
            console.log("Success!");
        }

        function fail() {
            console.log("Fail!");
            Promise.reject();
        }

        return {
            sendOrder: function(order) {
                return $http.post('/printOrder', order).then(success, fail);
            },
            sendInvoice: function(invoice){
                return $http.post('/printInvoice', invoice).then(success, fail);    
            }
        };
    }]);
})();
