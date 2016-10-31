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
      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];

      // Data for graph
      $scope.labels = [];
      // TODO: Get series dynamically.
      $scope.series = ['Commits', 'Forcasted Data'];
      $scope.data = [[],[]];
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

      // Graph analysis data
      $scope.allOptions = [
       {
         'id' : 'f',
         'value' : 'Forecasting',
       }];
      $scope.analysisOption = [];

      // Makes a POST request to receive analytical data.
      // TODO: Choose analytics data based on checkbox
      $scope.sync = function(bool, item){
        if(bool){
          Backend.getAnalyticsData().then(function(res){
            for(var i=0; i<res.data.data.length; i++){
              $scope.data[1].push(res.data.data[i].data);
            }
          }).catch(function(error){
            console.log('ERROR: Unable to get analytics data. ', error.message);
          });
          $scope.analysisOption.push(item);
        } else {
          for(var i=0 ; i < $scope.analysisOption.length; i++) {
           if($scope.analysisOption[i].id === item.id){
             $scope.data[1] = [];
             $scope.analysisOption.splice(i,1);
           }
          }
        }
      };

      // Functions to update the graph data
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
        $scope.data = [[],[]];

        parseGraphData(Backend.getGraphData());
        updateGraphLabels();
        updateGraphValues();
      };


      // Bless up for the default data we are about to receive
      Backend.getDefaultData().then(function(data){
        parseGraphData(data);
        updateGraphLabels();
        updateGraphValues();
      });


      // Main controller is subscribec to 'backend:getGraphData' event.
      // Triggered when the source controller receives data.
      Backend.subscribe($scope, function(){
          refreshGraph();
      });
      
      Backend.getAvailableSourcesData().then(function(){
        Backend.notifySources();
      });
  });
