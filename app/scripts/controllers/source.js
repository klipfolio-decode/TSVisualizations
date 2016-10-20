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

    /// Data Source Options - hardcoded for now
    $scope.sources = [
      {id: 'github', name:'Github'},
      {id: 'facebook', name:'Facebook'},
      {id: 'sneakernews', name:'Sneaker News'}
    ];

    $scope.measurements = [
      {id: 'commit', name:'Commits'},
      {id: 'user', name:'User'},
      {id: 'repo', name:'Repo'}
    ];

    $scope.intervals = [
      {id: 's', name: 'Seconds'},
      {id: 'm', name: 'Minutes'},
      {id: 'h', name: 'Hours'},
      {id: 'd', name: 'Days'},
      {id: 'w', name: 'Weeks'}
    ];

    /// Set the default values
    $scope.selectedSource = $scope.sources[0];
    $scope.selectedMeasure = $scope.measurements[0];
    $scope.selectedInterval = $scope.intervals[2];


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
