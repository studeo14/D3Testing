/**
 * Created by sfrederiksen on 7/7/2015.
 */
(function() {
    'use strict';

    angular.module('myApp.coolHeadingModule', [])

        .controller('CoolController',['$scope', function ($scope) {
            $scope.content = ($scope.content)?$scope.content:"Woops! Nothing There!";
            $scope.display = function(){
                alert($scope.content);
            };
        }])

        .directive('coolHeading', function () {
            return {
                restrict: 'E',
                scope: {
                    content: '@'
                },
                controller: 'CoolController',
                templateUrl: 'partials/coolHeading.html'
            };
        })

    ;
}());
