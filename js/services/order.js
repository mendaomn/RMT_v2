// Order.js
// mantains an order, adds food/drinks, compute totals, exposes the order
(function() {
    var app = angular.module('Order', []);
    app.factory('orderGenerator', function() {
        var Order = function() {
            var table,
                total = 0,
                content = {};
            return {
                getContent: function() {
                    var contentToArray = $.map(content, function(i) {
                        return [i];
                    });
                    return {
                        content: contentToArray,
                        total: total
                    };
                },
                getCount: function() {
                    return content.length;
                },
                addFood: function(args) {
                    var qty = this.getQuantity(args.food),
                        obj = {
                            food: args.food,
                            quantity: args.quantity,
                            note: args.note || undefined
                        };
                    if (qty) {
                        obj.quantity = qty + 1;
                    }

                    content[args.food.name] = obj;
                    total += args.quantity * args.food.price;
                    // what if there's a note? should it increase the price?
                },
                removeItem: function(item){
                    total -= item.quantity * item.food.price;
                    delete content[item.food.name];
                },
                getQuantity: function(food) {
                    if (content[food.name])
                        return content[food.name].quantity;
                }
            };
        };
        return {
            createOrder: function() {
                return new Order();
            }
        };
    });
})();