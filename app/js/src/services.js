'use strict';

var services = angular.module('services', ['ngResource']);

/*
	User services retrievies user details for a specific user from the backend.
*/
services.factory('UserService', ['$resource', function($resource){

	return $resource('data/:id.json', {}, {
      query: {method:'GET', params:{id:'@id'}}
    });

}]);

/*
	This service is used to share the details of currently logged-in user between controllers
*/
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

/*
	This service exposes abort functionality to the controllers
*/
services.factory('logout', ['$timeout', '$location', function($timeout, $location){

	return function(callback){
        $timeout(function (){
            $location.path('/app');
            callback();
        }, 2000);
	}
	
}]);

/*
	This service creates message object for displaying with message directive
*/
services.factory('MessageService', function(){

	return {
		getMessageObject: function(_messageText, _isError, _isInfo){
			return {
				messageText : _messageText,
        		isError : _isError,
        		isInfo : _isInfo
        	};
		}
	}
	
});
