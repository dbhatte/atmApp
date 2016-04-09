'use strict';

var directives = angular.module('directives', []);

directives.directive('message', function() {
  return {
    restrict: 'E',
    scope: {
    	data: '='
    },
    templateUrl: '/app/partials/message.html'
  };
});

