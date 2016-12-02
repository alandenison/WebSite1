
'use strict';

(function (angular, buildfire) {
  angular.module('angularStarterKitWidget', [])
    .config(['$compileProvider', function ($compileProvider) {

      /**
       * To make href urls safe on mobile
       */
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|cdvfile|file):/);
      
      /*
      * You can write your angular routes here. Just inject "ngRoute" dependency and you should be
      * ready to use routes just like we did in content section.
      */


    }])
    .controller('WidgetHomeCtrl',['$scope', function($scope){
      var WidgetHome = this;
      WidgetHome.data = {};

      // Visit : https://github.com/BuildFire/sdk/wiki/How-to-use-Datastore for more details

      /*
       * Go pull any previously saved data
       * */

      buildfire.datastore.get(function (err, result) {
        if (result && result.data) {
          WidgetHome.data = result.data;
          $scope.$digest();
        }
      });
      
      buildfire.datastore.onUpdate(function(event){
        if(event){
          WidgetHome.data = event.data;
          $scope.$digest();
          // Perform all re-initializations here after you data has been updated
        }
      });

    }]);
})(window.angular, window.buildfire);
