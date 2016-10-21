'use strict';

angular.module('klipfolioFrontEndApp').factory('Backend', function($rootScope, $http){

  var graphData = [];

  var Auth = {

    // Get da defaults
    getDefaultData: function(){
      // Return the $http promise not the data
      return $http.get('http://localhost:8080/data/github/commit?start=1475419531&end=1476543246&interval=1d')
        .catch(function(error){
          console.log('There was an error fetching the data :\'(  ' + error.message);
        });
    },

    getDataFromQuery: function(datasource, measurement, start, end, intervalUnit, intervalType ){
      return $http.get('http://localhost:8080/data/'+ datasource  + '/'+ measurement + '?start=' + start+ '&end=' + end + '&interval=' +intervalUnit+intervalType)
        .then(function(res){
          // Save the graph to the factory so it can be used in other controllers
          graphData = [];
          graphData = res;
        })
        .catch(function(error){
          console.log('There was an error fetching the data :\'( : ' + error.message);
        });
    },

    // For controller 2 controller data
    getGraphData: function(){
      return graphData;
    },

    subscribe: function(scope, callback){
      var handler = $rootScope.$on('backend:getGraphData', callback);
      scope.$on('$destroy', handler);
    },

    notify: function(){
      $rootScope.$emit('backend:getGraphData');
    }


  };
  return Auth;
});
