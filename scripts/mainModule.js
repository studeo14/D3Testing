/**
 * Created by sfrederiksen on 7/7/2015.
 */
(function(){
    'use strict';

    angular.module("myApp.main",[])

        .controller("MainController",['$scope', '$window','$compile',function($scope, $window, $compile){

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
                    link:true
                },
                {
                    name:"Other",
                    key:"ot",
                    link:false
                },
                {
                    name:"Moar",
                    key:"mo",
                    link:false
                },
                {
                    name:"Email",
                    key:"em",
                    link:"/squirrelmail"
                }
            ];
            $scope.loadChart = function(id){
                var $f = $("#"+id);
                $f.html(' ');
                $.get("./partials/"+id+"-partial.html",function(d){
                    var c = $compile(d)($scope);
                    var $c = $(c);
                    $c.appendTo("#"+id);
                },'html');
            }
        }])

    ;
}());