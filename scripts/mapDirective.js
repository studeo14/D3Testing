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
            $scope.tip = d3.tip().attr('class','d3-tip').html(function(d){
                var s = '<span class="text-capitalize">'+ d.name+'</span><br>';
                if(d.info){
                    s += '<span>'+ d.info+'</span><br>';
                }
                if(d.items && d.items.length > 0){
                    s += '<ul>';
                    for(var t in d.items){
                        s += '<li>'+ d.items[t]+'</li>';
                    }
                    s += '</ul>';
                }
                return s;
            });

            $scope.imgWidth = ($scope.imgWidth)?$scope.imgWidth:0;
            $scope.imgHeight = ($scope.imgHeight)?$scope.imgHeight:0;
            //$scope.pointColor = ($scope.pointColor)?$scope.pointColor:'purple';

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
                    d3.select(el[0])
                        .text("ERROR LOADING DATA");
                }
            }

            function makeNewMap(_p, _m, _e){

                var parentWidth = $(_e[0]).width();
                var ratio = parentWidth/$scope.imgWidth;
                var seenWidth = $scope.imgWidth*ratio, seenHeight = $scope.imgHeight*ratio;

                if($scope.points.hasOwnProperty('points')){
                    console.log(_p.points);
                    $scope.svg = d3.select(_e[0])
                        .append("svg")
                        .style("background-image", "url('"+_m+"')")
                        .style("background-size", "100% auto")
                        .style('width',''+seenWidth+'')
                        .style('height', ''+seenHeight+'')
                        .style('z-index', '1')
                        .call($scope.tip);
                    $scope.svg.selectAll('circle')
                        .data(_p.points).enter()
                        .append('circle')
                        .attr('cx',function(d){return d.x * ratio;})
                        .attr('cy',function(d){return d.y * ratio;})
                        .attr('r', 7)
                        .attr('fill', function(d){return d.color;})
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
    /**
     * @ngdoc directive
     * @name myApp.mapModule.steveMap
     *
     * @description Diagram directive that will diplay a diagram with points of interest on it.
     *
     * Requires:
     * 	1) A path to a json data file containing the information for each point
     * 		-Formatting of the data file:
     * 		Json object with a single property 'points'. This property is an object array
     * 		containing the data for each point.
     * 		Each object holds 4 different datum:
     * 			1)	"name" -- The title of the point.
     * 			2)	"x"    -- The x coordinate of the point in the <i>ORIGINAL</i> image; this is
     * 				important, for the directive auto-converts the coordinates based on the parent
     * 				element's size.
     * 			3)	"y"	   -- The y coordinate of the point	in the <i>ORIGINAL</i> image; this is
     * 				important, for the directive auto-converts the coordinates based on the parent
     * 				element's size.
     * 			4) "color" -- The color of the point.
     * 			5) "info" (optional) -- A description of each point.
     * 			6) "items" (optional) -- Items that will be displayed in an unordered list below "name".
     *
     * 	2) A path to a background image. This is the image that the points are based on.
     * 	3) The width and height of the <i>ORIGINAL</i> image. These will be converted as necessary.
     * 	4) A title for the diagram.
     * 	5) A unique id.
     */
        .directive('steveMap', function(){
            return{
                restrict: 'E',
                scope:{
                    mapId: '@',
                    points: '@',
                    background: '@',
                    title: '@',
                    imgWidth: '@',
                    imgHeight: '@'
                },
                replace:true,
                controller: 'MapController',
                templateUrl: 'partials/mapDiagram.html',
                link: function(scope, elem, attrs, MapController){
                    MapController.init(elem);
                }
            };
        })

    ;

}());