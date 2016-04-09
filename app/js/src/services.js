'use strict';

var services = angular.module('services', ['ngResource']);

services.factory('UserService', ['$resource', function($resource){

	return $resource('data/:id.json', {}, {
      query: {method:'GET', params:{id:'@id'}}
    });

}]);

services.factory('LoggedInUser', function(){
	var user = '';
	return {
		setUser: function(_user){
			user = _user;
		},
		getUser: function(){
			return user;
		}
	}

});


services.factory('logout', ['$timeout', '$location', function($timeout, $location){

	return function(callback){
        $timeout(function (){
            $location.path('/app');
            callback();
        }, 1000);
	}
	
}]);

services.factory('MessageService', ['$timeout', '$location', function($timeout, $location){

	return {
		getMessageObject: function(_messageText, _isError, _isInfo){
			return {
				messageText : _messageText,
        		isError : _isError,
        		isInfo : _isInfo
        	};
		}
	}
	
}]);
