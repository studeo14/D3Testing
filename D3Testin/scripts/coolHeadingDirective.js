/**
 * Created by sfrederiksen on 7/7/2015.
 */
(function() {
    'use strict';

    angular.module('myApp.coolHeadingModule', [])

        .controller('coolController',['$scope', function ($scope) {
            $scope.content = "Woops! Nothing There!";
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
                controller: 'coolController',
                template: '<div class="col-md-12 panel-primary"><span><div class="panel-heading"><h2 class="text-capitalize text-center">Content: {{ content }}</h2> </div> </span> </div>'
            };
        })

    ;
}());
