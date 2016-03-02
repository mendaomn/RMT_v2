// Order.js
// mantains an order, adds food/drinks, compute totals, exposes the order
( function() {
    var app = angular.module( 'Order', [] );
    app.factory( 'orderGenerator', function() {
        var Order = function( _tablesArray ) {
            var tablesArray = _tablesArray,
                content = [];

            function isFoodInOrder( food ) {
                var foodNamesList = content.map( getter( "food" ) ).map( getter( "name" ) );
                console.log( foodNamesList );
                return foodNamesList.indexOf( food.name ) != -1;
            }

            function getter( name ) {
                return function( obj ) {
                    return obj[ name ];
                };
            }

            return {
                date: new Date().toISOString(),
                room: _tablesArray[ 0 ].roomid,
                tablesArray: _tablesArray,
                getContent: function() {
                    return content;
                },
                getTotal: function() {
                    return content.reduce( function( cumulator, item ) {
                        cumulator += ( item.quantity * item.food.price );
                        return cumulator;
                    }, 0 );
                },
                getCount: function() {
                    return content.length;
                },
                addFood: function( args ) { // args: food, quantity, note
                    var orderItem = this.getItem( args );
                    if ( !orderItem ) {
                        content.push( {
                            food: args.food,
                            menuType: args.menuType,
                            quantity: args.quantity,
                            note: args.note || undefined
                        } );
                    } else {
                        orderItem.quantity += args.quantity;
                    }
                },
                addNote: function( item, note ) {
                    if ( item.note && item.note != note ) {
                        item.note = note;
                    } else if ( !item.note ) {
                        this.reduceQuantity( item );
                        if ( item.quantity === 0 )
                            this.removeItem( item );
                        this.addFood( {
                            food: item.food,
                            menuType: item.menuType,
                            quantity: 1,
                            note: note
                        } );
                    }

                },
                reduceQuantity: function( item ) {
                    if ( item.quantity !== 0 ) {
                        item.quantity -= 1;
                    }
                },
                getItem: function( args ) { // args: food, quantity, note
                    var item = content.find( function( _item ) {
                        var sameFood = ( _item.food.name == args.food.name );
                        var sameNote = ( _item.note == args.note );
                        if ( !args.note && !_item.note )
                            return sameFood;
                        else
                            return sameFood && sameNote;
                    } );
                    return item;
                },
                removeItem: function( item ) {
                    content.splice( content.indexOf( item ), 1 );
                },
                setSent: function( item ) {
                    item.sent = true;
                },
                toBeSent: function( item ) {
                    return !item.sent;
                },
                getQuantity: function( food ) {
                    var _item = this.getItem( {
                        food: food
                    } );
                    return ( _item ) ? _item.quantity : 0;
                }
            };
        };
        return {
            createOrder: function( tablesArray ) {
                return new Order( tablesArray );
            }
        };
    } );
} )();
