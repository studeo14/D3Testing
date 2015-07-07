/**
 * Created by sfrederiksen on 7/7/2015.
 */
(function(){
    'use strict';

    angular.module("myApp.main",[])

        .controller("mainController",function($scope, $window){

            $scope.display = function(key){
                alert(key);
            };
            /*
             Helper functions
             */
            $scope.windowWidth = function () {
                return $window.innerWidth;
            };
            $scope.windowHeight = function () {
                return $window.innerHeight;
            };
            $scope.findObjIndex = function (arry, key, value) {
                for (var ix = 0; ix < arry.length; ix++) {
                    if (arry[ix][key] === value) {
                        return ix;
                    }
                }
                return -1;
            };
            $scope.activeTab = 'hm';

            $scope.setActive = function(key){
                $scope.activeTab=key;
            };

            $scope.tabs = [
                {
                    name:"Home",
                    key:"hm",
                    active:true
                },
                {
                    name:"Other",
                    key:"ot",
                    active:false
                },
                {
                    name:"Moar",
                    key:"mo",
                    active:false
                }
            ];
        })
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