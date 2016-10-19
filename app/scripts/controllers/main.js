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
          var label = new Date(dataPoint.time)
          $scope.labels.push(label);
        });

        results.forEach(function(dataPoint){
          var number = Math.round(dataPoint.data * 100) / 100
            $scope.data[0].push(number);
        });
      });


     $scope.labels = [];
     $scope.series = ['Series A'];
     $scope.data = [
       []
     ];
     $scope.onClick = function (points, evt) {
       console.log(points, evt);
     };
     $scope.datasetOverride = [{ yAxisID: 'Time' }];
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


  });
