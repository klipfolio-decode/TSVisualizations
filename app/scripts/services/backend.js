'use strict';

angular.module('klipfolioFrontEndApp').factory('Backend', function($http){

  var Auth = {

    // Get da defaults
    getDefaultData: function(){
      console.log('Calling backend to get data with no paramz');
      //var results = [];
      // Return the $http promise not the data
      return $http({method: 'GET', url: 'http://localhost:8080/data/github/commit'


      // $http({
      //   method: 'GET',
      //   url: 'http://localhost:8080/data/github/commit'})
      // .then(function(res){
      //
      //   // Loop through the data and push it
      //   for(var i = 0; i < res.data.data.length; i++){
      //
      //     var timestamp = res.data.data[i].time;
      //     var data = res.data.data[i].data;
      //     results.push({
      //       timestamp: timestamp,
      //       data: data
      //     });
      //
      //   }

      }).catch(function(error){
         console.log('There was an error fetching the data :\'( : ' + error.message);
      });
    }







  };
  return Auth;
});
