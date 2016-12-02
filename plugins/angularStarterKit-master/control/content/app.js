'use strict';

(function (angular,buildfire) {
  angular.module('angularStarterKitContent', ['ngRoute'])
  //injected ngRoute for routing
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/home.html',
          controllerAs: 'ContentHome',
          controller: 'ContentHomeCtrl'
        })
        .when('/view', {
          templateUrl: 'templates/view.html'
        })
        .otherwise('/');
    }])

  
  /* We can use angular controllers to write all the logical implementation we want inside a view. We can use several
  * buildfire apis easily like carousel, dynamic links, WYSIWYG etc.
  * All your angular components can be used here as it is like filters, directives, factory etc.
  */

  .controller('ContentHomeCtrl', ['$scope', function($scope){
    var ContentHome = this;
    ContentHome.data = {};
    // Visit : https://github.com/BuildFire/sdk/wiki/How-to-use-Datastore for more details

    /*
    * Go pull any previously saved data
    * */

    buildfire.datastore.get(function (err, result) {
      if (result && result.data) {
        ContentHome.data = result.data;
        $scope.$digest();
      }
    });

    ContentHome.save = function(){
      buildfire.datastore.save(ContentHome.data, function (err, result) {
        if (err || !result) {
          console.log('Error saving the data: ', err);
        }
        else {
          console.log('Content details saved');
        }
      });
    }
  }]);
})(window.angular, window.buildfire);
