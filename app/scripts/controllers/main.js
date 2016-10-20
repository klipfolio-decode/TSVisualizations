'use strict';

/**
 * @ngdoc function
 * @name klipfolioFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the klipfolioFrontEndApp
 */
angular.module('klipfolioFrontEndApp')
  .controller('MainCtrl', function ($scope, Backend) {

      var results = [];

      /// For pretty printing months
      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];

      /// Graph stuff
      $scope.labels = [];
      $scope.series = ['Commits'];
      $scope.data = [[]];
      $scope.datasetOverride = [{ yAxisID: 'Time', spanGaps: false }];
      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'Time',
              type: 'linear',
              display: true,
              position: 'left'
            }
          ]
        }
      };

      /// Graph analysis stuff
      $scope.allOptions = [
       {
         'id' : '1',
         'value' : 'Linear Regression',
       },
       {
         'id' : '2',
         'value' : 'Forecasting',
       },
       {
         'id' : '3',
         'value' : 'Outliers',
       }];


      /// Functions to update the graph data
      var parseGraphData = function(graphData){
        for(var i=0; i< graphData.data.data.length; i++){
          var time = graphData.data.data[i].time;
          var data = graphData.data.data[i].data;
          results.push({
            time: time,
            data: data
          });
        }
      };

      var updateGraphLabels = function(){
        results.forEach(function(dates){

          var date = new Date(dates.time);
          var day = date.getDate();
          var month = monthNames[date.getMonth()];
          var year = date.getFullYear();

          $scope.labels.push( month + ' ' + day + ', ' + year);
        });
      };

      var updateGraphValues = function(){
        results.forEach(function(value){
          var number = Math.round(value.data * 100) / 100;
            $scope.data[0].push(number);
        });
      };

      var refreshGraph = function(){
        results = [];
        $scope.labels = [];
        $scope.data = [[]];

        parseGraphData(Backend.getGraphData());
        updateGraphLabels();
        updateGraphValues();
      };


      /// Bless up for the data we are about to receive
      Backend.getDefaultData().then(function(data){
        parseGraphData(data);
        updateGraphLabels();
        updateGraphValues();
      });


      /// Subscribe to changes in the factory
      Backend.subscribe($scope, function somethingChange(){
          refreshGraph();
      });


  });
