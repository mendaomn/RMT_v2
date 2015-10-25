// Order.js
// mantains an order, adds food/drinks, compute totals, exposes the order
(function() { 
    var app = angular.module('Order', []);
    app.factory('order', function() {
        var table,
            total = 0,
            content = [];
        return {
            getContent: function() {
                return {
                	content: content,
                	total: total
                };
            },
            addFood: function(args) {
                var obj = {
                    food: args.food,
                    quantity: args.quantity,
                    note: args.note || undefined
                };
                content.push(obj);
                total += args.quantity * args.food.price;
                // what if there's a note? should it increase the price?
            }
        };
    }); 
})();