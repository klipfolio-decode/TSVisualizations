'use strict';

/**
 * @ngdoc overview
 * @name klipfolioFrontEndApp
 * @description
 * # klipfolioFrontEndApp
 *
 * Main module of the application.
 */
angular
  .module('klipfolioFrontEndApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/source', {
        templateUrl: 'views/source.html',
        controller: 'SourceCtrl',
        controllerAs: 'source'
      })
      .when('/data', {
        templateUrl: 'views/data.html',
        controller: 'DataCtrl',
        controllerAs: 'data'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
