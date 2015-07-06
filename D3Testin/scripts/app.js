/**
 * Created by sfrederiksen on 7/6/2015.
 */
(function(){
    angular.module("myApp",[])


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
}());
