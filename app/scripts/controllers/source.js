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

    // Data Source Options
    $scope.sources = [];
    $scope.measurements = [];
    $scope.intervals = [
      {id: 's', name: 'Seconds'},
      {id: 'm', name: 'Minutes'},
      {id: 'h', name: 'Hours'},
      {id: 'd', name: 'Days'},
      {id: 'w', name: 'Weeks'}
    ];
    $scope.selectedInterval = $scope.intervals[3];

    // The source controller is subscribed to the 'backend:getAvailableSources' event.
    // Whenever this event is triggered this function gets called.
    Backend.subscribeSources($scope, function(){
      var availableSources =  Backend.getAvailableSources();

      // Go through the data we received and add it to the scope
      for(var source in availableSources.data.data) {
        $scope.sources.push({
          id: source,
          name: source.charAt(0).toUpperCase() + source.slice(1)
        });
        $scope.selectedSource = $scope.sources[0];

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

    // Controller setters
    $scope.setSource = function(source){
      $scope.selectedSource = source;
    };

    $scope.setMeasurement = function(measurement){
      $scope.selectedMeasure = measurement;
    };

    $scope.setInterval = function(interval) {
      $scope.selectedInterval = interval;
    };

    // TODO: Make POST request instead of GET.
    $scope.submit = function(){
      var source = $scope.selectedSource.id;
      var measurement = $scope.selectedMeasure.id;
      var start = new Date($scope.source.start).getTime() / 1000;
      var end = new Date($scope.source.end).getTime() / 1000;
      var intervalType = $scope.selectedInterval.id;
      var intervalUnit = $scope.source.intervalUnit;

      // Filter
      var required = $scope.source.filterRequired;
      var optional = $scope.source.filterOptional;

      // Create query from user info
      Backend.getDataFromQuery(source, measurement, start, end, intervalUnit, intervalType, optional, required).then(function(){
        // Once we get the data we can trigger the 'backend:getGraphData' event
        // so that the main controller can get the correct graph data.
        Backend.notify();
      });
    };
  });
