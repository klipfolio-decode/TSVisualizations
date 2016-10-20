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
      // Bless up for the data we are about to receive
      var results = [];

      // Here we get the default data from an $http promise
      // once it finishes we then manipulate the data.
      Backend.getDefaultData().then(function(res){
        // Loop through the data and push it
        for(var i=0; i< res.data.data.length; i++){
          var time = res.data.data[i].time;
          var data = res.data.data[i].data;
          results.push({
            time: time,
            data: data
          });
        }

        // update the labels and data
        results.forEach(function(dataPoint){
          var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'
                          ];

          var label = new Date(dataPoint.time);
          var day = label.getDate();
          var month = monthNames[label.getMonth()];
          var year = label.getFullYear();

          $scope.labels.push( month + ' ' + day + ', ' + year);
        });

        results.forEach(function(dataPoint){
          var number = Math.round(dataPoint.data * 100) / 100;
            $scope.data[0].push(number);
        });

      });


     $scope.labels = [];
     $scope.series = ['Commits'];
     $scope.data = [[]];
     $scope.onClick = function (points, evt) {
       console.log(points, evt);
     };
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

    $scope.graphData = [];

    $scope.sync = function(bool, item){
      if(bool){
        $scope.graphData.push(item);
      } else {
        for(var i=0 ; i < $scope.graphData.length; i++) {
          if($scope.graphData[i].id === item.id){
            $scope.graphData.splice(i,1);
          }
        }
      }
    };

    $scope.refresh = function(){
      results = [];
      $scope.labels = [];
      $scope.data = [[]];
      var res = Backend.getGraphData();
      console.log(res);

      for(var i=0; i< res.data.data.length; i++){
        var time = res.data.data[i].time;
        var data = res.data.data[i].data;
        results.push({
          time: time,
          data: data
        });
      }

      // update the labels and data
      results.forEach(function(dataPoint){
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'
                        ];

        var label = new Date(dataPoint.time);
        var day = label.getDate();
        var month = monthNames[label.getMonth()];
        var year = label.getFullYear();

        $scope.labels.push( month + ' ' + day + ', ' + year);
      });

      results.forEach(function(dataPoint){
        var number = Math.round(dataPoint.data * 100) / 100;
          $scope.data[0].push(number);
      });

    };

  });
