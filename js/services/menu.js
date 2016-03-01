// Menu.js
// menu.js - exposes sections, food, drinks
( function() {
    var app = angular.module( 'Menu', [] );
    app.factory( 'menu', [ '$http', function( $http ) {
        var MENU_FOOD_FILENAME = '/assets/menu/menu_cibo.csv',
            MENU_DRINKS_FILENAME = '/assets/menu/menu_bere.csv',
            QUICK_NOTES_FILENAME = '/assets/menu/note.json';

        var menu_food = {},
            menu_drink = {},
            hasParsed,
            foodLoaded = loadFromFile( MENU_FOOD_FILENAME ),
            drinksLoaded = loadFromFile( MENU_DRINKS_FILENAME ),
            quickNotesReady = loadQuickNotes( QUICK_NOTES_FILENAME );

        function loadFromFile( file ) {
            var that = this;
            var menu = {};
            var promise = new Promise( function( resolve, reject ) {
                Papa.parse( file, {
                    download: true,
                    complete: function( results ) {
                        var currSection;
                        $.each( results.data, function( index, line ) {
                            var i, len = line.length;
                            // Do something weird
                            for ( i = 0; i < len; i++ )
                                if ( line[ i ] )
                                    line.push( line[ i ] );
                            line.splice( 0, len );
                            if ( line.length === 0 ) { // Line is not empty
                                return;
                            }
                            if ( line.length == 1 ) { // Line contains a section name
                                currSection = line[ 0 ];
                                menu[ currSection ] = [];
                            } else { // Line contains a food description
                                if ( !line[ 0 ].trim() ) // Line is not empty
                                    return;
                                var food = {
                                    name: line[ 0 ],
                                    price: parseFloat( line[ 1 ].replace( /,/, '.' ) )
                                };
                                menu[ currSection ].push( food );
                            }
                        } );
                        resolve( menu );
                    }
                } );
            } );

            return promise;

        }

        function loadQuickNotes( filename ) {
            return $http.get( filename ).then( function( data ) {
                return data.data.quickNotes;
            } );
        }

        function combineMenus( menus ) {
            return {
                foodMenu: menus[ 0 ],
                drinksMenu: menus[ 1 ]
            };
        }

        function print( data ) {
            console.log( data );
        }

        hasParsed = Promise.all( [ foodLoaded, drinksLoaded ] )
            .then( combineMenus );

        return {
            getSections: function( menuType ) {
                return hasParsed.then( function( menu ) {
                    return Object.getOwnPropertyNames( menu[ menuType ] );
                } );
            },
            getFoodList: function( menuType, sectionName ) {
                return hasParsed.then( function( menu ) {
                    return menu[ menuType ][ sectionName ];
                } );
            },
            getQuickNotes: function( sectionName ) {
                return quickNotesReady.then( function( quickNotes ) {
                    var sectionNameUpperCase = sectionName.toUpperCase();
                    var notes;
                    notes = quickNotes
                        .find( function( item ) {
                            return item.section.toUpperCase() == sectionNameUpperCase;
                        } );
                    return notes ? notes.notes : [];
                } );
            }
        };
    } ] );
} )();
