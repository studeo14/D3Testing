/**
 * Created by sfrederiksen on 7/14/2015.
 */
(function(){
    'use strict';
    angular.module('myApp.mapModule',[])

        .controller('MapController',['$scope', function($scope){
            $scope.title = ($scope.title)?$scope.title:"";
            $scope.pathToPoints =($scope.points)?$scope.points:'data/mapPoints.json';
            $scope.background = ($scope.background)?$scope.background:'images/mapImage.png';
            $scope.tip = d3.tip().attr('class','d3-tip').html(function(d){return '<span class="text-capitalize">'+ d.name+'</span><br><span>'+ d.info+'</span>';});

            function getData(el){
                try{
                    var xmlhttp = new XMLHttpRequest();

                    xmlhttp.onreadystatechange = function(){
                        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
                            console.log("Called");
                            $scope.points = JSON.parse(xmlhttp.responseText);
                            makeNewMap($scope.points, $scope.background, el);
                            console.log($scope.points);
                        }
                    };
                    xmlhttp.open("GET",$scope.pathToPoints,true);
                    xmlhttp.send();

                }catch(err){
                    console.log(err);
                }
            }

            function makeNewMap(_p, _m, _e){

                if($scope.points.hasOwnProperty('points')){
                    console.log(_p.points);
                    $scope.svg = d3.select(_e[0])
                        .append("svg")
                        .style("background-image", "url('"+_m+"')")
                        .style("background-size", "100% auto")
                        .style('width','100%')
                        .style('height', '100%')
                        .style('max-height','100%')
                        .style('z-index', '1')
                        .call($scope.tip);
                    $scope.svg.selectAll('circle')
                        .data(_p.points).enter()
                        .append('circle')
                        .attr('cx',function(d){return d.x;})
                        .attr('cy',function(d){return d.y;})
                        .attr('r', 7)
                        .attr('fill', 'purple')
                        .on("mouseover",function(d){
                            $scope.tip.show(d);
                            d3.select(this).attr("r",14);
                        })
                        .on("mouseout", function(d){
                            $scope.tip.hide(d);
                            d3.select(this).attr("r",7);
                        });
                }else {
                    d3.select(_e[0])
                        .text("ERROR LOADING DATA");
                }
            }


            this.init = function(element){
                getData(element);
            }
        }])
        .directive('steveMap', function(){
            return{
                restrict: 'E',
                scope:{
                    mapId: '@',
                    points: '@',
                    background: '@',
                    title: '@',
                    width: '@',
                    height: '@'
                },
                replace:true,
                controller: 'MapController',
                templateUrl: 'partials/map.html',
                link: function(scope, elem, attrs, MapController){
                    MapController.init(elem);
                }
            };
        })

}());