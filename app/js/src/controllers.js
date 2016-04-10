var controllers = angular.module('controllers', ['services']);

/*
    Main Controller implements abort functionality which is shared by all child controllers
*/
controllers.controller('MainController', ['$scope', 'MessageService', 'logout', 
    function ($scope, MessageService, logout){

    $scope.abort = function(){
        $scope.messageObject = MessageService.getMessageObject("Aborting. Please wait", false, true);
        logout(function(){
            $scope.messageObject = MessageService.getMessageObject("Please take your card", false, true);
        });
    };

   
}]);

/*
    This controller takes in the inserted card and gets user details from the backend.
*/
controllers.controller('WelcomeScreenController', ['$scope', '$timeout', '$location', 'UserService', 'LoggedInUser', 'MessageService',
    function ($scope, $timeout, $location, UserService, LoggedInUser, MessageService){

    $scope.checkCard = function(){
        $scope.$parent.messageObject = MessageService.getMessageObject("Please wait while your card is being checked.", false, true);

        $scope.user = UserService.get({id: 1}, function(user) {
          LoggedInUser.setUser(user);
          $timeout(function (){
                $scope.messageText = "Card Verified.";
                $location.path('/login');
            }, 1000);

        });
    }
   
}]);

/*
    This controller checks the inputted PIN with the backend.
*/
controllers.controller('LoginScreenController', ['$scope', '$location', 'logout', 'LoggedInUser', 'MessageService',
    function ($scope, $location, logout, LoggedInUser, MessageService){
        
   $scope.login = function() {
        $scope.$parent.messageObject = MessageService.getMessageObject("", false, false);
        if (!$scope.loginform.$valid){
            return;
        }

   		if (LoggedInUser.getUser().pin === parseInt($scope.pin)) {
            $location.path('/withdrawal');
        }
        else {
            // reset the form to pristine state
            $scope.loginform.$setPristine();
            $scope.pin = '';
            $scope.$parent.messageObject = MessageService.getMessageObject("Incorrect PIN!", true, false);
        }
        
	};

    $scope.$parent.messageObject = MessageService.getMessageObject("", false, false);

}]);

controllers.controller('WithdrawalScreenController', ['$scope', '$location', 
    function ($scope, $location){

    $scope.withdraw = function(){
        $location.path('/dispense');
    }

    $scope.customAmount = function(){
        $location.path('/customAmount');
    }
   
}]);

controllers.controller('CustomAmountScreenController', ['$scope', '$location', 'MessageService', 'logout',
    function ($scope, $location, MessageService, logout){

    $scope.setAmount = function(){
        if (!$scope.customAmountform.$valid){
            $scope.$parent.messageObject = MessageService.getMessageObject("", false, false);
            return;
        }
        var amount = parseInt($scope.amount);
        if (angular.isNumber(amount)) {
            if (amount % 50 !== 0) {
                $scope.$parent.messageObject = MessageService.getMessageObject("Please enter amount in multiples of 50.", true, false);
                return;
            } 
            $scope.$parent.messageObject = MessageService.getMessageObject("", false, false);
            $location.path('/dispense');
        }
        else {
            $scope.$parent.messageObject = MessageService.getMessageObject("Please enter a valid amount.", true, false);
        }
    };
 
    $scope.$parent.messageObject = MessageService.getMessageObject("", false, false);

}]);

controllers.controller('DispenseScreenController', ['$scope', '$timeout', '$location', 
    function ($scope, $timeout, $location){
    $scope.messageText = "The ATM is preparing to deliver the amount requested";

    $timeout(function (){
            $location.path('/takeCardAndMoney');
        }, 5000);
   
}]);

controllers.controller('TakeCardAndMoneyScreenController', ['$scope', '$timeout', '$location',
    function ($scope, $timeout, $location){
    $scope.messageText = "Please take out your card and money";

    $scope.takeCardAndMoney = function(){
        $timeout(function (){
            $location.path('/');
        }, 1000);
    }
   
}]);
