// Order.js
// mantains an order, adds food/drinks, compute totals, exposes the order
(function() {
    var app = angular.module('Order', []);
    app.factory('orderGenerator', function() {
        var Order = function(table) {
            var table = table,
                total = 0,
                content = {};
            return {
                getContent: function() {
                    return content;
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

                    table.busy = true;
                },
                reduceFood: function(food) {
                    var foodExists = content[food.name] ? true : false,
                        qty = content[food.name].quantity;
                    if (foodExists && qty !== 0)
                        content[food.name].quantity -= 1;
                },
                removeItem: function(item) {
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
            createOrder: function(table) {
                return new Order(table);
            }
        };
    });
})();