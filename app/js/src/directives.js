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

directives.directive('back', function() {
  return {
    template: '<button type="button" class="btn btn-info btn-sm" onclick="window.history.back()">Back</button>'
  };
});

