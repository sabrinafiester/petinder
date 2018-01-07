var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      // UNCOMMENT TO RE-ENABLE AUTHENTICATION
      // resolve: {
      //   getuser : function(UserService){
      //     return UserService.getuser();
      //   }
      //}
    })
    .when('/petDetails', {
      templateUrl: '/views/templates/petDetails.html',
      controller: 'PetDetailsController',
      // UNCOMMENT TO RE-ENABLE AUTHENTICATION
      // resolve: {
      //   getuser : function(UserService){
      //     return UserService.getuser();
      //   }
      // }
    })
    .when('/futureFriends', {
      templateUrl: '/views/templates/petDetails.html',
      controller: 'PetDetailsController',
      // UNCOMMENT TO RE-ENABLE AUTHENTICATION
      // resolve: {
      //   getuser : function(UserService){
      //     return UserService.getuser();
      //   }
      // }
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as lc'
    })
    .otherwise({
      redirectTo: 'home'
    });
});
