'use strict';

/**
 * @ngdoc function
 * @name klipfolioFrontEndApp.controller:SourceCtrl
 * @description
 * # SourceCtrl
 * Controller of the klipfolioFrontEndApp
 */
angular.module('klipfolioFrontEndApp')
  .controller('SourceCtrl', function ($scope, Backend) {

    /// Data Source Options
    $scope.sources = [];
    $scope.measurements = [];

    Backend.subscribeSources($scope, function(){
      var availableSources =  Backend.getAvailableSources();

      for(var i = 0; i < availableSources.data.data.length; i++){
          var source = availableSources.data.data[i].datasource;
          var measurements = availableSources.data.data[i].measurements[i];
          var meaurementName = measurements.name;
          var optionals = measurements.filter.optional;
          var required = measurements.filter.required;

          console.log(optionals);
          console.log(required);

          // Add data to scope and set selected
          $scope.sources.push({
            id: source ,
            name: source.charAt(0).toUpperCase() + source.slice(1)
          });
          $scope.selectedSource = $scope.sources[0];

          $scope.measurements.push({
            id: meaurementName,
            name: meaurementName.charAt(0).toUpperCase() + meaurementName.slice(1)
          });
          $scope.selectedMeasure = $scope.measurements[0];
      }
    });

    $scope.intervals = [
      {id: 's', name: 'Seconds'},
      {id: 'm', name: 'Minutes'},
      {id: 'h', name: 'Hours'},
      {id: 'd', name: 'Days'},
      {id: 'w', name: 'Weeks'}
    ];

    $scope.selectedInterval = $scope.intervals[3];

    /// Controller setters
    $scope.setSource = function(source){
      $scope.selectedSource = source;
    };

    $scope.setMeasure = function(measure){
      $scope.selectedMeasure = measure;
    };

    $scope.setInterval = function(interval) {
      $scope.selectedInterval = interval;
    };

    $scope.submit = function(){
      var source = $scope.selectedSource.id;
      var measurement = $scope.selectedMeasure.id;
      var start = new Date($scope.source.start).getTime()/1000;
      var end = new Date($scope.source.end).getTime()/1000;
      var intervalType = $scope.selectedInterval.id;
      var intervalUnit = $scope.source.intervalUnit;

      // Get the data based on the query
      Backend.getDataFromQuery(source, measurement, start, end, intervalUnit, intervalType).then(function(){
        // after we get the data notify
        Backend.notify();
      });
    };
  });
