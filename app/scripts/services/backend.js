'use strict';

angular.module('klipfolioFrontEndApp').factory('Backend', function($rootScope, $http){

  var BASE_URL = 'http://localhost:8080/data/';

  // Local variables to persist data.
  var graphData = [];
  var sourceData = [];
  var analyticsData = [];

  var Backend = {
    /**
    * @desc Calls a GET request to retrieve default data to populate the graph.
    *
    * @return Promise - promise to get future data.
    **/
    getDefaultData: function(){
      return $http.get(BASE_URL + 'github/commit?start=1476130178&end=1478808578&interval=1d&owner=richardison&repo=TSVisualizations')
        .catch(function(error){
          console.log('ERROR: Unable to fetch the default data: ' + error.message);
        });
    },

    /**
    * @desc Calls a GET request by using user input to retrieve graph data. Once we get the data from the server
    *     we set the variable 'graphData' with the response. Also, save the results to the factory so it can be
    *     used in other controllers.
    *
    * @param string datasource - The datasource used for a InfluxDB query. For now it's just Github. Will add more lata.
    * @param string measurement - The measurement used for a InfluxDB query agian since our datasource is Github we only have commits/commit length.
    * @param date start - The start date used for a InfluxDB query. Should be converted to epoch time.
    * @param date end - The end date used for a InfluxDB query. Epoch time.
    * @param interval - The interval used for a InfluxDB query. For example x amount of seconds, minutes, days, or weeks.
    * @param grouping - The grouping used for a InfluxDB query. Seconds, minutes, days, or weeks.
    * @param owner - Another filter for the InfluxDB query. Owner of a github repo.
    * @param repo - Again another filter. This time the name of the repo.
    *
    * @return Promise - promise to get future data.
    **/
    getDataFromQuery: function(datasource, measurement, start, end, interval, grouping, owner, repo){
      var query = BASE_URL + datasource + '/' + measurement
              +   '?start='   + start
              +   '&end='     + end
              +   '&interval='+ interval + grouping
              +   '&owner='  + owner
              +   '&repo='    + repo;

      console.log(query);

      return $http.get(query)
        .then(function(res){
          //
          graphData = [];
          graphData = res;
        })
        .catch(function(error){
          console.log('ERROR: Unable to fetch the query data: ' + error.message);
        });
    },

    /**
    * @desc Calls a GET request to retrieve source data. A source data would be Github. And we
    *     save results to the factory so that it can be used in other controllers.
    * @return Promise - promise to get future data.
    **/
    getAvailableSourcesData: function(){
        return $http.get(BASE_URL)
          .then(function(res){
            sourceData = [];
            sourceData = res;
          })
          .catch(function(error){
            console.log('ERROR: Unable to fetch available sources: ' + error.message);
          });
    },

    /**
    * @desc Retreives the avaiable sources from factory.
    *
    * @return array - Source data from the factory.
    */
    getAvailableSources: function(){
      return sourceData;
    },

    /**
    * @desc Retreives the graph data from factory.
    *
    * @return  array - Graph data from the factory.
    */
    getGraphData: function(){
      return graphData;
    },

    /**
    * @desc Calls a POST request to retrieve analytical data. We send the server the current graph data.
    *     The server then calculates analytical things and sends the data back to the client.
    *
    * @return array - Analytical data.
    */
    getAnalyticsData: function(){
      return $http.post(BASE_URL + 'analytics', graphData)
        .then(function(res){
          analyticsData = []
          analyticsData = res;
          return analyticsData;
        })
        .catch(function(error){
          console.log('ERROR: Unable to get analytics data: ' + error.message);
        });
    },

    /**
    * @desc PubSub - Here we have our factory notify the controllers about changes.
    *
    *     TODO: Create PubSub Service.
    */

    /**
    * @desc A controller is subscribed to the event 'backend:getAvailableSources'.
    *     Whenever the event is triggered (a change made) it lets the controller know.
    * @param scope - Scope of the controller.
    * @param callback - Handle the notification.
    */
    subscribeSources: function(scope, callback){
      var handler = $rootScope.$on('backend:getAvailableSources', callback);
      scope.$on('$destroy', handler);
    },
    /**
    * @desc A controller can notify the factory which in turn notifies other controllers
    *     that are subscribed to the corespoonding event.
    */
    notifySources: function(){
      $rootScope.$emit('backend:getAvailableSources');
    },

    /**
    * @desc A controller is subscribed to the event 'backend:getGraphData'.
    *     Whenever the event is triggered (a change made) it lets the controller know.
    * @param scope - Scope of the controller.
    * @param callback - Handle the notification.
    */
    subscribe: function(scope, callback){
      var handler = $rootScope.$on('backend:getGraphData', callback);
      scope.$on('$destroy', handler);
    },

    /**
    * @desc A controller can notify the factory which in turn notifies other controllers
    *     that are subscribed to the corespoonding event.
    */
    notify: function(){
      $rootScope.$emit('backend:getGraphData');
    }
  };


  return Backend;
});
