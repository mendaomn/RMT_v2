(function() {
  var app = angular.module( "StatsApp", []);

  app.controller( "StatsCtrl", [ "$scope", "$http", function( $scope, $http ) {
    var isReady = $http.get( "/analytics" ).then(function( data ) {

      var monthsMapping = {
        0: "Gennaio",
        1: "Febbraio",
        2: "Marzo",
        3: "Aprile",
        4: "Maggio",
        5: "Giugno",
        6: "Luglio",
        7: "Agosto",
        8: "Settembre",
        9: "Ottobre",
        10: "Novembre",
        11: "Dicembre"
      };

      var daysMapping = {
        0: "Domenica",
        1: "Lunedì",
        2: "Martedì",
        3: "Mercoledì",
        4: "Giovedì",
        5: "Venerdì",
        6: "Sabato"
      };

      $scope.data = data.data;

      $scope.data.pastDays = [ {
        name: "Ultimo incasso",
        count: $scope.data.pastDays.oggi
      }, {
        name: "Incasso precedente",
        count: $scope.data.pastDays.ieri
      } ];

      Object.getOwnPropertyNames( $scope.data.months.income ).forEach(function( number ) {
        $scope.data.months.income[ number ] = {
          name: monthsMapping[ number ],
          value: $scope.data.months.income[ number ]
        };

        $scope.data.months.ordersAvg[ number ] = {
          name: monthsMapping[ number ],
          value: $scope.data.months.ordersAvg[ number ]
        };

        $scope.data.months.ordersCount[ number ] = {
          name: monthsMapping[ number ],
          value: $scope.data.months.ordersCount[ number ]
        };
      });

      Object.getOwnPropertyNames( $scope.data.days.income ).forEach(function( number ) {
        $scope.data.days.income[ number ] = {
          name: daysMapping[ number ],
          value: $scope.data.days.income[ number ]
        };

        $scope.data.days.ordersAvg[ number ] = {
          name: daysMapping[ number ],
          value: $scope.data.days.ordersAvg[ number ]
        };

        $scope.data.days.ordersCount[ number ] = {
          name: daysMapping[ number ],
          value: $scope.data.days.ordersCount[ number ]
        };
      });

    });
  } ]);

}() );
