'use strict';

/**
 * @ngdoc function
 * @name klipfolioFrontEndApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the klipfolioFrontEndApp
 */
angular.module('klipfolioFrontEndApp')
  .controller('AboutCtrl', function ($scope, Backend) {

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
      {id: 'd', name: 'Days'}
    ];

    /// Set the default values
    //$scope.options.start = new Date()/1000;
    //$scope.options.end = new Date()/1000;
    $scope.selectedSource = $scope.sources[0];
    $scope.selectedMeasure = $scope.measurements[0];
    // Cos seconds will overheat ur mac
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
      console.log('data:');
      console.log($scope.options.start);
      console.log($scope.options.end);
      console.log($scope.selectedSource.id);
      console.log($scope.selectedMeasure.id);

      var source = $scope.selectedSource.id;
      var measurement = $scope.selectedMeasure.id;
      var start = new Date($scope.options.start).getTime()/1000;
      var end = new Date($scope.options.end).getTime()/1000;
      var intervalType = $scope.selectedInterval.id;
      var intervalUnit = $scope.options.intervalUnit;

      Backend.getDataFromQuery(source, measurement, start, end, intervalUnit, intervalType).then(function(res){
        //Backend.setGraphData(res);
      });

    };
  });
