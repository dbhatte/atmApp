var atmApp = angular.module('ATMApp', ['ngRoute', 'ngResource', 'controllers', 'directives']);


atmApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
    when('/', {
      templateUrl: 'partials/welcome.html',
      controller: 'WelcomeScreenController'
    }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginScreenController'
    }).
    when('/withdrawal', {
      templateUrl: 'partials/withdrawal.html',
      controller: 'WithdrawalScreenController'
    }).
    when('/customAmount', {
      templateUrl: 'partials/customAmount.html',
      controller: 'CustomAmountScreenController'
    }).
    when('/dispense', {
      templateUrl: 'partials/dispensingMoney.html',
      controller: 'DispenseScreenController'
    }).
    when('/takeCardAndMoney', {
      templateUrl: 'partials/takeCardAndMoney.html',
      controller: 'TakeCardAndMoneyScreenController'
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

