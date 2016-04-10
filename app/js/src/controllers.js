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

        /* Customer ID here would be ideally be read from the card. Hardcoding here.*/
        $scope.user = UserService.get({id: 1}, function(user) {
          LoggedInUser.setUser(user);
          $timeout(function (){
                $scope.$parent.messageObject = MessageService.getMessageObject("Card Verified.", false, true);
                $location.path('/login');
            }, 1000);

        });
    }
   
}]);

/*
    This controller checks the inputted PIN with the backend.
*/
controllers.controller('LoginScreenController', ['$scope', '$location', 'LoggedInUser', 'MessageService',
    function ($scope, $location, LoggedInUser, MessageService){
        
   $scope.login = function() {
        $scope.$parent.messageObject = MessageService.getMessageObject("", false, false);

        // If form is not valid, there is no reason to check business specific validations yet
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

/*
    This controller checks if the insert value is a valid number in multiple of 50.
*/
controllers.controller('CustomAmountScreenController', ['$scope', '$location', 'MessageService',
    function ($scope, $location, MessageService){

    $scope.setAmount = function(){
        // If form is not valid, there is no reason to check business specific validations yet
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

controllers.controller('DispenseScreenController', ['$scope', '$timeout', '$location', 'MessageService',
    function ($scope, $timeout, $location, MessageService){
    $scope.$parent.messageObject = MessageService.getMessageObject("The ATM is preparing to deliver the amount requested.", false, true);

    $timeout(function (){
            $location.path('/takeCardAndMoney');
        }, 5000);
   
}]);

controllers.controller('TakeCardAndMoneyScreenController', ['$scope', '$timeout', '$location', 'MessageService',
    function ($scope, $timeout, $location, MessageService){
    $scope.$parent.messageObject = MessageService.getMessageObject("Please take your card and money.", false, true);

    $scope.takeCardAndMoney = function(){
        $timeout(function (){
            $scope.$parent.messageObject = MessageService.getMessageObject("", false, false);
            $location.path('/');
        }, 1000);
    }
   
}]);
