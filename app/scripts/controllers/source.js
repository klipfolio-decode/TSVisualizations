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
      console.log('availableSources', availableSources.data.data);

      // Loop through the schema to get the source settings
      for(var source in availableSources.data.data) {

        // Add the available sources and set selected
        $scope.sources.push({
          id: source,
          name: source.charAt(0).toUpperCase() + source.slice(1)
        });
        $scope.selectedSource = $scope.sources[0];

        // Now we go through the measurements
        var measurements = availableSources.data.data[source].measurements;

        for (var measurement in measurements) {
          $scope.measurements.push({
            id: measurement,
            name: measurement.charAt(0).toUpperCase() + measurement.slice(1)
          });
          $scope.selectedMeasure = $scope.measurements[1];
        }

        // TODO: Add filters dynamically

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

    $scope.setMeasurement = function(measurement){
      $scope.selectedMeasure = measurement;
    };

    $scope.setInterval = function(interval) {
      $scope.selectedInterval = interval;
    };

    $scope.submit = function(){
      var source = $scope.selectedSource.id;
      var measurement = $scope.selectedMeasure.id;
      var start = new Date($scope.source.start) / 1000;
      var end = new Date($scope.source.end) / 1000;
      var intervalType = $scope.selectedInterval.id;
      var intervalUnit = $scope.source.intervalUnit;

      // Filter
      var required = $scope.source.filterRequired;
      var optional = $scope.source.filterOptional;

      // Get the data based on the query
      Backend.getDataFromQuery(source, measurement, start, end, intervalUnit, intervalType, optional, required).then(function(){
        // after we get the data notify
        Backend.notify();
      });
    };
  });
