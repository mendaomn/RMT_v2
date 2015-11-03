// sectionsList.js

(function() {
    var app = angular.module('Sections', ['Services']);
    app.controller('SectionsCtrl', ['$scope', 'menu', function($scope, menu) {
        menu.getSections().then(function(sections) {
            $scope.sections = sections;
        });

        $scope.selectSection = function(section) {
            $scope.appstate.section = section;
            $scope.appstate.setView('food');
        };
    }]);
})();