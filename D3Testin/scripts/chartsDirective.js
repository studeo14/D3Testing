/**
 * Created by sfrederiksen on 7/7/2015.
 */
(function(){
    'use strict';

    angular.module('myApp.chartModule',[])

        .directive("steveChart", function(){
            return{
                scope:{
                    chartId: '@',
                    chartGroup: '@',
                    chartDescriptors: '=',
                    type: '@',
                    xkey: '@',
                    xkey1: '@',
                    xkey2: '@',
                    scatterkey: '@',
                    pieKey: '@',
                    onFilterCallback: '=?',
                    noDataMessage: '@?',
                    loadingMessage: '@?',
                    isLoading: "=?",
                    title: '@?',
                    xlabel: '@?',
                    xlabel1: '@?',
                    xlabel2: '@?',
                    ylabel: '@?',
                    resetFilterText: '@?',
                    popOutText: '@?',
                    popInText: '@?',
                    //More chart options for new charts
                    bubbleYKey: '@',
                    bubbleRKey: '@',
                    bubbleColorKey: '@',

                    //csv options
                    tableGroupHeader: '@?',
                    tableValueHeader: '@?',
                    exportButtonLabel: '@?',
                    exportFilename: '@?',
                    resetPositionText: '@?',

                    chartWidth: '@?',
                    chartHeight: '@?',
                    chartRadius: '@?',

                    minx: '@?',
                    maxx: '@?',
                    miny: '@?',
                    maxy: '@?',

                    gap: '@?',
                    hasTimeAxis: '=?',
                    elasticY: '=?',
                    useX: '=?'
                },
                restrict: "E",
                replace: true,
                controller: 'ChartController',
                templateUrl: 'partials/chart.html',
                link: function(scope, elem, attrs, chartController){
                    chartController.init(elem);
                }

            };
        })
        .controller('ChartController', function($scope, $filter){
            this.init = function(element){
                console.log('Created Chart ' + $scope.chartID);
            }
        })

    ;
}());