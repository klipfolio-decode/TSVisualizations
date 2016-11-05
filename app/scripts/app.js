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
    'chart.js',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
